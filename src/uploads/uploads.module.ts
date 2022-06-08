import { Module } from '@nestjs/common';
import UploadsController from './uploads.controller';
import UploadsService from './uploads.service';
import Upload from './upload.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Upload])],
  controllers: [UploadsController],
  providers: [UploadsService],
})
export class UploadsModule {}
