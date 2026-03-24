"use client";
import React from "react";
import { motion } from "framer-motion";

export default function FinalCTA() {
  return (
    <section className="py-24 relative">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-primary-container rounded-[2rem] p-12 md:p-20 text-on-primary relative overflow-hidden premium-shadow"
        >
          {/* Decorative Glows */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-tertiary-fixed-dim/20 blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <h2 className="text-3xl md:text-5xl font-extrabold font-headline mb-8 relative z-10">
            Đừng Để Viêm Xoang Ảnh Hưởng Đến Cuộc Sống Của Bạn
          </h2>
          <p className="text-xl text-on-primary/80 mb-12 max-w-2xl mx-auto relative z-10">
            Liên hệ ngay để được ThS.BS. Trần Minh Dũng tư vấn và đặt lịch khám sớm nhất.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-tertiary-fixed-dim text-on-tertiary-fixed px-10 py-5 rounded-md font-bold text-lg premium-shadow flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>chat</span>
              Nhắn Tin Zalo Ngay
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-primary px-10 py-5 rounded-md font-bold text-lg premium-shadow flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">phone_in_talk</span>
              Gọi Hotline
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
