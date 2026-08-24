import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MapPin, Calendar, Clock, Volume2, VolumeX, ChevronDown } from "lucide-react";

/**
 * Premium Sri Lankan Wedding Invitation Theme
 * Names: Dineshkanth & Rajalakshmi
 * Background: Cream/Sand
 * Accents: Green/Brown
 */

const mandalaImage = "/images/mandala_gold.png";
const brideGroomImage = "/images/10.png";

type InviteImageProps = React.ComponentProps<"img"> & {
  eager?: boolean;
};

function InviteImage({ eager = false, loading, decoding, ...props }: InviteImageProps) {
  return (
    <img
      loading={loading ?? (eager ? "eager" : "lazy")}
      decoding={decoding ?? "async"}
      {...props}
    />
  );
}

function MandalaFrame({ minimal = false }: { minimal?: boolean }) { return null; }

function AudioPlayer({ isPlaying, src }: { isPlaying: boolean; src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(e => console.log('Audio autoplay blocked:', e));
    }
  }, [isPlaying]);

  return (
    <>
      <audio ref={audioRef} src={src} loop />
      {isPlaying && (
        <button
          onClick={() => {
            if (audioRef.current) {
              if (muted) {
                audioRef.current.play();
                setMuted(false);
              } else {
                audioRef.current.pause();
                setMuted(true);
              }
            }
          }}
          className="fixed bottom-4 left-4 z-[99] bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-amber-200 text-amber-600 hover:bg-white transition-all"
        >
          {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
      )}
    </>
  );
}

function FloatingPetals({ disabled = false }: { disabled?: boolean }) {
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);
  const [petals, setPetals] = useState<Array<{
    id: number;
    x: number;
    size: number;
    rotation: number;
    duration: number;
    delay: number;
    color: string;
    drift: number;
  }>>([]);

  useEffect(() => {
    if (disabled) {
      setPetals([]);
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;
    setIsLowPowerMode(reduceMotion || isMobile);

    if (reduceMotion) {
      setPetals([]);
      return;
    }

    const colors = ["#FFFBEB", "#FEF3C7", "#FDE68A", "#FCD34D", "#FEF3C7", "#FDE68A", "#F59E0B", "#D97706"];
    const petalCount = isMobile ? 6 : 10;
    const newPetals = Array.from({ length: petalCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 4 + 4,
      rotation: Math.random() * 360,
      duration: Math.random() * 11 + 16,
      delay: Math.random() * 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      drift: Math.random() * 24 - 12,
    }));

    setPetals(newPetals);
  }, [disabled]);

  if (disabled) {
    return null;
  }

  return (
    <div className={`pointer-events-none fixed inset-0 overflow-hidden z-40 ${isLowPowerMode ? "opacity-70" : ""}`}>
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute drop-shadow-[0_2px_6px_rgba(236,72,153,0.4)]"
          style={{ color: petal.color }}
          initial={{
            x: `${petal.x}vw`,
            y: "-10vh",
            rotate: petal.rotation,
            opacity: 0,
          }}
          animate={{
            y: "110vh",
            x: `${petal.x + petal.drift}vw`,
            rotate: petal.rotation + (isLowPowerMode ? 360 : 720),
            opacity: [0, 0.6, 0.4, 0],
          }}
          transition={{
            duration: isLowPowerMode ? petal.duration * 1.2 : petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "linear",
          }}
        >
          <svg
            width={petal.size}
            height={petal.size}
            viewBox="0 0 24 24"
            fill="currentColor"
            className="drop-shadow-sm"
          >
            <path d="M12,2C12,2 10,6 10,10C10,14 12,22 12,22C12,22 14,14 14,10C14,6 12,2 12,2Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

function CountdownTimer() {
  const targetDate = new Date("September 17, 2026 08:07:00").getTime();
  const [timeLeft, setTimeLeft] = useState(targetDate - Date.now());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(targetDate - Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const stats = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];

  return (
    <div className="flex flex-wrap gap-2 sm:gap-4 md:gap-8 justify-center w-full max-w-4xl mx-auto mt-8 md:mt-16 z-20 px-2">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.15, type: "spring", stiffness: 80 }}
          className="relative group"
        >
          {/* Ornamental Frame container */}
          <div className="relative w-[4.5rem] h-[6.5rem] sm:w-20 sm:h-28 md:w-32 md:h-44 bg-white rounded-t-full shadow-[0_15px_35px_-10px_rgba(0,0,0,0.08)] border border-amber-100/60 flex flex-col items-center justify-center overflow-hidden transition-transform duration-700 group-hover:-translate-y-3">
            <div className="absolute top-0 right-0 opacity-[0.03] paper-grain w-full h-full pointer-events-none" />
            <div className="absolute inset-1.5 sm:inset-2 md:inset-3 border-[0.5px] border-amber-300/50 rounded-t-full pointer-events-none" />

            {/* The Number */}
            <span className="text-2xl sm:text-3xl md:text-5xl font-playball text-theme-800 text-gold-shiny leading-none relative z-10 drop-shadow-sm mt-3 sm:mt-4 md:mt-6 transition-transform duration-500 group-hover:scale-110">
              {Math.max(0, stat.value).toString().padStart(2, '0')}
            </span>

            {/* The Label */}
            <div className="w-full flex justify-center mt-2 sm:mt-3 md:mt-6 mb-1 sm:mb-2 relative z-10">
              <span className="text-[5px] sm:text-[6px] md:text-[8px] uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] text-stone-500 font-bold px-2 sm:px-3 py-1 sm:py-1.5 bg-stone-50 rounded-full border border-theme-100/50 shadow-sm whitespace-nowrap">
                {stat.label}
              </span>
            </div>

            {/* Bottom decoration */}
            <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 w-[3px] h-[3px] sm:w-1 sm:h-1 md:w-1.5 md:h-1.5 rotate-45 bg-amber-400" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function WelcomeScreen({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
      className="absolute inset-0 w-full h-[100dvh] z-50 overflow-hidden flex flex-col items-center justify-end pb-12 md:pb-16"
    >
      {/* The full screen image as background */}
      <img 
        src="/ChatGPT Image Aug 24, 2026, 10_49_12 PM.png" 
        alt="Welcome" 
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none" 
      />
      
      {/* Button at the bottom */}
      <div className="relative z-10 w-full max-w-xs px-6 mt-auto flex justify-center">
        <button 
          onClick={onOpen}
          className="w-full bg-white/90 backdrop-blur-md border border-amber-200 shadow-[0_8px_30px_rgb(0,0,0,0.15)] rounded-2xl py-4 px-8 text-stone-700 text-xs md:text-sm font-bold tracking-[0.3em] uppercase hover:bg-white hover:scale-105 hover:shadow-xl transition-all duration-300"
        >
          Tap To Begin
        </button>
      </div>
    </motion.div>
  );
}
function ScratchCard({ children }: { children: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScratched, setIsScratched] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;

    ctx.fillStyle = '#c49a45'; // Gold
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = '16px "Playball", cursive';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Scratch to Reveal', canvas.width / 2, canvas.height / 2);

    let isDrawing = false;
    const totalPixels = canvas.width * canvas.height;

    const getPosition = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const scratch = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing || isScratched) return;
      e.preventDefault();

      const { x, y } = getPosition(e);
      
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 24, 0, Math.PI * 2);
      ctx.fill();

      if (Math.random() > 0.8) checkScratched();
    };

    const checkScratched = () => {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let clearPixels = 0;
      for (let i = 3; i < imageData.data.length; i += 4) {
        if (imageData.data[i] === 0) clearPixels++;
      }
      
      if (clearPixels / totalPixels > 0.4) {
        setIsScratched(true);
        canvas.style.transition = 'opacity 0.6s ease-out';
        canvas.style.opacity = '0';
        setTimeout(() => { canvas.style.pointerEvents = 'none'; }, 600);
      }
    };

    const startDrawing = (e: MouseEvent | TouchEvent) => {
      isDrawing = true;
      scratch(e);
    };
    const stopDrawing = () => { isDrawing = false; };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);
    
    canvas.addEventListener('touchstart', startDrawing, { passive: false });
    canvas.addEventListener('touchmove', scratch, { passive: false });
    canvas.addEventListener('touchend', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', scratch);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseleave', stopDrawing);
      
      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchmove', scratch);
      canvas.removeEventListener('touchend', stopDrawing);
    };
  }, [isScratched]);

  return (
    <div ref={containerRef} className="relative w-full max-w-[320px] h-[160px] mx-auto rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(245,158,11,0.2)] bg-white border-2 border-amber-200/50 flex items-center justify-center">
      <div className="absolute inset-0 z-0 flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-white p-6">
        {children}
      </div>
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-10 cursor-crosshair touch-none" 
      />
    </div>
  );
}

