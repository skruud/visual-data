import React from 'react';
import './App.css';

import { Cards, Chart, CountyPicker, PlotPicker, OccupationPicker, DataValuePicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';

class App extends React.Component {
  state = {
    county: 'Norge',
    data: [],
    counties: ['Norge', 'Agder', 'Innlandet', 'Møre og Romsdal', 'Nordland', 'Oslo', 'Rogaland', 
    'Troms og Finnmark', 'Trøndelag', 'Vestfold og Telemark', 'Vestland', 'Viken'],
    plot: 'Linjediagram',
    plots: ['Linjediagram', 'Søylediagram'],
    occupation: 'Alle yrker',
    occupations: ['Alle yrker', 'Barnehage', 'Butikkansatt', 'Forskning/Stipendiat/Postdoktor', 'Helsepersonell', 
      'HR, personal og rekruttering', 'Håndverker', 'IT drift og vedlikehold', 'IT utvikling', 'Ingeniør', 
      'Kontor og administrasjon', 'Kundeservice', 'Lege', 'Logistikk og lager', 'Mat og servering', 
      'Saksbehandler', 'Salg', 'Sykepleier', 'Transport og sjåfør', 'Undervisning og pedagogikk', 'Økonomi og regnskap'],
    dataValue: 'Annonser',
    dataValues: ['Annonser', 'Annonser per innbygger']

  }

  async componentDidMount() {
    const fetchedData = await fetchData();

    console.log('fetchedData!')
    console.log(fetchedData);
    var today = new Date();
    var tempData = fetchedData.filter(dataSet => dataSet.location !== 'X');
    this.setState({ 
      data:       tempData.sort((a, b) => a.date.localeCompare(b.date) - b.date.localeCompare(a.date) ),
      lastSunday: new Date(today.setDate(today.getDate() - (today.getDay() || 7))),
    });
  }

  handlePlotChange = async (plot) => {
    console.log(plot);

    this.setState({ plot: plot });
  }

  handleCountyChange = async (county) => {
    console.log(county);

    this.setState({ county: county });
  }

  handleOccupationChange = async (occupation) => {
    console.log(occupation);

    this.setState({ occupation: occupation });
  }

  handleDataValueChange = async (dataValue) => {
    console.log(dataValue);

    this.setState({ dataValue: dataValue });
  }

  render() {
    const { 
      county, data, counties, lastSunday, plots, plot, occupations, occupation, dataValues, dataValue
    } = this.state;

    

    console.log(county);
    return (
      <div className={styles.container}>
        <CountyPicker handleCountyChange={this.handleCountyChange} counties={counties} /> 
        <Cards data={ {data} } county={county} lastSunday={lastSunday} />
        <div>
          <PlotPicker handlePlotChange={this.handlePlotChange} plots={plots} />
          <OccupationPicker handleOccupationChange={this.handleOccupationChange} occupations={occupations} />
          <DataValuePicker handleDataValueChange={this.handleDataValueChange} dataValues={dataValues} />
        </div>
        <Chart data={{data} } county={county} counties={counties} lastSunday={lastSunday} 
          plot={plot} occupation={occupation} dataValue={dataValue}
          />
      </div>
    );
  }
  
}

export default App;
