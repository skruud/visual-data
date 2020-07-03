import React from 'react';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ( {data: {data}, county, counties, lastSunday, plot, occupation, dataValue} ) => {
  var allDatesInData = data.filter(dataset => dataset.location === county);
  var countiesInOrder = data
    .filter(dataSet => dataSet.date.substring(0, 10) ===  lastSunday.toISOString().substring(0, 10)  )
    .filter(dataSet => dataSet.location !== 'Norge'  );
  

  var population = [307231, 371385, 265238, 241235, 693494, 479892, 243311, 468702, 419396, 636531, 1241165];

  const colors= ['aqua', 'black', 'blue', 'fuchsia', 'gray', 'green', 
    'lime', 'maroon', 'navy', 'olive', 'orange', 'purple', 'red', 
    'silver', 'teal', 'white', 'yellow'];

  const lineChart = (
    allDatesInData.length
      ? (
        <Line 
          data={{
            labels: allDatesInData.map(({ date }) => date.substring(0, 10)),
            datasets: datasetsFunction()
          }
        }
        options={{
          maintainAspectRatio: false,
          responsive: true,
          title:  { display: true, text: chartTextFunction() },
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
    countiesInOrder.length
      ? (
        <Bar 
          data={{
            labels: countiesInOrder.map(({ location }) => location),
            datasets: [{
              label: 'Stillingsannonser',
              backgroundColor: 'black',
              data: dataBarFunction(data),
            }]
          }}
          options={{
            maintainAspectRatio: false,
            responsive: true,
            legend: { display: false },
            title:  { display: true, text: chartTextFunction() },
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

  function chartFunction(type) {
    if (type === 'Linjediagram') return lineChart;
    if (type === 'Søylediagram') return barChart;
  }

  function occupationFunction(variable) {
    return variable[ occupation ];
  }

  function datasetsFunction() {
    var datasets = [];
    for (county of counties) {
      if (county !== 'Norge') datasets.push(datasetFunction(county));
      
    }
    return datasets;
    
  }

  function datasetFunction(county) {
    var tempData = dataFunction(county);
    if (dataValue === 'Annonser per innbygger') {
      for (var i = 0; i < tempData.length; i++) {
        tempData[i] *= 1000000;
        tempData[i] /= population[counties.indexOf(county) - 1];
        tempData[i] = Math.round(tempData[i]);
      }
    }
    return {
      data: tempData,
      label: county,
      borderColor: colors[counties.indexOf(county)],
      fill: false,
    }
  }

  function dataFunction(county) {
    if (occupation === 'Alle yrker') return data.filter(dataset => dataset.location === county  ).map(({ totalAds }) => totalAds);
    else return data.filter(dataset => dataset.location === county  ).map(({ occupation }) => occupationFunction(occupation));
  }

  function dataBarFunction(data) {
    var allLatestData = data.filter(dataSet => dataSet.date.substring(0, 10) ===  lastSunday.toISOString().substring(0, 10)  );
    allLatestData = allLatestData.filter(dataSet => dataSet.location !== 'Norge'  );

    var allLatestAds;
    if (occupation === 'Alle yrker') allLatestAds = allLatestData.map(({ totalAds }) => totalAds);
    else allLatestAds = allLatestData.map(({ occupation }) => occupationFunction(occupation));
    
    if (dataValue === 'Annonser per innbygger') {
      for (var i = 0; i <  population.length; i++) {
        allLatestAds[i] = Math.round((allLatestAds[i]) * 1000000 /  population[i]   ) ;
      }
    }

    return allLatestAds;
  }

  function chartTextFunction() {
    var chartText = 'Antall stillingsannonser';
    if (dataValue === 'Annonser per innbygger') chartText += ' per million innbyggere';
    return chartText;
  }
  
  return (
    <div className={styles.container}> 
      {
        chartFunction(plot)
      }
    </div>
  )
}

export default Chart;