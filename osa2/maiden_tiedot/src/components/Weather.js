const Weather = ({ weather }) => {
    return (
        <div>
            <h2>Weather in {weather.location.name}</h2>
            <div><b>temperature:</b> {weather.current.temperature} Celcius</div>
            <img src={weather.current.weather_icons.map(icon => icon)} alt={weather.current.weather_descriptions.map(desc => desc)} />
            <div><b>wind:</b> {weather.current.wind_degree} mph direction {weather.current.wind_dir}</div>
        </div>
    )
};

export default Weather;