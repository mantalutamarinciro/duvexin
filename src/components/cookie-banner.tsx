"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function CookieBanner() {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    // Vérifie si le consentement a déjà été donné
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Petit délai pour l'effet d'apparition après le chargement
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-4 right-4 md:left-auto md:right-8 z-[100] md:max-w-md w-auto"
        >
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-[2rem] p-6 md:p-8 overflow-hidden relative isolate">
            {/* Décoration subtile */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/2" />
            
            <div className="flex items-start gap-5">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                <Cookie className="h-6 w-6 text-primary" />
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Nous respectons votre vie privée
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                    Nous utilisons des cookies pour améliorer votre expérience, analyser le trafic et personnaliser nos services de déménagement.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={handleAccept} 
                    className="rounded-full px-6 bg-primary hover:bg-primary/90 text-white font-bold h-11"
                  >
                    Tout accepter
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={handleDecline}
                    className="rounded-full px-6 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900 h-11"
                  >
                    Continuer sans accepter
                  </Button>
                </div>

                <div className="pt-2 flex items-center gap-4">
                  <Link 
                    href="/politique-confidentialite" 
                    className="text-[11px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors flex items-center gap-1.5"
                    onClick={() => setIsVisible(false)}
                  >
                    En savoir plus <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </div>

              <button 
                onClick={() => setIsVisible(false)}
                className="absolute top-4 right-4 text-slate-300 hover:text-slate-600 transition-colors p-1"
                aria-label="Fermer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
