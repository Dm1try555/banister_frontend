// ============================================================================
// File Validation Utility
// ============================================================================

export interface FileValidationOptions {
  maxSize?: number // in bytes
  allowedTypes?: string[]
  allowedExtensions?: string[]
}

export interface FileValidationResult {
  isValid: boolean
  error?: string
}

/**
 * Default file validation options
 */
export const DEFAULT_FILE_OPTIONS: FileValidationOptions = {
  maxSize: 5 * 1024 * 1024, // 5MB
  allowedTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  allowedExtensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp']
}

/**
 * Validates a file against specified criteria
 */
export function validateFile(
  file: File, 
  options: FileValidationOptions = DEFAULT_FILE_OPTIONS
): FileValidationResult {
  const { maxSize = DEFAULT_FILE_OPTIONS.maxSize, allowedTypes = DEFAULT_FILE_OPTIONS.allowedTypes } = options

  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: `Неподдерживаемый тип файла. Разрешены: ${allowedTypes.join(', ')}`
    }
  }

  // Check file size
  if (file.size > maxSize) {
    const maxSizeMB = Math.round(maxSize / (1024 * 1024))
    return {
      isValid: false,
      error: `Размер файла не должен превышать ${maxSizeMB}MB`
    }
  }

  return { isValid: true }
}

/**
 * Creates a file preview URL
 */
export function createFilePreview(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        resolve(e.target.result as string)
      } else {
        reject(new Error('Failed to read file'))
      }
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsDataURL(file)
  })
}

/**
 * Formats file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * Gets file extension from filename
 */
export function getFileExtension(filename: string): string {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2)
}

/**
 * Checks if file extension is allowed
 */
export function isExtensionAllowed(
  filename: string, 
  allowedExtensions: string[] = DEFAULT_FILE_OPTIONS.allowedExtensions!
): boolean {
  const extension = getFileExtension(filename).toLowerCase()
  return allowedExtensions.includes(`.${extension}`)
}