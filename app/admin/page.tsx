import BookingList from "@/components/BookingList";
import { Prisma, PrismaClient } from "@prisma/client";

type BookingListFilters = Partial<{
  filterString: string;
  fromDate: string;
  toDate: string;
  page: string;
}>;

export const ITEMS_PER_PAGE = 10;

export default async function Admin({
  searchParams,
}: {
  searchParams: Promise<BookingListFilters>;
}) {
  const params = await searchParams;
  const prisma = new PrismaClient();
  const parsedPageNumber = parseInt(params.page || "1");

  const whereQuery: Prisma.BookingWhereInput = {
    ...(Object.keys(params).includes("filterString") && {
      OR: [
        {
          bookerName: { contains: params.filterString, mode: "insensitive" },
          email: { contains: params.filterString, mode: "insensitive" },
        },
      ],
    }),
    ...(Object.keys(params).includes("fromDate") &&
      Object.keys(params).includes("toDate") && {
        time: {
          gte: new Date(params.fromDate!),
          lt: new Date(
            new Date(params.toDate!).getTime() + 24 * 60 * 60 * 1000 //before the day after
          ),
        },
      }),
    archived: false,
  };

  const bookingCount = await prisma.booking.count({ where: whereQuery });
  const skipping = parsedPageNumber * ITEMS_PER_PAGE - ITEMS_PER_PAGE;
  let bookings = await prisma.booking.findMany({
    skip: skipping < 0 ? 1 : skipping, //prevents skipping negative number of items
    take: ITEMS_PER_PAGE,
    where: {
      ...whereQuery,
    },
    orderBy: {
      time: "desc",
    },
  });

  let updatePageNumber = 0;
  // this can happen if current page ran out of items
  if (bookings.length === 0 && params.page) {
    // return bookings from a page down if possible
    if (bookingCount > 0) {
      bookings = await prisma.booking.findMany({
        skip: (parsedPageNumber - 1) * ITEMS_PER_PAGE - ITEMS_PER_PAGE,
        take: ITEMS_PER_PAGE,
        where: {
          ...whereQuery,
        },
        orderBy: {
          time: "desc",
        },
      });
      updatePageNumber = parsedPageNumber - 1;
    }
  }

  return (
    <BookingList
      bookingList={bookings}
      page={updatePageNumber || parsedPageNumber}
      bookingCount={bookingCount}
    />
  );
}
