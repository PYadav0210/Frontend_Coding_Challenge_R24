import React, { useState } from 'react';
import Circlelocater from './components/circlelocater';
import CircleDataInput from './components/circledatainput';
import Materials from './components/materials';
import Submit from './components/submit';
import Header from './components/header'; // Import the Header component
import styles from './App.module.css';

function App() {
  const [circles, setCircles] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [outputData, setOutputData] = useState(null);

  const addCircle = (x, y) => {
    setCircles([...circles, { x, y }]);
  };

  const updateCircle = (index, newCoords) => {
    const updatedCircles = circles.map((circle, i) =>
      i === index ? newCoords : circle
    );
    setCircles(updatedCircles);
  };

  const handleMaterialSelection = (material) => {
    setSelectedMaterial(material);
  };

  const handleSubmit = () => {
    const output = {
      circles,
      material: selectedMaterial,
    };
    setOutputData(output);
  };

  return (
    <div>
      {/* Header outside of the flex container to make it span full width at the top */}
      <Header />

      {/* Main app container with left and right panels */}
      <div className={styles.appContainer}>
        <div className={styles.leftPanel}>
          <Circlelocater circles={circles} updateCircle={updateCircle} />
        </div>
        <div className={styles.rightPanel}>
          <h2 style={{color:"white"}}>Distance from Initial Coordinates</h2>
          <CircleDataInput addCircle={addCircle} />
          <Materials selectedMaterial={selectedMaterial} onSelectMaterial={handleMaterialSelection} />
          <Submit onSubmit={handleSubmit} />

          {/* Table to display output data */}
          {outputData && (
            <div className={styles.outputContainer}>
              <h3>Output Data</h3>
              <table className={styles.outputTable}>
                <thead>
                  <tr>
                    <th>Circle Index</th>
                    <th>X Coordinate</th>
                    <th>Y Coordinate</th>
                  </tr>
                </thead>
                <tbody>
                  {outputData.circles.map((circle, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{Math.round(circle.x)}</td>
                      <td>{Math.round(circle.y)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3">Selected Material: {outputData.material || 'None'}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
