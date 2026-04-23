import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, email, phone, trucks, revenue, missed, pain } = body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tommy@primolocal.org",
        pass: "qjkw aqgq bzkq ojyz",
      },
    });

    const mailOptions = {
      from: "tommy@primolocal.org",
      to: "tommy@primolocal.org",
      subject: `New Revenue Recovery Application — ${company}`,
      text: `
Name: ${name}
Company: ${company}
Email: ${email}
Phone: ${phone}
Trucks: ${trucks}
Revenue: ${revenue}
Missed calls/week: ${missed}

Biggest pain point:
${pain}
      `.trim(),
      html: `
        <h2>New Revenue Recovery Application</h2>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Company:</strong> ${company}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Phone:</strong> ${phone}</li>
          <li><strong>Trucks:</strong> ${trucks}</li>
          <li><strong>Revenue:</strong> ${revenue}</li>
          <li><strong>Missed calls/week:</strong> ${missed}</li>
        </ul>
        <p><strong>Biggest pain point:</strong></p>
        <p>${pain.replace(/\n/g, "<br/>")}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Apply email error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}
