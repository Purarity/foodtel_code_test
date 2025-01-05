"use client";

import { addBooking } from "@/actions/bookings";
import { BookingFormSchema } from "@/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useRef } from "react";
import { useForm } from "react-hook-form";

type BookingFormInputs = {
  bookerName: string;
  email: string;
  totalGuests: number;
  date: string;
  time: string;
};

export default function BookingForm() {
  const formRef = useRef<HTMLFormElement>(null!);
  const { register, handleSubmit, formState } = useForm<BookingFormInputs>({
    resolver: zodResolver(BookingFormSchema),
  });
  const [state, submitAction] = useActionState(addBooking, null);

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(() => formRef.current.submit())}
      action={submitAction}
      className="flex flex-col px-4 gap-5 items-center w-full"
    >
      <label htmlFor="bookerName">
        Name:
        <input
          type="text"
          className="block w-full"
          id="bookerName"
          placeholder="Name..."
          {...register("bookerName")}
          defaultValue={state?.data.bookerName || ""}
          required
        />
      </label>
      <label htmlFor="email">
        Email:
        <input
          type="text"
          className="block w-full"
          id="email"
          placeholder="Email..."
          {...register("email")}
          defaultValue={state?.data.email || ""}
          required
        />
      </label>
      <div className="flex flex-wrap justify-center gap-5">
        <label htmlFor="totalGuests">
          Total Guests:
          <input
            type="number"
            inputMode="numeric"
            min={1}
            className="block w-24"
            id="totalGuests"
            defaultValue={2}
            placeholder="Total Guests..."
            {...register("totalGuests")}
            required
          />
        </label>
        <label htmlFor="date">
          Date:
          <input
            type="date"
            className="block w-full"
            id="date"
            {...register("date")}
            defaultValue={new Intl.DateTimeFormat("sv-SE", {
              dateStyle: "short",
            }).format(new Date())}
            required
          />
        </label>
        <label htmlFor="time">
          Time:
          <input
            type="time"
            defaultValue={new Intl.DateTimeFormat("sv-SE", {
              timeStyle: "short",
            }).format(new Date())}
            className="block w-full"
            id="time"
            {...register("time")}
            required
          />
        </label>
      </div>
      <button
        type="submit"
        disabled={formState.isSubmitting}
        className="bg-[#353b39] text-white rounded-2xl flex items-center justify-center h-8 w-20"
      >
        {formState.isSubmitting ? (
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
      {Object.keys(formState.errors).length ? (
        <div className="bg-red-500 text-white p-2 rounded">
          {Object.values(formState.errors).map((error, index) => {
            return (
              <div className="text-center" key={index}>
                {error.message}
              </div>
            );
          })}
        </div>
      ) : null}

      {state?.success === false && (
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
