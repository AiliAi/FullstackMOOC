import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from './components/Countries';

function App() {
  const [findCountry, setFindCountry] = useState('');
  const [countriesArray, setCountriesArry] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all').then(response => {
        setCountriesArry(response.data);
      });
  }, []);

  const handleChange = (event) => {
    setFindCountry(event.target.value);
  };

  return (
    <>
      <div>find countries
        <input
          value={findCountry}
          onChange={handleChange}
        />
      </div>
      <div>
        <Countries 
          countriesArray={countriesArray} 
          findCountry={findCountry} 
          setFindCountry={setFindCountry} />
      </div>
    </>
  )
};

export default App;


