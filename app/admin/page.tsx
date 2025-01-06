import BookingList from "@/components/BookingList";
import { Prisma, PrismaClient } from "@prisma/client";

type BookingListFilters = Partial<{
  filterString: string;
  fromDate: string;
  toDate: string;
}>;

export default async function Admin({
  searchParams,
}: {
  searchParams: Promise<BookingListFilters>;
}) {
  const params = await searchParams;
  const prisma = new PrismaClient();

  const whereQuery: Prisma.BookingWhereInput = {
    ...(Object.keys(searchParams).includes("filterString") && {
      OR: [
        {
          bookerName: { contains: params.filterString, mode: "insensitive" },
          email: { contains: params.filterString, mode: "insensitive" },
        },
      ],
    }),
    ...(Object.keys(searchParams).includes("fromDate") &&
      Object.keys(searchParams).includes("toDate") && {
        time: {
          gte: new Date(params.fromDate!),
          lt: new Date(
            new Date(params.toDate!).getTime() + 24 * 60 * 60 * 1000 //before the day after
          ),
        },
      }),
  };

  const bookings = await prisma.booking.findMany({
    where: {
      ...whereQuery,
    },
    orderBy: {
      time: "desc",
    },
  });

  return (
    <>
      <BookingList bookingList={bookings} />
    </>
  );
}
