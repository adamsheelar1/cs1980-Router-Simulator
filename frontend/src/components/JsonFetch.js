import React, { useEffect, useState } from 'react';

const JsonFetch = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3000/packets');
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    return (
        <div>
            <h1>JSON Data:</h1>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>Priority: {item.priority}, Weight: {item.weight}</li>
                ))}
            </ul>
        </div>
    );
};

export default JsonFetch;