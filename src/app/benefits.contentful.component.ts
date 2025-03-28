import { AsyncPipe } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { ContentfulClientApi, createClient, EntryCollection } from 'contentful';
import { from, Observable, of } from 'rxjs';
import { environment } from '../environments';
import { Entry } from './entitiy.contentful';

interface Benefit {
  name: string;
  description: string;
  image: any;
}

@Component({
  selector: 'app-benefits-contentful',
  imports: [AsyncPipe],
  standalone: true,
  template: `
    <style>
      .benefits-container {
        display: flex;
        gap: 20px;
        justify-content: left;
        padding: 20px 0;
        padding-top: 0;
      }

      .benefits-card {
        width: 416px;
        max-width: 416px;
        border-radius: 10px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        padding: 10px;
        text-align: left;
        border: 1px solid #ddd;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .benefits-card img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 0;
        margin-bottom: 16px;
      }

      .benefits-card h2 {
        font-size: 30px;
        font-weight: bold;
        margin-top: 0;
        margin-bottom: 4px;
      }

      .benefits-card p {
        font-size: 18px;
        color: #555;
        margin-top: 0;
        margin-bottom: 16px;
        line-height: 28px;
      }

      .benefits-card button {
        width: 100%;
        padding: 10px;
        background: #e0e0e0;
        border: none;
        border-radius: 5px;
        font-size: 14px;
        cursor: pointer;
      }

      .benefits-card button:hover {
        background: #d6d6d6;
      }
    </style>
    <div class="benefits-container">
      @if(benefits$ | async; as benefits) { @for(benefit of benefits; track
      benefit.sys.id) {
      <div class="benefits-card">
        <img src="{{ benefit.fields.image.fields.file.url }}" />
        <h2>{{ benefit.fields.name }}</h2>
        <p>{{ benefit.fields.description }}</p>
        <button>Learn more</button>
      </div>
      }}
    </div>
  `,
})
export class BenefitsContentfulComponent implements OnChanges {
  error: any | undefined;
  benefits$: Observable<any> | undefined;
  client: ContentfulClientApi<undefined>;

  @Input() benefits!: any;

  constructor() {
    this.client = createClient({
      space: environment.contentful.spaceId,
      accessToken: environment.contentful.accessToken,
      environment: environment.contentful.environment,
    });
  }

  ngOnChanges(): void {
    if (this.benefits) {
      console.log('benefits', this.benefits);
      this.benefits$ = of(this.benefits);
    } else {
      this.benefits$ = from(
        this.client
          .getEntries<Entry<Benefit>>(
            Object.assign(
              {
                content_type: 'benefits',
              },
              {}
            )
          )
          .then(
            (response: EntryCollection<Entry<Benefit>, undefined, string>) => {
              console.log('benefits response.items', response.items);
              return response.items;
            }
          )
      );
    }
  }
}
