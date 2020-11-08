import { Component, ViewEncapsulation, ChangeDetectionStrategy,
    ChangeDetectorRef,  OnInit, Inject, HostListener, Input, Output, EventEmitter} from "@angular/core";
// services
import { GlobalService } from '@app/services/global.service';
import { ApiService } from '@app/services/api.service';
import { DOCUMENT } from "@angular/common";
import IOffers from "../../../../../interfaces/Offers";
import { AnimationOptions } from "ngx-lottie";

@Component({
    selector: 'affiliate-detail-add',
    templateUrl: './affiliate-detail-add.component.html',
    styleUrls: ['./affiliate-detail-add.component.sass'],
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation : ViewEncapsulation.None
  })
  export class AffiliateDetailAddComponent implements OnInit {
    @Input() affiliateId: string;
    @Output() addNewOffer: EventEmitter<boolean> = new EventEmitter<boolean>();
    public popupOn: boolean = false;
    public formSend:boolean =  false;
    public offersList: IOffers[];
    public selectedOffer: string;
    //loottieAnim
    public options: AnimationOptions = {
		path: 'assets/lottiefiles-json/pop-up_ok.json',
		autoplay: true,
		loop: false
    };
    constructor(@Inject(DOCUMENT) private document: Document,
            private cdRef: ChangeDetectorRef,
            private apiSvc: ApiService,
            private globSvc: GlobalService,) {
        };

    @HostListener('click', ['$event'])
        onClick(event) {
        if(event.target.classList.contains('show') || event.target.classList.contains('user-popup_close')) {
            this.closeUserPopUp();
        };
    };
    
    public ngOnInit() {

        this.globSvc.offerAddToAffiliateSendSubject.subscribe((obj) => {
            this.apiSvc.getAllOffers()
                .subscribe((offersArr: IOffers[]) => {
                    this.filterNoTakenOffers(offersArr, obj.offers);
                    this.document.querySelector('affiliate-detail-add').classList.add('show');
                    this.document.body.classList.add("noscroll");
                    this.popupOn = true;
                    this.formSend = false;
                    
                    this.cdRef.detectChanges();
                })
            })
    };

    public ngAfterViewInit() {
        this.document.getElementById('addOfer').classList.add('open');
        this.cdRef.detectChanges()
    };

    public filterNoTakenOffers(offersArr: IOffers[], choiceOffers:IOffers[]){
        this.offersList = offersArr.filter(offer => {
           return !choiceOffers.find(choiceOffer => choiceOffer.id === offer.id)
        })
    }

    public closeUserPopUp() {
        this.document.querySelector('affiliate-detail-add').classList.remove('show')
        this.document.body.classList.remove("noscroll");
        this.popupOn = false;
    };

    public addOfferToAffility() {
        if(this.selectedOffer) {
            this.apiSvc.offerAndAffilite(this.selectedOffer, this.affiliateId)
                .subscribe(res =>  {
                    this.updateTableAfterSendData()
                    this.addNewOffer.emit(true)
                })
        }
    };

    private updateTableAfterSendData()  {
        this.formSend  = true;
        this.cdRef.detectChanges()
    }

};