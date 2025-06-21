import React from "react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/shared/Logo";
import { FileText, User, Users, LogOut } from "lucide-react";
import Link from "next/link";

interface AdminSidebarProps {
    activeMenu?: "articles" | "categories" | "profile";
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeMenu }) => {
    return (
        <div className="w-[267px] h-full pt-6 pb-4 bg-blue-600 flex flex-col justify-start items-center gap-4 overflow-hidden">
            <div className="w-full flex flex-col gap-6">
                <div className="w-full h-9 px-8 flex items-center gap-2">
                    <Logo variant="white" />
                </div>

                <div className="w-full px-4 flex flex-col gap-2">
                    <Link href="/admin/articles">
                        <Button
                            variant="ghost"
                            className={`w-full h-10 justify-start gap-3 ${activeMenu === "articles"
                                    ? "bg-white/20 text-white"
                                    : "text-white hover:bg-white/10"
                                }`}
                        >
                            <FileText className="w-5 h-5" />
                            <span className="text-base font-medium">Articles</span>
                        </Button>
                    </Link>

                    <Link href="/admin/categories">
                        <Button
                            variant="ghost"
                            className={`w-full h-10 justify-start gap-3 ${activeMenu === "categories"
                                    ? "bg-white/20 text-white"
                                    : "text-white hover:bg-white/10"
                                }`}
                        >
                            <Users className="w-5 h-5" />
                            <span className="text-base font-medium">Categories</span>
                        </Button>
                    </Link>

                    <Link href="/admin/profile">
                        <Button
                            variant="ghost"
                            className={`w-full h-10 justify-start gap-3 ${activeMenu === "profile"
                                    ? "bg-white/20 text-white"
                                    : "text-white hover:bg-white/10"
                                }`}
                        >
                            <User className="w-5 h-5" />
                            <span className="text-base font-medium">Profile</span>
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="mt-auto px-4 w-full">
                <Button
                    variant="ghost"
                    className="w-full h-10 justify-start gap-3 text-white hover:bg-white/10"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="text-base font-medium">Logout</span>
                </Button>
            </div>
        </div>
    );
};

export default AdminSidebar;
