import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const createData = (time, temperature, rain, windSpeed, windDirection) => (
  {
    time,
    temperature,
    rain,
    windSpeed,
    windDirection 
  });

const WeatherTable = ({ 
  timeForecast,
  temperatureForecast,
  precipitationForecast,
  windSpeedForecast,
  windDirectionForecast}) => {

  const classes = useStyles();

  const rows = timeForecast.map((_, index) => 
    createData(
      timeForecast[index],
      temperatureForecast[index],
      precipitationForecast[index],
      windSpeedForecast[index],
      windDirectionForecast[index]));

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="weather table">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell align="right">Temperature in °C </TableCell>
            <TableCell align="right">% Precipitation Probability</TableCell>
            <TableCell align="right">Wind Speed in Km/h</TableCell>
            <TableCell align="right">Wind Direction</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.time}>
              <TableCell component="th" scope="row">
                {row.time}
              </TableCell>
              <TableCell align="right">{row.temperature}</TableCell>
              <TableCell align="right">{row.rain}</TableCell>
              <TableCell align="right">{row.windSpeed}</TableCell>
              <TableCell align="right">{row.windDirection}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default WeatherTable;