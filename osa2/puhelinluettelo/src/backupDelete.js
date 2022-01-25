import React, { useState, useEffect } from 'react';
import personService from './services/persons'
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';


const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [findName, setFindName] = useState('');

  useEffect(() => {
    getallData();
  }, []);

  const getallData = () => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
    .catch(error => {
      console.log('failed to get all')
    })
  }

  const addData = (event) => {
    event.preventDefault();
    const dataObject = {
      name: newName,
      date: new Date().toISOString(),
      number: newNumber
    };
    personService
    .create(dataObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson));
      setNewName('');
      setNewNumber('');
    })
    .catch(error => {
      console.log(`Person ${dataObject.name} addign failed`)
    })
    console.log(persons);
  };

  const handleCheckName = (event) => {
    const name = persons.map(obj => {
      let objArrray = obj.name.toLowerCase();
      return objArrray;
    });

    if (name.includes(newName.toLowerCase())) {
      event.preventDefault();
      return alert(`${newName} is already added to phonebook, replace the old number with the new one?`);
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

  const deleteConfirm = (event) => {
    if(window.confirm("Are you sure you want to delete this?")) {
      personService
      .deleteId(event.target.value)
      .then(() => {
          getallData();
      })
      .catch(error => {
        console.log(`Person with id ${event.target.value} deleting failed`)
      })
    }
  }

  const handleDelete = (event) => {
    console.log(event.target);
    console.log('deletePeron id', event.target.value);
    deleteConfirm(event)
  }

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
          <Persons key={filteredData.name} data={filteredData} handleDelete={handleDelete}/>
        )}
      </ul>
    </div>
  );

};

export default App;