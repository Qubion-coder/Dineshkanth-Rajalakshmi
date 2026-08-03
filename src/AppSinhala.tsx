import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MapPin, Calendar, Clock, Volume2, VolumeX, ChevronDown } from "lucide-react";

/**
 * Premium Sri Lankan මංගල ආරාධනය Theme
 * Names: මජෝරි සහ දෙව්ෂාන්
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

function MandalaFrame({ minimal = false }: { minimal?: boolean }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-[12] overflow-hidden" aria-hidden="true">
      <div className="absolute top-0 left-0 w-[clamp(260px,38vw,400px)] transition-opacity duration-1000">
        <InviteImage src="/images/ChatGPT_Image_Jul_2__2026__02_22_40_AM-removebg-preview.png" alt="" className="w-full h-auto object-contain drop-shadow-sm" eager />
      </div>
      {!minimal && (
        <div className="absolute bottom-0 right-0 w-[clamp(260px,38vw,400px)] transition-opacity duration-1000">
          <InviteImage src="/images/ChatGPT_Image_Jul_2__2026__02_24_33_AM-removebg-preview.png" alt="" className="w-full h-auto object-contain drop-shadow-sm" />
        </div>
      )}
    </div>
  );
}

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
  const targetDate = new Date("August 08, 2026 15:30:00").getTime();
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
            <span className="text-2xl sm:text-3xl md:text-5xl font-sinhala text-theme-800 text-gold-shiny leading-none relative z-10 drop-shadow-sm mt-3 sm:mt-4 md:mt-6 transition-transform duration-500 group-hover:scale-110">
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

function WeddingEnvelope({ onOpen, guestFullName }: { onOpen: () => void, guestFullName?: string | null }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{
        opacity: 0,
        scale: 1.1,
        transition: { duration: 0.8, ease: "easeInOut" }
      }}
      className="flex flex-col items-center justify-center p-6 relative z-10 w-full"
    >
      {/* Title Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        {guestFullName && (
          <div className="mb-6">
            <p className="text-theme-500 text-[12px] md:text-[14px] tracking-[0.2em] uppercase font-bold mb-2">විශේෂ ආරාධිත</p>
            <h2 className="font-sinhala text-2xl md:text-4xl text-amber-600 drop-shadow-sm px-4">ආදරණීය {guestFullName}</h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-4"></div>
          </div>
        )}
        <span className="inline-block px-5 py-2 rounded-full bg-amber-50 border border-amber-200 text-[10px] uppercase tracking-[0.5em] text-amber-600 font-bold mb-6 mt-2">
          Save the Date
        </span>
        <h1 className="font-sinhala text-4xl md:text-5xl text-theme-800 text-gold-shiny mb-4 tracking-tight">
          මජෝරි සහ දෙව්ෂාන්
        </h1>
        <p className="text-stone-500 text-sm tracking-[0.2em] font-light">2026 අගෝස්තු 08</p>
      </motion.div>

      {/* Gatefold Envelope */}
      <div
        className="relative w-full max-w-[430px] aspect-[1/1.42] flex items-center justify-center group cursor-pointer perspective-1000"
        onClick={onOpen}
      >
        {/* Envelope Image Replacement */}
        <div className="absolute -inset-8 bg-[radial-gradient(circle,_rgba(245,158,11,0.25)_0%,_rgba(245,158,11,0.15)_45%,_transparent_75%)] blur-3xl opacity-90 z-0 pointer-events-none" />
        
        <motion.img
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          src="/images/i.png"
          alt="Wedding Envelope"
          loading="eager"
          className="w-full h-full object-cover rounded-[1.4rem] shadow-[0_28px_80px_-20px_rgba(245,158,11,0.4)] relative z-20"
        />

        {/* The Wax Seal Button */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: -6 }}
          whileTap={{ scale: 0.9 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-[#fdf0c3] via-[#e0c086] to-[#c49a45] shadow-[0_20px_45px_-10px_rgba(224,192,134,0.5)] border-[3px] md:border-[4px] border-[#b48532] flex items-center justify-center pointer-events-auto"
        >
          <div className="absolute inset-1 md:inset-1.5 rounded-full border border-[#ffffff]/60 shadow-inner" />
          <div className="text-center relative z-10">
            <p className="font-sinhala text-xl md:text-[1.7rem] font-bold text-theme-900 leading-none drop-shadow-sm">M&D</p>
            <div className="h-px w-8 md:w-12 bg-theme-900/40 mx-auto my-1 md:my-1.5" />
            <p className="text-[9px] md:text-[11px] uppercase tracking-[0.2em] font-bold text-theme-900/90">විවෘත කරන්න</p>
          </div>
        </motion.div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 text-[10px] md:text-[12px] uppercase tracking-[0.2em] text-amber-600/90 font-bold bg-white/80 backdrop-blur-md px-6 py-2.5 rounded-full border border-amber-200/80 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          විවෘත කිරීමට තට්ටු කරන්න
        </div>
      </div>
    </motion.div>
  );
}
function WelcomeSection() {
  return (
    <section className="cv-auto py-24 md:py-32 bg-white relative overflow-hidden border-t border-theme-100/30">
      <div className="absolute inset-0 opacity-[0.02] paper-grain pointer-events-none" />
      <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-sinhala text-4xl md:text-5xl text-theme-900 mb-6 drop-shadow-sm">අපගේ සදාකාලික බැඳීමට සාදරයෙන් පිළිගනිමු</h2>
          <div className="w-16 h-px bg-amber-400 mx-auto mb-8" />
          <p className="text-stone-600 font-sinhala text-sm md:text-base leading-loose max-w-2xl mx-auto">
            අපගේ හදවත් එකිනෙකා හඳුනාගත් මොහොතේ සිට, සෑම දිනයක්ම සුන්දර ගමනක් වී ඇත. අද අපි අපගේ සදාකාලික ජීවිතය ආරම්භ කරන අතර, එය ඔබ සමඟ සැමරීමට ලැබීම ගැන අපි කෘතඥ වෙමු.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function OurStorySection() {
  return (
    <section className="cv-auto py-24 md:py-32 bg-white relative overflow-hidden border-t border-theme-100/30">
      <div className="absolute inset-0 opacity-[0.02] paper-grain pointer-events-none" />
      <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-sinhala text-4xl md:text-5xl text-theme-900 mb-6 drop-shadow-sm">අපගේ කතාව</h2>
          <div className="w-16 h-px bg-amber-400 mx-auto mb-8" />
          <p className="text-stone-600 font-sinhala text-sm md:text-base leading-loose max-w-2xl mx-auto mb-4">
            2022 වසරේ සිට, සෑම සිනහවක්, සෑම මතකයක් සහ අප එකට ගත කළ සෑම මොහොතක් හරහාම අපගේ ආදරය වර්ධනය වී ඇත. අද, අපි අපගේ සදාකාලික ජීවිතය ආරම්භ කරමු.
          </p>
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
          <h2 className="font-sinhala text-4xl md:text-5xl text-theme-900 mb-6 drop-shadow-sm">ආදර ඇරයුම</h2>
          <div className="w-16 h-px bg-amber-400 mx-auto mb-8" />
          <p className="text-stone-600 font-sinhala text-sm md:text-base leading-loose max-w-2xl mx-auto mb-4">
            2024 දෙසැම්බර් 23 වන දින, සෙන්ට්‍රල් පාර්ක් හි දිදුලන විදුලි පහන් එළිය යට, එක් අමතක නොවන ප්‍රශ්නයක් අපගේ ජීවිතය සදහටම වෙනස් කළේය.
          </p>
          <p className="text-stone-600 font-sinhala text-sm md:text-base leading-loose max-w-2xl mx-auto">
            හදවතින්ම පැවසූ "ඔව්" යන්නත් සමඟ නව පරිච්ඡේදයක් ආරම්භ විය. දැන්, අපගේ සදාකාලික ගමනේ ආරම්භය අප ආදරය කරන අය සමඟ සැමරීමට අපි නොඉවසිල්ලෙන් බලා සිටිමු.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function EventTimeline() {
  const events = [
    { time: "පෙ.ව. 10:27 - 11:15", title: "සුබ මුහුර්තය" },
    { time: "ප.ව. 12:00", title: "දිවා භෝජන සංග්‍රහය" },
    { time: "ප.ව. 03:00", title: "පිටත්ව යාම" },
  ];

  return (
    <section className="cv-auto py-24 bg-white relative overflow-hidden border-t border-theme-100/30">
      <div className="absolute inset-0 opacity-[0.02] paper-grain pointer-events-none" />
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="font-sinhala text-4xl md:text-5xl text-theme-900 mb-4 drop-shadow-sm">උත්සව මාලාව</h2>
          <p className="text-[12px] md:text-[14px] uppercase tracking-[0.2em] text-stone-500 font-bold">අපගේ මංගල දිනයේ කාලසටහන</p>
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
                  <p className="font-sinhala text-xl md:text-2xl text-theme-900 font-bold mb-1 tracking-wide">{event.time}</p>
                  <p className="text-[13px] md:text-[14px] uppercase tracking-[0.1em] text-stone-500 font-bold">{event.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RSVPForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<"yes" | "no" | null>(null);

  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxmTXekcZrC2PkWJoC9VtczmQPZm7wvpxy7-c5UVx8dcvUtlpcHxil9tcx5GTa7kkA7tQ/exec";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !attending) return;
    setStatus("submitting");
    
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('attending', attending === 'yes' ? 'Accept' : 'Decline');
      formData.append('language', 'Sinhala');
      
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });
      
      setStatus("success");
    } catch (error) {
      console.error("Submission failed:", error);
      setStatus("idle");
    }
  };

  return (
    <section className="cv-auto py-24 bg-[#f0eceb] relative overflow-hidden border-t border-theme-100/30">
      <div className="absolute inset-0 opacity-[0.03] paper-grain pointer-events-none" />
      <div className="container mx-auto px-6 max-w-2xl relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-sinhala text-4xl md:text-5xl text-theme-900 mb-4 drop-shadow-sm">පැමිණීම තහවුරු කිරීම</h2>
          <p className="text-[12px] md:text-[14px] uppercase tracking-[0.2em] text-stone-500 font-bold mb-2">අප සමඟ එක්වන්න</p>
          <p className="text-stone-600 font-sinhala text-sm md:text-base leading-loose max-w-2xl mx-auto mb-10">
            මෙම විශේෂ දිනය ඔබ සමඟ සැමරීමට ලැබීම අපට මහත් ගෞරවයකි. කරුණාකර ඔබ අප හා එක්වන්නේදැයි අපට දන්වන්න.
          </p>
          
          {status === "success" ? (
            <div className="bg-theme-50 p-8 rounded-3xl border border-theme-200">
              <p className="font-sinhala text-xl text-theme-800">ඔබගේ ප්‍රතිචාරයට ස්තූතියි!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-[2rem] shadow-[0_20px_50px_-20px_rgba(236,72,153,0.15)] border border-amber-200/60 space-y-6 text-left">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-stone-500 mb-2">අමුත්තන්ගේ නම</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-theme-50/50 border border-theme-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all font-sinhala"
                  placeholder="John & Jane Doe"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-stone-500 mb-3">ඔබ පැමිණෙනවාද?</label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <label className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${attending === 'yes' ? 'bg-amber-500 text-white border-amber-600 shadow-md' : 'bg-theme-50/50 border-theme-200 text-stone-600 hover:bg-theme-100'}`}>
                    <input type="radio" name="attending" value="yes" className="hidden" onChange={() => setAttending('yes')} />
                    <span className="text-xs font-bold uppercase tracking-wider">සතුටින් පැමිණෙමි</span>
                  </label>
                  <label className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${attending === 'no' ? 'bg-stone-500 text-white border-stone-600 shadow-md' : 'bg-theme-50/50 border-theme-200 text-stone-600 hover:bg-theme-100'}`}>
                    <input type="radio" name="attending" value="no" className="hidden" onChange={() => setAttending('no')} />
                    <span className="text-xs font-bold uppercase tracking-wider">කනගාටුවෙන් වුවද පැමිණිය නොහැක</span>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                disabled={status === "submitting" || !name.trim() || !attending}
                className="w-full bg-gradient-to-r from-[#c49a45] to-[#e0c086] text-white px-8 py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-xs hover:shadow-lg hover:shadow-[#e0c086]/30 hover:from-[#e0c086] hover:to-[#c49a45] disabled:opacity-50 transition-all"
              >
                {status === "submitting" ? "Sending..." : "Send පැමිණීම තහවුරු කිරීම"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function WishesForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [name, setName] = useState("");
  const [wish, setWish] = useState("");

  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxmTXekcZrC2PkWJoC9VtczmQPZm7wvpxy7-c5UVx8dcvUtlpcHxil9tcx5GTa7kkA7tQ/exec";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !wish.trim()) return;
    setStatus("submitting");
    
    try {
      const formData = new FormData();
      formData.append('type', 'wish');
      formData.append('name', name);
      formData.append('wish', wish);
      formData.append('language', 'Sinhala');
      
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      });
      
      setStatus("success");
    } catch (error) {
      console.error("Submission failed:", error);
      setStatus("idle");
    }
  };

  return (
    <section className="cv-auto py-24 bg-[#f0eceb] relative overflow-hidden border-t border-theme-100/30">
      <div className="absolute inset-0 opacity-[0.03] paper-grain pointer-events-none" />
      <div className="container mx-auto px-6 max-w-2xl relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="font-sinhala text-4xl md:text-5xl text-theme-900 mb-4 drop-shadow-sm">අමුත්තන්ගේ සටහන්</h2>
          <p className="text-[12px] md:text-[14px] uppercase tracking-[0.2em] text-stone-500 font-bold mb-2">අපට පණිවිඩයක් තබන්න</p>
          <p className="text-stone-600 font-sinhala text-sm md:text-base leading-loose max-w-2xl mx-auto mb-10">
            ඔබගේ ආදරණීය වදන්, ආශිර්වාද සහ මතකයන් අපගේ ජීවිත කාලය පුරාවටම සුරැකිය යුතු වටිනා සිහිවටන බවට පත්වනු ඇත.
          </p>
          
          {status === "success" ? (
            <div className="bg-theme-50 p-8 rounded-3xl border border-theme-200">
              <p className="font-sinhala text-xl text-theme-800">ඔබගේ උණුසුම් සුබ පැතුම් වලට ස්තූතියි!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-[2rem] shadow-[0_20px_50px_-20px_rgba(236,72,153,0.15)] border border-amber-200/60 space-y-6 text-left">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-stone-500 mb-2">ඔබගේ නම</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-theme-50/50 border border-theme-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all font-sinhala"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-stone-500 mb-2">ඔබගේ සුබ පැතුම</label>
                <textarea
                  required
                  rows={4}
                  value={wish}
                  onChange={(e) => setWish(e.target.value)}
                  className="w-full bg-theme-50/50 border border-theme-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all font-sinhala resize-none"
                  placeholder="Wishing you a lifetime of love and happiness..."
                />
              </div>
              <button
                type="submit"
                disabled={status === "submitting" || !name.trim() || !wish.trim()}
                className="w-full bg-gradient-to-r from-[#c49a45] to-[#e0c086] text-white px-8 py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-xs hover:shadow-lg hover:shadow-[#e0c086]/30 hover:from-[#e0c086] hover:to-[#c49a45] disabled:opacity-50 transition-all"
              >
                {status === "submitting" ? "Sending..." : "යවන්න"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}


export default function WeddingInvitationSinhala() {
  const [isOpened, setIsOpened] = useState(false);
  const [isLowPerformanceMode, setIsLowPerformanceMode] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const prefixParam = urlParams.get('prefix');
  const nameParam = urlParams.get('guestName');
  const inviteTypeParam = urlParams.get('inviteType') || 'ඔබ සැමට';
  const guestFullName = nameParam ? `${prefixParam ? prefixParam + ' ' : ''}${nameParam}` : null;

  useEffect(() => {
    if (isOpened) {
      if (!audioRef.current) {
        audioRef.current = new Audio("/background new.mp3");
        audioRef.current.loop = true;
      }
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.error("Audio playback failed:", err);
      });
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [isOpened]);

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/background new.mp3");
      audioRef.current.loop = true;
    }
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.error("Audio playback failed:", err);
      });
    }
  };

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
      className={`h-[100dvh] w-full transition-all duration-1000 ${isOpened ? "bg-[#f0eceb] overflow-y-auto overflow-x-hidden smooth-mobile-scroll" : "bg-cover bg-center overflow-hidden flex items-center justify-center"} relative font-sinhala scroll-smooth`}
      style={!isOpened ? { backgroundColor: "#f0eceb" } : {}}
    >
      {!isOpened && <div className="absolute inset-0 bg-[#f0eceb]/65 pointer-events-none z-0" />}
      <MandalaFrame minimal={isLowPerformanceMode} />
      <FloatingPetals disabled={isLowPerformanceMode} />
      <AudioPlayer isPlaying={isOpened} src="/background new.mp3" />

      <AnimatePresence mode="wait">
        {!isOpened ? (
          <WeddingEnvelope onOpen={() => setIsOpened(true)} guestFullName={guestFullName} />
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
                <div className="text-[10px] md:text-[12px] uppercase tracking-wider font-bold">වසා දමන්න</div>
              </div>
            </motion.button>

            {/* Background Music Toggle Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={togglePlay}
              className="fixed bottom-6 right-6 z-50 bg-white/80 backdrop-blur-md p-3.5 rounded-full shadow-lg border border-theme-100 text-theme-800 hover:bg-theme-50 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center"
              title={isPlaying ? "Mute Background Music" : "Play Background Music"}
            >
              {isPlaying ? (
                <div className="relative">
                  <span className="absolute -inset-2 rounded-full bg-theme-300/30 animate-ping" />
                  <Volume2 className="w-5 h-5 text-theme-600 relative z-10" />
                </div>
              ) : (
                <VolumeX className="w-5 h-5 text-stone-400" />
              )}
            </motion.button>

            {/* Hero Section */}
            <section className="min-h-[100dvh] w-full flex items-center justify-center p-4 md:p-12 relative overflow-hidden bg-[#f0eceb]">
              {/* Background texture */}
              <div className="absolute inset-0 opacity-[0.03] paper-grain" />

              {/* Mobile Background Image */}
              <div className="absolute inset-0 md:hidden">
                <InviteImage src="/images/t.png" className="w-full h-full object-cover" alt="" loading="eager" />
                {/* Optional subtle overlay for text readability */}
                <div className="absolute inset-0 bg-ivory/10" />
              </div>

              {/* Large Watermark Monogram */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.03, scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-sinhala text-[25vw] text-theme-900 pointer-events-none whitespace-nowrap leading-none select-none z-0 hidden md:block"
              >
                M&D
              </motion.div>

              {/* Central Premium Arch Card */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
                className="relative z-10 w-full max-w-[420px] min-h-[500px] h-[85vh] md:h-[80vh] md:bg-[#f0eceb] md:rounded-t-full md:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] md:border md:border-theme-100 flex flex-col items-center overflow-hidden p-6 pt-12 md:p-10 md:pt-16"
              >
                {/* Arch outline decoration */}
                <div className="absolute inset-3 sm:inset-5 border-[0.5px] border-amber-300/45 rounded-t-full pointer-events-none hidden md:block" />
                <div className="absolute inset-4 sm:inset-6 border border-theme-200/40 rounded-t-full pointer-events-none hidden md:block" />

                <motion.img
                  initial={{ rotate: -45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 0.4 }}
                  transition={{ duration: 1.5, delay: 0.5, type: "spring" }}
                  src={mandalaImage}
                  className="w-24 h-24 md:w-32 md:h-32 object-contain mix-blend-multiply mb-6 drop-shadow-sm opacity-60 hidden md:block"
                  alt=""
                />

                <div className="flex flex-col items-center text-center space-y-4 flex-1 w-full relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="mt-12 md:mt-0"
                  >
                    <span className="block text-[14px] md:text-[16px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-theme-700 font-bold mb-2">
                      අප සමඟ මෙම සුවිශේෂී දිනය සැමරීමට එක්වන්න.
                    </span>
                  </motion.div>

                  <div className="space-y-0 py-4 flex-1 flex flex-col justify-center">
                    <motion.h1
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1, duration: 0.8 }}
                      className="font-sinhala text-[2rem] sm:text-[2.5rem] md:text-[4rem] text-theme-800 leading-[1.1] drop-shadow-sm"
                    >මජෝරි</motion.h1>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.2, duration: 0.5 }}
                      className="font-sinhala text-3xl md:text-5xl text-amber-500 italic font-light my-2 md:my-4 tracking-widest"
                    >
                      &
                    </motion.div>
                    <motion.h1
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.4, duration: 0.8 }}
                      className="font-sinhala text-[2rem] sm:text-[2.5rem] md:text-[4rem] text-theme-800 leading-[1.1] drop-shadow-sm"
                    >දෙව්ෂාන්</motion.h1>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8, duration: 1 }}
                    className="mt-8 md:mt-auto pb-4 w-full flex flex-col items-center"
                  >
                    <div className="flex items-center justify-center gap-4 mb-6 opacity-70 w-full px-8 hidden md:flex">
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-300 to-theme-400" />
                      <div className="w-1.5 h-1.5 rotate-45 bg-amber-500 shrink-0" />
                      <div className="h-px w-full bg-gradient-to-l from-transparent via-amber-300 to-theme-400" />
                    </div>
                    <div className="font-sinhala space-y-2">
                      <p className="text-lg md:text-base text-stone-700 tracking-[0.2em] md:tracking-[0.3em] font-bold">2026 අගෝස්තු 08</p>
                      <p className="text-[13px] md:text-[14px] text-theme-600 tracking-[0.1em] uppercase font-bold">මහනුවර, ශ්‍රී ලංකාව</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 1 }}
                onClick={() => {
                  window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
                }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20 group"
              >
                <span className="text-[10px] md:text-[12px] uppercase tracking-widest text-stone-400 font-bold group-hover:text-amber-600 transition-colors">ආරම්භ කරන්න</span>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="text-stone-400 group-hover:text-amber-500 transition-colors"
                >
                  <ChevronDown className="w-5 h-5 md:w-6 md:h-6" />
                </motion.div>
              </motion.div>

            </section>

            <WelcomeSection />

            {/* මංගල විස්තර Section */}
            <section className="cv-auto py-24 md:py-32 w-full flex flex-col items-center px-4 relative">
              <div className="section-floral-overlay absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
                <div className="absolute top-0 left-0 w-[clamp(200px,35vw,400px)]">
                  <InviteImage src="/images/ChatGPT_Image_Jul_2__2026__02_22_40_AM-removebg-preview.png" alt="" className="w-full h-auto object-contain drop-shadow-sm" eager />
                </div>
                <div className="absolute bottom-0 right-0 w-[clamp(200px,35vw,400px)]">
                  <InviteImage src="/images/ChatGPT_Image_Jul_2__2026__02_24_33_AM-removebg-preview.png" alt="" className="w-full h-auto object-contain drop-shadow-sm" />
                </div>
              </div>

              <div className="max-w-[1000px] w-full flex flex-col items-center text-center relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center mb-8 md:mb-16"
                >
                  <div className="w-px h-16 md:h-24 bg-gradient-to-b from-transparent to-theme-400 mb-6 md:mb-10" />
                  <p className="text-theme-700 text-[13px] md:text-[16px] tracking-[0.15em] md:tracking-[0.2em] uppercase font-bold text-center leading-loose">
                    {guestFullName ? (
                      <>
                        <span className="normal-case text-lg md:text-2xl font-bold font-sinhala text-amber-600 tracking-wide mb-3 block drop-shadow-sm">ආදරණීය {guestFullName},</span>
                        අපගේ විවාහ මංගල්‍යයට<br className="hidden md:block" /> සහභාගී වන ලෙස අපි {inviteTypeParam} ආදරයෙන් ආරාධනා කරන්නෙමු
                      </>
                    ) : (
                      <>
                        අපගේ විවාහ මංගල්‍යයට<br className="hidden md:block" /> සහභාගී වන ලෙස අපි {inviteTypeParam} ආදරයෙන් ආරාධනා කරන්නෙමු
                      </>
                    )}
                  </p>
                </motion.div>



                <div className="relative w-full flex flex-col md:flex-row items-center justify-center md:items-stretch gap-6 md:gap-10 my-12 md:my-20 z-10 px-2 lg:px-8">

                  {/* Nimmi's Card */}
                  <motion.div
                    initial={{ opacity: 0, x: -30, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    className="relative bg-white w-full max-w-[320px] p-6 md:p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-theme-100/50 rounded-tl-[100px] rounded-br-[100px] md:rounded-tl-[130px] md:rounded-br-[130px] overflow-hidden group flex flex-col justify-center text-center items-center"
                  >
                    <div className="absolute inset-2 border border-amber-200/60 rounded-tl-[90px] rounded-br-[90px] md:rounded-tl-[120px] md:rounded-br-[120px] pointer-events-none" />
                    <div className="absolute inset-0 opacity-[0.02] paper-grain pointer-events-none" />
                    <div className="relative z-10 space-y-4 py-8 md:py-12">
                      <div className="space-y-2">
                        <p className="text-[11px] md:text-[12px] uppercase tracking-[0.2em] font-bold text-stone-400">ආදරණීය දියණිය</p>
                        <p className="text-xs md:text-sm font-sinhala text-stone-600 tracking-wide leading-relaxed">ලිලී රන්හලුගේ <br />සහ<br /> සුදත් රන්හලුගේ</p>
                      </div>
                      <h3 className="text-3xl md:text-5xl font-sinhala text-theme-800 text-gold-shiny group-hover:scale-110 transition-transform duration-700 pt-6 drop-shadow-sm">මජෝරි</h3>
                    </div>
                  </motion.div>

                  {/* Vertical Divider / AMPERSAND */}
                  <div className="flex flex-row md:flex-col items-center justify-center gap-4 py-4 md:py-0 relative z-20">
                    <div className="hidden md:block w-px h-32 bg-gradient-to-t from-theme-300 to-transparent" />
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                      className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-amber-500 to-theme-600 rounded-full flex items-center justify-center shadow-xl shadow-amber-500/10 border-4 border-[#f0eceb]"
                    >
                      <span className="text-3xl md:text-5xl font-sinhala text-white md:-mt-1 drop-shadow-md">&</span>
                    </motion.div>
                    <div className="hidden md:block w-px h-32 bg-gradient-to-b from-theme-300 to-transparent" />
                  </div>

                  {/* Rishan's Card - Offset structurally on desktop */}
                  <motion.div
                    initial={{ opacity: 0, x: 30, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="relative bg-white w-full max-w-[320px] p-6 md:p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-theme-100/50 rounded-tr-[100px] rounded-bl-[100px] md:rounded-tr-[130px] md:rounded-bl-[130px] overflow-hidden group flex flex-col justify-center text-center items-center md:mt-24"
                  >
                    <div className="absolute inset-2 border border-amber-200/60 rounded-tr-[90px] rounded-bl-[90px] md:rounded-tr-[120px] md:rounded-bl-[120px] pointer-events-none" />
                    <div className="absolute inset-0 opacity-[0.02] paper-grain pointer-events-none" />
                    <div className="relative z-10 space-y-4 py-8 md:py-12">
                      <div className="space-y-2">
                        <p className="text-[11px] md:text-[12px] uppercase tracking-[0.2em] font-bold text-stone-400">ආදරණීය පුතු</p>
                        <p className="text-xs md:text-sm font-sinhala text-stone-600 tracking-wide leading-relaxed">චාමිකා ප්‍රනාන්දු <br />සහ<br /> මිල්රෝයි ජෝසප්</p>
                      </div>
                      <h3 className="text-3xl md:text-5xl font-sinhala text-theme-800 text-gold-shiny group-hover:scale-110 transition-transform duration-700 pt-6 drop-shadow-sm">දෙව්ෂාන්</h3>
                    </div>
                  </motion.div>
                </div>

                {/* Date & Time Luxury Layout */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center space-y-10 mt-4 md:mt-16 w-full"
                >
                  <div className="w-1.5 h-1.5 rotate-45 bg-theme-300" />

                  <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-32 text-center w-full max-w-4xl px-4">
                    <div className="flex flex-col items-center flex-1">
                      <Calendar className="w-6 h-6 md:w-8 md:h-8 text-theme-500 mb-4 opacity-80" />
                      <p className="text-[12px] md:text-[14px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-stone-400 font-bold mb-3">දිනය</p>
                      <p className="font-sinhala text-xl md:text-3xl text-theme-900 text-gold-shiny tracking-widest font-bold whitespace-nowrap">අගෝස්තු 08 සෙනසුරාදා</p>
                      <p className="font-sinhala text-lg md:text-xl text-theme-600 tracking-[0.3em] font-normal mt-2">2026</p>
                    </div>

                    <div className="hidden md:flex flex-col items-center gap-3">
                      <div className="w-px h-12 bg-theme-200" />
                      <div className="w-1.5 h-1.5 rounded-full bg-theme-400" />
                      <div className="w-px h-12 bg-theme-200" />
                    </div>

                    <div className="md:hidden flex flex-row items-center gap-3">
                      <div className="h-px w-10 bg-theme-200" />
                      <div className="w-1.5 h-1.5 rounded-full bg-theme-400" />
                      <div className="h-px w-10 bg-theme-200" />
                    </div>

                    <div className="flex flex-col items-center flex-1">
                      <Clock className="w-6 h-6 md:w-8 md:h-8 text-amber-500 mb-4 opacity-80" />
                      <p className="text-[12px] md:text-[14px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-stone-400 font-bold mb-3">වේලාව</p>
                      <p className="font-sinhala text-xl md:text-3xl text-theme-900 tracking-widest font-bold whitespace-nowrap">පෙරවරු 11:00</p>
                      <p className="font-sinhala text-xs md:text-sm text-amber-600 tracking-[0.2em] mt-3 uppercase">සිට පස්වරු 04:00 දක්වා</p>
                    </div>
                  </div>

                  <div className="pt-8 w-full px-4">
                    <div className="relative inline-flex items-center justify-center w-full max-w-md mx-auto group">
                      <div className="absolute inset-0 bg-theme-100 blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
                      <p className="relative text-theme-800 bg-white shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] text-[12px] md:text-[14px] font-bold tracking-[0.1em] md:tracking-[0.2em] uppercase px-6 lg:px-10 py-4 lg:py-5 rounded-full border border-amber-200 flex items-center justify-center gap-4 w-full md:w-auto">
                        <span className="w-1.5 h-1.5 rotate-45 bg-amber-500 shrink-0" />
                        <span className="whitespace-nowrap">ක්‍රිස්තියානි විවාහ මංගල්‍යය</span>
                        <span className="w-1.5 h-1.5 rotate-45 bg-theme-500 shrink-0" />
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            <OurStorySection />

            {/* Countdown Section */}
            <section className="cv-auto py-24 md:py-36 bg-[#f0eceb] relative border-y border-theme-100/30 flex flex-col items-center overflow-hidden">
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
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-sinhala text-[12vw] md:text-[140px] text-theme-100/50 whitespace-nowrap pointer-events-none z-0 select-none">
                    Forever
                  </div>

                  <div className="flex items-center gap-4 md:gap-8 justify-center relative z-10 w-full mb-6 mt-4 opacity-70">
                    <div className="h-px w-16 md:w-32 bg-gradient-to-r from-transparent to-theme-400" />
                    <div className="w-1.5 h-1.5 rotate-45 bg-theme-500 shrink-0" />
                    <div className="h-px w-16 md:w-32 bg-gradient-to-l from-transparent to-theme-400" />
                  </div>

                  <h2 className="font-sinhala text-3xl md:text-5xl text-theme-900 text-gold-shiny mb-8 relative z-10 tracking-widest font-bold drop-shadow-sm px-4 leading-[1.4]">
                    සුළු මොහොතක් <span className="font-sinhala text-amber-500 italic lowercase tracking-normal text-3xl md:text-5xl ml-2">රැඳී සිටින්න</span>
                  </h2>

                  <p className="text-[10px] md:text-[11px] uppercase tracking-[0.5em] text-amber-600 font-bold bg-white/80 backdrop-blur-sm px-8 py-3 rounded-full border border-amber-200/50 inline-flex items-center gap-3 shadow-[0_4px_15px_-5px_rgba(0,0,0,0.05)] relative z-10">
                    <span className="w-1 h-1 rounded-full bg-amber-400 animate-pulse" />
                    Counting Down
                    <span className="w-1 h-1 rounded-full bg-theme-400 animate-pulse" />
                  </p>
                </motion.div>

                <CountdownTimer />
              </div>
            </section>

            <ProposalSection />

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
                        <span className="text-amber-600 font-bold uppercase tracking-[0.2em] text-[12px] md:text-[14px]">ස්ථානය</span>
                      </div>
                      <h2 className="font-sinhala text-[2.5rem] sm:text-[3rem] md:text-[3.5rem] text-theme-900 leading-[1] drop-shadow-sm ml-[-4px]">
                        Earls Regency නුවර
                      </h2>
                      <p className="text-xs md:text-sm text-amber-600 font-bold uppercase tracking-[0.25em]">
                        (Regent Ballroom)
                      </p>
                    </div>

                    <div className="space-y-6 pt-4 relative">
                      <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-theme-300 to-transparent" />

                      <div className="pl-8 space-y-4">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-sm border border-amber-100 absolute -left-5 top-0">
                          <MapPin className="w-4 h-4 text-amber-500" />
                        </div>
                        <p className="text-lg md:text-xl text-stone-700 font-sinhala font-medium leading-relaxed tracking-wide">
                          Kandy,<br /> Sri Lanka.
                        </p>
                      </div>


                    </div>

                    <div className="pt-8 w-full md:w-auto">
                      <button
                        onClick={() => window.open('https://maps.app.goo.gl/q5nBxPx94MTV2Tnb7?g_st=iw', '_blank')}
                        className="w-full md:w-auto flex items-center justify-center gap-4 bg-gradient-to-r from-[#c49a45] to-[#e0c086] text-white px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[12px] md:text-[14px] hover:from-[#e0c086] hover:to-[#c49a45] hover:shadow-xl hover:shadow-[#e0c086]/30 transition-all duration-300 group"
                      >
                        <MapPin className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
                        උත්සව ස්ථානය
                      </button>
                    </div>
                  </motion.div>

                  {/* Arched Map Container */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    onClick={() => window.open('https://maps.app.goo.gl/q5nBxPx94MTV2Tnb7?g_st=iw', '_blank')}
                    className="relative w-full max-w-[450px] mx-auto aspect-[4/5] md:aspect-[3/4] rounded-t-full rounded-b-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border-[12px] border-white bg-theme-100 overflow-hidden group cursor-pointer"
                  >
                    <div className="absolute inset-0 border border-amber-200 rounded-t-full rounded-b-[1.5rem] pointer-events-none z-10" />
                    
                    {/* Overlay to capture clicks */}
                    <div className="absolute inset-0 z-20" />

                    {/* The Maps iframe */}
                    <div className="absolute inset-0 w-full h-full scale-[1.2] group-hover:scale-[1.15] transition-transform duration-[2s]">
                      <iframe
                        src="https://maps.google.com/maps?q=Earl's%20Regency%20Hotel,%20Kundasale%2020168&t=&z=14&ie=UTF8&iwloc=&output=embed"
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


            <EventTimeline />
            <RSVPForm />
            <WishesForm />

            {/* Wishing Section and Footer Wrapper */}
            <div className="relative bg-[#f0eceb]">
              <div 
                className="absolute inset-0 opacity-60 pointer-events-none" 
                style={{ backgroundImage: "url('/footer-bg.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} 
              />
              <div className="absolute inset-0 opacity-[0.03] paper-grain pointer-events-none" />

              <section className="cv-auto py-24 md:py-36 relative flex flex-col items-center overflow-hidden">
                <InviteImage src={mandalaImage} alt="" className="absolute top-0 right-0 w-[40vw] max-w-[500px] opacity-[0.04] mix-blend-multiply translate-x-1/3 -translate-y-1/3 pointer-events-none" />
                <InviteImage src={mandalaImage} alt="" className="absolute bottom-16 left-1/2 w-[38vw] max-w-[360px] opacity-[0.08] mix-blend-multiply -translate-x-1/2 pointer-events-none" />

                <div className="container mx-auto px-4 max-w-4xl text-center relative z-10 w-full">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100/50 mb-8 mt-4 shadow-sm border border-amber-200/50">
                      <Sparkles className="w-8 h-8 text-amber-500" />
                    </div>

                    <div className="mt-12 md:mt-16 space-y-6 flex flex-col items-center relative w-full">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-sinhala text-[15vw] md:text-[150px] text-theme-100/40 whitespace-nowrap pointer-events-none z-0 select-none">
                        ස්තූතියි
                      </div>
                      <div className="relative z-10 mt-8 max-w-2xl mx-auto text-center space-y-6 px-4">
                        <p className="text-stone-600 font-sinhala text-sm md:text-base leading-loose">
                          අපගේ කතාවේ කොටසක් වීම ගැන ඔබට ස්තූතියි.
                        </p>
                        <p className="text-stone-600 font-sinhala text-sm md:text-base leading-loose">
                          ඔබගේ ආදරය, ආශිර්වාදය සහ පැමිණීම අපට ලැබිය හැකි ඉහළම තෑගි වේ. මෙම අමතක නොවන දිනය ඔබ සමඟ සැමරීමට සහ ජීවිත කාලය පුරාවටම පවතින මතකයන් නිර්මාණය කිරීමට අපි බලාපොරොත්තු වෙමු.
                        </p>
                        <div className="pt-6 flex flex-col items-center">
                          <p className="text-[12px] md:text-[14px] uppercase tracking-[0.2em] text-amber-600 font-bold mb-4 bg-white/50 px-6 py-2 rounded-full border border-amber-200/30">අපගේ හදපිරි ආදරයෙන්,</p>
                          <h3 className="font-sinhala text-[2.2rem] sm:text-5xl md:text-7xl text-theme-900 drop-shadow-sm leading-none">මජෝරි සහ දෙව්ෂාන්</h3>
                        </div>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative z-10 mt-12 mb-8 w-full max-w-md mx-auto px-4"
                      >
                        <img 
                          src="/WhatsApp Image 2026-07-04 at 03.20.35 (1).jpeg" 
                          alt="Couple" 
                          className="w-full h-auto object-cover rounded-[2rem] shadow-2xl border-[8px] border-white/60"
                        />
                      </motion.div>




                    </div>
                  </motion.div>
                </div>
              </section>

              {/* Footer */}
              <footer 
                className="py-12 border-t border-theme-200/30 text-center relative z-10 space-y-4"
              >

                <p className="text-[11px] md:text-[12px] uppercase tracking-[0.2em] text-stone-800 font-bold pt-4">
                  © 2026 මජෝරි සහ දෙව්ෂාන්. All rights reserved.
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


