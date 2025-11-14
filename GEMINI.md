# GEMINI.md

## Project Overview

This project is a single-page web application built with React and Vite. It appears to be a promotional or informational website for a vegetarian-themed topic. The application is designed to be multilingual, with support for English, Spanish, and Traditional Chinese.

**Key Technologies:**

*   **React:** The core JavaScript library for building the user interface.
*   **Vite:** The build tool and development server.
*   **React Router:** For handling client-side routing and different language versions of the site.
*   **PrimeReact:** A UI component library used for elements like buttons.

**Architecture:**

The application follows a component-based architecture. The main entry point is `src/main.jsx`, which renders the `App` component. The `App` component sets up the routing using `react-router-dom` and renders the `Home` page. The `Home` page, in turn, is composed of the `HeroSection` component, which contains the main content and UI.

The application supports multiple languages by passing a `lang` prop to the `Home` and `HeroSection` components. The text content for each language is stored in `src/lang.json`.

## Building and Running

The following scripts are available in `package.json`:

*   **`npm run dev`**: Starts the development server with hot module replacement.
*   **`npm run build`**: Builds the application for production.
*   **`npm run lint`**: Lints the codebase using ESLint.
*   **`npm run preview`**: Serves the production build locally for previewing.

To run the application in development mode, use the following command:

```bash
npm install
npm run dev
```

## Development Conventions

*   **Component-Based Structure:** The application is organized into reusable components located in the `src/components` directory.
*   **Styling:** Each component has its own CSS file for styling (e.g., `HeroSection.css`).
*   **Internationalization (i18n):** The application uses a JSON file (`src/lang.json`) to store translations. The `lang` prop is passed down to components to render the appropriate language.
*   **Routing:** `react-router-dom` is used to manage different language versions of the site (e.g., `/en`, `/es`).
