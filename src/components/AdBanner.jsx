import React, { useEffect, useRef } from "react";

export default function AdBanner({
  clientPublisherId = "ca-pub-4113212026336034", // Ganti dengan Publisher ID milikmu
  slotId = "1234567890", // Ganti dengan Slot ID AdSense milikmu
}) {
  const isPushed = useRef(false);

  useEffect(() => {
    if (!isPushed.current) {
      try {
        if (typeof window !== "undefined") {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          isPushed.current = true;
        }
      } catch (e) {
        console.error("AdSense Error:", e);
      }
    }
  }, []);

  return (
    <div className="w-full my-2 flex flex-col items-center justify-center">
      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">
        Iklan
      </span>

      {/* Kontainer Banner Persegi Panjang Horizontal (Max Height 90px) */}
      <div className="w-full max-w-md h-[90px] bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center overflow-hidden shadow-sm">
        <ins
          className="adsbygoogle"
          style={{
            display: "inline-block",
            width: "100%",
            height: "90px",
            maxHeight: "90px",
          }}
          data-ad-client={clientPublisherId}
          data-ad-slot={slotId}
          data-ad-format="horizontal"
          data-full-width-responsive="false"
        ></ins>
      </div>
    </div>
  );
}
