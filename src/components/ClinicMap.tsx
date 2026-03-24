"use client";
import React from "react";
import { motion } from "framer-motion";

export default function ClinicMap() {
  return (
    <section className="py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-extrabold font-headline text-blue-900 mb-6">Địa Điểm Thăm Khám</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <span className="material-symbols-outlined text-primary">location_on</span>
                  <div>
                    <p className="font-bold">Phòng khám MEDLATEC Hạnh Thông</p>
                    <p className="text-on-surface-variant">Gò Vấp, TP. Hồ Chí Minh</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="material-symbols-outlined text-primary">schedule</span>
                  <div>
                    <p className="font-bold">Giờ làm việc</p>
                    <p className="text-on-surface-variant">Thứ 2 - Thứ 7: 17:00 - 20:00 <br /> Chủ Nhật và ngày Lễ: nghỉ</p>
                  </div>
                </div>
              </div>
            </div>
            <button className="text-primary font-bold flex items-center gap-2 hover:underline">
              <span className="material-symbols-outlined">directions</span>
              Chỉ đường trên Google Maps
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="h-[400px] rounded-2xl overflow-hidden premium-shadow border border-outline-variant/20 grayscale hover:grayscale-0 transition-all duration-700"
          >
            <img
              alt="Map Location"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWkTLjZaSkY4dPGGEAxZd6qsVdDYZrsM_9jmeyszuYRZ3Py8XQDYcCAeQlfIKe_0PgBjZSfrQQphpzls99X6H2OnY0SOmlohrnEyacY-G8h0QVBdIZqfr8NuwtkB5cxSBpZnHSw8rx4qHDHBu2ZFtc9uYBvNFj7TUr00pTw_I5LR-hNMFBFq0Q3LR-_4k4bT8Z3l8YZ98_7GbdWxuH4LnlZgsrk49xplTaaYv7J1n5Q6Ix942BSbCBZe-1Tcs7hpKY4ojgvZA28JQ"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
