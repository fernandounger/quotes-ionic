import { Component, OnInit } from '@angular/core';
import { QuoteService } from '../../service/quote.service';

@Component({
  selector: 'app-quote',
  template: `
    <div *ngIf="quote">
      {{ quote.quote }} - {{ quote.author }}
    </div>
  `
})
export class QuoteComponent implements OnInit {

  quote: any;  
  quoteText?: string;
  quoteAuthor?: string;

  constructor(private quoteService: QuoteService) {}

  ngOnInit() {
    this.quoteService.getRandomQuote().subscribe(data => {
      this.quote = data.quote;
      this.quoteText = data.quote.quoteText;
      this.quoteAuthor = data.quote.quoteAuthor;
    });
  }
}
