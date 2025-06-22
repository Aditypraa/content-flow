import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import UserNavbar from "@/components/shared/UserNavbar";
import Footer from "@/components/shared/Footer";

export default function ArticlesUserPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Header Section */}
            <div className="bg-blue-600/90 h-[500px] relative overflow-hidden">
                <UserNavbar />
                <div className="max-w-4xl mx-auto px-4 py-12 text-center">
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <div className="text-white text-base font-bold">Blog genzet</div>
                            <h1 className="text-white text-5xl font-medium leading-tight">
                                The Journal : Design Resources,<br />
                                Interviews, and Industry News
                            </h1>
                            <p className="text-white text-2xl">Your daily dose of design insights!</p>
                        </div>
                        <div className="flex gap-2 justify-center items-center">
                            <Select>
                                <SelectTrigger className="w-[200px] bg-white">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="design">Design</SelectItem>
                                    <SelectItem value="development">Development</SelectItem>
                                    <SelectItem value="technology">Technology</SelectItem>
                                    <SelectItem value="career">Career</SelectItem>
                                    <SelectItem value="tutorial">Tutorial</SelectItem>
                                    <SelectItem value="news">News</SelectItem>
                                </SelectContent>
                            </Select>
                            <Input
                                placeholder="Search articles..."
                                className="w-96 bg-white"
                                type="search"
                                aria-label="Search articles"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Articles Grid */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Article Card 1 */}
                    <Card className="overflow-hidden">
                        <div className="h-48 bg-gray-200"></div>
                        <div className="p-6">
                            <div className="text-sm text-blue-600 mb-2">Design</div>
                            <h3 className="text-xl font-semibold mb-2">10 UI Design Trends for 2024</h3>
                            <p className="text-gray-600 mb-4">Explore the latest design trends that will shape user interfaces in 2024...</p>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">Jan 15, 2024</span>
                                <Button variant="ghost" size="sm">Read More</Button>
                            </div>
                        </div>
                    </Card>

                    {/* Article Card 2 */}
                    <Card className="overflow-hidden">
                        <div className="h-48 bg-gray-200"></div>
                        <div className="p-6">
                            <div className="text-sm text-green-600 mb-2">Development</div>
                            <h3 className="text-xl font-semibold mb-2">React Best Practices 2024</h3>
                            <p className="text-gray-600 mb-4">Learn the latest React patterns and best practices for modern web development...</p>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">Jan 12, 2024</span>
                                <Button variant="ghost" size="sm">Read More</Button>
                            </div>
                        </div>
                    </Card>

                    {/* Article Card 3 */}
                    <Card className="overflow-hidden">
                        <div className="h-48 bg-gray-200"></div>
                        <div className="p-6">
                            <div className="text-sm text-purple-600 mb-2">Technology</div>
                            <h3 className="text-xl font-semibold mb-2">AI in Web Development</h3>
                            <p className="text-gray-600 mb-4">How artificial intelligence is transforming the way we build websites...</p>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">Jan 10, 2024</span>
                                <Button variant="ghost" size="sm">Read More</Button>
                            </div>
                        </div>
                    </Card>

                    {/* Article Card 4 */}
                    <Card className="overflow-hidden">
                        <div className="h-48 bg-gray-200"></div>
                        <div className="p-6">
                            <div className="text-sm text-red-600 mb-2">Career</div>
                            <h3 className="text-xl font-semibold mb-2">Interview Tips for Developers</h3>
                            <p className="text-gray-600 mb-4">Essential tips to ace your next technical interview...</p>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">Jan 8, 2024</span>
                                <Button variant="ghost" size="sm">Read More</Button>
                            </div>
                        </div>
                    </Card>

                    {/* Article Card 5 */}
                    <Card className="overflow-hidden">
                        <div className="h-48 bg-gray-200"></div>
                        <div className="p-6">
                            <div className="text-sm text-orange-600 mb-2">Tutorial</div>
                            <h3 className="text-xl font-semibold mb-2">Building with Next.js 14</h3>
                            <p className="text-gray-600 mb-4">A comprehensive guide to getting started with Next.js 14...</p>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">Jan 5, 2024</span>
                                <Button variant="ghost" size="sm">Read More</Button>
                            </div>
                        </div>
                    </Card>

                    {/* Article Card 6 */}
                    <Card className="overflow-hidden">
                        <div className="h-48 bg-gray-200"></div>
                        <div className="p-6">
                            <div className="text-sm text-indigo-600 mb-2">News</div>
                            <h3 className="text-xl font-semibold mb-2">Web3 Development Update</h3>
                            <p className="text-gray-600 mb-4">Latest developments in Web3 and blockchain technology...</p>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">Jan 3, 2024</span>
                                <Button variant="ghost" size="sm">Read More</Button>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-12">
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">Previous</Button>
                        <Button variant="outline" size="sm">1</Button>
                        <Button variant="default" size="sm">2</Button>
                        <Button variant="outline" size="sm">3</Button>
                        <Button variant="outline" size="sm">Next</Button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
