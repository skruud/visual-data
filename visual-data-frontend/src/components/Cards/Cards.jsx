import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';

import styles from './Cards.module.css';

const Cards = ({ data: { objectCount, filterWidgets } }) => {
  if (!objectCount) {
    return 'Loading...';
  }
  console.log(objectCount);
  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">
        <Grid item compoent={Card}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom> Confirmed </Typography>
            <Typography variant="h5">
              <CountUp start={0} end={objectCount} duration={2.5} separator="," />
            </Typography>
            <Typography color="textSecondary">DATE</Typography>
            <Typography variant="body2">Number of cases</Typography>
          </CardContent>
        </Grid>
        <Grid item compoent={Card}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom> Deaths </Typography>
            <Typography variant="h5">
              <CountUp start={0} end={objectCount} duration={2.5} separator="," />
            </Typography>
            <Typography color="textSecondary">DATE</Typography>
            <Typography variant="body2">Number of cases</Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  )
}

export default Cards;