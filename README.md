# Custom Hosted Components & Strapi Integration

This project integrates **Strapi CMS**, **Angular Web Components**, and **Web Components (Widgets)** into a structured system for API-driven content management and frontend consumption.

---

## 📌 **Getting Started**

### **1. Running the Angular Application**

Once the Angular code is unzipped, install dependencies:

#### Run at root folder

```sh
nvm install --lts
nvm use --lts
npm install
```

To start the **Custom Hosted Components** server:

#### Run at root folder

```sh
npm start
```

📍 **Custom Hosted Components will be running at** `http://localhost:4200`

---

### **2. Running the Web Components (Widget)**

Navigate to the `widget` subdirectory and serve the index.html:

```sh
cd widget
serve
```

📍 **The Widget will be available at** `http://localhost:3000`

> **Note:** Ensure you have `serve` installed globally:

```sh
npm install -g serve
```

# Strapi Guide: Setup, Content Management, and Customization

This guide provides a step-by-step overview of **setting up Strapi**, managing content, customizing entities, and utilizing Strapi as a **JSON API**.

---

### **1. Setting up Strapi CMS**

To initialize and populate **Strapi**, run:

```sh
npx create-strapi@latest strapi-test
```

- **Select "Skip"** on the cloud trial.
- **Prepopulate** with sample data when prompted.

Then, start the Strapi server at the root folder:

```sh
cd to strapi-test
npm install
npm run develop
```

📍 **Strapi will be available at** `http://localhost:1337`

## 📌 **2. Adding CTAs**

CTAs (Call to Actions) can be added as **custom content types** in Strapi.

### **Steps to Create a CTA Collection Type**

1. **Navigate to the Strapi Admin Panel (`localhost:1337/admin`).**
2. **Go to "Content-Type Builder" → "Create new Collection Type".**
3. **Enter Name:** `cta`.
4. **Add Fields:**

   - **title** (`Short text`)
   - **description** (`Rich text`)
   - **image** (`Media`)
   - **url** (`Text`)
   - **partner (One to One Relation to author / partner collection type)**

## 📌 **3. Adding Global Styles**

Global Styles can be added as **custom content types** in Strapi.

The intention behind this is to add CDN (Content Delivery Network) functionality to serve css specific to partners.

This collection type will be consumed on the frontend along with the simple javascript to add global styles and partner specific styles to each component.

### **Steps to Create a Global Style Collection Type**

1. **Navigate to the Strapi Admin Panel (`localhost:1337/admin`).**
2. **Go to "Content-Type Builder" → "Create new Collection Type".**
3. **Enter Name:** `Global Styles`.
4. **Add Fields:**

   - **title** (`Short text`)
   - **file** (`Single Media` --> choose Advanced Settings and select only File type)
   - **partner (One to One Relation to author / partner collection type)**

5. **Save & Restart the Server.**

   - Click save at top right

