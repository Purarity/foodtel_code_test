import { Booking } from "@prisma/client";
import { useRef, useState } from "react";
import Popover from "../Popover";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

export default function BookingListTable({
  bookingList,
}: {
  bookingList: Booking[];
}) {
  const [selectedBooking, setSelectedBooking] = useState<Booking>();
  const popoverRef = useRef<HTMLDivElement>(null!);

  return (
    <>
      <Popover booking={selectedBooking} popoverRef={popoverRef} />

      <table className="table-fixed rounded-lg w-full text-center overflow-hidden">
        <TableHeader />
        <TableBody
          bookingList={bookingList}
          setSelectedBooking={setSelectedBooking}
        />
      </table>
    </>
  );
}
