"use client";
import React from "react";
import { motion } from "framer-motion";

const reasons = [
  { icon: "close", title: "Sai phương pháp điều trị", desc: "Chỉ tập trung vào triệu chứng mà không giải quyết căn nguyên bệnh lý." },
  { icon: "pill", title: "Lạm dụng thuốc kháng sinh", desc: "Sử dụng thuốc bừa bãi gây nhờn thuốc và làm suy yếu hệ miễn dịch vùng niêm mạc." },
  { icon: "visibility_off", title: "Thiếu khám TMH chuyên sâu", desc: "Không nội soi hoặc chụp chiếu cận lâm sàng để xác định chính xác cấu trúc xoang." },
  { icon: "warning", title: "Dị ứng chưa kiểm soát", desc: "Bỏ qua yếu tố cơ địa dị ứng khiến tình trạng viêm nhiễm dễ dàng quay trở lại." }
];

export default function WhyRecurs() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="order-2 md:order-1"
        >
          <div className="relative rounded-2xl overflow-hidden premium-shadow">
            <img
              alt="ENT Examination"
              className="w-full aspect-video md:aspect-square object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRKK-MhJm1sOLJ8JasGNglcUIkLnU4SHD-4OEFfEunuZZQ5mrB1BVPXYb-7GFaXebBec5xq994Rceg40UtAsYNDly0SxVlGtAWeWZXoqiW5zR6HMScYVfgj7AP0DlMmxOYjeBMvS9hSDepjPJA93GJgGuduMt2uuXaw2cINHalQtwvCDfCFxAW14pL89zSRb9JsSSUdXHqunckQ1YatlnmGDaO3fQR4viixWEQC3MvWQcNsTxmtdM-KCWQHDIs1TPFSzO3F0sx5wg"
            />
            <div className="absolute inset-0 bg-blue-900/10"></div>
          </div>
        </motion.div>
        <div className="order-1 md:order-2 space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold font-headline text-blue-900 leading-tight"
          >
            Tại Sao Viêm Xoang Của Bạn Cứ Tái Phát?
          </motion.h2>
          <div className="space-y-6">
            {reasons.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-error/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-error">{item.icon}</span>
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">{item.title}</h4>
                  <p className="text-on-surface-variant">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
