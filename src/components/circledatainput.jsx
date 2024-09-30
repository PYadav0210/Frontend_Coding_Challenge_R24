import React, { useState } from 'react';
import styles from './styles/Circledatainput.module.css';

const CircleDataInput = ({ addCircle }) => {
  const [x, setX] = useState('');
  const [y, setY] = useState('');

  const handleAdd = () => {
    if (x === '' || y === '') return; // Prevent adding if fields are empty
    addCircle(Number(x), Number(y));
    setX('');
    setY('');
  };

  return (
    <div className={styles.inputContainer}>
      <label>X Distance</label>
      <input
        type="number"
        value={x}
        onChange={(e) => setX(e.target.value)}
        placeholder="X"
      />
      <label>Y Distance</label>
      <input
        type="number"
        value={y}
        onChange={(e) => setY(e.target.value)}
        placeholder="Y"
      />
      <button onClick={handleAdd}>Add Circle</button>
    </div>
  );
};

export default CircleDataInput;
