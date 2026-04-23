import { useState } from "react";
import LandingPage from "@/components/LandingPage";
import Dashboard from "@/components/Dashboard";
import { AnimatePresence, motion } from "framer-motion";

export default function Index() {
  const [isStarted, setIsStarted] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!isStarted ? (
        <motion.div key="landing" exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.3 }}>
          <LandingPage onStart={() => setIsStarted(true)} />
        </motion.div>
      ) : (
        <motion.div key="dashboard" initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
          <Dashboard onBack={() => setIsStarted(false)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
