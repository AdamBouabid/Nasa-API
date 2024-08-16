const API_URL = 'https://localhost:5000'

async function httpGetPlanets() {
  // TODO: Once API is ready.
  // Load planets and return as JSON.
}

async function httpGetLaunches() {
  // TODO: Once API is ready.
  // Load launches, sort by flight number, and return as JSON.
  console.log(`Fetching launches`)
  const response =  fetch(`${API_URL}/v1/launches`, {
    method: 'GET',
  })
  const fetchedLaunches = await response.json()
  return fetchedLaunches.sort((a, b) => a.flightNumber - b.flightNumber)

}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
  try{
    return await fetch(`${API_URL}/v1/launches`, {
    method: 'POST',
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(launch)
  })
  }catch (err){
    return {
      ok:false
    }
  }

}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
  try{
    return await fetch(`${API_URL}/launches/v1/${id}`, {
      method: 'DELETE'
    })
  }catch(err) {
    console.log(err)
    return{
      ok:false
    }
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};