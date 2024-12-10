// staff.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from './entity/staffs.entity';
import { StaffsService } from './staffs.service';
import {StaffsController}  from './staffs.controller'
@Module({
  imports: [TypeOrmModule.forFeature([Staff])],  // Registering the Staff entity
  controllers: [StaffsController],
  providers: [StaffsService],
  exports: [StaffsService], 
})
export class StaffsModule {}