"use server";

import { BookingFormSchema } from "@/zodSchemas";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export async function getBookings() {
  await prisma.booking.findMany();
  revalidatePath("/");
}

export async function addBooking(_currentState: unknown, data: FormData) {
  const extractedData = {
    bookerName: data.get("bookerName") as string,
    email: data.get("email") as string,
    totalGuests: data.get("totalGuests"),
    date: data.get("date")?.toString() || "",
    time: data.get("time") as string,
  };

  try {
    const parsedData = BookingFormSchema.parse(extractedData);

    const transformedTime = new Date(extractedData.date);
    const [hour, minute] = extractedData.time.split(":");
    transformedTime.setHours(parseInt(hour));
    transformedTime.setMinutes(parseInt(minute));

    await prisma.booking.create({
      data: {
        bookerName: parsedData.bookerName,
        email: parsedData.email,
        totalGuests: parsedData.totalGuests,
        time: transformedTime,
      },
    });
  } catch (error) {
    console.log(error);

    // returning old data to preserve the form values
    return {
      success: false,
      data: {
        ...extractedData,
      },
    };
  }

  revalidatePath("/admin");
  redirect("/success");
}
