import { NextResponse } from 'next/server';
// import { connectDB } from "@/lib/mongodb"; // DB connection setup
// import Subscriber from "@/models/Subscriber"; // Subscriber model

export async function POST(request: Request) {
  const { email } = await request.json();

  // Basic validation
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  try {
    // await connectDB(); 
    
    // Yahan database logic aayega
    // const exists = await Subscriber.findOne({ email });
    // if (exists) return NextResponse.json({ error: "Already subscribed" }, { status: 409 });
    // await new Subscriber({ email }).save();

    console.log("Subscribed email:", email); // Demo ke liye
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}