"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import AuthLayout from "@/components/layouts/AuthLayout";

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <AuthLayout
            footerText="Don't have an account?"
            footerLinkText="Register"
            footerLinkHref="/auth/register"
        >

            {/* Form Fields */}
            <div className="self-stretch flex flex-col justify-start items-start gap-3">
                {/* Username Field */}
                <div className="self-stretch flex flex-col justify-start items-start gap-1">
                    <div className="inline-flex justify-start items-center gap-2">
                        <Label htmlFor="username" className="text-center justify-center text-gray-900 text-sm font-medium font-['Archivo'] leading-tight">
                            Username
                        </Label>
                    </div>
                    <Input
                        id="username"
                        type="text"
                        placeholder="Input username"
                        className="self-stretch h-10 px-3 py-2 bg-white rounded-md border border-slate-200"
                    />
                </div>

                {/* Password Field */}
                <div className="self-stretch flex flex-col justify-start items-start gap-1">
                    <div className="inline-flex justify-start items-center gap-2">
                        <Label htmlFor="password" className="text-center justify-center text-gray-900 text-sm font-medium font-['Archivo'] leading-tight">
                            Password
                        </Label>
                    </div>
                    <div className="relative self-stretch">
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Input password"
                            className="self-stretch h-10 px-3 py-2 pr-10 bg-white rounded-md border border-slate-200"
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-0 top-0 h-10 w-10 hover:bg-transparent"
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4 text-slate-600 opacity-50" />
                            ) : (
                                <Eye className="h-4 w-4 text-slate-600 opacity-50" />
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Login Button */}
            <Button className="self-stretch h-10 px-4 py-2 bg-blue-600 rounded-md inline-flex justify-center items-center gap-1.5 hover:bg-blue-700">
                <span className="text-center justify-center text-slate-50 text-sm font-medium font-['Archivo'] leading-tight">
                    Login
                </span>
            </Button>
        </AuthLayout>
    );
};

export default LoginPage;