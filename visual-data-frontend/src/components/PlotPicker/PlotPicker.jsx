import React from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import styles from './PlotPicker.module.css';

const PlotPicker = ({ handlePlotChange, plots }) => {
  
  return (
    <FormControl className={styles.formControl}>
      <NativeSelect defaultValue="" onChange={(e) => handlePlotChange(e.target.value)}>
        {plots.map((plot, i) => <option key={i} value={plot}> {plot} </option>)}
      </NativeSelect>
    </FormControl>
  )
}

export default PlotPicker;