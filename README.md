# Descuentazos MX (Mercado Libre Deals Bot for Telegram)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview

Descuentazos MX is a Telegram bot that fetches product deals from Mercado Libre and shares them in a dedicated Telegram group. The bot automates the process of fetching deals, managing affiliate links, and distributing these links through Telegram.

## Features

- Automatic weekly deal fetching from Mercado Libre
- Telegram bot integration for sharing deals
- Affiliate link management
- Scheduled tasks using cron jobs
- Database storage for deals and affiliate links
- Graceful shutdown handling

## Technologies Used

- Node.js
- Sequelize ORM
- PostgreSQL
- Telegraf (Telegram Bot API)
- Cron (for scheduled tasks)
- Dotenv (for environment variable management)

## Setup

1. Clone the repository:
   git clone https://github.com/yourusername/descuentazos-mx.git

2. Install dependencies:
   cd descuentazos-mx
   npm install

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   Local Database Configuration
   DB_PORT=5433
   DB_USER=postgres
   DB_PASSWORD=your_database_password
   DB_HOST=localhost
   DB_NAME=DescuentazosMX
   Mercado Libre API Configuration
   MERCADO_LIBRE_CLIENT_SECRET=your_client_secret
   MERCADO_LIBRE_REFRESH_TOKEN=your_refresh_token
   MERCADO_LIBRE_APP_ID=your_app_id
   MERCADO_LIBRE_ACCESS_TOKEN=your_access_token
   MERCADO_LIBRE_USER_ID=your_user_id
   MERCADO_LIBRE_TOKEN_EXPIRATION=21600

4. Set up the PostgreSQL database and run migrations (if applicable).

5. Start the server:
   npm run dev

## Project Structure

- `models/`: Database models and associations
- `config/`: Configuration files, including database setup
- `services/`: Core functionalities (deals fetching, Telegram bot setup)
- `utils/`: Utility functions, including affiliate link management
- `main.js`: Entry point of the application

## Usage

1. The bot automatically fetches new deals from Mercado Libre every Monday at 10 AM (Mexico City time).
2. Affiliate links are checked and associated with fetched deals.
3. The bot sends new deals with affiliate links to subscribed users in the Telegram group.
4. Users can interact with the bot using commands (setup in the `setupBot` function).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).
