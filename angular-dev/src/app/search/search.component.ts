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
  
  yelpNames: any[]; // store restaurant results
  yelpAddresses: any[]; // store restaurant addresses, same index as yelpNames

  lyftEstimates: LyftEstimate[]; // store lyft posibilites as objects
  lyftEstimatesData: string[]; // display lyft options in a parsed string

  enteredCurrentLocation: boolean = false; // is user not using current location
  enteredAddress: string;
  currentAddress: string;
  currentLat: number;
  currentLong: number;
  destinationLat: number;
  destinationLong: number;
  currentLocation: any; // address of current location, used to autofill box after location is found

  categories: string[]; // Filters for yelp searching
  priceFilter: string;
  radiusFilter: number;
  

  lyftDeepLink: string;
  venmoDeepLink: string;

  constructor(
    private yelpSearch: YelpSearchService,
    private lyftSearch: LyftSearchService,
  ) { }


  ngOnInit() {

  }

  // starter function call that takes in all filters and parameters needed
  startProcess(
    currentLocation: string, 
    currentLocationEntered: boolean
    ) {     

    // resets all displayed data with each search
    this.yelpNames = [];
    this.yelpAddresses = [];
    this.lyftEstimates = [];
    this.lyftEstimatesData = [""];
    this.currentLat = null;
    this.currentLong = null;
    this.destinationLat = null;
    this.destinationLong = null;


    this.searchYelp(this.categories.toString(), currentLocation, currentLocationEntered);
    }


  // calls backend to get Yelp list of restaurants based on filters
  searchYelp(categories: string, currentLocation: string, currentLocationEntered: boolean) {
    
    
    if (currentLocationEntered) {
      this.enteredAddress = currentLocation;
      this.enteredCurrentLocation = true;
    }
    else {
      this.enteredCurrentLocation = false;
    }

    this.yelpSearch.getData(categories, this.priceFilter, this.radiusFilter).subscribe(
      (data: any) => {
        for (var i = 0; i < 20; i++) {
          // TODO: build interface for returned data
          var business = { name: null, location: { display_address: null } };
          
          
          business = data.businesses[i];

          // send returned data to displayed data
          this.yelpNames.push(business.name);
          this.yelpAddresses.push(business.location.display_address[0] + business.location.display_address[1]);
          
        }
      }

    )

  }


  // parses price and time estimates given general name of place
  getLyftResults(destinationAddress: string) {
    
    this.lyftEstimates = [];
    this.lyftEstimatesData = [""];
    if (this.enteredCurrentLocation) {
      // need to get coords for entered location
      this.getCurrentLocation(this.enteredAddress, destinationAddress);
    }
    else{
      this.addressLyft(destinationAddress);
    }

  }


  // gets coords of a given location
  getCurrentLocation(currentAddress: string, destinationAddress: string) {
    var location = { display_address: null, lat: null, lng: null, place_id: null, routable_address: null }


    this.lyftSearch.getLatLong(currentAddress).subscribe(
      (data: any) => {
        location = data;
        this.currentLat = location.lat;
        this.currentLong = location.lng;
        this.currentAddress = location.routable_address;

        this.addressLyft(destinationAddress);


      }

    )
  }




  // Gets price and time estimates for several Lyft options
  estimateLyft(start_lat:string, start_long, end_lat, end_long) {
    
    //var sample_coords = ["42.3496428", "-71.0943789", "42.349341", "-71.1039816"];

    // takes substring to 'round' numbers
    this.lyftSearch.getPriceEstimate(
      start_lat.substring(0, 9), 
      start_long.substring(0, 9), 
      end_lat.substring(0, 9), 
      end_long.substring(0, 9)).subscribe(
      (data: any) => {
        // TODO: build interface for returned data
        var trip = {
          display_name: null,
          estimated_cost_cents_max: null,
          estimated_cost_cents_min: null,
          estimated_duration_seconds: null
        };

        var rides = { cost_estimates: [] }

        // get all possible ride estimates
        rides = data;
        for (var i = 0; i < rides.cost_estimates.length; i++) {
          this.lyftEstimates.push(rides.cost_estimates[i]);
        }
        this.lyftEstimatesData = [""];
        for (var i = 0; i < this.lyftEstimates.length; i++) {
          var parsedData = this.parseEstimate(
            this.lyftEstimates[i].estimated_duration_seconds,
            this.lyftEstimates[i].estimated_cost_cents_min,
            this.lyftEstimates[i].estimated_cost_cents_max);
          var minutes = parsedData[0];
          var seconds = parsedData[1]
          var minCost = parsedData[2];
          var maxCost = parsedData[3];
          this.lyftEstimatesData.push("name = " + this.lyftEstimates[i].display_name +
            " ---------- estimated price: $" + minCost +
            " to $" + maxCost +
            " ---------- estimated time is about " + minutes +
            " minutes and " + seconds + " seconds");
        }
      }
    )

  }

  // parses the returned data from cents and seconds into dollars and minutes
  parseEstimate(estimatedTime: number, minCost: number, maxCost: number) {
    var minutes = estimatedTime / 60;
    var minDecimalIndex = minutes.toString().indexOf(".");
    var seconds = estimatedTime - (parseInt(minutes.toString().substring(0, minDecimalIndex)) * 60);
    return [minutes, seconds, minCost / 100, maxCost / 100]

  }


  // Find the coords of the user's entered location or get the current location through browser
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
        this.destinationLat = location.lat;
        this.destinationLong = location.lng;
        


        this.estimateLyft(
          this.currentLat.toString(), 
          this.currentLong.toString(), 
          this.destinationLat.toString(), 
          this.destinationLong.toString()
        )

      }
    );


  }

  // Creates a Lyft deeplink for the selected destination and current location
  getLyftLink(rideType: string) {
    var lyftDeep = "lyft://ridetype";
    return lyftDeep + 
      "?id=" + rideType + 
      "&pickup[latitude]=" + this.currentLat +
      "&pickup[longitude]=" + this.currentLong +
      "&destination[latitude]=" + this.destinationLat +
      "&destination[longitude]=" + this.destinationLong;

  }

  // Creates a Venmo deeplink for the selected amount
  splitCheck(amount:number, groupSize:number, username:string) {
    var amountPerPerson = amount / groupSize;
    var venmoDeep = "venmo://paycharge?charge=pay&recipients=";
    return venmoDeep + username + "&amount=" + amountPerPerson + "&note=Lyft ride using Splitcheck";
  }

}


// Interface for results that come back from Lyft rides
export interface LyftEstimate {
  currency: string;
  display_name: string;
  estimated_cost_cents_max: number;
  estimated_cost_cents_min: number;
  estimated_duration_seconds: number
}



