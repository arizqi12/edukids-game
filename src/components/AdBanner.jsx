import React, { useEffect } from "react";

export default function AdBanner({ slotId = "1234567890" }) {
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdSense Error:", e);
    }
  }, []);

  return (
    <div className="w-full my-2 flex flex-col items-center justify-center">
      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">
        Iklan
      </span>

      <div className="w-full min-h-[90px] max-w-md bg-slate-100 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center overflow-hidden p-1 shadow-inner">
        <ins
          className="adsbygoogle"
          style={{ display: "block", width: "100%" }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Ganti dengan Publisher ID milikmu
          data-ad-slot={slotId} // Ad Slot ID AdSense
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </div>
  );
}
