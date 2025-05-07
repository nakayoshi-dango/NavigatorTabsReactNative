// StorageManager.js
import { supabase } from './supabaseClient';

export const StorageManager = {
  // Subir archivo
  async uploadFile(filePath, fileBuffer, mimeType) {
    const { data, error } = await supabase
      .storage
      .from('public-files') 
      .upload(filePath, fileBuffer, {
        contentType: mimeType, 
      });
      return { data, error };
  },

  // Obtener URL pública
  async getDownloadUrl(filePath) {
    const { data, error } = await supabase.storage
      .from('public-files')
      .getPublicUrl(filePath);
    if (error) throw error;
    return data.publicUrl;
  },

  // Listar archivos y "carpetas"
  async listFolder(folderPath) {
    const { data, error } = await supabase.storage
      .from('public-files')
      .list(folderPath, { limit: 100, offset: 0, sortBy: { column: 'name', order: 'asc' } });
    if (error) throw error;
    return data;
  },

  // Crear carpeta ficticia (sube archivo vacío)
  async createFolder(folderPath) {
    const safePath = folderPath.replace(/^\/+/, ''); // elimina / inicial
    const uploadPath = `${safePath}/.init`;
  
    const emptyBytes = new Uint8Array(); // evita problemas con Blob en RN
  
    const { error } = await supabase.storage
      .from('public-files')
      .upload(uploadPath, emptyBytes, { upsert: true });
  
    if (error) {
      console.error("SUPABASE ERROR", error);
      throw error;
    }
  },

  // Borrar archivo o carpeta (carpeta = borrar cada archivo dentro)
  async deleteItem(path) {
    const { error } = await supabase.storage
      .from('public-files')
      .remove([path]);
    if (error) throw error;
  },

  // Renombrar (sube de nuevo y borra el anterior)
  async renameItem(oldPath, newPath) {
    const { data, error: downloadError } = await supabase.storage
      .from('public-files')
      .download(oldPath);
    if (downloadError) throw downloadError;

    const { error: uploadError } = await supabase.storage
      .from('public-files')
      .upload(newPath, data, { upsert: true });
    if (uploadError) throw uploadError;

    const { error: deleteError } = await supabase.storage
      .from('public-files')
      .remove([oldPath]);
    if (deleteError) throw deleteError;
  }
};
