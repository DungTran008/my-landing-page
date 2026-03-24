"use client";
import React from "react";
import { motion } from "framer-motion";

const treatments = [
  { num: "01", icon: "biotech", title: "Chẩn đoán chính xác", desc: "Sử dụng nội soi và hình ảnh học để xác định đúng vị trí viêm nhiễm." },
  { num: "02", icon: "clinical_notes", title: "Tối ưu hóa phác đồ", desc: "Cá nhân hóa liệu trình nội khoa để đạt hiệu quả cao nhất với ít tác dụng phụ." },
  { num: "03", icon: "vaccines", title: "Điều trị tại chỗ", desc: "Kết hợp làm sạch và chăm sóc TMH định kỳ để phục hồi niêm mạc." },
  { num: "04", icon: "health_and_safety", title: "Hạn chế phẫu thuật", desc: "Chỉ can thiệp ngoại khoa khi thực sự cần thiết, ưu tiên bảo tồn tối đa." }
];

export default function Treatments() {
  return (
    <section className="py-24 bg-primary text-on-primary relative overflow-hidden" id="treatments">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-tertiary-fixed-dim/40 to-transparent"></div>
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-extrabold font-headline mb-16 text-center"
        >
          Phương Pháp Điều Trị Tập Trung Vào <br />
          <span className="text-tertiary-fixed-dim">Sự Chính Xác & Hiệu Quả Lâu Dài</span>
        </motion.h2>
        <div className="grid md:grid-cols-4 gap-8">
          {treatments.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -10 }}
              className="relative p-8 rounded-xl border border-on-primary/10 bg-on-primary/5 backdrop-blur-sm"
            >
              <div className="text-4xl font-black text-on-primary/20 absolute top-4 right-4">{item.num}</div>
              <span className="material-symbols-outlined text-tertiary-fixed-dim mb-6 text-4xl neon-glow">
                {item.icon}
              </span>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-on-primary/70 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
