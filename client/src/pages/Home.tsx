/**
 * Design philosophy: Study Desk Editorial — a quiet editorial homepage with one strong study cue,
 * generous paper-like space, and a clear route into the problem collection.
 */
import { Link } from "wouter";
import { ArrowUpRight, Check, Compass, Layers3 } from "lucide-react";
import { assetPath } from "../lib/assetPath";

export default function Home() {
  return <>
    <section className="hero-section">
      <div className="hero-copy">
        <div className="section-kicker">JAPANESE MATH FOR KIDS <span>V.2</span></div>
        <h1>Home<span className="title-mark">/</span></h1>
        <p>This site introduces problems of mathematics "Sansue (in Japanese)" which Japanese schoolchildren learn at elementary school. Problems are selected mainly from entrance examination problems of famous junior high schools for 6th grade Japanese schoolchildren (12 years old) to take. Highly recommended to challenge as brain-teasers for math lovers. Please enjoy Sansue culture.</p>
        <Link href="/exam-l1" className="primary-link">Browse problems <ArrowUpRight size={17} /></Link>
      </div>
      <div className="hero-art"><img src={assetPath("/manus-storage/math-kids-hero_0ef61b67.jpg")} alt="算数のノートが置かれた学習机" /><span className="hero-caption">A quiet desk<br />for curious minds.</span></div>
    </section>
    <section className="intro-strip"><div className="strip-mark">03</div><div><span className="eyebrow">WHAT'S INSIDE</span><p>Problems, answers, and solutions are arranged in one readable study page.</p></div><div className="strip-rule" /></section>
    <section className="collection-preview">
      <div className="collection-head"><div><span className="eyebrow">THE COLLECTION</span><h2>Choose a problem.</h2></div><Link href="/exam-l1" className="text-link">View all <ArrowUpRight size={16} /></Link></div>
      <div className="collection-layout"><div className="collection-image"><img src={assetPath("/manus-storage/math-kids-category_b17bf1ac.jpg")} alt="問題集と定規が置かれた机" /><span>01 / 03</span></div><div className="collection-list">
          <div className="collection-group">
            <span className="group-label">Exam Problems</span>
            <Link href="/exam-l1" className="collection-row"><span className="row-number">01</span><span><strong>Exam.L1</strong><small>2014–2024</small></span><ArrowUpRight size={17} /></Link>
            <Link href="/exam-l2" className="collection-row"><span className="row-number">02</span><span><strong>Exam.L2</strong><small>2010–2024</small></span><ArrowUpRight size={17} /></Link>
            <Link href="/exam-l3" className="collection-row"><span className="row-number">03</span><span><strong>Exam.L3</strong><small>1999–2010</small></span><ArrowUpRight size={17} /></Link>
          </div>
          <div className="collection-group">
            <span className="group-label">Study Levels</span>
            <Link href="/level-1" className="collection-row"><span className="row-number">04</span><span><strong>Level 1</strong><small>Basics</small></span><ArrowUpRight size={17} /></Link>
            <Link href="/level-2" className="collection-row"><span className="row-number">05</span><span><strong>Level 2</strong><small>Intermediate</small></span><ArrowUpRight size={17} /></Link>
            <Link href="/level-3" className="collection-row"><span className="row-number">06</span><span><strong>Level 3</strong><small>Advanced</small></span><ArrowUpRight size={17} /></Link>
          </div>
        </div></div>
    </section>
    <section className="principles"><div><span className="eyebrow">HOW TO USE</span><h2>Read the problem.<br />Write the equation.<br /><em>Read the reason.</em></h2></div><div className="principle-list"><div><Check size={17} /><p><strong>Problem</strong><br />Read the problem at your own pace.</p></div><div><Compass size={17} /><p><strong>Answer</strong><br />Check the answer and review your thinking.</p></div><div><Layers3 size={17} /><p><strong>Solution</strong><br />Find another way of seeing the problem in the solution.</p></div></div></section>
  </>;
}
