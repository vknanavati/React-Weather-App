import { useState } from 'react';
import { Container, Grid, Typography, TextField, Button, Box } from '@mui/material';
import {makeStyles} from '@mui/styles';

console.log(process.env)

const useStyles = makeStyles({
  weatherData: {
    color:"#6B117D",
  }
})

function App() {
  const classes = useStyles();

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");

  const handleCity = e => {
    setCity(e.target.value)
  }

  const handleClick = (event) => {
    event.preventDefault()
    console.log("Searching city: ", city, process.env.REACT_APP_API_KEY)

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`)
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
          variant="h4"
          sx={{marginTop: 7, marginBottom: 4, color: "#953ef7"}}
        >
          Current Weather
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
                sx={{
                  width: 250,
                  "& .MuiInputBase-root":{
                    height: 50
                  }
                }}
                id="city"
                type="text"
                placeholder="enter city"
                value={city}
                onChange={handleCity}
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                sx={{backgroundColor: "#953ef7",
                "&:hover": {
                  backgroundColor: "#953ef7",
                }
                }}
                onClick={e => handleClick(e)}
              >Search
              </Button>
            </Grid>
          </Grid>
        </form>
        {weather && (
          <Box
            textAlign={"center"}
            padding={2}
            height={250}
            width={250}
            borderRadius={5}
            marginTop={6}
            backgroundColor={"#d6b4fc"}
            fontSize={20}
            lineHeight={1}
            >
          <Typography className={classes.weatherData} sx={{fontSize: 24, marginTop: 1}}>{weather.name}</Typography>
          <img alt="weather-image" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
          <Typography className={classes.weatherData} sx={{fontSize: 24, marginTop:3 }}>{weather.weather[0].description}</Typography>
          <Typography className={classes.weatherData} sx={{fontSize: 24}}>{weather.main.temp.toFixed(1)} °F</Typography>
        </Box>

        ) }
      </Grid>
    </Container>


  );
}

export default App;
