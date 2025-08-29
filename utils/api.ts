import { ref } from 'vue'

// Use Nuxt runtime config for API base URL
const config = useRuntimeConfig()
const BASE_URL = config.public.apiBaseUrl

function getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('access_token')
  }
  return null
}

type HeadersObj = Record<string, string>
type QueryParams = Record<string, any>

// Function to parse and format API errors
function parseApiError(errorText: string): string {
  try {
    const errorObj = JSON.parse(errorText)
    
    // Handle Banister custom error format
    if (errorObj?.description) {
      return errorObj.description
    }
    
    if (errorObj?.title) {
      return errorObj.title
    }
    
    // Handle standard Django DRF errors
    if (errorObj?.error?.error_message) {
      return errorObj.error.error_message
    }
    
    if (errorObj?.error) {
      return errorObj.error
    }
    
    if (errorObj?.message) {
      return errorObj.message
    }
    
    if (errorObj?.detail) {
      return errorObj.detail
    }
    
    return errorText
  } catch (e) {
    return errorText
  }
}

// Helper function to build query string
function buildQueryString(params: QueryParams): string {
  const searchParams = new URLSearchParams()
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach(item => searchParams.append(key, String(item)))
      } else {
        searchParams.append(key, String(value))
      }
    }
  })
  
  const queryString = searchParams.toString()
  return queryString ? `?${queryString}` : ''
}

async function request(
  endpoint: string,
  method: string = 'GET',
  data?: any,
  options: {
    headers?: HeadersObj
    params?: QueryParams
  } = {}
): Promise<any> {
  const { headers: customHeaders = {}, params } = options
  
  const headers: HeadersObj = {
    'Content-Type': 'application/json',
    ...customHeaders,
  }

  const token = getToken()
  if (token) headers['Authorization'] = `Bearer ${token}`

  // Build full URL with query parameters
  const queryString = params ? buildQueryString(params) : ''
  const fullUrl = BASE_URL + endpoint + queryString

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
    const res = await fetch(fullUrl, opts)
    clearTimeout(timeoutId); // Clear timeout on success

    if (!res.ok) {
      const errorText = await res.text()
      const formattedError = parseApiError(errorText)
      throw new Error(formattedError)
    }

    if (res.status === 204) return null
    return await res.json().catch(() => ({}))
  } catch (error) {
    clearTimeout(timeoutId);
    throw error
  }
}

export function useApi() {
  return {
    get: (endpoint: string, options?: { headers?: HeadersObj; params?: QueryParams }) => 
      request(endpoint, 'GET', undefined, options),
    post: (endpoint: string, data?: any, options?: { headers?: HeadersObj; params?: QueryParams }) => 
      request(endpoint, 'POST', data, options),
    put: (endpoint: string, data?: any, options?: { headers?: HeadersObj; params?: QueryParams }) => 
      request(endpoint, 'PUT', data, options),
    patch: (endpoint: string, data?: any, options?: { headers?: HeadersObj; params?: QueryParams }) => 
      request(endpoint, 'PATCH', data, options),
    delete: (endpoint: string, options?: { headers?: HeadersObj; params?: QueryParams }) => 
      request(endpoint, 'DELETE', undefined, options),
    request,
  }
}
