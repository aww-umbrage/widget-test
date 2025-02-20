# WP Hosted Components & Strapi Integration

This project integrates **Strapi CMS**, **Angular Web Components**, and **Web Components (Widgets)** into a structured system for API-driven content management and frontend consumption.

---

## 📌 **Getting Started**

### **1. Running the Angular Application**

Once the Angular code is unzipped, install dependencies:

- run at root folder

```sh
npm install
```

To start the **WP Hosted Components** server:

- run at root folder

```sh
npm start
```

📍 **WP Hosted Components will be running at** `http://localhost:4200`

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
npm run develop
```

📍 **Strapi will be available at** `http://localhost:1337`

## 📌 **2. Adding CTAs with Roles & Responsibilities**

CTAs (Call to Actions) can be added as **custom content types** in Strapi.

### **Steps to Create a CTA Collection Type**

1. **Navigate to the Strapi Admin Panel (`localhost:1337/admin`).**
2. **Go to "Content-Type Builder" → "Create new Collection Type".**
3. **Enter Name:** `cta`.
4. **Add Fields:**

   - **Title** (`Short text`)
   - **Description** (`Rich text`)
   - **Button Text** (`Short text`)
   - **URL** (`Text`)
   - **Roles (Relation to User role model)**

5. **Save & Restart the Server.**

Now, CTAs can be assigned based on user roles, ensuring different users have different CTA options.

---

## 📌 **3. Creating Content in Strapi**

1. **Navigate to "Content Manager".**
2. Select **"CTA"**, **"Pages"**, or any custom content type.
3. Click **"Create New Entry"**.
4. Fill in the required fields (title, description, etc.).
5. Click **"Publish"** or **"Save as Draft"**.

💡 **Note**: Published content will be available via the **Strapi API**.

---

## 📌 **4. Renaming Authors to Partners**

By default, Strapi includes "Authors" as part of the **Article** content type. To rename:

1. **Go to Content-Type Builder** → **Select "User"**.
2. Locate the field `author` and **rename it to "partner"`**.
3. Save changes and restart the server.
4. Update related API endpoints in the frontend (if necessary).

---

## 📌 **5. Renaming Articles to Pages**

Strapi’s default "Articles" model can be renamed to "Pages" to better reflect structured content.

### **Steps to Rename:**

1. **Go to Content-Type Builder** → Select **Articles**.
2. Rename the collection **"Articles" → "Pages"**.
3. Rename **"articleTitle" → "pageTitle"**, etc.
4. Save and restart the Strapi server.

📍 **API requests will now reference `/pages` instead of `/articles`.**

---

## 📌 **6. Using Strapi as an API (JSON-Driven CMS)**

Strapi provides a **REST API & GraphQL API** for retrieving JSON-based content.

### **Enable Public API Access**

1. **Go to Settings → Roles & Permissions.**
2. Select **"Public"**.
3. Grant **Read Access** to content types like **Pages, CTAs, Partners**.
4. Save and restart the server.

### **Fetching JSON Data**

Example request using **cURL**:

```sh
curl -X GET http://localhost:1337/api/pages
```

Example request using **JavaScript (Fetch API)**:

```javascript
fetch("http://localhost:1337/api/pages")
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
curl -X GET "http://localhost:1337/api/pages?filters[partner][id][$eq]=1"
```

This setup ensures each partner only sees their assigned content.

---

## 🏗 **Development Workflow**

### **1. Building & Publishing Web Components**

After making changes in the WP Hosted Components (`src` folder), run:

```sh
npm run build:component
```

This command updates the `widget` folder with the latest **wp-widget** component.

### **2. Component Definitions**

This project defines the following Angular components in src/main.ts as **Custom Elements**:

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

    customElements.define("wp-widget", WPWidget);
    customElements.define("wp-intro", WPIntro);
    customElements.define("wp-benefits", WPBenefits);
    customElements.define("wp-contact", WPContact);
    customElements.define("wp-cta", WPCTA);
  })
  .catch((err) => console.error(err));
```

---

## 🏛 **Project Structure**

### **1. WP Hosted Client (`localhost:4200`)**

- **Hosts the Angular Web Components**.
- **Builds and publishes updates** via `npm run build:component`.

### **2. Partner Hosted Client (`localhost:3000`)**

- **Consumes Web Components** (`wp-widget` and other individual components).
- Uses **Strapi-powered JSON APIs** to populate dynamic content.

### **3. Strapi CMS (`localhost:1337`)**

- **Manages API content** for Angular and the widget.
- Includes **roles and responsibilities** for content publishing.
- Supports **dynamic updates & API-driven UI changes**.

---

## 📌 **Key Features**

### **🔹 API Hosting & Consumption**

- **WP (localhost:4200)** → Hosts the API & Components.
- **Client (localhost:3000)** → Consumes the API & uses:
  - **Holistic Web Components**
  - **Individual Web Components**

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
