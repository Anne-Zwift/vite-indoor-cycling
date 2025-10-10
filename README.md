# 📦 My Social Media App


## 🌟 Highlights

- The front-end will allow users to perform CRUD operations (Create, Read, Update, and Delete) on their own posts.
- Features such as following/unfollowing users, commenting on posts, and reacting to a post with an emoji.

## ℹ️ Overview

This is a front-end for a social media application, it is a single-page application built with Vite and JavaScript. 

### The pages included are:
- Login page.
- Register page.
- Posts/feed page.
- Individual post page.
- User’s own profile page.

### Out of Scope:
The importance of this assignment is to demonstrate JavaScript. Therfore it will not be an amazing design for the project, just some basic styling in place.

## System Architecture:

### Backend Context
The backend server is hosted externally and is not part of this repository. All API requests are from the client directed to the base Url defined in `src\constants.ts`.
The application follows a Three-Tier Monolithic architecure by connecting to a remote, unified Node.js/Express API backend by PostgreSQL. This repository contains only the client-side code.

<img width="439" height="170" alt="image" src="https://github.com/user-attachments/assets/3a50e262-c7a9-4f97-8a10-043241172906" />

### Component Breakdown:

**Browser(Client):** The Single-Page Application (SPA) built with Vite and TypeScript. It communicates with the Server via API calls.<br>
**Server(Monolith):** A single external Node.js/Express application that hosts all business logic (Auth, Posts, Routing) and serves the API endpoints.<br>
**Database(PostgreSQL):** The external persistent data store used by the Server.<br>

## 💻 Technologies
Languages:

- TypeScript

Frameworks & Libraries:

- Vite

- Jest
  

## 📂File Structure
The project follows a standard file structure for a Vite application.

* `src/api/`: Contains service files for handling API requests.

* `src/components/`: Houses UI components.

* `src/pages/`: Contains the main pages of the application.

* `src/utils/`: Stores reusable utility functions, like data transformers.

* `index.html`: The entry point of the application.

* `package.json`: Manages project dependencies and scripts.

* `jest.config.js`: Configuration file for unit tests.

* `tsconfig.json`: TypeScript configuration.


### ✍️ Authors

I'm a Front End Developer student [@Anne-Zwift](https://github.com/Anne-Zwift/) and this is my [project](https://github.com/Anne-Zwift/vite-indoor-cycling/) building a social media application.


## 🚀 Usage

This application is designed to be used in a web browser. Once you have it running, you will be able to navigate through the different pages to log in, register, view the post feed, and interact with user profiles and posts.


## ⬇️ Installation

#### Getting Started
### Prerequisites
You need to have [Node.js](https://nodejs.org/en/) and npm installed on your computer.

### Installation

#### 1. Clone the repository:

`git clone [your-repo-url]`


#### 2. Navigate to the project directory:

`cd vite-indoor-cycling`


#### 3. Install the dependencies:

`npm install`


### Running the Project
To start the development server and view the application in your browser, run the following command:

`npm run dev`

The application will be available at a local URL, typically `http://localhost:5173`.


## 💭 Feedback and Contributing

#### 👩‍🎓 This is a project for my education purpose only.
