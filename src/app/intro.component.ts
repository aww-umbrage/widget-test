import { AsyncPipe } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, input, linkedSignal } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

interface Merchant {
  name: string;
  avatar: any;
}

interface Entry<T> {
  id: number;
  attributes: T;
}

interface Response {
  data: Entry<Merchant>;
}

@Component({
  selector: 'app-intro',
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
        <h1 class="intro-heading">Welcome to {{ merchant.name }}</h1>
        <div class="intro-buttons">
          <button class="intro-button primary">Apply</button>
          <button class="intro-button secondary">Watch demos</button>
        </div>
      </div>
      <div class="intro-image">
        <img
          src="http://localhost:1337{{ merchant.avatar.formats.small.url }}"
          alt="Placeholder Image"
        />
      </div>
      }
    </div>
  `,
})
export class IntroComponent {
  bank = input();
  _bank = linkedSignal(() => this.bank());
  error: any | undefined;
  merchant$: Observable<any> | undefined;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    console.log('bank', this._bank());
    const url = `http://localhost:1337/api/authors/${this._bank()}`;
    const opts = { params: { populate: '*' } };

    this.merchant$ = this.http.get<Response>(url, opts).pipe(
      catchError((error) => this.handleError(error)),
      map((response) => {
        console.log(JSON.stringify(response.data));
        return response.data;
      })
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    this.error = error;
    return of();
  }
}
