import { useState } from 'react';

const API_KEY = 'e6d7ae5f1ecb4b18940c284e8e5da8f9'


function App() {

  const [city, setCity] = useState("")
  const [name, setName] = useState("")

  const handleCity = e => {
    setCity(e.target.value)
  }

  const handleClick = (event) => {
    event.preventDefault()
    console.log("Searching city: ", city, API_KEY)

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setName(data.name)
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
      <p>{name}</p>

    </>
  );
}

export default App;
