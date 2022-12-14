import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Activity } from './entities/activity.entity';

@Injectable()
export class ActivityService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createActivityDto: Prisma.activitiesCreateInput) {
    try {
      const data = await this.prisma.activities.create({
        data: createActivityDto,
      });
      delete data.deleted_at;
      return data;
    } catch(error) {
      throw new HttpException('gagal menambahkan activity',400);
    }
  }

  async findAll() {
    const data = await this.prisma.activities.findMany({
      select: { id: true, title: true, created_at: true },
      where: { deleted_at: null },
    });
    return { total: data.length, data: data };
  }

  async findOne(id: number) {
    try {
      const data = await this.prisma.activities.findFirst({
        where: { id, deleted_at: null },
        include: { todos: true },
      });
      if (data) {
        return data;
      }
      throw new NotFoundException('No record found for id ' + id);
    } catch (error) {
      throw new NotFoundException('No record found for id ' + id);
    }
  }

  async update(
    id: number,
    updateActivityDto: Prisma.activitiesUpdateInput,
  ) {
    updateActivityDto.updated_at = new Date();
    try {
      const data = await this.prisma.activities.findUnique({where : {id}});
      if (data.deleted_at == null) {
        const dataUpdate = await this.prisma.activities.update({
          where: { id },
          data: updateActivityDto,
        });
        delete dataUpdate.deleted_at;
        return dataUpdate;
      }
  
      throw new HttpException(
        {
          status: 'Not Found',
          message: 'Activity with ID ' + id + ' Not Found',
        },
        404,
      );

    } catch (error) {
      throw new HttpException(
        {
          status: 'Not Found',
          message: 'Activity with ID ' + id + ' Not Found',
        },
        404,
      );
    }
    
  }

  async remove(id: number) {
    try {
      const data = await this.prisma.activities.update({
        where: { id },
        data: { deleted_at: new Date() },
      });
      if (data) {
        return {};
      }
      throw new HttpException(
        {
          status: 'Not Found',
          message: 'Activity with ID ' + id + ' Not Found',
        },
        404,
      );
    } catch (error) {
      throw new HttpException(
        {
          status: 'Not Found',
          message: 'Activity with ID ' + id + ' Not Found',
        },
        404,
      );
    }
  }
}
