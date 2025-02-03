# Investment Tracking Website

## Overview

Track and manage your mutual fund investments effortlessly. Buy, sell, and stay updated with daily NAVs for 10,000+ funds, all in one place.

## Features

- **User Authentication**: Secure sign-up, login, and logout functionality.
- **Daily NAVs**: Get daily NAV for over 10,000 funds.
- **NAV Chart**: NAV charts for various time frames like 1 month, 3 months, 1 year, YTD, etc.
- **Dashboard**: Track investments and monitor portfolio performance.
- **Integration with financial APIs**: Real-time financial data.
- **Responsive and user-friendly UI**

## Tech Stack

- **Frontend**: React, React-Router, Tailwind CSS, Chart.js
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT

## Setup & Installation

### Prerequisites

- Node.js (v16+)
- PostgreSQL setup

### Steps

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/investment-tracker.git
   cd investment-tracker
   ```

2. Install dependencies:

   ```sh
   cd frontend/
   npm install
   ```

   ```sh
   cd backend/
   npm install
   ```

3. Set up environment variables in a `.env` file:
   ```env
    BACKEND_PORT=CUSTOM_BACKEND_PORT (default: 3000)
    DB_HOST=CUSTOM_PORT ( default: 'localhost')
    DB_USER=YOUR_NAME
    DB_NAME=DB_NAME
    DB_PASSWORD=DB_PASSWORD
    DB_PORT=DB_PORT (default: 5432)
    SALT_ROUNDS=CUSTOM_SALT_NUMBER
    ACCESS_TOKEN_SECRET=SECRET_KEY
    REFRESH_TOKEN_SECRET=SECRET_KEY
    DATABASE_URL='postgresql://DB_USER:DB_PASSWORD@DB_HOST:DB_PORT/DB_NAME'
   ```
4. Start the development servers:
   ```sh
   cd frontend/
   npm run dev
   ```
   ```sh
   cd backend/
   npm run dev
   ```
5. Open `http://localhost:5173` in your browser.

## Contribution Guidelines

1. Fork the repository and create a new branch.
2. Make your changes and test thoroughly.
3. Submit a pull request with a detailed description of your changes.

## License

This project is licensed under the MIT License.
