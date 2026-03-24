"use client";
import React from "react";
import { motion } from "framer-motion";

const formatRating = () => (
  <div className="flex text-yellow-500 mb-4">
    {[...Array(5)].map((_, i) => (
      <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>star</span>
    ))}
  </div>
);

const testimonials = [
  {
    text: '"Tôi bị viêm xoang 5 năm, đi nhiều nơi không khỏi. Nhờ bác sĩ Dũng tư vấn kỹ và điều trị nội khoa bài bản, giờ tôi đã hết hẳn nhức đầu."',
    initials: "AN",
    name: "Nguyễn Văn An",
    desc: "Bệnh nhân Viêm xoang"
  },
  {
    text: '"Bác sĩ giải thích cực kỳ chi tiết, không lạm dụng kháng sinh như những nơi khác. Rất an tâm khi khám ở đây."',
    initials: "HL",
    name: "Trần Thị Hoa Lan",
    desc: "Bệnh nhân Dị ứng"
  },
  {
    text: '"Dịch vụ chuyên nghiệp, sạch sẽ. Bác sĩ Dũng rất mát tay trong việc điều trị nấm tai cho con tôi."',
    initials: "MH",
    name: "Lê Minh Hiếu",
    desc: "Phụ huynh bệnh nhi"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-surface-container-low" id="testimonials">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold font-headline text-blue-900 mb-4">Phản Hồi Từ Bệnh Nhân</h2>
          <p className="text-on-surface-variant">Sự tin tưởng của bạn là động lực để chúng tôi không ngừng hoàn thiện.</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="bg-white p-8 rounded-2xl premium-shadow relative"
            >
              {formatRating()}
              <p className="text-on-surface-variant mb-6 italic">{item.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                  {item.initials}
                </div>
                <div>
                  <p className="font-bold text-sm">{item.name}</p>
                  <p className="text-xs text-on-surface-variant">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
