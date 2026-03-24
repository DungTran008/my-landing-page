"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 border-b border-blue-500/10 bg-white/70 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,45,98,0.08)]"
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 h-20">
        <div className="text-xl font-extrabold text-blue-900 tracking-tighter font-headline">BS DŨNG TMH</div>
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 font-headline font-semibold tracking-tight">
          <a className="text-slate-600 hover:text-blue-600 transition-colors" href="#symptoms">Triệu chứng</a>
          <a className="text-slate-600 hover:text-blue-600 transition-colors" href="#treatments">Điều trị</a>
          <a className="text-slate-600 hover:text-blue-600 transition-colors" href="#bio">Dịch vụ</a>
          <a className="text-slate-600 hover:text-blue-600 transition-colors" href="#testimonials">Giới thiệu</a>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-primary hover:bg-primary-container text-on-primary px-6 py-2.5 rounded-md font-label font-semibold transition-all duration-200 premium-shadow"
        >
          Liên hệ ngay
        </motion.button>
      </div>
    </motion.nav>
  );
}
