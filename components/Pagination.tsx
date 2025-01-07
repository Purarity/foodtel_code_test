import { ITEMS_PER_PAGE } from "./constants";

export default function Popover({
  page,
  bookingCount,
  paramsChange,
}: {
  page: number;
  bookingCount: number;
  paramsChange: (filters: string[], values: string[]) => void;
}) {
  const canGoPreviousPage = page !== 1;
  const canGoNextPage = ITEMS_PER_PAGE * page < bookingCount;

  return (
    <div className="text-center">
      <button
        disabled={!canGoPreviousPage}
        className="min-[200px]:inline bg-primary-1 disabled:opacity-20 px-2 border rounded text-white"
        onClick={() =>
          canGoPreviousPage && paramsChange(["page"], [(page - 1).toString()])
        }
      >
        Prev
      </button>
      <div className="inline-block mx-2">Current page number: {page}</div>
      <button
        className="bg-primary-1 disabled:opacity-20 px-2 border rounded text-white"
        disabled={!canGoNextPage}
        onClick={() =>
          canGoNextPage && paramsChange(["page"], [(page + 1).toString()])
        }
      >
        Next
      </button>
    </div>
  );
}
