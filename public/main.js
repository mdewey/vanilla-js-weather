// const for the page
const API_KEY = '5c418bd61b262dfeab5ee02852a70c07'
const API_BASE_URL = `https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=${API_KEY}`

const displayResults = (message, weather) => {
  // find where we want to put it
  const parent = document.querySelector('.display')
  // reset the content
  parent.textContent = ''
  // create and add the message
  const title = document.createElement('h2')
  title.textContent = message
  parent.appendChild(title)
  if (weather) {
    parent.classList.remove('error')
    parent.classList.add('success')
    const weatherDisplay = document.createElement('p')
    weatherDisplay.textContent = `${weather.main.temp}°`.toLowerCase()
    const weatherIcon = document.createElement('img')
    weatherIcon.src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
    parent.appendChild(weatherIcon)
    parent.appendChild(weatherDisplay)
  } else {
    parent.classList.remove('success')
    parent.classList.add('error')
  }
}

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
    displayResults(`Currently in ${location}`, weatherData)
  } else if (apiResponse.status === 404) {
    // display message for the user when the city was not found
    displayResults('Location was not found, double check your city. ')
  } else {
    // display message for the user that where was an
    displayResults(
      'There was an issue communication with the API, please try again'
    )
  }
}

// main method to init event listeners
const main = () => {
  document
    .querySelector('#search-form')
    .addEventListener('submit', handleSubmit)
}

document.addEventListener('DOMContentLoaded', main)
