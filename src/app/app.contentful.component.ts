import { Component, input, linkedSignal, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContentfulClientApi, createClient } from 'contentful';
import { catchError, from, map, Observable, of } from 'rxjs';
import { environment } from '../environments';
import { BenefitsContentfulComponent } from './benefits.contentful.component';
import { ContactComponent } from './contact.component';
import { CtasContentfulComponent } from './cta.contentful.component';
import { Entry } from './entitiy.contentful';
import { IntroContentfulComponent } from './intro.contentful.component';

interface Partner {
  internalName: string;
  pageName: string;
  partnerId: string;
  pageContent: JSON;
  slug: string;
  topSection: JSON[];
  body2: JSON[];
  extraSection: JSON[];
  avatar: any;
}

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
  client: ContentfulClientApi<undefined>;

  partner$: Observable<any> | undefined;

  partner = signal<Partner | null>(null);

  constructor() {
    this.client = createClient({
      space: environment.contentful.spaceId,
      accessToken: environment.contentful.accessToken,
      environment: environment.contentful.environment,
    });
  }

  ngOnInit(): void {
    console.log('partner bank', this._bank());

    if (!this.bank()) {
      console.error('Bank ID is missing! Entry fetch will fail.');
      return;
    }

    this.partner$ = from(
      this.client.getEntry<Entry<Partner>>(this.bank() as string, {})
    ).pipe(
      map((entry) => {
        this.partner.set(entry.fields);
        console.log('Landing page received:', this.partner());
        return entry.fields;
      }),
      catchError((err) => {
        console.error('Error fetching image:', err);
        return of(null);
      })
    );

    this.partner$.subscribe();
  }
}
