"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <header className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Ambient Glow Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-tertiary-fixed-dim/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-container/5 blur-[100px] rounded-full translate-y-1/4 -translate-x-1/4"></div>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:col-span-7 space-y-8 relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary font-semibold text-sm tracking-wide uppercase">
            <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim neon-glow animate-pulse"></span>
            Chuyên Gia Tai Mũi Họng
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold font-headline leading-[1.1] tracking-tight text-blue-900">
            Viêm xoang mạn tính nhiều năm?<br />
            <span className="text-primary-container">Cẩn thận bạn đang điều trị sai cách!</span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-2xl">
            ThS.BS. Trần Minh Dũng với 10 năm kinh nghiệm, tập trung chẩn đoán chính xác và tối ưu điều trị nội khoa, giúp giảm tái phát và tránh phẫu thuật không cần thiết.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white px-8 py-4 rounded-md font-bold flex items-center justify-center gap-2 premium-shadow hover:bg-primary-container transition-all"
            >
              <span className="material-symbols-outlined">chat</span>
              Nhắn tin Zalo
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-surface-container-lowest border border-outline-variant/30 text-primary px-8 py-4 rounded-md font-bold flex items-center justify-center gap-2 premium-shadow hover:bg-surface-container-low transition-all"
            >
              <span className="material-symbols-outlined">call</span>
              1900 56 56 56
            </motion.button>
          </div>
          {/* Trust Badges */}
          <div className="flex flex-wrap gap-6 pt-8 border-t border-outline-variant/20">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary-fixed-dim neon-glow">school</span>
              <span className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">Thạc sĩ Y khoa</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary-fixed-dim neon-glow">workspace_premium</span>
              <span className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">10 năm kinh nghiệm</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary-fixed-dim neon-glow">medical_services</span>
              <span className="text-sm font-bold text-on-surface-variant uppercase tracking-wider">BS Chuyên khoa TMH</span>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:col-span-5 relative"
        >
          <div className="relative rounded-2xl overflow-hidden aspect-[4/5] premium-shadow border border-white/20">
            <img
              alt="Professional studio portrait of Dr. Trần Minh Dũng"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuACOKxD8uDdGO_arPlSkRhh3VAEg-Nrhd9JSkQ3ePccTd4QhXqVZQ38tstJUIeIppkXz_-Ip9DsagAwgLvouK3EHJR2AnDLEVxStd9n6KWoDi1RXHFoU9iLaroHs5G0Fxre3_pcrNEQrxEmYyKZU6P_2xHNUHge0l4HhgGXaUFn9Wd82CtH67WJ1gT0ImaUJ_OWHXF07GsKuLurYr6TlvQrVUz6TE6nr52iaxmoBzrXA4DGdXXlB_YiPURTaZDrZNiaYHOgVuXxJ_w"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
          </div>
          {/* Floating Decorative Element */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-tertiary-fixed-dim/20 blur-3xl rounded-full"></div>
        </motion.div>
      </div>
    </header>
  );
}
