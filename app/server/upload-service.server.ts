import S3 from 'aws-sdk/clients/s3.js';

import type {
  UploadHandlerPart
} from '@remix-run/node';
import {
  unstable_parseMultipartFormData
} from '@remix-run/node';

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export const uploadFile = async ({ request, existingKey, path = 'mycampus/media' }: {
  request: Request,
  existingKey?: string,
  path?: string
}) => {

  if (existingKey) {

    const params = {
      Bucket: 'picsevent',
      Delete: {
        Objects: [{ Key: existingKey }],
      },
    };
    await s3.deleteObjects(params).promise();

  }

  let image = {

  }
  const uploadHandler = async ({
    name,
    data,
    filename,
    contentType,
  }: UploadHandlerPart) => {

    const ogFileName = filename;
    filename = path + '/' + filename;

    // Get the file as a buffer
    const chunks = [];
    for await (const chunk of data) chunks.push(chunk);
    const buffer = Buffer.concat(chunks);


    const response = await s3.upload({
      Bucket: 'picsevent',
      Body: buffer,

      ContentType: contentType,
      Key: filename || Math.random().toString(36).substring(7),
    }).promise();
    console.log(response);
    image = {
      url: response.Location,
      key: response.Key,
      name: ogFileName,
    }

    return response.Location;
  };

  await unstable_parseMultipartFormData(request, uploadHandler);
  return image;
};


