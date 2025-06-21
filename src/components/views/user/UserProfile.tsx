import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UserNavbar from "@/components/shared/UserNavbar";
import Footer from "@/components/shared/Footer";

export default function UserProfile() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200">
                <UserNavbar isLoggedIn={true} userName="John Doe" />
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="space-y-6">
                    {/* Header */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">User Profile</h1>
                        <p className="text-gray-600 mt-1">Manage your personal information and preferences</p>
                    </div>

                    {/* Profile Information */}
                    <Card className="p-8">
                        <div className="space-y-6">
                            <div className="flex items-center space-x-6">
                                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                                    <span className="text-2xl font-semibold text-gray-600">JD</span>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-semibold text-gray-900">John Doe</h2>
                                    <p className="text-gray-600">john.doe@example.com</p>
                                    <Button variant="outline" size="sm" className="mt-2">Change Avatar</Button>
                                </div>
                            </div>

                            <div className="border-t pt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input id="firstName" defaultValue="John" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input id="lastName" defaultValue="Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" defaultValue="john.doe@example.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input id="phone" defaultValue="+1 234 567 890" />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="bio">Bio</Label>
                                        <textarea
                                            id="bio"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            rows={4}
                                            defaultValue="A passionate writer and technology enthusiast with a love for sharing knowledge through articles and tutorials."
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-6">
                                    <Button>Save Changes</Button>
                                    <Button variant="outline">Cancel</Button>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Account Settings */}
                    <Card className="p-8">
                        <h3 className="text-xl font-semibold mb-6">Account Settings</h3>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-medium">Email Notifications</h4>
                                    <p className="text-sm text-gray-600">Receive notifications about new articles and updates</p>
                                </div>
                                <input type="checkbox" className="w-5 h-5" defaultChecked />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-medium">Newsletter Subscription</h4>
                                    <p className="text-sm text-gray-600">Get weekly newsletter with latest articles</p>
                                </div>
                                <input type="checkbox" className="w-5 h-5" defaultChecked />
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-medium">Public Profile</h4>
                                    <p className="text-sm text-gray-600">Make your profile visible to other users</p>
                                </div>
                                <input type="checkbox" className="w-5 h-5" />
                            </div>
                        </div>
                    </Card>

                    {/* Security */}
                    <Card className="p-8">
                        <h3 className="text-xl font-semibold mb-6">Security</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-medium">Change Password</h4>
                                    <p className="text-sm text-gray-600">Update your account password</p>
                                </div>
                                <Button variant="outline">Change Password</Button>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-medium">Two-Factor Authentication</h4>
                                    <p className="text-sm text-gray-600">Add an extra layer of security</p>
                                </div>
                                <Button variant="outline">Enable 2FA</Button>
                            </div>

                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-medium">Delete Account</h4>
                                    <p className="text-sm text-gray-600">Permanently delete your account and data</p>
                                </div>
                                <Button variant="destructive">Delete Account</Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            <Footer />
        </div>
    );
}
