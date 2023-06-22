import AWS from "aws-sdk";

export async function getImageFromBucket(key: string) {
  const s3 = new AWS.S3({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    apiVersion: "latest",
    region: "eu-central-1",
  });

  const bucket = {
    Bucket: "tomshop",
    Key: key,
  };

  const signedUrl = await s3.getSignedUrlPromise("getObject", bucket);

  return signedUrl;
}
