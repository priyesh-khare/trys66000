import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Home, Compass, Briefcase, Users, MessageSquare, Bell, User, Search,
  ChevronLeft, Shield, TrendingUp, Sparkles, Heart, MessageCircle, Share2, Bookmark,
  Github, Linkedin, Globe, CheckCircle2, Clock, Sun, Moon, ArrowUpRight, Send, Paperclip, ChevronRight
} from "lucide-react";

/* ---------------------------------- THEME ---------------------------------- */
function getTheme(dark) {
  return dark ? {
    bg: "#0A0A0C", bg2: "#0E0E11", surface: "rgba(255,255,255,0.05)", surface2: "rgba(255,255,255,0.09)",
    border: "rgba(255,255,255,0.09)", text: "#F4F4F6", sub: "#9B9BA4", muted: "#6C6C76",
  } : {
    bg: "#F6F5F3", bg2: "#FFFFFF", surface: "rgba(20,18,15,0.035)", surface2: "rgba(20,18,15,0.06)",
    border: "rgba(20,18,15,0.09)", text: "#17150F", sub: "#6C6862", muted: "#9A9690",
  };
}
const grad = "linear-gradient(135deg,#8B7CFF 0%,#33C6B0 100%)";
const violet = "#8B7CFF", teal = "#33C6B0", amber = "#E39B3E", rose = "#E9678A";

/* ------------------------------- DATA ENGINE -------------------------------- */
const rnd = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const pick = (arr) => arr[rnd(0, arr.length - 1)];
const pickN = (arr, n) => { const s = [...arr]; const out = []; for (let i = 0; i < n && s.length; i++) out.push(s.splice(rnd(0, s.length - 1), 1)[0]); return out; };

const industries = ["Technology", "Healthcare", "Restaurants", "Fashion", "Retail", "Education", "Real Estate", "Construction", "Agriculture", "Manufacturing", "Finance", "Gaming", "Artificial Intelligence", "Media", "Transportation", "Energy"];
const countries = ["India", "United States", "United Kingdom", "Germany", "Singapore", "Canada", "Kenya", "Brazil", "Japan", "Australia", "Portugal", "Netherlands", "UAE", "South Korea", "Mexico"];
const nounsA = ["Arc", "Nimbus", "Verdant", "Solace", "Orbit", "Lumen", "Cobalt", "Fable", "Quartz", "Halcyon", "Meridian", "Aster", "Ember", "Tidal", "Vector", "Grove", "Pulse", "Cinder", "Beacon", "Marrow", "Fenwick", "Thistle", "Harbor", "Ridge", "Amber", "Cypress", "Delta", "Echo", "Frost", "Granite", "Ivory", "Juniper", "Kestrel", "Lantern", "Maple", "Nomad", "Onyx", "Pinnacle", "Quill", "Raven", "Sable", "Terra", "Umbra", "Vesper", "Willow", "Zephyr", "Anchor", "Birch", "Coral", "Drift"];
const suffixes = ["Labs", "Robotics", "Farms", "Wearables", "Foods", "Studio", "Works", "Collective", "Systems", "Health", "Dynamics", "Analytics", "Ventures", "Craft", "Motors", "Energy", "Media", "Networks", "Foundry", "Group"];
const firstNames = ["Maya", "Leo", "Priya", "Noah", "Elena", "Kwame", "Sofia", "Ravi", "Grace", "Diego", "Amara", "Felix", "Yuki", "Omar", "Ines", "Theo", "Zara", "Lucas", "Nadia", "Sam", "Mei", "Jonas", "Layla", "Arjun", "Clara", "Kofi", "Ana", "Marcus", "Ling", "Ben"];
const lastNames = ["Chen", "Okafor", "Patel", "Silva", "Kim", "Novak", "Reyes", "Larsen", "Haddad", "Boateng", "Rossi", "Nguyen", "Petrov", "Diallo", "Fischer", "Watanabe", "Costa", "Dubois", "Adeyemi", "Sorensen"];
const skills = ["React", "Node.js", "Figma", "Python", "SQL", "Copywriting", "Sales", "Logistics", "TypeScript", "Product Strategy", "Data Viz", "Community Building", "Illustration", "Go", "Rust", "Marketing", "Finance Modeling", "UX Research", "DevOps", "Machine Learning"];
const jobTitles = ["Product Designer", "Backend Engineer", "Growth Marketer", "Data Analyst", "Community Manager", "Sales Lead", "Frontend Engineer", "Operations Associate", "Customer Success Manager", "Content Strategist", "ML Engineer", "Supply Chain Analyst", "Finance Associate", "People Ops Partner", "Founding Engineer"];
const jobTypes = ["Full-time", "Internship", "Freelance", "Contract", "Part-time", "Remote"];
const cities = ["Bengaluru", "Mumbai", "Pune", "Hyderabad", "Delhi NCR", "Chennai", "Austin", "Berlin", "Toronto", "Lisbon", "Singapore", "Dubai"];
const rupee = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

