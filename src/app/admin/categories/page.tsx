'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Plus, Edit, Trash2 } from 'lucide-react';
import AdminLayout from '@/components/layouts/AdminLayout';
import SearchInput from '@/components/common/forms/SearchInput';
import Pagination from '@/components/common/feedback/Pagination';
import DeleteConfirmationModal from '@/components/common/modals/DeleteConfirmationModal';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Category {
  id: number;
  name: string;
  description: string;
  articleCount: number;
  createdAt: string;
}

const categorySchema = z.object({
  name: z
    .string()
    .min(1, 'Category name is required')
    .min(2, 'Category name must be at least 2 characters'),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

const CategoryPage = () => {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      name: 'Technology',
      description: 'Tech related articles',
      articleCount: 5,
      createdAt: 'April 13, 2025 10:55:12',
    },
    {
      id: 2,
      name: 'Business',
      description: 'Business and finance articles',
      articleCount: 3,
      createdAt: 'April 13, 2025 10:55:12',
    },
    {
      id: 3,
      name: 'Sports',
      description: 'Sports and fitness articles',
      articleCount: 2,
      createdAt: 'April 13, 2025 10:55:12',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const addForm = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
    },
  });

  const editForm = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
    },
  });

  const onAddSubmit = (data: CategoryFormValues) => {
    const newCategory = {
      id: Date.now(),
      name: data.name,
      description: '', // Default empty description
      articleCount: 0,
      createdAt: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    };
    setCategories([...categories, newCategory]);
    addForm.reset();
    setIsAddOpen(false);
    toast.success('Category added successfully!');
  };

  const onEditSubmit = (data: CategoryFormValues) => {
    if (!selectedCategory) return;
    setCategories(
      categories.map((cat) =>
        cat.id === selectedCategory.id ? { ...cat, name: data.name } : cat,
      ),
    );
    setSelectedCategory(null);
    editForm.reset();
    setIsEditOpen(false);
    toast.success('Category updated successfully!');
  };

  const handleDelete = () => {
    if (!selectedCategory) return;
    setCategories(categories.filter((cat) => cat.id !== selectedCategory.id));
    setSelectedCategory(null);
    setIsDeleteOpen(false);
    toast.success('Category deleted successfully!');
  };

  const openEditModal = (category: Category) => {
    setSelectedCategory(category);
    editForm.setValue('name', category.name);
    setIsEditOpen(true);
  };

  const openDeleteModal = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteOpen(true);
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <AdminLayout
      title="Categories"
      breadcrumbs={[
        { label: 'Dashboard', href: '/admin' },
        { label: 'Categories' },
      ]}
    >
      <div className="p-4 lg:px-6 lg:pt-6">
        <div className="w-full max-w-none lg:max-w-[1097px] lg:mx-auto bg-white rounded-xl border border-slate-200 flex flex-col justify-start items-start overflow-hidden">
          {/* Header with controls */}
          <div className="w-full p-6 bg-gray-50 border-b border-slate-200 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
            <div className="text-slate-800 text-base font-medium">
              Total Category : {filteredCategories.length}
            </div>

            <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center gap-2 lg:gap-4">
              <SearchInput
                placeholder="Search Category"
                value={searchTerm}
                onChange={setSearchTerm}
                className="w-full sm:w-60"
                showClearButton={false}
              />

              <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                <DialogTrigger asChild>
                  <Button className="h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5">
                    <Plus className="w-5 h-5" />
                    Add Category
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] mx-4">
                  <DialogHeader>
                    <DialogTitle>Add New Category</DialogTitle>
                    <DialogDescription>
                      Create a new category for organizing articles.
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...addForm}>
                    <form
                      onSubmit={addForm.handleSubmit(onAddSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={addForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category Name</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter category name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <DialogFooter>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsAddOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          disabled={addForm.formState.isSubmitting}
                        >
                          Add Category
                        </Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Category List */}
          <div className="w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100 border-b border-slate-200">
                  <TableHead className="text-center text-slate-900 text-sm font-medium">
                    Category
                  </TableHead>
                  <TableHead className="hidden md:table-cell text-center text-slate-900 text-sm font-medium w-[120px]">
                    Articles
                  </TableHead>
                  <TableHead className="hidden md:table-cell text-center text-slate-900 text-sm font-medium w-[200px]">
                    Created at
                  </TableHead>
                  <TableHead className="text-center text-slate-900 text-sm font-medium w-[180px]">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.map((category) => (
                  <TableRow
                    key={category.id}
                    className="bg-gray-50 border-b border-slate-200 last:border-b-0"
                  >
                    <TableCell className="p-4">
                      <div className="space-y-1">
                        <h3 className="text-sm font-medium text-gray-900 md:text-slate-600 md:font-normal md:text-center">
                          {category.name}
                        </h3>
                        <div className="md:hidden space-y-1">
                          <div className="text-sm text-gray-600">
                            {category.description}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center gap-2">
                            <Badge
                              variant={
                                category.articleCount > 0
                                  ? 'default'
                                  : 'secondary'
                              }
                            >
                              {category.articleCount} articles
                            </Badge>
                            <span>Created: {category.createdAt}</span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-center p-4">
                      <Badge
                        variant={
                          category.articleCount > 0 ? 'default' : 'secondary'
                        }
                      >
                        {category.articleCount}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-center p-4">
                      <div className="text-slate-600 text-sm">
                        {category.createdAt}
                      </div>
                    </TableCell>
                    <TableCell className="p-4">
                      <div className="flex gap-2 md:gap-1 md:justify-center">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditModal(category)}
                          className="flex-1 md:flex-none h-8 md:h-auto px-3 md:px-1 text-xs
                                                             md:bg-transparent md:border-0 md:text-blue-600 md:underline md:hover:text-blue-700 md:hover:bg-transparent"
                        >
                          <Edit className="w-4 h-4 md:w-3 md:h-3 mr-1 md:mr-0.5" />
                          <span>Edit</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 md:h-auto px-3 md:px-1 text-xs text-red-600 hover:text-red-700 hover:bg-red-50
                                                             md:bg-transparent md:border-0 md:text-red-500 md:underline md:hover:text-red-600 md:hover:bg-transparent"
                          onClick={() => openDeleteModal(category)}
                        >
                          <Trash2 className="w-4 h-4 md:w-3 md:h-3 mr-1 md:mr-0.5" />
                          <span>Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Pagination currentPage={1} totalPages={5} />
        </div>
      </div>

      {/* Edit Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[425px] mx-4">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Update the category name below.
            </DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form
              onSubmit={editForm.handleSubmit(onEditSubmit)}
              className="space-y-4"
            >
              <FormField
                control={editForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter category name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={editForm.formState.isSubmitting}
                >
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        itemName={selectedCategory?.name}
        itemType="Category"
      />
    </AdminLayout>
  );
};

export default CategoryPage;