function ScratchDateSection() {
  return (
    <section 
      className="cv-auto py-24 md:py-36 bg-white relative overflow-hidden border-t border-theme-100/30 text-center"
      style={{ backgroundImage: "url('/footer-bg.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
    >
      <div className="absolute inset-0 opacity-[0.02] paper-grain pointer-events-none" />
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-playball text-4xl md:text-5xl text-theme-900 mb-4 drop-shadow-sm">Save The Date</h2>
          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-stone-500 font-bold mb-12">Scratch below to reveal</p>
          
          <ScratchCard>
            <p className="font-cinzel font-bold text-2xl text-theme-900 leading-tight">17th September<br/>2026</p>
            <p className="text-[9px] uppercase tracking-widest text-amber-600 font-bold mt-4">Dineshkanth & Rajalakshmi</p>
          </ScratchCard>
        </motion.div>
      </div>
    </section>
  );
}

function RsvpSection() {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<"yes" | "no" | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !attending) return;
    setSubmitted(true);
  };

  return (
    <section 
      className="cv-auto py-24 md:py-36 bg-[#fdfaf5] relative overflow-hidden border-t border-theme-200/50"
      style={{ backgroundImage: "url('/family-bg.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
    >
      <div className="absolute inset-0 opacity-[0.03] paper-grain pointer-events-none" />
      <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-playball text-4xl md:text-6xl text-theme-900 mb-4 drop-shadow-sm">RSVP</h2>
          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-stone-500 font-bold mb-12">We can't wait to celebrate with you</p>
          
          <div className="bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-[2rem] shadow-[0_20px_50px_-15px_rgba(245,158,11,0.1)] border border-amber-200/60 max-w-2xl mx-auto mb-16 relative">
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-12">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-amber-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-cinzel text-2xl md:text-3xl text-theme-900 font-bold mb-3">Thank You!</h3>
                <p className="text-stone-500 font-medium text-sm">Your response has been recorded.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label htmlFor="name" className="block text-[10px] md:text-xs uppercase tracking-[0.2em] text-stone-500 font-bold mb-3 text-left">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full bg-transparent border-b-2 border-amber-200 px-0 py-3 text-stone-700 font-medium placeholder:text-stone-300 focus:outline-none focus:border-amber-400 transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="pt-2">
                  <label className="block text-[10px] md:text-xs uppercase tracking-[0.2em] text-stone-500 font-bold mb-4 text-left">Will you attend?</label>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="button"
                      onClick={() => setAttending('yes')}
                      className={`flex-1 py-4 rounded-xl border transition-all duration-300 ${attending === 'yes' ? 'border-amber-400 bg-amber-50 shadow-md' : 'border-amber-200/60 bg-white/50 hover:border-amber-300'}`}
                    >
                      <span className={`text-[10px] md:text-xs uppercase tracking-[0.15em] font-bold ${attending === 'yes' ? 'text-amber-700' : 'text-stone-500'}`}>Joyfully Accept</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAttending('no')}
                      className={`flex-1 py-4 rounded-xl border transition-all duration-300 ${attending === 'no' ? 'border-amber-400 bg-amber-50 shadow-md' : 'border-amber-200/60 bg-white/50 hover:border-amber-300'}`}
                    >
                      <span className={`text-[10px] md:text-xs uppercase tracking-[0.15em] font-bold ${attending === 'no' ? 'text-amber-700' : 'text-stone-500'}`}>Regretfully Decline</span>
                    </button>
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={!name.trim() || !attending}
                    className="w-full bg-gradient-to-r from-[#c49a45] to-[#e0c086] text-white py-4 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs hover:from-[#e0c086] hover:to-[#c49a45] transition-all duration-300 shadow-lg shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit RSVP
                  </button>
                </div>
              </form>
            )}
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 md:gap-12 text-center relative max-w-2xl mx-auto pt-8 border-t border-amber-200/50">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#fdfaf5] px-4">
              <div className="w-2 h-2 rotate-45 bg-amber-200" />
            </div>

            <div className="flex-1 space-y-4">
              <strong className="text-theme-900 text-[10px] md:text-sm uppercase tracking-[0.2em] block mb-4">Mr. & Mrs. Nallarasu</strong>
              <p className="text-stone-500 leading-loose text-xs md:text-sm font-medium">
                No. 15/1, Vimaladharma Mawatha,<br />
                Badulla.
              </p>
              <div className="pt-2">
                <a href="tel:0770752976" className="inline-block px-6 py-2 bg-white rounded-full border border-amber-200 text-amber-700 font-semibold tracking-widest text-[10px] md:text-xs hover:bg-amber-50 transition-colors shadow-sm">
                  077 - 0752976
                </a>
              </div>
            </div>

            <div className="hidden md:block w-px h-24 bg-gradient-to-b from-transparent via-amber-200 to-transparent" />
            <div className="md:hidden h-px w-full bg-gradient-to-r from-transparent via-amber-200 to-transparent" />

            <div className="flex-1 space-y-4 pt-4 md:pt-0">
              <strong className="text-theme-900 text-[10px] md:text-sm uppercase tracking-[0.2em] block mb-4">Mr. & Mrs. Rajendren</strong>
              <p className="text-stone-500 leading-loose text-xs md:text-sm font-medium">
                No. 422, Aluthmawathu Road,<br />
                Colombo - 15.
              </p>
              <div className="pt-2">
                <a href="tel:0778651027" className="inline-block px-6 py-2 bg-white rounded-full border border-amber-200 text-amber-700 font-semibold tracking-widest text-[10px] md:text-xs hover:bg-amber-50 transition-colors shadow-sm">
                  077 - 8651027
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


function WelcomeSection({ guestFullName }: { guestFullName?: string | null }) {
  return (
    <section 
      className="cv-auto py-24 md:py-40 bg-[#fdfaf5] relative overflow-hidden border-t border-theme-200/50"
      style={{ backgroundImage: "url('/invitation-bg.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
    >
      {/* Premium Background Elements */}
      <div className="absolute inset-0 opacity-[0.03] paper-grain pointer-events-none" />
      <div className="absolute -top-[20rem] -right-[20rem] w-[40rem] h-[40rem] bg-amber-100/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-[20rem] -left-[20rem] w-[40rem] h-[40rem] bg-theme-100/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 max-w-5xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative bg-white/80 backdrop-blur-md p-8 md:p-20 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(245,158,11,0.15)] border border-amber-200/60"
        >
          {/* Ornate Inner Border */}
          <div className="absolute inset-4 md:inset-6 border border-amber-300/30 rounded-[2.5rem] pointer-events-none" />
          <div className="absolute inset-5 md:inset-8 border-[0.5px] border-theme-300/20 rounded-[2rem] pointer-events-none" />

          {/* Corner Elements */}
          <div className="absolute top-8 left-8 w-12 h-12 border-t-[1.5px] border-l-[1.5px] border-amber-400/60 rounded-tl-3xl opacity-70 hidden md:block" />
          <div className="absolute top-8 right-8 w-12 h-12 border-t-[1.5px] border-r-[1.5px] border-amber-400/60 rounded-tr-3xl opacity-70 hidden md:block" />
          <div className="absolute bottom-8 left-8 w-12 h-12 border-b-[1.5px] border-l-[1.5px] border-amber-400/60 rounded-bl-3xl opacity-70 hidden md:block" />
          <div className="absolute bottom-8 right-8 w-12 h-12 border-b-[1.5px] border-r-[1.5px] border-amber-400/60 rounded-br-3xl opacity-70 hidden md:block" />

          <h2 className="font-playball text-4xl md:text-6xl text-theme-900 mb-6 md:mb-8 drop-shadow-sm pt-4 md:pt-0">Wedding Invitation</h2>
          
          <div className="flex items-center justify-center gap-4 mb-10 md:mb-12 opacity-80">
            <div className="h-[1px] w-12 md:w-32 bg-gradient-to-r from-transparent via-amber-400 to-theme-500" />
            <div className="w-2 h-2 rotate-45 bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)] shrink-0" />
            <div className="h-[1px] w-12 md:w-32 bg-gradient-to-l from-transparent via-amber-400 to-theme-500" />
          </div>

          <div className="text-stone-700 font-montserrat text-sm md:text-base leading-loose max-w-3xl mx-auto space-y-12">

            <div className="space-y-4 md:space-y-6 pt-2">
              <p className="px-2 md:px-16 text-stone-600 font-light leading-loose text-xs md:text-base">
                {guestFullName ? (
                  <>Dear <span className="font-semibold text-amber-700">{guestFullName}</span>, we cordially solicit your esteemed presence and blessing with family and friends on the auspicious occasion of the marriage of</>
                ) : (
                  <>Cordially solicit your esteemed presence and blessing with family and friends on the auspicious occasion of the marriage of</>
                )}
              </p>
            </div>

            <div className="py-8 md:py-12 space-y-8 md:space-y-10 relative">
              {/* Premium Dividers */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[1px] bg-gradient-to-r from-transparent via-amber-300 to-transparent -z-10 opacity-30" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-[120%] bg-gradient-to-b from-transparent via-amber-300 to-transparent -z-10 hidden md:block opacity-30" />

              <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                <div className="bg-white/95 backdrop-blur-sm px-6 py-8 rounded-3xl shadow-sm border border-amber-100/50 w-full md:w-[340px] flex flex-col items-center">
                  <h3 className="font-cinzel text-3xl md:text-4xl font-bold text-theme-900 drop-shadow-sm mb-6">N. Dineshkanth</h3>
                  <div className="space-y-4 w-full text-center">
                    <p className="text-[10px] md:text-xs text-stone-600 tracking-[0.1em] md:tracking-[0.15em] font-medium leading-relaxed">
                      <span className="text-amber-700 font-bold block mb-1">G/S. of</span>
                      Late. Dhuraivel & Late. Sellaiyah
                    </p>
                    <div className="w-12 h-px bg-amber-200/60 mx-auto" />
                    <p className="text-[10px] md:text-xs text-stone-600 tracking-[0.1em] md:tracking-[0.15em] font-medium leading-relaxed">
                      <span className="text-amber-700 font-bold block mb-1">S/o.</span>
                      Nallarasu & Annaletchumy
                    </p>
                  </div>
                </div>

                <div className="flex justify-center items-center py-4 md:py-0 relative z-10">
                  <div className="bg-white/90 rounded-full w-16 h-16 md:w-24 md:h-24 flex items-center justify-center shadow-md border border-amber-200">
                    <span className="font-playball text-2xl md:text-4xl text-amber-600 tracking-wider">weds</span>
                  </div>
                </div>

                <div className="bg-white/95 backdrop-blur-sm px-6 py-8 rounded-3xl shadow-sm border border-amber-100/50 w-full md:w-[340px] flex flex-col items-center">
                  <h3 className="font-cinzel text-3xl md:text-4xl font-bold text-theme-900 drop-shadow-sm mb-6">R. Rajalakshmi</h3>
                  <div className="space-y-4 w-full text-center">
                    <p className="text-[10px] md:text-xs text-stone-600 tracking-[0.1em] md:tracking-[0.15em] font-medium leading-relaxed">
                      <span className="text-amber-700 font-bold block mb-1">D/o.</span>
                      Rajrendran & Kanagachandrika
                    </p>
                    <div className="w-12 h-px bg-amber-200/60 mx-auto" />
                    <p className="text-[10px] md:text-xs text-stone-600 tracking-[0.1em] md:tracking-[0.15em] font-medium leading-relaxed">
                      <span className="text-amber-700 font-bold block mb-1">G/D. of</span>
                      Late. Raamaiyah & Late. Kanagarathnam
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mt-12 md:mt-16 mb-8 mx-2 md:mx-12">
              {/* Outer Glow & Shape */}
              <div className="absolute inset-0 border-[1px] border-amber-300/40 rounded-t-[10rem] rounded-b-[2rem] transform scale-[1.03] pointer-events-none" />
              
              <div className="bg-gradient-to-br from-white via-amber-50/40 to-white p-8 md:p-14 rounded-t-[10rem] rounded-b-[2rem] border-[1px] border-amber-200/60 shadow-[0_15px_40px_rgba(245,158,11,0.08)] relative overflow-hidden flex flex-col items-center text-center">
                
                {/* Decorative inner arch lines */}
                <div className="absolute top-4 left-4 right-4 bottom-4 border-[0.5px] border-amber-200/50 rounded-t-[10rem] rounded-b-[1.5rem] pointer-events-none" />
                
                <p className="uppercase tracking-[0.3em] md:tracking-[0.4em] text-[8px] md:text-[10px] font-bold text-amber-600/80 mb-8 pt-6 md:pt-4">At a Religious Ceremony</p>
                
                {/* Unique Date Layout */}
                <div className="flex items-center justify-center gap-4 md:gap-10 mb-8 w-full relative px-2">
                  <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-amber-200/40 -z-10" />
                  
                  <div className="flex flex-col items-end bg-gradient-to-br from-white via-amber-50/40 to-white px-3 py-1">
                    <span className="font-cinzel text-[10px] md:text-sm font-bold text-stone-500 uppercase tracking-widest">Thursday</span>
                    <span className="font-cinzel text-[8px] md:text-xs font-bold text-amber-600 uppercase tracking-widest">2026</span>
                  </div>
                  
                  <div className="bg-gradient-to-br from-white via-amber-50/40 to-white px-4 py-2 flex flex-col items-center">
                    <span className="font-playball text-5xl md:text-7xl text-theme-900 drop-shadow-sm leading-none">17</span>
                  </div>

                  <div className="flex flex-col items-start bg-gradient-to-br from-white via-amber-50/40 to-white px-3 py-1">
                    <span className="font-cinzel text-[10px] md:text-sm font-bold text-stone-500 uppercase tracking-widest">Sept</span>
                    <span className="font-cinzel text-[8px] md:text-xs font-bold text-amber-600 uppercase tracking-widest">Month</span>
                  </div>
                </div>

                {/* Time Block */}
                <div className="flex flex-col items-center gap-1 mb-10 bg-white/60 px-8 py-3 rounded-full border border-amber-100 shadow-[0_2px_10px_rgba(245,158,11,0.05)] backdrop-blur-sm">
                  <span className="text-[8px] md:text-xs font-bold text-amber-700 uppercase tracking-[0.2em] md:tracking-[0.3em]">Muhurtham</span>
                  <span className="font-cinzel font-bold text-xs md:text-lg text-theme-900">08.07 Am - 10.07 Am</span>
                </div>

                {/* Separator */}
                <div className="w-12 h-[1px] bg-amber-300 mb-10" />

                {/* Location Block */}
                <div className="flex flex-col items-center gap-3 w-full">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-50 rounded-full flex items-center justify-center border border-amber-200 mb-1 shadow-sm">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 text-amber-600" />
                  </div>
                  <p className="font-cinzel font-bold text-xl md:text-3xl text-theme-900 drop-shadow-sm px-2">River Side Hotel Inn</p>
                  <p className="text-[9px] md:text-xs text-stone-500 uppercase tracking-[0.3em] font-bold">Badulla</p>
                </div>
                
                {/* Footer Quote */}
                <div className="mt-12 bg-amber-50/50 w-[120%] py-5 border-t border-amber-100 flex justify-center text-center px-6">
                  <p className="text-stone-600 italic font-serif text-[11px] md:text-base leading-relaxed tracking-wide max-w-[220px] md:max-w-none">
                    "To bless the Couple and thereafter join us for lunch"
                  </p>
                </div>
              </div>
            </div>

            {/* Contact details extracted to RsvpSection */}

            <div className="pt-8 md:pt-12 pb-2 md:pb-4">
              <p className="text-theme-800 italic font-playball text-xl md:text-3xl text-center w-full px-4 tracking-wide">
                "With Best Compliments from Friends & Relatives"
              </p>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}

function OurStorySection() {
  return (
    <section 
      className="cv-auto py-24 md:py-32 bg-[#f0eceb] relative overflow-hidden border-t border-theme-100/30"
      style={{ backgroundImage: "url('/invitation-bg.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
    >
      <div className="absolute inset-0 opacity-[0.02] paper-grain pointer-events-none" />
      <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center font-noto-tamil">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-xs text-amber-600 mb-4 font-bold">
            ஸ்ரீ விநாயகர் துணை | ஸ்ரீ ராமஜெயம் | சஞ்ஜீவி ராய பெருமாள் துணை
          </div>
          <h2 className="text-3xl md:text-4xl text-theme-900 mb-6 drop-shadow-sm font-bold">திருமண அழைப்பிதழ்</h2>
          <div className="w-16 h-px bg-amber-400 mx-auto mb-8" />
          <div className="text-stone-700 text-sm md:text-base leading-loose max-w-2xl mx-auto space-y-6">
            <p>அன்புடையீர்,</p>
            <p>
              நிகழும் மங்களகரமான பராபவ வருடம் ஆவணி மாதம் 10-ம் திகதி (27-08-2026) வியாழக்கிழமை அவிட்ட நட்சத்திரமும் துலா லக்னமும் பூரணை திதியும் சித்தயோகமும் கூடிய சுபயோக சுபதினத்தில் காலை 10.27 மணி முதல் 11.15 மணி வரையுள்ள சுபமுகூர்த்த வேளையில்
            </p>
            <p>
              ஹட்டனைச் சேர்ந்த தெய்வத்திரு. ராமலிங்கம் நாயுடு - பார்வதி, ஹட்டனைச் சேர்ந்த தெய்வத்திரு. ராமசாமி நாயுடு லக்ஷ்மி ஆகியோரது பேரனும், தெய்வத்திரு. ஸ்ரீ பிரகாஷ் ராம் இன் சகோதரரும், தெய்வத்திரு. பாலகிருஷ்ணன் நாயுடு - திருமதி ஜானகியின் கனிஷ்ட புதல்வன் திருநிறைச்செல்வன்<br />
              <strong className="text-lg text-theme-900 block mt-1">ராமேஷ் கண்ணா (பிரவின்)<br /><span className="text-xs font-normal">BBM, ACMA, CGMA</span></strong>
            </p>
            <p>
              கடலூர் (தொழுதூர்) தெய்வத்திரு. கந்தசாமி சேர்வை - பெருமாயி, திருச்சி (மருதூர்) தெய்வத்திரு. தங்கமுத்து சேர்வை - கமலம் ஆகியோரது பேத்தியும், திரு. சிவலிங்கம் சேர்வை திருமதி ரேணுகாதேவியின் சிரேஷ்ட புதல்வி திருநிறைச்செல்வி<br />
              <strong className="text-lg text-theme-900 block mt-1">திஸ்மிலா<br /><span className="text-xs font-normal leading-normal">ABE (UK), PGDBM, MBA (In Read)<br />(CACHI NUTRI - Proprietor)</span></strong>
            </p>
            <p>
              ஆகிய இருவருக்கும் இறைவன் திருவருள் துணைகொண்டு பெரியோர்களால் நிச்சயிக்கப்பட்டு, <strong>Royal Monarch Banquet Hall</strong>, (Ram Cinemas, Hendala Junction, Wattala) நடைபெறும் திருமண நிகழ்விற்கு தாங்கள் குடும்ப சகிதம் வருகை தந்து மணமக்களை ஆசீர்வதிக்குமாறு அன்புடன் அழைக்கின்றோம்.
            </p>

            <div className="text-center mt-8 text-xs font-bold text-theme-800">
              இங்ஙனம் தங்கள் நல்வரவை இனிதே விரும்பும்
            </div>

            <div className="flex flex-col md:flex-row justify-between text-xs mt-4 gap-8 text-left">
              <div>
                <strong>திருமதி ஜானகி பாலகிருஷ்ணன் நாயுடு</strong><br />
                திரு.திருமதி பாலமுரளி பிரவீணா (சகோதரன்)<br />
                திரு.திருமதி நந்தகோபன் யாழினி (சகோதரன்)<br />
                திரு.திருமதி ராஜ்மோகன் ரம்யா (சகோதரி)<br />
                திரு.திருமதி சிவபாலன் மங்களா (சகோதரி)<br />
                NEXUS VILLA, 54-6/3, ஈ.எஸ். பெர்ணான்டோ மாவத்தை, கொழும்பு 06<br />
                +9477-3334296, +9477-3570810
              </div>
              <div>
                <strong>திரு.திருமதி சிவலிங்கம் ரேணுகாதேவி தம்பதிகள்</strong><br />
                செல்வி லக்ஷிலா B.Sc. (Hons) (சகோதரி)<br />
                30ஈ, ஸ்ரீ சித்தார்த்த வீதி, கிருலப்பனை, கொழும்பு - 05<br />
                +9474-0547962, +9477-5686864
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProposalSection() {
  return (
    <section className="cv-auto py-24 md:py-32 bg-[#f0eceb] relative overflow-hidden border-t border-theme-100/30">
      <div className="absolute inset-0 opacity-[0.02] paper-grain pointer-events-none" />
      <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-playball text-4xl md:text-5xl text-theme-900 mb-6 drop-shadow-sm">The Proposal</h2>
          <div className="w-16 h-px bg-amber-400 mx-auto mb-8" />
          <p className="text-stone-600 font-montserrat text-sm md:text-base leading-loose max-w-2xl mx-auto mb-4">
            On December 23, 2024, beneath the twinkling lights of Central Park, one unforgettable question changed our lives forever.
          </p>
          <p className="text-stone-600 font-montserrat text-sm md:text-base leading-loose max-w-2xl mx-auto">
            With a heartfelt “Yes,” a new chapter began. Now, we can’t wait to celebrate the beginning of forever with the people we love most.
          </p>
        </motion.div>
      </div>
    </section>
  );
}


function EventTimeline() {
  const events = [
    { time: "08:07 AM - 10:07 AM", title: "Muhurtham" },
    { time: "11:00 AM", title: "Lunch Reception" },
    { time: "02:00 PM", title: "Going Away" },
  ];

  return (
    <section className="cv-auto py-24 bg-white relative overflow-hidden border-t border-theme-100/30">
      <div className="absolute inset-0 opacity-[0.02] paper-grain pointer-events-none" />
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="font-playball text-4xl md:text-5xl text-theme-900 mb-4 drop-shadow-sm">Event Timeline</h2>
          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-stone-500 font-bold">The flow of our special day</p>
        </motion.div>

        <div className="relative max-w-xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-[24px] md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-amber-200 via-theme-300 to-amber-200" />

          <div className="space-y-12">
            {events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative flex items-center md:justify-between w-full"
              >
                {/* Mobile Icon (Left) or Desktop Icon (Center) */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-12 h-12 bg-[#f0eceb] rounded-full border-[3px] border-white shadow-[0_4px_15px_-3px_rgba(0,0,0,0.1)] flex items-center justify-center z-10">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-br from-amber-400 to-theme-500" />
                </div>

                {/* Content Box */}
                <div className={`ml-16 md:ml-0 md:w-[calc(50%-3rem)] bg-white p-6 rounded-2xl shadow-sm border border-amber-100/60 hover:shadow-md transition-shadow relative group text-left ${index % 2 === 0 ? "md:mr-auto md:text-right" : "md:ml-auto md:text-left"}`}>
                  <p className="font-cinzel text-xl text-theme-900 font-bold mb-1 tracking-wide">{event.time}</p>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-stone-500 font-bold">{event.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FamilyWishesSection() {
  return (
    <section 
      className="cv-auto py-24 bg-white relative overflow-hidden border-t border-theme-100/30"
      style={{ backgroundImage: "url('/family-bg.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
    >
      <div className="absolute inset-0 opacity-[0.02] paper-grain pointer-events-none" />
      <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center font-noto-tamil">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-2xl md:text-3xl text-theme-900 mb-4 drop-shadow-sm font-bold">தங்கள் நல்வரவை விரும்பும்</h2>
          <div className="w-16 h-px bg-amber-400 mx-auto mb-10" />

          <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-24 text-stone-700 text-sm md:text-base leading-loose">
            {/* Groom side */}
            <div className="flex-1 max-w-sm mx-auto">
              <h3 className="text-lg font-bold text-amber-700 border-b border-amber-200 pb-2 mb-4">மணமகன் வீட்டார்</h3>
              <p>
                பெரியம்மாமார்<br />
                சித்தப்பாமார், சித்திமார்<br />
                மாமாமார், அத்தைமார்<br />
                அண்ணன்மார், அண்ணிமார்<br />
                மாமாமார், அக்காமார்<br />
                தம்பிமார், தங்கைமார்<br />
                மருமகன்மார், மருமகள்மார்
              </p>
            </div>

            {/* Bride side */}
            <div className="flex-1 max-w-sm mx-auto">
              <h3 className="text-lg font-bold text-amber-700 border-b border-amber-200 pb-2 mb-4">மணமகள் வீட்டார்</h3>
              <p>
                மாமாமார், மாமிமார்<br />
                பெரியப்பாமார், பெரியம்மாமார்<br />
                சித்தப்பாமார், சித்திமார்<br />
                அண்ணன்மார், அண்ணிமார்<br />
                மாமாமார், அக்காமார்<br />
                தம்பிமார், தங்கைமார்<br />
                மருமகன்மார், மருமகள்மார்
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function GuestBookSection() {
  const [name, setName] = useState("");
  const [wish, setWish] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    window.setTimeout(() => {
      setStatus("success");
      setName("");
      setWish("");
    }, 300);
  };

  return (
    <section className="cv-auto py-24 bg-[#f0eceb] relative overflow-hidden border-t border-theme-100/30">
      <div className="absolute inset-0 opacity-[0.02] paper-grain pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-playball text-4xl md:text-5xl text-theme-900 mb-4 drop-shadow-sm">Guest Book</h2>
          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-stone-500 font-bold mb-2">Leave a Message for Us</p>
          <p className="text-stone-600 font-montserrat text-sm md:text-base leading-loose max-w-2xl mx-auto mb-10">
            Your kind words, blessings, and memories will become keepsakes we’ll treasure for a lifetime.
          </p>

          {status === "success" ? (
            <div className="bg-theme-50 p-8 rounded-3xl border border-theme-200">
              <p className="font-cinzel text-xl text-theme-800">Thank you for your warm wishes!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-[2rem] shadow-[0_20px_50px_-20px_rgba(236,72,153,0.15)] border border-amber-200/60 space-y-6 text-left">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-stone-500 mb-2">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-theme-50/50 border border-theme-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all font-montserrat"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-stone-500 mb-2">Your Wish</label>
                <textarea
                  required
                  rows={4}
                  value={wish}
                  onChange={(e) => setWish(e.target.value)}
                  className="w-full bg-theme-50/50 border border-theme-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all font-montserrat resize-none"
                  placeholder="Wishing you a lifetime of love and happiness..."
                />
              </div>
              <button
                type="submit"
                disabled={status === "submitting" || !name.trim() || !wish.trim()}
                className="w-full bg-gradient-to-r from-[#c49a45] to-[#e0c086] text-white px-8 py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-xs hover:shadow-lg hover:shadow-[#e0c086]/30 hover:from-[#e0c086] hover:to-[#c49a45] disabled:opacity-50 transition-all"
              >
                {status === "submitting" ? "Sending..." : "Send Wish"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}


export default function WeddingInvitation() {
  const [isOpened, setIsOpened] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isLowPerformanceMode, setIsLowPerformanceMode] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const prefixParam = urlParams.get('prefix');
  const nameParam = urlParams.get('guestName');
  const guestFullName = nameParam ? `${prefixParam ? prefixParam + ' ' : ''}${nameParam}` : null;



  useEffect(() => {
    const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & {
      connection?: {
        saveData?: boolean;
        effectiveType?: string;
        addEventListener?: (type: string, listener: () => void) => void;
        removeEventListener?: (type: string, listener: () => void) => void;
      };
    }).connection;
    const getDeviceMemory = () => (navigator as Navigator & { deviceMemory?: number }).deviceMemory;

    const updatePerformanceMode = () => {
      const constrainedNetwork = Boolean(connection?.saveData) || /2g/.test(connection?.effectiveType ?? "");
      const lowMemory = typeof getDeviceMemory() === "number" && getDeviceMemory()! <= 4;
      const smallScreen = window.innerWidth < 768;
      setIsLowPerformanceMode(motionMedia.matches || constrainedNetwork || lowMemory || smallScreen);
    };

    updatePerformanceMode();
    motionMedia.addEventListener("change", updatePerformanceMode);
    window.addEventListener("resize", updatePerformanceMode);
    connection?.addEventListener?.("change", updatePerformanceMode);

    return () => {
      motionMedia.removeEventListener("change", updatePerformanceMode);
      window.removeEventListener("resize", updatePerformanceMode);
      connection?.removeEventListener?.("change", updatePerformanceMode);
    };
  }, []);

  return (
    <main
      className={`h-[100dvh] w-full transition-all duration-1000 ${isOpened ? "bg-[#f0eceb] overflow-y-auto overflow-x-hidden smooth-mobile-scroll" : "bg-cover bg-center overflow-hidden flex items-center justify-center"} relative font-montserrat scroll-smooth`}
      style={!isOpened ? { backgroundColor: "#f0eceb" } : {}}
    >
      {!isOpened && <div className="absolute inset-0 bg-[#f0eceb]/65 pointer-events-none z-0" />}
      <MandalaFrame minimal={isLowPerformanceMode} />
      <FloatingPetals disabled={isLowPerformanceMode} />
      <AudioPlayer isPlaying={isOpened || isVideoPlaying} src="/background new.mp3" />

      <AnimatePresence mode="wait">
        {!isOpened && !isVideoPlaying ? (
          <WelcomeScreen onOpen={() => setIsVideoPlaying(true)} />
        ) : isVideoPlaying ? (
          <motion.div
            key="intro-video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            className="absolute inset-0 w-full h-[100dvh] bg-black z-[100] flex items-center justify-center"
          >
            <video
              src="/intro.mp4"
              autoPlay
              playsInline
              className="w-full h-full object-cover"
              onEnded={() => {
                setIsVideoPlaying(false);
                setIsOpened(true);
              }}
            />
            <button 
              onClick={() => {
                setIsVideoPlaying(false);
                setIsOpened(true);
              }}
              className="absolute top-8 right-8 text-white/50 hover:text-white text-xs uppercase tracking-widest z-50 bg-black/20 px-4 py-2 rounded-full"
            >
              Skip
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="website-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="website-shell relative z-20 w-full"
          >
            {/* Sticky Return Button */}
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setIsOpened(false)}
              className="fixed top-6 right-6 z-50 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-theme-100 text-theme-800 hover:bg-theme-50 transition-colors"
            >
              <div className="flex flex-col items-center">
                <div className="text-[8px] uppercase tracking-widest font-bold">Close</div>
              </div>
            </motion.button>



            {/* Hero Section */}
            <section className="min-h-[100dvh] w-full flex items-center justify-center p-4 md:p-12 relative overflow-hidden bg-[#f0eceb]" style={{ backgroundImage: "url('/images/tamil-bg.png')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
              <div className="absolute inset-0 bg-theme-100/30 mix-blend-multiply pointer-events-none" />
              {/* Background texture */}
              <div className="absolute inset-0 opacity-[0.03] paper-grain" />



              {/* Large Watermark Monogram */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.03, scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-cinzel text-[40vw] text-theme-900 pointer-events-none whitespace-nowrap leading-none select-none z-0 hidden md:block"
              >
                D&R
              </motion.div>

              {/* Central Premium Arch Card */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
                className="relative z-10 w-full max-w-[420px] min-h-[500px] h-[100dvh] md:h-[80vh] md:bg-transparent flex flex-col items-center justify-center overflow-hidden p-6 md:p-10"
              >
                {/* Arch outline decoration */}



                <motion.img
                  initial={{ rotate: -45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 0.4 }}
                  transition={{ duration: 1.5, delay: 0.5, type: "spring" }}
                  src={mandalaImage}
                  className="w-24 h-24 md:w-32 md:h-32 object-contain mix-blend-multiply mb-6 drop-shadow-sm opacity-60 hidden md:block"
                  alt=""
                />

                <div className="flex flex-col items-center justify-center text-center space-y-4 md:space-y-6 flex-1 w-full relative z-10 mb-[35vh] md:mb-0 -mt-[5vh] md:mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="mt-4 md:mt-0"
                  >
                    <span className="block text-[12px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.6em] text-theme-700 font-bold mb-2">
                      Please join us
                    </span>
                  </motion.div>

                  <div className="space-y-0 py-4 md:flex-1 flex flex-col justify-center">
                    <motion.h1
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1, duration: 0.8 }}
                      className="font-playball text-[2.5rem] sm:text-[3.5rem] md:text-[5rem] text-theme-800 leading-[1.1] drop-shadow-sm whitespace-nowrap"
                    >Rajalakshmi</motion.h1>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.2, duration: 0.5 }}
                      className="font-playball text-3xl md:text-5xl text-amber-500 italic font-light my-2 md:my-4 tracking-widest"
                    >
                      &
                    </motion.div>
                    <motion.h1
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.4, duration: 0.8 }}
                      className="font-playball text-[2.5rem] sm:text-[3.5rem] md:text-[5rem] text-theme-800 leading-[1.1] drop-shadow-sm whitespace-nowrap"
                    >Dineshkanth</motion.h1>
                  </div>

                </div>
              </motion.div>

              {/* Scroll Button placed at absolute bottom of hero section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2, duration: 1 }}
                onClick={() => {
                  window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
                }}
                className="absolute bottom-10 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer z-30 group"
              >
                <div className="flex flex-col items-center justify-center bg-white/95 backdrop-blur-md px-3 py-1.5 md:px-6 md:py-2.5 rounded-[2rem] shadow-[0_8px_25px_-5px_rgba(245,158,11,0.4)] border md:border-2 border-amber-300/80 hover:bg-white hover:scale-105 hover:shadow-[0_10px_30px_-5px_rgba(245,158,11,0.6)] transition-all duration-300">
                  <span className="text-[9px] md:text-[11px] uppercase tracking-[0.25em] text-amber-700 font-extrabold mb-0 md:mb-0.5">Scroll Down</span>
                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="text-amber-600"
                  >
                    <ChevronDown className="w-4 h-4 md:w-6 md:h-6 drop-shadow-sm" />
                  </motion.div>
                </div>
              </motion.div>

            </section>

            <ScratchDateSection />

            <WelcomeSection guestFullName={guestFullName} />

            {/* <OurStorySection />

            <FamilyWishesSection /> */}

            {/* Countdown Section */}
            <section 
              className="cv-auto py-24 md:py-36 bg-[#f0eceb] relative border-y border-theme-100/30 flex flex-col items-center overflow-hidden"
              style={{ backgroundImage: "url('/countdown-bg.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
            >
              {/* Premium Background Elements */}
              <div className="absolute inset-0 opacity-[0.03] paper-grain pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square bg-theme-100 blur-[120px] rounded-full opacity-30 pointer-events-none" />

              <div className="w-full max-w-[1000px] px-4 flex flex-col items-center text-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative w-full flex flex-col items-center"
                >
                  {/* Watermark text */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-playball text-[12vw] md:text-[140px] text-theme-100/50 whitespace-nowrap pointer-events-none z-0 select-none">
                    Forever
                  </div>

                  <div className="flex items-center gap-4 md:gap-8 justify-center relative z-10 w-full mb-6 mt-4 opacity-70">
                    <div className="h-px w-16 md:w-32 bg-gradient-to-r from-transparent to-theme-400" />
                    <div className="w-1.5 h-1.5 rotate-45 bg-theme-500 shrink-0" />
                    <div className="h-px w-16 md:w-32 bg-gradient-to-l from-transparent to-theme-400" />
                  </div>

                  <div className="relative z-10 mb-8">
                    {/* Magical highlight glow behind the text */}
                    <div className="absolute inset-0 bg-white/60 blur-3xl rounded-full scale-[1.5] md:scale-[2] pointer-events-none"></div>
                    
                    <h2 className="font-cinzel text-3xl md:text-5xl text-theme-900 text-gold-shiny relative tracking-widest font-bold drop-shadow-[0_2px_10px_rgba(255,255,255,1)] px-4 leading-[1.4]">
                      Wait for the <span className="font-playball text-amber-500 italic lowercase tracking-normal text-4xl md:text-7xl ml-2 drop-shadow-[0_0_20px_rgba(245,158,11,0.7)] relative z-10">magic</span>
                    </h2>
                  </div>

                  <p className="text-[10px] md:text-[11px] uppercase tracking-[0.5em] text-amber-600 font-bold bg-white/80 backdrop-blur-sm px-8 py-3 rounded-full border border-amber-200/50 inline-flex items-center gap-3 shadow-[0_4px_15px_-5px_rgba(0,0,0,0.05)] relative z-10">
                    <span className="w-1 h-1 rounded-full bg-amber-400 animate-pulse" />
                    Counting Down
                    <span className="w-1 h-1 rounded-full bg-theme-400 animate-pulse" />
                  </p>
                </motion.div>

                <CountdownTimer />
              </div>
            </section>



            {/* Venue Location Section */}
            <section className="cv-auto py-24 md:py-36 bg-[#f0eceb] relative overflow-hidden">
              {/* Decorative Background */}
              <div className="absolute inset-0 opacity-5 paper-grain pointer-events-none" />
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-theme-200 blur-[150px] rounded-full opacity-20 pointer-events-none" />

              <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-8 flex flex-col items-start"
                  >
                    <div className="flex flex-col items-start gap-2">
                      <div className="flex items-center gap-4 mb-1">
                        <div className="w-8 h-px bg-amber-400" />
                        <span className="text-amber-600 font-bold uppercase tracking-[0.4em] text-[9px] md:text-[11px]">The Venue</span>
                      </div>
                      <h2 className="font-playball text-[3.5rem] sm:text-[4rem] md:text-[4rem] text-theme-900 leading-[1] drop-shadow-sm ml-[-4px]">
                        River Side Hotel Inn
                      </h2>
                      <p className="text-xs md:text-sm text-amber-600 font-bold uppercase tracking-[0.25em]">
                        (Badulla)
                      </p>
                    </div>

                    <div className="space-y-6 pt-4 relative">
                      <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-theme-300 to-transparent" />

                      <div className="pl-8 space-y-4">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-amber-100 absolute -left-5 top-0">
                          <MapPin className="w-4 h-4 text-amber-500" />
                        </div>
                        <p className="text-lg md:text-xl text-stone-700 font-cinzel font-medium leading-relaxed tracking-wide">
                          Badulla,<br /> Sri Lanka.
                        </p>
                      </div>


                    </div>

                    <div className="pt-8 w-full md:w-auto">
                      <button
                        onClick={() => window.open('https://maps.app.goo.gl/FcbsWeSY738WQTySA', '_blank')}
                        className="w-full md:w-auto flex items-center justify-center gap-4 bg-gradient-to-r from-[#c49a45] to-[#e0c086] text-white px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs hover:from-[#e0c086] hover:to-[#c49a45] hover:shadow-xl hover:shadow-[#e0c086]/30 transition-all duration-300 group"
                      >
                        <MapPin className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
                        Live Location
                      </button>
                    </div>
                  </motion.div>

                  {/* Arched Map Container */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    onClick={() => window.open('https://maps.app.goo.gl/FcbsWeSY738WQTySA', '_blank')}
                    className="relative w-full max-w-[450px] mx-auto aspect-[4/5] md:aspect-[3/4] rounded-t-full rounded-b-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border-[12px] border-white bg-theme-100 overflow-hidden group cursor-pointer"
                  >
                    <div className="absolute inset-0 border border-amber-200 rounded-t-full rounded-b-[1.5rem] pointer-events-none z-10" />

                    {/* Overlay to capture clicks */}
                    <div className="absolute inset-0 z-20" />

                    {/* The Maps iframe */}
                    <div className="absolute inset-0 w-full h-full scale-[1.2] group-hover:scale-[1.15] transition-transform duration-[2s]">
                      <iframe
                        src="https://maps.google.com/maps?q=River%20Side%20Hotel%20Inn%2C%20Badulla&t=&z=14&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full grayscale-[0.3] hover:grayscale-0 transition-all duration-1000"
                      />
                    </div>

                    {/* Elegant fade overlay at bottom */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/80 to-transparent h-32 pointer-events-none z-10 flex items-end justify-center pb-6">
                      <p className="text-[8px] uppercase tracking-widest text-stone-500 font-bold bg-white/90 px-5 py-2 rounded-full shadow-sm backdrop-blur-md inline-flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        View on Map
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>


            <RsvpSection />
            {/* Wishing Section and Footer Wrapper */}
            <div className="relative bg-[#f0eceb]">
              {/* Footer */}
              <footer 
                className="py-12 border-t border-theme-200/30 text-center relative z-10 space-y-4"
              >

                <p className="text-[8px] md:text-[10px] uppercase tracking-[0.5em] text-stone-800 font-bold pt-4">
                  © 2026 Dineshkanth & Rajalakshmi. All rights reserved.
                </p>
                <p className="text-stone-500 text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-bold mt-2">
                  Want a beautiful wedding website like this? Create yours with{' '}
                  <a target="_blank" rel="noreferrer" className="text-amber-700 hover:text-amber-500 hover:underline transition-colors duration-300 ml-1" href="https://wa.me/94707819074">
                    Invitemint
                  </a>
                </p>
              </footer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow linear infinite;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #f0eceb;
        }
        ::-webkit-scrollbar-thumb {
          background: #D97706;
          border-radius: 10px;
        }
      `}} />
    </main>
  );
}


