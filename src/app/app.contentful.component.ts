import { Component, input, linkedSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BenefitsContentfulComponent } from './benefits.contentful.component';
import { ContactComponent } from './contact.component';
import { CtasContentfulComponent } from './cta.contentful.component';
import { IntroContentfulComponent } from './intro.contentful.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ContactComponent,
    CtasContentfulComponent,
    BenefitsContentfulComponent,
    IntroContentfulComponent,
  ],
  templateUrl: './app.contentful.component.html',
})
export class AppContentfulComponent {
  bank = input();
  _bank = linkedSignal(() => this.bank());
  title = 'widget-test';
}
