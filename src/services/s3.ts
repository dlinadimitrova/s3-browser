import { S3Client, ListObjectsV2Command, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import type { AWSCredentials } from '../shared/models/interfaces';
import { isDirectory } from '../shared/utils/fileUtils';

export interface S3Object {
  key: string;
  size?: number;
  lastModified?: Date;
  isDirectory: boolean;
}

export class S3Service {
  private client: S3Client;

  constructor(credentials: AWSCredentials) {
    this.client = new S3Client({
      region: credentials.region,
      credentials: {
        accessKeyId: credentials.accessKeyId,
        secretAccessKey: credentials.secretAccessKey,
      },
    });
  }

  async listAllObjects(bucket: string, prefix: string = ''): Promise<S3Object[]> {
    try {
      const command = new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: prefix,
      });

      const response = await this.client.send(command);
      const objects: S3Object[] = [];

      if (response.Contents) {
        response.Contents.forEach(content => {
          if (content.Key) {
            objects.push({
              key: content.Key,
              size: content.Size,
              lastModified: content.LastModified,
              isDirectory: isDirectory(content.Key),
            });
          }
        });
      }

      return objects;
    } catch {
      throw new Error('Failed to list all objects');
    }
  }

  async deleteObject(bucket: string, key: string): Promise<void> {
    try {
      if (isDirectory(key)) {
        await this.deleteFolder(bucket, key);
      } else {
        const command = new DeleteObjectCommand({
          Bucket: bucket,
          Key: key,
        });
        await this.client.send(command);
      }
    } catch {
      throw new Error('Failed to delete object');
    }
  }

  async deleteFolder(bucket: string, folderKey: string): Promise<void> {
    try {
      const objects = await this.listAllObjects(bucket, folderKey);
      
      if (objects.length === 0) {
        return;
      }
      
      const deletePromises = objects.map(object => {
        const command = new DeleteObjectCommand({
          Bucket: bucket,
          Key: object.key,
        });
        return this.client.send(command);
      });
      
      await Promise.all(deletePromises);
    } catch {
      throw new Error('Failed to delete folder');
    }
  }

  async createFile(bucket: string, key: string, content: string): Promise<void> {
    try {
      const command = new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: content,
        ContentType: 'text/plain',
      });

      await this.client.send(command);
    } catch {
      throw new Error('Failed to create file');
    }
  }

  async createFolder(bucket: string, key: string): Promise<void> {
    try {
      const folderKey = isDirectory(key) ? key : `${key}/`;
      
      const command = new PutObjectCommand({
        Bucket: bucket,
        Key: folderKey,
        Body: '',
      });

      await this.client.send(command);
    } catch {
      throw new Error('Failed to create folder');
    }
  }

  async getObjectContent(bucket: string, key: string): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: bucket,
        Key: key,
      });

      const response = await this.client.send(command);
      
      if (!response.Body) {
        return '';
      }

      const streamReader = response.Body.transformToString();
      const content = await streamReader;
      
      return content;
    } catch {
      throw new Error('Failed to get object content');
    }
  }
} 