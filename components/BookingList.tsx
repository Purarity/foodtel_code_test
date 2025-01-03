"use client";
import type { Booking } from "@prisma/client";
import { useRef, useState } from "react";

export default function BookingList({
  bookingList,
}: {
  bookingList: Booking[];
}) {
  const [filterString, setFilterString] = useState("");
  const [filterByDates, setFilterByDates] = useState(false);
  const [fromDate, setFromDate] = useState(new Date().toLocaleDateString());
  const [toDate, setToDate] = useState(new Date().toLocaleDateString());
  const shownBookingsCount = useRef(bookingList.length);

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
      } else if (filterByDates) {
        const bookingTime = booking.time.getTime();
        if (
          bookingTime >= new Date(fromDate).getTime() &&
          bookingTime < new Date(toDate).getTime() + 86400000 //before the next day
        ) {
          return booking;
        }
      } else {
        return booking;
      }
    });
    shownBookingsCount.current = filteredList.length;

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
      <div>Found bookings: {shownBookingsCount.current}</div>
      <div className="flex flex-wrap gap-4 items-center">
        <input
          className="border w-64 rounded p-1"
          value={filterString}
          onChange={(event) => setFilterString(event.currentTarget.value)}
          placeholder="Filter by name or email..."
        />
        <label htmlFor="filterByDate">
          Filter by dates:
          <input
            type="checkbox"
            name="filterByDate"
            id="filterByDate"
            checked={filterByDates}
            onChange={(event) => setFilterByDates(event.currentTarget.checked)}
          />
        </label>
        <label htmlFor="fromDate">
          From:
          <input
            type="date"
            name="fromDate"
            id="fromDate"
            className="brightness-90 rounded px-1"
            value={fromDate}
            onChange={(event) => setFromDate(event.currentTarget.value)}
          />
        </label>
        <label htmlFor="toDate">
          To:
          <input
            type="date"
            name="toDate"
            id="toDate"
            className="brightness-90 rounded px-1"
            value={toDate}
            onChange={(event) => setToDate(event.currentTarget.value)}
          />
        </label>
      </div>
      <table className="table-fixed overflow-hidden w-full text-center rounded-lg">
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
