"use server";

import { prisma } from '@/lib/prisma';
import { cacheTag, revalidateTag, unstable_cache } from 'next/cache';
import { saveFile } from '@/lib/upload';
import slugify from 'slugify';

// --- Categories ---

export const getEventCategories = unstable_cache(
  async () => {
    try {
      const categories = await prisma.eventCategory.findMany({
        orderBy: { createdAt: 'desc' },
        include: { events: true }
      });
      return { success: true, data: categories };
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      return { success: false, error: "Failed to fetch categories" };
    }
  },
  ['event-categories-list'],
  { tags: ['event-categories'] }
);

export async function createCategory(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const imageFile = formData.get('image') as File;

  if (!title) {
    return { success: false, error: "Title is required" };
  }

  try {
    const slug = slugify(title, { lower: true, strict: true });
    const imageUrl = await saveFile(imageFile);

    await prisma.eventCategory.create({
      data: {
        title,
        slug,
        description,
        image: imageUrl,
      },
    });

    revalidateTag('event-categories',"max");
    return { success: true };
  } catch (error) {
    console.error("Failed to create category:", error);
    return { success: false, error: "Failed to create category" };
  }
}

export async function deleteCategory(categoryId: string) {
    try {
        await prisma.eventCategory.delete({
            where: { id: categoryId }
        });
        revalidateTag('event-categories',"max");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete category:", error);
        return { success: false, error: "Failed to delete category" };
    }
}

export async function updateCategory(categoryId: string, formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const imageFile = formData.get('image') as File;

  if (!title) {
    return { success: false, error: "Title is required" };
  }

  try {
    const data: any = { title, description };
    if (imageFile && imageFile.size > 0) {
        data.image = await saveFile(imageFile);
    }

    await prisma.eventCategory.update({
      where: { id: categoryId },
      data,
    });

    revalidateTag('event-categories','max');
    return { success: true };
  } catch (error) {
    console.error("Failed to update category:", error);
    return { success: false, error: "Failed to update category" };
  }
}

// ... after deleteEvent (re-export or keep existing functions below)

export async function updateEvent(eventId: string, categoryId: string, formData: FormData) {
  const title = formData.get('title') as string;
  const startDateStr = formData.get('startDate') as string;
  const endDateStr = formData.get('endDate') as string;
  const location = formData.get('location') as string;
  const description = formData.get('description') as string;
  const terms = formData.get('terms') as string;
  const imageFile = formData.get('image') as File;

  if (!title || !startDateStr) {
    return { success: false, error: "Title and start date are required" };
  }

  try {
    const data: any = {
        title,
        startDate: new Date(startDateStr),
        location,
        description,
        termsAndConditions: terms,
    };

    if (endDateStr) {
        data.endDate = new Date(endDateStr);
    } else {
        data.endDate = null;
    }

    if (imageFile && imageFile.size > 0) {
        data.image = await saveFile(imageFile);
    }

    await prisma.event.update({
      where: { id: eventId },
      data,
    });

    revalidateTag(`category-events-${categoryId}`,'max');
    revalidateTag('event-categories','max');
    revalidateTag(`event-${eventId}`,'max');

    return { success: true };
  } catch (error) {
     console.error("Failed to update event:", error);
     return { success: false, error: "Failed to update event" };
  }
}

export async function getCategoryEvents(categoryId: string) {
  "use cache";
  cacheTag('event-categories');
  cacheTag(`category-events-${categoryId}`);

  try {
    const events = await prisma.event.findMany({
      where: { categoryId },
      orderBy: { startDate: 'asc' }
    });

    // Also fetch the category details for the header
    const category = await prisma.eventCategory.findUnique({
        where: { id: categoryId }
    });

    return { success: true, events, category };
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return { success: false, error: "Failed to fetch events" };
  }
}

export async function createEvent(formData: FormData) {
  const title = formData.get('title') as string;
  const startDateStr = formData.get('startDate') as string;
  const endDateStr = formData.get('endDate') as string;
  const location = formData.get('location') as string;
  const description = formData.get('description') as string;
  const terms = formData.get('terms') as string;
  const categoryId = formData.get('categoryId') as string;
  const imageFile = formData.get('image') as File;

  if (!title || !startDateStr || !categoryId) {
    return { success: false, error: "Title, start date, and category are required" };
  }

  try {
    const slug = slugify(title, { lower: true, strict: true }) + '-' + Date.now().toString().slice(-4);
    const imageUrl = await saveFile(imageFile);

    const startDate = new Date(startDateStr);
    const endDate = endDateStr ? new Date(endDateStr) : null;

    await prisma.event.create({
      data: {
        title,
        slug,
        startDate,
        endDate,
        location,
        description,
        termsAndConditions: terms,
        image: imageUrl,
        categoryId,
      },
    });

    revalidateTag(`category-events-${categoryId}`,'max');
    revalidateTag('event-categories','max'); // Update counts

    return { success: true };
  } catch (error) {
    console.error("Failed to create event:", error);
    return { success: false, error: "Failed to create event" };
  }
}

