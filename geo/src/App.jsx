import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home", "About", "What We Do", "Programs", "Impact", "Contact"];

const STATS = [
  { value: "500+", label: "Student Innovators" },
  { value: "80+", label: "Colleges Reached" },
  { value: "120+", label: "Prototypes Built" },
  { value: "30+", label: "Ventures Launched" },
];

const EXPERTISE = [
  { icon: "🎓", title: "Education Empowerment", desc: "Building problem-solving mindsets and innovation culture across campuses." },
  { icon: "💡", title: "Innovation Enabling", desc: "Structured frameworks for idea validation and disciplined execution." },
  { icon: "🔧", title: "Product Building", desc: "From napkin sketch to functional prototype with expert mentorship." },
  { icon: "🚀", title: "Venture Creation", desc: "Scaling early ideas into fundable, market-ready ventures." },
];

const STEPS = [
  { num: "01", title: "Learn", desc: "Master the innovation mindset. Explore problem spaces and opportunity gaps." },
  { num: "02", title: "Ideate", desc: "Structured brainstorming to turn raw observations into actionable concepts." },
  { num: "03", title: "Build", desc: "Hands-on prototyping with mentors, tools, and a collaborative maker space." },
  { num: "04", title: "Scale", desc: "Business modeling, validation, and growth strategy to reach real markets." },
  { num: "05", title: "Launch", desc: "Deploy with ecosystem support — funding, networks, and growth acceleration." },
];

const WHAT_YOU_BUILD = [
  { icon: "⚙️", title: "Innovative Products", desc: "Hardware & software solutions solving pressing real-world problems." },
  { icon: "🤖", title: "Tech-Driven Solutions", desc: "AI, IoT, and emerging tech applications disrupting traditional industries." },
  { icon: "📈", title: "Scalable Innovations", desc: "Solutions architected for growth from day one." },
  { icon: "🌱", title: "Social Impact Projects", desc: "Community initiatives in healthcare, education, and sustainability." },
];

const PARTNERS = [
  "TechVentures", "BuildCo", "NexaLabs", "FutureFund",
  "IdeaSpace", "CampusBridge", "StartupNest", "InnovateDrive",
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Navbar({ menuOpen, setMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(10,10,10,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none",
      transition: "all 0.3s ease",
      padding: "0 2rem",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 8,
            background: "linear-gradient(135deg, #FF6B35, #FF3CAC)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 800, fontSize: 16, color: "#fff", fontFamily: "'Space Grotesk', sans-serif",
          }}>N</div>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 20, color: "#fff", letterSpacing: "-0.5px" }}>
            NexaHub
          </span>
        </div>
        <div style={{ display: "flex", gap: 36, alignItems: "center" }} className="nav-desktop">
          {NAV_LINKS.map(l => (
            <a key={l} href="#" style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, textDecoration: "none", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, transition: "color 0.2s", letterSpacing: "0.2px" }}
              onMouseEnter={e => e.target.style.color = "#fff"}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.7)"}
            >{l}</a>
          ))}
        </div>
        <a href="#contact" style={{
          background: "linear-gradient(135deg, #FF6B35, #FF3CAC)",
          color: "#fff", border: "none", padding: "9px 20px", borderRadius: 8,
          fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 13,
          cursor: "pointer", textDecoration: "none", letterSpacing: "0.3px",
          display: "inline-block",
        }}>Get Started →</a>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Syne:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #0a0a0a; }
        @media (max-width: 768px) { .nav-desktop { display: none !important; } }
      `}</style>
    </nav>
  );
}

function Hero() {
  return (
    <section style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      background: "#0a0a0a",
      position: "relative", overflow: "hidden",
      padding: "0 2rem",
    }}>
      {/* Gradient orbs */}
      <div style={{ position: "absolute", top: "15%", left: "10%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,107,53,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "30%", right: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,60,172,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", left: "40%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Grid overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", paddingTop: 100 }}>
        <div style={{ maxWidth: 760 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(255,107,53,0.1)", border: "1px solid rgba(255,107,53,0.25)",
            borderRadius: 100, padding: "6px 16px", marginBottom: 32,
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#FF6B35", display: "inline-block", animation: "pulse 2s infinite" }} />
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>
              India's Premier Student Innovation Platform
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800,
            fontSize: "clamp(3rem, 7vw, 5.5rem)", lineHeight: 1.0,
            color: "#fff", marginBottom: 24, letterSpacing: "-2px",
          }}>
            Empowering
            <span style={{ display: "block", background: "linear-gradient(135deg, #FF6B35 0%, #FF3CAC 50%, #9C6BFF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Student Builders
            </span>
            Since 2022
          </h1>

          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "rgba(255,255,255,0.55)",
            lineHeight: 1.7, marginBottom: 40, maxWidth: 540, fontWeight: 400,
          }}>
            NexaHub bridges the gap between ideas and impact — giving student innovators the mentorship, resources, and ecosystem to build what matters.
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a href="#programs" style={{
              background: "linear-gradient(135deg, #FF6B35, #FF3CAC)",
              color: "#fff", padding: "14px 28px", borderRadius: 10,
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15,
              textDecoration: "none", display: "inline-block", letterSpacing: "0.3px",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 12px 30px rgba(255,107,53,0.35)"; }}
              onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "none"; }}
            >Explore Programs →</a>
            <a href="#about" style={{
              background: "transparent", color: "#fff",
              padding: "14px 28px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.15)",
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 15,
              textDecoration: "none", display: "inline-block", letterSpacing: "0.3px",
              transition: "border-color 0.2s, background 0.2s",
            }}
              onMouseEnter={e => { e.target.style.borderColor = "rgba(255,255,255,0.35)"; e.target.style.background = "rgba(255,255,255,0.05)"; }}
              onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.15)"; e.target.style.background = "transparent"; }}
            >Collaborate With Us</a>
          </div>

          {/* Floating badges */}
          <div style={{ display: "flex", gap: 12, marginTop: 60, flexWrap: "wrap" }}>
            {["INNOVATION", "IDEATION", "COMMUNITY", "GROWTH"].map(t => (
              <span key={t} style={{
                fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                fontSize: 11, letterSpacing: "2.5px", color: "rgba(255,255,255,0.25)",
              }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.3)} }
      `}</style>
    </section>
  );
}

