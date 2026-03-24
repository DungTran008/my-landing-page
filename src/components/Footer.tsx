import React from "react";

export default function Footer() {
  return (
    <footer className="w-full pt-16 pb-8 border-t border-slate-200 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="space-y-4">
          <div className="text-lg font-bold text-blue-900 font-headline">Dr. Dũng ENT</div>
          <p className="font-['Inter'] text-sm leading-relaxed text-slate-500">© 2024 Dr. Dũng ENT. Clinical Excellence in Otolaryngology.</p>
        </div>
        <div className="flex flex-col gap-3">
          <h5 className="font-bold text-blue-800 text-sm uppercase tracking-wider">Information</h5>
          <a className="text-slate-500 hover:text-blue-600 hover:underline decoration-blue-500/30 transition-all text-sm" href="#">Clinic Info</a>
          <a className="text-slate-500 hover:text-blue-600 hover:underline decoration-blue-500/30 transition-all text-sm" href="#">Medical Disclaimer</a>
        </div>
        <div className="flex flex-col gap-3">
          <h5 className="font-bold text-blue-800 text-sm uppercase tracking-wider">Resources</h5>
          <a className="text-slate-500 hover:text-blue-600 hover:underline decoration-blue-500/30 transition-all text-sm" href="#">Privacy Policy</a>
          <a className="text-slate-500 hover:text-blue-600 hover:underline decoration-blue-500/30 transition-all text-sm" href="#">Map & Directions</a>
        </div>
      </div>
    </footer>
  );
}
