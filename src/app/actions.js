'use server';

import { supabaseAdmin } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { createSession, getSession } from '@/lib/auth';

export async function loginUser(username, password) {
  try {
    const envUsername = process.env.ADMIN_USERNAME;
    const envPassword = process.env.ADMIN_PASSWORD;

    if (!envUsername || !envPassword) {
      console.error('Admin credentials not set in environment variables');
      return { success: false, error: 'Terjadi kesalahan konfigurasi server.' };
    }

    if (username !== envUsername || password !== envPassword) {
      return { success: false, error: 'Username atau password salah.' };
    }

    await createSession({ id: 'admin-env', username: envUsername });
    return { success: true };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Terjadi kesalahan pada server.' };
  }
}

export async function registerUmkm(formData) {
  const session = await getSession();
  if (!session) {
    return { success: false, error: 'Unauthorized: Harap login terlebih dahulu.' };
  }

  const namaUsaha = formData.get('namaUsaha');
  const namaPemilik = formData.get('namaPemilik');
  const kategori = formData.get('kategori');
  const alamat = formData.get('alamat');
  const telepon = formData.get('telepon');
  const deskripsi = formData.get('deskripsi');
  const shopeeLink = formData.get('shopeeLink') || '';
  const tiktokLink = formData.get('tiktokLink') || '';
  const mapsLink = formData.get('mapsLink') || '';

  // Basic WhatsApp Link Generation if not provided, just format the phone number
  let whatsappLink = formData.get('whatsappLink') || '';
  if (!whatsappLink && telepon) {
    let cleanPhone = telepon.replace(/\D/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '62' + cleanPhone.substring(1);
    }
    whatsappLink = `https://wa.me/${cleanPhone}`;
  }

  // Generate UMKM ID first so we can use it for the image filename
  const id = crypto.randomUUID();

  // Handle image upload using Supabase Storage
  let imageSrc = '/images/village-landscape.png';
  const imageFile = formData.get('image');

  if (imageFile && imageFile.size > 0) {
    // Convert to standard Node Buffer which is universally supported in all Node environments
    const arrayBuffer = await imageFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Extract file extension and append to ID
    const ext = imageFile.name.split('.').pop() || 'jpg';
    const fileName = `${id}.${ext}`;

    const { data, error } = await supabaseAdmin.storage
      .from('umkm-images')
      .upload(fileName, buffer, {
        contentType: imageFile.type || 'image/jpeg',
      });

    if (error) {
      console.error('Error uploading image to Supabase:', error);
      const errorMsg = error.message || JSON.stringify(error);
      return { success: false, error: `Gagal mengunggah gambar: ${errorMsg}` };
    }

    const { data: publicUrlData } = supabaseAdmin.storage
      .from('umkm-images')
      .getPublicUrl(fileName);

    imageSrc = publicUrlData.publicUrl;
  }

  try {
    let normalizedCategory = kategori;
    if (kategori === 'Food & Drink') normalizedCategory = 'Makanan';
    else if (kategori === 'Clothing & Apparel') normalizedCategory = 'Fashion';
    else if (kategori === 'Kerajinan Tangan') normalizedCategory = 'Kerajinan';
    else if (kategori === 'Jasa & Layanan') normalizedCategory = 'Jasa';

    // Generate slug
    let baseSlug = namaUsaha.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    let slug = baseSlug;

    // Check slug uniqueness
    const { data: existing } = await supabaseAdmin
      .from('umkms')
      .select('id')
      .eq('slug', slug)
      .maybeSingle();

    if (existing) {
      slug = `${baseSlug}-${crypto.randomBytes(2).toString('hex')}`;
    }

    const { error } = await supabaseAdmin
      .from('umkms')
      .insert([
        {
          id,
          slug,
          namaUsaha,
          namaPemilik,
          kategori: normalizedCategory,
          alamat,
          telepon,
          deskripsi,
          whatsappLink,
          shopeeLink,
          tiktokLink,
          mapsLink,
          imgSrc: imageSrc
        }
      ]);

    if (error) {
      console.error('Error inserting UMKM into Supabase:', error);
      return { success: false, error: 'Gagal mendaftar. Silakan coba lagi.' };
    }

    revalidatePath('/umkm');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error inserting UMKM:', error);
    return { success: false, error: 'Gagal mendaftar. Silakan coba lagi.' };
  }
}
