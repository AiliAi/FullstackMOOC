import React, { useState, useEffect } from 'react';
import personService from './services/persons'
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [findName, setFindName] = useState('');
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    getallData();
  }, []);

  /**
   * Get all data
   */
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

  /**
   * Add data
   */
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
        setErrorMessage(false);
        setMessage(`Added '${newName}'`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(true);
        setMessage(`Person '${dataObject.name}' addign failed`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  };

  /**
   * Check and update name
   */
  const handleCheckName = (event) => {

    //Check name
    const name = persons.map(obj => {
      let objArrray = obj.name.toLowerCase();
      return objArrray;
    });
    if (name.includes(newName.toLowerCase())) {
      event.preventDefault();

      //Update name
      const findPerson = persons.find(person => person.name === newName)
      const person = persons.find(n => n.id === findPerson.id)
      const changedNumber = { ...person, number: newNumber }

      if (window.confirm(`${findPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(findPerson.id, changedNumber)
          .then(() => {
            getallData();
            setNewName('');
            setNewNumber('');
            setErrorMessage(false);
            setMessage(`Updated '${newName}' number`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorMessage(true);
            setMessage(`'${findPerson.name}' was already deleted from server`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
    } else {
      addData(event);
    }
  };

  /**
   * Name change
   */
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  /**
   * Number change
   */
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  /**
   * Filter change
   */
  const handleFilter = (event) => {
    setFindName(event.target.value);
  };

  /**
   * Confirm delete
   */
  const deleteConfirm = (event) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      personService
        .deleteId(event.target.value)
        .then(() => {
          getallData();
          setErrorMessage(false);
          setMessage(`Deleted id '${event.target.value}'`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(true);
          setMessage(`Deleting person with id '${event.target.value}' failed`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  /**
   * Confirm delete
   */
  const handleDelete = (event) => {
    deleteConfirm(event)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      {
        <Notification message={message} errorMessage={errorMessage} />
      }
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
          <Persons key={filteredData.name} data={filteredData} handleDelete={handleDelete} />
        )}
      </ul>
    </div>
  );

};

export default App;