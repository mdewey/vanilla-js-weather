class WeatherSearchComponent {
  constructor() {
    // const for the page
    this.API_KEY = '5c418bd61b262dfeab5ee02852a70c07'
    this.API_BASE_URL = `https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=${this.API_KEY}`
  }

  getData = async () => {
    const location = document.querySelector('#searchBox').value
    const apiResponse = await fetch(`${this.API_BASE_URL}&q=${location}`)
    // see what we get back
    console.log(apiResponse)
    // if it was successful, display the weather data
    if (apiResponse.status === 200) {
      const weatherData = await apiResponse.json()
      console.log(weatherData)
      this.message = `Currently in ${location}`
      this.weather = weatherData
    } else if (apiResponse.status === 404) {
      // display message for the user when the city was not found
      this.message = 'Location was not found, double check your city.'
    } else {
      // display message for the user that where was an
      this.message =
        'There was an issue communication with the API, please try again'
    }
  }

  render = () => {
    // find where we want to put it
    const parent = document.querySelector('.display')
    // reset the content
    parent.textContent = ''
    // create and add the message
    const title = document.createElement('h2')
    title.textContent = this.message
    parent.appendChild(title)
    if (this.message) {
      parent.classList.remove('hide')
    }
    if (this.weather) {
      parent.classList.remove('error')
      parent.classList.add('success')
      const weatherDisplay = document.createElement('p')
      weatherDisplay.textContent = `${this.weather.main.temp}°`.toLowerCase()
      const weatherText = document.createElement('p')
      weatherText.textContent = `${this.weather.weather[0].description}`.toLowerCase()
      const weatherIcon = document.createElement('img')
      weatherIcon.src = `http://openweathermap.org/img/wn/${this.weather.weather[0].icon}@2x.png`
      parent.appendChild(weatherIcon)
      parent.appendChild(weatherDisplay)
      parent.appendChild(weatherText)
    } else {
      parent.classList.remove('success')
      parent.classList.add('error')
    }
  }
}

// form submit event
const handleSubmit = async e => {
  // disable form submit data back to server
  // allows us to do an AJAX call instead of POST
  e.preventDefault()
  console.log('submitting')
  const weather = new WeatherSearchComponent()
  await weather.getData()
  weather.render()
}

// main method to init event listeners
const main = () => {
  document
    .querySelector('#search-form')
    .addEventListener('submit', handleSubmit)
}

document.addEventListener('DOMContentLoaded', main)
