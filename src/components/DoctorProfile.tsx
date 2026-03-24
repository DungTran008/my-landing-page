"use client";
import React from "react";
import { motion } from "framer-motion";

export default function DoctorProfile() {
  return (
    <section className="py-24 bg-white" id="bio">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-surface-container-low rounded-3xl p-8 md:p-16 flex flex-col md:flex-row gap-12 items-center premium-shadow border border-outline-variant/10"
        >
          <div className="w-full md:w-1/3">
            <div className="aspect-square rounded-2xl overflow-hidden premium-shadow relative group">
              <img
                alt="ThS.BS. Trần Minh Dũng"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJpH91L1TomLN6ce1nBniWOI_BVXBezfGEvdWHmSYYzL6_F2C7evi41iuT5w74JJvCZjZhau7eKoq17qSvEnxdKIxws-1kV5d_Nw5KI4hbELqTc_Lhigurrxsno9Ha93xKkSOtsF3yETHhh-a9txT2NVXg4J5eWEuXo07uE6n8xHHGYUXl4raJahL7B3Yq2FiRvUkaRT1BiLrXvlhyZ8zUVO1qZuNkxA4ALf33bD-IRLwQwLKgp6T_a0YN_TkKUbgzGZoDEqbv1jI"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl"></div>
            </div>
          </div>
          <div className="w-full md:w-2/3 space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold font-headline text-blue-900">ThS.BS. Trần Minh Dũng</h2>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-1.5 bg-primary text-on-primary rounded-full text-sm font-bold">10 Năm Kinh Nghiệm</span>
              <span className="px-4 py-1.5 bg-tertiary-container text-on-tertiary-container rounded-full text-sm font-bold">Thạc sĩ TMH</span>
            </div>
            <p className="text-lg text-on-surface-variant leading-relaxed italic">
              "Tôi tin rằng một bác sĩ tốt không chỉ điều trị căn bệnh, mà còn phải thấu hiểu nỗi lo của bệnh nhân. Sự chính xác trong chẩn đoán là bước đầu tiên và quan trọng nhất để giúp bệnh nhân thoát khỏi nỗi ám ảnh viêm xoang."
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">volunteer_activism</span>
                <span className="font-bold">Tận tâm</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">forum</span>
                <span className="font-bold">Giải thích kỹ</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">tips_and_updates</span>
                <span className="font-bold">Tư vấn chi tiết</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
