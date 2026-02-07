import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function saveFile(file: File, folder: string = 'uploads'): Promise<string | null> {
  if (!file || file.size === 0) return null;

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure directory exists
    const uploadDir = join(process.cwd(), 'public', folder);
    await mkdir(uploadDir, { recursive: true });

    // Generate unique filename
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${timestamp}-${safeName}`;
    const filepath = join(uploadDir, filename);

    // Write file
    await writeFile(filepath, buffer);

    // Return public URL path
    return `/${folder}/${filename}`;
  } catch (error) {
    console.error("Error saving file:", error);
    return null;
  }
}
