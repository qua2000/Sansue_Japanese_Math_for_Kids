/**
 * Design philosophy: Study Desk Editorial — an ivory study-paper surface, ink-navy type,
 * and restrained cinnabar marks. Navigation stays quiet and the problem content remains primary.
 */
import { Route, Switch, useLocation } from "wouter";
import { Search, ChevronRight, Menu, X, BookOpen, ArrowLeft } from "lucide-react";
import { useMemo, useState } from "react";
import Home from "./pages/Home";
import ProblemPage from "./pages/ProblemPage";

const catalog = [
  { label: "Exam.L1", path: "/exam-l1", count: "2014–2024" },
  { label: "Exam.L2", path: "/exam-l2", count: "2010–2024" },
  { label: "New Drill", path: "/new-drill", count: "準備中" },
];

function SiteHeader({ onMenu }: { onMenu: () => void }) {
  const [, navigate] = useLocation();
  return (
    <header className="site-header">
      <div className="header-inner">
        <button className="brand" onClick={() => navigate("/")} aria-label="Homeへ戻る">
          <img src="/manus-storage/math-kids-logo_da704f37.png" alt="" className="brand-mark" />
          <span><strong>Sansue</strong><em>Japanese Math for Kids</em></span>
        </button>
        <nav className="top-nav" aria-label="主要ナビゲーション">
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/exam-l1")}>Problems</button>
          <button onClick={() => navigate("/about")}>About</button>
        </nav>
        <button className="menu-button" onClick={onMenu} aria-label="ナビゲーションを開く"><Menu size={22} /></button>
      </div>
    </header>
  );
}

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [, navigate] = useLocation();
  return <>
    {open && <button className="sidebar-scrim" onClick={onClose} aria-label="メニューを閉じる" />}
    <aside className={`sidebar ${open ? "is-open" : ""}`}>
      <div className="sidebar-head"><span className="eyebrow">THE COLLECTION</span><button onClick={onClose} className="close-button" aria-label="閉じる"><X size={20} /></button></div>
      <p className="sidebar-intro">一問ずつ、考え方を見つけよう。</p>
      <div className="sidebar-section">
        <span className="sidebar-label">問題集</span>
        {catalog.map(item => <button key={item.path} className="catalog-link" onClick={() => { navigate(item.path); onClose(); }}><span>{item.label}</span><small>{item.count}</small><ChevronRight size={15} /></button>)}
      </div>
      <div className="sidebar-section sidebar-note"><span className="sidebar-label">移行について</span><p>Google Sitesの階層を保ちながら、問題文と解説を読みやすい学習ページに整理しています。</p></div>
      <div className="sidebar-footer"><BookOpen size={16} /> <span>Math is a way of seeing.</span></div>
    </aside>
  </>;
}

function SearchBar() {
  const [query, setQuery] = useState("");
  const [, navigate] = useLocation();
  const suggestions = useMemo(() => query ? ["ATOMIGAKUEN-2014", "JISSENJOSHIGAKUEN-2014", "SEIJO-2014"].filter(x => x.toLowerCase().includes(query.toLowerCase())) : [], [query]);
  return <div className="search-wrap">
    <Search size={18} />
    <input value={query} onChange={e => setQuery(e.target.value)} placeholder="学校名・年度で探す" aria-label="問題を検索" />
    {suggestions.length > 0 && <div className="search-results">{suggestions.map(item => <button key={item} onClick={() => navigate(`/exam-l1/${item.toLowerCase().replaceAll(" ", "-")}`)}>{item}<ChevronRight size={14} /></button>)}</div>}
  </div>;
}

function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location, navigate] = useLocation();
  return <div className="app-shell">
    <SiteHeader onMenu={() => setMenuOpen(true)} />
    <div className="page-frame">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <main className="main-column">
        <div className="utility-row"><button className="back-link" onClick={() => navigate("/")}><ArrowLeft size={15} /> Home</button><SearchBar /></div>
        {location !== "/" && <div className="breadcrumb"><span>Home</span><ChevronRight size={13} /><span>Problems</span><ChevronRight size={13} /><strong>{location.split("/").filter(Boolean).at(-1)?.replaceAll("-", " ")}</strong></div>}
        {children}
      </main>
    </div>
    <footer className="site-footer"><span>“Sansue” = Japanese Math for Kids V.2</span><span>Problems, answers, and ways of thinking.</span></footer>
  </div>;
}

export default function App() {
  return <Layout><Switch>
    <Route path="/" component={Home} />
    <Route path="/exam-l1" component={ProblemPage} />
    <Route path="/exam-l1/:slug" component={ProblemPage} />
    <Route path="/exam-l2" component={ProblemPage} />
    <Route path="/new-drill" component={ProblemPage} />
    <Route path="/about" component={ProblemPage} />
    <Route component={ProblemPage} />
  </Switch></Layout>;
}
