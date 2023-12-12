import { useState } from "react";

let userInput = "shopping restaurants culturePlaces landscapes sportActivities";
let activList = [
  {
    shoppingPlaces: [
      {
        name: "The Dubai Mall",
        address: "Financial Center Rd, Downtown Dubai",
        city: "Dubai",
        country: "United Arab Emirates",
        postcode: "31166",
      },
      {
        name: "Mall of the Emirates",
        address: "Sheikh Zayed Rd, Al Barsha 1",
        city: "Dubai",
        country: "United Arab Emirates",
        postcode: "28399",
      },
      {
        name: "IBN Battuta Mall",
        address: "Sheikh Zayed Rd, Jebel Ali Village",
        city: "Dubai",
        country: "United Arab Emirates",
        postcode: "7631",
      },
      {
        name: "Dubai Marina Mall",
        address: "Sheikh Zayed Rd, Dubai Marina",
        city: "Dubai",
        country: "United Arab Emirates",
        postcode: "213083",
      },
      {
        name: "City Centre Deira",
        address: "8th St, Port Saeed",
        city: "Dubai",
        country: "United Arab Emirates",
        postcode: "9440",
      },
    ],
  },
  {
    restaurants: [
      {
        name: "Nusr-Et Steakhouse",
        address: "The Address Downtown, Sheikh Mohammed bin Rashid Blvd",
        city: "Dubai",
        country: "United Arab Emirates",
        postcode: "123234",
      },
      {
        name: "Pierchic",
        address: "Al Qasr at Madinat Jumeirah, Jumeira Rd",
        city: "Dubai",
        country: "United Arab Emirates",
        postcode: "75157",
      },
      {
        name: "Zuma",
        address: "Gate Village 06, DIFC",
        city: "Dubai",
        country: "United Arab Emirates",
        postcode: "506620",
      },
      {
        name: "TOMO Japanese Restaurant",
        address: "Raffles Dubai, Sheikh Rashid Rd, Wafi City",
        city: "Dubai",
        country: "United Arab Emirates",
        postcode: "125511",
      },
      {
        name: "At.mosphere",
        address: "Burj Khalifa, Downtown Dubai",
        city: "Dubai",
        country: "United Arab Emirates",
        postcode: "122830",
      },
    ],
  },
  {
    culturePlaces: [
      {
        name: "Dubai Museum",
        address: "Al Fahidi St, Al Fahidi Fort",
        city: "Dubai",
        country: "United Arab Emirates",
        postcode: "234234",
      },
      {
        name: "Jumeirah Mosque",
        address: "Jumeirah Beach Road",
        city: "Dubai",
        country: "United Arab Emirates",
        postcode: "123321",
      },
    ],
  },
  {
    landscapes: [
      {
        name: "Palm Jumeirah",
        address: "Palm Jumeirah Island",
        city: "Dubai",
        country: "United Arab Emirates",
        postcode: "567890",
      },
      {
        name: "Dubai Desert Conservation Reserve",
        address: "Al Maha, Dubai Desert",
        city: "Dubai",
        country: "United Arab Emirates",
        postcode: "876543",
      },
    ],
  },
  {
    sportActivities: [
      {
        name: "Ski Dubai",
        address: "Mall of the Emirates, Sheikh Zayed Rd",
        city: "Dubai",
        country: "United Arab Emirates",
        postcode: "987654",
      },
      {
        name: "Dubai Autodrome",
        address: "MotorCity, Sheikh Mohammed Bin Zayed Rd",
        city: "Dubai",
        country: "United Arab Emirates",
        postcode: "345678",
      },
    ],
  },
];
let arr = ["apple", "mango",
          "apple", "orange", "mango", "mango"];

function getRandomActivityByInput(activList, userInput) {
  let filteredActivities = [];

  // Check if userInput contains specific keywords
  const keywords = userInput.toLowerCase().split(" ");

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

  return (randomActivity.name);
};

function removeDuplicates(arr) {
    let unique = [];
    for (i = 0; i < arr.length; i++) {
        if (unique.indexOf(arr[i]) === -1) {
            unique.push(arr[i]);
        }
    }
    return unique;
};

// Exemple de tableau avec des doublons
const getUniqueElements = (arr, count) => {
  const uniqueElements = new Set();
  const result = [];

  // Boucle à travers le tableau pour obtenir des éléments uniques
  for (let i = 0; i < arr.length; i++) {
    uniqueElements.add(arr[i]); // Ajouter l'élément à l'ensemble pour garantir l'unicité
    if (uniqueElements.size >= count) {
      break; // Sortir de la boucle une fois que le nombre requis d'éléments uniques est atteint
    }
  }

  // Convertir l'ensemble en tableau pour retourner les éléments uniques
  uniqueElements.forEach((element) => {
    result.push(element);
  });

  return result;
};  

function getUniqueRandomIndex(tableau) {
  if (tableau.length > 0) {
    const index = Math.floor(Math.random() * tableau.length);
    const selectedActivity = tableau[index];
    tableau.splice(tableau.indexOf(selectedActivity), 1); // Retire le nombre du tableau pour éviter la répétition
    return selectedActivity;
  } else {
    return null; // Retourne null si tous les nombres ont été utilisés
  }
}



module.exports = { getRandomActivityByInput, removeDuplicates, getUniqueElements, getUniqueRandomIndex };
