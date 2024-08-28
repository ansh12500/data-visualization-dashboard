import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
  Cell,
} from "recharts";

const Dashboard = ({ data }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [countryFilter, setCountryFilter] = useState("");
  const [sectorFilter, setSectorFilter] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [topicFilter, setTopicFilter] = useState("");

  useEffect(() => {
    applyFilter();
  }, [countryFilter, sectorFilter, regionFilter, topicFilter, data]);

  const applyFilter = () => {
    const filtered = data.filter((item) => {
      return (
        (!countryFilter || item.country === countryFilter) &&
        (!sectorFilter || item.sector === sectorFilter) &&
        (!regionFilter || item.region === regionFilter) &&
        (!topicFilter || item.topic === topicFilter)
      );
    });
    setFilteredData(filtered);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "country":
        setCountryFilter(value);
        break;
      case "sector":
        setSectorFilter(value);
        break;
      case "region":
        setRegionFilter(value);
        break;
      case "topic":
        setTopicFilter(value);
        break;
      default:
        break;
    }
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF5A5F"];

  // Prepare data for charts
  const countryData = Object.entries(
    filteredData.reduce((acc, curr) => {
      acc[curr.country] = (acc[curr.country] || 0) + 1;
      return acc;
    }, {})
  ).map(([key, value]) => ({ name: key, value }));

  const sectorData = Object.entries(
    filteredData.reduce((acc, curr) => {
      acc[curr.sector] = (acc[curr.sector] || 0) + 1;
      return acc;
    }, {})
  ).map(([key, value]) => ({ name: key, value }));

  const regionData = Object.entries(
    filteredData.reduce((acc, curr) => {
      acc[curr.region] = (acc[curr.region] || 0) + 1;
      return acc;
    }, {})
  ).map(([key, value]) => ({ name: key, value }));

  const topicData = Object.entries(
    filteredData.reduce((acc, curr) => {
      acc[curr.topic] = (acc[curr.topic] || 0) + 1;
      return acc;
    }, {})
  ).map(([key, value]) => ({ name: key, value }));

  const lineChartData = filteredData.map(item => ({
    name: item.title,
    value: item.likelihood || 0  // Assuming likelihood is a numeric value
  }));

  const donutChartData = filteredData.reduce((acc, curr) => {
    acc[curr.intensity] = (acc[curr.intensity] || 0) + 1;
    return acc;
  }, {});

  const donutChartFormattedData = Object.entries(donutChartData).map(([key, value]) => ({ name: key, value }));

  return (
    <div className="dashboard-container">
      <h1>Data Visualization Dashboard</h1>

      {/* Filters */}
      <div className="filter-container">
        <select name="country" onChange={handleFilterChange} value={countryFilter}>
          <option value="">All Countries</option>
          {[...new Set(data.map(item => item.country))].map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <select name="sector" onChange={handleFilterChange} value={sectorFilter}>
          <option value="">All Sectors</option>
          {[...new Set(data.map(item => item.sector))].map((sector) => (
            <option key={sector} value={sector}>
              {sector}
            </option>
          ))}
        </select>
        <select name="region" onChange={handleFilterChange} value={regionFilter}>
          <option value="">All Regions</option>
          {[...new Set(data.map(item => item.region))].map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
        <select name="topic" onChange={handleFilterChange} value={topicFilter}>
          <option value="">All Topics</option>
          {[...new Set(data.map(item => item.topic))].map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </div>

      {/* Charts */}
      <div className="chart-container">
        <div className="chart-item">
          <h3>Country Distribution</h3>
          <PieChart width={400} height={400}>
            <Pie
              dataKey="value"
              isAnimationActive={true}
              data={countryData}
              cx={200}
              cy={200}
              outerRadius={120}
              fill="#8884d8"
              label
            >
              {countryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <div className="chart-item">
          <h3>Sector Distribution</h3>
          <BarChart
            width={600}
            height={400}
            data={sectorData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
            barSize={40}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="value" fill="#82ca9d">
              {sectorData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </div>

        <div className="chart-item">
          <h3>Likelihood Over Time</h3>
          <LineChart width={600} height={300} data={lineChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        </div>

        <div className="chart-item">
          <h3>Intensity Distribution</h3>
          <PieChart width={400} height={400}>
            <Pie
              dataKey="value"
              isAnimationActive={true}
              data={donutChartFormattedData}
              cx={200}
              cy={200}
              innerRadius={100}
              outerRadius={150}
              fill="#8884d8"
              label
            >
              {donutChartFormattedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <div className="chart-item">
          <h3>Region Distribution</h3>
          <PieChart width={400} height={400}>
            <Pie
              dataKey="value"
              isAnimationActive={true}
              data={regionData}
              cx={200}
              cy={200}
              outerRadius={120}
              fill="#8884d8"
              label
            >
              {regionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <div className="chart-item">
          <h3>Topic Distribution</h3>
          <BarChart
            width={600}
            height={400}
            data={topicData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
            barSize={40}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="value" fill="#82ca9d">
              {topicData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
