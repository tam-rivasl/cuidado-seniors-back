import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from 'src/common/paginationQueryDto';
import { User } from './entities/user.entity';
import { CreateRolDto } from './dto/create-rol.dto';
import { LoginDto } from './dto/loginDto.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('createRol')
  public async createRol(@Body() createRolDto: CreateRolDto) {
    return await this.userService.createRol(createRolDto);
  }
  @Post('create')
  public async register(@Body() createUserDto: CreateUserDto) {
    return await this.userService.userCreate(createUserDto);
  }

  @Post('login')
  public async login(@Body() loginDto: LoginDto) {
    return await this.userService.login(loginDto);
  }


  @Get('find/nurses')
  public async findAllNurses(@Query() paginationQueryDto: PaginationQueryDto<User>) {
    return this.userService.findAllNurses(paginationQueryDto);
  }

  @Get()
  public async findAll(@Query() paginationQueryDto: PaginationQueryDto<User>) {
    return this.userService.findAll(paginationQueryDto);
  }


  @Get(':userId')
  public async findOne(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.findOne(userId);
  }

  @Patch(':userId')
  public async update(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(userId, updateUserDto);
  }

  @Patch('update/status/:userId')
  public async updateStatus(
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return this.userService.updateStatus(userId);
  }
}
