import { IsNotEmpty, IsNumber } from "class-validator";
import { CreateContactDto } from "./contact.dto";

export class PatientContactDto {
    @IsNotEmpty()
    @IsNumber()
    patientId: number;
    @IsNotEmpty()
    contact: CreateContactDto;
}
