// const for the page
const API_KEY = '5c418bd61b262dfeab5ee02852a70c07'
const API_BASE_URL = `https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=${API_KEY}`

// form submit event
const handleSubmit = async e => {
  // disable form submit data back to server
  // allows us to do an AJAX call instead of POST
  e.preventDefault()
  console.log('submitting')
  const location = document.querySelector('#searchBox').value
  const apiResponse = await fetch(`${API_BASE_URL}&q=${location}`)
  // see what we get back
  console.log(apiResponse)
  // if it was successful, display the weather data
  if (apiResponse.status === 200) {
    const weatherData = await apiResponse.json()
    console.log(weatherData)
    // display message for the user that where was an
    document.querySelector('.error-message').textContent = ''
    document.querySelector(
      '.location-display'
    ).textContent = `Currently in ${location}`
    document.querySelector(
      '.current-weather'
    ).textContent = `${weatherData.main.temp}° and ${weatherData.weather[0].main}`.toLowerCase()
  } else if (apiResponse.status === 404) {
    // display message for the user when the city was not found
    document.querySelector('.error-message').textContent =
      'Location was not found, double check your city. '
    document.querySelector('.location-display').textContent = ''
    document.querySelector('.current-weather').textContent = ''
  } else {
    // display message for the user that where was an
    document.querySelector('.error-message').textContent =
      'There was an issue communication with the API, please try again'
    document.querySelector('.location-display').textContent = ''
    document.querySelector('.current-weather').textContent = ''
  }
}

// main method to init event listeners
const main = () => {
  document
    .querySelector('#search-form')
    .addEventListener('submit', handleSubmit)
}

document.addEventListener('DOMContentLoaded', main)
