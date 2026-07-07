import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const data = await req.json();
    const folderPath = path.join(process.cwd(), "contactdata");
    if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);
    const fileName = `${Date.now()}.json`;
    const filePath = path.join(folderPath, fileName);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return NextResponse.json({ message: "Contact saved successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error saving contact data" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json("Its a get Request", { status: 200 });
}