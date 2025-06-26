// app/user/articles/[id]/page.tsx
'use client'; // Pastikan ini tetap ada jika Anda menggunakan hooks atau interaktivitas klien

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
// import UserLayout from '@/components/layouts/UserLayout'; // Hapus import ini
import ArticleContent from '@/components/layouts/ArticleContentLayout';

export default function DetailArticle() {
  // Contoh content yang dihasilkan dari TipTap editor
  const articleContent = `
        <p>In the ever-evolving world of digital product design, collaboration between designers and developers has always been a crucial—yet often challenging—part of the process. In April 2025, <strong>Figma introduced Dev Mode</strong>, a powerful new feature aimed at streamlining that collaboration more than ever before.</p>

        <h2>🔧 What Is Dev Mode?</h2>

        <p>Dev Mode is a new interface within Figma that provides developer-focused tools and removes unnecessary UI clutter that designers typically use. Instead, developers can view ready-to-implement specs, such as <em>spacing</em>, <u>color values</u>, <code>font styles</code>, and asset exports—without disrupting the design file or asking the design team for clarifications.</p>

        <h2>🤝 Bridging the Gap Between Design & Development</h2>

        <p>Traditionally, handing off designs involved back-and-forth communication, misunderstandings, and occasional delays. With Dev Mode, handoff becomes <strong>real-time and seamless</strong>:</p>

        <ul class="tiptap-bullet-list">
            <li><strong>Live Design Specs:</strong> Developers can inspect the design without needing additional tools or extensions.</li>
            <li><strong>Code Snippets:</strong> Automatically generated CSS, iOS (Swift), and Android (XML) code help speed up implementation.</li>
            <li><strong>Version History Access:</strong> Stay aligned with design updates without asking for a new export every time.</li>
            <li><strong>Integrated Comments:</strong> Developers can leave feedback directly in the design file.</li>
        </ul>

        <h2>🚀 Why It Matters</h2>

        <blockquote class="tiptap-blockquote">
            <p>For design teams working in agile environments, the speed of handoff can make or break a sprint. Figma's Dev Mode turns a typically messy phase into a collaborative, real-time experience that reduces errors, shortens build times, and improves the designer-developer relationship.</p>
        </blockquote>

        <h3>Key Benefits Include:</h3>

        <ol class="tiptap-ordered-list">
            <li>Reduced communication overhead</li>
            <li>Faster development cycles</li>
            <li>Higher fidelity implementations</li>
            <li>Better designer-developer relationships</li>
        </ol>

        <p style="text-align: center"><em>The future of design-to-development handoff is here, and it's more seamless than ever.</em></p>

        <h2>🧠 Final Thoughts</h2>

        <p>Whether you're a solo designer working with freelance developers or part of a large product team, Figma's Dev Mode introduces a <strong>smoother, smarter way to collaborate</strong>. It's not just a feature—it's a shift in how digital products are built.</p>

        <p>💬 <s>What do you think of Dev Mode?</s> Have you tried it yet? <a href="https://figma.com">Share your experience</a> in the comments!</p>
    `;
  return (
    // Hapus pembungkus UserLayout di sini
    // <UserLayout
    //   backgroundColor="white"
    //   showNavbarBorder={true}
    //   navbarProps={{ showAuthButtons: true }}
    // >
    <div className="mx-auto max-w-4xl px-4 py-12">
      <article className="space-y-8">
        {/* Article Meta */}
        <div className="space-y-4 text-center">
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-600">
              Technology
            </span>
            <span>Published on Jan 15, 2024</span>
            <span>By John Doe</span>
          </div>

          {/* Article Title */}
          <h1 className="text-4xl leading-tight font-bold text-gray-900">
            Figma&apos;s New Dev Mode: A Game-Changer for Designers & Developers
          </h1>
        </div>

        {/* Article Image */}
        <div className="h-96 w-full overflow-hidden rounded-xl bg-gray-200">
          <Image
            src="https://placehold.co/1120x480"
            alt="Figma Dev Mode Article"
            width={1120}
            height={480}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Article Body */}
        <ArticleContent content={articleContent} className="space-y-6" />

        {/* Related Articles */}
        <div className="mt-12 border-t pt-8">
          <h2 className="mb-6 text-2xl font-semibold">Related Articles</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Related Article 1 */}
            <Card className="overflow-hidden">
              <div className="h-48 bg-gray-200">
                <Image
                  src="https://placehold.co/333x240"
                  alt="Related article"
                  width={333}
                  height={240}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="mb-2 font-semibold">UI Design Best Practices</h3>
                <p className="mb-3 text-sm text-gray-600">
                  Essential principles for creating beautiful user interfaces...
                </p>
                <Button variant="ghost" size="sm" className="h-auto p-0">
                  Read More
                </Button>
              </div>
            </Card>

            {/* Related Article 2 */}
            <Card className="overflow-hidden">
              <div className="h-48 bg-gray-200">
                <Image
                  src="https://placehold.co/333x240"
                  alt="Related article"
                  width={333}
                  height={240}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="mb-2 font-semibold">Modern CSS Techniques</h3>
                <p className="mb-3 text-sm text-gray-600">
                  Explore the latest CSS features and techniques...
                </p>
                <Button variant="ghost" size="sm" className="h-auto p-0">
                  Read More
                </Button>
              </div>
            </Card>

            {/* Related Article 3 */}
            <Card className="overflow-hidden">
              <div className="h-48 bg-gray-200">
                <Image
                  src="https://placehold.co/333x240"
                  alt="Related article"
                  width={333}
                  height={240}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="mb-2 font-semibold">React Performance Tips</h3>
                <p className="mb-3 text-sm text-gray-600">
                  Optimize your React applications for better performance...
                </p>
                <Button variant="ghost" size="sm" className="h-auto p-0">
                  Read More
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Back to Articles */}
        <div className="pt-8 text-center">
          <Button variant="outline">← Back to Articles</Button>
        </div>
      </article>
    </div>
    // Hapus pembungkus UserLayout di sini
    // </UserLayout>
  );
}
