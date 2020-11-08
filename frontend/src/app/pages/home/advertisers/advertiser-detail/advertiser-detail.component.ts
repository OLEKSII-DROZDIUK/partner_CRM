import { Component, Inject, ViewEncapsulation, ChangeDetectionStrategy,
    ChangeDetectorRef, OnInit, Input,Output, EventEmitter } from "@angular/core";
import { Subscription } from "rxjs";
// services
import { GlobalService } from '@app/services/global.service';
import { ApiService } from '@app/services/api.service';
// interfaces
import IAdvertiser from '@app/interfaces/Advertiser';
import IOffers from '@app/interfaces/Offers';


@Component({
    selector: 'advertiser-detail',
    templateUrl: './advertiser-detail.component.html',
    styleUrls: ['./advertiser-detail.component.sass'],
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation : ViewEncapsulation.None
  })
  export class AdvertiserDetailComponent implements OnInit {
    @Output() clickBack: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() advertiser:IAdvertiser;

    public currentAdvertiser: IAdvertiser;
    public offers: IOffers[];
    private subsDataPopUp: Subscription = new Subscription();
    public displayedColumns: string[] = ['id', 'name', 'status','details'];

    constructor(private cdRef: ChangeDetectorRef,
            private apiSvc: ApiService,
            private globSvc: GlobalService,) {
        };
    
    public ngOnInit() {
        this.apiSvc.getOffersForAdvertiser(this.advertiser.id)
            .subscribe((offersList:IOffers[] ) => {
                this.offers = offersList
                this.cdRef.detectChanges();
            })

    };

    //////////////////////////////////////////life cycle off

    public clickBackChild() {
        this.clickBack.emit(true)
    }

    public goToOffer(data: IOffers) {
        this.globSvc.globalDetailHelperRout({data, pageName:'offers'})
    }
};