import { Injectable } from '@nestjs/common';
import { MongoGridFS, IGridFSWriteOption } from 'mongo-gridfs';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Stream, Readable } from 'stream';

@Injectable()
export class ImageUploadService {
  private fileModel: MongoGridFS;

  constructor(@InjectConnection() private readonly connection: Connection) {
    this.fileModel = new MongoGridFS(this.connection.db, 'images');
  }

  async readStream(id: string): Promise<any> {
    return this.fileModel.readFileStream(id);
  }

  async writeStream(
    buffer: Buffer,
    options?: IGridFSWriteOption,
  ): Promise<any> {
    const readableInstanceStream: Readable = new Readable({
      read() {
        this.push(buffer);
        this.push(null);
      },
    });
    return await this.fileModel.writeFileStream(
      readableInstanceStream,
      options,
    );
  }

  async findAll() {
    return await this.fileModel.find({});
  }

  async findById(id) {
    return await this.fileModel.findById(id);
  }
}
