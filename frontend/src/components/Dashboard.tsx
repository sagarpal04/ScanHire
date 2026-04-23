import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  Sparkles,
  Link2,
  Briefcase,
  ArrowRight,
  Loader2,
  FileCheck2,
  FileSearch,
  AlertCircle,
  ArrowLeft,
  Wand2,
  Brain,
} from "lucide-react";

interface DashboardProps {
  onBack: () => void;
}

declare global {
  interface Window {
    puter: {
      ai: {
        chat: (prompt: string) => Promise<any>;
      };
    };
  }
}

export default function Dashboard({ onBack }: DashboardProps) {
  const backendURL = import.meta.env.VITE_BACKEND_URL || "";

  const [activeTab, setActiveTab] = useState("analysis");
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const [resume, setResume] = useState("");
  const [resumeMode, setResumeMode] = useState<"upload" | "paste">("upload");
  const [isResumeRefining, setIsResumeRefining] = useState(false);
  const [jd, setJd] = useState("");
  const [isJdRefining, setIsJdRefining] = useState(false);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadDragOver, setUploadDragOver] = useState(false);

  // const handleUpload = async () => {
  //   try {
  //     if (!file) { alert("Select a file"); return; }
  //     setLoading(true);
  //     setOutput("");

  //     const { supabase } = await import("../lib/supabase");

  //     const filePath = `uploads/${Date.now()}-${file.name}`;
  //     const { data, error } = await supabase.storage.from("resumes").upload(filePath, file, { upsert: true });
  //     if (error) { alert("Upload Error: " + error.message); setLoading(false); return; }

  //     const { data: publicUrl } = supabase.storage.from("resumes").getPublicUrl(data.path);
  //     setUrl(publicUrl.publicUrl);

  //     const parseResponse = await fetch(`${backendURL}/api/parse`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ url: publicUrl.publicUrl }),
  //     });
  //     const result = await parseResponse.json();

  //     if (result.success) {
  //       console.log(result.text)
  //       const rawText = result.text;
  //       const prompt = `Please fix any messy formatting, line-break artifacts, or PDF extraction errors from the following Resume text.\nExtract ONLY the actual resume content (Contact Info, Experience, Education, Skills, Projects).\nDo not summarize it. Do not remove any valid skills or experience. Return ONLY the clean, structured text.\n\nRAW RESUME TEXT:\n${rawText}`;
  //       try {
  //         const aiResponse = await window.puter.ai.chat(prompt);
  //         const cleaned = aiResponse?.message?.content || aiResponse?.content || (typeof aiResponse === "string" ? aiResponse : JSON.stringify(aiResponse, null, 2));
  //         setResume(cleaned.trim());
  //       } catch {
  //         setResume(rawText);
  //       }
  //     } else {
  //       alert("Parse Error: " + result.error);
  //     }
  //     setLoading(false);
  //   } catch (err: any) {
  //     console.error(err);
  //     alert("Something went wrong");
  //     setLoading(false);
  //   }
  // };

  // const handleScrapeJD = async () => {
  //   if (!jdUrl.trim()) { setJdError("Please enter a job posting URL."); return; }
  //   setJdLoading(true);
  //   setJdError("");
  //   setJd("");

  //   try {
  //     const response = await fetch(`${backendURL}/api/scrape-jd`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ url: jdUrl.trim() }),
  //     });
  //     const result = await response.json();

  //     if (result.success) {
  //       const rawJd = result.text;
  //       const prompt = `Extract only the core Job Description, Responsibilities, and Qualifications from the following text.\nRemove all website navigation links, company footers, headers, privacy policies, unrelated jobs, and filler text.\nReturn ONLY the pristine job description text.\n\nRAW TEXT:\n${rawJd}`;
  //       try {
  //         const aiResponse = await window.puter.ai.chat(prompt);
  //         const cleaned = aiResponse?.message?.content || aiResponse?.content || (typeof aiResponse === "string" ? aiResponse : JSON.stringify(aiResponse, null, 2));
  //         setJd(cleaned.trim());
  //       } catch {
  //         setJd(rawJd);
  //       }
  //       setJdUrl("");
  //     } else {
  //       setJdError("Scrape failed: " + (result.error || "Unknown error"));
  //     }
  //   } catch (err: any) {
  //     console.error(err);
  //     setJdError("Network error: " + err.message);
  //   }
  //   setJdLoading(false);
  // };

  // const analyze = async () => {
  //   if (loading) return;
  //   if (!resume || !jd) { setOutput("Please provide Resume and Job Description"); return; }
  //   setLoading(true);
  //   setOutput("Analyzing...");
  //   setActiveTab("analysis");

  //   const prompt = `You are an advanced ATS Resume Analyzer.\nCompare the RESUME and JOB DESCRIPTION.\nReturn output in STRICT FORMAT:\n1. ATS Score (0-100)\n2. Matching Skills\n3. Missing Skills\n4. Keyword Match %\n5. Strengths\n6. Weaknesses\n7. Improvement Suggestions\n\nIMPORTANT:\n- Be strict like real ATS\n- Focus on ML, NLP, Python, C++, HTML, Data Extraction\n\nRESUME:\n${resume}\n\nJOB DESCRIPTION:\n${jd}`;

  //   try {
  //     const response = await window.puter.ai.chat(prompt);
  //     const text = response?.message?.content || response?.content || JSON.stringify(response, null, 2);
  //     setOutput(text);
  //   } catch (err: any) {
  //     setOutput("Error: " + err.message);
  //   }
  //   setLoading(false);
  // };
  const handleUpload = async () => {
    console.log("🚀 handleUpload triggered");

    try {
      if (!file) {
        console.warn("⚠️ No file selected");
        alert("Select a file");
        return;
      }

      console.log("📂 File selected:", file);

      setLoading(true);
      setOutput("");

      const { supabase } = await import("../lib/supabase");
      console.log("✅ Supabase loaded");

      const filePath = `uploads/${Date.now()}-${file.name}`;
      console.log("📁 Upload path:", filePath);

      const { data, error } = await supabase.storage
        .from("resumes")
        .upload(filePath, file, { upsert: true });

      if (error) {
        console.error("❌ Upload Error:", error);
        alert("Upload Error: " + error.message);
        setLoading(false);
        return;
      }

      console.log("✅ Upload success:", data);

      const { data: publicUrl } = supabase.storage
        .from("resumes")
        .getPublicUrl(data.path);

      console.log("🌐 Public URL:", publicUrl);

      setUrl(publicUrl.publicUrl);

      console.log("📡 Sending to parse API:", `${backendURL}/api/parse`);

      const parseResponse = await fetch(`${backendURL}/api/parse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: publicUrl.publicUrl }),
      });

      console.log("📥 Parse API status:", parseResponse.status);

      const result = await parseResponse.json();
      console.log("📄 Parse result:", result);

      if (result.success) {
        console.log("✅ Parsed text length:", result.text.length);

        const rawText = result.text;

        const prompt = `Please fix any messy formatting... \n\nRAW RESUME TEXT:\n${rawText}`;

        try {
          console.log("🤖 Sending to AI...");
          const aiResponse = await window.puter.ai.chat(prompt);

          console.log("🤖 AI raw response:", aiResponse);

          const cleaned =
            aiResponse?.message?.content ||
            aiResponse?.content ||
            (typeof aiResponse === "string"
              ? aiResponse
              : JSON.stringify(aiResponse, null, 2));

          console.log("✨ Cleaned Resume:", cleaned);

          setResume(cleaned.trim());
        } catch (aiError) {
          console.error("❌ AI Error:", aiError);
          setResume(rawText);
        }
      } else {
        console.error("❌ Parse Error:", result.error);
        alert("Parse Error: " + result.error);
      }

      setLoading(false);
      console.log("✅ Upload flow completed");
    } catch (err: any) {
      console.error("🔥 Unexpected Error:", err);
      alert("Something went wrong");
      setLoading(false);
    }
  };
  const handleRefineJD = async () => {
    if (!jd.trim()) return;
    setIsJdRefining(true);
    try {
      const prompt = `Extract only the core Job Description, Responsibilities, and Qualifications from the following text.\nRemove all website navigation links, company footers, headers, privacy policies, unrelated jobs, and filler text.\nReturn ONLY the pristine job description text.\n\nRAW TEXT:\n${jd}`;
      const aiResponse = await window.puter.ai.chat(prompt);
      const cleaned = aiResponse?.message?.content || aiResponse?.content || (typeof aiResponse === "string" ? aiResponse : JSON.stringify(aiResponse, null, 2));
      setJd(cleaned.trim());
    } catch (err) {
      console.error("JD Refine Error:", err);
    } finally {
      setIsJdRefining(false);
    }
  };

  const handleRefineResume = async () => {
    if (!resume.trim()) return;
    setIsResumeRefining(true);
    try {
      const prompt = `Please fix any messy formatting, line-break artifacts, or PDF extraction errors from the following Resume text.\nExtract ONLY the actual resume content (Contact Info, Experience, Education, Skills, Projects).\nDo not summarize it. Do not remove any valid skills or experience. Return ONLY the clean, structured text.\n\nRAW RESUME TEXT:\n${resume}`;
      const aiResponse = await window.puter.ai.chat(prompt);
      const cleaned = aiResponse?.message?.content || aiResponse?.content || (typeof aiResponse === "string" ? aiResponse : JSON.stringify(aiResponse, null, 2));
      setResume(cleaned.trim());
    } catch (err) {
      console.error("Resume Refine Error:", err);
    } finally {
      setIsResumeRefining(false);
    }
  };
  const analyze = async () => {
    console.log("🚀 Analyze triggered");

    if (loading) {
      console.warn("⚠️ Already loading");
      return;
    }

    if (!resume?.trim() || !jd?.trim()) {
      console.warn("⚠️ Missing resume or JD");
      setOutput("❌ Please provide Resume and Job Description");
      return;
    }

    try {
      setLoading(true);
      setActiveTab("analysis");
      setOutput("⏳ Analyzing...");

      console.log("📄 Resume length:", resume.length);
      console.log("📄 JD length:", jd.length);

      const prompt = `
You are an advanced ATS Resume Analyzer.

STRICT RULES:
- Be very strict like real ATS systems (Amazon/Google level)
- Focus on: ML, NLP, Python, C++, HTML, Data Extraction
- Give realistic ATS score (do NOT inflate)

RETURN FORMAT (STRICT):
------------------------
ATS Score: <number>/100

Keyword Match: <percentage>%

Matching Skills:
- skill1
- skill2

Missing Skills:
- skill1
- skill2

Strengths:
- point1
- point2

Weaknesses:
- point1
- point2

Improvement Suggestions:
- suggestion1
- suggestion2
------------------------

RESUME:
${resume}

JOB DESCRIPTION:
${jd}
`;

      console.log("🤖 Sending request to Puter AI...");

      const response = await window.puter.ai.chat(prompt);

      console.log("📦 Raw Response:", response);

      const text =
        response?.message?.content ||
        response?.content ||
        (typeof response === "string" ? response : JSON.stringify(response, null, 2));

      console.log("✅ Parsed Output:", text);

      setOutput(text || "⚠️ No response from AI");
    } catch (err: any) {
      console.error("❌ Analyze error:", err);
      setOutput("❌ Error: " + (err?.message || "Something went wrong"));
    } finally {
      setLoading(false);
      console.log("🏁 Analysis completed");
    }
  };
  const tabs = [
    { id: "analysis", icon: <Sparkles className="w-3.5 h-3.5" />, label: "AI Analysis" },
    { id: "resume", icon: <FileCheck2 className="w-3.5 h-3.5" />, label: "Extracted Resume" },
  ];

  const readyState = resume ? (jd ? "ready" : "need-jd") : "need-resume";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background text-foreground flex flex-col noise-overlay"
    >
      {/* Layered backgrounds */}
      <div className="fixed inset-0 dot-grid pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/6 blur-[150px] pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[400px] bg-accent/4 blur-[120px] pointer-events-none z-0" />

      {/* Header */}
      <header className="relative z-50 w-full glass-strong line-glow">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.button
            onClick={onBack}
            whileHover={{ x: -2 }}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden border border-white/20">
              <img src="/log.png" alt="ScanHire AI Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-bold text-foreground tracking-tight font-display text-lg">ScanHire AI</span>
            <ArrowLeft className="w-3.5 h-3.5 text-muted-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>

          <div className="flex items-center gap-3">
            {/* Status indicator */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs">
              <div className={`w-1.5 h-1.5 rounded-full ${readyState === "ready" ? "bg-emerald-glow animate-pulse" : "bg-amber-glow"}`} />
              <span className="text-muted-foreground">
                {readyState === "ready" ? "Ready to analyze" : readyState === "need-jd" ? "Add job description" : "Upload resume first"}
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={analyze}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm bg-primary text-primary-foreground transition-all disabled:opacity-40 glow-purple"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
                  <Wand2 className="w-4 h-4" />
                </motion.div>
              )}
              {loading ? "Analyzing..." : "Analyze Now"}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 py-8 grid lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Upload Card */}
          <motion.div
            initial={{ opacity: 0, x: -30, rotateY: -5 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="glass rounded-3xl p-6 glow-card gradient-border group/card"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <motion.div
                  className="p-2.5 rounded-xl bg-accent/10 border border-accent/20"
                  whileHover={{ rotate: 5 }}
                >
                  <FileText className="w-4 h-4 text-accent" />
                </motion.div>
                <div>
                  <h2 className="font-bold text-foreground text-base font-display">Resume</h2>
                  <p className="text-xs text-muted-foreground">Upload PDF or paste text</p>
                </div>
              </div>
              <div className="flex bg-secondary/20 p-1 rounded-xl border border-border/40">
                <button
                  onClick={() => setResumeMode("upload")}
                  className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all ${resumeMode === "upload" ? "bg-primary text-primary-foreground glow-purple" : "text-muted-foreground hover:text-foreground"}`}
                >
                  Upload
                </button>
                <button
                  onClick={() => setResumeMode("paste")}
                  className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all ${resumeMode === "paste" ? "bg-primary text-primary-foreground glow-purple" : "text-muted-foreground hover:text-foreground"}`}
                >
                  Paste
                </button>
              </div>
            </div>

            {resumeMode === "upload" ? (
              <>
                <label
                  className={`group flex flex-col items-center justify-center w-full min-h-[140px] border-2 border-dashed rounded-2xl cursor-pointer transition-all text-center px-4 py-6 ${uploadDragOver
                    ? "border-primary/70 bg-primary/10 scale-[1.02]"
                    : "border-border/40 hover:border-primary/40 bg-secondary/10 hover:bg-primary/5"
                    }`}
                  onDragOver={(e) => { e.preventDefault(); setUploadDragOver(true); }}
                  onDragLeave={() => setUploadDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setUploadDragOver(false);
                    const f = e.dataTransfer.files[0];
                    if (f) setFile(f);
                  }}
                >
                  <motion.div
                    animate={uploadDragOver ? { scale: 1.2, y: -5 } : { scale: 1, y: 0 }}
                    transition={{ type: "spring" }}
                  >
                    <UploadCloud className={`w-8 h-8 mb-3 transition-colors ${uploadDragOver ? "text-primary" : "text-muted-foreground/50 group-hover:text-primary/70"}`} />
                  </motion.div>
                  <p className="text-sm font-medium text-secondary-foreground">
                    {file ? (
                      <span className="text-primary">{file.name}</span>
                    ) : (
                      "Click or drag your PDF here"
                    )}
                  </p>
                  <p className="text-[11px] text-muted-foreground/50 mt-1.5">Max 5 MB · PDF only</p>
                  <input type="file" accept=".pdf" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                </label>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handleUpload}
                  disabled={loading || !file}
                  className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold border border-border/40 bg-secondary/20 hover:bg-secondary/40 text-foreground transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {loading && !output ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-primary" />
                      <span>Processing & Refining...</span>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="w-4 h-4 text-primary" />
                      <span>Extract & Refine Text</span>
                    </>
                  )}
                </motion.button>
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <textarea
                  placeholder="Paste your resume text here..."
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                  className="w-full min-h-[140px] p-4 bg-secondary/10 border border-border/20 rounded-2xl text-sm text-secondary-foreground placeholder-muted-foreground/30 resize-none focus:outline-none focus:border-primary/30 focus:bg-primary/5 transition-all font-sans"
                />
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={handleRefineResume}
                  disabled={isResumeRefining || !resume.trim()}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold border border-primary/20 bg-primary/10 hover:bg-primary/20 text-primary transition-all disabled:opacity-30"
                >
                  {isResumeRefining ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Refining...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Auto Refine with AI</span>
                    </>
                  )}
                </motion.button>
              </div>
            )}

            <AnimatePresence>
              {url && (
                <motion.div
                  initial={{ opacity: 0, y: 10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -5, height: 0 }}
                  className="mt-3 overflow-hidden"
                >
                  <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-emerald-glow/10 border border-emerald-glow/20 text-sm">
                    <span className="flex items-center gap-2 text-emerald-glow font-medium">
                      <CheckCircle2 className="w-4 h-4" /> Uploaded & refined
                    </span>
                    <a href={url} target="_blank" rel="noreferrer" className="text-emerald-glow hover:underline inline-flex items-center gap-1 text-xs">
                      View <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* JD Card */}
          <motion.div
            initial={{ opacity: 0, x: -30, rotateY: -5 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="glass rounded-3xl p-6 flex-1 flex flex-col glow-card gradient-border"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <motion.div
                  className="p-2.5 rounded-xl bg-primary/10 border border-primary/20"
                  whileHover={{ rotate: -5 }}
                >
                  <Briefcase className="w-4 h-4 text-primary" />
                </motion.div>
                <div>
                  <h2 className="font-bold text-foreground text-base font-display">Job Description</h2>
                  <p className="text-xs text-muted-foreground">Paste or auto-scrape from a URL</p>
                </div>
              </div>
              {jd && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-6 h-6 rounded-full bg-emerald-glow/20 flex items-center justify-center"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-glow" />
                </motion.div>
              )}
            </div>

            <textarea
              placeholder="Paste the full job description here..."
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              className="flex-1 min-h-[180px] w-full p-4 bg-secondary/10 border border-border/20 rounded-2xl text-sm text-secondary-foreground placeholder-muted-foreground/30 resize-none focus:outline-none focus:border-primary/30 focus:bg-primary/5 transition-all font-sans"
            />

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={handleRefineJD}
              disabled={isJdRefining || !jd.trim()}
              className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold border border-primary/20 bg-primary/10 hover:bg-primary/20 text-primary transition-all disabled:opacity-30"
            >
              {isJdRefining ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Refining...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Auto Refine with AI</span>
                </>
              )}
            </motion.button>
          </motion.div>

          {/* Mobile Analyze */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={analyze}
            disabled={loading}
            className="lg:hidden w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-primary-foreground text-lg bg-primary disabled:opacity-40 glow-purple"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            {loading ? "Analyzing..." : "Analyze ATS Match"}
          </motion.button>
        </div>

        {/* RIGHT COLUMN */}
        <motion.div
          initial={{ opacity: 0, x: 30, rotateY: 5 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="lg:col-span-7 flex flex-col glass rounded-3xl overflow-hidden glow-card gradient-border"
        >
          {/* Tabs */}
          <div className="flex items-center gap-1 p-2 border-b border-border/20 flex-shrink-0 bg-secondary/10">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-secondary-foreground"
                  }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-secondary/50 border border-border/40 rounded-xl"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {tab.icon}
                  {tab.label}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto relative min-h-[500px]">
            {activeTab === "analysis" && (
              <AnimatePresence mode="wait">
                {!output && !loading ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center p-10"
                  >
                    {/* Animated illustration */}
                    <div className="relative mb-8">
                      <motion.div
                        className="w-20 h-20 rounded-3xl glass gradient-border flex items-center justify-center"
                        animate={{ y: [0, -10, 0], rotate: [0, 3, -3, 0] }}
                        transition={{ duration: 5, repeat: Infinity }}
                      >
                        <FileSearch className="w-9 h-9 text-muted-foreground/60" />
                      </motion.div>
                      {/* Orbiting dots */}
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 rounded-full bg-primary/60"
                          style={{ top: "50%", left: "50%" }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 4 + i * 2, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
                        >
                          <div
                            className="w-2 h-2 rounded-full bg-primary/60"
                            style={{
                              transform: `translateX(${45 + i * 12}px)`,
                              boxShadow: "0 0 8px hsl(263 70% 60% / 0.4)",
                            }}
                          />
                        </motion.div>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3 font-display">Ready to Analyze</h3>
                    <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
                      Upload your resume and add a job description, then click{" "}
                      <span className="text-primary font-semibold">"Analyze Now"</span> to get your detailed ATS compatibility report.
                    </p>
                  </motion.div>
                ) : loading && output === "Analyzing..." ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center"
                  >
                    {/* Multi-ring spinner */}
                    <div className="relative w-24 h-24 mb-8">
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-primary/10"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-primary/30"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                      />
                      <motion.div
                        className="absolute inset-2 rounded-full border-2 border-transparent border-t-accent border-l-accent/30"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                      />
                      <motion.div
                        className="absolute inset-4 rounded-full border border-transparent border-t-primary/40"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <Sparkles className="w-7 h-7 text-primary" />
                        </motion.div>
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-foreground mb-2 font-display">Analyzing your profile...</p>
                    <p className="text-xs text-muted-foreground mb-6">Running advanced ATS algorithms</p>
                    <div className="w-56 h-1.5 rounded-full overflow-hidden bg-secondary/30">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 10, ease: "linear" }}
                      />
                    </div>
                    {/* Animated steps */}
                    <div className="mt-6 space-y-2">
                      {["Parsing resume content...", "Matching keywords...", "Calculating ATS score..."].map((step, i) => (
                        <motion.p
                          key={step}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 2.5 }}
                          className="text-[11px] text-muted-foreground/50 flex items-center gap-2"
                        >
                          <motion.div
                            className="w-1 h-1 rounded-full bg-primary"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
                          />
                          {step}
                        </motion.p>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="whitespace-pre-wrap text-[14px] leading-7 text-secondary-foreground pb-10"
                  >
                    {output}
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            {activeTab === "resume" && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-full"
              >
                <textarea
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                  placeholder="Your refined resume text will appear here after upload. You can also paste it manually."
                  className="w-full h-full min-h-[450px] bg-transparent text-[13px] leading-relaxed text-muted-foreground placeholder-muted-foreground/30 resize-none focus:outline-none"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      </main>
    </motion.div>
  );
}
