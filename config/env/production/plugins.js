module.exports = ({ env }) => ({
  upload: {
    config: {
      sizeLimit: 25 * 1024 * 1024 * 1024,
      provider: "aws-s3",
      providerOptions: {
        s3Options: {
          accessKeyId: env("AWS_ACCESS_KEY_ID"),
          secretAccessKey: env("AWS_ACCESS_SECRET"),
          region: env("AWS_REGION"),
          endpoint: env(
            "AWS_S3_ENDPOINT_URL",
            "https://strapi-assets-transfer.s3.eu-west-1.amazonaws.com/"
          ),
          params: {
            ACL: env("AWS_ACL", "public-read"),
            signedUrlExpires: env("AWS_SIGNED_URL_EXPIRES", 15 * 60),
            Bucket: env("AWS_BUCKET"),
          },
          s3ForcePathStyle: true,
        },
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
});
