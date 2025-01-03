import { PrismaClient } from "@prisma/client";
import AddBookingButton from "@/components/AddBookingButton";
import BookingList from "@/components/BookingList";

export default async function Admin() {
  const prisma = new PrismaClient();
  const bookings = await prisma.booking.findMany({
    orderBy: {
      time: "desc",
    },
  });

  return (
    <>
      <AddBookingButton />
      <BookingList bookingList={bookings} />
    </>
  );
}
