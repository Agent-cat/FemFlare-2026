"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Folder, ArrowRight, Loader2, Trash2, Edit2, Image as ImageIcon } from 'lucide-react';
import { createCategory, deleteCategory, updateCategory } from '@/app/actions/events';
import { toast } from 'sonner';

interface Category {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  image: string | null;
  displayOrder: number;
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
            <h1 className="text-4xl font-oswald font-bold text-gray-900 uppercase tracking-tight">Event Categories</h1>
            <p className="text-gray-600 mt-2 font-sans text-lg">Manage your event categories and their contents.</p>
        </div>
        <button
            onClick={() => { setIsCreating(true); setEditingCategory(null); }}
            className="flex items-center gap-2 bg-[#FF5722] text-white px-6 py-3 rounded-full font-bold font-oswald uppercase tracking-wide hover:bg-[#F4511E] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
            <Plus className="w-5 h-5" />
            New Category
        </button>
      </div>

      {/* Create/Edit Form */}
      {isCreating && (
        <div className="mb-10 p-8 bg-[#EBE5DB]/50 backdrop-blur-sm rounded-3xl border border-[#DCCEB8] shadow-xl animate-in fade-in slide-in-from-top-4">
             <h3 className="text-2xl font-oswald font-bold mb-6 uppercase text-gray-900">{editingCategory ? "Edit Category" : "Create New Category"}</h3>
             <form action={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 font-oswald uppercase tracking-wide">Title</label>
                    <input
                        name="title"
                        defaultValue={editingCategory?.title}
                        required
                        className="w-full px-5 py-3 rounded-xl border border-[#DCCEB8] bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5722]/20 focus:border-[#FF5722] transition-all font-sans"
                        placeholder="e.g. Technology"
                    />
                </div>
                <div>
                     <label className="block text-sm font-bold text-gray-700 mb-2 font-oswald uppercase tracking-wide">Display Order</label>
                     <input
                        type="number"
                        name="displayOrder"
                        defaultValue={editingCategory?.displayOrder || 0}
                        className="w-full px-5 py-3 rounded-xl border border-[#DCCEB8] bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5722]/20 focus:border-[#FF5722] transition-all font-sans"
                        placeholder="e.g. 1"
                    />
                    <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-bold">Lower numbers appear first.</p>
                </div>
                <div>
                     <label className="block text-sm font-bold text-gray-700 mb-2 font-oswald uppercase tracking-wide">Description</label>
                     <textarea
                        name="description"
                        defaultValue={editingCategory?.description || ''}
                        className="w-full px-5 py-3 rounded-xl border border-[#DCCEB8] bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5722]/20 focus:border-[#FF5722] transition-all font-sans"
                        placeholder="Short description..."
                        rows={3}
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 font-oswald uppercase tracking-wide">Cover Image</label>
                    <div className="flex items-center gap-4">
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-[#FF5722]/10 file:text-[#FF5722] hover:file:bg-[#FF5722]/20 transition-colors cursor-pointer"
                        />
                    </div>
                    {editingCategory?.image && <p className="text-xs text-green-600 mt-2 font-medium">Current image exists. Upload new to replace.</p>}
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <button type="button" onClick={() => { setIsCreating(false); setEditingCategory(null); }} className="px-6 py-3 text-gray-600 font-bold font-oswald uppercase tracking-wide hover:bg-gray-100 rounded-full transition-colors">Cancel</button>
                    <button type="submit" disabled={isLoading} className="flex items-center gap-2 px-8 py-3 bg-[#FF5722] text-white font-bold font-oswald uppercase tracking-wide rounded-full hover:bg-[#F4511E] disabled:opacity-50 shadow-lg hover:shadow-xl transition-all">
                        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                        {editingCategory ? "Update Category" : "Create Category"}
                    </button>
                </div>
             </form>
        </div>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {initialCategories.map((cat) => (
            <div
                key={cat.id}
                onClick={() => router.push(`/admin/events/${cat.id}`)}
                className="group bg-white p-6 rounded-xl border border-gray-200 hover:border-[#FF5722] hover:shadow-md cursor-pointer transition-all duration-200 relative"
            >
                <div className="flex items-start justify-between mb-4">
                    <div className="flex flex-col items-center gap-1">
                        <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 group-hover:text-[#FF5722] transition-colors relative">
                            {cat.image ? <ImageIcon className="w-5 h-5" /> : <Folder className="w-5 h-5" />}
                        </div>
                        <span className="text-[10px] font-black font-oswald text-gray-300">#{cat.displayOrder || 0}</span>
                    </div>

                    <div className="flex gap-2">
                            <button
                            onClick={(e) => startEdit(e, cat)}
                            className="p-2 text-gray-400 hover:text-gray-900 transition-colors"
                            title="Edit"
                        >
                            <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={(e) => handleDelete(e, cat.id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            title="Delete"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">{cat.title}</h3>
                <p className="text-sm text-gray-500 mb-4 font-sans line-clamp-2 min-h-[2.5em]">
                    {cat.description || "No description provided."}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs font-semibold text-gray-500">
                        {cat.events?.length || 0} Events
                    </span>
                    {cat.slug && (
                            <span className="text-[10px] text-gray-400 font-mono">/{cat.slug}</span>
                    )}
                </div>
            </div>
        ))}

        {initialCategories.length === 0 && !isCreating && (
            <div className="col-span-full py-24 text-center bg-white rounded-xl border border-dashed border-gray-200 shadow-sm">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Folder className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-oswald font-bold text-gray-900 mb-2">No Categories Yet</h3>
                <p className="text-gray-500 font-medium mb-8 max-w-md mx-auto">Get started by creating your first event category to organize your events.</p>
                <button
                    onClick={() => { setIsCreating(true); setEditingCategory(null); }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF5722] text-white font-bold font-oswald uppercase tracking-wide rounded-full hover:bg-[#F4511E] transition-colors shadow-lg"
                >
                    <Plus className="w-5 h-5" />
                    Create Category
                </button>
            </div>
        )}
      </div>
    </div>
  );
}
