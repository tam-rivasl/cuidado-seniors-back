export enum status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export interface IEmergencyContact {
  patientId: number;
  emergency_contactId: number;
  name: string;
  email: string;
  phoneNumber: string;
  relationship: string;
  status: status;
}
