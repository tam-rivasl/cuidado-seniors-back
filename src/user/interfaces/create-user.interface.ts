import { status } from '../dto/create-rol.dto';
export interface ICreateUser {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  birthDate: Date;
  age: number;
  identificationNumber: string;
  password: string;
  gender: string;
  status: string,
}
