import React, { useState, useEffect } from 'react';
import Find from './Find';

const Countries = ({ countriesArray, findCountry, setFindCountry }) => {
    const [showCountry, setShowCountry] = useState();
    const filtered = countriesArray.filter(data => data.name.common.toLowerCase().includes(findCountry.toLowerCase()));

    useEffect(() => {
        if (filtered.length === 1) {
            setShowCountry(true);
        } else {
            setShowCountry(false);
        }
    }, [filtered.length, showCountry]);


    if (filtered.length === countriesArray.length) {
        return (
            <p></p>
        );
    }
    else if (filtered.length <= 10) {
        return (
            <div>
                {filtered.map(filteredData =>
                    <Find
                        key={filteredData.name.common}
                        data={filteredData}
                        showCountry={showCountry}
                        setFindCountry={setFindCountry}
                    />
                )}
            </div>
        )
    } else {
        return (
            <p>Too many matches, specify another filter</p>
        )
    }
};

export default Countries;