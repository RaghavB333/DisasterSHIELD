// import { NextResponse } from "next/server";
// import { SessionsClient } from "@google-cloud/dialogflow";

// // Ensure environment variable is set
// if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
//   throw new Error("❌ GOOGLE_APPLICATION_CREDENTIALS environment variable is missing!");
// }

// // Create Dialogflow session client
// const sessionClient = new SessionsClient({
//   keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
// });

// export async function POST(req) {
//   try {
//     const { message, sessionId = "12345" } = await req.json();

//     // ✅ Use async function to fetch projectId correctly
//     const projectId = await sessionClient.getProjectId();
//     if (!projectId) {
//       throw new Error("❌ project_id is undefined! Check your service account JSON.");
//     }

//     const sessionPath = `projects/${projectId}/agent/sessions/${sessionId}`;

//     const request = {
//       session: sessionPath,
//       queryInput: {
//         text: {
//           text: message,
//           languageCode: "en",
//         },
//       },
//     };

//     const responses = await sessionClient.detectIntent(request);
//     const result = responses[0]?.queryResult?.fulfillmentText || "No response from Dialogflow.";

//     return NextResponse.json({ response: result });
//   } catch (error) {
//     console.error("❌ Dialogflow API Error:", error);
//     return NextResponse.json({ response: "Error processing request" }, { status: 500 });
//   }
// }


// import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     const { message } = await req.json();
//     const API_URL = "https://api-inference.huggingface.co/models/bigscience/bloom";
//     const API_KEY = process.env.HUGGINGFACE_API_KEY;

//     if (!API_KEY) {
//       throw new Error("Hugging Face API key is missing! Add it in .env.local");
//     }

//     const response = await fetch(API_URL, {
//       method: "POST",
//       headers: {
//         "Authorization": `Bearer ${API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ inputs: message }),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(`Hugging Face API Error: ${data.error || "Unknown error"}`);
//     }

//     return NextResponse.json({ response: data[0]?.generated_text || "No response from AI." });
//   } catch (error) {
//     console.error("❌ Hugging Face API Error:", error);
//     return NextResponse.json({ response: "Error processing request" }, { status: 500 });
//   }
// }

// import { NextResponse } from "next/server";

// export async function POST(req) {
//   try {
//     const { message } = await req.json();
//     const API_URL = "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill";
//     const API_KEY = process.env.HUGGINGFACE_API_KEY;

//     if (!API_KEY) {
//       throw new Error("Hugging Face API key is missing! Add it in .env.local");
//     }

//     const response = await fetch(API_URL, {
//       method: "POST",
//       headers: {
//         "Authorization": `Bearer ${API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ inputs: message }),
//     });

//     const text = await response.text(); // Read raw text

//     try {
//       const data = JSON.parse(text);
//       if (!response.ok) {
//         throw new Error(data.error || "Unknown API error");
//       }
//       return NextResponse.json({ response: data[0]?.generated_text || "No response from AI." });
//     } catch (jsonError) {
//       throw new Error(`Invalid JSON response: ${text}`);
//     }

//   } catch (error) {
//     console.error("❌ Hugging Face API Error:", error);
//     return NextResponse.json({ response: "Error processing request" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { message } = await req.json();
    const lowerMessage = message.toLowerCase();
    let responseText = null;

    // Emergency response handling
    if (lowerMessage.includes("flood") || lowerMessage.includes("stuck")) {
      responseText = "Stay calm! Move to higher ground and call emergency services at 112. I can also provide rescue center locations near you.";
    } else if (lowerMessage.includes("earthquake")) {
      responseText = "Drop, Cover, and Hold On! If you're trapped, make noise to help rescuers find you.";
    } else if (lowerMessage.includes("fire")) {
      responseText = "Evacuate immediately! Stay low to avoid smoke. Call fire services at 101.";
    } else if (lowerMessage.includes("help")) {
      responseText = "What kind of help do you need? I can assist with emergency numbers, shelters, and safety tips.";
    }

    // If a disaster response is found, return it immediately
    if (responseText) {
      return NextResponse.json({ response: responseText });
    }

    // Otherwise, send the message to Hugging Face chatbot
    const API_URL = "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill";
    const API_KEY = process.env.HUGGINGFACE_API_KEY;

    if (!API_KEY) {
      throw new Error("Hugging Face API key is missing! Add it in .env.local");
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: message }),
    });

    const text = await response.text(); // Read raw text

    try {
      const data = JSON.parse(text);
      if (!response.ok) {
        throw new Error(data.error || "Unknown API error");
      }
      return NextResponse.json({ response: data[0]?.generated_text || "No response from AI." });
    } catch (jsonError) {
      throw new Error(`Invalid JSON response: ${text}`);
    }

  } catch (error) {
    console.error("❌ Chatbot Error:", error);
    return NextResponse.json({ response: "Error processing request" }, { status: 500 });
  }
}

