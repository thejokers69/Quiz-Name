# Personality Quiz – Final Project (by Mohamed Lakssir)

## Overview

This is an interactive Personality Quiz web app built as a final project for CodeDex. The app is designed to provide a fun and engaging way for users to discover their elemental personality (Fire, Water, Earth, or Air) based on their answers to a series of questions. After completing the quiz, users are presented with a piece of artwork from the Metropolitan Museum of Art that matches their element.

## Features

- **User Input:** Users enter their name to personalize the quiz experience.
- **Quiz Flow:** Users answer a series of multiple-choice questions.
- **Element Assignment:** The app determines the user's element based on their answers.
- **Artwork Display:** After the quiz, the app fetches and displays a relevant artwork from the MET Museum API.
- **Responsive UI:** Modern, card-based design with smooth navigation and feedback.
- **Retry & Navigation:** Users can refresh the artwork or go back to retake the quiz.

## Technologies Used

- React 19
- React Router DOM 7
- Vite
- MET Museum Public API
- Modern CSS (flexbox, card layouts)

## How to Run

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:5173)

## Project Structure

- `src/components/` – React components (Header, UserForm, Question, Results, UserContext)
- `src/styles/` – CSS styles
- `src/assets/` – Static assets (e.g., coin logo)
- `App.jsx` – Main app logic and routing
- `main.jsx` – React entry point

## Credits

- Developed by **Mohamed Lakssir** for CodeDex Final Project
- Artwork data provided by [The Metropolitan Museum of Art Collection API](https://metmuseum.github.io/)

---
Enjoy discovering your element and exploring art!
