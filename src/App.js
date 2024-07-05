import { useState, useEffect } from 'react';

const API_KEY = '3d7a17012bef44deac1453d0f9b74f19'


function App() {

  const [city, setCity] = useState("")

  const handleCity = e => {
    setCity(e.target.value)
  }

  const handleClick = (event) => {
    event.preventDefault()
    console.log("Searching city: ", city, API_KEY)

    fetch(`https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&units=I&key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
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
    </>
  );
}

export default App;
