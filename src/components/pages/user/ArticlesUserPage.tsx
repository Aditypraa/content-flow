import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import UserNavbar from "@/components/common/navigation/UserNavbar";
import Footer from "@/components/common/navigation/Footer";

const articles = [
    {
        id: 1,
        title: "10 UI Design Trends for 2024",
        category: "Design",
        date: "Jan 15, 2024",
        description: "Explore the latest design trends that will shape user interfaces in 2024...",
        imageUrl: "/images/article1.jpg"
    },
    {
        id: 2,
        title: "Building Scalable Web Applications with React",
        category: "Development",
        date: "Feb 10, 2024",
        description: "Learn how to build scalable web applications using React and its ecosystem...",
        imageUrl: "/images/article2.jpg"
    },
    {
        id: 3,
        title: "The Future of AI in Design",
        category: "Technology",
        date: "Mar 5, 2024",
        description: "Discover how AI is transforming the design industry and what it means for designers...",
        imageUrl: "/images/article3.jpg"
    },
    {
        id: 4,
        title: "Career Paths in UX Design",
        category: "Career",
        date: "Apr 20, 2024",
        description: "Explore various career paths in UX design and how to get started...",
        imageUrl: "/images/article4.jpg"
    },
    {
        id: 5,
        title: "Creating Engaging Tutorials for Developers",
        category: "Tutorial",
        date: "May 15, 2024",
        description: "Tips and tricks for creating engaging tutorials that help developers learn effectively...",
        imageUrl: "/images/article5.jpg"
    },
    // Add more articles as needed
];

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
                    {articles.map((article) => (
                        <Card key={article.id} className="overflow-hidden">
                            <div className="h-48 bg-gray-200">
                                <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-6">
                                <div className="text-sm text-blue-600 mb-2">{article.category}</div>
                                <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                                <p className="text-gray-600 mb-4">{article.description}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">{article.date}</span>
                                    <Button variant="ghost" size="sm">Read More</Button>
                                </div>
                            </div>
                        </Card>
                    ))}
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
