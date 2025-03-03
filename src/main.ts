// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { BenefitsComponent } from './app/benefits.component';
import { ContactComponent } from './app/contact.component';
import { CtasComponent } from './app/cta.component';
import { IntroComponent } from './app/intro.component';

createApplication(appConfig)
  .then((app) => {
    const WPWidget = createCustomElement(AppComponent, {
      injector: app.injector,
    });
    const WPIntro = createCustomElement(IntroComponent, {
      injector: app.injector,
    });
    const WPBenefits = createCustomElement(BenefitsComponent, {
      injector: app.injector,
    });
    const WPContact = createCustomElement(ContactComponent, {
      injector: app.injector,
    });
    const WPCTA = createCustomElement(CtasComponent, {
      injector: app.injector,
    });
    customElements.define('cm-widget', WPWidget);
    customElements.define('cm-intro', WPIntro);
    customElements.define('cm-benefits', WPBenefits);
    customElements.define('cm-contact', WPContact);
    customElements.define('cm-cta', WPCTA);
  })
  .catch((err) => console.error(err));
