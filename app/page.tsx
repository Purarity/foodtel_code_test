"use client";

import BookingForm from "@/components/BookingForm";

export default function Home() {
  return (
    <div className="h-screen text-center flex flex-col">
      <h1 className="text-5xl font-bold text-center mt-24 mb-16">
        Foodtel Booking
      </h1>
      <BookingForm />
    </div>
  );
}
