"use server"

import { BookingForm } from "@/zodSchemas";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function getBookings() {
  await prisma.booking.findMany();
  revalidatePath("/");
}

export async function addBooking(data: BookingForm) {
  console.log(data)
  const response = await prisma.booking.create({
    data: {
      bookerName: "Danny",
      email: "danny@gmail.com",
      time: new Date(),
      totalGuests: 3,
    },
  });
  console.log('added booking')

  revalidatePath("/");
}
