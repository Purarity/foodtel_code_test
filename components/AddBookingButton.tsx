"use client";

import { addBooking } from "@/actions/bookings";

export default function AddBookingButton() {
  return <button onClick={addBooking}>new booking</button>;
}
