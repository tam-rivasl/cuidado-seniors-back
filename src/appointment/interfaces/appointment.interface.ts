import { User } from "src/user/entities/user.entity";

export class IAppointment {
  appointmentId: number;
  status: string;
  date: Date;
  nurse: User;
  patient?: User;
  planServiceId: number;
}