function makeBusinesses(n) {
  return Array.from({ length: n }, (_, i) => {
    const industry = pick(industries);
    const goal = rnd(4, 90) * 100000;
    const pct = rnd(8, 99);
    const raised = Math.round(goal * (pct / 100));
    return {
      id: `biz-${i}`, name: `${nounsA[i % nounsA.length]} ${pick(suffixes)}`,
      industry, country: pick(countries), city: pick(cities), founded: rnd(2016, 2025),
      initials: nounsA[i % nounsA.length].slice(0, 2).toUpperCase(),
      trust: rnd(58, 98), goal, raised, pct,
      followers: rnd(80, 24000), supporters: rnd(20, 3200), employees: rnd(2, 140),
      verified: Math.random() > 0.22,
      founders: pickN(firstNames, 2).map((f) => `${f} ${pick(lastNames)}`),
      mission: `Building the future of ${industry.toLowerCase()} through thoughtful, founder-led execution.`,
      color: pick([violet, teal, amber, rose]),
    };
  });
}
function makeJobs(n, businesses) {
  return Array.from({ length: n }, (_, i) => {
    const biz = pick(businesses);
    return {
      id: `job-${i}`, title: pick(jobTitles), type: pick(jobTypes),
      business: biz.name, bizId: biz.id, city: pick(cities), remote: Math.random() > 0.5,
      skills: pickN(skills, 3), posted: rnd(1, 28), applicants: rnd(2, 340), pay: rnd(15, 220) * 1000,
    };
  });
}
function makeProfessionals(n) {
  return Array.from({ length: n }, () => {
    const f = pick(firstNames), l = pick(lastNames);
    return {
      id: `pro-${f}${l}${rnd(0, 9999)}`, name: `${f} ${l}`, initials: `${f[0]}${l[0]}`,
      headline: `${pick(jobTitles)} · ${pick(cities)}`, skills: pickN(skills, 4), trust: rnd(55, 99),
      followers: rnd(10, 5200), available: Math.random() > 0.4, color: pick([violet, teal, amber, rose]),
    };
  });
}
const businesses = makeBusinesses(50);
const jobs = makeJobs(100, businesses);
const professionals = makeProfessionals(160);
const founderPosts = Array.from({ length: 40 }, (_, i) => {
  const biz = pick(businesses);
  return {
    id: `post-${i}`, biz, likes: rnd(3, 890), comments: rnd(0, 120),
    text: pick([
      "We just crossed a major milestone and it's thanks to this community's early trust in us.",
      "Shipping our v2 roadmap this quarter — funding update and product changes inside.",
      "Hiring three roles this month. Would love recommendations from this network.",
      "Transparency update: here's exactly where the last funding round went.",
      "AMA tomorrow at 10am — ask us anything about scaling a small team fast.",
    ]),
    time: `${rnd(1, 20)}h ago`,
  };
});

/* ------------------------------- GLOBAL STYLE / ANIMATIONS ------------------------------- */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
    .trys-root { font-family:'Inter',-apple-system,sans-serif; }
    .pressable { transition: transform .12s cubic-bezier(.4,0,.2,1), border-color .15s ease, background .15s ease; }
    .pressable:active { transform: scale(0.96); }
    .icon-btn { transition: transform .15s ease, background .15s ease; }
    .icon-btn:active { transform: scale(0.88); }
    @keyframes screenIn { from { opacity:0; transform: translateY(10px); } to { opacity:1; transform: translateY(0); } }
    .screen-enter { animation: screenIn .32s cubic-bezier(.16,1,.3,1) both; }
    @keyframes fadeUp { from { opacity:0; transform: translateY(12px); } to { opacity:1; transform: translateY(0); } }
    .stagger-item { animation: fadeUp .38s cubic-bezier(.16,1,.3,1) both; }
    @keyframes sheetUp { from { opacity:0; transform: translateY(28px); } to { opacity:1; transform: translateY(0); } }
    .sheet-enter { animation: sheetUp .34s cubic-bezier(.16,1,.3,1) both; }
    @keyframes pillPulse { 0%{ box-shadow: 0 0 0 0 rgba(139,124,255,0.35); } 100%{ box-shadow: 0 0 0 8px rgba(139,124,255,0); } }
    .bar-fill { transition: width 1s cubic-bezier(.16,1,.3,1); }
    .ring-fill { transition: stroke-dashoffset 1.1s cubic-bezier(.16,1,.3,1); }
    .tab-pill { transition: left .28s cubic-bezier(.34,1.56,.64,1); }
    .theme-icon { transition: transform .4s cubic-bezier(.34,1.56,.64,1), opacity .25s ease; }
    ::-webkit-scrollbar { height: 0; width: 0; }
  `}</style>
);

/* --------------------------------- ATOMS ----------------------------------- */
const Avatar = ({ label, color, size = 38, radius = 12 }) => (
  <div style={{ width: size, height: size, borderRadius: radius, background: `${color}22`, border: `1px solid ${color}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.32, fontWeight: 600, color, flexShrink: 0 }}>{label}</div>
);

