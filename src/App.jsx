import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Question from "./components/Question";
import Results from "./components/Results";
import UserForm from "./components/UserForm";
import { UserProvider } from "./components/UserContext";

const questions = [
  {
    question: "What's your favorite color?",
    options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],
  },
  {
    question: "Which environment do you feel most at home in?",
    options: ["Mountains 🏔️", "Ocean 🌊", "Forest 🌳", "Sky ☁️"],
  },
  {
    question: "Pick a trait that describes you best:",
    options: ["Passionate ❤️", "Calm 😌", "Grounded 🌱", "Free-spirited 🕊️"],
  },
];

const keywords = {
  Fire: "fire",
  Water: "water",
  Earth: "earth",
  Air: "air",
};

const answerToElement = {
  // Color
  "Red 🔴": "Fire",
  "Blue 🔵": "Water",
  "Green 🟢": "Earth",
  "Yellow 🟡": "Air",
  // Environment
  "Mountains 🏔️": "Earth",
  "Ocean 🌊": "Water",
  "Forest 🌳": "Earth",
  "Sky ☁️": "Air",
  // Trait
  "Passionate ❤️": "Fire",
  "Calm 😌": "Water",
  "Grounded 🌱": "Earth",
  "Free-spirited 🕊️": "Air",
};

export default function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [element, setElement] = useState("");
  const [artwork, setArtwork] = useState(null);

  function handleAnswer(answer) {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  function resetQuiz() {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setElement("");
    setArtwork(null);
  }

  function determineElement(answers) {
    const counts = {};
    answers.forEach(function(answer) {
      const element = answerToElement[answer];
      counts[element] = (counts[element] || 0) + 1;
    });
    // If tie, pick the first one in order Fire, Water, Earth, Air
    const order = ["Fire", "Water", "Earth", "Air"];
    let max = 0;
    let result = order[0];
    order.forEach(el => {
      if ((counts[el] || 0) > max) {
        max = counts[el];
        result = el;
      }
    });
    return result;
  }

  async function fetchArtwork(keyword) {
    // Fetch artwork from the MET Museum API
    const res = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${keyword}`
    );
    const data = await res.json();
    if (data.objectIDs && data.objectIDs.length > 0) {
      const artRes = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${data.objectIDs[0]}`
      );
      const artData = await artRes.json();
      setArtwork(artData);
    } else {
      setArtwork(null);
    }
  }

  useEffect(
    function () {
      if (currentQuestionIndex === questions.length) {
        const selectedElement = determineElement(answers);
        setElement(selectedElement);
        fetchArtwork(keywords[selectedElement]);
      }
    },
    [currentQuestionIndex]
  );

  return (
    <UserProvider>
      <Header />
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route
          path="/quiz"
          element={
            currentQuestionIndex < questions.length ? (
              <Question
                question={questions[currentQuestionIndex].question}
                options={questions[currentQuestionIndex].options}
                onAnswer={handleAnswer}
              />
            ) : (
              <Results element={element} artwork={artwork} resetQuiz={resetQuiz} />
            )
          }
        />
      </Routes>
    </UserProvider>
  );
}