import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL || "";

// Email config from env vars
const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "587");
const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASS = process.env.SMTP_PASS || "";
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "tommy@primolocal.org";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const {
      businessName,
      ownerName,
      email,
      phone,
      revenue,
      receptionist,
      missedCalls,
      bottleneck,
      commitment,
      whyPartner,
      fitScore,
    } = data;

    // Determine quality
    let qualityEmoji = "⚪";
    let qualityLabel = "Review";
    if (fitScore >= 8) {
      qualityEmoji = "🟢";
      qualityLabel = "High Quality";
    } else if (fitScore <= 4) {
      qualityEmoji = "🔴";
      qualityLabel = "Low Quality";
    }

    const revenueLabels: Record<string, string> = {
      "under-250k": "Under $250K",
      "250k-500k": "$250K - $500K",
      "500k-1m": "$500K - $1M",
      "1m-2m": "$1M - $2M",
      "2m-plus": "$2M+",
    };

    const missedCallsLabels: Record<string, string> = {
      "0-5": "0-5",
      "6-15": "6-15",
      "16-30": "16-30",
      "30-plus": "30+",
      "dont-know": "Don't track",
    };

    const commitmentLabels: Record<string, string> = {
      "yes-committed": "Yes, committed",
      "need-more-info": "Need more info",
      "not-sure": "Not sure",
    };

    // Send Discord notification
    const discordMessage = {
      content: `${qualityEmoji} **${qualityLabel} Application** | Score: ${fitScore}/10`,
      embeds: [{
        title: `${businessName}`,
        description: "New Co-Founder Program Application",
        color: fitScore >= 8 ? 0x00ff00 : fitScore <= 4 ? 0xff0000 : 0xffa500,
        fields: [
          { name: "Owner", value: ownerName, inline: true },
          { name: "Email", value: email, inline: true },
          { name: "Phone", value: phone, inline: true },
          { name: "Revenue", value: revenueLabels[revenue] || revenue, inline: true },
          { name: "Current Setup", value: receptionist.replace(/-/g, " "), inline: true },
          { name: "Missed Calls", value: missedCallsLabels[missedCalls] || missedCalls, inline: true },
          { name: "Commitment", value: commitmentLabels[commitment] || commitment, inline: false },
          { name: "Bottleneck", value: bottleneck.substring(0, 500), inline: false },
          { name: "Why Partner", value: whyPartner.substring(0, 500), inline: false },
        ],
        timestamp: new Date().toISOString(),
      }],
    };

    if (DISCORD_WEBHOOK_URL) {
      await fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(discordMessage),
      });
    }

    // Send email notification
    if (SMTP_USER && SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      });

      const emailHtml = `
        <h2>New Co-Founder Application — ${qualityLabel} (${fitScore}/10)</h2>
        <p><strong>Business:</strong> ${businessName}</p>
        <p><strong>Owner:</strong> ${ownerName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Revenue:</strong> ${revenueLabels[revenue] || revenue}</p>
        <p><strong>Current Setup:</strong> ${receptionist.replace(/-/g, " ")}</p>
        <p><strong>Missed Calls:</strong> ${missedCallsLabels[missedCalls] || missedCalls}</p>
        <p><strong>Commitment:</strong> ${commitmentLabels[commitment] || commitment}</p>
        <hr/>
        <p><strong>Bottleneck:</strong></p>
        <p>${bottleneck.replace(/\n/g, "<br/>")}</p>
        <hr/>
        <p><strong>Why Partner:</strong></p>
        <p>${whyPartner.replace(/\n/g, "<br/>")}</p>
        <hr/>
        <p><a href="mailto:${email}?subject=Re: Co-Founder Application — ${businessName}">Reply to applicant</a></p>
      `;

      await transporter.sendMail({
        from: `"PrimoLocal Applications" <${SMTP_USER}>`,
        to: NOTIFY_EMAIL,
        subject: `[${qualityLabel}] ${businessName} — Co-Founder Application`,
        html: emailHtml,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Application webhook error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
