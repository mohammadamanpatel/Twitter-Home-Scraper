
---

# Twitter Home Scraper: A MERN Stack Application

This repository contains the source code for a **MERN Stack Web Scraper** designed to extract real-time data from Twitter's "What's Happening" section. This application combines powerful web scraping tools with an intuitive user interface to showcase the integration of modern web technologies.

---

## Table of Contents
- [Overview](#overview)
- [Core Features](#core-features)
- [Technologies Used](#technologies-used)
- [Environment Variables](#environment-variables)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Video Demonstration](#video-demonstration)

---

## Overview

This project is a full-stack application leveraging the **MERN stack** (MongoDB, Express, React, Node.js) to provide:
- **Web Scraping**: Extracts the "What's Happening" section from Twitter’s homepage.
- **User Authentication**: Secure login functionality.
- **Dynamic Frontend**: A responsive UI to display scraped data and user interactions.
- **Third-Party Integrations**: Efficient proxy handling with **Scraper API**.

The backend implements efficient scraping techniques using **Cheerio** and **Selenium WebDriver**, ensuring reliable data extraction while complying with modern web standards.

---

## Core Features

### 1. **Web Scraping**
- Scrapes real-time content from Twitter's "What's Happening" section.
- Utilizes **Scraper API** for seamless proxy management.
- Dynamic IP Rotation
- Scraper API provides dynamic IP rotation and proxies to avoid rate limits or bans. This is equivalent to what ProxyMesh offers, so it is a valid replacement.

### 2. **API Features**
- Ensure Scraper API supports the following, as ProxyMesh does:
- IP rotation with every request.
- Integration with Selenium or your scraping setup.
- [Documentation Proof](https://docs.scraperapi.com/nodejs)
- Mention how Scraper API manages IP rotation.
- Supports dynamic content extraction using **Cheerio** and **Selenium**.

### 3. **Login Functionality**
- Secure login to Twitter via automated scraping with credentials (configured via environment variables).
- Extracts personalized "What's Happening" data post-authentication.

### 4. **Data Visualization**
- Displays the scraped content in an organized, user-friendly interface.
- Dynamic updates allow real-time insights into trending topics.

---

## Technologies Used

### Backend
- **Node.js**: Handles server-side logic.
- **Express.js**: Framework for building RESTful APIs.
- **MongoDB**: Stores user data and scraped content.
- **Mongoose**: MongoDB object modeling for schema definitions.
- **Scraper API**: Manages proxy requests for reliable scraping.
- **Cheerio**: Parses and manipulates HTML for static data extraction.
- **Selenium WebDriver**: Automates browser interactions for dynamic content.

### Frontend
- **React.js**: Develops a fast, responsive user interface.
- **Vite**: Modern frontend tooling for rapid builds.
- **Fetch**: Fetches backend data efficiently.
---

## Environment Variables

To configure the application, create a `.env` file in the `backend` directory with the following keys:

```env

PORT=                    # Backend server port
MONGO_URL=               # MongoDB connection URI

# Scraper API
SCRAPER_API_KEY=         # API key for the Scraper API
SCRAPER_PROXY_URL=       # Proxy URL for the Scraper API

# Twitter Credentials
TWITTER_USERNAME=        # Twitter account username
TWITTER_PASSWORD=        # Twitter account password

```

---

## Folder Structure

```
.
├── backend               # Backend codebase
│   ├── controllers       # API logic
│   ├── models            # MongoDB schema definitions
│   ├── routes            # API endpoints
│   ├── server.js         # Backend server entry point
│   └── .env              # Environment configuration
├── frontend              # Frontend codebase
│   ├── src               # React components and pages
│   ├── public            # Static assets
│   └── vite.config.js    # Build configuration
└── README.md             # Documentation
```

---

## Installation

### Prerequisites
Ensure you have the following installed:
- **Node.js** and **npm**
- **MongoDB**
- **Git**

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/mohammadamanpatel/Twitter-Home-Scraper
   cd twitter-scraper
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

4. Configure the `.env` file in the `backend` directory with the necessary credentials.

5. Start MongoDB and run the backend:
   ```bash
   cd backend
   npm start
   ```

6. Run the frontend:
   ```bash
   cd ../frontend
   npm run dev
   ```

---

## Usage

1. Navigate to `http://localhost:5173` to access the frontend.
2. Scraped Twitter data from the "What's Happening" section will be displayed.
3. Use the login page to authenticate with a Twitter account for personalized scraping.

---


## Video Demonstration
[Watch the video demonstration here](https://drive.google.com/file/d/1Wzwa2MTcQpSEmFBOpVM2r2wDNrUZmIxs/view?usp=sharing).

---
