import Link from "next/link";
import fs from "fs";
import path from "path";

export default async function BlogDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let title = "How to learn Javascript in 2026";
  let displayContent = (
    <p className="text-lg text-zinc-400 leading-relaxed">
      This is the full article page. The slug for this page is: <span className="text-blue-500">"{slug}"</span>
      <br /><br />
      Here is where you would write the entire 2000-word blog post!
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, facilis rerum vel illo delectus dolorum perferendis nobis aut natus non enim autem beatae!
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis numquam odio nisi accusamus laborum architecto blanditiis minus necessitatibus itaque. Ipsa deserunt explicabo, atque veritatis ratione ut ab aperiam soluta repellendus!
    </p>
  );

  try {
    // ✅ CORRECT PATH: Look inside the 'public' folder!
    const filePath = path.join(process.cwd(), "public", "blogdata", `${slug}.json`);
    const data = fs.readFileSync(filePath, "utf8");
    const blogData = JSON.parse(data);

    title = blogData.title;
    if (blogData.content) {
      displayContent = (
        <div
          className="text-lg leading-relaxed text-zinc-400"
          dangerouslySetInnerHTML={{ __html: blogData.content }}
        />
      );
    }
  } catch (error) {
    // Keeps your fallback safe
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-black px-8 py-16 text-white">
      <main className="w-full max-w-3xl">
        <h1 className="text-4xl font-bold mb-6">{title}</h1>
        <div className="w-full">{displayContent}</div>
        <Link href="/blogpost" className="mt-8 inline-block text-blue-500 hover:underline font-medium">
          &larr; Back to Blogs
        </Link>
      </main>
    </div>
  );
}