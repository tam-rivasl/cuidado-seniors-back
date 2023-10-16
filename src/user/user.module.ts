import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Rol } from './entities/rol.entity';
import { EmergencyContact } from 'src/emergency-contact/entities/nested/emergency_contact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Rol, EmergencyContact])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
