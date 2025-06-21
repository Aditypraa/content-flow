"use client";

import EditCategory from "@/components/views/admin/categories/EditCategory";
import { useParams } from "next/navigation";

export default function EditCategoryPage() {
    const params = useParams();
    const id = params.id as string;

    return (
        <EditCategory
            currentName="Technology" // This would normally come from data fetching based on id
            onCancel={() => {
                // Handle cancel - navigate back
                console.log('Cancel edit category');
            }}
            onSave={(categoryName: string) => {
                // Handle save - update category and navigate back
                console.log('Save category:', categoryName, 'for ID:', id);
            }}
        />
    );
}
