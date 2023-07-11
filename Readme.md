# MERN Chat App

This is a MERN (MongoDB, Express.js, React.js, Node.js) stack chat application that provides authentication and one-to-one chat functionality.

## Features

- Authentication: Users can sign up, log in, and log out securely to access the chat app.
- One-to-One Chat: Users can send and receive messages in real-time with other users on the platform.

## Technologies Used

- Front-end: React.js, Redux, Tailwind CSS
- Back-end: Node.js, Express.js
- Database: MongoDB
- Real-time Communication: WebSocket (Socket.io)
- Authentication: JSON Web Tokens (JWT)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/khaled308/mern-chat.git
   ```

2. navigate to app

   ```app
   cd mern-chat
   ```

3. setup backend:

   - navigate to backend

     ```backend
         cd backend
     ```

   - Install the backend dependencies:

   ```dependencies
        npm install
   ```

   - Set up the environment variables:

     - Create a `.env` file in the root directory of the project.

     - Open the `.env` file in a text editor.

     - Add the following variables and provide the corresponding values:

       ```plaintext
       PORT=3000
       MONGODB_URI=your_mongodb_connection_string
       JWT_SECRET=your_jwt_secret
       ```

   - Start the development server:

     ```start server
     npm run dev
     ```

4. setup frontend

   - Open a new terminal window/tab.

   - Navigate to the frontend directory:

     ```frontend
         cd frontend
     ```

   - Install the frontend dependencies:

     ```dependencies
     npm install
     ```

   - Start the development server:

     ```start server
     npm run dev
     ```

## Usage

1. Sign Up:

   - Click on the "Sign Up" link on the login page.
   - Fill in the required information and submit the form.

2. Log In:

   - Enter your credentials (email and password) on the login page.
   - Click the "Log In" button.
   - If the provided credentials are valid, you will be redirected to the chat interface.

3. One-to-One Chat:

   - On the chat interface, you will see a list of available users to chat with.
   - Click on a user's name to open a chat window.
   - Type your message in the input field and press Enter or click the send button.
   - Your message will be displayed in the chat window, and you will receive incoming - messages in real-time.
