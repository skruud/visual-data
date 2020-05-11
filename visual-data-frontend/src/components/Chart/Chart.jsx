import React from 'react';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ( {data: {data}, county, counties, lastSunday} ) => {
  var usedData = data.filter(dataSet => dataSet.location === county);
  var allLatestData = data.filter(dataSet => dataSet.date.substring(0, 10) ===  lastSunday.toISOString().substring(0, 10)  );
  allLatestData = allLatestData.filter(dataSet => dataSet.location !== 'Norge'  );

  var population = [307231, 371385, 265238, 241235, 693494, 479892, 243311, 468702, 419396, 636531, 1241165];

  console.log( 'Chart!' );
  var allLatestAds = allLatestData.map(({ totalAds }) => totalAds);
  console.log( allLatestAds );

  for (var i = 0; i <  population.length; i++) {
      allLatestAds[i] = Math.round((allLatestAds[i])*100000 / population[i]) ;
  }

  console.log( allLatestAds );

  const lineChart = (
    usedData.length
      ? (
        <Line 
          data={{
            labels: usedData.map(({ date }) => date.substring(0, 10)),
            datasets: [{
              data: data.filter(dataSet => dataSet.location === 'Agder'  ).map(({ totalAds }) => totalAds),
              label: 'Agder',
              borderColor: '#3333ff',
              fill: false,
            }, {
              data: data.filter(dataSet => dataSet.location === 'Innlandet'  ).map(({ totalAds }) => totalAds),
              label: 'Innlandet',
              borderColor: '#3393ff',
              fill: false,
            }, {
              data: data.filter(dataSet => dataSet.location === 'Møre og Romsdal'  ).map(({ totalAds }) => totalAds),
              label: 'Møre og Romsdal',
              borderColor: '#33f3ff',
              fill: false,
            }, {
              data: data.filter(dataSet => dataSet.location === 'Nordland'  ).map(({ totalAds }) => totalAds),
              label: 'Nordland',
              borderColor: '#33334f',
              fill: false,
            }, {
              data: data.filter(dataSet => dataSet.location === 'Oslo'  ).map(({ totalAds }) => totalAds),
              label: 'Oslo',
              borderColor: 'DarkOliveGreen',
              fill: false,
            }, {
              data: data.filter(dataSet => dataSet.location === 'Rogaland'  ).map(({ totalAds }) => totalAds),
              label: 'Rogaland',
              borderColor: 'DarkOrange',
              fill: false,
            }, {
              data: data.filter(dataSet => dataSet.location === 'Troms og Finnmark'  ).map(({ totalAds }) => totalAds),
              label: 'Troms og Finnmark',
              borderColor: 'DarkCyan',
              fill: false,
            }, {
              data: data.filter(dataSet => dataSet.location === 'Trøndelag'  ).map(({ totalAds }) => totalAds),
              label: 'Trøndelag',
              borderColor: '#f333ff',
              fill: false,
            }, {
              data: data.filter(dataSet => dataSet.location === 'Vestfold og Telemark'  ).map(({ totalAds }) => totalAds),
              label: 'Vestfold og Telemark',
              borderColor: '#ff0000',
              fill: false,
            }, {
              data: data.filter(dataSet => dataSet.location === 'Vestland'  ).map(({ totalAds }) => totalAds),
              label: 'Vestland',
              borderColor: 'DarkGoldenRod',
              fill: false,
            }, {
              data: data.filter(dataSet => dataSet.location === 'Viken'  ).map(({ totalAds }) => totalAds),
              label: 'Viken',
              borderColor: 'Chartreuse',
              fill: false,
            }
          
          ], 
            
            
          }
          
          
        }
        options={{
          scales: {
            xAxes: [{
              type: 'time',
              time: {
                unit: 'day'
            }
            }]
          },
        }}
        
        />) : null
  );


  const barChart = (
    usedData.length
      ? (
        <Bar 
          data={{
            labels: allLatestData.map(({ location }) => location),
            datasets: [{
              label: 'Stillingsannonser',
              backgroundColor: 'black',
              data: allLatestAds,
            }]
          }}
          options={{
            legend: { display: false },
            title:  {display: true, text: 'Antall annonser per 100 000 innbygger'},
            scales: {
              yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }],
              xAxes: [{
                  type: 'category',
              }]
          }
          }}
        />
      ) : null
  );

  return (
    <div className={styles.container}>
      {lineChart}
      <br/>
      {barChart}
  </div>
  )
}

export default Chart;