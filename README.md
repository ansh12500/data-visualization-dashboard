# Visualization Dashboard

## Overview

This is a data visualization dashboard built using the MERN stack, with a MongoDB database, Node.js API, and a React frontend. The dashboard visualizes data from the provided JSON file, offering insights into various variables such as intensity, likelihood, relevance, year, country, topics, and region.

## Getting Started

### Prerequisites

* Node.js (version 14 or higher)
* MongoDB (version 4 or higher)
* npm (version 6 or higher)

### Installation

1. Clone the repository: `git clone https://github.com/ansh12500/data-visualization-dashboard.git`
2. Install dependencies: `npm install` or `yarn install`
3. Start the MongoDB server: `mongod`
4. Seed the database with the provided JSON data: `node seed.js`
5. Start the Node.js API: `node server.js`
6. Start the React frontend: `npm start` or `yarn start`

## Dashboard Features

### Charts and Visualizations

* Intensity
* Likelihood
* Relevance
* Year
* Country
* Topics
* Region

### Filters

* End year filter
* Topics filter
* Sector filter
* Region filter
* PEST filter
* Source filter
* SWOT filter
* Country filter
* City filter

## API

The Node.js API provides data from the MongoDB database, allowing the frontend to fetch and display the data dynamically.

### API Endpoints

* `/api/data`: Fetches all data from the MongoDB database
* `/api/data/:filter`: Fetches data filtered by the specified filter (e.g. `/api/data/topics`)

## Technical Details

### Backend

* Node.js API built using Express.js
* MongoDB database for storing and retrieving data
* Mongoose ORM for interacting with the MongoDB database

### Frontend

* React frontend for rendering the dashboard and visualizations
* D3.js for building interactive charts and visualizations
* React Hooks for managing state and side effects

### Database

* MongoDB database seeded with the provided JSON data

## Development Notes

* The JSON data was imported into the MongoDB database using the `seed.js` script.
* The Node.js API was built using Express.js, with routes for fetching data from the MongoDB database.
* The React frontend was built using functional components and React Hooks.
* D3.js was used to create interactive charts and visualizations.

## Future Development

* Additional Visualizations: Explore adding more visualizations to provide deeper insights into the data.
* Advanced Filtering: Implement more advanced filtering capabilities, such as multi-select filters and conditional filtering.
* Data Updates: Develop a mechanism for updating the MongoDB database with new data, and reflect the changes in the dashboard.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
