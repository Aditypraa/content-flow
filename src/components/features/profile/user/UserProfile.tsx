import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/common/navigation/Footer";
import UserNavbar from "@/components/common/navigation/UserNavbar";

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
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile Information</CardTitle>
                            <CardDescription>Update your personal details and profile settings</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center space-x-6">
                                <Avatar className="w-24 h-24">
                                    <AvatarImage src="" alt="Profile picture" />
                                    <AvatarFallback className="text-2xl font-semibold bg-gray-200 text-gray-600">
                                        JD
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h2 className="text-2xl font-semibold text-gray-900">John Doe</h2>
                                    <p className="text-gray-600">john.doe@example.com</p>
                                    <Button variant="outline" size="sm" className="mt-2">Change Avatar</Button>
                                </div>
                            </div>

                            <Separator />

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input
                                            id="firstName"
                                            name="firstName"
                                            defaultValue="John"
                                            aria-describedby="firstName-description"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input
                                            id="lastName"
                                            name="lastName"
                                            defaultValue="Doe"
                                            aria-describedby="lastName-description"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            defaultValue="john.doe@example.com"
                                            aria-describedby="email-description"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            defaultValue="+1 234 567 890"
                                            aria-describedby="phone-description"
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="bio">Bio</Label>
                                        <Textarea
                                            id="bio"
                                            name="bio"
                                            rows={4}
                                            defaultValue="A passionate writer and technology enthusiast with a love for sharing knowledge through articles and tutorials."
                                            aria-describedby="bio-description"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <Button type="submit">Save Changes</Button>
                                    <Button type="button" variant="outline">Cancel</Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Account Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Account Settings</CardTitle>
                            <CardDescription>Manage your account preferences and privacy settings</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="email-notifications" className="text-base font-medium">
                                        Email Notifications
                                    </Label>
                                    <p className="text-sm text-gray-600">
                                        Receive notifications about new articles and updates
                                    </p>
                                </div>
                                <Switch
                                    id="email-notifications"
                                    defaultChecked
                                    aria-describedby="email-notifications-description"
                                />
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="newsletter-subscription" className="text-base font-medium">
                                        Newsletter Subscription
                                    </Label>
                                    <p className="text-sm text-gray-600">
                                        Get weekly newsletter with latest articles
                                    </p>
                                </div>
                                <Switch
                                    id="newsletter-subscription"
                                    defaultChecked
                                    aria-describedby="newsletter-description"
                                />
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor="public-profile" className="text-base font-medium">
                                        Public Profile
                                    </Label>
                                    <p className="text-sm text-gray-600">
                                        Make your profile visible to other users
                                    </p>
                                </div>
                                <Switch
                                    id="public-profile"
                                    aria-describedby="public-profile-description"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Security */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Security Settings</CardTitle>
                            <CardDescription>Manage your account security and authentication settings</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <h4 className="text-base font-medium">Change Password</h4>
                                    <p className="text-sm text-gray-600">Update your account password</p>
                                </div>
                                <Button variant="outline">Change Password</Button>
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <h4 className="text-base font-medium">Two-Factor Authentication</h4>
                                    <p className="text-sm text-gray-600">Add an extra layer of security</p>
                                </div>
                                <Button variant="outline">Enable 2FA</Button>
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <h4 className="text-base font-medium">Delete Account</h4>
                                    <p className="text-sm text-gray-600">Permanently delete your account and data</p>
                                </div>
                                <Button variant="destructive">Delete Account</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Footer />
        </div>
    );
}
