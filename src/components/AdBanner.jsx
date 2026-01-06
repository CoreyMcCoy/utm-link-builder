export default function AdBanner() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-lg">
      <div className="max-w-4xl mx-auto px-6">
        {/* 
          Google AdSense Container
          Replace the placeholder below with your AdSense code:
          
          <ins className="adsbygoogle"
               style={{ display: "block" }}
               data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
               data-ad-slot="XXXXXXXXXX"
               data-ad-format="horizontal"
               data-full-width-responsive="true">
          </ins>
          
          Then add this script to your index.html:
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
        */}

        {/* Placeholder - Replace with actual AdSense code */}
        <div
          className="h-[90px] flex items-center justify-center bg-gradient-to-r from-slate-50 to-slate-100 text-slate-400 text-sm"
          aria-label="Advertisement"
        >
          <div className="text-center">
            <div className="font-medium">Advertisement</div>
            <div className="text-xs text-slate-300">728x90 Leaderboard</div>
          </div>
        </div>
      </div>
    </div>
  );
}
