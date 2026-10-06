import React, { useEffect } from "react";

export default function AdBanner({ slotId, format = "auto" }) {
  useEffect(() => {
    // Panggil script iklan jika nanti Google AdSense / Script Iklan sudah dipasang di index.html
    try {
      if (window.adsbygoogle && process.env.NODE_ENV === "production") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdSense Error:", e);
    }
  }, []);

  return (
    <div className="w-full my-2 flex flex-col items-center justify-center min-h-[50px]">
      {/* Label penanda area iklan */}
      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">
        Iklan / Advertisement
      </span>

      {/* Container Banner Iklan */}
      <div className="w-full bg-slate-100 border-2 border-dashed border-slate-300 rounded-2xl p-2 flex items-center justify-center text-center min-h-[60px] shadow-inner overflow-hidden">
        {/*
          TAMPILAN PROD: Tempat Tag AdSense Asli
          Uncomment tag ins di bawah jika script AdSense dari Google sudah disetujui
        */}
        {/* 
        <ins className="adsbygoogle"
             style={{ display: 'block', width: '100%' }}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot={slotId || "1234567890"}
             data-ad-format={format}
             data-full-width-responsive="true"></ins>
        */}

        {/* TAMPILAN DEV / PLACEHOLDER (Muncul saat belum pasang AdSense) */}
        <div className="flex items-center gap-2 text-slate-400 font-extrabold text-xs">
          <span>📢</span>
          <span>Space Iklan (Banner 320x50 / Responsive)</span>
        </div>
      </div>
    </div>
  );
}
