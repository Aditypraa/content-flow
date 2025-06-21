import { Button } from "@/components/ui/button";

export default function DropdownMenuClickProfile() {
    return (
        <div className="rounded-md shadow-lg border border-slate-200 bg-white overflow-hidden min-w-56">
            <div className="p-1">
                <div className="px-3 py-2 text-sm text-slate-600 border-b border-slate-100">
                    My Account
                </div>
                <div className="p-1 space-y-1">
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-sm h-8 px-2"
                    >
                        Profile Settings
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-sm h-8 px-2"
                    >
                        Account Preferences
                    </Button>
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-sm h-8 px-2"
                    >
                        Security
                    </Button>
                    <div className="border-t border-slate-100 my-1"></div>
                    <Button
                        variant="ghost"
                        className="w-full justify-start text-sm h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                        Sign Out
                    </Button>
                </div>
            </div>
        </div>
    );
}