"use client";
import type { Booking } from "@prisma/client";
import debounce, { DebounceSettings } from "lodash-es/debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import Pagination from "./Pagination";
import Popover from "./Popover";

export default function BookingList({
  bookingList,
  bookingCount,
  page,
}: {
  bookingList: Booking[];
  bookingCount: number;
  page: number;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPath = usePathname();
  const dateFilterCheckboxRef = useRef<HTMLInputElement>(null!);
  const fromDatesRef = useRef<HTMLInputElement>(null!);
  const toDatesRef = useRef<HTMLInputElement>(null!);
  const [selectedBooking, setSelectedBooking] = useState<Booking>();
  const popoverRef = useRef<HTMLDivElement>(null!);

  function paramsChange(filters: string[], values: string[]) {
    const newSearchParams = new URLSearchParams(searchParams);

    for (let i = 0; i < filters.length; i++) {
      if (values.length && values[i]) {
        newSearchParams.set(filters[i], values[i]);
      } else {
        newSearchParams.delete(filters[i]);
      }
    }

    router.replace(`${currentPath}?${newSearchParams.toString()}`);
  }

  const debounceParamsChange: (
    filters: string[],
    values: string[],
    options?: DebounceSettings
  ) => void = debounce(paramsChange, 200, { trailing: true });

  return (
    <>
      <Popover booking={selectedBooking} popoverRef={popoverRef} />
      <div className="space-y-4 p-4 h-full">
        <div>Found bookings: {bookingCount}</div>
        <div className="flex flex-wrap justify-center items-center gap-4">
          <input
            className="p-1 border rounded w-64"
            defaultValue={searchParams.get("filterString") || ""}
            onChange={(event) =>
              debounceParamsChange(
                ["filterString"],
                [event.currentTarget.value]
              )
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
                  paramsChange(
                    ["fromDate", "toDate"],
                    [fromDatesRef.current.value, toDatesRef.current.value]
                  );
                } else {
                  paramsChange(["fromDate", "toDate"], []);
                }
              }}
            />
          </label>
          <div className="md:block flex flex-col flex-wrap items-center gap-4">
            <label htmlFor="fromDate">
              From:
              <input
                ref={fromDatesRef}
                type="date"
                name="fromDate"
                id="fromDate"
                className="brightness-90 px-1 rounded"
                defaultValue={
                  searchParams.get("fromDate") ||
                  new Intl.DateTimeFormat("sv-SE", {
                    dateStyle: "short",
                  }).format(new Date())
                }
                onChange={(event) =>
                  dateFilterCheckboxRef.current.checked &&
                  paramsChange(["fromDate"], [event.currentTarget.value])
                }
              />
            </label>
            <label className="md:ml-6" htmlFor="toDate">
              To:
              <input
                ref={toDatesRef}
                type="date"
                name="toDate"
                id="toDate"
                className="brightness-90 px-1 rounded"
                defaultValue={
                  searchParams.get("toDate") ||
                  new Intl.DateTimeFormat("sv-SE", {
                    dateStyle: "short",
                  }).format(new Date())
                }
                onChange={(event) =>
                  dateFilterCheckboxRef.current.checked &&
                  paramsChange(["toDate"], [event.currentTarget.value])
                }
              />
            </label>
          </div>
        </div>

        <Pagination
          page={page}
          bookingCount={bookingCount}
          paramsChange={paramsChange}
        />

        <table className="table-fixed rounded-lg w-full text-center overflow-hidden">
          <thead className="bg-primary-1 text-white">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th className="w-12">Total Guests</th>
              <th>Time</th>
              <th className="w-12" />
            </tr>
          </thead>
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
        </table>
      </div>
    </>
  );
}
