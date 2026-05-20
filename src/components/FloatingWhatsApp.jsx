import { motion } from "motion/react";

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="h-7 w-7"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.02 3.2C9.02 3.2 3.34 8.78 3.34 15.66c0 2.36.67 4.57 1.84 6.45L3.2 28.8l6.9-1.8a12.86 12.86 0 0 0 5.92 1.46c7 0 12.68-5.58 12.68-12.46S23.02 3.2 16.02 3.2Zm0 22.98c-1.9 0-3.65-.5-5.18-1.37l-.37-.22-4.1 1.07 1.1-3.94-.24-.4a10.05 10.05 0 0 1-1.62-5.47c0-5.62 4.67-10.2 10.41-10.2s10.41 4.58 10.41 10.2-4.67 10.33-10.41 10.33Zm5.72-7.64c-.31-.16-1.84-.9-2.12-1-.28-.1-.49-.16-.7.16-.2.3-.8 1-.98 1.2-.18.2-.36.23-.67.08-.31-.16-1.31-.47-2.5-1.5-.92-.8-1.55-1.8-1.73-2.1-.18-.31-.02-.48.14-.63.14-.14.31-.36.47-.54.16-.18.2-.31.31-.52.1-.2.05-.39-.03-.54-.08-.16-.7-1.66-.96-2.27-.25-.6-.5-.52-.7-.53h-.6c-.2 0-.54.08-.82.39-.28.31-1.08 1.04-1.08 2.53s1.1 2.94 1.26 3.14c.16.2 2.17 3.28 5.27 4.6.74.31 1.31.5 1.76.64.74.23 1.41.2 1.94.12.59-.09 1.84-.74 2.1-1.46.26-.72.26-1.33.18-1.46-.08-.13-.28-.2-.6-.35Z" />
    </svg>
  );
}

export default function FloatingWhatsApp() {9
  return (
    <motion.a
      href="https://wa.me/55629316-1779"
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, scale: 0.7, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1 }}
      whileHover={{
        y: -6,
        scale: 1.08,
      }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 grid h-16 w-16 place-items-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-emerald-900/35 transition"
      aria-label="Falar no WhatsApp"
    >
      <motion.span
        animate={{
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <WhatsAppIcon />
      </motion.span>
    </motion.a>
  );
}