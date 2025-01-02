-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "bookerName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "totalGuests" INTEGER NOT NULL,
    "Time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);
