export async function GET() {
    const posts = [
        {
            id: 1,
            title: "Flood in New York",
            location: "New York, USA",
            date: "2025-03-28",
            severity: "High",
            description: "Heavy rains have caused severe flooding, affecting thousands."
        },
        {
            id: 2,
            title: "Earthquake in Japan",
            location: "Tokyo, Japan",
            date: "2025-03-27",
            severity: "Medium",
            description: "A magnitude 6.5 earthquake was recorded in Tokyo, causing damage to buildings."
        },
        {
            id: 3,
            title: "Wildfire in California",
            location: "Los Angeles, USA",
            date: "2025-03-26",
            severity: "High",
            description: "Wildfires are spreading across California due to dry conditions and strong winds."
        }
    ];

    return Response.json(posts);
}
