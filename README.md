Mind X Insight Sharing App
Overview
The Mind X Insight Sharing App is a mobile application built using React Native and Expo for the front-end, and Node.js with Express.js for the back-end. The app enables users to share insightful posts with a title, description, image, and relevant links, fostering a community of knowledge sharing. It incorporates user authentication, post creation, and a dynamic home feed displaying shared insights. The back-end is hosted on Render, with a MongoDB database to store user and post data, and Cloudinary is used for image storage.

Features
User Authentication: Secure user registration and login using JWT (JSON Web Token).
Create Post: Users can create posts including title, description, image, and an optional link.
Home Feed: A dynamic feed that displays posts shared by other users.
Image Upload: Allows users to upload images for their posts via Cloudinary.
API Integration: The back-end communicates via REST APIs for seamless data handling.
Responsive UI: Designed to work across different screen sizes and devices.
Expo Integration: Used for easy development and testing of the app across different platforms.
Technologies Used
Front-end
React Native: For building cross-platform mobile applications.
Expo: Simplifies the React Native workflow, providing a managed environment for faster development.
Axios: For making HTTP requests to the back-end API.
JWT (JSON Web Token): Used for securing user authentication.
Back-end
Node.js: JavaScript runtime used for building the server.
Express.js: A web framework for building RESTful APIs.
MongoDB: NoSQL database to store user information and posts.
Cloudinary: For storing and managing uploaded images.
Render: For hosting the Node.js server and APIs.
Tools
VS Code: Used for coding and development.
Postman: For API testing during development.
EAS Build: Used for creating the APK (Android Package) file.
Getting Started
Prerequisites
Before you start, ensure you have the following installed on your machine:

Node.js (v14 or higher)
npm (v6 or higher)
Expo CLI
MongoDB (or use MongoDB Atlas for cloud hosting)
Cloudinary Account (for image uploads)
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/Anagh-Kansra/MindX-Insight-App.git
cd MindX-Insight-App
Install dependencies for the client:

bash
Copy code
cd client
npm install
Install dependencies for the server:

bash
Copy code
cd ../server
npm install
Create a .env file in the server folder and add the following environment variables:

bash
Copy code
PORT=5000
MONGO_URI=<your_mongo_db_connection_string>
JWT_SECRET=<your_jwt_secret_key>
CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
Start the client (React Native app):

bash
Copy code
cd client
expo start
Start the server (Node.js app):

bash
Copy code
cd ../server
npm start
Create APK (optional, if you need to build an APK):

bash
Copy code
eas build -p android --profile preview
Directory Structure
bash
Copy code
MindX-Insight-App/
├── client/                 # React Native front-end
│   ├── assets/             # Image assets
│   ├── components/         # Reusable React Native components
│   ├── navigation/         # Navigation logic
│   ├── screens/            # App screens like Login, Home, CreatePost
│   ├── App.js              # Main entry file
│   └── package.json        # Client-side dependencies
├── server/                 # Node.js back-end
│   ├── controllers/        # API controllers
│   ├── models/             # MongoDB models (User, Post)
│   ├── routes/             # Express routes (Auth, Post)
│   ├── config/             # MongoDB & Cloudinary configurations
│   ├── server.js           # Main server entry point
│   └── package.json        # Server-side dependencies
├── README.md               # Project documentation
API Endpoints
Authentication
POST /api/auth/register: Register a new user.
Request body: { name, email, password }
Response: { token, user }
POST /api/auth/login: Authenticate a user and provide a JWT.
Request body: { email, password }
Response: { token, user }
Posts
GET /api/posts: Fetch all posts.

Response: [{ post1 }, { post2 }, ...]
POST /api/posts: Create a new post.

Request body: { title, description, image, link }
Response: { post }
GET /api/posts/
: Fetch a specific post by ID.

Response: { post }
DELETE /api/posts/
: Delete a post by ID.

Screens
Login Screen: Allows users to log in using their credentials.
Register Screen: New users can create an account.
Home Feed Screen: Displays all posts shared by users.
Post Creation Screen: Allows users to create and share posts with a title, description, image, and link.
Profile Screen: Displays user details and their posts.
Future Enhancements
Comments and Likes: Add the ability for users to comment on and like posts.
Search Functionality: Implement search for finding specific posts.
Push Notifications: Notify users when new insights are shared.
Contributing
If you want to contribute to this project:

Fork the repository.
Create a new branch for your feature (git checkout -b feature-branch).
Make your changes and commit them (git commit -m 'Add new feature').
Push to the branch (git push origin feature-branch).
Open a pull request.
