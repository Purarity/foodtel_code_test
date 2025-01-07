This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app)

The project is a code test from Foodtelm, making a booking form for a restaurant. The entire app is mobile friendly.
User inputs are validated with Zod on both the frontend and server actions (backend).
The database is PostgreSQL, used with Prisma ORM.
Both the database and server functions are executed from Vercel's fra1 region.
Tailwind CSS is used for CSS stylings.
React Hook Form is used for the main form for performance and ease of use.
Pagination and filtering are done from the server, lodash-es/debounce is used on the client to prevent sending too many requests at once to the server.
Popover API is used when a user wants to archive a booking. There is a bug with the popover sometimes(?) not hiding itself on Safari on iOS.
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

On the homepage is the main form. Users can input their name and email address, both are being validated by Zod with the help of React Hook Form. If any field fails validation, an error message will appear below the "Submit" button. Errors from the server will also be shown in the same place.

After successfully submitting the form, the user will be redirected to the /success page, where a success message and an embedded Google map will appear.

Manually navigating to the /admin page will display the booking list. The booking list itself is a client component. At the top of the page it will show the total amount of found bookings according to current filters (initially none).

The admin can filter by name and email by typing in the text input box and/or by dates by checking the "Filter by dates" checkbox and changing the two date inputs. Changing any of those will update the current URL with the corresponding URLSearchParams. The server component for the page will detect the change in URLSearchParams to generate a Prisma query, and returning the booking list according to the query, in the case of the current page query returning 0 items, it will return items from one page down.

The admin can archive a booking by pressing the "archive" icon on the rightmost side of the booking entry, doing so will show a popover window, where they need to confirm archiving by clicking on the red "YES" button, this will run the server function to archive said entry and reload the table data, clicking "NO" or outside the popover will close it.

The admin can navigate between table pages by pressing the "Prev" and "Next" buttons right above the table, the buttons will be greyed out when at the first or last possible page.

## Bugs

When initially navigating to the /admin page, a #418 (hydration error) error will display in the console. This currently exists because when users make their booking, the time is saved in their locale, which does not necessarily is the same as the server, this can be mitigated by standardized the timezone before saving to the database.

The app is fully functional, but the UI can be better.
