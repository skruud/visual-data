import React from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import styles from './DataValuePicker.module.css';

const DataValuePicker = ({ handleDataValueChange, dataValues }) => {
  
  return (
    <FormControl className={styles.formControl}>
      <NativeSelect defaultValue="" onChange={(e) => handleDataValueChange(e.target.value)}>
        {dataValues.map((dataValue, i) => <option key={i} value={dataValue}> {dataValue} </option>)}
      </NativeSelect>
    </FormControl>
  )
}

export default DataValuePicker;