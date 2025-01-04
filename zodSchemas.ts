import { z } from 'zod';

export const BookingFormSchema = z.object({
  bookerName: z.string().min(1, "Name must be filled"),
  email: z.string().email("Email must be a valid email address"),
  totalGuests: z.number().min(1, "Party must be at least of one").max(8, "Please contact us at 000-000-0000 to book a bigger table"),
  date: z.string().date(),
  time: z.string().time()
})

export type BookingForm = z.infer<typeof BookingFormSchema>;