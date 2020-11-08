import { Component, ViewEncapsulation, ChangeDetectionStrategy,
    ChangeDetectorRef,  OnInit, Inject, HostListener, Input, Output, EventEmitter} from "@angular/core";
// services
import { GlobalService } from '@app/services/global.service';
import { ApiService } from '@app/services/api.service';
import { DOCUMENT } from "@angular/common";
import IAffiliates from "../../../../../interfaces/Affiliates";
import { AnimationOptions } from "ngx-lottie";

@Component({
    selector: 'offer-detail-add',
    templateUrl: './offer-detail-add.component.html',
    styleUrls: ['./offer-detail-add.component.sass'],
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation : ViewEncapsulation.None
  })
  export class OfferDetailAddComponent implements OnInit {
    @Input() selectedOfferId: string
    @Output() addNewAffiliate: EventEmitter<boolean> = new EventEmitter<boolean>();
    public popupOn: boolean = false;
    public formSend:boolean =  false;
    public affiliatesList: IAffiliates[];
    public selectedAffilite: string;
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

        this.globSvc.affiliateAddToOfferSendSubject.subscribe((obj) => {

        this.apiSvc.getAllAffiliates()
            .subscribe((affiliatesArr: IAffiliates[]) => {
                this.filterNoTakenAffilitates(affiliatesArr,  obj.affiliates)
                this.document.querySelector('offer-detail-add').classList.add('show');
                this.document.body.classList.add("noscroll");
                this.popupOn = true
                this.formSend = false;
                
                this.cdRef.detectChanges();
            })
        })
    };

    public ngAfterViewInit() {
        this.document.getElementById('addAffiliate').classList.add('open');
        this.cdRef.detectChanges()
    };

    public filterNoTakenAffilitates(affiliatessArr: IAffiliates[], choiceAffiliates:IAffiliates[]){
        this.affiliatesList = affiliatessArr.filter(affiliate => {
           return !choiceAffiliates.find(choiceAffiliate => choiceAffiliate.id === affiliate.id)
        })
    }

    public closeUserPopUp() {
        this.document.querySelector('offer-detail-add').classList.remove('show')
        this.document.body.classList.remove("noscroll");
        this.popupOn = false;
    }

    public addAffiliteToOffer() {
        if(this.selectedAffilite) {
            this.apiSvc.offerAndAffilite(this.selectedOfferId, this.selectedAffilite)
                .subscribe(res =>  {
                    this.updateTableAfterSendData()
                    this.addNewAffiliate.emit(true);
                })
        }
    }

    private updateTableAfterSendData()  {
        this.formSend  = true;
        // this.globSvc.offerPopUpFormSendSubject.next(true)
        this.cdRef.detectChanges()
    }

};