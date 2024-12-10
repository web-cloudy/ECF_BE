import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  UsePipes,
  Query,
  UseGuards,
  ValidationPipe,
  NotFoundException
} from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { StaffsService } from './staffs.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { Staff } from './entity/staffs.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('staff')
export class StaffsController {
  constructor(
    private readonly staffService: StaffsService,
  ) { }


  @Post('/addOne')  // New endpoint for adding staff
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Add a new staff member',
  })
  @ApiBody({
    description: 'Staff data for creating a new staff member',
    type: CreateStaffDto,  // Reference the DTO here
    examples: {
      'application/json': {
        value: {
          name: 'John Doe',
          title: 'Processor',
          company: 'PL_FINANCE',
          group: 'N/A',
          role: 'Developer',
          email: 'john.doe@example.com',
          business_phone: '+1 234 567 8901 (USA)',
          cell_phone: '+1 234 567 8901 (USA)',
          account_right: 'Manager',
          is_active: 'Y',
          remark: 'Senior Developer',
        },  // Example request data
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The staff member has been successfully created.',
    schema: {
      example: {
        id: 1,
        name: 'John Doe',
        title: 'Processor',
        company: 'PL_FINANCE',
        group: 'N/A',
        role: 'Developer',
        email: 'john.doe@example.com',
        business_phone: '+1 234 567 8901 (USA)',
        cell_phone: '+1 234 567 8901 (USA)',
        account_right: 'Manager',
        is_active: 'Y',
        remark: 'Senior Developer',
        createdAt: '2024-12-08T12:00:00.000Z',
        updatedAt: '2024-12-08T12:00:00.000Z',
      },  // Example response data
    },
  })
  @UsePipes(ValidationPipe)  // Automatically validate incoming DTO
  addStaff(@Body() createStaffDto: CreateStaffDto) {
    return this.staffService.create(createStaffDto);  // Call the staff service to create a new staff member
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Get a staff member by ID',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the staff member',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'The staff member has been successfully retrieved.',
    schema: {
      example: {
        id: 1,
        name: 'John Doe',
        title: 'Processor',
        company: 'PL_FINANCE',
        group: 'N/A',
        role: 'Developer',
        email: 'john.doe@example.com',
        business_phone: '+1 234 567 8901 (USA)',
        cell_phone: '+1 234 567 8901 (USA)',
        account_right: 'Manager',
        is_active: 'Y',
        remark: 'Senior Developer',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Staff member not found.',
  })
  async getStaff(@Param('id') id: number): Promise<Staff> {
    const staff = await this.staffService.findOne(id);
    if (!staff) {
      throw new NotFoundException(`Staff member with ID ${id} not found.`);
    }
    return staff;
  }

  @Get('/')
  @ApiOperation({
    summary: 'Get a paginated list of all staff members',
  })
  @ApiQuery({
    name: 'page',
    description: 'Page number',
    example: 1,
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    description: 'Number of records per page',
    example: 10,
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of staff members successfully retrieved.',
    schema: {
      example: {
        data: [
          {
            id: 1,
            name: 'John Doe',
            title: 'Processor',
            company: 'PL_FINANCE',
            group: 'N/A',
            role: 'Developer',
            email: 'john.doe@example.com',
            business_phone: '+1 234 567 890 (USA)',
            cell_phone: '+1 234 567 890 (USA)',
            account_right: 'Manager',
            is_active: 'Y',
            remark: 'Senior Developer',
          },
        ],
        total: 50,
        page: 1,
        limit: 10,
      },
    },
  })
  @UseGuards(JwtAuthGuard) 
  async getAllStaff(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{
    data: Staff[];
    total: number;
    page: number;
    limit: number;
  }> {
    return this.staffService.findAllPaginated(page, limit);
  }

  @Patch('/:id')
  @ApiOperation({
    summary: 'Update a staff member by ID',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the staff member to update',
    example: 1,
  })
  @ApiBody({
    description: 'Updated staff data',
    type: UpdateStaffDto, // Reference the new UpdateStaffDto
    examples: {
      'application/json': {
        value: {
          name: 'Jane Doe',
          title: 'Senior Developer',
          company: 'PL_FINANCE',
          group: 'N/A',
          role: 'Officer',
          email: 'jane.doe@example.com',
          business_phone: '+1 234 567 8901 (USA)',
          cell_phone: '+1 234 567 8901 (USA)',
          account_right: 'Manager',
          is_active: 'Y',
          remark: 'Promoted to Team Lead',
        }, // Example request data
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The staff member has been successfully updated.',
    schema: {
      example: {
        id: 1,
        name: 'Jane Doe',
        title: 'Senior Developer',
        company: 'PL_FINANCE',
        group: 'N/A',
        role: 'Team Lead',
        email: 'jane.doe@example.com',
        business_phone: '+1234567890',
        cell_phone: '+1234567890',
        account_right: 'Manager',
        is_active: 'Y',
        remark: 'Promoted to Team Lead',
        updatedAt: '2024-12-08T12:00:00.000Z',
      }, // Example response data
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Staff member not found.',
  })
  @UsePipes(ValidationPipe) // Automatically validate incoming DTO
  async updateStaff(
    @Param('id') id: number,
    @Body() updateStaffDto: UpdateStaffDto,
  ): Promise<Staff> {
    const updatedStaff = await this.staffService.update(id, updateStaffDto);
    if (!updatedStaff) {
      throw new NotFoundException(`Staff member with ID ${id} not found.`);
    }
    return updatedStaff;
  }


  @Delete('/:id')  // Endpoint to delete staff by ID
  @ApiOperation({
    summary: 'Delete a staff member by ID',
  })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the staff member to delete',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'The staff member has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Staff member not found.',
  })
  async deleteStaff(@Param('id') id: number): Promise<void> {
    const isDeleted = await this.staffService.remove(id);  // Call service to delete the staff
    if (!isDeleted) {
      throw new NotFoundException(`Staff member with ID ${id} not found.`);
    }
  }
}
