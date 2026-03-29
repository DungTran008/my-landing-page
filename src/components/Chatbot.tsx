"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// ============================================================
// CẤU HÌNH LEAD CAPTURE — Google Apps Script Web App URL
// ============================================================
// ⚠️ THAY URL BÊN DƯỚI BẰNG URL THẬT CỦA BẠN SAU KHI DEPLOY APPS SCRIPT
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzI909H9NqHJXYwO1ESS_jnKn1u2luHqZQsnkHRgY1pwlDeWi589V8flsWYZCntQs96/exec';

const WELCOME_MSG = {
  role: "assistant", 
  content: "Chào bạn! 👋 Mình là trợ lý AI chuyên môn của **Bác sĩ Dũng**. \n\nMình có thể giúp bạn giải đáp thắc mắc về các *liệu trình điều trị, đặt lịch khám*, hoặc *tìm hiểu khóa học*. Bạn đang cần hỗ trợ vấn đề gì ạ?"
};

// Regex pattern để bóc tách tag ẩn LEAD_DATA từ response AI
const LEAD_DATA_PATTERN = /\|\|LEAD_DATA:\s*(\{.*?\})\s*\|\|/;

/**
 * Gửi dữ liệu Lead lên Google Apps Script → Google Sheets
 */
async function sendLeadToGoogleSheets(
  leadData: { name?: string; phone?: string; email?: string; interest?: string; intent_level?: string },
  chatHistoryText: string,
  sessionId: string
) {
  if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.length === 0) {
    console.warn("⚠️ Chưa cấu hình GOOGLE_SCRIPT_URL. Hãy thay bằng URL thật của Apps Script.");
    return;
  }
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: leadData.name || '',
        phone: leadData.phone || '',
        email: leadData.email || '',
        interest: leadData.interest || '',
        intent_level: leadData.intent_level || '',
        source: window.location.href,
        sessionId: sessionId,
        chatHistory: chatHistoryText,
        timestamp: new Date().toLocaleString('vi-VN'),
      }),
    });
    console.log("📤 Đã đồng bộ dữ liệu vào Google Sheets!", { interest: leadData.interest, intent_level: leadData.intent_level });
  } catch (err) {
    console.warn("⚠️ Không gửi được dữ liệu lead:", err);
  }
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([WELCOME_MSG]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Session ID duy nhất cho mỗi phiên chat (ổn định qua re-render)
  const sessionIdRef = useRef('session_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7));

  // Bonus: Auto scroll xuống tin nhắn mới nhất
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  /**
   * Xử lý response từ AI:
   * 1. Kiểm tra có tag ||LEAD_DATA:...|| không
   * 2. Nếu có → Parse JSON → Gửi lên Google Sheets kèm Lịch sử Chat & Session ID
   * 3. Xóa tag khỏi câu trả lời → Trả về text sạch để hiển thị
   */
  const processAIResponse = (aiResponse: string, chatHistory: { role: string; content: string }[]): string => {
    // Xây dựng text lịch sử chat để lưu vào Google Sheets
    let formattedHistory = "";
    if (chatHistory && chatHistory.length > 0) {
      formattedHistory = chatHistory.map(msg => {
        const role = msg.role === 'user' ? 'Khách' : 'AI';
        const content = msg.content.replace(LEAD_DATA_PATTERN, "").trim();
        return `${role}: ${content}`;
      }).join('\n\n');
    }

    if (aiResponse.includes("||LEAD_DATA:")) {
      const match = aiResponse.match(LEAD_DATA_PATTERN);
      if (match?.[1]) {
        try {
          const leadData = JSON.parse(match[1]);
          console.log("✅ Dữ liệu khách hàng bóc được:", leadData);

          if (leadData.name || leadData.phone || leadData.email || leadData.interest) {
            sendLeadToGoogleSheets(leadData, formattedHistory, sessionIdRef.current);
          }
        } catch (error) {
          console.error("❌ Lỗi parse JSON từ AI:", error);
        }
      }
      // Xóa tag ẩn, chỉ giữ lại nội dung sạch cho khách
      aiResponse = aiResponse.replace(LEAD_DATA_PATTERN, "").trim();
    }
    return aiResponse;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const newMessages = [...messages, { role: "user", content: input.trim() }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Lọc lời chào ban đầu để không tính vào lịch sử hội thoại nếu muốn, hoặc gửi tất cả
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      if (res.ok && data.reply) {
        // Bóc tách lead data trước khi hiển thị cho khách
        const cleanReply = processAIResponse(data.reply, [...newMessages, { role: "assistant", content: data.reply }]);
        setMessages((prev) => [...prev, { role: "assistant", content: cleanReply }]);
      } else {
        throw new Error(data.error || "Lỗi giao tiếp kết nối hệ thống LLM");
      }
    } catch (error: any) {
      setMessages((prev) => [...prev, { role: "assistant", content: `Lỗi: ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Logic 3: Chạy animation spin 500ms, xoá lịch sử và hiển thị lại lời chào
    setTimeout(() => {
      setMessages([WELCOME_MSG]);
      setIsRefreshing(false);
    }, 500);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed md:bottom-24 md:right-6 bottom-0 right-0 md:w-[380px] w-full md:h-[600px] h-[100dvh] md:rounded-2xl flex flex-col z-[100] overflow-hidden 
                       bg-white/80 backdrop-blur-3xl shadow-2xl border border-white/50 ring-1 ring-black/5" // 1. Glassmorphism + border mỏng + shadow-2xl
          >
            {/* 2. Chat Window Header */}
            <div className="bg-white/60 border-b border-black/5 p-4 flex justify-between items-center backdrop-blur-md shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center font-bold">
                    AI
                  </div>
                  {/* Trạng thái online (chấm xanh nhấp nháy) */}
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-blue-900 leading-tight">Trợ lý BS. Dũng</h3>
                  <p className="text-[11px] text-green-600 flex items-center gap-1 font-medium mt-0.5">
                    Online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-on-surface-variant">
                <button 
                  onClick={handleRefresh} 
                  title="Tải lại trò chuyện"
                  className="p-2 hover:bg-black/5 rounded-full transition-colors flex items-center justify-center"
                >
                  <span className={`material-symbols-outlined text-sm ${isRefreshing ? 'animate-spin' : ''}`}>refresh</span>
                </button>
                <button 
                  onClick={() => setIsOpen(false)} 
                  title="Đóng chat"
                  className="p-2 hover:bg-black/5 rounded-full transition-colors flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>
            </div>

            {/* Khung tin nhắn */}
            <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-5 bg-gradient-to-b from-transparent to-surface-container-low/40 scroll-smooth">
              {messages.map((msg, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  key={idx} 
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`p-4 max-w-[85%] text-[14px] leading-relaxed
                    ${msg.role === "user" 
                      ? "bg-primary text-white rounded-2xl rounded-tr-sm shadow-md" 
                      : "bg-white text-gray-800 rounded-2xl rounded-tl-sm shadow-sm border border-black/5"
                    }`}
                  >
                    {/* Render Markdown chuyên sâu */}
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        p: ({node, ...props}) => <p className="leading-[1.6] mb-3 last:mb-0" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc ml-5 mb-3 flex flex-col gap-1.5" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal ml-5 mb-3 flex flex-col gap-1.5" {...props} />,
                        li: ({node, ...props}) => <li className="pl-1" {...props} />,
                        strong: ({node, ...props}) => <strong className="font-bold text-primary" {...props} />,
                        blockquote: ({node, ...props}) => <blockquote className="border-l-[3px] border-primary/40 pl-3 py-1 my-3 bg-primary/5 text-gray-700 rounded-r-md italic" {...props} />,
                        code: ({node, inline, ...props}: any) => 
                          inline 
                          ? <code className="bg-gray-800 text-teal-300 px-1.5 py-0.5 rounded font-mono text-[13px] whitespace-pre-wrap" {...props} />
                          : <pre className="bg-gray-800 text-teal-300 p-3 rounded-xl overflow-x-auto font-mono text-[13px] my-3 leading-loose"><code {...props} /></pre>,
                        a: ({node, ...props}) => <a className="text-primary hover:underline font-medium" {...props} />
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </motion.div>
              ))}

              {/* 4. Typing Animation */}
              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-white text-gray-800 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm border border-black/5 flex flex-col gap-2">
                    <span className="text-xs text-on-surface-variant font-medium">Đang nhập...</span>
                    <div className="flex items-center gap-1.5 h-2 mx-1">
                      <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-[bounce_1s_infinite]"></span>
                      <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-[bounce_1s_infinite_0.2s]"></span>
                      <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-[bounce_1s_infinite_0.4s]"></span>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Khung ô nhập */}
            <div className="p-3 bg-white/70 backdrop-blur-md border-t border-black/5 flex items-end gap-2 shrink-0 pb-safe">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Aa..."
                className="flex-1 max-h-32 min-h-[44px] px-4 py-3 bg-black/5 rounded-2xl outline-none text-[14px] focus:ring-2 focus:ring-primary/20 transition-shadow resize-none"
                disabled={isLoading}
                rows={1}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="w-11 h-11 shrink-0 bg-primary text-white rounded-full flex items-center justify-center disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all"
              >
                <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>send</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-tr from-primary to-primary-container text-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.2)] flex items-center justify-center z-[100] group hover:ring-4 ring-primary/30 transition-all border-2 border-white/20"
        >
          <span className="material-symbols-outlined group-hover:scale-110 transition-transform" style={{ fontSize: "32px", fontVariationSettings: '"FILL" 1' }}>
            forum
          </span>
          {/* Notification Dot */}
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
        </motion.button>
      )}
    </>
  );
}
