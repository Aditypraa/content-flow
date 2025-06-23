import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Footer from "@/components/common/navigation/Footer";
import UserNavbar from "@/components/common/navigation/UserNavbar";

export default function DetailArticle() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="border-b border-slate-200">
                <UserNavbar showAuthButtons={true} />
            </div>

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
                    <div className="prose prose-lg max-w-none">
                        <div className="space-y-6">
                            <p className="text-gray-700 leading-relaxed">
                                <strong>🧠 Final Thoughts</strong><br />
                                Figma&apos;s Dev Mode represents a significant step forward in bridging the gap between design and development.
                                By providing developers with better tools and more detailed information, Figma is helping to streamline
                                the entire product development process.
                            </p>

                            <p className="text-gray-700 leading-relaxed">
                                As teams continue to work more collaboratively and efficiently, tools like Dev Mode will become increasingly
                                important. The ability to seamlessly transition from design to code not only saves time but also helps ensure
                                that the final product matches the original design vision.
                            </p>

                            <p className="text-gray-700 leading-relaxed">
                                Whether you&apos;re a designer looking to better collaborate with developers or a developer seeking more
                                accurate design specifications, Figma&apos;s Dev Mode is definitely worth exploring.
                            </p>
                        </div>
                    </div>

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

            <Footer className="mt-16" />
        </div>
    );
}
