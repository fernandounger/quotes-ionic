import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class QuoteService {
  constructor(private http: HttpClient) {}

  getRandomQuote() {
    return this.http.get('https://pprathameshmore.github.io/QuoteGarden/quotes/random');
  }
}