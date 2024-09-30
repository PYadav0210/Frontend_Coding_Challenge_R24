import React from 'react';
import styles from './styles/Materials.module.css';

const materials = ['Wood', 'Metal', 'Plastic', 'Glass', 'Ceramic'];

const Materials = ({ selectedMaterial, onSelectMaterial }) => {
  return (
    <div className={styles.materialContainer}>
      <h2 className={styles.header}>Material Selection</h2>
      <div className={styles.materialGrid}>
        {materials.map((material) => (
          <div
            key={material}
            className={`${styles.materialBox} ${selectedMaterial === material ? styles.selected : ''}`}
            onClick={() => onSelectMaterial(material)}
          >
            {material}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Materials;
