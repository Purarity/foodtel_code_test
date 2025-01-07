"use client";
import type { Booking } from "@prisma/client";
import debounce, { DebounceSettings } from "lodash-es/debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function BookingList({
  bookingList,
  bookingCount,
  page,
  ITEMS_PER_PAGE,
}: {
  bookingList: Booking[];
  bookingCount: number;
  page: number;
  ITEMS_PER_PAGE: number;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPath = usePathname();
  const dateFilterCheckboxRef = useRef<HTMLInputElement>(null!);
  const fromDatesRef = useRef<HTMLInputElement>(null!);
  const toDatesRef = useRef<HTMLInputElement>(null!);
  const [selectedBooking, setSelectedBooking] = useState<Booking>();
  const archivePopOverRef = useRef<HTMLDivElement>(null!);
  const canGoPreviousPage = page !== 1;
  const canGoNextPage = ITEMS_PER_PAGE * page < bookingCount;

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

  useEffect(() => {
    console.log(
      dateFilterCheckboxRef,
      fromDatesRef,
      toDatesRef,
      selectedBooking,
      archivePopOverRef,
      canGoPreviousPage,
      canGoNextPage,
      setSelectedBooking,
      bookingList,
      debounceParamsChange
    );
  }, [
    dateFilterCheckboxRef,
    fromDatesRef,
    toDatesRef,
    selectedBooking,
    archivePopOverRef,
    canGoPreviousPage,
    canGoNextPage,
    setSelectedBooking,
    bookingList,
    debounceParamsChange,
  ]);
  return (
    <></>
    // <div className="space-y-4 p-4">
    //   {/* Popover */}
    //   <div
    //     ref={archivePopOverRef}
    //     popover="auto"
    //     id="archive-check"
    //     className="p-4 rounded popover"
    //   >
    //     <div>Archive this booking?</div>
    //     <div className="text-start">
    //       <div className="break-words">Name: {selectedBooking?.bookerName}</div>
    //       <div className="break-words">Email: {selectedBooking?.email}</div>
    //       <div>Total Guests: {selectedBooking?.totalGuests}</div>
    //       <div>
    //         Time:{" "}
    //         {new Intl.DateTimeFormat("sv-SE", {
    //           timeStyle: "short",
    //           dateStyle: "short",
    //         }).format(selectedBooking?.time)}
    //       </div>
    //     </div>
    //     <div className="flex justify-center">
    //       <button
    //         onClick={() => {
    //           if (selectedBooking) {
    //             archiveBooking(selectedBooking?.id);
    //             archivePopOverRef.current.hidePopover();
    //           }
    //         }}
    //         className="border-2 bg-red-500 px-2 border-transparent rounded text-white uppercase"
    //       >
    //         Yes
    //       </button>
    //       <button
    //         popoverTarget="archive-check"
    //         popoverTargetAction="hide"
    //         className="border-2 ml-5 px-2 rounded uppercase"
    //       >
    //         No
    //       </button>
    //     </div>
    //   </div>
    //   <div>Found bookings : {bookingCount}</div>
    //   <div className="flex flex-wrap items-center gap-4">
    //     <input
    //       className="p-1 border rounded w-64"
    //       defaultValue={searchParams.get("filterString") || ""}
    //       onChange={(event) =>
    //         debounceParamsChange(["filterString"], [event.currentTarget.value])
    //       }
    //       placeholder="Filter by name or email..."
    //     />
    //     <label htmlFor="filterByDate">
    //       Filter by dates:
    //       <input
    //         ref={dateFilterCheckboxRef}
    //         type="checkbox"
    //         name="filterByDate"
    //         id="filterByDate"
    //         onChange={(event) => {
    //           if (event.currentTarget.checked) {
    //             debounceParamsChange(
    //               ["fromDate", "toDate"],
    //               [fromDatesRef.current.value, toDatesRef.current.value]
    //             );
    //           } else {
    //             debounceParamsChange(["fromDate", "toDate"], []);
    //           }
    //         }}
    //       />
    //     </label>
    //     <label htmlFor="fromDate">
    //       From:
    //       <input
    //         ref={fromDatesRef}
    //         type="date"
    //         name="fromDate"
    //         id="fromDate"
    //         className="brightness-90 px-1 rounded"
    //         defaultValue={
    //           searchParams.get("fromDate") ||
    //           new Intl.DateTimeFormat("sv-SE", {
    //             dateStyle: "short",
    //           }).format(new Date())
    //         }
    //         onChange={(event) =>
    //           dateFilterCheckboxRef.current.checked &&
    //           debounceParamsChange(["fromDate"], [event.currentTarget.value])
    //         }
    //       />
    //     </label>
    //     <label htmlFor="toDate">
    //       To:
    //       <input
    //         ref={toDatesRef}
    //         type="date"
    //         name="toDate"
    //         id="toDate"
    //         className="brightness-90 px-1 rounded"
    //         defaultValue={
    //           searchParams.get("toDate") ||
    //           new Intl.DateTimeFormat("sv-SE", {
    //             dateStyle: "short",
    //           }).format(new Date())
    //         }
    //         onChange={(event) =>
    //           dateFilterCheckboxRef.current.checked &&
    //           debounceParamsChange(["toDate"], [event.currentTarget.value])
    //         }
    //       />
    //     </label>
    //   </div>

    //   <div className="text-center">
    //     <button
    //       disabled={!canGoPreviousPage}
    //       className="min-[200px]:inline bg-primary-1 disabled:opacity-20 px-2 border rounded text-white"
    //       onClick={() =>
    //         canGoPreviousPage && paramsChange(["page"], [(page - 1).toString()])
    //       }
    //     >
    //       Prev
    //     </button>
    //     <div className="inline-block mx-4">Current page: {page}</div>
    //     <button
    //       className="bg-primary-1 disabled:opacity-20 px-2 border rounded text-white"
    //       disabled={!canGoNextPage}
    //       onClick={() =>
    //         canGoNextPage && paramsChange(["page"], [(page + 1).toString()])
    //       }
    //     >
    //       Next
    //     </button>
    //   </div>
    //   <table className="table-fixed rounded-lg w-full text-center overflow-hidden">
    //     <thead className="bg-primary-1 text-white">
    //       <tr>
    //         <th>Name</th>
    //         <th>Email</th>
    //         <th className="w-12">Total Guests</th>
    //         <th>Time</th>
    //         <th className="w-12" />
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {bookingList.length
    //         ? bookingList.map((booking) => (
    //             <tr
    //               key={booking.id}
    //               className="hover:brightness-90 odd:bg-white even:bg-gray-100 h-8"
    //             >
    //               <td className="break-words">{booking.bookerName}</td>
    //               <td className="break-words">{booking.email}</td>
    //               <td>{booking.totalGuests}</td>
    //               <td>
    //                 {new Intl.DateTimeFormat("sv-SE", {
    //                   timeStyle: "short",
    //                   dateStyle: "short",
    //                 }).format(booking.time)}
    //               </td>
    //               <td>
    //                 <button
    //                   popoverTarget="archive-check"
    //                   onClick={() => setSelectedBooking(booking)}
    //                   className="flex"
    //                 >
    //                   <svg
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     fill="none"
    //                     viewBox="0 0 24 24"
    //                     strokeWidth={1.5}
    //                     stroke="red"
    //                     className="size-6"
    //                   >
    //                     <path
    //                       strokeLinecap="round"
    //                       strokeLinejoin="round"
    //                       d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
    //                     />
    //                   </svg>
    //                 </button>
    //               </td>
    //             </tr>
    //           ))
    //         : null}
    //     </tbody>
    //   </table>
    // </div>
  );
}
