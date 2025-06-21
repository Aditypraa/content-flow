"use client";

import AddCategory from "@/components/views/admin/categories/AddCategory";

export default function AddCategoryPage() {
    return (
        <AddCategory
            onCancel={() => {
                // Handle cancel - navigate back
                console.log('Cancel add category');
            }}
            onAdd={(categoryName: string) => {
                // Handle add - create category and navigate back
                console.log('Add category:', categoryName);
            }}
        />
    );
}
