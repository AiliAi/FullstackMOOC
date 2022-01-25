import React, { useState, useEffect } from 'react';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import axios from 'axios';


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [findName, setFindName] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons').then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      });
  }, []);

  const addData = (event) => {
    event.preventDefault();
    const dataObject = {
      name: newName,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: persons.length + 1,
      number: newNumber
    };
    setPersons(persons.concat(dataObject));
    setNewName('');
    setNewNumber('');
    console.log(persons);
  };

  const handleCheckName = (event) => {
    const name = persons.map(obj => {
      let objArrray = obj.name.toLowerCase();
      return objArrray;
    });

    if (name.includes(newName.toLowerCase())) {
      event.preventDefault();
      return alert(`${newName} is already added to phonebook`);
    } else {
      addData(event);
    }
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    console.log(event.target.value);
    setFindName(event.target.value);
  };


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        findName={findName}
        handleFilter={handleFilter}
      />
      <h2>Add a new</h2>
      <PersonForm
        handleCheckName={handleCheckName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
        {persons.filter(data => data.name.toLowerCase().includes(findName.toLowerCase())).map(filteredData =>
          <Persons key={filteredData.name} data={filteredData} />
        )}
      </ul>
    </div>
  );

};

export default App;