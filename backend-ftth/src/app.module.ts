import { ConfigService } from '@nestjs/config';
import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PlanningModule } from './planning/planning.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PythalgoModule } from './pythalgo/pythalgo.module';
import { ImageUploadModule } from './image-upload/image-upload.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    UserModule, 
    PlanningModule, 
    ImageUploadModule, 
    AuthModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return { uri: configService.get<string>('database.uri')}
      },
      inject:[ConfigService]
    }),
    HttpModule, 
    PythalgoModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
