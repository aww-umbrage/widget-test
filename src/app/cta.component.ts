import { AsyncPipe } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, input, linkedSignal } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

interface Cta {
  title: string;
  description: string;
  cover: any;
}

interface Entry<T> {
  id: number;
  attributes: T;
}

interface Response {
  data: Entry<Cta>[];
}

@Component({
  selector: 'app-ctas',
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
    $index; let isOdd = $odd; let isEven = $even) {
    <div class="ctas-container" [class.flip]="isEven">
      <div class="cta-left">
        <h2>{{ cta.title }}</h2>
        <p>{{ cta.description }}</p>
        <button>CTA {{ i + 1 }}</button>
      </div>
      <div class="cta-right">
        <img />
      </div>
    </div>
    }}
  `,
})
export class CtasComponent {
  bank = input();
  _bank = linkedSignal(() => this.bank());
  error: any | undefined;
  ctas$: Observable<any> | undefined;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    const url = `http://localhost:1337/api/authors/${this._bank()}`;
    const opts = { params: { populate: '*' } };

    this.ctas$ = this.http.get<Response>(url, opts).pipe(
      catchError((error) => this.handleError(error)),
      map((response) => {
        return (response.data as any).ctas;
      })
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    this.error = error;
    return of();
  }
}
