import { Injectable, Logger } from '@nestjs/common';
import { v2, UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
const toStream = require('buffer-to-stream');

@Injectable()
export class CloudinaryService {
  private readonly logger = new Logger(CloudinaryService.name);

  async uploadImage(
    file: Express.Multer.File,
    folder: string = 'immo360/profiles',
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        {
          folder: folder,
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) {
            this.logger.error(`Erreur Cloudinary: ${error.message}`);
            return reject(error);
          }
          if (!result) {
            return reject(new Error('Résultat Cloudinary indéfini'));
          }
          resolve(result);
        },
      );
      
      toStream(file.buffer).pipe(upload);
    });
  }

  async deleteImage(publicId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      v2.uploader.destroy(publicId, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }
}
