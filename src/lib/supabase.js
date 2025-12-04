import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * Upload a file to Supabase Storage
 * @param {File} file - The file to upload
 * @param {string} bucketName - The storage bucket name
 * @param {string} folder - Optional folder path within the bucket
 * @returns {Promise<string>} The public URL of the uploaded file
 */
export const uploadFile = async (file, bucketName, folder = '') => {
  if (!file) return null

  try {
    // Generate a unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = folder ? `${folder}/${fileName}` : fileName

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      // If bucket doesn't exist or policy issue, log but don't fail completely
      if (error.message.includes('Bucket not found') || error.message.includes('new row violates row-level security')) {
        console.warn('Storage bucket or policy issue:', error.message)
        console.warn('Please create the storage bucket and set up storage policies')
        return null // Return null instead of throwing
      }
      console.error('Error uploading file:', error)
      throw error
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath)

    return publicUrl
  } catch (error) {
    console.error('File upload error:', error)
    // Don't throw - let the form submit without file
    return null
  }
}

