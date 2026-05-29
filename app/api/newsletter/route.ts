import { NextResponse } from 'next/server';
import { Resend } from 'resend';


const resend = new Resend('re_8Mx7Y9dJ_HARYwmnCiYEjiyPmSq2JT3ZP');

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'izharjoiya0@gmail.com', // Notification yahan aayega
      subject: 'New Subscriber',
      html: `
        <div style="font-family: sans-serif;">
          <h1>New Subscription!</h1>
          <p>A new subscriber has joined:</p>
          <p style="font-size: 18px; font-weight: bold;">${email}</p>
        </div>
      `
    });

    console.log("Email sent successfully:", data);
    return NextResponse.json({ success: true, message: "Email sent!" }, { status: 200 });

  } catch (error) {
    console.error("Error in newsletter API:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}