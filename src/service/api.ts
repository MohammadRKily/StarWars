import apisauce from 'apisauce'


const create = (baseURL = 'https://swapi.co/api') => {
  
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    },
    timeout: 10000
  })
 
  const getPeople = (page:number) => api.get('people/?page='+page)
  const getPlanet = (planet:number) => api.get('planets/'+planet)
  const getPlanets = (page:number) => api.get('planets/?page='+page)
  const getMovie = (id:number) => api.get('films/'+id)
  const getVehicles = (page:number) => api.get('vehicles/?page='+page)
  const getStarships = (page:number) => api.get('starships/?page='+page)

  //
  return {
    getPeople,
    getPlanet,
    getMovie,
    getPlanets,
    getVehicles,
    getStarships
    
  }
}

export default {
  create
}