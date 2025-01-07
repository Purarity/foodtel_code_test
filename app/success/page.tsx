export default async function Success() {
  return (
    <div className="h-screen text-center flex flex-col justify-center gap-4 px-6">
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
      <h1>
        Thank you for booking at Foodtel! We&apos;re looking forward to meeting
        you.
      </h1>
      <iframe
        className="w-full h-[20rem]"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2228.6289267040793!2d12.688317176736337!3d56.042413569647366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465233d3ba914591%3A0x638f0780eecc5b1d!2sHetch!5e0!3m2!1sen!2sse!4v1736156513804!5m2!1sen!2sse"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
