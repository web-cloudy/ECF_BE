import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from './entity/staffs.entity';  // Adjust path if necessary
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';

@Injectable()
export class StaffsService {
  constructor(
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
  ) { }

  async create(createStaffDto: CreateStaffDto): Promise<Staff> {
    try {
      const staff = this.staffRepository.create(createStaffDto);
      return await this.staffRepository.save(staff);  // Save the new staff record to the database
    } catch (err) {
      throw new Error(`Error creating ${err} user ${err.message}`);
    }

  }

  async findOne(id: number): Promise<Staff> {
    try {
      const staff = await this.staffRepository.findOne({
        select: ['id', 'name', 'title', 'company', 'group', 'role', 'email', 'business_phone',
          'cell_phone', 'account_right', 'is_active', 'remark'
        ],
        where: { id }
      });
      if (!staff) {
        throw new NotFoundException(`Staff member with ID ${id} not found.`);
      }
      return staff;  // Return the found staff member
    } catch (err) {
      throw new Error(`Error finding user: ${err.message}`);
    }
  }

  async findAllPaginated(page: number, limit: number): Promise<{
    data: Staff[];
    total: number;
    page: number;
    limit: number;
  }> {
    // Validate pagination parameters
    const take = limit > 0 ? limit : 10; // Default to 10 if invalid limit
    const skip = (page > 0 ? page - 1 : 0) * take;

    // Fetch data with pagination
    const [data, total] = await this.staffRepository.findAndCount({
      skip,
      take,
    });

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async update(id: number, updateStaffDto: UpdateStaffDto): Promise<Staff | null> {
    const staff = await this.staffRepository.findOne({ where: { id } });
    if (!staff) {
      return null;
    }

    // Update the staff data
    Object.assign(staff, updateStaffDto);
    return this.staffRepository.save(staff); // Save updated data to the database
  }

  async remove(id: number): Promise<boolean> {
    const staff = await this.staffRepository.findOne({ where: { id } });
    if (!staff) {
      return false; 
    }
    await this.staffRepository.remove(staff);  
    return true;  
  }
}