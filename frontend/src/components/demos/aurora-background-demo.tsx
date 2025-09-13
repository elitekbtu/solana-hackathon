"use client";

import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/ui/aurora-background";

export function AuroraBackgroundDemo() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
          Epic Gaming NFTs
        </div>
        <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
          Transform your achievements into digital assets
        </div>
        <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-8 py-3 text-lg font-semibold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
          Start Creating
        </button>
      </motion.div>
    </AuroraBackground>
  );
}
