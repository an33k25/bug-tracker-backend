
This directory contains the Node.js/Express backend API for the Bug Tracking System.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

* **Node.js**: Version 18.x or higher. You can download it from [nodejs.org](https://nodejs.org/).
* **MySQL**: Version 8.x or higher. You can install it via [Homebrew](https://brew.sh/) (`brew install mysql`) or from the official [MySQL website](https://dev.mysql.com/downloads/).

## Installation Steps

1.  **Clone the Repository** (or download the source code).
    ```bash
    git clone <your-repository-url>
    cd <your-repository-name>/server
    ```

2.  **Install Dependencies**
    From within the `/server` directory, run the following command to install all the necessary Node.js packages.
    ```bash
    npm install
    ```

## Configuration

The server's configuration is managed through environment variables.

1.  **Create an Environment File**
    In the `/server` directory, you will find a file named `.env.example`. Make a copy of this file and rename it to `.env`.
    ```bash
    cp .env.example .env
    ```

2.  **Edit the `.env` File**
    Open the newly created `.env` file in a text editor and fill in your specific configuration details.

    ```dotenv
    # Server Configuration
    PORT=3000

    # MySQL Database Configuration
    DB_HOST=localhost
    DB_PORT=3306
    DB_USER=your_db_user # e.g., root
    DB_PASSWORD=your_db_password
    DB_NAME=bug_tracker_db

    # JWT Secret for Token Generation
    JWT_SECRET=your_super_secret_jwt_key
    ```

## Database Setup (Migrations)

This project uses raw SQL scripts for database setup instead of a formal migration tool.

1.  **Create the Database**
    Log in to your MySQL instance and create the database for the application.
    ```sql
    CREATE DATABASE bug_tracker_db;
    ```

2.  **Run Migrations (Create Tables)**
    From your terminal, navigate to the `db/` directory located in the project's root. Run the following command to execute the schema script, which will create all the necessary tables, columns, and indexes. You will be prompted for your MySQL user's password.
    ```bash
    # Make sure you are in the db/ directory
    mysql -u your_db_user -p bug_tracker_db < schema.sql
    ```

3.  **Seed the Database (Optional)**
    To populate the database with sample data (2 users, 2 projects, etc.), run the following command from the `db/` directory.
    ```bash
    mysql -u your_db_user -p bug_tracker_db < sample_data.sql
    ```

## Running the Server

Once installation and configuration are complete, you can start the server.

* **For Development (with auto-reloading):**
    ```bash
    npm run dev
    ```
    The server will start on the port specified in your `.env` file (e.g., `http://localhost:3000`) and will automatically restart when you save changes to a file.

* **For Production:**
    ```bash
    npm start
    ```
