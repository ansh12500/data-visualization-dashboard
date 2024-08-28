import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Home';
import Dashboard from './Dashboard';
import Navbar from './Navbar';

function App() {
    const [data, setData] = useState([]);

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home onDataFetch={setData} />} />
                <Route path="/dashboard" element={<Dashboard data={data} />} />
            </Routes>
        </Router>
    );
}

export default App;
