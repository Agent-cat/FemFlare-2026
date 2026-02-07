"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Folder, ArrowRight, Loader2, Trash2, Edit2, Image as ImageIcon } from 'lucide-react';
import { createCategory, deleteCategory, updateCategory } from '@/app/actions/events';
import { toast } from 'sonner';

interface Category {
  id: string;
  title: string;
  description: string | null;
  image?: string | null;
  slug?: string;
  events?: any[];
}

export default function CategoryManager({ initialCategories }: { initialCategories: Category[] }) {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);

    let res;
    if (editingCategory) {
        res = await updateCategory(editingCategory.id, formData);
    } else {
        res = await createCategory(formData);
    }

    setIsLoading(false);

    if (res.success) {
      setIsCreating(false);
      setEditingCategory(null);
      toast.success(editingCategory ? "Category updated" : "Category created");
      router.refresh();
    } else {
      toast.error(res.error || "Operation failed");
    }
  }

  async function handleDelete(e: React.MouseEvent, id: string) {
      e.stopPropagation();
      if (!confirm("Are you sure you want to delete this category?")) return;

      const toastId = toast.loading("Deleting...");
      const res = await deleteCategory(id);

      if (res.success) {
          toast.success("Category deleted", { id: toastId });
          router.refresh();
      } else {
          toast.error("Failed to delete", { id: toastId });
      }
  }

  function startEdit(e: React.MouseEvent, category: Category) {
      e.stopPropagation();
      setEditingCategory(category);
      setIsCreating(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
            <h1 className="text-3xl font-bold text-gray-900">Event Categories</h1>
            <p className="text-gray-500 mt-1">Manage your event categories and their contents.</p>
        </div>
        <button
            onClick={() => { setIsCreating(true); setEditingCategory(null); }}
            className="flex items-center gap-2 bg-[#FF5722] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#F4511E] transition-colors"
        >
            <Plus className="w-5 h-5" />
            New Category
        </button>
      </div>

      {/* Create/Edit Form */}
      {isCreating && (
        <div className="mb-8 p-6 bg-white rounded-xl border border-gray-200 shadow-sm animate-in fade-in slide-in-from-top-4">
             <h3 className="text-lg font-bold mb-4">{editingCategory ? "Edit Category" : "Create New Category"}</h3>
             <form action={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                        name="title"
                        defaultValue={editingCategory?.title}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF5722]/20 focus:border-[#FF5722]"
                        placeholder="e.g. Technology"
                    />
                </div>
                <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                     <textarea
                        name="description"
                        defaultValue={editingCategory?.description || ''}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF5722]/20 focus:border-[#FF5722]"
                        placeholder="Short description..."
                        rows={3}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
                    <div className="flex items-center gap-4">
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#FF5722]/10 file:text-[#FF5722] hover:file:bg-[#FF5722]/20"
                        />
                    </div>
                    {editingCategory?.image && <p className="text-xs text-green-600 mt-1">Current image exists. Upload new to replace.</p>}
                </div>

                <div className="flex justify-end gap-3 pt-2">
                    <button type="button" onClick={() => { setIsCreating(false); setEditingCategory(null); }} className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg">Cancel</button>
                    <button type="submit" disabled={isLoading} className="flex items-center gap-2 px-6 py-2 bg-[#FF5722] text-white font-bold rounded-lg hover:bg-[#F4511E] disabled:opacity-50">
                        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                        {editingCategory ? "Update Category" : "Create Category"}
                    </button>
                </div>
             </form>
        </div>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialCategories.map((cat) => (
            <div
                key={cat.id}
                onClick={() => router.push(`/admin/events/${cat.id}`)}
                className="group bg-white p-6 rounded-2xl border border-gray-200 hover:border-[#FF5722]/50 hover:shadow-lg cursor-pointer transition-all duration-300 relative"
            >
                <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-[#FF5722]/10 rounded-full flex items-center justify-center text-[#FF5722] group-hover:bg-[#FF5722] group-hover:text-white transition-colors">
                        {cat.image ? <ImageIcon className="w-6 h-6" /> : <Folder className="w-6 h-6" />}
                    </div>
                    <div className="flex gap-2">
                         <button
                            onClick={(e) => startEdit(e, cat)}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-blue-500 transition-colors"
                            title="Edit"
                        >
                            <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={(e) => handleDelete(e, cat.id)}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-red-500 transition-colors"
                            title="Delete"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{cat.title}</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2 min-h-[2.5em]">
                    {cat.description || "No description provided."}
                </p>

                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 group-hover:text-[#FF5722] transition-colors">
                        {cat.events?.length || 0} Events
                    </div>
                    {cat.slug && (
                         <span className="text-[10px] text-gray-300 font-mono bg-gray-50 px-2 py-1 rounded">/{cat.slug}</span>
                    )}
                </div>
            </div>
        ))}

        {initialCategories.length === 0 && !isCreating && (
            <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-dashed border-gray-300">
                <Folder className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">No categories found. Create one to get started.</p>
            </div>
        )}
      </div>
    </div>
  );
}
