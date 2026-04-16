import { Injectable, Logger } from '@nestjs/common';
import { v2, UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
// @ts-ignore - buffer-to-stream is CommonJS
import toStream from 'buffer-to-stream';

interface FileUpload {
  buffer: Buffer;
  mimetype?: string;
  originalname?: string;
}

@Injectable()
export class CloudinaryService {
  private readonly logger = new Logger(CloudinaryService.name);

  async uploadImage(
    file: FileUpload,
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
    return new Promise<any>((resolve, reject) => {
      v2.uploader.destroy(publicId, (error, result) => {
        if (error) {
          this.logger.error(`Erreur suppression Cloudinary: ${error.message}`);
          return reject(error);
        }
        resolve(result);
      });
    });
  }
}
