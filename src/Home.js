import axios from 'axios';
import './Home.css';
import React, { useEffect, useState } from 'react';

function Home({ onDataFetch }) {
    const [data, setData] = useState([]);
    const [records, setRecords] = useState(data);

    useEffect(() => {
        axios.get('https://ansh12500.github.io/jsondataapi/data.json')
            .then(res => {
                setData(res.data);
                setRecords(res.data);
                onDataFetch(res.data);  // Pass the fetched data to parent component (App.js)
            })
            .catch(err => console.log(err));
    }, [onDataFetch]);

    const Filter = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setRecords(data.filter(f => 
            f.title && f.title.toLowerCase().includes(searchTerm)
        ));
    };

    return (
        <div className="p-5 bg-light">
            <div className="container">
                <h1 className="text-center mb-4">Company Data</h1>
                <div className="bg-light shadow border p-3">
                    <input 
                        type="text" 
                        className="form-control mb-4" 
                        onChange={Filter} 
                        placeholder="Search by Title" 
                    />
                    <div className="row">
                        {records.map((d, i) => (
                            <div key={i} className="col-md-4 mb-4">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h5 className="card-title">{d.title}</h5>
                                        <p className="card-text">
                                            <strong>Sector:</strong> {d.sector}<br />
                                            <strong>Topic:</strong> {d.topic}<br />
                                            <strong>Region:</strong> {d.region}<br />
                                            <strong>Country:</strong> {d.country}
                                        </p>
                                        <a href={d.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                                            View Report
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
