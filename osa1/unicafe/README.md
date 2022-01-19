# osan 1 tehtävien 1.6.-1.11 react-koodi

## unicafe

App.js

```js
import React, { useState } from 'react';

const Header = ({ name }) => {
  return <h1>{name}</h1>
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
);

const StatisticLine = ({ value, text, prosent }) => {
  return (
    <tr>
      <td>
        {text}
      </td>
      <td>
        {value} {prosent}
      </td>
    </tr>
  )
};

const Statistics = ({ good, bad, neutral }) => {

  const total = () => {
    const sum = bad + good + neutral;
    return sum;
  };

  const average = () => {
    const averageNum = (good - bad) / (good + bad + neutral);
    return averageNum;
  };

  const positive = () => {
    const posProsent = good / total() * 100;
    return posProsent;
  };

  const totalNum = total();
  const posPros = positive();
  const averageNum = average();

  if (totalNum > 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text={'good'} value={good} />
          <StatisticLine text={'neutral'} value={neutral} />
          <StatisticLine text={'bad'} value={bad} />
          <StatisticLine text={'all'} value={totalNum} />
          <StatisticLine text={'average'} value={averageNum} />
          <StatisticLine text={'positive'} value={posPros} prosent={'%'} />
        </tbody>
      </table>
    )
  } else {
    return <p>No feedback given</p>;
  }
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header
        name={'give feedback'}
      />
      <Button handleClick={() => setGood(good + 1)} text={'good'} />
      <Button handleClick={() => setNeutral(neutral + 1)} text={'neutral'} />
      <Button handleClick={() => setBad(bad + 1)} text={'bad'} />
      <Header
        name={'statistics'}
      />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
};

export default App;
```