> If you have not already setup AWS S3 / Cloudfront (or another file storage / CDN), wait to add style content until after that. [AWS S3 Section](#aws-s3-and-cloudfront-setup)

## 📌 4. Renaming Authors to Partners

By default, Strapi includes "Authors" as part of the **Article** content type. To rename:

1. **Go to Content-Type Builder** → **Select "Author"**.
2. Locate the edit button and click
3. Change `Author` and **rename it to "Partner"`**.
4. Save changes and restart the server (server will automatically restart on save).

## 📌 **5. Renaming Articles to Pages**

Strapi’s default "Articles" model can be renamed to "Pages" to better reflect structured content.

### **Steps to Rename:**

1. **Go to Content-Type Builder** → Select **Articles**.
2. Rename the collection **"Articles" → "Pages"** by clicking edit in the top left.
3. Save

## 📌 **6. Creating Content in Strapi**

1. **Navigate to "Content Manager".**
2. Select **"CTA"**, **"Pages"**, or any custom content type (i.e. **"Global Styles"**).
3. Click **"Create New Entry"**.
4. Fill in the required fields (title, description, etc.).
5. Click **"Publish"** or **"Save as Draft"**.

### 💡 **Note** about Global Styles

Global Styles can be linked as a style ref in the widget/index.html file.

When creating Global Styles,

1. Create a base style i.e. global-styles.css
2. Add all of the necessary component pieces i.e.

```css
.benefits-card {
  background-color: white;
}
/* ... */
```

3. Partner specific css can also be linked in the widget/index.html file but should come after global-styles.css

💡 **Note**: Currently local styles are in the folder `styles/`

## 📌 **7. Using Strapi as an API (JSON-Driven CMS)**

Strapi provides a **REST API & GraphQL API** for retrieving JSON-based content.

### **Enable Public API Access**

1. **Go to Settings → Roles & Permissions.**
2. Select **"Public"**.
3. Grant **Read Access** to content types like **Pages, CTAs, Partners, Global Styles**.
4. Save and restart the server.

### **Fetching JSON Data**

Example request using **cURL**:

```sh
curl -X GET http://localhost:1337/api/articles
```

Example request using **JavaScript (Fetch API)**:

```javascript
fetch("http://localhost:1337/api/articles")
  .then((response) => response.json())
  .then((data) => console.log(data));
```

---

## 📌 **7. Custom Content for Each Partner**

To ensure different **partners see different content**, we can **filter API responses** by partner ID.

### **Approach:**

1. **Add a "partner" field** in content types (e.g., Pages, CTAs).
2. **Establish relationships** so each **Page belongs to a specific Partner**.
3. **Modify API queries** to return content **only for a given Partner**.

Example API request for **Pages assigned to a specific Partner**:

```sh
curl -X GET "http://localhost:1337/api/articles?filters[partner][id][$eq]=1"
```

This setup ensures each partner only sees their assigned content.

# AWS S3 and Cloudfront Setup

**To set up Strapi with AWS S3 for media uploads + style (css files etc), follow these steps**

### Follow all steps outlined in the following

#### Start at Set Up AWS S3 and CloudFront and end at Integrating S3 and CloudFront with Strapi

https://strapi.io/blog/request-strapi-s-rest-api-behind-a-content-delivery-network-cdn

### **(If AWS S3 and Cloudfront are already setup) Install the AWS S3 Upload Provider Plugin**

In your Strapi project directory, install the plugin:

`npm install @strapi/provider-upload-aws-s3`

### Configure the Plugin

Create or edit the config/plugins.js file in your Strapi project:

```typescript
export default ({ env }: { env: (key: string) => string }) => ({
  upload: {
    config: {
      provider: "aws-s3",
      providerOptions: {
        baseUrl: env("CDN_URL"),
        rootPath: "",
        s3Options: {
          credentials: {
            accessKeyId: env("AWS_KEY_ID"),
            secretAccessKey: env("AWS_SECRET"),
          },
          region: env("AWS_REGION"),
          params: {
            Bucket: env("AWS_BUCKET"),
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
```

#### Ensure your .env file contains the necessary AWS credentials:

```
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_ACCESS_SECRET=your_secret_access_key
AWS_REGION=your_aws_region
AWS_BUCKET=your_bucket_name
```

### (Optional) Adjust Security Middleware

To properly display media thumbnails in the Strapi admin panel, modify the config/middlewares.js file:

```javascript
module.exports = ({ env }) => [
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "connect-src": ["'self'", "https:"],
          "img-src": ["'self'", "data:", "blob:", "dl.airtable.com", `https://${env("AWS_BUCKET")}.s3.${env("AWS_REGION")}.amazonaws.com/`, env("CDN_URL")],
          "media-src": ["'self'", "data:", "blob:", "dl.airtable.com", `https://${env("AWS_BUCKET")}.s3.${env("AWS_REGION")}.amazonaws.com/`, env("CDN_URL")],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
```

Replace `yourBucketName.s3.yourRegion.amazonaws.com` with your actual S3 bucket URL.

### Restart Strapi

After configuration, restart your Strapi server:

`npm run develop`

Your Strapi application should now use AWS S3 for media file storage.

For more detailed information, refer to the Strapi documentation.

---

## 🏗 **Development Workflow**

### **1. Building & Publishing Web Components**

After making changes in the Custom Hosted Components (`src` folder), run:

```sh
npm run build:component
```

This command updates the `widget` folder with the latest **cm-widget** component.

### **2. Component Definitions**

This project defines the following Angular components in `src/main.ts` as **Custom Elements**:

```typescript
import { createCustomElement } from "@angular/elements";
import { createApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { appConfig } from "./app/app.config";
import { BenefitsComponent } from "./app/benefits.component";
import { ContactComponent } from "./app/contact.component";
import { CtasComponent } from "./app/cta.component";
import { IntroComponent } from "./app/intro.component";

createApplication(appConfig)
  .then((app) => {
    const WPWidget = createCustomElement(AppComponent, { injector: app.injector });
    const WPIntro = createCustomElement(IntroComponent, { injector: app.injector });
    const WPBenefits = createCustomElement(BenefitsComponent, { injector: app.injector });
    const WPContact = createCustomElement(ContactComponent, { injector: app.injector });
    const WPCTA = createCustomElement(CtasComponent, { injector: app.injector });

    customElements.define("cm-widget", WPWidget);
    customElements.define("cm-intro", WPIntro);
    customElements.define("cm-benefits", WPBenefits);
    customElements.define("cm-contact", WPContact);
    customElements.define("cm-cta", WPCTA);
  })
  .catch((err) => console.error(err));
```

---

## 🏛 **Project Structure**

### **1. Custom Hosted Client (`localhost:4200`)**

- **Hosts the Angular Web Components**.
- **Builds and publishes updates** via `npm run build:component`.

### **2. Partner Hosted Client (`localhost:3000`)**

- **Consumes Web Components** (`cm-widget` and other individual components).
- Uses **Strapi-powered JSON APIs** to populate dynamic content.

### **3. Strapi CMS (`localhost:1337`)**

- **Manages API content** for Angular and the widget.
- Includes **roles and responsibilities** for content publishing.
- Supports **dynamic updates & API-driven UI changes**.

---

## 📌 **Key Features**

### **🔹 API Hosting & Consumption**

- **Custom (localhost:4200)** → Hosts the API & Components.
- **Client (localhost:3000)** → Consumes the API & uses:
  - **Holistic Web Components** (i.e. cm-widget)
  - **Individual Web Components** (i.e. cm-benefits)

### **🔹 Strapi CMS Integration**

- Manage content dynamically with **publish/unpublish** capabilities.
- Use APIs to control **component visibility** per client.

### **🔹 Customization & Flexibility**

- **Bank-specific variations** (e.g., different themes per institution).
- **Static vs. dynamic components** for controlled rendering.
- **Alternating layouts** with Odd/Even positioning.
- **Contact & CTAs** dynamically configured via CMS.

---

## 🎯 **How to Test**

1. **Start Strapi** (`npm run develop`) and verify data is available at `localhost:1337/admin`.
2. **Run Angular (`npm start`)** and confirm the API and UI are syncing.
3. **Serve Web Components (`serve`)** and validate that the widget updates dynamically.
4. **Modify Strapi Content** and check UI updates **without redeploying**.
