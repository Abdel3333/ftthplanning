import { HttpModule, Module } from '@nestjs/common';
import { PythalgoController } from './pythalgo.controller';
import { PythalgoService } from './pythalgo.service';

@Module({
  imports: [HttpModule, ],
  controllers: [PythalgoController],
  providers: [PythalgoService],
  exports: [PythalgoService]
})
export class PythalgoModule {}
