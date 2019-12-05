import { Injectable } from './../../../node_modules/@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from './../../../node_modules/@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LyftSearchService { 
  lyftUrl:string = "https://www.lyft.com/api";


  constructor (
    private http: HttpClient,
    ) {}




  getPriceEstimate(startLat:string, startLong:string, endLat:string, endLong:string) {

    let reqParams = new HttpParams()
      .set("start_lat", startLat)
      .set("start_lng", startLong)
      .set("end_lat", endLat)
      .set("end_lng", endLong);

    

    return this.http.get("http://54.164.165.203/lyftEstimates.php?", {
      params: reqParams
    });

  }


  getLatLong(address:string){

    let reqParams = new HttpParams()
      .set("address", address.replace(" ", "+"));


    return this.http.get("http://54.164.165.203/lyftAddress.php?", {
      params: reqParams
    })
  }




}