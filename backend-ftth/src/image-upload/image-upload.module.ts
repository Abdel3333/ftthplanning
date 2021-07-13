import { Module } from '@nestjs/common';
import { ImageUploadService } from './image-upload.service';
import { ImageUploadController } from './image-upload.controller';

@Module({
  providers: [ImageUploadService],
  controllers: [ImageUploadController],
  exports: [ImageUploadService],
})
export class ImageUploadModule {}
