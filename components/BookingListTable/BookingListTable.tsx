import { Booking } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

export default function BookingListTable({
  bookingList,
  setSelectedBooking,
}: {
  bookingList: Booking[];
  setSelectedBooking: Dispatch<SetStateAction<Booking | undefined>>;
}) {
  return (
    <table className="table-fixed rounded-lg w-full text-center overflow-hidden">
      <TableHeader />
      <TableBody
        bookingList={bookingList}
        setSelectedBooking={setSelectedBooking}
      />
    </table>
  );
}
