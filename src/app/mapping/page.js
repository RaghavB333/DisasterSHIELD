"use client";
import dynamic from "next/dynamic";

const EmergencyMap = dynamic(() => import("@/app/components/map"), {
  ssr: false,
});

export default function MapPage() {
  return (
  <EmergencyMap />);
}
