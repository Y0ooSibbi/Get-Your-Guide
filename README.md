# Get Your Guide App

## Overview

[Demo Video](https://youtu.be/TzC1oMKmhxg)

The "Get Your Guide" app is a web application for booking guides at different locations. Users can explore available locations, view details, and book guides for specific dates and person counts. The application also includes an admin panel for managing and viewing all bookings.

## Features

- Location list with images and descriptions.
- Booking a guide with date and person count.
- Admin panel to view all bookings.

## Table of Contents

- [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Backend](#backend)
- [Frontend](#frontend)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Setup

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/<your-username>/<your-repo>.git
    cd <your-repo>
    ```

2. Install dependencies:

    ```bash
    cd frontend
    npm install
    cd ../backend
    npm install
    ```

## Usage

1. Start the backend server:

    ```bash
    cd backend
    npm start
    ```

2. Start the frontend:

    ```bash
    cd frontend
    npm start
    ```

3. Open your browser and navigate to `http://localhost:3000` to view the app.

## Folder Structure

```plaintext
<your-repo>/
|-- backend/
|   |-- server.js
|   |-- models/
|   |   |-- Location.js
|   |   |-- Booking.js
|   |-- routes/
|   |   |-- locations.js
|   |   |-- bookings.js
|   |-- ...
|-- frontend/
|   |-- src/
|   |   |-- components/
|   |   |   |-- LocationList.js
|   |   |   |-- AdminBookingTable.js
|   |   |-- App.js
|   |   |-- ...
|-- ...

```

## Backend
server.js: Main file for setting up the Express server.
models/: MongoDB schema models for Location and Booking.
routes/: Express routes for handling locations and bookings.
## Frontend
src/components/: React components, including LocationList and AdminBookingTable.
src/App.js: Main React component.
...
API Endpoints
GET /locations: Retrieve all locations.
POST /bookings: Create a new booking.
...

