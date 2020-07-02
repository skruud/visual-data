import React from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import styles from './OccupationPicker.module.css';

const OccupationPicker = ({ handleOccupationChange, occupations }) => {
  
  return (
    <FormControl className={styles.formControl}>
      <NativeSelect defaultValue="" onChange={(e) => handleOccupationChange(e.target.value)}>
        {occupations.map((occupation, i) => <option key={i} value={occupation}> {occupation} </option>)}
      </NativeSelect>
    </FormControl>
  )
}

export default OccupationPicker;