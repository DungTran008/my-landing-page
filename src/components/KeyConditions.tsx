"use client";
import React from "react";
import { motion } from "framer-motion";

const conditions = [
  { title: "Viêm xoang mãn", desc: "Điều trị dứt điểm tình trạng viêm xoang lâu năm, tái phát thường xuyên.", border: "border-primary" },
  { title: "Viêm mũi dị ứng", desc: "Kiểm soát cơ địa dị ứng, giảm hắt hơi, sổ mũi theo mùa.", border: "border-tertiary-fixed-dim" },
  { title: "Nấm ống tai", desc: "Vệ sinh và điều trị dứt điểm tình trạng ngứa, đau rát ống tai.", border: "border-primary" },
  { title: "Tai Mũi Họng Chung", desc: "Khám và điều trị các bệnh lý phổ thông vùng họng, thanh quản.", border: "border-tertiary-fixed-dim" }
];

export default function KeyConditions() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-extrabold font-headline text-center mb-16 text-blue-900"
        >
          Các Bệnh Lý Chuyên Sâu
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {conditions.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`bg-white p-8 rounded-xl premium-shadow border-b-4 ${item.border}`}
            >
              <h4 className="text-xl font-bold mb-4 text-primary">{item.title}</h4>
              <p className="text-on-surface-variant text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
