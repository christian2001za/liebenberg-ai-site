import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (consent === null) {
      // Show banner if no choice has been made
      setShowBanner(true);
    } else if (consent === "true") {
      // If previously accepted, load GA immediately
      loadGoogleAnalytics();
    }
  }, []);

  const loadGoogleAnalytics = () => {
    // Prevent loading twice
    if (document.getElementById("ga-script")) return;

    const gaId = "G-G9SN9V0NGW"; // Using the ID found in BaseLayout.astro

    const script = document.createElement("script");
    script.id = "ga-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    // @ts-ignore
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", gaId);
  };

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "true");
    setShowBanner(false);
    loadGoogleAnalytics();
  };

  const handleDecline = () => {
    localStorage.setItem("cookie_consent", "false");
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-4xl"
        >
          <div className="flex flex-col items-start gap-4 rounded-xl border border-white/10 bg-black/60 p-6 shadow-2xl backdrop-blur-md md:flex-row md:items-center md:justify-between md:gap-8">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-white">Cookies & Privacy</h3>
              <p className="text-sm text-gray-300">
                Wij gebruiken cookies om uw ervaring te verbeteren en het webverkeer te analyseren. 
                Door op "Accepteren" te klikken, gaat u akkoord met het gebruik van Google Analytics.
              </p>
            </div>
            <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto">
              <Button
                variant="outline"
                className="w-full border-white/20 bg-transparent text-white hover:bg-white/10 sm:w-auto"
                onClick={handleDecline}
              >
                Weigeren
              </Button>
              <Button
                variant="default"
                className="w-full bg-white text-black hover:bg-gray-200 sm:w-auto"
                onClick={handleAccept}
              >
                Accepteren
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
