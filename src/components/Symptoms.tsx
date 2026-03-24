"use client";
import React from "react";
import { motion } from "framer-motion";

const symptoms = [
  { icon: "air", title: "Nghẹt mũi\\nMất mùi" },
  { icon: "psychology", title: "Nhức đầu\\nNặng mặt" },
  { icon: "water_drop", title: "Sổ mũi\\nKhịt khạc" },
  { icon: "humidity_percentage", title: "Ngứa mũi\\nHắt hơi" },
  { icon: "hearing", title: "Ù tai\\nNghe kém" }
];

export default function Symptoms() {
  return (
    <section className="py-24 bg-surface-container-low" id="symptoms">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold font-headline mb-6 text-blue-900">
            Bạn đang gặp phải <br /> những triệu chứng này?
          </h2>
          <p className="text-on-surface-variant">
            Nhiều người bị viêm xoang lâu dài do chẩn đoán chưa chính xác hoặc điều trị chưa dứt điểm.
            Đừng bỏ qua các dấu hiệu cảnh báo từ cơ thể.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {symptoms.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-surface-container-lowest p-8 rounded-xl premium-shadow hover:bg-primary-fixed transition-colors group border border-transparent hover:border-primary/10"
            >
              <span className="material-symbols-outlined text-primary text-4xl mb-4 group-hover:scale-110 transition-transform block">
                {item.icon}
              </span>
              <h3 className="font-bold text-lg leading-tight whitespace-pre-line">
                {item.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
