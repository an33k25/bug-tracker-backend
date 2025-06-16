# Bug Tracker Client

This directory contains the React frontend for the Bug Tracking System, built with Create React App.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

* **Node.js**: Version 18.x or higher. You can download it from [nodejs.org](https://nodejs.org/).

## Installation Steps

1.  **Navigate to the Client Directory**
    From the project's root directory, move into the `/client` folder.
    ```bash
    cd client
    ```

2.  **Install Dependencies**
    Run the following command to install all the necessary Node.js packages for the React application.
    ```bash
    npm install
    ```

## Configuration

The client application needs to know the address of the backend server API.

1.  **Set the API Base URL**
    Open the file located at `client/src/services/api.js`.

2.  **Verify the `baseURL`**
    Ensure the `baseURL` property points to the correct address and port of your running server. For local development, this should typically be:
    ```javascript
    const api = axios.create({
      baseURL: 'http://localhost:3000/api', // Default for this project
    });
    ```

## Serving the Application

Once installation and configuration are complete, you can start the React development server.

1.  **Start the Development Server**
    From within the `/client` directory, run:
    ```bash
    npm start
    ```

2.  **View the Application**
    This will automatically open a new tab in your web browser pointing to `http://localhost:3001` (or the next available port). The application will automatically reload if you make changes to the source code.
