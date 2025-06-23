import AdminLayout from '@/components/layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function AdminCategoriesCreatePage() {
  return (
    <AdminLayout title="Create Category">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Category</h1>
          <p className="text-muted-foreground">
            Add a new category for organizing articles.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Category Information</CardTitle>
            <CardDescription>
              Fill in the details below to create a new category.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Category Name</Label>
              <Input id="name" placeholder="Enter category name" type="text" />
            </div>

            <div className="flex gap-2">
              <Button>Create Category</Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
