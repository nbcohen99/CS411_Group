import { Component, OnInit } from '@angular/core';
import { YelpSearchService } from '../services/yelp-search.service';
import { LyftSearchService } from '../services/lyft-search.service';

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
  estimatesReady: boolean; // is the estimate data ready to be displayed

  enteredCurrentLocation: boolean = false; // is user not using current location
  enteredAddress: string;
  currentAddress: string;
  currentLat: number;
  currentLong: number;
  destinationLat: number;
  destinationLong: number;
  currentLocation: any; // address of current location, used to autofill box after location is found

  categories: string[]; // Filters for yelp searching
  priceFilter: string[];
  radiusFilter: number;

  activeDistanceButton: boolean[]; // array to determine which distance button is active
  activePriceButton: boolean[] // array to determine which price button is active


  lyftDeepLink: string;
  venmoDeepLink: string;

  constructor(
    private yelpSearch: YelpSearchService,
    private lyftSearch: LyftSearchService,
  ) { }


  ngOnInit() {

    // initialize all variables
    this.categories = [""];
    this.estimatesReady = false;
    this.activeDistanceButton = [false, false, false, false, false];
    this.activePriceButton = [false, false, false, false];


  }

  // starter function call that takes in all filters and parameters needed
  startProcess(
    currentLocation: string,
    currentLocationEntered: boolean
  ) {

    // resets all displayed data with each search



    this.searchYelp(this.categories.toString(), currentLocation, currentLocationEntered);
  }


  // calls backend to get Yelp list of restaurants based on filters
  searchYelp(categories: string, currentLocation: string, currentLocationEntered: boolean) {
    this.yelpNames = [];
    this.yelpAddresses = [];
    this.lyftEstimates = [];
    this.lyftEstimatesData = [""];
    this.currentLat = null;
    this.currentLong = null;
    this.destinationLat = null;
    this.destinationLong = null;

    if (currentLocationEntered) {
      this.enteredAddress = currentLocation;
      this.enteredCurrentLocation = true;
    }
    else {
      this.enteredCurrentLocation = false;
    }


    // if user did not select any prices
    if (this.priceFilter == null) {
      this.priceFilter = ["1", "2", "3", "4"];
    }
    // default radius to 2 miles
    if (this.radiusFilter == null) {
      this.radiusFilter = 3218;
    }
    this.yelpSearch.getData(categories, this.priceFilter.toString(), this.radiusFilter).subscribe(
      
      (data: any) => {
        for (var i = 0; i < 20; i++) {
          // TODO: build interface for returned data
          var business = { name: null, location: { display_address: null } };


          business = data.businesses[i];

          // send returned data to displayed data
          this.yelpNames.push(business.name);
          this.yelpAddresses.push(business.location.display_address[0] + business.location.display_address[1]);
          // }
        }

        console.log("pushed to list");
      },

    )

  }


  getLyftResults(destinationAddress: string) {

    // parses price and time estimates given general name of place
    this.lyftEstimates = [];
    this.lyftEstimatesData = [""];
    if (this.enteredCurrentLocation) {
      // need to get coords for entered location
      this.getCurrentLocation(this.enteredAddress, destinationAddress);
    }
    else {
      this.addressLyft(destinationAddress);
    }

  }


  getCurrentLocation(currentAddress: string, destinationAddress: string) {
    console.log(currentAddress);
    console.log(destinationAddress);
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
  estimateLyft(start_lat: string, start_long, end_lat, end_long) {

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
          this.estimatesReady = true;
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
  splitCheck(amount: number, groupSize: number, username: string) {
    var amountPerPerson = amount / groupSize;
    var venmoDeep = "venmo://paycharge?charge=pay&recipients=";
    return venmoDeep + username + "&amount=" + amountPerPerson + "&note=Lyft ride using Splitcheck";
  }

  // updates the distance filter and the button is active
  updateActiveDistance(index: number) {
    if (index == 0) {
      this.radiusFilter = 32186;
    }
    else if (index == 1) {
      this.radiusFilter = 8046;
    }
    else if (index == 2) {
      this.radiusFilter = 3218;
    }
    else if (index == 3) {
      this.radiusFilter = 1609;
    }
    else if (index == 4) {
      this.radiusFilter = 300;
    }


    if (this.activeDistanceButton[index]) {
      this.activeDistanceButton[index] = false;
    }
    else {
      for (var i = 0; i < 5; i++) {
        if (i === index) {
          this.activeDistanceButton[i] = true;
        }
      }
    }
  }


  // updates the price filter and the button that is active
  updateActivePrice(index: number) {

    if (this.activePriceButton[index]) {
      var index2 = this.priceFilter.indexOf(index.toString(), 0);
      this.priceFilter = this.priceFilter.slice(0, index2).concat(this.priceFilter.slice(index2 + 1));

      // replace element in active buttons
      this.activePriceButton.splice(index, 1, false);
    }
    else {
      this.priceFilter.push(index.toString());
      for (var i = 0; i < 4; i++) {
        if (i === index) {
          this.activePriceButton[i] = true;
        }
      }
    }

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



