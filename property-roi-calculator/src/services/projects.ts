import { supabase } from '../lib/supabase';
import type { Project } from '../types/property';

const TABLE = 'projects';

export async function saveProject(project: Project) {
  const { data, error } = await supabase.from(TABLE).upsert(project).select();
  if (error) throw error;
  return data?.[0] as Project;
}

export async function loadProject(id: string) {
  const { data, error } = await supabase.from(TABLE).select('*').eq('id', id).single();
  if (error) throw error;
  return data as Project;
}

export async function listProjects(userId: string) {
  const { data, error } = await supabase.from(TABLE).select('*').eq('userId', userId).order('updatedAt', { ascending: false });
  if (error) throw error;
  return data as Project[];
}
