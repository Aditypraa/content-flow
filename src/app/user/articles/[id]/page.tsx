import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import UserLayout from "@/components/layouts/UserLayout";
import ArticleContent from "@/components/layouts/ArticleContentLayout";

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
        <UserLayout
            backgroundColor="white"
            showNavbarBorder={true}
            navbarProps={{ showAuthButtons: true }}
            footerClassName="mt-16"
        >

            {/* Article Content */}
            <div className="max-w-4xl mx-auto px-4 py-12">
                <article className="space-y-8">
                    {/* Article Meta */}
                    <div className="text-center space-y-4">
                        <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">Technology</span>
                            <span>Published on Jan 15, 2024</span>
                            <span>By John Doe</span>
                        </div>

                        {/* Article Title */}
                        <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                            Figma&apos;s New Dev Mode: A Game-Changer for Designers & Developers
                        </h1>
                    </div>

                    {/* Article Image */}
                    <div className="w-full h-96 bg-gray-200 rounded-xl overflow-hidden">
                        <Image
                            src="https://placehold.co/1120x480"
                            alt="Figma Dev Mode Article"
                            width={1120}
                            height={480}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Article Body */}
                    <ArticleContent
                        content={articleContent}
                        className="space-y-6"
                    />

                    {/* Related Articles */}
                    <div className="border-t pt-8 mt-12">
                        <h2 className="text-2xl font-semibold mb-6">Related Articles</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Related Article 1 */}
                            <Card className="overflow-hidden">
                                <div className="h-48 bg-gray-200">
                                    <Image
                                        src="https://placehold.co/333x240"
                                        alt="Related article"
                                        width={333}
                                        height={240}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold mb-2">UI Design Best Practices</h3>
                                    <p className="text-sm text-gray-600 mb-3">Essential principles for creating beautiful user interfaces...</p>
                                    <Button variant="ghost" size="sm" className="p-0 h-auto">Read More</Button>
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
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold mb-2">Modern CSS Techniques</h3>
                                    <p className="text-sm text-gray-600 mb-3">Explore the latest CSS features and techniques...</p>
                                    <Button variant="ghost" size="sm" className="p-0 h-auto">Read More</Button>
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
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold mb-2">React Performance Tips</h3>
                                    <p className="text-sm text-gray-600 mb-3">Optimize your React applications for better performance...</p>
                                    <Button variant="ghost" size="sm" className="p-0 h-auto">Read More</Button>
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* Back to Articles */}
                    <div className="text-center pt-8">
                        <Button variant="outline">← Back to Articles</Button>
                    </div>
                </article>
            </div>
        </UserLayout>
    );
}
