import React, { useState, useEffect } from "react";

//Multipart Polygons are coming soon!

const shapes = [
  { name: 'select a shape' },
  {
    name: 'rectangle',
    attr: {
      defaultVals: { x: 20, y: 20, width: 200, height: 200, fill: 'blue' },
      name: 'rect',
      data: ['x', 'y', 'width', 'height', 'fill']
    }
  },
  {
    name: 'circle',
    attr: {
      defaultVals: { cx: 150, cy: 150, r: 100, fill: 'blue' },
      name: 'circle',
      data: ['cx', 'cy', 'r', 'fill']
    }
  },
  {
    name: 'ellipse',
    attr: {
      name: 'ellipse',
      defaultVals: { cx: 150, cy: 150, rx: 100, ry: 35, fill: 'blue' },
      data: ['cx', 'cy', 'rx', 'ry', 'fill']
    }
  },
  {
    name: 'polygon',
    attr: {
      name: 'polygon',
      defaultVals: { points: '250,175 100,261 99,88', fill: 'blue' },
      data: ['points', 'fill']
    }
  },
];

const generatePolygonPoints = (sideCount) => {
  let radii = 100;
  let centerX = 150;
  let centerY = 175;
  let pointsArray = [];
  let pointsString = '';

  for (var i = 1; i <= sideCount; i++) {
    let pointX = Math.round(centerX +
      radii * Math.cos(2 * Math.PI * i / sideCount));
    let pointY = Math.round(centerY +
      radii * Math.sin(2 * Math.PI * i / sideCount));
    pointsArray.push(`${pointX},${pointY} `);
  }
  for (var i = 0; i <= pointsArray.length - 1; i++) {
    pointsString += pointsArray[i];
  }
  return pointsString;
}

const hasKey = (obj, key) => {
  if (obj !== undefined || null) {
    if (!obj.hasOwnProperty(key)) return false;
  }
  return true;
}


const ShapesOptions = ({ shape }) => {
  return shapes.map(({ name }) =>
    <option key={name} value={`${name}`}>{name}</option>)
}

const DisplaySVG = ({ currentShapeData }) => {
  if (currentShapeData) {
    const { data, defaultVals } = currentShapeData.attr;

    const svgAttrs = () => {
      let attrs = {};
      for (let i = 0; i <= data.length - 1; i++) {
        let key = data[i];
        attrs[key] = hasKey(currentShapeData, 'input') ?
          currentShapeData.input[key] : defaultVals[key];
      }
      return attrs;
    }

    return (
      <svg width="350" height="350" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <currentShapeData.attr.name {...svgAttrs()} />
      </svg>
    )
  }

  return (<div className="centered"><b>no shape yet</b></div>)
}

const InputFields = ({ currentShapeData, setSelectedShape }) => {
  const [inputValue, setInputValue] = useState(0);
  const { name } = currentShapeData;

  const parseValue = (v, k) => {
    if (k == 'points') {
      return generatePolygonPoints(v);
    }
    return v;
  }

  const handleInput = (val, key) => {
    setInputValue({ ...inputValue, [key]: val })
    setSelectedShape({ ...currentShapeData, input: { ...currentShapeData.input, [key]: parseValue(val, key) } })
  }

  return (
    <>
      {
        name === 'rectangle' &&
        <>
          <h2> W: </h2>
          <input className="inputs" type="number" onChange={({ target }) =>
            handleInput(target.value, 'width')
          } />

          <h2> H: </h2>
          <input className="inputs" type="number" onChange={({ target }) =>
            handleInput(target.value, 'height')
          } />

        </>
      }

      {
        name === 'circle' &&
        <>
          <h2> radius </h2>
          <input className="inputs" type="number" onChange={({ target }) =>
            handleInput(target.value, 'r')
          } />

        </>
      }

      {
        name === 'ellipse' &&
        <>
          <h2> r1: </h2>
          <input className="inputs" type="number" onChange={({ target }) =>
            handleInput(target.value, 'rx')
          } />

          <h2> r2: </h2>
          <input className="inputs" type="number" onChange={({ target }) =>
            handleInput(target.value, 'ry')
          } />

        </>
      }

      {
        name === 'polygon' &&
        <>
          <h2> number of sides: </h2>
          <input className="inputs" type="number" onChange={({ target }) =>
            handleInput(target.value, 'points')
          } />

        </>
      }


      <h1> Enter color name </h1>
      <input className="inputs" type="text" onChange={({ target }) =>
        handleInput(target.value, 'fill')
      } />

    </>
  )
}

const enteredShapes = [];

const EnteredShapes = ({ shapesArr }) => {
  if (shapesArr) return shapesArr.map(name =>
    <div className="tag" key={name}>
      <b>{name}</b>
    </div>)

  return null;
}

const App = () => {
  const [selectedShape, setSelectedShape] = useState('');
  const [savedShapes, setSavedShapes] = useState([]);

  const saveShapeToLocalStorage = (shapeName) => {
    if (!savedShapes.find(name => name === shapeName)) {
      enteredShapes.push(shapeName);
      localStorage.setItem('selected_shapes', JSON.stringify(enteredShapes));
    }
  }

  const getShapesFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('selected_shapes'));
  }

  const setShape = (_name) => {
    saveShapeToLocalStorage(_name);
    let shape = shapes.find(({ name }) => name === _name);
    return { ...shape, input: shape.attr.defaultVals }
  }

  useEffect(() => {
    setSavedShapes(getShapesFromLocalStorage());
  }, [selectedShape]);


  return (<div className="wrapper">
    <div>
      <h1 className="h1"> Welcome to Shape App 👋</h1>

      <div className="flex">
        <div className="settings">

          <h1> Select a shape </h1>
          <select className="inputs" value={selectedShape} onChange={({ target }) =>
            setSelectedShape(setShape(target.value))}>
            <ShapesOptions shape={selectedShape} />
          </select>

          <h1> {selectedShape.name} </h1>

          <InputFields
            currentShapeData={selectedShape}
            setSelectedShape={setSelectedShape}
          />

        </div>

        <div className="view">
          <div className="box">
            <DisplaySVG currentShapeData={selectedShape} />
          </div>
          <div className="tags">
            <h5> Entered shapes: </h5  >
            <EnteredShapes shapesArr={savedShapes} />
          </div>
        </div>
      </div>
    </div>
  </div >)

}

export default App;