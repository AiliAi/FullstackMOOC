# osan 1 tehtävien 1.1-1.5 react-koodi

## kurssitiedot

App.js

```js
import React from 'react';

const Header = (props) => {
  return <h1>{props.course}</h1>
};

const Content = (props) => {
  const parts = props.parts.map(part => {
    return <Part name={part.name} exercises={part.exercises} key={part.name} />;
  });

  return (
    <div>
      {parts}
    </div>
  )
};

const Part = (props) => {
  return <p> {props.name} {props.exercises} </p>;
};


const Total = (props) => {
  const parts = props.parts.map(part => {
    return part.exercises;
  });

  const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);
  const total = sumValues(parts);

  return <p>Number of exercises {total}</p>
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };

  return (
    <div>
      <Header
        course={course.name}
      />
      <Content
        parts={course.parts}
      />
      <Total
        parts={course.parts}
      />
    </div>
  )
};

export default App;
```