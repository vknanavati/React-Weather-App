import { useState } from 'react';
import { Container, Grid, Typography, TextField, Button, Box } from '@mui/material';

const API_KEY = 'e6d7ae5f1ecb4b18940c284e8e5da8f9'


function App() {

  const [city, setCity] = useState("");
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
        setWeather(data)
      })
  }


  return (

    <Container>
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        direction={"column"}
      >
        <Typography
          variant="h5"
          sx={{marginTop: 3}}
        >
          Weather App
        </Typography>
        <form>
          <Grid
            container
            spacing={2}
            alignItems={"center"}
            sx={{marginTop: 1}}
          >
            <Grid item>
              <TextField
                id="city"
                type="text"
                placeholder="enter city"
                value={city}
                onChange={handleCity}
              />
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                onClick={e => handleClick(e)}
              >Search
              </Button>
            </Grid>
          </Grid>
        </form>
        <Box
          textAlign={"center"}
          padding={4}
          height={250}
          width={250}
          borderRadius={5}
          sx={{marginTop:6, border: 1}}
          >
          <p>{weather.name}</p>
          {weather && <p><img alt="weather-image" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} /> </p>}
          {weather && <p>{weather.weather[0].description}</p>}
          {weather && <p>{weather.main.temp.toFixed(1)} °F</p>}
        </Box>
      </Grid>
    </Container>


  );
}

export default App;
