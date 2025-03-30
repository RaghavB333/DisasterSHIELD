export async function GET() {
    const posts = [
        {
            id: 1,
            title: "Flood in Assam",
            location: "Assam, India",
            date: "2025-03-28",
            severity: "High",
            description: "Heavy rains have caused severe flooding, affecting thousands."
        },
        {
            id: 2,
            title: "Earthquake in Dehradun",
            location: "Dehradun, Uttarakhand, India",
            date: "2025-03-27",
            severity: "Medium",
            description: "A magnitude 6.5 earthquake was recorded in Dehradun, causing damage to buildings."
        },
        {
            id: 3,
            title: "Wildfire in Jharkhand",
            location: "Jharkhand, India",
            date: "2025-03-26",
            severity: "High",
            description: "Wildfires are spreading across Jharkhand due to dry conditions and strong winds."
        }
    ];

    return Response.json(posts);
}
