import { connection } from 'next/server';
import { supabase } from './supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qlrwbstgczhdgxjlobzz.supabase.co';

function formatImageSrc(imgSrc) {
  if (!imgSrc) return null;
  if (imgSrc.startsWith('http') || imgSrc.startsWith('/')) return imgSrc;
  return `${supabaseUrl}/storage/v1/object/public/umkm-images/${imgSrc}`;
}

export async function getUMKMs() {
  await connection();
  try {
    const { data, error } = await supabase
      .from('umkms')
      .select('*, umkm_images(*)')
      .order('createdAt', { ascending: false });

    if (error) {
      console.error('Error fetching UMKMs from Supabase:', error.message || error);
      return [];
    }

    return (data || []).map(umkm => ({
      ...umkm,
      imageSrc: formatImageSrc(umkm.imgSrc),
      galleryImages: (umkm.umkm_images || []).map(img => formatImageSrc(img.imgsrc)).filter(Boolean),
      galleryImagesData: (umkm.umkm_images || []).map(img => ({ id: img.id, url: formatImageSrc(img.imgsrc), rawName: img.imgsrc })).filter(item => item.url)
    }));
  } catch (error) {
    console.error('Error fetching UMKMs:', error);
    return [];
  }
}

export async function getUMKMBySlug(slug) {
  await connection();
  try {
    const { data: umkm, error } = await supabase
      .from('umkms')
      .select('*, umkm_images(*)')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching UMKM by slug from Supabase:', error.message || error);
      return null;
    }

    if (!umkm) return null;

    return {
      ...umkm,
      imageSrc: formatImageSrc(umkm.imgSrc),
      galleryImages: (umkm.umkm_images || []).map(img => formatImageSrc(img.imgsrc)).filter(Boolean),
      galleryImagesData: (umkm.umkm_images || []).map(img => ({ id: img.id, url: formatImageSrc(img.imgsrc), rawName: img.imgsrc })).filter(item => item.url)
    };
  } catch (error) {
    console.error('Error fetching UMKM by slug:', error);
    return null;
  }
}

export async function getUMKMById(id) {
  await connection();
  try {
    const { data: umkm, error } = await supabase
      .from('umkms')
      .select('*, umkm_images(*)')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching UMKM by id from Supabase:', error.message || error);
      return null;
    }

    if (!umkm) return null;

    return {
      ...umkm,
      imageSrc: formatImageSrc(umkm.imgSrc),
      galleryImages: (umkm.umkm_images || []).map(img => formatImageSrc(img.imgsrc)).filter(Boolean),
      galleryImagesData: (umkm.umkm_images || []).map(img => ({ id: img.id, url: formatImageSrc(img.imgsrc), rawName: img.imgsrc })).filter(item => item.url)
    };
  } catch (error) {
    console.error('Error fetching UMKM by id:', error);
    return null;
  }
}
