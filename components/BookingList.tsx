"use client";
import type { Booking } from "@prisma/client";
import debounce, { DebounceSettings } from "lodash-es/debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import BookingListTable from "./BookingListTable/BookingListTable";
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
      <div className="space-y-4 p-4">
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

        <BookingListTable
          bookingList={bookingList}
          setSelectedBooking={setSelectedBooking}
        />
      </div>
    </>
  );
}
