import { Component, ViewEncapsulation, ChangeDetectionStrategy,
    ChangeDetectorRef,  OnInit, Input,  Output, EventEmitter } from "@angular/core";
// services
import { GlobalService } from '@app/services/global.service';
import { ApiService } from '@app/services/api.service';
// interfaces
import IAffiliates from "@app/interfaces/Affiliates";
import IOffers from '@app/interfaces/Offers';

@Component({
    selector: 'affiliate-detail',
    templateUrl: './affiliate-detail.component.html',
    styleUrls: ['./affiliate-detail.component.sass'],
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation : ViewEncapsulation.None
  })
  export class AffiliateDetailComponent implements OnInit{
    @Output() clickBack: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() affiliate: IAffiliates;

    // public currentAdvertiser: IAdvertiser;
    public affiliates: IAffiliates[];
    public displayedColumns: string[] = ['id', 'name', 'status', 'delete', 'details'];
    public openOffersList:boolean =  false;
    public arrOffers: IOffers[];

    constructor(private cdRef: ChangeDetectorRef,
            private apiSvc: ApiService,
            private globSvc: GlobalService,) {
        };
    
    public ngOnInit() {
        // console.log("affiliate: ", this.affiliate)
        this.initApiData()
    };

    public ngAfterViewInit() {
        this.globSvc.globalDetailHelperRout({data:  [], pageName:''})
    }

    //////////////////////////////////////////life cycle off
    public initApiData() {
        this.apiSvc.getOffersByAffiliateId(this.affiliate.id)
            .subscribe((arrOffers: IOffers[]) => {
                this.arrOffers = arrOffers;
                this.cdRef.detectChanges();
            })
    }

    public clickBackChild() {
        this.clickBack.emit(true)
    }
    public offerAded(event) {
       this.initApiData()
    }

    public clickForAddOffer(event)  {
        this.globSvc.offerAddToAffiliateSendSubject.next({bool: true, offers: this.arrOffers })
    }

    public goToOffer(data: IOffers)  {
        this.globSvc.globalDetailHelperRout({data, pageName:'offers'})
    }

    public deleteOffer(offer: IOffers){
        this.apiSvc.removeLinkingOfAffiliate(offer.id, this.affiliate.id )
            .subscribe(()  => {
                this.initApiData();
            })
    }
};