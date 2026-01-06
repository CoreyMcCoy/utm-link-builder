import { Link } from "react-router-dom";
import { ArrowLeft, Target, BarChart3, Lightbulb } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-[#FFFDF7] pt-20 pb-32 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors mb-8"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back to Builder</span>
        </Link>

        {/* Page Title */}
        <h1 className="text-4xl font-bold text-slate-800 tracking-tight mb-4">
          About UTM Link Builder
        </h1>
        <p className="text-lg text-slate-500 mb-12">
          A simple, free tool to help you track where your website visitors come
          from.
        </p>

        {/* Sections */}
        <div className="space-y-12">
          {/* What */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                <Target size={20} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">
                What is this?
              </h2>
            </div>
            <div className="text-slate-600 leading-relaxed space-y-4 pl-13">
              <p>
                UTM Link Builder creates <strong>trackable links</strong> for
                your marketing campaigns. When someone clicks a link you create
                here, analytics tools like Google Analytics can tell you exactly
                where that visitor came from.
              </p>
              <p>
                Instead of seeing "direct traffic" or vague referrers, you'll
                see clear labels like "Facebook / social / summer-promo" —
                making it easy to know what's actually working.
              </p>
            </div>
          </section>

          {/* Why */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
                <Lightbulb size={20} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Why use it?</h2>
            </div>
            <div className="text-slate-600 leading-relaxed space-y-4 pl-13">
              <p>
                If you're sharing links on social media, in emails, or anywhere
                else — you're probably losing valuable data. Without UTM
                parameters, you're <strong>guessing</strong> what's driving your
                traffic.
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li>Know which social posts actually bring visitors</li>
                <li>Compare email campaigns to see what resonates</li>
                <li>Track which ads (paid or organic) perform best</li>
                <li>Make smarter decisions with real data</li>
              </ul>
            </div>
          </section>

          {/* How */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                <BarChart3 size={20} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">
                How does it work?
              </h2>
            </div>
            <div className="text-slate-600 leading-relaxed space-y-4 pl-13">
              <p>
                UTM parameters are extra bits of text added to the end of any
                URL. They don't change where the link goes — they just add
                tracking info that analytics tools can read.
              </p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-sm break-all">
                <span className="text-slate-800">example.com</span>
                <span className="text-slate-400">?utm_source=</span>
                <span className="text-emerald-600">facebook</span>
                <span className="text-slate-400">&utm_medium=</span>
                <span className="text-blue-600">social</span>
                <span className="text-slate-400">&utm_campaign=</span>
                <span className="text-purple-600">summer-sale</span>
              </div>
              <p>
                This tool walks you through creating these links step-by-step,
                so you don't have to remember the syntax or worry about typos.
              </p>
            </div>
          </section>

          {/* CTA */}
          <div className="pt-8 border-t border-slate-200">
            <Link
              to="/"
              className="inline-flex items-center justify-center h-12 px-6 bg-slate-900 text-white font-medium rounded-full hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200 hover:scale-105"
            >
              Build Your First Link
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
