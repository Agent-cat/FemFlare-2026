"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Calendar, MapPin, ArrowLeft, Loader2, Edit2, Trash2, Image as ImageIcon, Users } from 'lucide-react';
import { createEvent, deleteEvent, updateEvent, getEventRegistrations } from '@/app/actions/events';
import RegistrationModal from './RegistrationModal';
import { toast } from 'sonner';

interface Event {
  id: string;
  title: string;
  startDate: Date | string;
  endDate?: Date | string | null;
  location: string | null;
  description: string | null;
  termsAndConditions?: string | null;
  image?: string | null;
}

interface Category {
  id: string;
  title: string;
}

export default function EventManager({ category, initialEvents }: { category: Category, initialEvents: Event[] }) {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Registration Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [selectedEventName, setSelectedEventName] = useState("");

  async function handleSubmit(formData: FormData) {
    setIsLoading(true);
    formData.append('categoryId', category.id); // Ensure category ID is always present

    let res;
    if (editingEvent) {
        res = await updateEvent(editingEvent.id, category.id, formData);
    } else {
        res = await createEvent(formData);
    }

    setIsLoading(false);

    if (res.success) {
      setIsCreating(false);
      setEditingEvent(null);
      toast.success(editingEvent ? "Event updated" : "Event created");
      router.refresh();
    } else {
      toast.error(res.error || "Operation failed");
    }
  }

  async function handleDelete(e: React.MouseEvent, id: string) {
      e.stopPropagation();
      if (!confirm("Are you sure you want to delete this event?")) return;

      const toastId = toast.loading("Deleting...");
      const res = await deleteEvent(id, category.id);

      if (res.success) {
          toast.success("Event deleted", { id: toastId });
          router.refresh();
      } else {
          toast.error("Failed to delete", { id: toastId });
      }
  }

  async function handleViewRegistrations(eventTitle: string, eventId: string) {
      setIsModalOpen(true);
      setModalLoading(true);
      setSelectedEventName(eventTitle);

      const res = await getEventRegistrations(eventId);

      if (res.success && res.registrations) {
          setRegistrations(res.registrations);
      } else {
          toast.error("Failed to load registrations");
          setRegistrations([]);
      }
      setModalLoading(false);
  }

  function startEdit(event: Event) {
      setEditingEvent(event);
      setIsCreating(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function toDateTimeLocal(date: Date | string | null | undefined) {
      if (!date) return '';
      const d = new Date(date);
      // Format: YYYY-MM-DDTHH:mm
      return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  }

  function formatDate(date: Date | string) {
      return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
            <div className="flex items-center gap-2 mb-2">
                 <button
                    onClick={() => router.push('/admin/events')}
                    className="text-gray-500 hover:text-gray-900 transition-colors font-medium flex items-center gap-1"
                >
                    <ArrowLeft className="w-4 h-4" /> Categories
                </button>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Events in {category.title}</h1>
            <p className="text-gray-500 mt-1">Manage events for this category.</p>
        </div>
        <button
            onClick={() => { setIsCreating(true); setEditingEvent(null); }}
            className="flex items-center gap-2 bg-[#FF5722] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#F4511E] transition-colors"
        >
            <Plus className="w-5 h-5" />
            New Event
        </button>
      </div>

      {/* Create/Edit Form */}
      {isCreating && (
        <div className="mb-8 p-6 bg-white rounded-xl border border-gray-200 shadow-sm animate-in fade-in slide-in-from-top-4">
             <h3 className="text-lg font-bold mb-4">{editingEvent ? "Edit Event" : "Create New Event"}</h3>
             <form action={handleSubmit} className="space-y-4">
                <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                     <input
                        name="title"
                        defaultValue={editingEvent?.title}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF5722]/20 focus:border-[#FF5722]"
                        placeholder="e.g. AI Summit 2025"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Start Date & Time</label>
                        <input
                            name="startDate"
                            type="datetime-local"
                            defaultValue={toDateTimeLocal(editingEvent?.startDate)}
                            required
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF5722]/20 focus:border-[#FF5722]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">End Date & Time (Optional)</label>
                        <input
                            name="endDate"
                            type="datetime-local"
                            defaultValue={toDateTimeLocal(editingEvent?.endDate)}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF5722]/20 focus:border-[#FF5722]"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input
                            name="location"
                            defaultValue={editingEvent?.location || ''}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF5722]/20 focus:border-[#FF5722]"
                            placeholder="e.g. San Francisco, CA"
                        />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Event Image</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#FF5722]/10 file:text-[#FF5722] hover:file:bg-[#FF5722]/20"
                        />
                        {editingEvent?.image && <p className="text-xs text-green-600 mt-1">Current image exists. Upload new to replace.</p>}
                    </div>
                </div>

                <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                     <textarea
                        name="description"
                        defaultValue={editingEvent?.description || ''}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF5722]/20 focus:border-[#FF5722]"
                        placeholder="Event details..."
                        rows={3}
                    />
                </div>

                <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Terms & Conditions</label>
                     <textarea
                        name="terms"
                        defaultValue={editingEvent?.termsAndConditions || ''}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF5722]/20 focus:border-[#FF5722]"
                        placeholder="Terms users must agree to..."
                        rows={3}
                    />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                    <button type="button" onClick={() => { setIsCreating(false); setEditingEvent(null); }} className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg">Cancel</button>
                    <button type="submit" disabled={isLoading} className="flex items-center gap-2 px-6 py-2 bg-[#FF5722] text-white font-bold rounded-lg hover:bg-[#F4511E] disabled:opacity-50">
                        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                        {editingEvent ? "Update Event" : "Create Event"}
                    </button>
                </div>
             </form>
        </div>
      )}

      {/* Events List */}
      <div className="space-y-4">
        {initialEvents.map((event) => (
            <div
                key={event.id}
                className="bg-white p-5 rounded-xl border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#FF5722]/30 transition-colors"
            >
                <div className="flex items-start gap-4">
                    {/* Thumbnail */}
                    <div className="w-16 h-16 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden flex items-center justify-center">
                         {event.image ? (
                             <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                         ) : (
                             <Calendar className="w-8 h-8 text-gray-300" />
                         )}
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {formatDate(event.startDate)}</span>
                            {event.location && (
                                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {event.location}</span>
                            )}
                        </div>
                        {event.description && (
                            <p className="text-gray-500 text-sm mt-2 line-clamp-1">{event.description}</p>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 md:ml-auto">
                    <button
                        onClick={() => handleViewRegistrations(event.title, event.id)}
                        className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-green-600 transition-colors"
                        title="View Registrations"
                    >
                        <Users className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => startEdit(event)}
                        className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-blue-500 transition-colors"
                        title="Edit"
                    >
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={(e) => handleDelete(e, event.id)}
                        className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-red-500 transition-colors"
                        title="Delete"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        ))}

        {initialEvents.length === 0 && !isCreating && (
            <div className="py-16 text-center bg-white rounded-2xl border border-dashed border-gray-300">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">No events found in this category.</p>
            </div>
        )}
      </div>

      <RegistrationModal
         isOpen={isModalOpen}
         onClose={() => setIsModalOpen(false)}
         eventName={selectedEventName}
         registrations={registrations}
         isLoading={modalLoading}
      />
    </div>
  );
}
