export default ({ env }: { env: (key: string) => string }) => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        baseUrl: env('CDN_URL'),
        rootPath: '',
        s3Options: {
          credentials: {
            accessKeyId: env('AWS_KEY_ID'),
            secretAccessKey: env('AWS_SECRET'),
          },
          region: env('AWS_REGION'),
          params: {
            Bucket: env('AWS_BUCKET'),
          },
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
