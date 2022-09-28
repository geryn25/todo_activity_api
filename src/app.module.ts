import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { ActivityModule } from './activity/activity.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [TodoModule, ActivityModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
