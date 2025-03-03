# Sensor Data Visulaization App

This application is developed using React and TypeScript, along with MUI, to visualize sensor data in a clean dashboard. It also allows users to edit and delete items. If the route doesn't match any page, a 404 error page will be displayed.

## Table of Contents

- [Technology Used](#technology-used)

- [Setup Instructions](#setup-instructions)

- [How to Use](#how-to-use)

## Technology Used

* React -- JavaScripts library for building user interface.
* Typescript -- Typed superset of JavaScript in which specified the type.
* Hook Form -- State management for Raect.
* React-router -- Routing library for Ract
* MUI -- Material UI for React to make responsive for both desktop and mobile.
* Redux -- State management for React apps.
* Highcharts -- Library for creating intractive way of visualize data.

## Setup Instructions

1. Create a TypeScript project using the command npx create-react-app sj022025 --template typescript, and then rename it to SJ022025.

2. First, create a project with the given name starting with capital letters. Since NPM doesn't support project names that start with capital letters, the easiest way to create a project name with a capital letter is to first create it with lowercase letters and then rename it to start with a capital letter, followed by the month and year.

3. After successfully creating the project, install all the dependencies using the command: npm install @mui/material @emotion/react @emotion/styled react-router-dom @reduxjs/toolkit react-redux highcharts react-hook-form.

4. Here we use npx to run packages or executables directly without needing to install them first. Once the project is created, we can customize the src folder according to the project requirements.

5. To run the project, use npm start, and the page will be displayed at http://localhost:3000. To stop the server, press Cmd + C.

6. After successfully running the server, we need to create a repository on GitHub and add our project to the repository at [https://github.com/shardendu-design/SJ022025](https://github.com/shardendu-design/SJ022025).

7. After successfully setting up and running the server, you need to add files and folders as per the project requirements. In this project, the following structure is needed for the project to run successfully.

```bash
├── package-lock.json
├── package.json
├── public
│   └── index.html
├── src
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── assets
│   │   └── dashboard.png
│   ├── componenets
│   │   ├── 404Page
│   │   │   └── 404Page.tsx
│   │   ├── Chart
│   │   │   └── Chart.tsx
│   │   ├── Modal
│   │   │   └── Modal.tsx
│   │   └── Sidebar
│   │       └── Sidebar.tsx
│   ├── data.json
│   ├── hooks
│   ├── index.css
│   ├── index.tsx
│   ├── logo.svg
│   ├── react-app-env.d.ts
│   ├── reportWebVitals.ts
│   ├── setupTests.ts
│   ├── store
│   │   ├── slices
│   │   │   └── chartSlices.ts
│   │   └── store.ts
│   ├── types.ts
│   └── utils
│       └── loadData.ts
└── tsconfig.json
```
## How to Use

Once app is running..

* The home page will display an empty sidebar with no list of items, along with an option to create a new item using the existing JSON data.

* Creating an item allows you to generate a new entry using the existing data, with a preferred color and text description for the current session. Once created, the item will appear in the sidebar.

* To view the visualization, select an item from the list, and the visual representation along with the text description and period date will appear.

* In the sidebar, there is a context menu with options to edit and delete items. You can edit an existing item or delete it as needed.

* At the top of the sidebar, there is a search option to help find a specific item.

* All undefined routes display an error page with the message 'Page not found. Please try again later.' along with a Home button.

