import React from 'react';
import styles from './styles/Submit.module.css';

const Submit = ({ onSubmit }) => {
  return (
    <button className={styles.submitButton} onClick={onSubmit}>
      Submit
    </button>
  );
};

export default Submit;
