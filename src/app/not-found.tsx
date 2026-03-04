'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, Search, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 selection:bg-[#00ad9f]/20 selection:text-[#00ad9f]">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#00ad9f]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-2xl text-center"
      >
        <div className="mb-12 flex justify-center">
          <Link href="/">
            <Logo />
          </Link>
        </div>

        <div className="relative mb-8">
          <h1 className="text-[12rem] md:text-[18rem] font-black text-slate-200/50 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-8 md:pt-16">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-white/80 backdrop-blur-md border border-slate-200 shadow-2xl rounded-[2.5rem] p-8 md:p-12 max-w-lg"
            >
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                Oups ! Cette page a <br />
                <span className="text-[#00ad9f]">déjà déménagé.</span>
              </h2>
              <p className="text-slate-500 font-light leading-relaxed text-lg mb-8">
                Désolé, l'adresse que vous recherchez n'existe plus ou a été déplacée. 
                Mais ne vous inquiétez pas, on vous aide à retrouver votre chemin !
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="rounded-full h-14 px-8 bg-[#00ad9f] hover:bg-[#009286] text-white font-bold shadow-lg shadow-[#00ad9f]/20 transition-all hover:scale-105"
                  asChild
                >
                  <Link href="/">
                    <Home className="mr-2 h-5 w-5" /> Retour à l'accueil
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="rounded-full h-14 px-8 border-slate-200 text-slate-700 hover:bg-slate-50 font-bold"
                  asChild
                >
                  <Link href="/services">
                    Nos Services
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Quick Links Footer */}
        <div className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="flex flex-col items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-[#00ad9f]">
              <MapPin className="h-5 w-5" />
            </div>
            <Link href="/zones-intervention" className="text-sm font-bold text-slate-600 hover:text-[#00ad9f] transition-colors">
              Nos Zones
            </Link>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-[#00ad9f]">
              <Search className="h-5 w-5" />
            </div>
            <Link href="/calculateur-volume" className="text-sm font-bold text-slate-600 hover:text-[#00ad9f] transition-colors">
              Estimer un volume
            </Link>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-[#00ad9f]">
              <Phone className="h-5 w-5" />
            </div>
            <a href="tel:+33130751235" className="text-sm font-bold text-slate-600 hover:text-[#00ad9f] transition-colors">
              01 30 75 12 35
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
