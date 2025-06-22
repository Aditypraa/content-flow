import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const RegisterPage = () => {
    return (
        <div className="w-[400px] px-4 py-10 bg-white rounded-xl flex flex-col justify-center items-center gap-6">
            {/* Logo */}
            <div className="flex justify-center mb-2">
                <Image
                    src="/Logo.svg"
                    alt="Logo"
                    width={134}
                    height={24}
                    priority
                    className="h-6 w-auto"
                />
            </div>

            <div className="w-full flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                    <Label htmlFor="username" className="text-gray-900 text-sm font-medium">
                        Username
                    </Label>
                    <Input
                        id="username"
                        type="text"
                        placeholder="Input username"
                        className="h-10"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <Label htmlFor="password" className="text-gray-900 text-sm font-medium">
                        Password
                    </Label>
                    <div className="relative">
                        <Input
                            id="password"
                            type="password"
                            placeholder="Input password"
                            className="h-10 pr-10"
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-10 w-10 hover:bg-transparent"
                        >
                            <Eye className="h-4 w-4 text-slate-600 opacity-50" />
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <Label htmlFor="role" className="text-gray-900 text-sm font-medium">
                        Role
                    </Label>
                    <Select>
                        <SelectTrigger className="h-10">
                            <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="user">User</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Button className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white">
                Register
            </Button>

            <div className="text-center">
                <span className="text-slate-600 text-sm">Already have an account? </span>
                <Link href="/auth/login" className="text-blue-600 text-sm underline hover:text-blue-700">
                    Login
                </Link>
            </div>
        </div>
    );
};

export default RegisterPage;
