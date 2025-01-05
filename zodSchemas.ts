import { env } from "process";
import { z } from "zod";

export const BookingFormSchema = z.object({
  bookerName: z.string().min(1, "Name must be filled"),
  email: z.string().email("Email must be a valid email address"),
  totalGuests: z.coerce
    .number()
    .min(1, "Party must be at least of one")
    .max(
      8,
      `Please contact us at ${process.env.NEXT_PUBLIC_SUPPORT_NUMBER} to book a bigger table`
    ),
  date: z.string().date(),
  time: z.string().time(),
});

export type BookingForm = z.infer<typeof BookingFormSchema>;
