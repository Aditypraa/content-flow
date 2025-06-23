import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import ArticleContent from '@/components/layouts/ArticleContentLayout';

export default function PreviewArticle() {
  // Contoh content yang dihasilkan dari TipTap editor (sama seperti user page)
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-200 px-4 sm:px-8 lg:px-[60px] py-6 lg:py-8 flex justify-between items-center">
        <Image
          src="/Logo.svg"
          alt="Logo"
          width={134}
          height={24}
          priority
          className="h-5 lg:h-6 w-auto"
        />
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 lg:w-8 lg:h-8 bg-blue-200 rounded-full flex items-center justify-center">
            <span className="text-blue-900 text-sm lg:text-base font-medium">
              J
            </span>
          </div>
          <Link
            href="/admin/profile"
            className="text-slate-900 text-sm lg:text-base font-medium underline"
          >
            James Dean
          </Link>
        </div>
      </header>

      {/* Article Content */}
      <main className="px-4 sm:px-8 lg:px-20 xl:px-40 py-6 lg:py-10">
        <article className="max-w-4xl mx-auto">
          {/* Article Header */}
          <div className="text-center mb-6 lg:mb-10">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-1 text-sm text-slate-600 mb-3 lg:mb-4">
              <span>February 4, 2025</span>
              <span className="hidden sm:inline">•</span>
              <span>Created by Admin</span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-slate-900 leading-tight lg:leading-9 mb-3 lg:mb-4 px-2">
              Figma&apos;s New Dev Mode: A Game-Changer for Designers &
              Developers
            </h1>
            <Badge variant="outline">Technology</Badge>
          </div>

          {/* Featured Image */}
          <div className="mb-6 lg:mb-10">
            <Image
              src="https://placehold.co/1120x480"
              alt="Figma Dev Mode article featured image"
              width={1120}
              height={480}
              className="w-full h-[240px] sm:h-[320px] lg:h-[480px] object-cover rounded-lg lg:rounded-xl"
            />
          </div>

          {/* Article Body */}
          <ArticleContent
            content={articleContent}
            className="prose prose-slate max-w-none text-sm sm:text-base"
          />
        </article>
      </main>

      {/* Related Articles */}
      <section className="px-4 sm:px-8 lg:px-20 xl:px-[180px] pt-6 lg:pt-10 pb-12 lg:pb-[100px]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-lg lg:text-xl font-bold text-slate-900 mb-4 lg:mb-6">
            Other articles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Image
                  src={`https://placehold.co/333x240?text=Article+${i}`}
                  alt={`Related article ${i}`}
                  width={333}
                  height={240}
                  className="w-full h-48 lg:h-60 object-cover"
                />
                <CardContent className="p-3 lg:p-4">
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                    <span>February {i}, 2025</span>
                    <span>•</span>
                    <span>5 min read</span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-2">
                    Related Article Title {i}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    This is a brief description of the related article that
                    provides context about its content.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
