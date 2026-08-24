import type { Metadata } from "next";
import { BookAppointmentDetail } from "@/components/book-appointment/BookAppointmentDetail";

export const metadata: Metadata = {
  title: "Book Appointment | Deployra",
  description:
    "Schedule a free strategy call with Deployra — choose a consultation type, pick a time slot, and get on our calendar.",
};

export default function BookAppointmentPage() {
  return <BookAppointmentDetail />;
}
