// Admin dashboard redirects to articles page as per requirements
import { redirect } from "next/navigation";

export default function AdminDashboard() {
    // After login/register success, redirect to articles list (as per requirements)
    redirect("/admin/articles");
}
