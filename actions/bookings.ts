"use server";

import { BookingForm, BookingFormSchema } from "@/zodSchemas";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function getBookings() {
  await prisma.booking.findMany();
  revalidatePath("/");
}

export async function addBooking(data: BookingForm) {
  try {
    BookingFormSchema.parse(data);

    //parse time
    const time = new Date(data.date);
    const [hour, minute, second] = data.time.split(":");
    time.setHours(parseInt(hour));
    time.setMinutes(parseInt(minute));
    time.setSeconds(parseInt(second));

    await prisma.booking.create({
      data: {
        bookerName: data.bookerName,
        email: data.email,
        totalGuests: data.totalGuests,
        time,
      },
    });

    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
