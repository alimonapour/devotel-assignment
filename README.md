# React Typescript Devotel Weather Forecast Application

**For testing the project in your local environment, you will need to create a .env file in the project directory like the .env.example and copy all variables specified therein.**

A single-page application was built using React, Typescript, and TawilwindCss with current temperature, weather description, time, an icon representing the weather, a 7-day forecast, and a display of weather based on user-selected start and end dates.

## Demo
https://snapp-food-vendors-list.vercel.app

## Features

- Show current temperature, weather description, time, an icon representing the weather
- Show 7-day forecast weather
- Show a daily forecast for the next 7 days
- Users can set the start and end date for weather history.
- detect the user's current location and provide weather information accordingly.
- In case the user does not give permission, the app should get the location by IP.
- In case the user does not provide permission, and the location cannot be determined by IP address, the location is determined by a user-entered city.
- Responsive Design
- A decent UI/UX
- Error Handling

## Built With

- React - A JavaScript library for building user interfaces.
- TypeScript - A strict syntactical superset of JavaScript.
- Redux Toolkit - The Redux Toolkit package is intended to be the standard way to write Redux logic.
- Vite - Vite is a build tool that aims to provide a faster and leaner development experience for modern web projects.
- Tailwind CSS - A utility-first CSS framework.

## App Structure

- **src/App.tsx:** include the main file for rendering the app.
- **src/components/Home: Components for rendering the current conditions and seven days forecast weather and historical weadther.
- **src/services:** Include call API files.
- **src/types:** Include typescript types for app data and props.
- **src/utils:** Include functions that are used in more than one component.

## Conclusion

A single-page application was built using React, Typescript, and TawilwindCss with current temperature, weather description, time, an icon representing the weather, a 7-day forecast, and a display of weather based on user-selected start and end dates.

## Getting Started with Vite
Uses [Vite](https://vitejs.dev/), [Vitest](https://vitest.dev/), and [React Testing Library](https://github.com/testing-library/react-testing-library) to create a modern [React](https://react.dev/) app compatible with [Create React App](https://create-react-app.dev/)


## Goals

- Easy migration from Create React App or Vite
- As beginner-friendly as Create React App
- Optimized performance compared to Create React App
- Customizable without ejecting

## Scripts

- `dev`/`start` - start dev server and open browser
- `build` - build for production
- `preview` - locally preview production build
- `test` - launch test runner

## Inspiration

- [Create React App](https://github.com/facebook/create-react-app/tree/main/packages/cra-template)
- [Vite](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react)
- [Vitest](https://github.com/vitest-dev/vitest/tree/main/examples/react-testing-lib)
