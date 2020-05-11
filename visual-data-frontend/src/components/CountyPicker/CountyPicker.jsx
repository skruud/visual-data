import React from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import styles from './CountyPicker.module.css';

const CountyPicker = ({ handleCountyChange, counties }) => {
  
  return (
    <FormControl className={styles.formControl}>
      <NativeSelect defaultValue="" onChange={(e) => handleCountyChange(e.target.value)}>
        {counties.map((county, i) => <option key={i} value={county}> {county} </option>)}
      </NativeSelect>
    </FormControl>
  )
}

export default CountyPicker;