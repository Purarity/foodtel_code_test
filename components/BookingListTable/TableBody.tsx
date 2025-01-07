import { Booking } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

export default function TableBody({
  bookingList,
  setSelectedBooking,
}: {
  bookingList: Booking[];
  setSelectedBooking: Dispatch<SetStateAction<Booking | undefined>>;
}) {
  return (
    <tbody>
      {bookingList.length
        ? bookingList.map((booking) => (
            <tr
              key={booking.id}
              className="hover:brightness-90 odd:bg-white even:bg-gray-100 h-8"
            >
              <td className="break-words">{booking.bookerName}</td>
              <td className="break-words">{booking.email}</td>
              <td>{booking.totalGuests}</td>
              <td>
                {new Intl.DateTimeFormat("en-GB", {
                  timeStyle: "short",
                }).format(booking.time)}{" "}
                {new Intl.DateTimeFormat("te", {
                  dateStyle: "short",
                }).format(booking.time)}
              </td>
              <td>
                <button
                  popoverTarget="archive-check"
                  onClick={() => setSelectedBooking(booking)}
                  className="flex"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="red"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))
        : null}
    </tbody>
  );
}
