/**
 * Design philosophy: Study Desk Editorial — a quiet editorial homepage with one strong study cue,
 * generous paper-like space, and a clear route into the problem collection.
 */
import { Link } from "wouter";
import { ArrowUpRight, Check, Compass, Layers3 } from "lucide-react";

export default function Home() {
  return <>
    <section className="hero-section">
      <div className="hero-copy">
        <div className="section-kicker">JAPANESE MATH FOR KIDS <span>V.2</span></div>
        <h1>一問ずつ、<br /><em>考え方</em>を見つけよう。</h1>
        <p>小学生が学ぶ算数と、中学受験で出会う問題を集めた小さな問題集。答えだけでなく、そこへたどり着く道筋を楽しむためのサイトです。</p>
        <Link href="/exam-l1" className="primary-link">問題集を見る <ArrowUpRight size={17} /></Link>
      </div>
      <div className="hero-art"><img src="/manus-storage/math-kids-hero_0ef61b67.jpg" alt="算数のノートが置かれた学習机" /><span className="hero-caption">A quiet desk<br />for curious minds.</span></div>
    </section>
    <section className="intro-strip"><div className="strip-mark">03</div><div><span className="eyebrow">WHAT'S INSIDE</span><p>学校別・年度別の問題、解答、考え方のメモを、読みやすい一つのページにまとめています。</p></div><div className="strip-rule" /></section>
    <section className="collection-preview">
      <div className="collection-head"><div><span className="eyebrow">THE COLLECTION</span><h2>問題を選ぶ。</h2></div><Link href="/exam-l1" className="text-link">すべて見る <ArrowUpRight size={16} /></Link></div>
      <div className="collection-layout"><div className="collection-image"><img src="/manus-storage/math-kids-category_b17bf1ac.jpg" alt="問題集と定規が置かれた机" /><span>01 / 03</span></div><div className="collection-list"><Link href="/exam-l1" className="collection-row"><span className="row-number">01</span><span><strong>Exam.L1</strong><small>学校別・年度別の中学受験問題</small></span><ArrowUpRight size={17} /></Link><Link href="/exam-l2" className="collection-row"><span className="row-number">02</span><span><strong>Exam.L2</strong><small>もう一歩深く考える問題</small></span><ArrowUpRight size={17} /></Link><Link href="/new-drill" className="collection-row muted"><span className="row-number">03</span><span><strong>New Drill</strong><small>新しい練習問題を準備中</small></span><ArrowUpRight size={17} /></Link></div></div>
    </section>
    <section className="principles"><div><span className="eyebrow">HOW TO USE</span><h2>問題文を読む。<br />式を書く。<br /><em>理由を読む。</em></h2></div><div className="principle-list"><div><Check size={17} /><p><strong>Problem</strong><br />まずは自分のペースで問題を読みます。</p></div><div><Compass size={17} /><p><strong>Answer</strong><br />答えを確認し、考え方を振り返ります。</p></div><div><Layers3 size={17} /><p><strong>Solution</strong><br />解説から別の見方を見つけます。</p></div></div></section>
  </>;
}
