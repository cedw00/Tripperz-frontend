import { useState } from "react";

function getRandomActivityByInput(activList, userInput) {
    let filteredActivities = [];
    const userInput = "shopping restaurants culturePlaces landscapes sportActivities";
    const [chosenActiv, setChosenActiv] = useState('');
  
    // Check if userInput contains specific keywords
    const keywords = userInput.toLowerCase().split(' ');
  
    // Filter activities based on keywords
    keywords.forEach((keyword) => {
        activList.forEach((activityType) => {
        const keys = Object.keys(activityType);
        if (keys.length > 0 && keys[0].toLowerCase().includes(keyword)) {
          filteredActivities = filteredActivities.concat(activityType[keys[0]]);
        }
      });
    });
  
    // If no specific activities matched the keywords, select from all activities
    if (filteredActivities.length === 0) {
        activList.forEach((activityType) => {
        const keys = Object.keys(activityType);
        if (keys.length > 0) {
          filteredActivities = filteredActivities.concat(activityType[keys[0]]);
        }
      });
    }
  
    // Select a random activity name from filteredActivities
    const randomIndex = Math.floor(Math.random() * filteredActivities.length);
    const randomActivity = filteredActivities[randomIndex];
    setChosenActiv(`Going @${randomActivity.name}`);
    return chosenActiv;
  }
  
  // Example usage:
  // userInput contains keywords for shopping and restaurants
  const randomActivity = getRandomActivityByInput(activList, userInput);
  console.log("Random Activity based on input:", randomActivity);

  module.exports = {randomActivity};
  