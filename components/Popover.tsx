import { archiveBooking } from "@/actions/bookings";
import { Booking } from "@prisma/client";
import { RefObject } from "react";

export default function Popover({
  booking,
  popoverRef,
}: {
  booking?: Booking;
  popoverRef: RefObject<HTMLDivElement>;
}) {
  return (
    <div
      ref={popoverRef}
      popover="auto"
      id="archive-check"
      className="space-y-4 p-4 rounded popover"
    >
      <h2 className="font-bold text-2xl text-center">Archive this booking?</h2>
      <div className="text-start">
        <div className="font-bold">
          Name:{" "}
          <div className="inline font-normal break-words">
            {booking?.bookerName}
          </div>{" "}
        </div>
        <div className="font-bold">
          Email:{" "}
          <div className="inline font-normal break-words">{booking?.email}</div>
        </div>
        <div className="font-bold">
          Total Guests:{" "}
          <div className="inline font-normal">{booking?.totalGuests}</div>
        </div>
        <div className="font-bold">
          Time:{" "}
          <div className="inline font-normal">
            {new Intl.DateTimeFormat("en-GB", {
              timeStyle: "short",
            }).format(booking?.time)}{" "}
            {new Intl.DateTimeFormat("te", {
              dateStyle: "short",
            }).format(booking?.time)}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => {
            if (booking) {
              archiveBooking(booking?.id);
              popoverRef.current.hidePopover();
            }
          }}
          className="border-2 bg-red-500 px-2 border-transparent rounded text-white uppercase"
        >
          Yes
        </button>
        <button
          popoverTarget="archive-check"
          popoverTargetAction="hide"
          className="border-2 ml-5 px-2 rounded uppercase"
        >
          No
        </button>
      </div>
    </div>
  );
}
