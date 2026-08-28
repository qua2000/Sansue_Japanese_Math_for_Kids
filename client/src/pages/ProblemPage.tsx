/** Study Desk Editorial: original English content remains primary. */
import { Link, useLocation } from "wouter";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";
import { migratedIndex } from "../data/migratedIndex";
import { pageByPath } from "../data/migratedPages";
import { assetPath } from "../lib/assetPath";

function Collapsible({ label, children, openDefault = true }: { label: string; children: React.ReactNode; openDefault?: boolean }) {
  const [open, setOpen] = useState(openDefault);
  return <section className={`answer-block ${open ? "is-open" : ""}`}><button className="answer-toggle" onClick={() => setOpen(!open)}><span>{label}</span>{open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</button>{open && <div className="answer-content">{children}</div>}</section>;
}
function PageText({ text }: { text: string }) {
  const sections = text.split(/\n(?=(?:Problem|Answer|Solution|Question|Exercise)\s*\d*\b)/i);
  return <>{sections.map((section, i) => <div className="migrated-section" key={`${section.slice(0, 20)}-${i}`}>{section.split("\n").map((line, j) => line.trim() ? <p key={j}>{line}</p> : <div className="line-gap" key={j} />)}</div>)}</>;
}
export default function ProblemPage() {
  const [location] = useLocation();
  const normalized = location.endsWith("/") ? location.slice(0, -1) : location;
  const page = pageByPath.get(normalized) || pageByPath.get(`${normalized}/`);
  const isCollection = ["/exam-l1", "/exam-l2", "/exam-l3", "/level-1", "/level-2", "/level-3", "/new-drill"].includes(normalized);
  const sourcePrefix = normalized === "/exam-l1" ? "/home/exam-l1" : 
                       normalized === "/exam-l2" ? "/home/exam-l2" : 
                       normalized === "/exam-l3" ? "/home/exam-l3" :
                       normalized === "/level-1" ? "/home/level-1" :
                       normalized === "/level-2" ? "/home/leve" :
                       normalized === "/level-3" ? "/home/level-3" : normalized;
  const collectionPages = useMemo(() => migratedIndex.filter(x => x.path.startsWith(sourcePrefix + "/") && x.path.split("/").length <= sourcePrefix.split("/").length + 2).slice(0, 80), [sourcePrefix]);
  if (isCollection && !page) return <section className="listing-page"><div className="section-kicker">THE COLLECTION <span>{collectionPages.length}</span></div><h1>{normalized.replace("/", "").replaceAll("-", " ").toUpperCase()}<span className="title-mark">/</span></h1><p className="lede">Problems arranged by school and year. The original English problem pages are preserved in this collection.</p><div className="listing-grid">{collectionPages.map((item, i) => <Link key={item.path} href={item.path} className="listing-item"><span className="item-number">{String(i + 1).padStart(2, "0")}</span><span><strong>{item.title}</strong><small>{item.path}</small></span><ExternalLink size={16} /></Link>)}</div></section>;
  if (!page) return <section className="listing-page"><div className="section-kicker">PAGE NOT FOUND</div><h1>Not found<span className="title-mark">/</span></h1><p className="lede">This page has not been included in the migration data.</p><Link href="/exam-l1" className="primary-link">Browse problems <ExternalLink size={16} /></Link></section>;
  return <article className="problem-page"><div className="problem-meta"><span className="red-stamp">MIGRATED PAGE</span><span>Original English content</span></div><h1>{page.title}<span className="title-mark">/</span></h1><p className="article-intro">The original English content from Google Sites is preserved below.</p><div className="migrated-images">{page.uploadedImages.map((image, i) => <img key={`uploaded-${image.src}-${i}`} src={assetPath(image.src)} alt={image.name} loading="lazy" />)}{page.uploadedImages.length === 0 && page.images.slice(0, 12).map((image, i) => <img key={`${image.src}-${i}`} src={assetPath(image.src)} alt={image.alt || ""} loading="lazy" />)}</div><div className="problem-stack"><section className="problem-card"><div className="problem-body migrated-body"><PageText text={page.text} /></div><Collapsible label="Answer" openDefault={false}><p>Answer content is included in the original page text above.</p></Collapsible><Collapsible label="Solution" openDefault={false}><p>Solution content is included in the original page text above.</p></Collapsible></section></div></article>;
}
