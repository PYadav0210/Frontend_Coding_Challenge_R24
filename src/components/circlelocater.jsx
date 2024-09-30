import React, { useState } from 'react';
import styles from './styles/Circlelocater.module.css';

const Circlelocater = ({ circles, updateCircle }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [draggedCircleIndex, setDraggedCircleIndex] = useState(null);

  const circleRadius = 15; // Radius of each circle (half of 30px)

  // Helper function to check if circles are overlapping
  const isOverlapping = (x1, y1, x2, y2) => {
    const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    return distance < circleRadius * 2; // Check if the distance is less than 2 radii (diameter)
  };

  const handleMouseDown = (event, index) => {
    setIsDragging(true);
    setDraggedCircleIndex(index);
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;

    const canvas = event.target.closest(`.${styles.canvasContainer}`);
    const rect = canvas.getBoundingClientRect();
    const newX = event.clientX - rect.left;
    const newY = event.clientY - rect.top;

    // Check if the new position causes a collision
    let overlap = false;
    circles.forEach((circle, i) => {
      if (i !== draggedCircleIndex) {
        if (isOverlapping(newX, newY, circle.x, circle.y)) {
          overlap = true;
        }
      }
    });

    if (!overlap) {
      // Only update the circle if there's no overlap
      updateCircle(draggedCircleIndex, { x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedCircleIndex(null);
  };

  return (
    <div
      className={styles.canvasContainer}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <img src='/assets/kitchenidea1.avif' alt="Canvas" className={styles.image} />
      {circles.map((circle, index) => (
        <div
          key={index}
          className={styles.circle}
          style={{ left: `${circle.x}px`, top: `${circle.y}px` }}
          onMouseDown={(e) => handleMouseDown(e, index)}
        >
          <span className={styles.coordinates}>
            ({Math.round(circle.x)}, {Math.round(circle.y)})
          </span>
        </div>
      ))}
    </div>
  );
};

export default Circlelocater;
