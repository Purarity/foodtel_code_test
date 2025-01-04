"use client";

import { addBooking } from "@/actions/bookings";
import { BookingFormSchema, type BookingForm } from "@/zodSchemas";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { ZodError } from "zod";

export default function BookingForm() {
  const [formData, setFormData] = useState<BookingForm>({
    bookerName: "",
    email: "",
    totalGuests: 2,
    date: new Date().toLocaleDateString("sv-SE"),
    time: new Date().toLocaleTimeString("sv-SE", {
      timeStyle: "short",
    }),
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      //zod only accept time with seconds, we manually add it here so users dont have to
      BookingFormSchema.parse({ ...formData, time: formData.time + ":00" });
      setFormErrors({});
    } catch (validationError) {
      if (validationError instanceof ZodError) {
        const fieldErrors: typeof formErrors = {};
        validationError.errors.forEach(
          (error) => (fieldErrors[error.path[0]] = error.message)
        );
        setFormErrors(fieldErrors);
        document.getElementById(Object.keys(fieldErrors)[0])?.focus();
        return;
      }
    }

    const response = await addBooking(formData);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.currentTarget;

    switch (name) {
      case "date":
        setFormData((previous) => ({
          ...previous,
          date: new Intl.DateTimeFormat("sv-SE", {
            dateStyle: "short",
          }).format(new Date(formData.date)),
        }));
        break;

      case "totalGuests":
        const parsedGuestsNumber = parseInt(value);
        if (!isNaN(parsedGuestsNumber)) {
          setFormData((previous) => ({
            ...previous,
            totalGuests: parsedGuestsNumber,
          }));
        }
        break;

      default:
        setFormData((previous) => ({ ...previous, [name]: value }));
        break;
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col mx-2 gap-5 items-center w-full"
    >
      <label htmlFor="bookerName" className="w-full">
        Name:
        <input
          type="text"
          className="block w-full"
          id="bookerName"
          name="bookerName"
          placeholder="Name..."
          value={formData.bookerName}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="email" className="w-full">
        Email:
        <input
          type="text"
          className="block w-full"
          id="email"
          name="email"
          placeholder="Email..."
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <div className="flex justify-center gap-5">
        <label htmlFor="totalGuests">
          Total Guests:
          <input
            type="number"
            min={1}
            max={8}
            className="block w-full"
            id="totalGuests"
            name="totalGuests"
            placeholder="Total Guests..."
            value={formData.totalGuests}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="date">
          Date:
          <input
            type="date"
            className="block w-full"
            id="date"
            name="date"
            value={new Intl.DateTimeFormat("sv-SE", {
              dateStyle: "short",
            }).format(new Date(formData.date))}
            onChange={handleChange}
            required
          />
        </label>
        <label htmlFor="time">
          Time:
          <input
            type="time"
            className="block w-full"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <button>submit</button>
      {Object.keys(formErrors).length ? (
        <div className="bg-red-500 text-white p-2 rounded">
          {Object.entries(formErrors).map(([name, message]) => (
            <div className="text-center" key={name}>
              {message}
            </div>
          ))}
        </div>
      ) : null}
    </form>
  );
}
