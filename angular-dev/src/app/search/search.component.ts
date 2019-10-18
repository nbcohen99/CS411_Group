import { Component, OnInit } from '@angular/core';
import { YelpSearchService } from '../yelp-search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  data: string;

  constructor(
    private yelpSearch: YelpSearchService,
    ) { }

//   Yelp API Stuff:
// Client ID
// AIDbWpXQyrDAdNzE3cRxhg

// API Key
// CWUaTFyAkkwf9rR3ktjTru2TFcNzY4DDpza6eVvCSDHZ89YN1dRSckT0MT6vKU14WuA4nKqDAkc6E4tKFB7qUfqYOHo4W4BHSfv4n9c6u58GMn3TZbAGcVauc-upXXYx

  ngOnInit() {
  }

  searchYelp(query: string) {
    this.data = '';
    this.yelpSearch.getData(query).subscribe(
      data => {
        for (var i = 0; i < 20; i++) {
          var business = data.businesses[i]
          console.log(business.alias);
          this.data += '\n' + business.alias;
        }
      }
      
    )

  }

}
