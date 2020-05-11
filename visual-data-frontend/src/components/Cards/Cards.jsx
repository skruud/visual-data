import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames';

import styles from './Cards.module.css';



const Cards = (  {data: {data}, county, lastSunday} ) => {
  var usedData = data.filter(dataSet => dataSet.location === county);
  console.log(county);
  console.log('Cards!');
  if ( usedData.length < 1 ) {
    return 'Loading...';
  }
  
  console.log( usedData );
  
  
  

  var latestData = usedData.filter(dataSet => 
    dataSet.date.substring(0, 10) ===  lastSunday.toISOString().substring(0, 10)  )[0];
  console.log( latestData.location );

  var changeFromLastWeek = Math.round(((usedData[usedData.length -1].totalAds)/(usedData[usedData.length -2].totalAds) - 1) * 100);

  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">
        <Grid item compoent={Card} xs={12} md={5} className={cx(styles.card, styles.positions)} >
          <CardContent>
            <Typography color="textSecondary" gutterBottom> Antall stillingsannonser </Typography>
            <Typography variant="h5">
              <CountUp start={0} end={usedData[usedData.length -1].totalAds} duration={2.5} separator="," />
            </Typography>
            <Typography color="textSecondary"> { lastSunday.toDateString() } </Typography>
            <Typography variant="body2"> {latestData.location} </Typography>
          </CardContent>
        </Grid>
        <Grid item compoent={Card} xs={12} md={5} className={cx(styles.card, styles.ads)} >
          <CardContent>
            <Typography color="textSecondary" gutterBottom> Endring fra forrige uke  </Typography>
            <Typography variant="h5">
            { (changeFromLastWeek<0 ? '-' : '+') +  changeFromLastWeek }%
            </Typography>
            <Typography color="textSecondary">{ lastSunday.toDateString() }</Typography>
            <Typography variant="body2"> {latestData.location} </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  )
}



export default Cards;