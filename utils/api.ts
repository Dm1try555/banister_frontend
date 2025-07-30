import { ref } from 'vue'

const BASE_URL = 'http://localhost:8000/api/v1/'

function getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('access_token')
  }
  return null
}

type HeadersObj = Record<string, string>

// Function to parse and format API errors
function parseApiError(errorText: string): string {
  try {
    const errorObj = JSON.parse(errorText)
    console.log('Разобранный объект ошибки:', errorObj)
    
    // Обработка разных структур ответа
    if (errorObj?.error?.error_message) {
      const errorMessage = errorObj.error.error_message
      
      // Проверка, содержит ли error_message ошибки валидации (формат Django REST framework)
      if (typeof errorMessage === 'string' && (errorMessage.includes('ErrorDetail') || errorMessage.includes('This field'))) {
        try {
          const cleanedMessage = errorMessage.replace(/^'|'$/g, '').replace(/\\'/g, "'")
          const validationErrors = JSON.parse(cleanedMessage)
          
          const errorMessages = []
          for (const [field, errors] of Object.entries(validationErrors)) {
            if (Array.isArray(errors)) {
              errors.forEach((error: any) => {
                const message = error.string || error.message || error
                errorMessages.push(`${field.charAt(0).toUpperCase() + field.slice(1)}: ${message}`)
              })
            } else if (typeof errors === 'string') {
              errorMessages.push(`${field.charAt(0).toUpperCase() + field.slice(1)}: ${errors}`)
            }
          }
          
          return errorMessages.length > 0 ? errorMessages.join('. ') : errorMessage
        } catch (parseError) {
          console.log('Не удалось разобрать ошибки валидации:', parseError)
          return errorMessage
        }
      }
      
      return errorMessage
    }
    
    if (errorObj?.error) {
      // Обработка вложенного объекта error
      if (errorObj.error.detail) return errorObj.error.detail
      if (errorObj.error.message) return errorObj.error.message
      if (typeof errorObj.error === 'string') return errorObj.error
      return JSON.stringify(errorObj.error) // Резервный вариант — строка из объекта ошибки
    }
    
    if (errorObj?.error_message) {
      return errorObj.error_message
    }
    
    if (errorObj?.message) {
      return errorObj.message
    }
    
    if (errorObj?.detail) {
      return errorObj.detail
    }
    
    // Если конкретное сообщение об ошибке не найдено, возвращаем исходный текст
    return errorText
  } catch (e) {
    console.log('Не удалось разобрать ошибку как JSON:', e)
    return errorText
  }
}

async function request(
  endpoint: string,
  method: string = 'GET',
  data?: any,
  customHeaders: HeadersObj = {}
): Promise<any> {
  const headers: HeadersObj = {
    'Content-Type': 'application/json',
    ...customHeaders,
  }

  const token = getToken()
  if (token) headers['Authorization'] = `Bearer ${token}`

  // Create AbortController for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000); // 20 seconds timeout

  const opts: RequestInit = {
    method,
    headers,
    signal: controller.signal
  }

  if (data) {
    if (typeof FormData !== 'undefined' && data instanceof FormData) {
      // Explicitly cast to Record<string, string> to remove Content-Type
      if (opts.headers && typeof opts.headers === 'object') {
        delete (opts.headers as Record<string, string>)['Content-Type']
      }
      opts.body = data
    } else {
      opts.body = JSON.stringify(data)
    }
  }

  try {
    const res = await fetch(BASE_URL + endpoint, opts)
    clearTimeout(timeoutId); // Clear timeout on success

    if (!res.ok) {
      const errorText = await res.text()
      console.log('API Error Response:', errorText)
      
      // Parse and format the error message
      const formattedError = parseApiError(errorText)
      throw new Error(formattedError)
    }

    if (res.status === 204) return null
    return await res.json().catch(() => ({}))
  } catch (error) {
    clearTimeout(timeoutId); // Clear timeout on error
    
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new Error('Connection error. Please make sure the backend is running at http://localhost:8000')
    }
    
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Timeout waiting for server response')
    }
    
    if (error instanceof Error && error.message.includes('ECONNABORTED')) {
      throw new Error('Connection to the server was interrupted')
    }
    
    throw error
  }
}

export function useApi() {
  return {
    get: (endpoint: string, headers?: HeadersObj) => request(endpoint, 'GET', undefined, headers),
    post: (endpoint: string, data?: any, headers?: HeadersObj) => request(endpoint, 'POST', data, headers),
    put: (endpoint: string, data?: any, headers?: HeadersObj) => request(endpoint, 'PUT', data, headers),
    patch: (endpoint: string, data?: any, headers?: HeadersObj) => request(endpoint, 'PATCH', data, headers),
    delete: (endpoint: string, headers?: HeadersObj) => request(endpoint, 'DELETE', undefined, headers),
    request,
  }
}
