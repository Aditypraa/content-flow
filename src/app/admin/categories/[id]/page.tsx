import AdminLayout from "@/components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AdminCategoryDetailPage() {
    return (
        <AdminLayout title="Category Details">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Category Details</h1>
                        <p className="text-muted-foreground">
                            View and manage category information.
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline">Edit Category</Button>
                        <Button variant="destructive">Delete Category</Button>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Technology</CardTitle>
                        <CardDescription>
                            Category information and statistics
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Category ID</label>
                                <p className="text-sm">f0e1d2c3-b4a5-4987-8654-3c2b1a0f9e8d</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Status</label>
                                <div className="mt-1">
                                    <Badge variant="secondary">Active</Badge>
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Created At</label>
                                <p className="text-sm">June 23, 2025</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Articles Count</label>
                                <p className="text-sm">12 articles</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminLayout>
    );
}
