import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export default function PreviewArticle() {
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
                        <span className="text-blue-900 text-sm lg:text-base font-medium">J</span>
                    </div>
                    <Link href="/admin/profile" className="text-slate-900 text-sm lg:text-base font-medium underline">
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
                            Figma&apos;s New Dev Mode: A Game-Changer for Designers & Developers
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
                    <div className="prose prose-slate max-w-none text-sm sm:text-base">
                        <p className="text-slate-700 leading-relaxed mb-4">
                            In the ever-evolving world of digital product design, collaboration between designers and developers has always been a crucial—yet often challenging—part of the process. In April 2025, Figma introduced Dev Mode, a powerful new feature aimed at streamlining that collaboration more than ever before.
                        </p>

                        <div className="mb-4">
                            <h3 className="text-slate-700 text-base lg:text-lg font-bold mb-2">🔧 What Is Dev Mode?</h3>
                            <p className="text-slate-700 leading-relaxed">
                                Dev Mode is a new interface within Figma that provides developer-focused tools and removes unnecessary UI clutter that designers typically use. Instead, developers can view ready-to-implement specs, such as spacing, color values, font styles, and asset exports—without disrupting the design file or asking the design team for clarifications.
                            </p>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-slate-700 text-base lg:text-lg font-bold mb-2">🤝 Bridging the Gap Between Design & Development</h3>
                            <p className="text-slate-700 leading-relaxed mb-2">
                                Traditionally, handing off designs involved back-and-forth communication, misunderstandings, and occasional delays. With Dev Mode, handoff becomes real-time and seamless:
                            </p>
                            <ul className="text-slate-700 leading-relaxed ml-4 space-y-1">
                                <li>Live Design Specs: Developers can inspect the design without needing additional tools or extensions.</li>
                                <li>Code Snippets: Automatically generated CSS, iOS (Swift), and Android (XML) code help speed up implementation.</li>
                                <li>Version History Access: Stay aligned with design updates without asking for a new export every time.</li>
                                <li>Integrated Comments: Developers can leave feedback directly in the design file.</li>
                            </ul>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-slate-700 text-base lg:text-lg font-bold mb-2">🚀 Why It Matters</h3>
                            <p className="text-slate-700 leading-relaxed">
                                For design teams working in agile environments, the speed of handoff can make or break a sprint. Figma&apos;s Dev Mode turns a typically messy phase into a collaborative, real-time experience that reduces errors, shortens build times, and improves the designer-developer relationship.
                            </p>
                        </div>

                        <div className="mb-4">
                            <h3 className="text-slate-700 text-base lg:text-lg font-bold mb-2">🧠 Final Thoughts</h3>
                            <p className="text-slate-700 leading-relaxed">
                                Whether you&apos;re a solo designer working with freelance developers or part of a large product team, Figma&apos;s Dev Mode introduces a smoother, smarter way to collaborate. It&apos;s not just a feature—it&apos;s a shift in how digital products are built.
                            </p>
                        </div>

                        <p className="text-slate-700 leading-relaxed">
                            💬 What do you think of Dev Mode? Have you tried it yet? Share your experience in the comments!
                        </p>
                    </div>
                </article>
            </main>

            {/* Related Articles */}
            <section className="px-4 sm:px-8 lg:px-20 xl:px-[180px] pt-6 lg:pt-10 pb-12 lg:pb-[100px]">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-lg lg:text-xl font-bold text-slate-900 mb-4 lg:mb-6">Other articles</h2>
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
                                        This is a brief description of the related article that provides context about its content.
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