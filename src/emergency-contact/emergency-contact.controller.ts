import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmergencyContactService } from './emergency-contact.service';
import { CreateEmergencyContactDto } from './dto/create-emergency-contact.dto';
import { UpdateEmergencyContactDto } from './dto/update-emergency-contact.dto';

@Controller('emergency-contact')
export class EmergencyContactController {
  constructor(private readonly emergencyContactService: EmergencyContactService) {}

  @Post()
  create(@Body() createEmergencyContactDto: CreateEmergencyContactDto) {
    return this.emergencyContactService.create(createEmergencyContactDto);
  }

  @Get()
  findAll() {
    return this.emergencyContactService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emergencyContactService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmergencyContactDto: UpdateEmergencyContactDto) {
    return this.emergencyContactService.update(+id, updateEmergencyContactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emergencyContactService.remove(+id);
  }
}
