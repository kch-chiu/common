import { Subjects } from "./subjects";

export interface PaymentCreatedEvent {
  subject: Subjects.PaymentCreated;
  data: {
    stripeId: string;
  };
}
