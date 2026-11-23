const Footer = () => {
  return (
    <footer className="border-t border-stone-200/80 bg-white/60 py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-medium">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-stone-900 tracking-tight">
            Savor<span className="text-amber-600">.</span>
          </span>
          <span>— Handcrafted culinary discovery.</span>
        </div>
        <div className="flex items-center gap-6">
          <span>Powered by Forkify API</span>
          <span>•</span>
          <span>Persistent Kitchen Vault</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
