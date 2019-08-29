import apisauce from 'apisauce'
const create = (baseURL = '') => {
  
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    },
    timeout: 10000
  })
  
  const fetchUrl = (link:string) => api.get(link)

  return {
    fetchUrl
  }
}

export default {create}