"use client";
import type { Booking } from "@prisma/client";

export default function BookingList({
  bookingList,
}: {
  bookingList: Booking[];
}) {
  return (
    <table className="table-auto border-spacing-2 border-separate border-slate-500 ">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Total Guests</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {bookingList.map((booking) => (
          <tr key={booking.id}>
            <td>{booking.bookerName}</td>
            <td>{booking.email}</td>
            <td>{booking.totalGuests}</td>
            <td>{booking.time.toDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
