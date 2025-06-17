export async function POST(req) {
  
  const { message } = await req.json();
  console.log("message : ", message);

  const MODEL = "models/gemini-2.0-flash";

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/${MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }],
      }),
    }
  );

  const data = await response.json();
  console.log("data : ", data);
  const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

  return Response.json({ reply });

}


