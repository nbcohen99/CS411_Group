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


  ngOnInit() {
  }

  searchYelp(query: string) {
    // resets the data with each search
    this.data = '';
    this.yelpSearch.getData(query).subscribe(
      (data : any) => {
        for (var i = 0; i < 20; i++) {
          console.log(data);
          console.log(data.businesses);
          // TODO: build interface for returned data
          var business = {alias: null, location: {display_address: null}};
          // if (!(data.businesses === "undefined")) {
            business = data.businesses[i];
            this.data += '\n' + business.alias + '------------' + business.location.display_address;
          // }
        }
      }

    )

  }

}
