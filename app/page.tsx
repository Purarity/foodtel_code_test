"use client";

import BookingForm from "@/components/BookingForm";

export default function Home() {
  return (
    <div className="h-screen text-center flex flex-col justify-center">
      <h1 className="text-5xl font-bold text-center mb-24">Foodtel Booking</h1>
      <BookingForm />
    </div>
  );
}
