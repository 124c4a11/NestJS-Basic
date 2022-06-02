import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as mime from 'mime';
import * as uuid from 'uuid';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class FilesService {
  async create(file: Express.Multer.File) {
    try {
      const extension = mime.extension(file.mimetype);
      const fileName = `${uuid.v4()}.${extension}`;
      const filePath = path.resolve(__dirname, '..', 'static');

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(path.join(filePath, fileName), file.buffer);

      return fileName;
    } catch (err) {
      throw new HttpException(
        'File write error!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
