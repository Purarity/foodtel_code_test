"use client";

import PrismaBuilding from "@/assets/prisma.webp";
import BookingForm from "@/components/BookingForm";
import Image from "next/image";

export default function Home() {
  return (
    <div className="md:flex h-screen">
      <div className="h-full text-center flex flex-col md:w-1/2 z-10">
        <h1 className="text-5xl font-bold text-center mt-24 mb-16">
          Foodtel Booking
        </h1>
        <BookingForm />
      </div>
      <div className="hidden md:flex w-1/2 overflow-hidden">
        <Image
          src={PrismaBuilding}
          alt="building"
          className="object-none md:scale-[1.5]"
        />
      </div>
    </div>
  );
}
