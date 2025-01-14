# Project Setup Guide

This README file will guide you through setting up the project. Follow these steps to ensure everything works correctly.

## Prerequisites
Make sure you have the following installed on your system:

- **Node.js** (version 16 or higher) and npm (Node Package Manager)
- **Git** (for version control)
- **A package manager** (like `npm` or `yarn`)
- **A code editor** (like Visual Studio Code)

## Steps to Setup the Project

### 1. Clone the Repository
```bash
git clone <repository_url>
```
Replace `<repository_url>` with the actual repository link. This will create a local copy of the project.

### 2. Navigate to the Project Directory
```bash
cd <project_directory>
```
Replace `<project_directory>` with the name of the cloned folder.

### 3. Install Dependencies
Run the following command to install all necessary dependencies:
```bash
npm install
```
If you're using `yarn`, you can run:
```bash
yarn install
```

### 4. Environment Variables
Create a `.env` file in the root directory of the project and add the following environment variables:

```env
REACT_APP_API_URL=<API_endpoint>
REACT_APP_AUTH_KEY=<Authentication_Key>
```
Replace `<API_endpoint>` and `<Authentication_Key>` with the appropriate values for your application.

### 5. Start the Development Server
To start the project, run the following command:
```bash
npm start
```
Or, if you're using `yarn`:
```bash
yarn start
```
This will start the development server and open the application in your default browser.

### 6. Build the Project
For production, build the project by running:
```bash
npm run build
```
Or, if you're using `yarn`:
```bash
yarn build
```
The build output will be in the `build/` folder.

## Additional Notes

### Linting and Code Formatting
To lint and format the code, run:
```bash
npm run lint
npm run format
```

### Testing
Run tests using the following command:
```bash
npm test
```

### Dark Mode Setup
To enable the dark mode feature across the dashboard, ensure you have a toggle button implemented that updates the theme context. Use Material-UI's `ThemeProvider` to toggle between light and dark themes.

### Troubleshooting
- If you encounter issues with dependency versions, delete the `node_modules` folder and `package-lock.json` (or `yarn.lock`) and then reinstall:
  ```bash
  npm install
  ```
- Make sure your `.env` file is correctly configured.

## Directory Structure
```
project_root
|
|-- public/          # Static files like index.html
|-- src/             # Source files
    |-- components/  # Reusable React components
    |-- context/     # Context API for global states
    |-- pages/       # Application pages
    |-- styles/      # Global styles and theme setup
|-- .env             # Environment variables
|-- package.json     # Project metadata and dependencies
|-- README.md        # Project setup and information
```

You're all set! If you have any issues, feel free to reach out or consult the documentation.
