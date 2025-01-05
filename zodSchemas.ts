import { z } from "zod";

export const BookingFormSchema = z.object({
  bookerName: z.string().min(1, "Name must be filled"),
  email: z.string().email("Email must be a valid email address"),
  totalGuests: z.coerce
    .number()
    .min(1)
    .max(
      8,
      `Please contact us at ${process.env.NEXT_PUBLIC_SUPPORT_NUMBER} to book a bigger table`
    ),
  date: z.string().date(),
  time: z.preprocess(
    (input) =>
      `${
        (input as string).split(":").length < 3
          ? (input as string) + ":00"
          : input
      }`,
    z.string().time()
  ), //automatically add seconds when needed to pass time validation
});

export type BookingForm = z.infer<typeof BookingFormSchema>;
