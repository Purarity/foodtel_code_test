"use server";

import { BookingForm, BookingFormSchema } from "@/zodSchemas";
import { Booking, PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function getBookings() {
  await prisma.booking.findMany();
  revalidatePath("/");
}

export async function addBooking(currentState: unknown, data: FormData) {
  const extractedData = {
    bookerName: data.get("bookerName"),
    email: data.get("email"),
    totalGuests: data.get("totalGuests"),
    date: data.get("date")?.toString() || "",
    time: (data.get("time") as string) + ":00", //zod time schema
  };

  const transformedTime = new Date(extractedData.date);
  const [hour, minute, second] = extractedData.time.split(":");
  transformedTime.setHours(parseInt(hour));
  transformedTime.setMinutes(parseInt(minute));
  transformedTime.setSeconds(parseInt(second));

  try {
    const parsedData = BookingFormSchema.parse(extractedData);

    await prisma.booking.create({
      data: {
        bookerName: parsedData.bookerName,
        email: parsedData.email,
        totalGuests: parsedData.totalGuests,
        time: transformedTime,
      },
    });
  } catch (error) {
    return { success: false };
  }
}
