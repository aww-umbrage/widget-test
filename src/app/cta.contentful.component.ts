import { AsyncPipe } from '@angular/common';
import { Component, input, linkedSignal } from '@angular/core';
import { ContentfulClientApi, createClient, EntryCollection } from 'contentful';
import { from, Observable } from 'rxjs';
import { environment } from '../environments';
import { Entry } from './entitiy.contentful';

interface Cta {
  title: string;
  description: string;
  cover: any;
}

@Component({
  selector: 'app-ctas-contentful',
  imports: [AsyncPipe],
  standalone: true,
  template: `
    <style>
      .ctas-container {
        display: flex;
        gap: 124px;
        justify-content: center;
        margin-top: 32px;
        max-width: 1280px;
        align-items: center;
      }

      .ctas-container.flip {
        flex-direction: row-reverse;
      }

      .cta-right {
        min-width: 632px;
        max-width: 632px;
        width: 100%;
        height: 336px;
      }

      .cta-right img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 5px;
        margin-bottom: 15px;
        background-color: grey;
      }

      .cta-left h2 {
        font-size: 24px;
        font-weight: bold;
        margin: 0;
      }

      .cta-left p {
        font-size: 20px;
        color: #555;
        margin: 32px 0;
        line-height: 24px;
      }

      .cta-left button {
        width: 172px;
        padding: 10px;
        background: #e0e0e0;
        border: none;
        border-radius: 5px;
        font-size: 14px;
        cursor: pointer;
      }

      .cta-left button:hover {
        background: #d6d6d6;
      }
    </style>

    <h2>Call to Actions</h2>
    @if(ctas$ | async; as ctas) { @for(cta of ctas; track cta.id; let i =
    $index; let isOdd = $odd; let isEven = $even;) {
    <div class="ctas-container" [class.flip]="isEven">
      <div class="cta-left">
        <h2>{{ cta.fields.headline }}</h2>
        <p>{{ cta.fields.ctaText }}</p>
        <button>CTA {{ i + 1 }}</button>
      </div>
      <div class="cta-right">
        <img />
      </div>
    </div>
    }}
  `,
})
export class CtasContentfulComponent {
  bank = input();
  _bank = linkedSignal(() => this.bank());
  error: any | undefined;
  ctas$: Observable<any> | undefined;
  client: ContentfulClientApi<undefined>;
  constructor() {
    this.client = createClient({
      space: environment.contentful.spaceId,
      accessToken: environment.contentful.accessToken,
      environment: environment.contentful.environment,
    });
  }

  ngOnInit(): void {
    this.ctas$ = from(
      this.client
        .getEntries<Entry<Cta>>(
          Object.assign(
            {
              content_type: 'componentCta',
            },
            {}
          )
        )
        .then((response: EntryCollection<Entry<Cta>, undefined, string>) => {
          console.log('response.items', response.items);
          return response.items;
        })
    );
  }
}
