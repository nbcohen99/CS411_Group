import { Component, OnInit } from '@angular/core';
import { YelpSearchService } from '../services/yelp-search.service';
import { LyftSearchService } from '../services/lyft-search.service';
import { last } from 'rxjs/operators';
import { Observable, range } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  yelpNames: any[];
  yelpAddresses: any[];

  lyftEstimates: LyftEstimate[];
  lyftEstimatesData: string[];

  enteredCurrentLocation: boolean = false;
  currentAddress: string;
  currentLat: number;
  currentLong: number;
  currentLocation: any;

  constructor(
    private yelpSearch: YelpSearchService,
    private lyftSearch: LyftSearchService,
  ) { }


  ngOnInit() {

  }

  searchYelp(query: string, currentLocation: string, currentLocationEntered: boolean) {
    
    if (currentLocationEntered) {
      this.currentAddress = currentLocation;
      this.enteredCurrentLocation = true;
    }
    else {
      this.enteredCurrentLocation = false;
    }
    // resets the data with each search
    this.yelpNames = [];
    this.yelpAddresses = [];
    this.lyftEstimates = [];
    this.lyftEstimatesData = [""];
    this.yelpSearch.getData(query).subscribe(
      (data: any) => {
        for (var i = 0; i < 20; i++) {
          // TODO: build interface for returned data
          var business = { name: null, location: { display_address: null } };
          // if (!(data.businesses === "undefined")) {
          business = data.businesses[i];
          this.yelpNames.push(business.name);
          this.yelpAddresses.push(business.location.display_address[0] + business.location.display_address[1]);
          // }
        }
      }

    )

  }


  getLyftResults(destinationAddress: string) {
    // parses price and time estimates given general name of place
    this.lyftEstimates = [];
    this.lyftEstimatesData = [""];
    if (this.enteredCurrentLocation) {
      this.getCurrentLocation(this.currentAddress, destinationAddress);
    }
    else{
      this.addressLyft(destinationAddress);
    }
    //var allRides = this.estimateLyft("42.3496428","-71.0943789", this.lyftResultsLat, this.lyftResultsLong)

  }


  getCurrentLocation(currentAddress: string, destinationAddress: string) {
    var location = { display_address: null, lat: null, lng: null, place_id: null, routable_address: null }


    this.lyftSearch.getLatLong(currentAddress).subscribe(
      (data: any) => {
        location = data;
        this.currentLat = location.lat;
        this.currentLong = location.lng;

        this.addressLyft(destinationAddress);


      }

    )
  }





  estimateLyft(start_lat, start_long, end_lat, end_long) {
    // Gets price and time estimates for several Lyft options

    //var sample_coords = ["42.3496428", "-71.0943789", "42.349341", "-71.1039816"];

    this.lyftSearch.getPriceEstimate(start_lat, start_long, end_lat, end_long).subscribe(
      (data: any) => {
        // TODO: build interface for returned data
        var trip = {
          display_name: null,
          estimated_cost_cents_max: null,
          estimated_cost_cents_min: null,
          estimated_duration_seconds: null
        };

        var rides = { cost_estimates: [] }

        rides = data;
        for (var i = 0; i < rides.cost_estimates.length; i++) {
          this.lyftEstimates.push(rides.cost_estimates[i]);
        }
        this.lyftEstimatesData = [""];
        for (var i = 0; i < this.lyftEstimates.length; i++) {
          var minutes = this.lyftEstimates[i].estimated_duration_seconds / 60;
          var minDecimalIndex = minutes.toString().indexOf(".");
          var seconds = this.lyftEstimates[i].estimated_duration_seconds -
            (parseInt(minutes.toString().substring(0, minDecimalIndex)) * 60)
          var secDecimalIndex = seconds.toString().indexOf(".");
          this.lyftEstimatesData.push("name = " + this.lyftEstimates[i].display_name +
            " ---------- estimated price: $" + this.lyftEstimates[i].estimated_cost_cents_min / 100 +
            " to $" + this.lyftEstimates[i].estimated_cost_cents_max / 100 +
            " ---------- estimated time is about " + minutes.toString().substring(0, minDecimalIndex) +
            " minutes and " + seconds + " seconds");
        }
      }
    )

  }



  addressLyft(address: string) {

    if (!this.enteredCurrentLocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.currentLat = position.coords.latitude;
          this.currentLong = position.coords.longitude;
        }
      )
    }





    // Uses Lyft API to get full address, Long, Lat of given address
    var location = { display_address: null, lat: null, lng: null, place_id: null, routable_address: null }
    this.lyftSearch.getLatLong(address).subscribe(
      (data: any) => {


        location = data;
        var resultsLat = location.lat;
        var resultsLong = location.lng;


        this.estimateLyft(this.currentLat, this.currentLong, resultsLat, resultsLong)

      }
    );


  }

}


export interface LyftEstimate {
  currency: string;
  display_name: string;
  estimated_cost_cents_max: number;
  estimated_cost_cents_min: number;
  estimated_duration_seconds: number
}



