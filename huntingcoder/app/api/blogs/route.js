import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  const folderPath = path.join(process.cwd(), "blogdata");
  const filenames = fs.readdirSync(folderPath);

  // This adds a 'slug' property based on the filename!
  const allBlogs = filenames.map((filename) => {
    const filePath = path.join(folderPath, filename);
    const data = fs.readFileSync(filePath, "utf8");
    const blogData = JSON.parse(data);
    return { 
      ...blogData, 
      slug: filename.replace('.json', '') // This is the magic fix!
    };
  });

  return NextResponse.json(allBlogs);
}