import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { typeOrmConfig } from './config/typeorm.config';
import { UsersModule } from './users/users.module';
import { StaffsModule } from './staffs/staffs.module';
import { AuthModule } from './auth/auth.module';
import { join } from 'path';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'swagger-static'),
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    StaffsModule,
    AuthModule,
  ],
})
export class AppModule {}
