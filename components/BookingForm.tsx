"use client";

import { addBooking } from "@/actions/bookings";
import { BookingFormSchema, type BookingForm } from "@/zodSchemas";
import {
  ChangeEvent,
  FormEvent,
  startTransition,
  useActionState,
  useState,
} from "react";
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
  const [actionError, submitForm, isPending] = useActionState(addBooking, null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    startTransition(async () => {
      try {
        //zod only accept time with seconds, we manually add it here so users dont have to
        BookingFormSchema.parse({ ...formData, time: formData.time + ":00" });
        setFormErrors({});

        submitForm(new FormData(event.currentTarget));
      } catch (error) {
        if (error instanceof ZodError) {
          const fieldErrors: typeof formErrors = {};
          error.errors.forEach(
            (validationError) =>
              (fieldErrors[validationError.path[0]] = validationError.message)
          );
          setFormErrors(fieldErrors);

          //focus on the first error input
          document.getElementById(Object.keys(fieldErrors)[0])?.focus();
        }
      }
    });
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.currentTarget;

    if (name === "date") {
      setFormData((previous) => ({
        ...previous,
        date: new Intl.DateTimeFormat("sv-SE", {
          dateStyle: "short",
        }).format(new Date(value)),
      }));
    } else {
      setFormData((previous) => ({ ...previous, [name]: value }));
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      action={submitForm}
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
            inputMode="numeric"
            min={1}
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

      <button
        disabled={isPending}
        className="bg-[#353b39] text-white rounded-2xl flex items-center justify-center h-8 w-20"
      >
        {isPending ? (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          "Submit"
        )}
      </button>

      {Object.keys(formErrors).length ? (
        <div className="bg-red-500 text-white p-2 rounded">
          {Object.entries(formErrors).map(([name, message]) => (
            <div className="text-center" key={name}>
              {message}
            </div>
          ))}
        </div>
      ) : null}

      {actionError?.success === false && (
        <div className="bg-red-500 text-white p-2 rounded">
          <div className="text-center">
            Something went wrong, please contact us at{" "}
            {process.env.NEXT_PUBLIC_SUPPORT_NUMBER}
          </div>
        </div>
      )}
    </form>
  );
}
