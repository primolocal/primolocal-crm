import Link from "next/link";
import { Navigation } from "../components/navigation";
import { Footer } from "../components/sections/footer";

const POSTS = [
  {
    slug: "how-missed-calls-cost-hvac-contractors-47k",
    title: "How Missed Calls Cost HVAC Contractors $47K/Year",
    date: "April 23, 2026",
    excerpt:
      "We called 50 Houston HVAC companies after hours. 42 went to voicemail. Here's what that costs — and how to fix it.",
  },
  {
    slug: "14-day-prove-it-why-we-dont-do-monthly",
    title: "The 14-Day Prove-It: Why We Don't Do Monthly Plans",
    date: "April 20, 2026",
    excerpt:
      "Annual-only isn't a cash grab. It's because Novo is built specifically for your business — your zip codes, your pricing, your calendar.",
  },
  {
    slug: "founders-plan-why-only-5-spots",
    title: "Founders Plan: Why Only 5 Spots?",
    date: "April 15, 2026",
    excerpt:
      "Tommy reviews every call personally. That doesn't scale. The first 5 get white-glove setup and locked pricing forever.",
  },
];

export default function BlogIndex() {
  return (
    <>
      <Navigation />
      <section className="min-h-screen bg-bg-alt pt-[72px]">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="mb-12">
            <p className="text-sm font-semibold uppercase tracking-[2px] text-action mb-4">
              Blog
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Revenue Recovery Insights
            </h1>
            <p className="text-lg text-text-secondary">
              Real data, real stories, real numbers — for Houston HVAC contractors.
            </p>
          </div>

          <div className="space-y-8">
            {POSTS.map((post) => (
              <article
                key={post.slug}
                className="bg-white border border-border-light rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="text-sm text-text-muted mb-2">{post.date}</p>
                <h2 className="text-xl font-semibold text-text-primary mb-3">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-primary transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="text-text-secondary mb-4">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-primary font-semibold text-sm hover:underline"
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
