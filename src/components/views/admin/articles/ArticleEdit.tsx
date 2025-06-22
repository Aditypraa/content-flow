import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AdminLayout from '@/components/layouts/AdminLayout';

export default function ArticleEdit() {
    return (
        <AdminLayout activeMenu="articles" title="Articles">
            <div className="px-6 pt-6 flex justify-center">
                <div className="max-w-4xl w-full">
                    <Card>
                        <CardHeader>
                            <CardTitle>Edit Article</CardTitle>
                            <CardDescription>
                                Update the article details below
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Thumbnail */}
                                <div className="space-y-2">
                                    <Label htmlFor="thumbnail">Thumbnail</Label>
                                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
                                        <Image
                                            src="https://placehold.co/300x200"
                                            alt="Article thumbnail"
                                            width={300}
                                            height={200}
                                            className="mx-auto rounded-md"
                                        />
                                        <div className="mt-2 flex gap-2 justify-center">
                                            <Button variant="outline" size="sm">Change</Button>
                                            <Button variant="outline" size="sm" className="text-red-500">Delete</Button>
                                        </div>
                                    </div>
                                </div>

                                {/* Form Fields */}
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="title">Title</Label>
                                        <Input
                                            id="title"
                                            defaultValue="Cybersecurity Essentials Every Developer Should Know"
                                            className="mt-1"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="category">Category</Label>
                                        <Select defaultValue="technology">
                                            <SelectTrigger className="mt-1">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="technology">Technology</SelectItem>
                                                <SelectItem value="design">Design</SelectItem>
                                                <SelectItem value="business">Business</SelectItem>
                                                <SelectItem value="marketing">Marketing</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <p className="text-sm text-gray-500 mt-1">
                                            The existing category list can be seen in the{' '}
                                            <span className="text-blue-600 underline">category</span> menu
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Content Editor */}
                            <div>
                                <Label>Content</Label>
                                <Card className="mt-2">
                                    <CardHeader className="pb-2">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Button variant="ghost" size="sm">Bold</Button>
                                            <Button variant="ghost" size="sm">Italic</Button>
                                            <Button variant="ghost" size="sm">Underline</Button>
                                            <div className="h-4 w-px bg-gray-300" />
                                            <Button variant="ghost" size="sm">H1</Button>
                                            <Button variant="ghost" size="sm">H2</Button>
                                            <Button variant="ghost" size="sm">H3</Button>
                                            <div className="h-4 w-px bg-gray-300" />
                                            <Button variant="ghost" size="sm">Link</Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="min-h-[400px] p-4 text-sm space-y-4">
                                            <p>
                                                In the ever-evolving world of digital product design, collaboration between designers and developers has always been a crucial—yet often challenging—part of the process. In April 2025, Figma introduced Dev Mode, a powerful new feature aimed at streamlining that collaboration more than ever before.
                                            </p>

                                            <div>
                                                <strong>🔧 What Is Dev Mode?</strong><br />
                                                Dev Mode is a new interface within Figma that provides developer-focused tools and removes unnecessary UI clutter that designers typically use. Instead, developers can view ready-to-implement specs, such as spacing, color values, font styles, and asset exports—without disrupting the design file or asking the design team for clarifications.
                                            </div>

                                            <div>
                                                <strong>🤝 Bridging the Gap Between Design & Development</strong><br />
                                                Traditionally, handing off designs involved back-and-forth communication, misunderstandings, and occasional delays. With Dev Mode, handoff becomes real-time and seamless:<br />
                                                • Live Design Specs: Developers can inspect the design without needing additional tools or extensions.<br />
                                                • Code Snippets: Automatically generated CSS, iOS (Swift), and Android (XML) code help speed up implementation.<br />
                                                • Version History Access: Stay aligned with design updates without asking for a new export every time.<br />
                                                • Integrated Comments: Developers can leave feedback directly in the design file.
                                            </div>

                                            <div>
                                                <strong>🚀 Why It Matters</strong><br />
                                                For design teams working in agile environments, the speed of handoff can make or break a sprint. Figma&apos;s Dev Mode turns a typically messy phase into a collaborative, real-time experience that reduces errors, shortens build times, and improves the designer-developer relationship.
                                            </div>

                                            <div>
                                                <strong>🧠 Final Thoughts</strong><br />
                                                Whether you&apos;re a solo designer working with freelance developers or part of a large product team, Figma&apos;s Dev Mode introduces a smoother, smarter way to collaborate. It&apos;s not just a feature—it&apos;s a shift in how digital products are built.
                                            </div>

                                            <p>
                                                💬 What do you think of Dev Mode? Have you tried it yet? Share your experience in the comments!
                                            </p>
                                        </div>
                                        <div className="border-t pt-4 text-xs text-gray-500">
                                            2864 Words
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-2">
                                <Button variant="outline">Cancel</Button>
                                <Button>Save Changes</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}