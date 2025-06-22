import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AdminLayout from "@/components/layouts/AdminLayout";

const UserProfile = () => {
    return (
        <AdminLayout activeMenu="profile" title="User Profile">
            <div className="px-6 pt-6 flex justify-center">
                <div className="max-w-2xl w-full">
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex flex-col items-center gap-6">
                            {/* Profile Avatar */}
                            <div className="w-[68px] h-[68px] bg-blue-200 rounded-full flex items-center justify-center">
                                <span className="text-blue-900 text-2xl font-medium">J</span>
                            </div>

                            {/* Profile Form */}
                            <div className="w-full flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="username" className="text-gray-900 font-semibold">
                                        Username
                                    </Label>
                                    <Input
                                        id="username"
                                        type="text"
                                        value="James Dean"
                                        readOnly
                                        className="bg-gray-100"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="password" className="text-gray-900 font-semibold">
                                        Password
                                    </Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value="Admin123"
                                        readOnly
                                        className="bg-gray-100"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="role" className="text-gray-900 font-semibold">
                                        Role
                                    </Label>
                                    <Input
                                        id="role"
                                        type="text"
                                        value="Admin"
                                        readOnly
                                        className="bg-gray-100"
                                    />
                                </div>
                            </div>

                            <Button className="w-full h-10 bg-blue-600 hover:bg-blue-700">
                                Back to dashboard
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default UserProfile;