const Logo = ({ size = 26, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
    <rect x="6" y="10" width="48" height="10" rx="5" fill={color} />
    <rect x="25" y="18" width="10" height="32" rx="5" fill={color} />
  </svg>
);

export default function TrysApp() {
  const [dark, setDark] = useState(true);
  const c = getTheme(dark);
  const glass = { background: c.surface, border: `1px solid ${c.border}`, borderRadius: 18 };

  const [view, setView] = useState("home");
  const [workTab, setWorkTab] = useState("jobs");
  const [query, setQuery] = useState("");
  const [industryFilter, setIndustryFilter] = useState("All");
  const [jobTypeFilter, setJobTypeFilter] = useState("All");
  const [selBiz, setSelBiz] = useState(null);
  const [selPro, setSelPro] = useState(null);
  const [selJob, setSelJob] = useState(null);
  const [saved, setSaved] = useState(new Set());
  const [applied, setApplied] = useState(new Set());
  const [thread, setThread] = useState({ open: false, i: 0 });

  const Badge = ({ children, tone }) => (
    <span style={{ fontSize: 10.5, fontWeight: 600, padding: "3px 9px", borderRadius: 20, background: tone ? `${tone}1E` : c.surface2, color: tone || c.sub, border: `1px solid ${tone ? tone + "44" : c.border}`, display: "inline-flex", alignItems: "center", gap: 4, whiteSpace: "nowrap" }}>{children}</span>
  );

  const AnimatedBar = ({ pct, h = 6, color = violet }) => {
    const [w, setW] = useState(0);
    useEffect(() => { const t = setTimeout(() => setW(pct), 60); return () => clearTimeout(t); }, [pct]);
    return (
      <div style={{ height: h, borderRadius: h, background: c.surface2, overflow: "hidden" }}>
        <div className="bar-fill" style={{ width: `${w}%`, height: "100%", background: `linear-gradient(90deg,${color},${teal})`, borderRadius: h }} />
      </div>
    );
  };

  const TrustRing = ({ score, size = 46 }) => {
    const r = size / 2 - 5, circ = 2 * Math.PI * r;
    const [off, setOff] = useState(circ);
    useEffect(() => { const t = setTimeout(() => setOff(circ - (score / 100) * circ), 60); return () => clearTimeout(t); }, [score, circ]);
    return (
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke={c.border} strokeWidth="4" fill="none" />
        <circle className="ring-fill" cx={size / 2} cy={size / 2} r={r} stroke={teal} strokeWidth="4" fill="none" strokeDasharray={circ} strokeDashoffset={off} strokeLinecap="round" transform={`rotate(-90 ${size / 2} ${size / 2})`} />
        <text x="50%" y="50%" textAnchor="middle" dy="0.32em" fontSize={size * 0.28} fontWeight="600" fill={c.text}>{score}</text>
      </svg>
    );
  };

  const toggleSave = (id) => setSaved(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleApply = (id) => setApplied(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const filteredBiz = useMemo(() => businesses.filter(b =>
    (industryFilter === "All" || b.industry === industryFilter) &&
    (query === "" || b.name.toLowerCase().includes(query.toLowerCase()))
  ), [industryFilter, query]);

  const filteredJobs = useMemo(() => jobs.filter(j =>
    (jobTypeFilter === "All" || j.type === jobTypeFilter) &&
    (query === "" || j.title.toLowerCase().includes(query.toLowerCase()) || j.business.toLowerCase().includes(query.toLowerCase()))
  ), [jobTypeFilter, query]);

  const page = { padding: "0 16px 24px" };
  const h1 = { fontSize: 19, fontWeight: 700, margin: 0, color: c.text };
  const sectionTitle = { fontSize: 13.5, fontWeight: 600, margin: "18px 0 10px", color: c.text };

  /* ---------- cards ---------- */
  const BizCard = (b, i = 0) => (
    <div key={b.id} className="pressable stagger-item" style={{ ...glass, padding: 15, cursor: "pointer", animationDelay: `${i * 35}ms` }} onClick={() => setSelBiz(b)}>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <Avatar label={b.initials} color={b.color} />
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 13.5, color: c.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "flex", alignItems: "center", gap: 5 }}>
            {b.name} {b.verified && <CheckCircle2 size={12} color={teal} />}
          </div>
          <div style={{ fontSize: 11.5, color: c.sub }}>{b.industry} · {b.country}</div>
        </div>
        <ChevronRight size={14} color={c.sub} />
      </div>
      <div style={{ margin: "12px 0 7px" }}><AnimatedBar pct={b.pct} color={b.color} /></div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: c.sub }}>
        <span>{rupee(b.raised)} raised</span>
        <span style={{ display: "flex", alignItems: "center", gap: 3 }}><Shield size={10} color={teal} />{b.trust}</span>
      </div>
    </div>
  );

  const JobRow = (j, i = 0) => (
    <div key={j.id} className="pressable stagger-item" style={{ ...glass, padding: "13px 14px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", animationDelay: `${i * 30}ms` }} onClick={() => setSelJob(j)}>
      <Avatar label={j.title.slice(0, 2)} color={violet} size={36} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: 13, color: c.text }}>{j.title}</div>
        <div style={{ fontSize: 11, color: c.sub, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{j.business} · {j.remote ? "Remote" : j.city}</div>
      </div>
      <div style={{ textAlign: "right" }}>
        <Badge>{j.type}</Badge>
        <div style={{ fontSize: 11.5, fontWeight: 600, color: teal, marginTop: 4 }}>{rupee(j.pay)}</div>
      </div>
    </div>
  );

  const ProRow = (p, i = 0) => (
    <div key={p.id} className="pressable stagger-item" style={{ ...glass, padding: 14, display: "flex", gap: 12, alignItems: "center", cursor: "pointer", animationDelay: `${i * 30}ms` }} onClick={() => setSelPro(p)}>
      <Avatar label={p.initials} color={p.color} size={38} radius={50} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: 13, color: c.text }}>{p.name}</div>
        <div style={{ fontSize: 11, color: c.sub, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.headline}</div>
      </div>
      {p.available ? <Badge tone={teal}>Open</Badge> : <Badge>Busy</Badge>}
    </div>
  );

  const SearchBar = ({ placeholder }) => (
    <div style={{ ...glass, display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", margin: "12px 0" }}>
      <Search size={15} color={c.sub} />
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={placeholder} style={{ background: "transparent", border: "none", outline: "none", color: c.text, fontSize: 13, width: "100%" }} />
    </div>
  );

  const Chips = ({ options, value, onChange }) => (
    <div style={{ display: "flex", gap: 7, overflowX: "auto", paddingBottom: 4 }}>
      {options.map(o => (
        <div key={o} onClick={() => onChange(o)} style={{ flexShrink: 0, cursor: "pointer" }} className="pressable">
          <Badge tone={value === o ? violet : undefined}>{o}</Badge>
        </div>
      ))}
    </div>
  );

  /* ---------------------------------- SCREENS ---------------------------------- */
  const HomeScreen = () => (
    <div style={page}>
      <div style={{ display: "flex", gap: 8, margin: "16px 0" }}>
        {[["50", "Businesses"], [`${jobs.length}`, "Jobs"], ["160", "People"]].map(([v, l], i) => (
          <div key={l} className="stagger-item" style={{ ...glass, flex: 1, padding: "10px 6px", textAlign: "center", animationDelay: `${i * 40}ms` }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: c.text }}>{v}</div>
            <div style={{ fontSize: 9.5, color: c.sub }}>{l}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <div className="pressable" onClick={() => setView("fund")} style={{ flex: 1, borderRadius: 18, padding: 16, background: `linear-gradient(135deg,${violet}26,${violet}08)`, border: `1px solid ${violet}33`, cursor: "pointer" }}>
          <TrendingUp size={18} color={violet} />
          <div style={{ fontSize: 13.5, fontWeight: 700, marginTop: 8, color: c.text }}>Crowdfunding</div>
          <div style={{ fontSize: 11, color: c.sub, marginTop: 2 }}>Back verified businesses</div>
        </div>
        <div className="pressable" onClick={() => setView("work")} style={{ flex: 1, borderRadius: 18, padding: 16, background: `linear-gradient(135deg,${teal}26,${teal}08)`, border: `1px solid ${teal}33`, cursor: "pointer" }}>
          <Briefcase size={18} color={teal} />
          <div style={{ fontSize: 13.5, fontWeight: 700, marginTop: 8, color: c.text }}>Jobs & talent</div>
          <div style={{ fontSize: 11, color: c.sub, marginTop: 2 }}>Hire or get hired</div>
        </div>
      </div>

      <div style={sectionTitle}>Trending campaigns</div>
      <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 4 }}>
        {[...businesses].sort((a, b) => b.pct - a.pct).slice(0, 8).map((b, i) => (
          <div key={b.id} style={{ minWidth: 190 }}>{BizCard(b, i)}</div>
        ))}
      </div>

      <div style={sectionTitle}>Founder feed</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {founderPosts.slice(0, 3).map((p, i) => (
          <div key={p.id} className="stagger-item" style={{ ...glass, padding: 15, animationDelay: `${i * 40}ms` }}>
            <div style={{ display: "flex", gap: 9, alignItems: "center", marginBottom: 8 }}>
              <Avatar label={p.biz.initials} color={p.biz.color} size={30} />
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: c.text }}>{p.biz.name}</div>
                <div style={{ fontSize: 10.5, color: c.muted }}>{p.time}</div>
              </div>
            </div>
            <div style={{ fontSize: 12.5, lineHeight: 1.6, color: c.text }}>{p.text}</div>
            <div style={{ display: "flex", gap: 16, marginTop: 10, fontSize: 11, color: c.sub }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Heart size={12} />{p.likes}</span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><MessageCircle size={12} />{p.comments}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const FundScreen = () => (
    <div style={page}>
      <h1 style={h1}>Crowdfunding</h1>
      <div style={{ fontSize: 11.5, color: c.sub, marginTop: 3 }}>{filteredBiz.length} businesses raising support</div>
      <SearchBar placeholder="Search businesses" />
      <Chips options={["All", ...industries]} value={industryFilter} onChange={setIndustryFilter} />
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 12 }}>
        {filteredBiz.map((b, i) => BizCard(b, i))}
      </div>
    </div>
  );

  const WorkScreen = () => (
    <div style={page}>
      <h1 style={h1}>Jobs & talent</h1>
      <div style={{ display: "flex", gap: 8, margin: "14px 0" }}>
        {["jobs", "talent"].map(t => (
          <div key={t} className="pressable" onClick={() => setWorkTab(t)} style={{ flex: 1, textAlign: "center", padding: "9px 0", borderRadius: 14, cursor: "pointer", background: workTab === t ? teal + "22" : c.surface, border: `1px solid ${workTab === t ? teal + "55" : c.border}`, color: workTab === t ? c.text : c.sub, fontSize: 12.5, fontWeight: 600 }}>
            {t === "jobs" ? "Open roles" : "Talent directory"}
          </div>
        ))}
      </div>
      {workTab === "jobs" ? (
        <>
          <SearchBar placeholder="Search jobs or companies" />
          <Chips options={["All", ...jobTypes]} value={jobTypeFilter} onChange={setJobTypeFilter} />
          <div style={{ fontSize: 11.5, color: c.sub, margin: "10px 0" }}>{filteredJobs.length} open roles</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>{filteredJobs.slice(0, 30).map((j, i) => JobRow(j, i))}</div>
        </>
      ) : (
        <>
          <SearchBar placeholder="Search people" />
          <div style={{ fontSize: 11.5, color: c.sub, margin: "10px 0" }}>{professionals.length} people on TRYS</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {professionals.filter(p => query === "" || p.name.toLowerCase().includes(query.toLowerCase())).slice(0, 40).map((p, i) => ProRow(p, i))}
          </div>
        </>
      )}
    </div>
  );

  const FeedScreen = () => (
    <div style={page}>
      <h1 style={h1}>Community feed</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 14 }}>
        {founderPosts.map((p, i) => (
          <div key={p.id} className="stagger-item" style={{ ...glass, padding: 15, animationDelay: `${Math.min(i, 10) * 35}ms` }}>
            <div style={{ display: "flex", gap: 9, alignItems: "center", marginBottom: 8 }}>
              <Avatar label={p.biz.initials} color={p.biz.color} size={30} />
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: c.text }}>{p.biz.name}</div>
                <div style={{ fontSize: 10.5, color: c.muted }}>{p.time}</div>
              </div>
            </div>
            <div style={{ fontSize: 12.5, lineHeight: 1.6, color: c.text }}>{p.text}</div>
            <div style={{ display: "flex", gap: 16, marginTop: 10, fontSize: 11, color: c.sub }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Heart size={12} />{p.likes}</span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><MessageCircle size={12} />{p.comments}</span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Share2 size={12} />Share</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ProfileScreen = () => {
    const b = businesses[3];
    return (
      <div style={page}>
        <h1 style={h1}>Your profile</h1>
        <div style={{ display: "flex", gap: 14, alignItems: "center", margin: "14px 0 18px" }}>
          <Avatar label="MR" color={teal} size={54} radius={50} />
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: c.text }}>Maya Rodriguez</div>
            <div style={{ fontSize: 12, color: c.sub }}>Founder · managing {b.name}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
          {[["Raised", rupee(b.raised)], ["Followers", b.followers.toLocaleString("en-IN")], ["Roles", "4"]].map(([l, v]) => (
            <div key={l} style={{ ...glass, flex: 1, padding: "10px 6px", textAlign: "center" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: c.text }}>{v}</div>
              <div style={{ fontSize: 9.5, color: c.sub }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ ...glass, padding: 16, marginBottom: 12 }}>
          <div style={{ fontSize: 12.5, fontWeight: 600, marginBottom: 10, color: c.text }}>Funding progress</div>
          <AnimatedBar pct={b.pct} h={8} color={b.color} />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 11, color: c.sub }}>
            <span>{rupee(b.raised)} raised</span><span>{b.pct}%</span>
          </div>
        </div>
        <div style={{ ...glass, padding: 16, display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
          <TrustRing score={b.trust} size={50} />
          <div style={{ fontSize: 11.5, color: c.sub, lineHeight: 1.6 }}>Documents verified<br />Fraud checks passed<br />Identity confirmed</div>
        </div>
        <div className="pressable" onClick={() => setView("notifications")} style={{ ...glass, padding: 14, display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8, cursor: "pointer" }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: c.text, display: "flex", alignItems: "center", gap: 8 }}><Bell size={15} color={c.sub} /> Notifications</span>
          <ChevronRight size={15} color={c.sub} />
        </div>
        <div className="pressable" onClick={() => setView("messages")} style={{ ...glass, padding: 14, display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: c.text, display: "flex", alignItems: "center", gap: 8 }}><MessageCircle size={15} color={c.sub} /> Messages</span>
          <ChevronRight size={15} color={c.sub} />
        </div>
      </div>
    );
  };

  const MessagesScreen = () => {
    const convos = businesses.slice(0, 10);
    const bubbles = [
      { me: false, text: "Thanks for backing our campaign, it means a lot to the team." },
      { me: true, text: "Of course — following your roadmap closely. Next update soon?" },
      { me: false, text: "Dropping one this Friday with revenue numbers and hiring plans." },
    ];
    return (
      <div style={page}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 4 }}>
          {thread.open && <ChevronLeft className="icon-btn" size={18} color={c.text} style={{ cursor: "pointer" }} onClick={() => setThread({ open: false, i: 0 })} />}
          <h1 style={h1}>{thread.open ? convos[thread.i].name : "Messages"}</h1>
        </div>
        {!thread.open ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 14 }}>
            {convos.map((b, i) => (
              <div key={b.id} className="pressable stagger-item" onClick={() => setThread({ open: true, i })} style={{ ...glass, padding: 12, display: "flex", gap: 10, alignItems: "center", cursor: "pointer", animationDelay: `${i * 30}ms` }}>
                <Avatar label={b.initials} color={b.color} size={36} />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: c.text }}>{b.name}</div>
                  <div style={{ fontSize: 11, color: c.sub, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Next update dropping Friday…</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ marginTop: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {bubbles.map((m, i) => (
                <div key={i} className="stagger-item" style={{ alignSelf: m.me ? "flex-end" : "flex-start", background: m.me ? violet + "26" : c.surface2, border: `1px solid ${c.border}`, borderRadius: 14, padding: "9px 13px", maxWidth: "80%", fontSize: 12.5, color: c.text, animationDelay: `${i * 60}ms` }}>{m.text}</div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 16, alignItems: "center", ...glass, padding: 9 }}>
              <Paperclip size={14} color={c.sub} />
              <span style={{ flex: 1, fontSize: 12, color: c.muted }}>Write a message…</span>
              <Send size={14} color={violet} />
            </div>
          </div>
        )}
      </div>
    );
  };

  const NotificationsScreen = () => (
    <div style={page}>
      <h1 style={h1}>Notifications</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 14 }}>
        {founderPosts.slice(0, 14).map((p, i) => (
          <div key={p.id} className="stagger-item" style={{ ...glass, padding: 12, display: "flex", gap: 10, alignItems: "center", animationDelay: `${Math.min(i, 8) * 30}ms` }}>
            <Avatar label={p.biz.initials} color={p.biz.color} size={30} />
            <div style={{ fontSize: 12.5, color: c.text }}><b>{p.biz.name}</b> posted an update — {p.time}</div>
          </div>
        ))}
      </div>
    </div>
  );

  /* ------------------------------ FULL-SCREEN DETAILS (funding only) ------------------------------ */
  const BizDetail = ({ b }) => (
    <div className="sheet-enter" style={{ position: "absolute", inset: 0, background: c.bg, zIndex: 30, overflowY: "auto" }}>
      <div style={{ height: 120, background: `linear-gradient(135deg,${b.color}30,transparent)`, position: "relative" }}>
        <div className="icon-btn" onClick={() => setSelBiz(null)} style={{ position: "absolute", top: 22, left: 16, width: 32, height: 32, borderRadius: 11, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><ChevronLeft size={17} color="#fff" /></div>
        <div style={{ position: "absolute", bottom: -24, left: 20 }}><Avatar label={b.initials} color={b.color} size={58} radius={16} /></div>
      </div>
      <div style={{ padding: "36px 18px 30px", maxWidth: 480, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, display: "flex", alignItems: "center", gap: 5, color: c.text }}>{b.name} {b.verified && <CheckCircle2 size={14} color={teal} />}</div>
            <div style={{ fontSize: 11.5, color: c.sub, marginTop: 3 }}>{b.industry} · {b.city}, {b.country}</div>
          </div>
          <TrustRing score={b.trust} size={48} />
        </div>
        <div style={{ fontSize: 12.5, color: c.sub, lineHeight: 1.65, margin: "14px 0" }}>{b.mission}</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
          {b.founders.map(f => <Badge key={f}>{f}</Badge>)}
          <Badge tone={amber}>{b.followers.toLocaleString("en-IN")} followers</Badge>
        </div>
        <div style={{ ...glass, padding: 16, marginBottom: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontSize: 17, fontWeight: 700, color: c.text }}>{rupee(b.raised)}</span>
            <span style={{ fontSize: 11, color: c.sub }}>of {rupee(b.goal)}</span>
          </div>
          <div style={{ margin: "9px 0" }}><AnimatedBar pct={b.pct} h={7} color={b.color} /></div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: c.sub }}>
            <span>{b.pct}% funded</span><span>{b.supporters.toLocaleString("en-IN")} supporters</span>
          </div>
        </div>
        <div style={{ ...glass, padding: 13, display: "flex", gap: 8, alignItems: "center", marginBottom: 18 }}>
          <Sparkles size={14} color={violet} />
          <span style={{ fontSize: 11, color: c.sub }}>AI: consistent funding velocity, credible founders — informational only.</span>
        </div>
        <button className="pressable" style={{ width: "100%", padding: 14, borderRadius: 15, border: "none", background: grad, color: "#0A0A0C", fontWeight: 700, fontSize: 13.5, cursor: "pointer" }}>Back this business</button>
      </div>
    </div>
  );

  const ProDetail = ({ p }) => (
    <div className="sheet-enter" style={{ position: "absolute", inset: 0, background: c.bg, zIndex: 30, overflowY: "auto", padding: "22px 18px 30px" }}>
      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        <div className="icon-btn" onClick={() => setSelPro(null)} style={{ width: 32, height: 32, borderRadius: 11, background: c.surface2, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, cursor: "pointer" }}><ChevronLeft size={17} color={c.text} /></div>
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <Avatar label={p.initials} color={p.color} size={58} radius={50} />
          <div>
            <div style={{ fontSize: 17, fontWeight: 700, color: c.text }}>{p.name}</div>
            <div style={{ fontSize: 12, color: c.sub }}>{p.headline}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", margin: "16px 0" }}>{p.skills.map(s => <Badge key={s}>{s}</Badge>)}</div>
        <div style={{ display: "flex", gap: 14, marginBottom: 18, alignItems: "center" }}>
          <TrustRing score={p.trust} size={48} />
          <div style={{ fontSize: 11, color: c.sub, lineHeight: 1.6 }}>Reflects verified work history,<br />portfolio quality, community standing.</div>
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
          <Badge><Github size={10} /> github</Badge><Badge><Linkedin size={10} /> linkedin</Badge><Badge><Globe size={10} /> site</Badge>
        </div>
        <button className="pressable" style={{ width: "100%", padding: 14, borderRadius: 15, border: "none", background: grad, color: "#0A0A0C", fontWeight: 700, fontSize: 13.5, cursor: "pointer" }}>Message {p.name.split(" ")[0]}</button>
      </div>
    </div>
  );

  const JobDetail = ({ j }) => {
    const isApplied = applied.has(j.id), isSaved = saved.has(j.id);
    return (
      <div className="sheet-enter" style={{ position: "absolute", inset: 0, background: c.bg, zIndex: 30, overflowY: "auto", padding: "22px 18px 30px" }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <div className="icon-btn" onClick={() => setSelJob(null)} style={{ width: 32, height: 32, borderRadius: 11, background: c.surface2, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18, cursor: "pointer" }}><ChevronLeft size={17} color={c.text} /></div>
          <div style={{ fontSize: 17, fontWeight: 700, color: c.text }}>{j.title}</div>
          <div style={{ fontSize: 12, color: c.sub, margin: "4px 0 14px" }}>{j.business} · {j.remote ? "Remote" : j.city}</div>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 16 }}>
            <Badge tone={violet}>{j.type}</Badge><Badge><Clock size={10} /> {j.posted}d ago</Badge><Badge>{j.applicants} applicants</Badge>
          </div>
          <div style={{ fontSize: 12.5, color: c.sub, lineHeight: 1.65, marginBottom: 14 }}>
            {j.business} is looking for a {j.title.toLowerCase()} to join a small, fast-moving team.
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>{j.skills.map(s => <Badge key={s}>{s}</Badge>)}</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: teal, marginBottom: 18 }}>{rupee(j.pay)} / month</div>
          <div style={{ display: "flex", gap: 9 }}>
            <button className="pressable" onClick={() => toggleApply(j.id)} style={{ flex: 1, padding: 14, borderRadius: 14, border: "none", background: isApplied ? c.surface2 : grad, color: isApplied ? c.text : "#0A0A0C", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>{isApplied ? "Applied ✓" : "One-click apply"}</button>
            <button className="pressable icon-btn" onClick={() => toggleSave(j.id)} style={{ width: 48, borderRadius: 14, border: `1px solid ${c.border}`, background: isSaved ? c.surface2 : "transparent", cursor: "pointer" }}><Bookmark size={15} color={isSaved ? amber : c.sub} style={{ margin: "auto" }} /></button>
          </div>
        </div>
      </div>
    );
  };

  /* ------------------------------------- NAV / SHELL ------------------------------------- */
  const TABS = [
    { id: "home", label: "Home", icon: Home },
    { id: "fund", label: "Fund", icon: TrendingUp },
    { id: "work", label: "Work", icon: Briefcase },
    { id: "feed", label: "Feed", icon: MessageSquare },
    { id: "profile", label: "You", icon: User },
  ];
  const tabIndex = Math.max(0, TABS.findIndex(t => t.id === view));
  const titleFor = { home: "", fund: "Crowdfunding", work: "Jobs & talent", feed: "Community", profile: "Profile", messages: "Messages", notifications: "Notifications" };

  const screens = { home: HomeScreen, fund: FundScreen, work: WorkScreen, feed: FeedScreen, profile: ProfileScreen, messages: MessagesScreen, notifications: NotificationsScreen };
  const Current = screens[view] || HomeScreen;

  return (
    <div className="trys-root" style={{ background: dark ? "#000" : "#E9E7E2", width: "100%", padding: "0", display: "flex", justifyContent: "center" }}>
      <GlobalStyle />
      <div style={{ width: "100%", maxWidth: 428, height: 760, background: c.bg, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>

        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
          {/* top app bar */}
          <div style={{ position: "sticky", top: 0, zIndex: 5, background: dark ? "#0A0A0C" : "#F6F5F3", borderBottom: `1px solid ${c.border}`, padding: "14px 16px", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Logo size={22} color={c.text} />
                <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: 1.5, color: c.text }}>TRYS</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {view === "home" && <div style={{ fontSize: 11.5, color: c.sub, marginRight: 2 }}>Good evening, Maya</div>}
                <div className="icon-btn" onClick={() => setDark(d => !d)} style={{ width: 32, height: 32, borderRadius: 11, background: c.surface2, border: `1px solid ${c.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", overflow: "hidden", flexShrink: 0 }}>
                  <div className="theme-icon" style={{ transform: dark ? "rotate(0deg)" : "rotate(180deg)" }}>
                    {dark ? <Moon size={15} color={c.text} /> : <Sun size={15} color={c.text} />}
                  </div>
                </div>
              </div>
            </div>
            {titleFor[view] && <div style={{ fontSize: 11, color: c.muted, marginTop: 6 }}>{titleFor[view]}</div>}
          </div>

          <div key={view} className="screen-enter" style={{ flex: 1 }}>
            <Current />
          </div>

          {/* bottom tab bar (sticky within the scroll container, not fixed to viewport) */}
          <div style={{ position: "sticky", bottom: 0, background: dark ? "#0E0E11" : "#FFFFFF", borderTop: `1px solid ${c.border}`, display: "flex", padding: "9px 6px 12px", flexShrink: 0 }}>
            <div className="tab-pill" style={{ position: "absolute", top: 6, left: `calc(${tabIndex} * (100% / 5))`, width: `calc(100% / 5)`, display: "flex", justifyContent: "center" }}>
              <div style={{ width: 20, height: 3, borderRadius: 3, background: violet }} />
            </div>
            {TABS.map(({ id, label, icon: Icon }) => (
              <div key={id} className="icon-btn" onClick={() => setView(id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, cursor: "pointer", paddingTop: 6 }}>
                <Icon size={18} color={view === id ? violet : c.sub} />
                <span style={{ fontSize: 9.5, color: view === id ? c.text : c.sub, fontWeight: view === id ? 600 : 400 }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {selBiz && <BizDetail b={selBiz} />}
        {selPro && <ProDetail p={selPro} />}
        {selJob && <JobDetail j={selJob} />}
      </div>
    </div>
  );
}
