import React, { useState, useEffect } from "react";
import { blue } from "color-name";


//Polygons are coming soon!

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
      defaultVals: {},
      data: ['cx', 'cy', 'rx', 'ry', 'fill']
    }
  },
]

const hasKey = (obj, key) => {
  if (obj !== undefined || null) {
    if (!obj.hasOwnProperty(key)) return false
  }
  return true
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
        attrs[key] = hasKey(currentShapeData, 'input') ? currentShapeData.input[key] : defaultVals[key];
      }
      console.log(attrs)
      return attrs;
    }

    return (
      <svg width="300" height="300" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <currentShapeData.attr.name {...svgAttrs()} />
      </svg>)
  }

  return (<b>no shape</b>)
}

const InputFields = ({ currentShapeData, setSelectedShape }) => {
  const [inputValue, setInputValue] = useState(0);
  const { name } = currentShapeData;

  const handleInput = (val, key) => {
    setInputValue({ ...inputValue, [key]: (key !== 'fill' ? parseInt(val) : val) })
    setSelectedShape({ ...currentShapeData, input: { ...currentShapeData.input, [key]: val } })
  }

  return (
    <>
      {
        name === 'rectangle' &&
        <>
          <h2> W: </h2>
          <input className="inputs" type="number" value={inputValue.width} onChange={({ target }) =>
            handleInput(target.value, 'width')
          } />

          <h2> H: </h2>
          <input className="inputs" type="number" value={inputValue.height} onChange={({ target }) =>
            handleInput(target.value, 'height')
          } />

        </>
      }

      {
        name === 'circle' &&
        <>
          <h2> radius </h2>
          <input className="inputs" type="number" value={inputValue.r} onChange={({ target }) =>
            handleInput(target.value, 'r')
          } />

        </>
      }

      {
        name === 'ellipse' &&
        <>
          <h2> r1: </h2>
          <input className="inputs" type="number" value={inputValue.rx} onChange={({ target }) =>
            handleInput(target.value, 'rx')
          } />

          <h2> r2: </h2>
          <input className="inputs" type="number" value={inputValue.ry} onChange={({ target }) =>
            handleInput(target.value, 'ry')
          } />

        </>
      }


      <h1> Enter color name </h1>
      <input className="inputs" type="text" value={inputValue.fill} onChange={({ target }) =>
        handleInput(target.value, 'fill')
      } />

    </>
  )
}

const App = () => {

  const [selectedShape, setSelectedShape] = useState('');

  const setShape = (_name) => {
    let shape = shapes.find(({ name }) => name === _name)
    return { ...shape, input: shape.attr.defaultVals }
  }

  useEffect(() => {
    console.log(selectedShape)
  }, [selectedShape])

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
          <DisplaySVG currentShapeData={selectedShape} />
        </div>
      </div>
    </div>
  </div>)

}

export default App;