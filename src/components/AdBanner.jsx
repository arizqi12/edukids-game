import React, { useEffect, useRef } from "react";

export default function AdBanner({ zoneId = "11966471" }) {
  const adRef = useRef(null);

  useEffect(() => {
    if (adRef.current && adRef.current.children.length === 0) {
      const script = document.createElement("script");
      script.src = "https://n6wxm.com/vignette.min.js";
      script.dataset.zone = zoneId;
      script.async = true;
      adRef.current.appendChild(script);
    }
  }, [zoneId]);

  return (
    <div className="w-full my-1 flex flex-col items-center justify-center">
      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">
        Iklan
      </span>

      <div
        ref={adRef}
        className="w-full min-h-[60px] max-w-md bg-slate-100 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center overflow-hidden p-1 shadow-inner"
      />
    </div>
  );
}
