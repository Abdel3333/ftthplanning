import {Controller,Get,Req,Res,Param,HttpException,HttpStatus,Post,UseInterceptors,UploadedFiles,UploadedFile,UseGuards,} from '@nestjs/common';
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ImageUploadService } from './image-upload.service';
  
  @Controller()
  // @UseGuards(AuthGuard())
  export class ImageUploadController {
    constructor(private imageUploadService: ImageUploadService) {}
  
    @Get('files/:id')
    async readFile(@Res() response, @Param('id') id: string): Promise<any> {
      //console.log(id, 'idde');
      return await this.imageUploadService
        .readStream(id)
        .then(item => {
          item
            .once('error', () => {
              return response.status(400).end();
            })
            .pipe(response);
        })
        .catch(err => {
          console.log(err);
          throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        });
    }
  
    @Get('files')
    async ListFiles() {
      const files = await this.imageUploadService.findAll();
      return files;
    }
  
    @Post('files')
    @UseInterceptors(FileInterceptor('file'))
    async UploadFile(@UploadedFile() file,@Req() req) {
      console.log(file,'=====>')
      console.log(req.body.name)
      file.filename = file.originalname;
      file.contentType = file.mimetype;
      file.metadata = req.body.name
  
      
      return await this.imageUploadService.writeStream(file.buffer, file);
    }
  
  
    @Get('file/:id')
    readFileInfo(@Param('id') id: string){
      return this.imageUploadService.findById(id)
    }
  
  
  }
  