function Stats() {
  return (
    <section style={{ background: "#111", borderTop: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)", padding: "48px 2rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))", gap: 32 }}>
        {STATS.map((s, i) => (
          <FadeIn key={s.label} delay={i * 0.1}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 42, color: "#fff", letterSpacing: "-2px", lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 6, fontWeight: 500, letterSpacing: "0.5px", textTransform: "uppercase" }}>{s.label}</div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section id="about" style={{ padding: "100px 2rem", background: "#0a0a0a" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "3px", color: "#FF6B35", textTransform: "uppercase", marginBottom: 16 }}>WHY US</p>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2rem,4vw,3.2rem)", color: "#fff", letterSpacing: "-1.5px", lineHeight: 1.1, maxWidth: 600, marginBottom: 20 }}>
            Most ideas never leave the imagination.
          </h2>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, color: "rgba(255,255,255,0.5)", maxWidth: 520, lineHeight: 1.7, marginBottom: 64 }}>
            NexaHub bridges that gap — providing the right ecosystem with mentorship, resources, and real-world opportunities to turn student ideas into impactful innovations.
          </p>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {[
            { icon: "🧠", title: "Expert Mentorship", desc: "Learn from founders, engineers, and investors who've built and shipped." },
            { icon: "⚡", title: "Rapid Prototyping", desc: "Move from idea to working demo in weeks, not months." },
            { icon: "💰", title: "Investment Access", desc: "Direct pipeline to angel investors, grants, and startup accelerators." },
            { icon: "🌍", title: "Global Ecosystem", desc: "Network spanning 15 countries, 80+ campuses, and 500+ innovators." },
          ].map((c, i) => (
            <FadeIn key={c.title} delay={i * 0.1}>
              <div style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16, padding: "28px 24px",
                transition: "border-color 0.3s, background 0.3s",
                cursor: "default",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,107,53,0.3)"; e.currentTarget.style.background = "rgba(255,107,53,0.05)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
              >
                <div style={{ fontSize: 28, marginBottom: 14 }}>{c.icon}</div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16, color: "#fff", marginBottom: 8 }}>{c.title}</h3>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>{c.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Expertise() {
  return (
    <section id="what-we-do" style={{ padding: "100px 2rem", background: "#0d0d0d" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "3px", color: "#FF3CAC", textTransform: "uppercase", marginBottom: 16 }}>OUR EXPERTISE</p>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2rem,4vw,3.2rem)", color: "#fff", letterSpacing: "-1.5px", marginBottom: 64 }}>
            Core Services
          </h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 2 }}>
          {EXPERTISE.map((e, i) => (
            <FadeIn key={e.title} delay={i * 0.12}>
              <div style={{
                background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
                padding: "40px 32px", position: "relative", overflow: "hidden",
                transition: "background 0.3s",
              }}
                onMouseEnter={ev => ev.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                onMouseLeave={ev => ev.currentTarget.style.background = "rgba(255,255,255,0.02)"}
              >
                <div style={{ fontSize: 36, marginBottom: 20 }}>{e.icon}</div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: "#fff", marginBottom: 12, letterSpacing: "-0.5px" }}>{e.title}</h3>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.65 }}>{e.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="programs" style={{ padding: "100px 2rem", background: "#0a0a0a", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(255,107,53,0.4), transparent)" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "3px", color: "#9C6BFF", textTransform: "uppercase", marginBottom: 16 }}>HOW IT WORKS</p>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2rem,4vw,3.2rem)", color: "#fff", letterSpacing: "-1.5px", marginBottom: 20 }}>
            Your innovation journey
          </h2>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, color: "rgba(255,255,255,0.45)", maxWidth: 480, marginBottom: 72 }}>
            A structured 5-stage path from curiosity to launch — every step designed to remove obstacles and amplify your potential.
          </p>
        </FadeIn>

        <div style={{ position: "relative" }}>
          {/* connector line */}
          <div style={{ position: "absolute", left: 23, top: 0, bottom: 0, width: 1, background: "rgba(255,255,255,0.07)", display: window.innerWidth > 700 ? "block" : "none" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {STEPS.map((s, i) => (
              <FadeIn key={s.num} delay={i * 0.1}>
                <div style={{
                  display: "flex", gap: 32, alignItems: "flex-start",
                  padding: "28px 0", borderBottom: i < STEPS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  transition: "background 0.2s", borderRadius: 8, paddingLeft: 12, paddingRight: 12,
                  cursor: "default",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <div style={{
                    minWidth: 46, height: 46, borderRadius: "50%",
                    border: "1px solid rgba(255,107,53,0.35)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                    fontSize: 13, color: "#FF6B35", background: "rgba(255,107,53,0.08)",
                    position: "relative", zIndex: 1,
                  }}>{s.num}</div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: "#fff", marginBottom: 6, letterSpacing: "-0.5px" }}>{s.title}</h3>
                    <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.65 }}>{s.desc}</p>
                  </div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, color: "rgba(255,255,255,0.08)", alignSelf: "center", fontWeight: 800 }}>→</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatYouBuild() {
  return (
    <section style={{ padding: "100px 2rem", background: "#0d0d0d" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "3px", color: "#FF3CAC", textTransform: "uppercase", marginBottom: 16 }}>WHAT YOU CAN BUILD</p>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2rem,4vw,3.2rem)", color: "#fff", letterSpacing: "-1.5px", marginBottom: 64 }}>
            From concept to product
          </h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {WHAT_YOU_BUILD.map((w, i) => (
            <FadeIn key={w.title} delay={i * 0.1}>
              <div style={{
                padding: "32px 28px",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 16,
                transition: "all 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,60,172,0.3)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = "none"; }}
              >
                <div style={{ fontSize: 32, marginBottom: 16 }}>{w.icon}</div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 15, color: "#fff", marginBottom: 8 }}>{w.title}</h3>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.65 }}>{w.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactSection() {
  return (
    <section id="impact" style={{ padding: "100px 2rem", background: "#0a0a0a", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(156,107,255,0.06) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <FadeIn>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "3px", color: "#9C6BFF", textTransform: "uppercase", marginBottom: 16 }}>OUR IMPACT</p>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2rem,4vw,3.2rem)", color: "#fff", letterSpacing: "-1.5px", marginBottom: 64 }}>
            Building a generation of creators
          </h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {[
            { t: "Beyond Theory", d: "Students apply classroom knowledge to messy, real-world challenges that textbooks never cover." },
            { t: "Problem Solving Frameworks", d: "Structured methodologies that turn ambiguity into actionable innovation paths." },
            { t: "Idea to Execution", d: "A full support system covering every stage from spark to shipped product." },
            { t: "Growth Catalyst", d: "Creating sustained momentum for students who want to keep building beyond graduation." },
          ].map((c, i) => (
            <FadeIn key={c.t} delay={i * 0.1}>
              <div style={{
                padding: "32px", background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16,
                borderLeft: "3px solid #9C6BFF",
              }}>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16, color: "#fff", marginBottom: 10 }}>{c.t}</h3>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.65 }}>{c.d}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Partners() {
  return (
    <section style={{ padding: "80px 2rem", background: "#0d0d0d", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "3px", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", textAlign: "center", marginBottom: 40 }}>TRUSTED PARTNERS & COLLABORATORS</p>
        </FadeIn>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
          {PARTNERS.map((p, i) => (
            <FadeIn key={p} delay={i * 0.05}>
              <div style={{
                padding: "12px 28px",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 8,
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600, fontSize: 14,
                color: "rgba(255,255,255,0.35)",
                background: "rgba(255,255,255,0.02)",
                letterSpacing: "0.5px",
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.color = "rgba(255,255,255,0.7)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.35)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
              >{p}</div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="contact" style={{
      padding: "120px 2rem", background: "#0a0a0a",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative" }}>
        <FadeIn>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2.2rem,5vw,4rem)", color: "#fff", letterSpacing: "-2px", lineHeight: 1.05, marginBottom: 20 }}>
            Ready to start your innovation journey?
          </h2>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: 48 }}>
            Join hundreds of student innovators building the next wave of solutions. Your idea could be the one that changes everything.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#" style={{
              background: "linear-gradient(135deg, #FF6B35, #FF3CAC)",
              color: "#fff", padding: "16px 36px", borderRadius: 12,
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 16,
              textDecoration: "none", display: "inline-block", letterSpacing: "0.3px",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={e => { e.target.style.transform = "translateY(-3px)"; e.target.style.boxShadow = "0 16px 40px rgba(255,107,53,0.4)"; }}
              onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "none"; }}
            >Start the Club →</a>
            <a href="#" style={{
              background: "transparent", color: "#fff",
              padding: "16px 36px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.2)",
              fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 16,
              textDecoration: "none", display: "inline-block",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.target.style.background = "rgba(255,255,255,0.05)"; e.target.style.borderColor = "rgba(255,255,255,0.4)"; }}
              onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.borderColor = "rgba(255,255,255,0.2)"; }}
            >Talk to Us</a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: "#060606", borderTop: "1px solid rgba(255,255,255,0.07)", padding: "64px 2rem 40px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 56 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #FF6B35, #FF3CAC)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, color: "#fff", fontFamily: "'Space Grotesk', sans-serif" }}>N</div>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, color: "#fff" }}>NexaHub</span>
            </div>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.35)", lineHeight: 1.7, maxWidth: 280 }}>
              Fueling the next generation of student innovators across India and beyond.
            </p>
          </div>
          {[
            { title: "Company", links: ["About Us", "Team", "Careers", "Press"] },
            { title: "Platform", links: ["Programs", "Innovation Club", "Competitions", "Mentorship"] },
            { title: "Connect", links: ["Contact", "Partners", "Blog", "Events"] },
          ].map(col => (
            <div key={col.title}>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 12, color: "rgba(255,255,255,0.35)", letterSpacing: "2px", textTransform: "uppercase", marginBottom: 20 }}>{col.title}</p>
              {col.links.map(l => (
                <a key={l} href="#" style={{ display: "block", fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.5)", textDecoration: "none", marginBottom: 10, transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = "#fff"}
                  onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.5)"}
                >{l}</a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.25)" }}>© 2025 NexaHub. All rights reserved.</p>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.25)" }}>Privacy Policy · Terms of Use</p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
      <Stats />
      <WhyUs />
      <Expertise />
      <HowItWorks />
      <WhatYouBuild />
      <ImpactSection />
      <Partners />
      <CTA />
      <Footer />
    </div>
  );
}
