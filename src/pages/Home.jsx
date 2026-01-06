import "../App.css";
import React, { useState, useMemo, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  Globe,
  Send,
  Tag,
  MousePointer2,
  History,
  Sparkles,
  ExternalLink,
  Trash2,
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Utility: Tailwind Merger ---
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- Utility: Logic ---
const cleanInput = (str) =>
  str
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

// --- Component: UI Elements (Simplified for single-file) ---
const Button = ({
  className,
  variant = "primary",
  size = "default",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-white";
  const variants = {
    primary:
      "bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-200 hover:scale-105",
    outline:
      "border-2 border-slate-200 bg-white hover:border-slate-800 hover:text-slate-900 text-slate-600",
    ghost: "hover:bg-slate-100 text-slate-500",
  };
  const sizes = {
    default: "h-12 px-6 py-2",
    icon: "h-12 w-12",
    lg: "h-14 px-8 text-lg",
  };
  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    />
  );
};

const Input = ({ className, ...props }) => (
  <input
    className={cn(
      "flex w-full rounded-md border-2 border-slate-200 bg-white text-xl px-3 py-2 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-800 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all",
      className
    )}
    {...props}
  />
);

// --- HOME PAGE ---
export default function Home() {
  const [step, setStep] = useState(0); // Start at 0 for landing page
  const [direction, setDirection] = useState(0);
  const [formData, setFormData] = useState({
    url: "",
    source: "",
    medium: "",
    campaign: "",
  });
  const [copied, setCopied] = useState(false);
  const [copiedHistoryId, setCopiedHistoryId] = useState(null);
  const [urlHistory, setUrlHistory] = useState([]);

  // --- Load URL history from localStorage ---
  useEffect(() => {
    const saved = localStorage.getItem("utm-url-history");
    if (saved) {
      try {
        setUrlHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse URL history:", e);
      }
    }
  }, []);

  // --- Logic: Build URL ---
  const finalUrl = useMemo(() => {
    if (!formData.url) return "";
    let baseUrl = formData.url.trim();
    if (!/^https?:\/\//i.test(baseUrl)) baseUrl = "https://" + baseUrl;

    try {
      const url = new URL(baseUrl);
      if (formData.source)
        url.searchParams.set("utm_source", cleanInput(formData.source));
      if (formData.medium)
        url.searchParams.set("utm_medium", cleanInput(formData.medium));
      if (formData.campaign)
        url.searchParams.set("utm_campaign", cleanInput(formData.campaign));
      return url.toString();
    } catch {
      return baseUrl;
    }
  }, [formData]);

  // --- Logic: Navigation ---
  const next = () => {
    if (step < 6) {
      setDirection(1);
      setStep((s) => s + 1);
    }
  };
  const back = () => {
    if (step > 0) {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && checkValidity()) next();
  };

  const checkValidity = () => {
    if (step === 1 && !formData.url) return false;
    if (step === 2 && !formData.source) return false;
    if (step === 3 && !formData.medium) return false;
    if (step === 4 && !formData.campaign) return false;
    return true;
  };

  // --- Logic: Save URL to history ---
  const saveToHistory = (url) => {
    const newEntry = {
      id: Date.now(),
      url,
      source: formData.source,
      medium: formData.medium,
      campaign: formData.campaign,
      createdAt: new Date().toISOString(),
    };
    const updated = [
      newEntry,
      ...urlHistory.filter((h) => h.url !== url),
    ].slice(0, 10); // Keep max 10
    setUrlHistory(updated);
    localStorage.setItem("utm-url-history", JSON.stringify(updated));
  };

  // --- Logic: Delete from history ---
  const deleteFromHistory = (id) => {
    const updated = urlHistory.filter((h) => h.id !== id);
    setUrlHistory(updated);
    localStorage.setItem("utm-url-history", JSON.stringify(updated));
  };

  // --- Logic: Copy from history ---
  const copyFromHistory = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedHistoryId(id);
    setTimeout(() => setCopiedHistoryId(null), 2000);
  };

  // --- Save URL to history when reaching result step ---
  useEffect(() => {
    if (step === 6 && finalUrl) {
      saveToHistory(finalUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  // --- Smart Suggestions Logic ---
  const smartSuggestions = useMemo(() => {
    const s = cleanInput(formData.source);
    const m = cleanInput(formData.medium);
    const suggestions = [];

    if (s && m) {
      if (m === "organic" && s === "google") {
        suggestions.push("gbp-listing", "search-profile");
      } else if (m === "social") {
        suggestions.push(`${s}-post`, `${s}-bio`);
      } else if (m === "email") {
        suggestions.push("newsletter-issue-1", "welcome-sequence");
      } else {
        suggestions.push(`${s}-${m}`);
      }
    }

    // Always add a date-based one
    const date = new Date().toISOString().slice(0, 7); // YYYY-MM
    suggestions.push(`promo-${date}`);

    return suggestions;
  }, [formData.source, formData.medium]);

  // --- Link Preview Component ---
  const LinkPreview = () => {
    const hasContent = !!formData.url;

    return (
      <div
        className={cn(
          "mt-8 p-4 bg-slate-50 rounded-xl border border-slate-200 transition-opacity duration-300",
          hasContent ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
          Live Preview
        </div>
        <div className="font-mono text-sm text-slate-600 break-all">
          <span className="text-slate-800">
            {formData.url
              ? formData.url.includes("://")
                ? formData.url
                : `https://${formData.url}`
              : "https://example.com"}
          </span>
          {(formData.source || formData.medium || formData.campaign) && (
            <span className="text-slate-400">?</span>
          )}
          {formData.source && (
            <>
              <span className="text-slate-400">utm_source=</span>
              <span className="text-emerald-600 font-medium">
                {cleanInput(formData.source)}
              </span>
            </>
          )}
          {formData.medium && (
            <>
              <span className="text-slate-400">&amp;utm_medium=</span>
              <span className="text-blue-600 font-medium">
                {cleanInput(formData.medium)}
              </span>
            </>
          )}
          {formData.campaign && (
            <>
              <span className="text-slate-400">&amp;utm_campaign=</span>
              <span className="text-purple-600 font-medium">
                {cleanInput(formData.campaign)}
              </span>
            </>
          )}
        </div>
      </div>
    );
  };

  // --- Render ---
  return (
    <div className="min-h-screen bg-[#FFFDF7] flex flex-col items-center p-6 pt-24 pb-32 font-sans selection:bg-slate-200">
      {/* Progress Bar - only show during wizard steps */}
      {step > 0 && (
        <div className="fixed top-14 left-0 w-full h-1.5 bg-slate-100 z-40">
          <div
            className="h-full bg-slate-800 transition-all duration-500 ease-out"
            style={{ width: `${(step / 6) * 100}%` }}
          />
        </div>
      )}

      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait" custom={direction}>
          <Motion.div
            key={step}
            initial={{ opacity: 0, y: direction > 0 ? 20 : -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: direction > 0 ? -20 : 20 }}
            transition={{ duration: 0.35, ease: "circOut" }}
            className="min-h-[400px] flex flex-col justify-center"
          >
            {/* Step 0: Landing Page / Hero */}
            {step === 0 && (
              <div className="space-y-8">
                {/* Hero Section */}
                <div className="space-y-4 mt-12">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium">
                    <Sparkles size={16} />
                    <span>Free UTM Link Builder</span>
                  </div>
                  <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 tracking-tight leading-tight">
                    Stop guessing where your traffic comes from.
                  </h1>
                  <p className="text-xl text-slate-500 max-w-xl leading-relaxed">
                    Build trackable links in seconds. Know exactly which posts,
                    emails, and ads bring visitors to your site.
                  </p>
                </div>

                {/* Last Created URL */}
                <div className="p-5 bg-white rounded-2xl border-2 border-slate-200 shadow-sm">
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-400 uppercase tracking-wider mb-3">
                    <History size={16} />
                    <span>Your last link</span>
                  </div>
                  {urlHistory.length > 0 ? (
                    <div className="space-y-3">
                      <div className="font-mono text-sm text-slate-600 break-all bg-slate-50 p-3 rounded-lg">
                        {urlHistory[0].url}
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            copyFromHistory(urlHistory[0].url, urlHistory[0].id)
                          }
                          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                        >
                          {copiedHistoryId === urlHistory[0].id ? (
                            <>
                              <Check size={16} className="text-emerald-500" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy size={16} />
                              <span>Copy link</span>
                            </>
                          )}
                        </button>
                        <span className="text-slate-300">•</span>
                        <span className="text-sm text-slate-400">
                          {urlHistory[0].campaign}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-slate-500 py-2">
                      Create your first URL ↓
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <Button size="lg" onClick={next} className="w-full sm:w-auto">
                  Build a Trackable Link{" "}
                  <ArrowRight size={20} className="ml-2" />
                </Button>

                {/* URL History Section */}
                {urlHistory.length > 1 && (
                  <div className="pt-6 border-t border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
                        Recent Links
                      </h3>
                      <span className="text-xs text-slate-400">
                        {urlHistory.length} saved
                      </span>
                    </div>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {urlHistory.slice(1, 5).map((item) => (
                        <div
                          key={item.id}
                          className="group flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                        >
                          <div className="flex-1 min-w-0 mr-4">
                            <div className="font-mono text-xs text-slate-500 truncate">
                              {item.url}
                            </div>
                            <div className="text-xs text-slate-400 mt-1">
                              {item.source} / {item.medium} / {item.campaign}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => copyFromHistory(item.url, item.id)}
                              className="p-2 rounded-lg hover:bg-white text-slate-400 hover:text-slate-600 transition-colors"
                              title="Copy link"
                            >
                              {copiedHistoryId === item.id ? (
                                <Check size={16} className="text-emerald-500" />
                              ) : (
                                <Copy size={16} />
                              )}
                            </button>
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg hover:bg-white text-slate-400 hover:text-slate-600 transition-colors"
                              title="Open link"
                            >
                              <ExternalLink size={16} />
                            </a>
                            <button
                              onClick={() => deleteFromHistory(item.id)}
                              className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 1: URL */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600">
                  <Globe size={20} />
                </div>
                <h2 className="text-2xl font-medium text-slate-800 tracking-tight">
                  First, what website do you want people to visit?
                </h2>
                <Input
                  autoFocus
                  placeholder="example.com"
                  value={formData.url}
                  onChange={(e) =>
                    setFormData({ ...formData, url: e.target.value })
                  }
                  onKeyDown={handleKeyDown}
                />
              </div>
            )}

            {/* Step 2: Source */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600 mb-6">
                  <Send size={32} />
                </div>
                <h2 className="text-4xl font-bold text-slate-800 tracking-tight">
                  Where will you post this link?
                </h2>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Facebook",
                    "Google",
                    "Newsletter",
                    "LinkedIn",
                    "Twitter",
                  ].map((opt) => (
                    <Button
                      key={opt}
                      variant={formData.source === opt ? "primary" : "outline"}
                      onClick={() => setFormData({ ...formData, source: opt })}
                    >
                      {opt}
                    </Button>
                  ))}
                </div>
                <Input
                  placeholder="Or type a custom source..."
                  value={formData.source}
                  onChange={(e) =>
                    setFormData({ ...formData, source: e.target.value })
                  }
                  onKeyDown={handleKeyDown}
                />
              </div>
            )}

            {/* Step 3: Medium */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600 mb-6">
                  <MousePointer2 size={32} />
                </div>
                <h2 className="text-4xl font-bold text-slate-800 tracking-tight">
                  How will they see it?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { id: "social", label: "Social", desc: "Organic Post" },
                    { id: "organic", label: "Organic", desc: "SEO / Profile" },
                    { id: "cpc", label: "Paid Ad", desc: "CPC / Sponsored" },
                    { id: "email", label: "Email", desc: "Newsletter" },
                  ].map((opt) => (
                    <div
                      key={opt.id}
                      onClick={() =>
                        setFormData({ ...formData, medium: opt.id })
                      }
                      className={cn(
                        "cursor-pointer p-4 rounded-2xl border-2 transition-all hover:scale-105",
                        formData.medium === opt.id
                          ? "border-slate-600 bg-slate-50"
                          : "border-slate-200 bg-white hover:border-slate-400"
                      )}
                    >
                      <div className="font-bold text-lg text-slate-800">
                        {opt.label}
                      </div>
                      <div className="text-slate-500 text-sm">{opt.desc}</div>
                    </div>
                  ))}
                </div>
                <Input
                  placeholder="Or type a custom medium..."
                  value={formData.medium}
                  onChange={(e) =>
                    setFormData({ ...formData, medium: e.target.value })
                  }
                  onKeyDown={handleKeyDown}
                />
              </div>
            )}

            {/* Step 4: Campaign */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600 mb-6">
                  <Tag size={32} />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
                  Name this link for analytics
                </h2>
                <p className="text-slate-500 text-lg">
                  This helps you identify this specific link in your reports
                  later.
                </p>
                <div className="flex flex-wrap gap-2">
                  {smartSuggestions.map((sugg) => (
                    <button
                      key={sugg}
                      onClick={() =>
                        setFormData({ ...formData, campaign: sugg })
                      }
                      className="text-xs font-medium bg-slate-100 text-slate-600 px-3 py-1 rounded-full hover:bg-slate-200 transition-colors"
                    >
                      {sugg}
                    </button>
                  ))}
                </div>
                <Input
                  autoFocus
                  placeholder="e.g. summer-sale, gbp-profile"
                  value={formData.campaign}
                  onChange={(e) =>
                    setFormData({ ...formData, campaign: e.target.value })
                  }
                  onKeyDown={handleKeyDown}
                />
                {formData.campaign && (
                  <div className="text-slate-600 font-mono bg-slate-100 inline-block px-3 py-1 rounded-lg">
                    Preview: {cleanInput(formData.campaign)}
                  </div>
                )}
              </div>
            )}

            {/* Step 5: Link Preview Summary */}
            {step === 5 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
                  Review your trackable link
                </h2>
                <p className="text-slate-500 text-lg">
                  Make sure everything looks right before copying.
                </p>
                <div className="bg-white p-5 rounded-2xl border-2 border-slate-200 space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400">Source</span>
                      <div className="font-medium text-slate-800">
                        {formData.source}
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-400">Medium</span>
                      <div className="font-medium text-slate-800">
                        {formData.medium}
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-400">Campaign</span>
                      <div className="font-medium text-slate-800">
                        {formData.campaign}
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-400">Destination</span>
                      <div className="font-medium text-slate-800 truncate">
                        {formData.url}
                      </div>
                    </div>
                  </div>
                  <hr className="border-slate-100" />
                  <div className="font-mono text-sm text-slate-600 break-all bg-slate-50 p-3 rounded-lg">
                    {finalUrl}
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Result */}
            {step === 6 && (
              <div className="text-center space-y-8">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <Check size={40} />
                </div>
                <h2 className="text-4xl font-bold text-slate-800">
                  You're all set!
                </h2>
                <p className="text-slate-500 max-w-xl mx-auto text-lg leading-relaxed">
                  This link tracks visitors from{" "}
                  <strong className="text-slate-800">{formData.source}</strong>{" "}
                  via{" "}
                  <strong className="text-slate-800">{formData.medium}</strong>{" "}
                  for{" "}
                  <strong className="text-slate-800">
                    {formData.campaign}
                  </strong>
                  .
                </p>
                <div className="bg-slate-900 p-6 rounded-2xl text-left shadow-2xl relative group">
                  <div className="font-mono text-slate-300 break-all pr-12">
                    {finalUrl}
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-4 right-4 text-slate-400 hover:text-white hover:bg-slate-800"
                    onClick={() => {
                      navigator.clipboard.writeText(finalUrl);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                  >
                    {copied ? <Check size={20} /> : <Copy size={20} />}
                  </Button>
                </div>
                <div className="flex justify-center gap-4 pt-4">
                  <Button
                    size="lg"
                    onClick={() => {
                      navigator.clipboard.writeText(finalUrl);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                  >
                    {copied ? "Copied!" : "Copy Link"}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setStep(0);
                      setFormData({
                        url: "",
                        source: "",
                        medium: "",
                        campaign: "",
                      });
                    }}
                  >
                    Start Over
                  </Button>
                </div>
              </div>
            )}
          </Motion.div>
        </AnimatePresence>

        {/* Live Link Preview - shown on steps 1-4 */}
        {step >= 1 && step <= 4 && <LinkPreview />}

        {/* Navigation Footer */}
        {step >= 1 && step <= 5 && (
          <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-8">
            <Button
              variant="ghost"
              onClick={back}
              className="pl-0 hover:bg-transparent hover:text-slate-600"
            >
              <ArrowLeft size={20} className="mr-2" />{" "}
              {step === 1 ? "Start Over" : "Back"}
            </Button>
            <Button onClick={next} disabled={!checkValidity()} size="lg">
              {step === 5 ? (
                <>
                  Create Link <Check size={20} className="ml-2" />
                </>
              ) : (
                <>
                  Continue <ArrowRight size={20} className="ml-2" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
