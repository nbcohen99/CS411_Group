import { Component, OnInit } from '@angular/core';
import { YelpSearchService } from '../yelp-search.service';

interface yelpResults {
  businesses: any;
}

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


  ngOnInit() {
  }

  searchYelp(query: string) {
    // resets the data with each search
    this.data = '';
    this.yelpSearch.getData(query).subscribe(
      (data: yelpResults) => {
        for (var i = 0; i < 20; i++) {
          // TODO: build interface for returned data
          var business = data.businesses[i]
          this.data += '\n' + business.alias + '------------' + business.location.display_address;
        }
      }
      
    )

  }

}
