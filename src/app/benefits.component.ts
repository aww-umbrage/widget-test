import { AsyncPipe } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';

interface Benefit {
  title: string;
  description: string;
  cover: any;
}

interface Entry<T> {
  id: number;
  attributes: T;
}

interface Response {
  data: Entry<Benefit>[];
}

@Component({
  selector: 'app-benefits',
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
      benefit.id) {
      <div class="benefits-card">
        <img
          src="http://localhost:1337{{ benefit.cover.formats.thumbnail.url }}"
        />
        <h2>{{ benefit.title }}</h2>
        <p>{{ benefit.description }}</p>
        <button>Learn more</button>
      </div>
      }}
    </div>
  `,
})
export class BenefitsComponent {
  error: any | undefined;
  benefits$: Observable<any> | undefined;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    const url = 'http://localhost:1337/api/articles';
    const opts = { params: { populate: '*' } };

    this.benefits$ = this.http.get<Response>(url, opts).pipe(
      catchError((error) => this.handleError(error)),
      map((response) =>
        response.data.map((x) => {
          console.log(JSON.stringify(x));
          return x;
        })
      )
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    this.error = error;
    return of();
  }
}
