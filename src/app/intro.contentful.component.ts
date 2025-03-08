import { AsyncPipe } from '@angular/common';
import { Component, input, linkedSignal } from '@angular/core';
import { ContentfulClientApi, createClient } from 'contentful';
import { catchError, from, map, Observable, of, switchMap } from 'rxjs';
import { environment } from '../environments';
import { Entry } from './entitiy.contentful';

interface Merchant {
  name: string;
  avatar: any;
}

@Component({
  selector: 'app-intro-contentful',
  imports: [AsyncPipe],
  standalone: true,
  template: `
    <style>
      /* Container */
      .intro-container {
        display: flex;
        align-items: center;
        max-width: 1200px;
        justify-content: space-between;
        margin: 0 auto;
        padding: 40px 0;
        gap: 124px;
      }

      /* Text Section */
      .intro-text {
        max-width: 50%;
      }

      .intro-heading {
        font-size: 64px;
        font-weight: bold;
        margin-bottom: 32px;
      }

      /* Buttons */
      .intro-buttons {
        display: flex;
        gap: 32px;
        margin-top: 10px;
      }

      .intro-button {
        padding: 10px 15px;
        font-size: 20px;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
        min-width: 172px;
      }

      .intro-button.primary {
        background: #d3d3d3;
        border: none;
      }

      .intro-button.secondary {
        background: white;
        border: 1px solid black;
      }

      /* Image Section */
      .intro-image img {
        width: 600px;
        height: 600px;
        background: #d3d3d3;
        border-radius: 5px;
        object-fit: cover;
      }
    </style>
    <div class="intro-container">
      @if(merchant$ | async; as merchant) {
      <div class="intro-text">
        <h1 class="intro-heading">Welcome to {{ merchant.headline }}</h1>
        <div class="intro-buttons">
          <button class="intro-button primary">Apply</button>
          <button class="intro-button secondary">Watch demos</button>
        </div>
      </div>
      <div class="intro-image">
        <img src="{{ merchant.imageUrl }}" alt="Placeholder Image" />
      </div>
      }
    </div>
  `,
})
export class IntroContentfulComponent {
  bank = input();
  _bank = linkedSignal(() => this.bank());
  error: any | undefined;
  merchant$: Observable<any> | undefined;
  client: ContentfulClientApi<undefined>;

  constructor() {
    this.client = createClient({
      space: environment.contentful.spaceId,
      accessToken: environment.contentful.accessToken,
      environment: environment.contentful.environment,
    });
  }

  ngOnInit(): void {
    console.log('bank', this._bank());
    this.merchant$ = from(
      this.client.getEntry<Entry<Merchant>>(this.bank() as string, {})
    ).pipe(
      switchMap((entry) => {
        const imageId = (entry.fields as any).image?.sys?.id;

        if (!imageId) {
          throw new Error('No image ID found');
        }
        return from(this.client.getAsset(imageId)).pipe(
          map((asset) => {
            console.log('asset', {
              ...entry.fields,
              imageUrl: `https:${asset.fields.file?.url}`,
            });
            return {
              ...entry.fields,
              imageUrl: `https:${asset.fields.file?.url}`,
            };
          })
        );
      }),
      catchError((err) => {
        console.error('Error fetching image:', err);
        return of(null);
      })
    );
  }
}
