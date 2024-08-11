# QuickPrism Backend Task

## Overview

This repository contains the backend code for the QuickPrism task. The backend is built using modern technologies and provides essential services for the application.

## Tech Stack

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **TypeScript**: A superset of JavaScript that adds static typing.
- **Prisma**: ORM for database access.
- **PostgreSQL**: Relational database management system.

## Features

- **User Management**: Includes user registration, login, and authentication.
- **Prisma ORM**: Integrated with PostgreSQL for database management.
- **TypeScript**: Ensures type safety and scalability.
- **API Documentation**: Provides detailed API documentation.

## Getting Started

### Prerequisites

- **Node.js**: v14.x or higher
- **PostgreSQL**: Database setup

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/wrritam/quickprism-backend-task.git
   cd quickprism-backend-task

2. **Install Dependencies**
   ```bash
   npm install

3. **Create a .env file in the root directory and add the following variables**
   ```bash
   PORT = a port number
   DATABASE_URL = your postgres database connection string
   hiddenKey = A secret keyword for jwt purposes
   password = generate it from your google account for smtp send mail purposes

4. **Start the development server**
   ```bash
   npm start
