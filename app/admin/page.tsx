import { PrismaClient } from "@prisma/client";
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
      <BookingList bookingList={bookings} />
    </>
  );
}
