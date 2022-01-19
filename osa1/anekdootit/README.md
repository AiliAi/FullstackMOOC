# osan 1 tehtävien 1.12-1.14 react-koodi

## anekdootit

App.js

```js
import React, { useState } from 'react';

const Header = ({ name }) => {
  return <h1>{name}</h1>
};

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>
    {text}
  </button>
);

const Content = ({ anecdote, points, show }) => {
  if (points < 1 && !show) {
    return (
      <p>No votes yet</p>
    )
  } else {
    return (
      <>
        <div>
          {anecdote}
        </div>
        <div>
          has {points} points
        </div>
      </>
    )
  }
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ];

  const [randomIndex, setRandomIndex] = useState(Math.floor(Math.random() * anecdotes.length));
  const [selected, setSelected] = useState(randomIndex);
  const [points, setpoints] = useState(Array(anecdotes.length).fill(0));
  const [mostVotes, setMostVotes] = useState(0);
  const [mostIndex, setMostIndex] = useState();


  const pickRandomAnecdote = (anecdotes) => {
    const random = Math.floor(Math.random() * anecdotes.length);
    setRandomIndex(random);
    setSelected(random);
  };

  const pointssAdded = (points) => {
    const copy = [...points];
    copy[randomIndex] += 1;
    setpoints(copy);
    maxPoints(copy);
  };

  const maxPoints = (points) => {
    const maxPoints = [...points].sort((a, b) => b - a);
    setMostVotes(maxPoints[0]);
    setMostIndex(points.indexOf(maxPoints[0]));
  }

  return (
    <>
      <Header name={'Anecdote of the day'} />
      <Content anecdote={anecdotes[selected]} points={points[randomIndex]} show={true} />
      <div>
        <Button text={'vote'} handleClick={() => pointssAdded(points)} />
        <Button text={'next anecdote'} handleClick={() => pickRandomAnecdote(anecdotes)} />
      </div>
      <Header name={'Anecdote with the most votes'} />
      <Content anecdote={anecdotes[mostIndex]} points={mostVotes} show={false} />
    </>
  )
};

export default App;
```
