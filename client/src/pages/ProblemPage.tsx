/**
 * Design philosophy: Study Desk Editorial — problem content is set like a printed workbook,
 * with clear Problem, Answer, and Solution labels and an unobtrusive study navigation rhythm.
 */
import { Link, useLocation, useRoute } from "wouter";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { useState } from "react";

const sampleProblems = [
  { title: "Problem 1", body: "(1) Calculation\n2/3 − (5/6 − 4/9) ÷ 7/3 =\n\n(2) Calculation\n1.12 × 3.2 + 1.12 × 2.7 − 1.12 × 0.9 =\n\n(3) Find X\n15 − {37 − 4 × (9 − X)} = 6\n\n(4) Find A, B and C\n47/18 hours = A hours, B minutes and C seconds", answer: "(1) 1/2　 (2) 5.6　 (3) X = 2　 (4) A = 2, B = 36, C = 40", solution: "式の順序を一つずつ確認し、分数・小数・時間の単位をそれぞれそろえて計算します。" },
  { title: "Problem 2", body: "(1) The ratio of 3 integers is 2 : 3 : 4 and the least common multiple is 144. Find the sum of these 3 integers.\n\n(2) I bought the same number of sheets of 50 yen stamps and 80 yen stamps. The difference of the total prices was 540 yen. How many sheets did I buy altogether?\n\n(3) It is 770 yen for 3 apples and 2 peaches. It is 1950 yen for 5 apples and 6 peaches. How much is it for 1 apple and 1 peach?\n\n(4) Hanako finished 72% of a workbook. If she solves 4 more problems, she would finish 80%. How many problems are there in all?", answer: "(1) 108　 (2) 36 sheets　 (3) 340 yen　 (4) 50 problems", solution: "3つの整数を 2A・3A・4A と置くと、最小公倍数は 12A です。144 ÷ 12 = 12 なので、合計は 2×12 + 3×12 + 4×12 = 108 になります。" },
  { title: "Problem 3", body: "The following sequence is lined in accordance with certain rules.\n\n(1) Find the fourth number from the left of the seventh step.\n(2) Find the second number from the right of the twelfth step.\n(3) Find the sum total of numbers of the twelfth step.", answer: "(1) 20　 (2) 11　 (3) 2048", solution: "第7段の左から4番目は20です。右から2番目は段数から1を引いた数になるため、12 − 1 = 11。各段の合計は 2 を段数−1回掛けた値として考えられます。" },
];

function Collapsible({ label, children, openDefault = true }: { label: string; children: React.ReactNode; openDefault?: boolean }) {
  const [open, setOpen] = useState(openDefault);
  return <section className={`answer-block ${open ? "is-open" : ""}`}>
    <button className="answer-toggle" onClick={() => setOpen(!open)}><span>{label}</span>{open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</button>
    {open && <div className="answer-content">{children}</div>}
  </section>;
}

export default function ProblemPage() {
  const [, params] = useRoute("/exam-l1/:slug");
  const [location] = useLocation();
  const slug = params?.slug;
  const title = slug ? slug.replaceAll("-", " ").toUpperCase() : location === "/exam-l2" ? "EXAM.L2" : location === "/new-drill" ? "NEW DRILL" : "EXAM.L1";
  const isIndex = !slug && (location === "/exam-l1" || location === "/exam-l2" || location === "/new-drill");
  if (isIndex) return <section className="listing-page">
    <div className="section-kicker">THE COLLECTION <span>03</span></div>
    <h1>{title}<span className="title-mark">/</span></h1>
    <p className="lede">Problems arranged by school and year. Choose a problem, write the equation, and read the reason for the answer.</p>
    <div className="listing-grid">{["ATOMIGAKUEN-2014", "JISSENJOSHIGAKUEN-2014", "SEIJO-2014", "OTSUMA-2014", "RIKKYONIIZA-2008", "TOHO-2014"].map((item, i) => <Link key={item} href={`/exam-l1/${item.toLowerCase()}`} className="listing-item"><span className="item-number">{String(i + 1).padStart(2, "0")}</span><span><strong>{item}</strong><small>Problems & solutions</small></span><ExternalLink size={16} /></Link>)}</div>
  </section>;
  return <article className="problem-page">
    <div className="problem-meta"><span className="red-stamp">EXAM.L1</span><span>Junior high school entrance examination problems</span></div>
    <h1>{title}<span className="title-mark">/</span></h1>
    <p className="article-intro">Problems, answers, and solutions are arranged so that you can read them as one continuous study page.</p>
    <div className="problem-stack">{sampleProblems.map(problem => <section className="problem-card" key={problem.title}>
      <div className="problem-heading"><span className="problem-index">{problem.title.replace("Problem ", "")}</span><h2>{problem.title}</h2></div>
      <div className="problem-body">{problem.body.split("\n").map((line, i) => line ? <p key={i}>{line}</p> : <div className="line-gap" key={i} />)}</div>
      <Collapsible label="Answer"><p className="answer-text">{problem.answer}</p></Collapsible>
      <Collapsible label="Solution" openDefault={false}><p>{problem.solution}</p></Collapsible>
    </section>)}</div>
  </article>;
}
