import { Component, Inject, ViewEncapsulation, ChangeDetectionStrategy,
    ChangeDetectorRef, PLATFORM_ID, OnInit, OnDestroy,  Input,Output, EventEmitter } from "@angular/core";
import { isPlatformBrowser, DOCUMENT } from "@angular/common";
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
  export class AdvertiserDetailComponent implements OnInit, OnDestroy {
    @Output() clickBack: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() advertiser:IAdvertiser;

    private isBrowser: boolean;
    public currentAdvertiser: IAdvertiser;
    public offers: IOffers[];
    private subsDataPopUp: Subscription = new Subscription();
    public displayedColumns: string[] = ['id', 'name', 'status','details'];

    constructor(@Inject(PLATFORM_ID)   private platformId: Object,
            @Inject(DOCUMENT) private document: Document,
            private cdRef: ChangeDetectorRef,
            private apiSvc: ApiService,
            private globSvc: GlobalService,) {
            this.isBrowser = isPlatformBrowser(platformId);
        };
    
    public ngOnInit() {
        this.apiSvc.getOffersForAdvertiser(this.advertiser.id)
            .subscribe((offersList:IOffers[] ) => {
                this.offers = offersList
                this.cdRef.detectChanges();
            })

    };

    public ngAfterViewInit() {
        
    };

    public ngOnDestroy() {
        
    };

    //////////////////////////////////////////life cycle off

    public clickBackChild() {
        this.clickBack.emit(true)
    }

    public goToOffer(data: IOffers) {
        this.globSvc.globalDetailHelperRout({data, pageName:'offers'})
    }
};