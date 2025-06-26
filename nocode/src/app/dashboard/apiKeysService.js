import { supabase } from "../supabaseClient";

export async function fetchApiKeys() {
  const { data, error } = await supabase.from('api_keys').select('*');
  return { data, error };
}

export async function createApiKey(newKey) {
  const { data, error } = await supabase.from('api_keys').insert([newKey]).select();
  return { data, error };
}

export async function updateApiKey(id, updatedFields) {
  const { data, error } = await supabase.from('api_keys').update(updatedFields).eq('id', id).select();
  return { data, error };
}

export async function deleteApiKey(id) {
  const { error } = await supabase.from('api_keys').delete().eq('id', id);
  return { error };
} 