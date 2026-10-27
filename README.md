# ArN Electronics 🛒

**ArN Electronics is a full-stack e-commerce web application built to practise modern web development. It combines a React frontend with a Node.js/Express backend and a MySQL database.

The project focuses on product browsing, shopping cart management, page navigation, backend API integration, authentication, and an AI shopping assistant.

##  Project Overview

The goal of Arnold Tech Store is to develop a functional online shopping experience while applying practical frontend and backend development concepts.

###  Features

## 📌 Project Overview

The goal of Arnold Tech Store is to develop a functional online shopping experience while applying practical frontend and backend development concepts.

### ✨ Features


- **Product Display:** Display technology products with names, images, prices, and ratings.
- **Shopping Cart:** Add products, update quantities, remove items, and calculate totals.
- **Product Details:** View additional information about selected products.
- **Navigation:** Navigate between the home, cart, and checkout pages.
- **User Authentication:** Login functionality using a backend authentication flow.
- **Backend API:** Communicate with an Express.js server to retrieve and manage application data.
- **Database Integration:** Use MySQL for persistent data where configured.
- **AI Shopping Assistant:** An experimental chatbot integration using OpenRouter.

*Note: Feature availability and completion should be verified against the current implementation. Payment processing, production-ready checkout, and administrative permissions should not be considered implemented unless separately completed and tested.*

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| React | Building the user interface |
| JavaScript | Application logic and interactivity |
| CSS | Styling and responsive layouts |
| React Router | Client-side navigation |
| Node.js | Backend JavaScript runtime |
| Express.js | Backend API and server routes |
| MySQL | Relational database |
| JWT | Token-based authentication |
| Yarn | Frontend dependency management |
| OpenRouter API | Experimental AI chatbot integration |

## 📂 Project Structure

The following is an illustrative structure. Adjust it to match the actual files in your repository.

```text
ecommerceplatform/
│
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Cart/
│   │   ├── Categories/
│   │   ├── ChatBot/
│   │   ├── FeaturedProducts/
│   │   ├── ProductCard/
│   │   └── ProductDetails/
│   ├── App.js
│   └── index.js
│
├── backend/
│   ├── server.js
│   ├── db.js
│   ├── package.json
│   └── .env
│
├── package.json
├── .gitignore
└── README.md
```

## ⚙️ Getting Started

Follow these steps to run the application locally.

### Prerequisites

Install the following:

- Node.js
- Yarn
- MySQL Server
- Git

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Navigate into the project directory:

```bash
cd ecommerceplatform
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your actual repository URL.

### 2. Install frontend dependencies

From the project root, run:

```bash
yarn install
```

### 3. Configure the backend

Open a terminal and navigate to the backend directory:

```bash
cd backend
```

Install the backend dependencies using the package manager and lockfile configured for that directory.

Create a backend `.env` file containing the environment variables required by your server.

For example:

```env
PORT=5000
JWT_SECRET=replace_with_a_new_secure_secret
DB_HOST=localhost
DB_USER=your_database_username
DB_PASSWORD=your_database_password
DB_NAME=arnold_tech_store
```

These are example variable names. Confirm that they match the variables read by your actual `server.js` and `db.js` files before using them.

**Security:** Never commit your real `.env` file, database credentials, JWT secrets, or API keys to GitHub.

### 4. Configure the database

Ensure that MySQL is running and that the database and tables required by the application have been created.

The database name previously used during development was:

```text
arnold_tech_store
```

The required table structure and any initial product data should match your current backend implementation.

### 5. Start the backend

From the `backend` directory, use the start command defined in its `package.json`.

For example, if the server is configured to run directly with Node.js:

```bash
node server.js
```

The backend was previously configured to use port `5000`. Confirm the current configuration before starting it.

### 6. Start the frontend

Open a separate terminal, return to the project root, and run:

```bash
yarn start
```

The React development server should open the application in your browser. If it does not, follow the URL displayed in the terminal.

## 🧠 Key Concepts Applied

This project provides practical experience with:

- React components and reusable UI elements.
- Props and state management.
- React Hooks, including `useState` and `useEffect`.
- JavaScript array methods such as `map()`, `filter()`, and `reduce()`.
- React Router and client-side navigation.
- Fetch API and asynchronous requests.
- REST API communication.
- Express routes and middleware.
- MySQL database integration.
- JWT authentication.
- Environment variables and application configuration.
- Error handling and debugging.

## 🔐 Security Considerations

Security is an important part of the project's ongoing development.

- Keep database credentials and JWT signing secrets on the backend.
- Never commit `.env` files containing real credentials.
- Validate incoming data on the backend.
- Use parameterised SQL queries.
- Store passwords using an appropriate password-hashing algorithm.
- Verify authentication tokens on protected backend routes.
- Keep third-party API keys on the server rather than exposing them in frontend code.
- Avoid including real user information in test data.

The AI chatbot should make OpenRouter requests through the Express backend before the application is deployed publicly.

## 🧪 Testing

The following areas should be tested before considering a release ready:

- Product data loads correctly.
- Product details display correctly.
- Products can be added to and removed from the cart.
- Quantity controls and cart totals work correctly.
- Navigation between pages works.
- Loading and API error states are handled appropriately.
- Login handles successful and unsuccessful requests.
- Protected backend routes reject missing or invalid authentication tokens.
- The chatbot handles successful responses and API errors.
- The application works at different screen sizes.
- No credentials are exposed in the repository or frontend build.

## 🚧 Future Improvements

Potential improvements include:

- Completing and testing the checkout and order-management workflow.
- Improving authentication and session security.
- Adding product search, filtering, and sorting.
- Improving form validation and error handling.
- Adding automated frontend and backend tests.
- Improving accessibility and mobile responsiveness.
- Completing and securing the AI chatbot integration.
- Adding administrative features with appropriate access controls.
- Improving deployment configuration and monitoring.

These are planned improvements, not claims that the features are already implemented.

## 👨‍💻 Author

**Jengo Arnold**


<<<<<<< HEAD

=======
>>>>>>> 1ab307c72595ce4ffdcae29ccbc4dfe834a55c4f
GitHub: [JengoArnold](https://github.com/JengoArnold)

## 📄 License

<<<<<<< HEAD
A license has not yet been specified. Add a `LICENSE` file if you decide to publish the project under an open-source license.
=======
A license has not yet been specified. Add a `LICENSE` file if you decide to publish the project under an open-source license.
>>>>>>> 1ab307c72595ce4ffdcae29ccbc4dfe834a55c4f
