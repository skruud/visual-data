import React from 'react';
import './App.css';

import { Cards, Chart, CountyPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';

class App extends React.Component {
  state = {
    county: 'Norge',
    data: [],
    counties: ['Norge', 'Agder', 'Innlandet', 'Møre og Romsdal', 'Nordland', 'Oslo', 'Rogaland', 
    'Troms og Finnmark', 'Trøndelag', 'Vestfold og Telemark', 'Vestland', 'Viken']
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

  handleCountyChange = async (county) => {
    console.log(county);

    this.setState({ county: county });
  }

  render() {
    const { 
      county, data, counties, lastSunday 
    } = this.state;

    

    console.log(county);
    return (
      <div className={styles.container}>
        <CountyPicker handleCountyChange={this.handleCountyChange} counties={counties} />
        <Cards data={ {data} } county={county} lastSunday={lastSunday} />
        <Chart data={{data} } county={county} counties={counties} lastSunday={lastSunday}
          />
      </div>
    );
  }
  
}

export default App;
