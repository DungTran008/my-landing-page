import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

// Khởi tạo SDK OpenAI với base URL và API key tùy chỉnh
const openai = new OpenAI({
  apiKey: 'sk-4bd27113b7dc78d1-lh6jld-f4f9c69f',
  baseURL: 'https://9router.vuhai.io.vn/v1',
});

// Cache nội dung file (Knowledge Base)
let cachedData = '';
try {
  const dataPath = path.join(process.cwd(), 'chatbot_data.txt');
  if (fs.existsSync(dataPath)) {
    cachedData = fs.readFileSync(dataPath, 'utf-8');
  }
} catch (e) {
  console.error("Lỗi đọc chatbot_data.txt", e);
}

// Logic System Prompt
const SYSTEM_PROMPT = `
Bạn là một AI trợ lý độc quyền của chuyên gia (Bác sĩ Dũng). Khách hàng sẽ đặt câu hỏi về dịch vụ.

THÔNG TIN KIẾN THỨC CỐT LÕI (Knowledge Base):
${cachedData}

YÊU CẦU BẮT BUỘC KHI TRẢ LỜI:
1. Bạn LUÔN CHỈ ĐƯỢC trả lời dựa trên những thông tin trong Knowledge Base trên.
   - Nếu người dùng hỏi điều kiện nằm ngoài phạm vi này, TỪ CHỐI NHẸ NHÀNG và hướng dẫn họ liên hệ trực tiếp số Điện thoại/Zalo để được bác sĩ tư vấn.
2. Bạn phải trả lời bằng Markdown rõ ràng, thu hút: 
   - Dùng in đậm (**từ khoá**) 
   - Dùng bullet point/hoặc số đếm để tạo danh sách
   - Xuống dòng thoáng đoạn
3. LUÔN bắt đầu bằng lời chào khen ngợi, lịch sự (Ví dụ: "Dạ em chào anh/chị ạ!").
4. Trả lời nội dung trung thành, đúng trọng tâm và súc tích.
5. KẾT THÚC câu trả lời bằng một lời mời hoặc câu hỏi mở.
`.trim();

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await openai.chat.completions.create({
      model: 'ces-chatbot-gpt-5.4',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ],
      temperature: 0.6,
    });

    return NextResponse.json({
      reply: response.choices[0].message.content,
    });
  } catch (error: any) {
    console.error('Core API Error:', error.message);
    return NextResponse.json(
      { error: 'Hệ thống đang bảo trì, vui lòng thử lại sau.' },
      { status: 500 }
    );
  }
}
