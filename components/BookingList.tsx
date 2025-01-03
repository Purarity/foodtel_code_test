"use client";
import type { Booking } from "@prisma/client";
import { useState } from "react";

export default function BookingList({
  bookingList,
}: {
  bookingList: Booking[];
}) {
  const [filterString, setFilterString] = useState("");

  function renderTableBody(bookings: Booking[]) {
    const filteredList = bookings.filter((booking) => {
      if (filterString) {
        if (
          booking.bookerName
            .toLowerCase()
            .includes(filterString.toLowerCase()) ||
          booking.email.toLowerCase().includes(filterString.toLowerCase())
        ) {
          return booking;
        }
      } else {
        return booking;
      }
    });

    return (
      <tbody>
        {filteredList.length ? (
          filteredList.map((booking) => (
            <tr
              key={booking.id}
              className="even:bg-gray-100 odd:bg-white h-8 hover:brightness-90"
            >
              <td className="px-4">{booking.bookerName}</td>
              <td className="px-4">{booking.email}</td>
              <td className="px-4">{booking.totalGuests}</td>
              <td className="px-4">
                {new Intl.DateTimeFormat("sv-SE", {
                  dateStyle: "short",
                  timeStyle: "short",
                }).format(booking.time)}
              </td>
            </tr>
          ))
        ) : (
          <tr className="h-8">
            <td className="px-4" />
            <td className="px-4" />
            <td className="px-4" />
            <td className="px-4" />
          </tr>
        )}
      </tbody>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <input
        className="block border w-64 rounded p-1"
        value={filterString}
        onChange={(event) => setFilterString(event.currentTarget.value)}
        placeholder="Search for name and email..."
      />
      <table className="table-fixed overflow-hidden w-3/4 text-center rounded-lg">
        <thead className="bg-table-header text-white">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Total Guests</th>
            <th>Time</th>
          </tr>
        </thead>
        {renderTableBody(bookingList)}
      </table>
    </div>
  );
}
