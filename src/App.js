import { useState } from 'react';

const API_KEY = 'e6d7ae5f1ecb4b18940c284e8e5da8f9'


function App() {

  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [weather, setWeather] = useState("");

  const handleCity = e => {
    setCity(e.target.value)
  }

  const handleClick = (event) => {
    event.preventDefault()
    console.log("Searching city: ", city, API_KEY)

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setName(data.name)
        setWeather(data)
      })
  }


  return (
    <>
      <h1>Weather App</h1>
      <form>
        <div>
          <input
            id="city"
            type="text"
            placeholder="enter city"
            value={city}
            onChange={handleCity}
          />
          <button
            onClick={e => handleClick(e)}
          >Search</button>
        </div>
      </form>
      <p>{weather.name}</p>
      {weather && <p><img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} /> </p>}
      {weather && <p>{weather.weather[0].description}</p>}
      {weather && <p>{weather.main.temp} °F</p>}

    </>
  );
}

export default App;
