import { PrismaClient } from "@prisma/client";
import AddBookingButton from "@/components/AddBookingButton";
import BookingList from "@/components/BookingList";

export default async function Admin() {
  const prisma = new PrismaClient();
  const bookings = await prisma.booking.findMany();

  return (
    <div className="max-w-[50rem] flex mx-auto flex-col">
      <div>total bookings : {bookings.length}</div>
      <AddBookingButton />
      <BookingList bookingList={bookings} />
    </div>
  );
}
