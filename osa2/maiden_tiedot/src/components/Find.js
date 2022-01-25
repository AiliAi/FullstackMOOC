import React, { useEffect } from 'react';
import InfoCard from './InfoCard';


const Find = ({ data, showCountry, setFindCountry }) => {

    useEffect(() => {
    }, []);

    const showInfo = () => {
        setFindCountry(data.name.common);
    };

    return (
        <>
            {!showCountry ?
                <div>{data.name.common}
                    <button
                        type="click"
                        onClick={showInfo}
                    >
                        show
                    </button>
                </div> :
                <InfoCard data={data} />
            }
        </>
    )
};

export default Find;