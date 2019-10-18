import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class YelpSearchService {

  constructor(private http: HttpClient) { }


  getData(term: string) {
    const token = 'CWUaTFyAkkwf9rR3ktjTru2TFcNzY4DDpza6eVvCSDHZ89YN1dRSckT0MT6vKU14WuA4nKqDAkc6E4tKFB7qUfqYOHo4W4BHSfv4n9c6u58GMn3TZbAGcVauc-upXXYx';

    let reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer CWUaTFyAkkwf9rR3ktjTru2TFcNzY4DDpza6eVvCSDHZ89YN1dRSckT0MT6vKU14WuA4nKqDAkc6E4tKFB7qUfqYOHo4W4BHSfv4n9c6u58GMn3TZbAGcVauc-upXXYx'
    });
    return this.http.get("https://api.yelp.com/v3/businesses/search", {
      headers: reqHeader,
      params: {
        "location": "boston",
        "term": term
      }
    })
  }
}
