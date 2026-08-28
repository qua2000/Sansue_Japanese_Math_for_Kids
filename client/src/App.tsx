/** Study Desk Editorial: original English content is primary; navigation adds only structure and search. */
import { Route, Router, Switch, useLocation } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { Search, ChevronRight, Menu, X, BookOpen, ArrowLeft } from "lucide-react";
import { useMemo, useState } from "react";
import Home from "./pages/Home";
import ProblemPage from "./pages/ProblemPage";
import { migratedIndex } from "./data/migratedIndex";
import { assetPath } from "./lib/assetPath";

const catalog = [
  { group: "Exam Problems", items: [
    { label: "Exam.L1", path: "/exam-l1", count: "2014–2024" },
    { label: "Exam.L2", path: "/exam-l2", count: "2010–2024" },
    { label: "Exam.L3", path: "/exam-l3", count: "1999–2010" },
  ]},
  { group: "Study Levels", items: [
    { label: "Level 1", path: "/level-1", count: "Basics" },
    { label: "Level 2", path: "/level-2", count: "Intermediate" },
    { label: "Level 3", path: "/level-3", count: "Advanced" },
  ]},
  { group: "Practice", items: [
    { label: "New Drill", path: "/new-drill", count: "Coming soon" },
  ]},
];

function SiteHeader({ onMenu }: { onMenu: () => void }) {
  const [, navigate] = useLocation();
  return <header className="site-header"><div className="header-inner"><button className="brand" onClick={() => navigate("/")} aria-label="Return to Home"><img src={assetPath("/manus-storage/math-kids-logo_da704f37.png")} alt="" className="brand-mark" /><span><strong>Sansue</strong><em>Japanese Math for Kids</em></span></button><nav className="top-nav" aria-label="Main navigation"><button onClick={() => navigate("/")}>Home</button><button onClick={() => navigate("/exam-l1")}>Problems</button><button onClick={() => navigate("/about")}>About</button></nav><button className="menu-button" onClick={onMenu} aria-label="Open navigation"><Menu size={22} /></button></div></header>;
}

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [, navigate] = useLocation();
  return <>{open && <button className="sidebar-scrim" onClick={onClose} aria-label="Close navigation" />}<aside className={`sidebar ${open ? "is-open" : ""}`}><div className="sidebar-head"><span className="eyebrow">THE COLLECTION</span><button onClick={onClose} className="close-button" aria-label="Close"><X size={20} /></button></div><p className="sidebar-intro">Explore the way to the answer.</p><div className="sidebar-section">
  <span className="sidebar-label">Problem collections</span>
  {catalog.map((group, i) => (
    <div key={i} className="catalog-group">
      <h4 className="group-title">{group.group}</h4>
      {group.items.map(item => (
        <button key={item.path} className="catalog-link" onClick={() => { navigate(item.path); onClose(); }}>
          <span>{item.label}</span>
          <small>{item.count}</small>
          <ChevronRight size={15} />
        </button>
      ))}
    </div>
  ))}
</div><div className="sidebar-section sidebar-note"><span className="sidebar-label">About this move</span><p>The Google Sites hierarchy is being reorganized into readable study pages while keeping the original problems and solutions.</p></div><div className="sidebar-footer"><BookOpen size={16} /><span>Math is a way of seeing.</span></div></aside></>;
}

function SearchBar() {
  const [query, setQuery] = useState("");
  const [, navigate] = useLocation();
  const suggestions = useMemo(() => query ? migratedIndex.filter(x => `${x.title} ${x.path}`.toLowerCase().includes(query.toLowerCase())).slice(0, 8) : [], [query]);
  return <div className="search-wrap"><Search size={18} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by school or year" aria-label="Search problems" />{suggestions.length > 0 && <div className="search-results">{suggestions.map(item => <button key={item.path} onClick={() => navigate(item.path)}>{item.title}<ChevronRight size={14} /></button>)}</div>}</div>;
}

function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location, navigate] = useLocation();
  return <div className="app-shell"><SiteHeader onMenu={() => setMenuOpen(true)} /><div className="page-frame"><Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} /><main className="main-column"><div className="utility-row"><button className="back-link" onClick={() => navigate("/")}><ArrowLeft size={15} /> Home</button><SearchBar /></div>{location !== "/" && <div className="breadcrumb"><span>Home</span><ChevronRight size={13} /><span>Problems</span><ChevronRight size={13} /><strong>{location.split("/").filter(Boolean).at(-1)?.replaceAll("-", " ")}</strong></div>}{children}</main></div><footer className="site-footer"><span>“Sansue” = Japanese Math for Kids V.2</span><span>Problems, answers, and ways of thinking.</span></footer></div>;
}

function SiteRoutes() { return <Layout><Switch><Route path="/" component={Home} /><Route path="/exam-l1" component={ProblemPage} />
          <Route path="/exam-l1/:slug" component={ProblemPage} />
          <Route path="/exam-l2" component={ProblemPage} />
          <Route path="/exam-l3" component={ProblemPage} />
          <Route path="/level-1" component={ProblemPage} />
          <Route path="/level-2" component={ProblemPage} />
          <Route path="/level-3" component={ProblemPage} />
          <Route path="/new-drill" component={ProblemPage} />
          <Route path="/about" component={ProblemPage} />
          <Route component={ProblemPage} /></Switch></Layout>; }

export default function App() {
  return import.meta.env.VITE_DEPLOY_TARGET === "github-pages" ? <Router hook={useHashLocation}><SiteRoutes /></Router> : <SiteRoutes />;
}
