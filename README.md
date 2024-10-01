# Frontend Coding Challenge - Circle Locator App

## Overview
This project is a **Circle Locator App** built using React, with Material UI and CSS for styling. The main aim of the project is to allow users to place draggable circles on an image and adjust their positions, while tracking their coordinates in pixels and percentages. The app features coordinate input, material selection, and a dynamic table to display the output data (both pixel and percentage-based coordinates).

You can view the hosted version of the app: (https://frontend-coding-challenge-r24.vercel.app/).

## App.js

The `App.js` file is the central point of the application, managing the state and interactions between various components such as `Circlelocater`, `CircleDataInput`, and `Materials`. It handles circle placement, updates coordinates, and processes material selection. 

Key functionality includes:

```
const [circles, setCircles] = useState([]);
const [selectedMaterial, setSelectedMaterial] = useState(null);
const [outputData, setOutputData] = useState(null);
```
These states track the circles, selected material, and the output data for displaying the results. The addCircle and updateCircle functions allow adding and updating the position of the circles:

```
const addCircle = (x, y) => {
  setCircles([...circles, { x, y }]);
};

const updateCircle = (index, newCoords) => {
  const updatedCircles = circles.map((circle, i) =>
    i === index ? newCoords : circle
  );
  setCircles(updatedCircles);
};
```
The handleSubmit function consolidates the circle data and material, calculating the X and Y coordinates in both pixels and percentages:

```
const handleSubmit = () => {
  const containerWidth = containerRef.current.offsetWidth;
  const containerHeight = containerRef.current.offsetHeight;

  const output = {
    circles: circles.map(circle => ({
      ...circle,
      xPercent: ((circle.x / containerWidth) * 100).toFixed(2),
      yPercent: ((circle.y / containerHeight) * 100).toFixed(2),
    })),
    material: selectedMaterial,
  };

  setOutputData(output);
  console.log("Output Data:", output);
};
```
## Circlelocater.jsx
The Circlelocater.jsx component is responsible for rendering the image and allowing users to place and drag circles on it. It tracks each circle’s position and updates it in real-time.

```
const Circlelocater = ({ circles, updateCircle }) => {
  const handleDrag = (index, e) => {
    const newCoords = {
      x: e.clientX - containerRef.current.offsetLeft,
      y: e.clientY - containerRef.current.offsetTop,
    };
    updateCircle(index, newCoords);
  };
```
This handleDrag function captures the circle’s new position as the user drags it, ensuring the correct coordinates are passed back to App.js.

## CircleDataInput.jsx
The CircleDataInput.jsx component allows users to manually input coordinates (X and Y) for adding new circles.

```
const CircleDataInput = ({ addCircle }) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const handleAdd = () => {
    addCircle(x, y);
  };
```
Here, the handleAdd function captures the coordinates from the input fields and passes them back to App.js for processing, adding a new circle to the layout.

## Materials.jsx
The Materials.jsx component is where users can select a material that gets applied to the circles. The selected material is stored in the selectedMaterial state in App.js.

```
const Materials = ({ selectedMaterial, onSelectMaterial }) => {
  const materials = ["Metal", "Plastic", "Wood", "Glass", "Concrete"];

  return (
    <div className={styles.materialGrid}>
      {materials.map((material, index) => (
        <div
          key={index}
          className={`${styles.materialBox} ${selectedMaterial === material ? styles.selected : ""}`}
          onClick={() => onSelectMaterial(material)}
        >
          {material}
        </div>
      ))}
    </div>
  );
};
```
The component dynamically renders a list of material boxes. When a box is clicked, the onSelectMaterial function is triggered, updating the selected material in the state.

## Results: Pixels and Percentage Calculations
When the user submits their circle placements, the app calculates the coordinates in two formats:

Pixels - Direct pixel coordinates based on the position of each circle relative to the image.

Percentage - The coordinates as a percentage of the image’s width and height.

For example:

```
const output = {
  circles: circles.map(circle => ({
    ...circle,
    xPercent: ((circle.x / containerWidth) * 100).toFixed(2),
    yPercent: ((circle.y / containerHeight) * 100).toFixed(2),
  })),
};
```
These values are displayed in the table for easy comparison.
![Screenshot from 2024-10-01 22-26-35](https://github.com/user-attachments/assets/1b709193-614f-4b7e-9b6c-59aaccbec4dc)

One thing to keep in mind is the largest pixel value for the image we used is 780 for the x-coordinate and 580 for the y-coordinate and if you enter a value bigger than that, then it will not show the circle. Also, if two circles have the same x coordinate while creating, it can be seen that they are overlapping but once you move the circles, they never collide.

## Conclusion
The Circle Locator App provides an interactive way to manage draggable circles on an image, calculating their positions in pixels and percentages. It integrates material selection, visual feedback, and dynamic input, making it highly customizable. The project demonstrates React’s flexibility in handling user inputs, managing state, and applying various layout and styling techniques.
