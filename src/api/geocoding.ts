import type { NominatimSearchResult } from './types'

export async function searchCities(query: string, limit: number = 3): Promise<NominatimSearchResult[]> {
  const trimmedQuery = query.trim()
  if (!trimmedQuery) {
    return []
  }

  // Avoid `URL`/`URLSearchParams` for better old iOS Safari compatibility.
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(trimmedQuery)}&format=json&limit=${encodeURIComponent(
    limit.toString(),
  )}&accept-language=zh-CN&addressdetails=1`

  const res = await fetch(url, {
    headers: {
      'User-Agent': 'ClockDashboard/1.0',
    },
  })

  if (!res.ok) {
    throw new Error(`Geocoding API error: ${res.statusText}`)
  }

  const data = await res.json()
  if (Array.isArray(data) && data.length > 0) {
    return data as NominatimSearchResult[]
  }

  return []
}
