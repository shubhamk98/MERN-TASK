

## MERN Stack Project: Local Development Setup

This project is a MERN (MongoDB, Express.js, React.js, Node.js) stack application 

## Prerequisites

Before starting, ensure you have the following installed on your system:

- Node.js and npm (or yarn). You can download them from the official website: [https://nodejs.org/](https://nodejs.org/)
- A code editor of your choice (e.g., Visual Studio Code, Sublime Text)

## Instructions

### Clone the Repository

1. Open your terminal and navigate to your desired project directory.

2. Clone this repository using the following command:
   ```bash
   mkdir client
   cd client
   git clone https://github.com/shubhamk98/MERN-TASK/tree/main/client
   npm install
   npm run dev
   ```

      ```bash
   mkdir server
   cd server
   git https://github.com/shubhamk98/MERN-TASK/tree/main/server
   npm install
   npm start
   ```



### Set Up Environment Variables

1. Create a `.env` file in the server root directory.

2. Define the necessary environment variables. This project likely utilizes environment variables to store sensitive information like database credentials. Refer to the project code or any additional documentation for specific variables you need to set.

   Example `.env` file:
   ```
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/mern-task-manager
   ```

  


Your MERN stack application should now be running locally. Open your web browser and navigate to [http://localhost:5173](http://localhost:5173) to view it.

