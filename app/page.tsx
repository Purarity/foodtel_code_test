"use client";

import PrismaBuilding from "@/assets/prisma.webp";
import BookingForm from "@/components/BookingForm";
import Image from "next/image";

export default function Home() {
  return (
    <div className="md:flex h-screen">
      <div className="z-10 flex flex-col md:w-1/2 h-full text-center">
        <h1 className="mt-24 mb-16 font-bold text-5xl text-center">
          Foodtel Booking
        </h1>
        <BookingForm />
      </div>
      <div className="top-0 -z-10 md:static absolute md:flex md:w-1/2">
        <Image
          src={PrismaBuilding}
          alt="building"
          className="h-screen object-cover"
        />
      </div>
    </div>
  );
}
