import { ConfigModule } from '@nestjs/config';
import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthUserSchema } from 'src/auth/authUser.schema';
import { ImageUploadModule } from 'src/image-upload/image-upload.module';
import { PythalgoModule } from 'src/pythalgo/pythalgo.module';
import { PlanningController } from './planning.controller';
import { PlanningService } from './planning.service';
import { PlanningSchema } from './schema/planning.schema';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {name: 'Planning', schema:PlanningSchema }, 
      {name:'AuthUser', schema: AuthUserSchema}
    ]), 
    HttpModule,
    PythalgoModule,
    ImageUploadModule,
  ],
  controllers: [PlanningController],
  providers: [PlanningService],
  exports: []
})
export class PlanningModule {}
