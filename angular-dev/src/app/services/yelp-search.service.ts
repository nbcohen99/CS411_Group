import { Injectable } from './../../../node_modules/@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from './../../../node_modules/@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class YelpSearchService {

  constructor(private http: HttpClient) { }

//   Yelp API Stuff:
// Client ID
// AIDbWpXQyrDAdNzE3cRxhg

// API Key
// CWUaTFyAkkwf9rR3ktjTru2TFcNzY4DDpza6eVvCSDHZ89YN1dRSckT0MT6vKU14WuA4nKqDAkc6E4tKFB7qUfqYOHo4W4BHSfv4n9c6u58GMn3TZbAGcVauc-upXXYx




  // gets the data from yelp api given a search term
  getData(term: string, price: string, radius: number) {
    const token = 'CWUaTFyAkkwf9rR3ktjTru2TFcNzY4DDpza6eVvCSDHZ89YN1dRSckT0MT6vKU14WuA4nKqDAkc6E4tKFB7qUfqYOHo4W4BHSfv4n9c6u58GMn3TZbAGcVauc-upXXYx';

    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    return this.http.get("http://54.164.165.203/yelp.php?", {  //"https://api.yelp.com/v3/businesses/search", {
      headers: reqHeader,
      params: {
        "location": "boston",
        "term": term,
        "price": price,
        "radius": radius.toString(),
      }
    })
  }
}
