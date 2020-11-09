import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '@environments/environment';
import  IUser  from '@app/interfaces/User';
import IAdvertiser from '@app/interfaces/Advertiser';
import IOffers from "../interfaces/Offers";
import IAffiliates from "../interfaces/Affiliates";

@Injectable({
    providedIn: 'root',
  })
export class ApiService {
  public httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
      })
  };

  constructor (private http: HttpClient) {}
    //all
    
    // login page
    public loginUser(username: string, password: string) {
      return this.http.post(`${environment.apiUrl}/users/authenticate`, {username, password});
    };
    // user category
    public getAllUsers() {
      return this.http.get(`${environment.apiUrl}/users/all`, {headers: this.httpOptions.headers});
    }

    public editUser(user: IUser) {
      return this.http.put(`${environment.apiUrl}/users/edit`, {headers: this.httpOptions.headers, user});
    }

    public createUser(user: IUser) {
      return this.http.post(`${environment.apiUrl}/users/create`, {headers: this.httpOptions.headers, user});
    }
    //  category Advertisers
    public getAllAdvertisers() {
      return this.http.get(`${environment.apiUrl}/advertisers/all`, {headers: this.httpOptions.headers});
    }

    public getOffersForAdvertiser(id: string) {
      return this.http.get(`${environment.apiUrl}/advertisers/offers/` + id);
    }
    
    public editAdvertiser(advertiser:IAdvertiser) {
      return this.http.put(`${environment.apiUrl}/advertisers/edit`, {headers: this.httpOptions.headers, advertiser});
    }

    public createAdvertiser(advertiser: IAdvertiser) {
      return this.http.post(`${environment.apiUrl}/advertisers/create`, {headers: this.httpOptions.headers, advertiser});
    }

    //category offers
    public getAllOffers() {
      return this.http.get(`${environment.apiUrl}/offers/all`, {headers: this.httpOptions.headers});
    }

    public editOffer(offer: IOffers) {
      return this.http.put(`${environment.apiUrl}/offers/edit`, {headers: this.httpOptions.headers, offer});
    }

    public createOffer(offer: IOffers) {
      return this.http.post(`${environment.apiUrl}/offers/create`, {headers: this.httpOptions.headers, offer});
    }

    //category Affilites
    public getAllAffiliates() {
      return this.http.get(`${environment.apiUrl}/affiliates/all`, {headers: this.httpOptions.headers});
    }

    public editAffiliates(affiliate: IAffiliates) {
      return this.http.put(`${environment.apiUrl}/affiliates/edit`, {headers: this.httpOptions.headers, affiliate});
    }

    public createAffiliates(affiliate: IAffiliates) {
      return this.http.post(`${environment.apiUrl}/affiliates/create`, {headers: this.httpOptions.headers, affiliate});
    }

    // offer - affiliate
    public offerAndAffilite(offerId: string, affiliateId: string) {
      return this.http.post(`${environment.apiUrl}/affilite-offer-access/create`, {offerId, affiliateId, status:  'active'});
    }

    public getOffersByAffiliateId(affiliateId: string) {
      return this.http.get(`${environment.apiUrl}/affilite-offer-access/get-offers/` + affiliateId);
    }

    public getAffiliateByOfferId(offerId: string) {
      return this.http.get(`${environment.apiUrl}/affilite-offer-access/get-affiliates/` + offerId);
    }

    public removeLinkingOfAffiliate(offerId: string, affiliateId: string) {
      return this.http.post(`${environment.apiUrl}/affilite-offer-access/del`,  {offerId, affiliateId});
    }

}