
import { Injectable, Inject} from '@angular/core';
import { Router } from '@angular/router';
import * as uuid from 'uuid';
import { Subject } from 'rxjs';

import  IUser  from '@app/interfaces/User';
import IAdvertiser from '@app/interfaces/Advertiser';
import IOffers from '../interfaces/Offers';
import IAffiliates from '../interfaces/Affiliates';

@Injectable({ providedIn: 'root' })
export class GlobalService {

    public pageDetailItem: any;
    public pageDetaiilMenu: string;

    public userPopUpDataSubject = new Subject<{user: IUser, type: string}>();
    public userPopUpFormSendSubject = new Subject<boolean>();

    public advertiserPopUpDataSubject = new Subject<{advertiser: IAdvertiser, type: string}>();
    public advertiserPopUpFormSendSubject = new Subject<boolean>();

    public offerPopUpDataSubject = new Subject<{offer: IOffers, type: string}>();
    public offerPopUpFormSendSubject = new Subject<boolean>();

    public affiliatesPopUpDataSubject = new Subject<{affiliate: IAffiliates, type: string}>();
    public affiliatesPopUpFormSendSubject = new Subject<boolean>();

    // for routing logic
    public goToDetailPageSubject = new Subject<{data: any , pageName: string}>();

    // offer affiliate logic to add  new item
    public affiliateAddToOfferSendSubject = new Subject<{bool:boolean, affiliates:IAffiliates[]}>();
    public offerAddToAffiliateSendSubject = new Subject<{bool:boolean, offers:IOffers[]}>();

	constructor(public router: Router) {
        
    };
    
   public generateuuid() {
        return uuid.v4();
    };

    public globalDetailHelperRout(data) {
        this.pageDetailItem = data.data;
        this.pageDetaiilMenu = data.pageName;
        this.goToDetailPageSubject.next(data)
    }
};
