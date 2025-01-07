This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app)
The project is a code test from Foodtelm, making a booking form for a restaurant. The entire app is mobile friendly.
User inputs are validated with zod on both frontend and server actions(backend).
Database is PostgreSQL, used with Prisma ORM.
Both the database and server functions are executed from Vercel's fra1 region.
Tailwindcss is used for css stylings.
React Hook Form is used for the main form for performance and ease of use.
Pagination and filtering is done from the server, lodash-es/debounce is used on client to prevent sending unnecessary many request to server.
Popover API is used when a user want to archive a booking. There is a bug with the popover sometimes(?) not hiding itself on Safari on iOS
but is being [fixed](https://bugs.webkit.org/show_bug.cgi?id=267688).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Using the app

On the homepage is the main form, users can input their name and email address, both are being validated by zod, with the help of react-hook-form. If any field fail validation, an error message will appear below the "Submit" button. Errors from server will also be shown in the same place.

Ater successfully submitting the form, the user will be redirected to the /success page, where a success message and an embedded google map will appear.

Manually navigating to the /admin page will display the booking list. The booking list itself is a client component. At the top of the page it will show the total amount of found bookings according to current filters(initially none).

The admin can filter name and email by typing in the text input box, and/or by dates by checking the "Filter by dates" checkbox and changing the two date inputs. Changing any of those will update the current url with corresponding URLSearchParams. The server component for the page will detect the change in URLSearchParams to generate a prisma query, and returning the booking list according to the query, in the case of the current page query returning 0 items, it will return items from one page down.

The admin can archive a booking by pressing the "archive" icon right-most of the booking entry, doing so will show a popover window, where they need to confirm archiving by clicking on the the red "YES" button, this will run the server function to archive said entry and reload the table data, clicking "NO" or outside the popover will close it.

The admin can navigate between table pages by pressing the "Prev" and "Next" buttons right above the table, the buttons will be greyed out when at the first or last possible page.

##Bugs

When initially navigating to the /admin page, a #418(hydration error) error will display in the console, this only exist in current production, this is caused by the use of new Date() function, its value isn't consistent across locations, so there can be a mismatch when it run on server and on client.

The date picker is initially empty on Chromium browsers because it doesn't return the standardized format of "yyyy-mm-dd", it returns "d-m-yyy".

The app is fully functional but UI can be better.
