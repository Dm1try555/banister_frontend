import { ref } from 'vue'

const BASE_URL = 'http://localhost:8000/api/v1/'

function getToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('access_token')
  }
  return null
}

type HeadersObj = Record<string, string>

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

  const opts: RequestInit = {
    method,
    headers,
  }
  if (data) {
    if (typeof FormData !== 'undefined' && data instanceof FormData) {
      // Явно приводим к Record<string, string> для удаления Content-Type
      if (opts.headers && typeof opts.headers === 'object') {
        delete (opts.headers as Record<string, string>)['Content-Type']
      }
      opts.body = data
    } else {
      opts.body = JSON.stringify(data)
    }
  }

  const res = await fetch(BASE_URL + endpoint, opts)
  if (!res.ok) throw new Error(await res.text())
  if (res.status === 204) return null
  return await res.json().catch(() => ({}))
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