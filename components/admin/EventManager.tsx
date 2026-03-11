"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Calendar, MapPin, ArrowLeft, Loader2, Edit2, Trash2, Image as ImageIcon, Users } from 'lucide-react';
import { createEvent, deleteEvent, updateEvent, getEventRegistrations, getCategoryEvents } from '@/app/actions/events';
import { useInView } from 'react-intersection-observer';
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
  judgementCriteria?: string | null;
  image?: string | null;
}

interface Category {
  id: string;
  title: string;
}

export default function EventManager({
  category,
  initialEvents,
  currentPage = 1,
  totalPages = 1
}: {
  category: Category;
  initialEvents: Event[];
  currentPage?: number;
  totalPages?: number;
}) {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Infinite Scroll State
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [page, setPage] = useState(currentPage);
  const [hasMore, setHasMore] = useState(currentPage < totalPages);
  const [loadingMore, setLoadingMore] = useState(false);

  // Synchronize state with incoming props on router.refresh()
  React.useEffect(() => {
     setEvents(initialEvents);
     setPage(1);
     setHasMore(1 < totalPages);
  }, [initialEvents, totalPages]);

  const { ref, inView } = useInView({
      threshold: 0,
      rootMargin: '100px',
  });

  const loadMore = async () => {
      if (loadingMore || !hasMore) return;
      setLoadingMore(true);
      const nextPage = page + 1;
      const result = await getCategoryEvents(category.id, nextPage, 9);
      if (result.success && result.events) {
          setEvents(prev => {
              const newEvents = result.events as Event[];
              const existingIds = prev.map(e => e.id);
              return [...prev, ...newEvents.filter(e => !existingIds.includes(e.id))];
          });
          setPage(nextPage);
          setHasMore(nextPage < (result.totalPages || 1));
      }
      setLoadingMore(false);
  };

  React.useEffect(() => {
      if (inView) {
          loadMore();
      }
  }, [inView]);

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
            <div className="flex items-center gap-2 mb-3">
                 <button
                    onClick={() => router.push('/admin/events')}
                    className="text-gray-500 hover:text-[#FF5722] transition-colors font-bold font-oswald uppercase tracking-wide flex items-center gap-2 text-sm"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Categories
                </button>
            </div>
            <h1 className="text-4xl font-oswald font-bold text-gray-900 uppercase tracking-tight">Events in <span className="text-[#FF5722]">{category.title}</span></h1>
            <p className="text-gray-600 mt-2 font-sans text-lg">Manage events, details, and registrations for this category.</p>
        </div>
        <button
            onClick={() => { setIsCreating(true); setEditingEvent(null); }}
            className="flex items-center gap-2 bg-[#FF5722] text-white px-6 py-3 rounded-full font-bold font-oswald uppercase tracking-wide hover:bg-[#F4511E] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
            <Plus className="w-5 h-5" />
            New Event
        </button>
      </div>

      {/* Create/Edit Form */}
      {isCreating && (
        <div className="mb-10 p-8 bg-[#EBE5DB]/50 backdrop-blur-sm rounded-3xl border border-[#DCCEB8] shadow-xl animate-in fade-in slide-in-from-top-4">
             <h3 className="text-2xl font-oswald font-bold mb-6 uppercase text-gray-900">{editingEvent ? "Edit Event" : "Create New Event"}</h3>
             <form action={handleSubmit} className="space-y-6">
                <div>
                     <label className="block text-sm font-bold text-gray-700 mb-2 font-oswald uppercase tracking-wide">Event Title</label>
                     <input
                        name="title"
                        defaultValue={editingEvent?.title}
                        required
                        className="w-full px-5 py-3 rounded-xl border border-[#DCCEB8] bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5722]/20 focus:border-[#FF5722] transition-all font-sans"
                        placeholder="e.g. AI Summit 2025"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 font-oswald uppercase tracking-wide">Start Date & Time</label>
                        <input
                            name="startDate"
                            type="datetime-local"
                            defaultValue={toDateTimeLocal(editingEvent?.startDate)}
                            required
                            className="w-full px-5 py-3 rounded-xl border border-[#DCCEB8] bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5722]/20 focus:border-[#FF5722] transition-all font-sans"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 font-oswald uppercase tracking-wide">End Date & Time (Optional)</label>
                        <input
                            name="endDate"
                            type="datetime-local"
                            defaultValue={toDateTimeLocal(editingEvent?.endDate)}
                            className="w-full px-5 py-3 rounded-xl border border-[#DCCEB8] bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5722]/20 focus:border-[#FF5722] transition-all font-sans"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 font-oswald uppercase tracking-wide">Location</label>
                        <input
                            name="location"
                            defaultValue={editingEvent?.location || ''}
                            className="w-full px-5 py-3 rounded-xl border border-[#DCCEB8] bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5722]/20 focus:border-[#FF5722] transition-all font-sans"
                            placeholder="e.g. San Francisco, CA"
                        />
                    </div>
                     <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 font-oswald uppercase tracking-wide">Event Image</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-[#FF5722]/10 file:text-[#FF5722] hover:file:bg-[#FF5722]/20 transition-colors cursor-pointer"
                        />
                        {editingEvent?.image && <p className="text-xs text-green-600 mt-2 font-medium">Current image exists. Upload new to replace.</p>}
                    </div>
                </div>

                <div>
                     <label className="block text-sm font-bold text-gray-700 mb-2 font-oswald uppercase tracking-wide">Description</label>
                     <textarea
                        name="description"
                        defaultValue={editingEvent?.description || ''}
                        className="w-full px-5 py-3 rounded-xl border border-[#DCCEB8] bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5722]/20 focus:border-[#FF5722] transition-all font-sans"
                        placeholder="Event details..."
                        rows={3}
                    />
                </div>

                <div>
                     <label className="block text-sm font-bold text-gray-700 mb-2 font-oswald uppercase tracking-wide">Judgement Criteria</label>
                     <textarea
                        name="judgement"
                        defaultValue={editingEvent?.judgementCriteria || ''}
                        className="w-full px-5 py-3 rounded-xl border border-[#DCCEB8] bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5722]/20 focus:border-[#FF5722] transition-all font-sans"
                        placeholder="Criteria for judgement..."
                        rows={3}
                    />
                </div>

                <div>
                     <label className="block text-sm font-bold text-gray-700 mb-2 font-oswald uppercase tracking-wide">Terms & Conditions</label>
                     <textarea
                        name="terms"
                        defaultValue={editingEvent?.termsAndConditions || ''}
                        className="w-full px-5 py-3 rounded-xl border border-[#DCCEB8] bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5722]/20 focus:border-[#FF5722] transition-all font-sans"
                        placeholder="Terms users must agree to..."
                        rows={3}
                    />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <button type="button" onClick={() => { setIsCreating(false); setEditingEvent(null); }} className="px-6 py-3 text-gray-600 font-bold font-oswald uppercase tracking-wide hover:bg-gray-100 rounded-full transition-colors">Cancel</button>
                    <button type="submit" disabled={isLoading} className="flex items-center gap-2 px-8 py-3 bg-[#FF5722] text-white font-bold font-oswald uppercase tracking-wide rounded-full hover:bg-[#F4511E] disabled:opacity-50 shadow-lg hover:shadow-xl transition-all">
                        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                        {editingEvent ? "Update Event" : "Create Event"}
                    </button>
                </div>
             </form>
        </div>
      )}

      {/* Events List */}
      <div className="space-y-6">
        {events.map((event) => (
            <div
                key={event.id}
                className="group bg-white p-5 rounded-xl border border-gray-200 hover:border-[#FF5722] hover:shadow-md transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
                <div className="flex items-start gap-4 flex-1">
                    {/* Thumbnail */}
                    <div className="w-16 h-16 rounded-lg bg-gray-50 shrink-0 overflow-hidden flex items-center justify-center border border-gray-100 relative">
                         {event.image ? (
                             <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                         ) : (
                             <Calendar className="w-6 h-6 text-gray-300" />
                         )}
                    </div>

                    <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-bold text-gray-900 truncate mb-1">{event.title}</h3>
                        <div className="flex flex-col gap-1 text-sm text-gray-500">
                             <div className="flex items-center gap-2">
                                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                                <span>{new Date(event.startDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                             </div>
                             {event.location && (
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                                    <span className="truncate max-w-[300px]">{event.location}</span>
                                </div>
                             )}
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 md:self-center border-t md:border-t-0 p-4 md:p-0 mt-2 md:mt-0 border-gray-50 w-full md:w-auto justify-end">
                    <button
                        onClick={() => handleViewRegistrations(event.title, event.id)}
                        className="px-4 py-2 bg-gray-50 text-gray-700 rounded-lg text-xs font-semibold uppercase tracking-wide hover:bg-gray-100 transition-colors flex items-center gap-2"
                        title="View Registrations"
                    >
                        <Users className="w-3.5 h-3.5" /> Registrations
                    </button>

                    <div className="flex gap-1">
                        <button
                            onClick={() => startEdit(event)}
                            className="p-2 text-gray-400 hover:text-gray-900 transition-colors"
                            title="Edit"
                        >
                            <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                            onClick={(e) => handleDelete(e, event.id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            title="Delete"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        ))}

        {events.length === 0 && !isCreating && (
            <div className="py-24 text-center bg-white rounded-xl border border-dashed border-gray-200 shadow-sm">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Calendar className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-oswald font-bold text-gray-900 mb-2">No Events Found</h3>
                <p className="text-gray-500 font-medium mb-8">This category currently has no events scheduled.</p>
                <button
                    onClick={() => { setIsCreating(true); setEditingEvent(null); }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF5722] text-white font-bold font-oswald uppercase tracking-wide rounded-full hover:bg-[#F4511E] transition-colors shadow-lg"
                >
                    <Plus className="w-5 h-5" />
                    Create Event
                </button>
            </div>
        )}

        {/* Infinite Scroll Trigger */}
        {hasMore && (
           <div ref={ref} className="h-16 flex justify-center items-center mt-6">
               {loadingMore && <Loader2 className="w-6 h-6 animate-spin text-[#FF5722]" />}
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
