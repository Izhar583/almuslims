import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Basic Validation
    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // SMTP credentials from environment variables
    const host = process.env.SMTP_HOST || "smtp.gmail.com";
    const port = parseInt(process.env.SMTP_PORT || "587", 10);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASSWORD;
    const receiver = process.env.CONTACT_RECEIVER_EMAIL || "officialalmuslims@gmail.com";

    // If SMTP credentials are not configured, log warning and return error
    if (!user || !pass) {
      console.warn("SMTP settings are missing in environment variables.");
      return NextResponse.json(
        { error: "Mail server configuration is missing. Please configure environment variables." },
        { status: 500 }
      );
    }

    // Create SMTP transporter
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for port 465, false for other ports
      auth: {
        user,
        pass,
      },
    });

    // Elegant HTML formatted email template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Contact Submission - AlMuslims</title>
        <style>
          body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            background-color: #f6f9fc;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
          }
          .wrapper {
            width: 100%;
            background-color: #f6f9fc;
            padding: 40px 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            border: 1px solid #edf2f7;
          }
          .header {
            background-color: #064E3B;
            padding: 30px;
            text-align: center;
          }
          .header h1 {
            color: #ffffff;
            margin: 0;
            font-size: 24px;
            letter-spacing: 1px;
            font-weight: 700;
          }
          .header p {
            color: #D97706;
            margin: 5px 0 0 0;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-weight: 600;
          }
          .content {
            padding: 40px 30px;
          }
          .intro {
            font-size: 16px;
            color: #4a5568;
            line-height: 1.6;
            margin-bottom: 30px;
          }
          .details-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 35px;
          }
          .details-table td {
            padding: 12px 0;
            border-bottom: 1px solid #edf2f7;
            font-size: 14px;
          }
          .label {
            color: #718096;
            font-weight: 600;
            width: 30%;
          }
          .value {
            color: #2d3748;
          }
          .message-box {
            background-color: #f7fafc;
            border-left: 4px solid #D97706;
            padding: 20px;
            border-radius: 0 12px 12px 0;
            margin-top: 20px;
          }
          .message-title {
            font-size: 13px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: #718096;
            margin-bottom: 8px;
            font-weight: 700;
          }
          .message-body {
            font-size: 15px;
            color: #2d3748;
            line-height: 1.6;
            white-space: pre-wrap;
          }
          .footer {
            background-color: #fafbfd;
            padding: 20px 30px;
            text-align: center;
            border-top: 1px solid #edf2f7;
            font-size: 12px;
            color: #a0aec0;
          }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="container">
            <div class="header">
              <h1>AlMuslims</h1>
              <p>New Contact Form Inquiry</p>
            </div>
            <div class="content">
              <p class="intro">Assalamu Alaikum Admin,</p>
              <p class="intro">You have received a new contact message from AlMuslims.com. Here are the details:</p>
              
              <table class="details-table">
                <tr>
                  <td class="label">Name</td>
                  <td class="value"><strong>${name}</strong></td>
                </tr>
                <tr>
                  <td class="label">Email Address</td>
                  <td class="value"><a href="mailto:${email}" style="color: #064E3B; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td class="label">Phone</td>
                  <td class="value">${phone}</td>
                </tr>
                <tr>
                  <td class="label">Subject</td>
                  <td class="value"><strong>${subject}</strong></td>
                </tr>
              </table>

              <div class="message-box">
                <div class="message-title">Message Details</div>
                <div class="message-body">${message}</div>
              </div>
            </div>
            <div class="footer">
              <p>This email was automatically generated from the contact form at AlMuslims.com.</p>
              <p>&copy; ${new Date().getFullYear()} AlMuslims. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Mail options
    const mailOptions = {
      from: `"AlMuslims Contact Form" <${user}>`,
      to: receiver,
      replyTo: email,
      subject: `[AlMuslims Contact] ${subject} - ${name}`,
      text: `Assalamu Alaikum,\n\nYou have received a new message from AlMuslims contact form:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: htmlContent,
    };

    // Send the mail
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error("Error in contact API route:", error);
    return NextResponse.json(
      { error: "Failed to send email. Check mail server logs." },
      { status: 500 }
    );
  }
}
