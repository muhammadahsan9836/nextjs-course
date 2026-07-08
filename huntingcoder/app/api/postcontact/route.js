import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // 1. Use the writable '/tmp' folder on Vercel
    const folderPath = path.join("/tmp", "contactdata");
    
    // 2. Create folder if it doesn't exist
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    // 3. Write the file
    const fileName = `${Date.now()}.json`;
    const filePath = path.join(folderPath, fileName);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ message: "Contact saved successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error saving contact:", error);
    // 4. Send a clean error message
    return NextResponse.json({ message: "Error saving contact data" }, { status: 500 });
  }
}