import axios from 'axios'

const API_KEY = import.meta.env.VITE_NEWS_API_KEY
const BASE_URL = 'https://newsapi.org/v2'

const buildUrl = (endpoint, params = {}) => {
  const url = new URL(`${BASE_URL}${endpoint}`)
  url.searchParams.append('apiKey', API_KEY)
  Object.keys(params).forEach(key => 
    params[key] && url.searchParams.append(key, params[key])
  )
  return url.toString()
}

export const getTopHeadlines = async (country = 'us', page = 1, pageSize = 10, language = 'en') => {
  const url = buildUrl('/top-headlines', { country, page, pageSize, language })
  const response = await axios.get(url)
  return response.data
}

export const getByCategory = async (category, country = 'us', page = 1, pageSize = 10, language = 'en') => {
  const url = buildUrl('/top-headlines', { category, country, page, pageSize, language })
  const response = await axios.get(url)
  return response.data
}

export const searchNews = async (query, page = 1, pageSize = 10, sortBy = 'publishedAt', language = 'en', from = null) => {
  const params = { q: query, page, pageSize, sortBy, language }
  if (from) params.from = from
  const url = buildUrl('/everything', params)
  const response = await axios.get(url)
  return response.data
}