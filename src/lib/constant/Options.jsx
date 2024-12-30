export const SelectTravelesList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A sole traveles in exploration",
    icon: "✈️",
    people: "1 people",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Two traveles in tandem",
    icon: "🥂",
    people: "2 people",
  },
  {
    id: 3,
    title: "Family",
    desc: "A group of fun loving adv",
    icon: "🏡",
    people: "3 to 5 people",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A bunch of thrill-seekes",
    icon: "⛵",
    people: "5 to 10 people",
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: "Cheap",
    desc: "Stay conscious of costs",
    icon: "💵"
  },

  {
    id: 2,
    title: "Moderate",
    desc: "Keep cost on the average side",
    icon: "💰"
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Dont worry about cost",
    icon: "💎"
  },
];


export const API_PROMPT =  
`Generate a detailed travel plan for:
- **Location**: {location}
- **Duration**: {days} days
- **Budget**: {budget} 
- **Travel Group**: {traveler} 

Provide the following details in JSON format:
1. **Hotel Options**: Include a list of hotels with each hotel's name, address, price, image URL, geo-coordinates, rating, and description. Ensure the options fit the selected budget.

2. **Itinerary**:
    - Plan for each of the {days} days, including:
        - **Places to Visit**: Name, details, image URL, geo-coordinates, ticket pricing, rating, travel time to the next location, and the best time to visit.
        - **Free and Hidden Attractions**: Include unique or lesser-known sites in {location}.
        - **Meal Recommendations**: Suggested restaurants for each meal (breakfast, lunch, and dinner) that align with the {budget} budget.
        - **Local Food**: Highlight authentic dishes in {location} and the best places to try them.

3. **Additional Travel Tips**:
    - Local customs, transport options, best times to explore specific areas, and safety advice.
    - Recommendations for activities popular with a group of {traveler}.

Generate the plan in a way that enhances the user's experience, ensuring they feel the itinerary is customized to their preferences.`