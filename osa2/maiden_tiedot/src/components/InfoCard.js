import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Weather from './Weather';

const InfoCard = ({ data }) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const watherApiKey = process.env.REACT_APP_WEATHER_KEY;
        let isMounted = true;   
        axios
            .get(`http://api.weatherstack.com/current?access_key=${watherApiKey}&query=${data.capital}`)
            .then(response => {
                if (isMounted) setWeather(response.data);
            })
            return () => { isMounted = false };
    }, [data.capital]);

    let i = 0;
    return (
        <div>
            <h1>{data.name.common}</h1>
            <div>capital {data.capital}</div>
            <div>population {data.population}</div>
            <h2>languages</h2>
            {Object.values(data.languages).map(lang => <li key={i++}>{lang}</li>)}
            <img src={data.flags.png} alt={data.name.common} />
            {
                weather &&
                <Weather weather={weather} />
            }
        </div>
    )
};

export default InfoCard;