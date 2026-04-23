import Link from "next/link";
import { Navigation } from "../../components/navigation";
import { Footer } from "../../components/sections/footer";

interface Post {
  title: string;
  date: string;
  content: React.ReactNode;
}

const POSTS: Record<string, Post> = {
  "how-missed-calls-cost-hvac-contractors-47k": {
    title: "How Missed Calls Cost HVAC Contractors $47K/Year",
    date: "April 23, 2026",
    content: (
      <>
        <p className="mb-4">
          We called 50 Houston HVAC companies at 7:30 PM on a Tuesday. 42 went straight to voicemail. Here's what that means in real dollars.
        </p>
        <h3 className="text-xl font-semibold text-text-primary mt-8 mb-3">The Math</h3>
        <p className="mb-4">
          The average HVAC contractor misses 15–25 calls per week. With a 30% close rate and a $1,200 average ticket, that's $23,400–$39,000 in lost revenue every month. Over a year, it easily exceeds $47,000.
        </p>
        <h3 className="text-xl font-semibold text-text-primary mt-8 mb-3">Why Voicemail Fails</h3>
        <p className="mb-4">
          80% of callers hang up when they reach voicemail. 62% call your competitor within 5 minutes. Your voicemail isn't a safety net — it's a referral service for the other guy.
        </p>
        <h3 className="text-xl font-semibold text-text-primary mt-8 mb-3">The Fix</h3>
        <p className="mb-4">
          A live voice — even an AI one — books appointments while your team is off the clock. Novo answers in under 30 seconds, qualifies the lead, and drops it straight into your calendar.
        </p>
        <p className="mb-4">
          One $3,000 commercial job pays for an entire year of Revenue Recovery. The question isn't whether you can afford it. It's whether you can afford to keep losing calls.
        </p>
      </>
    ),
  },
  "14-day-prove-it-why-we-dont-do-monthly": {
    title: "The 14-Day Prove-It: Why We Don't Do Monthly Plans",
    date: "April 20, 2026",
    content: (
      <>
        <p className="mb-4">
          We get this question a lot: "Can I try Novo for a month?" The answer is no — and here's why that's actually good for you.
        </p>
        <h3 className="text-xl font-semibold text-text-primary mt-8 mb-3">Novo Is Built for You</h3>
        <p className="mb-4">
          Every Novo agent is configured with your zip codes, your pricing, your calendar, and your emergency protocols. That takes real setup work — not a 5-minute onboarding.
        </p>
        <h3 className="text-xl font-semibold text-text-primary mt-8 mb-3">14 Days Is Enough</h3>
        <p className="mb-4">
          Two weeks of real calls is all you need to see your number. How many calls were answered. How many appointments were booked. How much revenue was recovered. No projections. No guesswork.
        </p>
        <h3 className="text-xl font-semibold text-text-primary mt-8 mb-3">The Annual Commitment</h3>
        <p className="mb-4">
          After the Prove-It, you lock in at $10K/year — forever. No price increases. No hidden fees. One $3K job covers the entire year.
        </p>
      </>
    ),
  },
  "founders-plan-why-only-5-spots": {
    title: "Founders Plan: Why Only 5 Spots?",
    date: "April 15, 2026",
    content: (
      <>
        <p className="mb-4">
          PrimoLocal is new. We're not scaling to 1,000 clients this year. We're building the best Revenue Recovery system on the planet for Houston HVAC — and that starts with 5 Founders.
        </p>
        <h3 className="text-xl font-semibold text-text-primary mt-8 mb-3">White-Glove Setup</h3>
        <p className="mb-4">
          Tommy reviews every call personally. Tunes every prompt. Adjusts the emergency thresholds. That doesn't scale — and we don't want it to, yet.
        </p>
        <h3 className="text-xl font-semibold text-text-primary mt-8 mb-3">Locked Pricing</h3>
        <p className="mb-4">
          The 5 Founders get $10K/year locked forever. When we expand to other cities and verticals, the price will go up. Founders never pay more.
        </p>
        <h3 className="text-xl font-semibold text-text-primary mt-8 mb-3">Prove the Model</h3>
        <p className="mb-4">
          We need 5 real Houston HVAC shops running Novo so we can measure real results. Your data shapes the product. Your feedback drives the roadmap.
        </p>
      </>
    ),
  },
};

export function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({ slug }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = POSTS[params.slug];

  if (!post) {
    return (
      <>
        <Navigation />
        <section className="min-h-screen bg-bg-alt pt-[72px]">
          <div className="max-w-3xl mx-auto px-4 py-16">
            <h1 className="text-2xl font-bold text-text-primary mb-4">Post not found</h1>
            <Link href="/blog" className="text-primary hover:underline">← Back to blog</Link>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <section className="min-h-screen bg-bg-alt pt-[72px]">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <div className="mb-8">
            <Link href="/blog" className="text-sm text-text-muted hover:text-text-primary">
              ← Back to blog
            </Link>
          </div>

          <article className="bg-white border border-border-light rounded-xl p-8 lg:p-12 shadow-sm">
            <p className="text-sm text-text-muted mb-3">{post.date}</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-8 leading-tight">
              {post.title}
            </h1>
            <div className="prose prose-slate max-w-none text-text-secondary leading-relaxed">
              {post.content}
            </div>
          </article>
        </div>
      </section>
      <Footer />
    </>
  );
}
