import React from "react";
import { Bar } from "react-chartjs-2";
import styled from 'styled-components';

const Centigrade = styled('span')`
  margin-left: 15px;
`;

const KilometersPerHour = styled('span')`
 float: right;
 margin-right: 10px;
`;

const options = {
  responsive: true,
  tooltips: {
    mode: "point",
  },
  elements: {
    line: {
      fill: false,
    },
  },
  scales: {
    yAxes: [
      {
        id: "Temperature",
        type: "linear",
        position: "left",
        ticks: {
          max: 100,
          min: 0,
        }
      },
      {
        id: "Windspeed",
        type: "linear",
        position: "right",
        ticks: {
          max: 370,
          min: 0,
        },
      }
    ],
  },
};

const Meteogram = ({ 
  temperatureForecast,
  precipitationForecast,
  windSpeedForecast,
  windDirectionForecast,
  timeForecast }) => {
  
  const data = {
    labels: timeForecast,
    datasets: [
      {
        name: "Temperature",
        label: "Temperature in °C",
        type: "line",
        data: temperatureForecast,
        fill: false,
        backgroundColor: "#edc25c",
        borderColor: "#edc25c",
        hoverBackgroundColor: "#edc25c",
        hoverBorderColor: "#edc25c",
      },
      {
        name: "PrecipitationProbability",
        label: "% Precipitation Probability ",
        type: "line",
        data: precipitationForecast,
        fill: true,
        borderColor: "#0f82a8",
        backgroundColor: "#0f82a8",
        hoverBackgroundColor: "#0f82a8",
        hoverBorderColor: "#0f82a8",
        lineTension: 0.5
      },
      {
        name: "Windspeed",
        label: "Wind Speed in Km/h",
        type: "line",
        data: windSpeedForecast,
        fill: false,
        backgroundColor: "#b3b1af",
        borderColor: "#b3b1af",
        hoverBackgroundColor: "#b3b1af",
        hoverBorderColor: "#b3b1af",
      }
    ],
  };

  return (
    <>
    <div>
      <Centigrade>
        <sup>°</sup>
        <span>C</span>
      </Centigrade>
      <KilometersPerHour>km/h</KilometersPerHour>
    </div>
    <Bar data={data} options={options} />
    </>
  );
}

export default Meteogram;