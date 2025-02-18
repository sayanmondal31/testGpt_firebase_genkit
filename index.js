// import the Genkit and Google AI plugin libraries
import { gemini15Flash, googleAI } from "@genkit-ai/googleai";
import { genkit, z } from "genkit";
// import { enableFirebaseTelemetry } from "@genkit-ai/firebase";

// configure a Genkit instance
const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY,
      // projectId: process.env.GOOGLE_PROJECT_ID,
    }),
  ],
  model: gemini15Flash, // set default model
});

// enableFirebaseTelemetry();

// const helloFlow = ai.defineFlow("helloFlow", async (name) => {
//   // make a generation request
//   const { text } = await ai.generate(
//     //     `create itenary for gangtok for 6 people ,for 6 days show hotels, car partners, visiting places and we can bear handsome cost will go and return by train`
//     `hello, my name is ${name}`
//   );
//   console.log(text);
// });

// helloFlow("Sayan");

// ----------------------------
// (async () => {
//   const { text } = await ai.generate(
//     //     `create itenary for gangtok for 6 people ,for 6 days show hotels, car partners, visiting places and we can bear handsome cost will go and return by train`
//     `Invent a menu item for a bengali themed restaurant.`
//   );
//   console.log(text);
// })();
// ----------------------------

(async () => {
  const naturalQuery = `
    Find all the restaurants in the city of Kolkata that serve Bengali cuisine and have a rating of 4.5 or higher.
  `;
  const { text } = await ai.generate({
    maxTokens: 100,
    prompt: `
        Convert this query to a MongoDB-compatible query:
        in javascript
        Query: "${naturalQuery}"
        MongoDB query:
        with aggregation framework with an array of objects
        in the form of: [{ $match: { ... } }, { $group: { ... } }, ...]
        in response give name, rating, cuisine, city
        don't give explanation, 
    `,
  });

  console.log(text);
  // i need to convert from string to object
  // const query = JSON.parse(text);
})();
