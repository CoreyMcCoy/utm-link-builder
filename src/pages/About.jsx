import { Link } from "react-router-dom";
import { ArrowLeft, Target, BarChart3, Lightbulb } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-[#FFFDF7] pt-20 pb-32 px-6">
      <div className="max-w-3xl mx-auto">
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
          A free tool that helps you figure out which of your posts, emails, and
          ads are actually bringing people to where you want them to go.
        </p>

        {/* Sections */}
        <div className="space-y-12">
          {/* What */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                <Target size={20} />
              </div>
              <h2 className="text-2xl font-medium text-slate-800">
                What is this?
              </h2>
            </div>
            <div className="text-slate-600 leading-relaxed space-y-4 pl-13">
              <p>
                When you share a link - to your Google Business Profile, landing
                page, online store, booking page, portfolio, whatever, you
                probably wonder "is anyone actually clicking it?"
              </p>
              <p>
                UTM Link Builder adds invisible <strong>trackable tags</strong>{" "}
                to your links. When someone clicks, tools like Google Analytics
                can tell you exactly where they came from. Not just "someone
                clicked from social media," but "12 people clicked the link in
                your Instagram bio on Tuesday."
              </p>
              <p>It turns mystery clicks into clear answers.</p>
            </div>
          </section>

          {/* Why */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
                <Lightbulb size={20} />
              </div>
              <h2 className="text-2xl font-medium text-slate-800">
                Why you need this?
              </h2>
            </div>
            <div className="text-slate-600 leading-relaxed space-y-4 pl-13">
              <p>
                Right now, you're probably sharing links everywhere and hoping
                something sticks. But without tracking, you can't tell what's
                actually working.
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-600">
                <li>
                  You share a link on three different platforms - which one got
                  clicks?
                </li>
                <li>
                  You send two versions of an email - which subject line worked
                  better?
                </li>
                <li>
                  You're running ads or promotions - are people actually
                  clicking through?
                </li>
              </ul>
              <p>
                Without UTM tags, you're guessing. With them, you see exactly
                what's driving traffic so you can do more of what works (and
                stop wasting time on what doesn't).
              </p>
            </div>
          </section>

          {/* How */}
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                <BarChart3 size={20} />
              </div>
              <h2 className="text-2xl font-medium text-slate-800">
                How does it work?
              </h2>
            </div>
            <div className="text-slate-600 leading-relaxed space-y-4 pl-13">
              <p>
                UTM tags are just extra text added to the end of any URL. They
                look like this:
              </p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-sm break-all">
                <span className="text-slate-800">your-link.com</span>
                <span className="text-slate-400">?utm_source=</span>
                <span className="text-emerald-600">instagram</span>
                <span className="text-slate-400">&utm_medium=</span>
                <span className="text-blue-600">social</span>
                <span className="text-slate-400">&utm_campaign=</span>
                <span className="text-purple-600">spring-sale</span>
              </div>
              <p>
                The link still goes to the same place - your Google Business
                Profile, booking page, whatever. But now your analytics can read
                those tags and show you: "5 clicks from Instagram, spring sale
                campaign."
              </p>
              <p>
                This free tool builds those links for you. Just answer a few
                questions (Where are you sharing this? What's the campaign?) and
                it creates a ready-to-use link.
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