export async function deleteEvent(eventId: string, categoryId: string) {
    try {
        await prisma.event.delete({
            where: { id: eventId }
        });
        revalidateTag(`category-events-${categoryId}`,"max");
        revalidateTag('event-categories','max');
        return { success: true };
    } catch (error) {
         console.error("Failed to delete event:", error);
         return { success: false, error: "Failed to delete event" };
    }
}

export async function getEvent(eventId: string) {
  "use cache";
  cacheTag(`event-${eventId}`);

  try {
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: { category: true }
    });

    if (!event) {
        return { success: false, error: "Event not found" };
    }

    return { success: true, event };
  } catch (error) {
    console.error("Failed to fetch event:", error);
    return { success: false, error: "Failed to fetch event" };
  }
}

export async function registerForEvent(eventId: string, userId: string) {
  try {
    // Check if already registered first to be safe, though unique constraint will catch it
    const existing = await prisma.eventRegistration.findUnique({
      where: {
        userId_eventId: { userId, eventId }
      }
    });

    if (existing) {
      return { success: true }; // Treat as success if already registered
    }

    await prisma.eventRegistration.create({
      data: {
        eventId,
        userId,
      },
    });
    revalidateTag(`user-registrations-${userId}`, 'max');
    revalidateTag(`registration-${userId}-${eventId}`, 'max');
    return { success: true };
  } catch (error: any) {
    if (error.code === 'P2002') {
        return { success: true }; // Already registered is effectively a success
    }
    console.error("Failed to register for event:", error);
    return { success: false, error: "Failed to register for event" };
  }
}

export async function getUserRegistrations(userId: string) {
    "use cache";
    cacheTag(`user-registrations-${userId}`);

    try {
        const registrations = await prisma.eventRegistration.findMany({
            where: { userId },
            include: { event: true },
            orderBy: { createdAt: 'desc' }
        });
        return { success: true, registrations };
    } catch (error) {
        console.error("Failed to fetch user registrations:", error);
        return { success: false, error: "Failed to fetch user registrations" };
    }
}

export async function checkRegistrationStatus(eventId: string, userId: string) {
    "use cache";
    cacheTag(`registration-${userId}-${eventId}`);

    try {
        const registration = await prisma.eventRegistration.findUnique({
            where: {
                userId_eventId: {
                    userId,
                    eventId
                }
            }
        });
        return { success: true, isRegistered: !!registration };
    } catch (error) {
        console.error("Failed to check registration:", error);
        return { success: false, error: "Failed to check registration" };
    }
}

export async function unregisterFromEvent(eventId: string, userId: string) {
    try {
        await prisma.eventRegistration.delete({
            where: {
                userId_eventId: {
                    userId,
                    eventId
                }
            }
        });

        revalidateTag(`user-registrations-${userId}`, 'max');
        revalidateTag(`registration-${userId}-${eventId}`, 'max');

        return { success: true };
    } catch (error) {
        console.error("Failed to unregister from event:", error);
        return { success: false, error: "Failed to unregister from event" };
    }
}

export const getPaginatedEventCategories = unstable_cache(
    async (page: number = 1, limit: number = 3) => {
        try {
            const skip = (page - 1) * limit;
            const categories = await prisma.eventCategory.findMany({
                orderBy: { createdAt: 'desc' },
                include: { events: true },
                skip,
                take: limit + 1, // Take one extra to check if there's more
            });

            const hasMore = categories.length > limit;
            const data = hasMore ? categories.slice(0, limit) : categories;

            return { success: true, data, hasMore };
        } catch (error) {
            console.error("Failed to fetch paginated categories:", error);
            return { success: false, error: "Failed to fetch paginated categories" };
        }
    },
    ['event-categories-paginated'],
    { tags: ['event-categories'] }
);

export async function getEventRegistrations(eventId: string) {
  try {
    const registrations = await prisma.eventRegistration.findMany({
      where: { eventId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            createdAt: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    return { success: true, registrations };
  } catch (error) {
    console.error("Failed to fetch event registrations:", error);
    return { success: false, error: "Failed to fetch event registrations" };
  }
}
