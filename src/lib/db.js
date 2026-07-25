import { supabase } from './supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qlrwbstgczhdgxjlobzz.supabase.co';

function formatImageSrc(imgSrc) {
  if (!imgSrc) return null;
  if (imgSrc.startsWith('http') || imgSrc.startsWith('/')) return imgSrc;
  return `${supabaseUrl}/storage/v1/object/public/umkm-images/${imgSrc}`;
}

export async function getUmkms() {
  try {
    const { data, error } = await supabase
      .from('umkms')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) {
      console.error('Error fetching UMKMs from Supabase:', error.message || error);
      return [];
    }

    return (data || []).map(umkm => ({
      ...umkm,
      imageSrc: formatImageSrc(umkm.imgSrc)
    }));
  } catch (error) {
    console.error('Error fetching UMKMs:', error);
    return [];
  }
}

export async function getUmkmBySlug(slug) {
  try {
    const { data: umkm, error } = await supabase
      .from('umkms')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching UMKM by slug from Supabase:', error.message || error);
      return null;
    }

    if (!umkm) return null;
    
    return {
      ...umkm,
      imageSrc: formatImageSrc(umkm.imgSrc)
    };
  } catch (error) {
    console.error('Error fetching UMKM by slug:', error);
    return null;
  }
}
