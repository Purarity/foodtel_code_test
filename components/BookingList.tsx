"use client";
import type { Booking } from "@prisma/client";
import debounce from "lodash-es/debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

export default function BookingList({
  bookingList,
}: {
  bookingList: Booking[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPath = usePathname();
  const dateFilterCheckboxRef = useRef<HTMLInputElement>(null!);
  const fromDatesRef = useRef<HTMLInputElement>(null!);
  const toDatesRef = useRef<HTMLInputElement>(null!);

  const debounceParamsChange: (filters: string[], values: string[]) => void =
    debounce(
      (filters: string[], values: string[]) => {
        const newSearchParams = new URLSearchParams(searchParams);

        for (let i = 0; i < filters.length; i++) {
          if (values.length && values[i]) {
            newSearchParams.set(filters[i], values[i]);
          } else {
            newSearchParams.delete(filters[i]);
          }
        }

        router.replace(`${currentPath}?${newSearchParams.toString()}`);
      },
      200,
      { trailing: true }
    );

  return (
    <div className="p-4 space-y-4">
      <div>Shown bookings : {bookingList.length}</div>
      <div className="flex flex-wrap gap-4 items-center">
        <input
          className="border w-64 rounded p-1"
          onChange={(event) =>
            debounceParamsChange(["filterString"], [event.currentTarget.value])
          }
          placeholder="Filter by name or email..."
        />
        <label htmlFor="filterByDate">
          Filter by dates:
          <input
            ref={dateFilterCheckboxRef}
            type="checkbox"
            name="filterByDate"
            id="filterByDate"
            onChange={(event) => {
              if (event.currentTarget.checked) {
                debounceParamsChange(
                  ["fromDate", "toDate"],
                  [fromDatesRef.current.value, toDatesRef.current.value]
                );
              } else {
                debounceParamsChange(["fromDate", "toDate"], []);
              }
            }}
          />
        </label>
        <label htmlFor="fromDate">
          From:
          <input
            ref={fromDatesRef}
            type="date"
            name="fromDate"
            id="fromDate"
            className="brightness-90 rounded px-1"
            defaultValue={new Date().toLocaleDateString()}
            onChange={(event) =>
              dateFilterCheckboxRef.current.checked &&
              debounceParamsChange(["fromDate"], [event.currentTarget.value])
            }
          />
        </label>
        <label htmlFor="toDate">
          To:
          <input
            ref={toDatesRef}
            type="date"
            name="toDate"
            id="toDate"
            className="brightness-90 rounded px-1"
            defaultValue={new Date().toLocaleDateString()}
            onChange={(event) =>
              dateFilterCheckboxRef.current.checked &&
              debounceParamsChange(["toDate"], [event.currentTarget.value])
            }
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
        <tbody>
          {bookingList.length ? (
            bookingList.map((booking) => (
              <tr
                key={booking.id}
                className="even:bg-gray-100 odd:bg-white h-8 hover:brightness-90"
              >
                <td className="px-4">{booking.bookerName}</td>
                <td className="px-4">{booking.email}</td>
                <td className="px-4">{booking.totalGuests}</td>
                <td className="px-4">
                  {new Intl.DateTimeFormat("sv-SE", {
                    timeStyle: "short",
                    dateStyle: "short",
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
      </table>
    </div>
  );
}
