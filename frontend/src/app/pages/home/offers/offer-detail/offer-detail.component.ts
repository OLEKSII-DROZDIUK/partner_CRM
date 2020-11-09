import { Component,  ViewEncapsulation, ChangeDetectionStrategy,
    ChangeDetectorRef, OnInit, Input, Output, EventEmitter } from "@angular/core";
// services
import { GlobalService } from '@app/services/global.service';
import { ApiService } from '@app/services/api.service';
// interfaces
import IAffiliates from "@app/interfaces/Affiliates";
import IOffers from '@app/interfaces/Offers';

@Component({
    selector: 'offer-detail',
    templateUrl: './offer-detail.component.html',
    styleUrls: ['./offer-detail.component.sass'],
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation : ViewEncapsulation.None
  })
  export class OfferDetailComponent implements OnInit {
    @Output() clickBack: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() offer: IOffers;

    public offers: IOffers[];
    public displayedColumns: string[] = ['id', 'company', 'status', 'delete', 'details'];
    public arrAffiliates: IAffiliates[];

    constructor(private cdRef: ChangeDetectorRef,
            private apiSvc: ApiService,
            private globSvc: GlobalService,) {
        };
    
    public ngOnInit() {
        // console.log("offer: ",this.offer)
        this.initApiData();
    };


    public ngAfterViewInit()  {
        this.globSvc.globalDetailHelperRout({data:  [], pageName:''})
    }
    //////////////////////////////////////////life cycle off

    public initApiData(){
        this.apiSvc.getAffiliateByOfferId(this.offer.id)
            .subscribe((arrAffiliate: IAffiliates[]) => {
                this.arrAffiliates = arrAffiliate;
                this.cdRef.detectChanges()
            })
    }

    public afiliateAded(event){
        this.initApiData()
    }

    public clickBackChild() {
        this.clickBack.emit(true)
    }
    
    public addNewAffiliate(){
        this.globSvc.affiliateAddToOfferSendSubject.next({bool: true, affiliates: this.arrAffiliates})
    }

    public deleteAffiliate(affiliate: IAffiliates){
        this.apiSvc.removeLinkingOfAffiliate(this.offer.id, affiliate.id )
            .subscribe(()  => {
                this.initApiData();
            })
    }

    public goToAffiliate(data: IAffiliates) {
        this.globSvc.globalDetailHelperRout({data, pageName:'affiliates'})
    }
};