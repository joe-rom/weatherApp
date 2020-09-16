import React, { useState } from "react";
import styled from "styled-components";
import Meteogram from './Meteogram/Meteogram';
import WeatherTable from './WeatherTable/WeatherTable';
import moment from 'moment';

import fetchForeCasts from './services/fetchForecasts';
import { cities } from './constants/constants';

const Main = styled("div")`
  font-family: sans-serif;
  background: #f0f0f0;
  height: 100vh;
`;

const DropDownContainer = styled("div")`
  width: 12.5em;
  margin: 0 auto;
  text-align:center;
`;

const DropDownHeader = styled("div")`
  margin-bottom: 0.8em;
  padding: 0.4em 2em 0.4em 1em;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  font-size: 1.3rem;
  color: #3faffa;
  background: #ffffff;
`;

const DropDownListContainer = styled("div")``;

const DropDownList = styled("ul")`
  padding: 0;
  margin: 0;
  padding-left: 1em;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  color: #3faffa;
  font-size: 1.3rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.8em;
  }
  position: absolute;
  margin: 0 auto;
`;

const ListItem = styled("li")`
  list-style: none;
  margin-bottom: 0.8em;
  width: 10.5em;
  cursor:pointer;
`;

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  const [temperature, setTemperature] = useState();
  const [precipitation, setPrecipitation] = useState();
  const [windSpeed, setWindSpeed] = useState();
  const [windDirection, setWindDirection] = useState();
  const [timeForecast, setTimeForecast] = useState();

  const [selectedOption, setSelectedOption] = useState(null);

  const [isErroed, setError] = useState(false);
  
  const date = moment().format('MMMM Do YYYY');

  const toggling = () => setIsOpen(!isOpen);

  // Decided not cache any data cause dont know how often data gets updated on backend service
  const handleForeCastResposne = (data) => {
    // Asumming here api always returns data
    const forecasts = data.countries[0].locations[0].part_day_forecasts.forecasts;

    const temperatureForecast = [];
    const precipitationForecast = [];
    const windSpeedForectas = [];
    const windDirectionForecast = [];
    const timeForecast = [];

    forecasts.forEach(forecast => {
      forecast.temperature && temperatureForecast.push(forecast.temperature);
      forecast.rain_prob && precipitationForecast.push(forecast.rain_prob);
      forecast.wind_speed && windSpeedForectas.push(forecast.wind_speed);
      forecast.wind_direction_compass && windDirectionForecast.push(forecast.wind_direction_compass);
      forecast.local_time && timeForecast.push( moment(forecast.local_time).format('dddd hh:mm a'));
    });

    if (temperatureForecast && precipitationForecast &&
        windSpeedForectas && windDirectionForecast) {
      setTemperature(temperatureForecast);
      setPrecipitation(precipitationForecast);
      setWindSpeed(windSpeedForectas);
      setWindDirection(windDirectionForecast);
      setTimeForecast(timeForecast);
      return;
    }
    return setError(true)
  }

  const onOptionClicked = (cityName, code) => () => {
    setSelectedOption(cityName);
    setIsOpen(false);
  
    fetchForeCasts(code)
      .then(data => handleForeCastResposne(data))
  };

  if (isErroed) return <h1>{"Something went wrong"}</h1>

  return (
    <Main>
      <h1>{date}</h1>
      <DropDownContainer>
        <DropDownHeader onClick={toggling}>
          {selectedOption || 'Select a city'}
        </DropDownHeader>
        {isOpen && (
          <DropDownListContainer>
            <DropDownList>
              {cities.map(city => (
                <ListItem onClick={onOptionClicked(city.name, city.code)} key={Math.random()}>
                  {city.name}
                </ListItem>
              ))}
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>
      <Meteogram
        temperatureForecast={temperature}
        precipitationForecast={precipitation}
        windSpeedForecast={windSpeed}
        windDirectionForecast={windDirection}
        timeForecast={timeForecast}/>

      {timeForecast && 
        <WeatherTable
        timeForecast={timeForecast}
        temperatureForecast={temperature}
        precipitationForecast={precipitation}
        windSpeedForecast={windSpeed}
        windDirectionForecast={windDirection} />}
    </Main>
  );
};
