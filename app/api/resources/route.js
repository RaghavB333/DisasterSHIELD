import { connectDB } from "@/utils/db";
import Resource from "@/models/resource";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const resources = await Resource.find({});

    return NextResponse.json(resources, { status: 200 });
  } catch (error) {
    console.error("Error fetching resources:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
