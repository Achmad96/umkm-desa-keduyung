import { supabase } from './supabase';

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

    // Adapt casing since Supabase might have returned exactly what we defined
    return data || [];
  } catch (error) {
    console.error('Error fetching UMKMs:', error);
    return [];
  }
}

export async function getUmkmBySlug(slug) {
  try {
    const { data, error } = await supabase
      .from('umkms')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching UMKM by slug from Supabase:', error.message || error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching UMKM by slug:', error);
    return null;
  }
}
