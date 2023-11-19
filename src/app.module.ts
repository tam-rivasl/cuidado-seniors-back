import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ObservationModule } from './observation/observation.module';
import { PaymentHistoryModule } from './payment-history/payment-history.module';
import { PlanServiceModule } from './plan-service/plan-service.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user/user.controller';
import { AppointmentController } from './appointment/appointment.controller';
import { EmergencyContactController } from './emergency-contact/emergency-contact.controller';
import { MedicalRecordController } from './medical-record/medical-record.controller';
import { ObservationController } from './observation/observation.controller';
import { PaymentHistoryController } from './payment-history/payment-history.controller';
import { PlanServiceController } from './plan-service/plan-service.controller';
import { UserService } from './user/user.service';
import { AppointmentService } from './appointment/appointment.service';
import { EmergencyContactService } from './emergency-contact/emergency-contact.service';
import { MedicalRecordService } from './medical-record/medical-record.service';
import { ObservationService } from './observation/observation.service';
import { PaymentHistoryService } from './payment-history/payment-history.service';
import { PlanServiceService } from './plan-service/plan-service.service';
import { PaymentModule } from './payment/payment.module';
import { EmergencyContact } from './emergency-contact/entities/nested/emergency_contact.entity';
import { PatientEmergencyContact } from './emergency-contact/entities/patient_emergency_contact.entity';
import { User } from './user/entities/user.entity';
import { Appointment } from './appointment/entities/appointment.entity';
import { MedicalRecord } from './medical-record/entities/medicalRecord.entity';
import { Observation } from './observation/entities/observation.entity';
import { Rol } from './user/entities/rol.entity';
import { PaymentHistory } from './payment-history/entities/paymentHistory.entity';
import { EmergencyContactModule } from './emergency-contact/emergency-contact.module';
import { MedicalRecordModule } from './medical-record/medical-record.module';
import { PaymentController } from './payment/payment.controller';
import { PaymentService } from './payment/payment.service';
import { Payment } from './payment/entities/payment.entity';
import { PlanService } from './plan-service/entities/planService.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { WebPayModule } from './webpay/webpay.module';
import { WebPayController } from './webpay/webpay.controller';
import { WebPayService } from './webpay/webpay.service';
import { WebPayTransaction } from './webpay/entities/webpay.entitie';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    UserModule,
    ObservationModule,
    PaymentHistoryModule,
    PlanServiceModule,
    PaymentModule,
    Appointment,
    EmergencyContactModule,
    MedicalRecordModule,
    WebPayModule,

    TypeOrmModule.forFeature([
      EmergencyContact,
      PatientEmergencyContact,
      User,
      Appointment,
      PatientEmergencyContact,
      MedicalRecord,
      Observation,
      Rol,
      PaymentHistory,
      Payment,
      PlanService,
      WebPayTransaction,
    ]),
    TypeOrmModule.forRoot({
      type: 'postgres', // type of our database
      host: 'localhost', // database host
      port: 5433, // database host
      username: 'admin', // username
      password: 'admin', // user password
      database: 'cuidado_seniors', // name of our database
      autoLoadEntities: true, // models will be loaded automatically (you don't have to explicitly specify the entities: [] array)
      synchronize: true, // your entities will be synced with the database (ORM will map entity definitions to corresponding SQL tabled), every time you run the application (recommended: disable in the production)
    }),
  ],
  controllers: [
    UserController,
    AppointmentController,
    EmergencyContactController,
    MedicalRecordController,
    ObservationController,
    PaymentController,
    PaymentHistoryController,
    PlanServiceController,
    WebPayController,
  ],
  providers: [
    UserService,
    AppointmentService,
    EmergencyContactService,
    MedicalRecordService,
    ObservationService,
    PaymentHistoryService,
    PaymentService,
    PlanServiceService,
    WebPayService,
  ],
})
export class AppModule {}
