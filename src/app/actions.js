'use server';

import { supabaseAdmin } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import Database from 'better-sqlite3';
import { createSession, getSession } from '@/lib/auth';

const dbPath = path.join(process.cwd(), 'umkm.db');

export async function loginUser(username, password) {
  try {
    const db = new Database(dbPath);
    const admin = db.prepare('SELECT * FROM admins WHERE username = ?').get(username);
    db.close();

    if (!admin) {
      return { success: false, error: 'Username atau password salah.' };
    }

    const isValid = await bcrypt.compare(password, admin.password_hash);
    if (!isValid) {
      return { success: false, error: 'Username atau password salah.' };
    }

    await createSession({ id: admin.id, username: admin.username });
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

  // Handle image upload (currently still saving locally)
  // If user wants to migrate to Supabase Storage, they can update this part
  let imageSrc = '/images/village-landscape.png';
  const imageFile = formData.get('image');
  
  if (imageFile && imageFile.size > 0) {
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const uniqueSuffix = crypto.randomBytes(8).toString('hex');
    const fileName = `${uniqueSuffix}-${imageFile.name.replace(/\s+/g, '-')}`;
    const filePath = path.join(process.cwd(), 'public', 'images', fileName);
    
    fs.writeFileSync(filePath, buffer);
    imageSrc = `/images/${fileName}`;
  } else {
    // Choose default image based on category if no image is uploaded
    if (kategori.includes('Food') || kategori.includes('Makanan') || kategori.includes('Kuliner')) {
        imageSrc = '/images/nasi-pecel.png';
    } else if (kategori.includes('Clothing') || kategori.includes('Fashion')) {
        imageSrc = '/images/batik-clothing.png';
    } else if (kategori.includes('Kerajinan')) {
        imageSrc = '/images/kerajinan-tangan.png';
    } else if (kategori.includes('Jasa')) {
        imageSrc = '/images/jasa-service.png';
    } else if (kategori.includes('Minuman')) {
        imageSrc = '/images/es-teh.png';
    }
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

    const id = crypto.randomUUID();

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
          imageSrc
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
