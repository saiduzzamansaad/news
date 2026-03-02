import axios from 'axios'

const API_KEY = import.meta.env.VITE_NEWS_API_KEY
const BASE_URL = 'https://newsapi.org/v2'

// Helper to add API key and optional params
const buildUrl = (endpoint, params = {}) => {
  const url = new URL(`${BASE_URL}${endpoint}`)
  url.searchParams.append('apiKey', API_KEY)
  Object.keys(params).forEach(key => 
    params[key] && url.searchParams.append(key, params[key])
  )
  return url.toString()
}

export const getTopHeadlines = async (country = 'us', page = 1, pageSize = 10) => {
  const url = buildUrl('/top-headlines', { country, page, pageSize })
  const response = await axios.get(url)
  return response.data
}

export const getByCategory = async (category, country = 'us', page = 1, pageSize = 10) => {
  const url = buildUrl('/top-headlines', { category, country, page, pageSize })
  const response = await axios.get(url)
  return response.data
}

export const searchNews = async (query, page = 1, pageSize = 10, sortBy = 'publishedAt') => {
  const url = buildUrl('/everything', { q: query, page, pageSize, sortBy })
  const response = await axios.get(url)
  return response.data
}

