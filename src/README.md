Make an environments.ts file with the following:

```typescript
export const environment = {
  contentful: {
    spaceId: "space-id",
    accessToken: "access-token",
    environment: "master",
  },
  strapi: {
    apiUrl: "http://localhost:1337",
  },
};
```
