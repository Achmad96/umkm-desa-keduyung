'use server';

import { supabaseAdmin } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import crypto from 'crypto';
import { createSession, getSession } from '@/lib/auth';
import { getUMKMById } from '@/lib/db';

export async function getUMKMByIdAction(id) {
  const session = await getSession();
  const isAdmin = !!session;

  try {
    const umkm = await getUMKMById(id);
    if (!umkm) {
      return { success: false, error: 'UMKM tidak ditemukan.', isAdmin };
    }
    return { success: true, data: umkm, isAdmin };
  } catch (error) {
    console.error('Error fetching UMKM by ID:', error);
    return { success: false, error: 'Gagal memuat data UMKM.', isAdmin };
  }
}

export async function checkSessionAction() {
  const session = await getSession();
  return { isAdmin: !!session };
}

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

export async function registerUMKM(formData) {
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

    // Process gallery images if present
    const galleryImages = formData.getAll('galleryImages');
    const validGalleryImages = galleryImages.filter(file => file && file.size > 0);
    
    if (validGalleryImages.length > 0) {
      const galleryInserts = [];
      
      for (let i = 0; i < validGalleryImages.length; i++) {
        const gFile = validGalleryImages[i];
        const gArrayBuffer = await gFile.arrayBuffer();
        const gBuffer = Buffer.from(gArrayBuffer);
        const gExt = gFile.name.split('.').pop() || 'jpg';
        const gFileName = `${id}-gallery-${i}-${crypto.randomBytes(4).toString('hex')}.${gExt}`;
        
        const { error: gUploadError } = await supabaseAdmin.storage
          .from('umkm-images')
          .upload(gFileName, gBuffer, {
            contentType: gFile.type || 'image/jpeg',
          });
          
        if (!gUploadError) {
          const { data: gPublicUrlData } = supabaseAdmin.storage
            .from('umkm-images')
            .getPublicUrl(gFileName);
            
          galleryInserts.push({
            umkm_id: id,
            imgSrc: gPublicUrlData.publicUrl
          });
        }
      }
      
      if (galleryInserts.length > 0) {
        await supabaseAdmin.from('umkm_images').insert(galleryInserts);
      }
    }

    revalidatePath('/umkm');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error inserting UMKM:', error);
    return { success: false, error: 'Gagal mendaftar. Silakan coba lagi.' };
  }
}

export async function deleteUMKM(id) {
  const session = await getSession();
  if (!session) {
    return { success: false, error: 'Unauthorized: Harap login terlebih dahulu.' };
  }

  try {
    // First, get the UMKM to find the image path
    const { data: umkm, error: fetchError } = await supabaseAdmin
      .from('umkms')
      .select('imgSrc')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('Error fetching UMKM for deletion:', fetchError);
      return { success: false, error: 'UMKM tidak ditemukan.' };
    }

    // Delete image from storage if it exists and is stored in Supabase
    if (umkm?.imgSrc && !umkm.imgSrc.startsWith('/')) {
      // Extract filename from URL or use imgSrc directly
      let fileName = umkm.imgSrc;
      if (fileName.includes('/')) {
        fileName = fileName.split('/').pop();
      }
      await supabaseAdmin.storage.from('umkm-images').remove([fileName]);
    }

    // Delete the UMKM record
    const { error } = await supabaseAdmin
      .from('umkms')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting UMKM:', error);
      return { success: false, error: 'Gagal menghapus UMKM. Silakan coba lagi.' };
    }

    revalidatePath('/umkm');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error deleting UMKM:', error);
    return { success: false, error: 'Gagal menghapus UMKM. Silakan coba lagi.' };
  }
}

export async function updateUMKM(id, formData) {
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

  let whatsappLink = formData.get('whatsappLink') || '';
  if (!whatsappLink && telepon) {
    let cleanPhone = telepon.replace(/\D/g, '');
    if (cleanPhone.startsWith('0')) {
      cleanPhone = '62' + cleanPhone.substring(1);
    }
    whatsappLink = `https://wa.me/${cleanPhone}`;
  }

  try {
    let normalizedCategory = kategori;
    if (kategori === 'Food & Drink') normalizedCategory = 'Makanan';
    else if (kategori === 'Clothing & Apparel') normalizedCategory = 'Fashion';
    else if (kategori === 'Kerajinan Tangan') normalizedCategory = 'Kerajinan';
    else if (kategori === 'Jasa & Layanan') normalizedCategory = 'Jasa';

    const updateData = {
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
    };

    // Handle image upload if a new image is provided
    const imageFile = formData.get('image');
    if (imageFile && imageFile.size > 0) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const ext = imageFile.name.split('.').pop() || 'jpg';
      const fileName = `${id}.${ext}`;

      // Delete old image first (overwrite by using upsert: true)
      const { error: uploadError } = await supabaseAdmin.storage
        .from('umkm-images')
        .upload(fileName, buffer, {
          contentType: imageFile.type || 'image/jpeg',
          upsert: true,
        });

      if (uploadError) {
        console.error('Error uploading new image:', uploadError);
        return { success: false, error: 'Gagal mengunggah gambar baru.' };
      }

      const { data: publicUrlData } = supabaseAdmin.storage
        .from('umkm-images')
        .getPublicUrl(fileName);

      updateData.imgSrc = publicUrlData.publicUrl;
    }

    const { error } = await supabaseAdmin
      .from('umkms')
      .update(updateData)
      .eq('id', id);

    if (error) {
      console.error('Error updating UMKM:', error);
      return { success: false, error: 'Gagal memperbarui UMKM. Silakan coba lagi.' };
    }

    // Process new gallery images if present
    const galleryImages = formData.getAll('galleryImages');
    const validGalleryImages = galleryImages.filter(file => file && file.size > 0);
    
    if (validGalleryImages.length > 0) {
      const galleryInserts = [];
      
      for (let i = 0; i < validGalleryImages.length; i++) {
        const gFile = validGalleryImages[i];
        const gArrayBuffer = await gFile.arrayBuffer();
        const gBuffer = Buffer.from(gArrayBuffer);
        const gExt = gFile.name.split('.').pop() || 'jpg';
        const gFileName = `${id}-gallery-${Date.now()}-${crypto.randomBytes(4).toString('hex')}.${gExt}`;
        
        const { error: gUploadError } = await supabaseAdmin.storage
          .from('umkm-images')
          .upload(gFileName, gBuffer, {
            contentType: gFile.type || 'image/jpeg',
          });
          
        if (!gUploadError) {
          const { data: gPublicUrlData } = supabaseAdmin.storage
            .from('umkm-images')
            .getPublicUrl(gFileName);
            
          galleryInserts.push({
            umkm_id: id,
            imgSrc: gPublicUrlData.publicUrl
          });
        }
      }
      
      if (galleryInserts.length > 0) {
        await supabaseAdmin.from('umkm_images').insert(galleryInserts);
      }
    }

    revalidatePath('/umkm');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error updating UMKM:', error);
    return { success: false, error: 'Gagal memperbarui UMKM. Silakan coba lagi.' };
  }
}

