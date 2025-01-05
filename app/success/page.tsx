export default async function Success() {
  return (
    <div className="h-screen text-center flex flex-col justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={3}
        stroke="green"
        className="size-24 mx-auto"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.5 12.75 6 6 9-13.5"
        />
      </svg>

      <h1 className="">
        Thank you for booking at Foodtel! We're looking forward to meeting you.
      </h1>

      <a className="" href="/">
        Back
      </a>
    </div>
  );
}
