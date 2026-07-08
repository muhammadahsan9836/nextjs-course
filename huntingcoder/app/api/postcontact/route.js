import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const data = await req.json();
    
    // ✅ Write to Vercel's writable '/tmp' directory
    const folderPath = path.join("/tmp", "contactdata");
    
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    const fileName = `${Date.now()}.json`;
    const filePath = path.join(folderPath, fileName);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ message: "Contact saved successfully!" }, { status: 200 });
  } catch (error: any) {
    // 🚨 This will print the actual error into Vercel Function Logs
    console.error("Error saving contact data:", error.message); 
    return NextResponse.json({ message: `Error: ${error.message}` }, { status: 500 });
  }
}