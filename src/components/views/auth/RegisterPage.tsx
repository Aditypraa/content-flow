import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-[400px] px-4 py-10 bg-white rounded-xl inline-flex flex-col justify-center items-center gap-6">
                {/* Logo */}
                <div className="w-[134px] h-6 relative overflow-hidden">
                    <Image
                        src="/LogoBiru.svg"
                        alt="Logo"
                        width={134}
                        height={24}
                        priority
                        className="h-6 w-auto"
                    />
                </div>

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

                    {/* Role Field */}
                    <div className="self-stretch flex flex-col justify-start items-start gap-1">
                        <div className="inline-flex justify-start items-center gap-2">
                            <Label htmlFor="role" className="text-center justify-center text-gray-900 text-sm font-medium font-['Archivo'] leading-tight">
                                Role
                            </Label>
                        </div>
                        <Select>
                            <SelectTrigger className="self-stretch h-10 px-3 py-2 bg-white rounded-md border border-slate-200">
                                <SelectValue placeholder="Select Role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="user">User</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Register Button */}
                <Button className="self-stretch h-10 px-4 py-2 bg-blue-600 rounded-md inline-flex justify-center items-center gap-1.5 hover:bg-blue-700">
                    <span className="text-center justify-center text-slate-50 text-sm font-medium font-['Archivo'] leading-tight">
                        Register
                    </span>
                </Button>

                {/* Login Link */}
                <div className="justify-center">
                    <span className="text-slate-600 text-sm font-normal font-['Archivo'] leading-tight">
                        Already have an account?{" "}
                    </span>
                    <Link
                        href="/auth/login"
                        className="text-blue-600 text-sm font-normal font-['Archivo'] underline leading-tight hover:text-blue-700"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
