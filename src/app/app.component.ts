import { Component, input, linkedSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BenefitsComponent } from './benefits.component';
import { ContactComponent } from './contact.component';
import { CtasComponent } from './cta.component';
import { IntroComponent } from './intro.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    BenefitsComponent,
    ContactComponent,
    IntroComponent,
    CtasComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  bank = input();
  _bank = linkedSignal(() => this.bank());
  title = 'widget-test';
}
