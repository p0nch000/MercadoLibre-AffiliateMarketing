# Descuentazos MX (Mercado Libre Deals Bot for Telegram)

This repository contains the source code for a Telegram bot designed to fetch product deals from Mercado Libre and share affiliate links in a dedicated Telegram group called "Descuentazos MX". The project automates the process of fetching product deals, manually generating affiliate links, and distributing these links through a Telegram bot.

## Technologies Used

- **Node.js**: For the backend server and bot logic.
- **Express**: Used to create the server and manage API routes.
- **Mercado Libre API**: For fetching product deals.
- **Telegram Bot API**: For sending messages and managing interactions within the Telegram group.
- **PostgreSQL**: Used for storing product links and corresponding affiliate links.

## Features

- **Deal Fetching**: Automatically fetches deals from Mercado Libre using their official API.
- **Affiliate Link Management**: Manual entry of affiliate links corresponding to the fetched product deals.
- **Telegram Integration**: A bot that sends the affiliate links to a Telegram group, allowing users to access deals directly.
