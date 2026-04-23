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
      missedCalls,
      avgJobValue,
      voicemailResult,
      timeline,
      fitScore,
    } = data;

    // Determine quality
    let qualityEmoji = "⚪";
    let qualityLabel = "Review";
    if (fitScore >= 6) {
      qualityEmoji = "🟢";
      qualityLabel = "High Pain";
    } else if (fitScore <= 2) {
      qualityEmoji = "🔴";
      qualityLabel = "Low Pain";
    }

    const missedCallsLabels: Record<string, string> = {
      "0-5": "0-5",
      "6-15": "6-15",
      "16-30": "16-30",
      "30-plus": "30+",
      "dont-know": "Doesn't know",
    };

    const avgJobLabels: Record<string, string> = {
      "under-500": "Under $500",
      "500-1k": "$500 - $1,000",
      "1k-3k": "$1,000 - $3,000",
      "3k-plus": "$3,000+",
    };

    const voicemailLabels: Record<string, string> = {
      "hang-up": "Most hang up",
      "leave-message": "Some leave message",
      "dont-know": "Doesn't know",
    };

    const timelineLabels: Record<string, string> = {
      asap: "ASAP",
      "this-month": "This month",
      "next-month": "Next month",
      "just-looking": "Just looking",
    };

    // Send Discord notification
    const discordMessage = {
      content: `${qualityEmoji} **${qualityLabel} Lead** | Score: ${fitScore}/7`,
      embeds: [{
        title: `${businessName}`,
        description: "New Application",
        color: fitScore >= 6 ? 0x00ff00 : fitScore <= 2 ? 0xff0000 : 0xffa500,
        fields: [
          { name: "Owner", value: ownerName, inline: true },
          { name: "Email", value: email, inline: true },
          { name: "Phone", value: phone, inline: true },
          { name: "Missed Calls", value: missedCallsLabels[missedCalls] || missedCalls, inline: true },
          { name: "Avg Ticket", value: avgJobLabels[avgJobValue] || avgJobValue, inline: true },
          { name: "Voicemail", value: voicemailLabels[voicemailResult] || voicemailResult, inline: true },
          { name: "Timeline", value: timelineLabels[timeline] || timeline, inline: false },
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
        <h2>New Lead — ${qualityLabel} (${fitScore}/7)</h2>
        <p><strong>Business:</strong> ${businessName}</p>
        <p><strong>Owner:</strong> ${ownerName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <hr/>
        <p><strong>Missed Calls/Week:</strong> ${missedCallsLabels[missedCalls] || missedCalls}</p>
        <p><strong>Avg Ticket:</strong> ${avgJobLabels[avgJobValue] || avgJobValue}</p>
        <p><strong>Voicemail Result:</strong> ${voicemailLabels[voicemailResult] || voicemailResult}</p>
        <p><strong>Timeline:</strong> ${timelineLabels[timeline] || timeline}</p>
        <hr/>
        <p><a href="mailto:${email}?subject=Re: Your Missed Call Numbers — ${businessName}">Reply to lead</a></p>
      `;

      await transporter.sendMail({
        from: `"PrimoLocal Leads" <${SMTP_USER}>`,
        to: NOTIFY_EMAIL,
        subject: `[${qualityLabel}] ${businessName} — New Lead`,
        html: emailHtml,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Application webhook error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
