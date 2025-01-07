"use client";
import { archiveBooking } from "@/actions/bookings";
import type { Booking } from "@prisma/client";
import debounce from "lodash-es/debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

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
  const [selectedBooking, setSelectedBooking] = useState<Booking>();
  const archivePopOverRef = useRef<HTMLDivElement>(null!);

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
      {/* Popover */}
      <div
        ref={archivePopOverRef}
        popover="auto"
        id="archive-check"
        className="popover p-4 rounded"
      >
        <div>Archive this booking?</div>
        <div className="text-start">
          <div className="break-words">Name: {selectedBooking?.bookerName}</div>
          <div className="break-words">Email: {selectedBooking?.email}</div>
          <div>Total Guests: {selectedBooking?.totalGuests}</div>
          <div>
            Time:{" "}
            {new Intl.DateTimeFormat("sv-SE", {
              timeStyle: "short",
              dateStyle: "short",
            }).format(selectedBooking?.time)}
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => {
              if (selectedBooking) {
                archiveBooking(selectedBooking?.id);
                archivePopOverRef.current.hidePopover();
              }
            }}
            className="border-2 border-transparent rounded bg-red-500 text-white px-2 uppercase"
          >
            Yes
          </button>
          <button
            popoverTarget="archive-check"
            popoverTargetAction="hide"
            className="ml-5 border-2 rounded px-2 uppercase"
          >
            No
          </button>
        </div>
      </div>
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
            <th className="w-12">Total Guests</th>
            <th>Time</th>
            <th className="w-12" />
          </tr>
        </thead>
        <tbody>
          {bookingList.length ? (
            bookingList.map((booking) => (
              <tr
                key={booking.id}
                className="even:bg-gray-100 odd:bg-white h-8 hover:brightness-90"
              >
                <td className="break-words">{booking.bookerName}</td>
                <td className="break-words">{booking.email}</td>
                <td>{booking.totalGuests}</td>
                <td>
                  {new Intl.DateTimeFormat("sv-SE", {
                    timeStyle: "short",
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
