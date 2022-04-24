import React from 'react'
import styles from './InputField.module.css'
function InputField({ ...props }) {
  return (
    <input {...props} className={styles['input-field']} />
  )
}

export default InputField