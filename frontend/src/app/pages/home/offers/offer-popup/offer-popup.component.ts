import { Component, Inject, ViewEncapsulation, ChangeDetectionStrategy,
    ChangeDetectorRef, PLATFORM_ID, OnInit, OnDestroy, HostListener, Input, ErrorHandler } from "@angular/core";
import { isPlatformBrowser, DOCUMENT } from "@angular/common";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
// services
import { GlobalService } from '@app/services/global.service';
import { ApiService } from '@app/services/api.service';
import { AnimationOptions } from 'ngx-lottie';
// interfaces
import IOffers from "../../../../interfaces/Offers";
import IAdvertiser from '@app/interfaces/Advertiser';


@Component({
    selector: 'offer-popup',
    templateUrl: './offer-popup.component.html',
    styleUrls: ['./offer-popup.component.sass'],
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation : ViewEncapsulation.None
  })
  export class OfferPopupComponent implements OnInit, OnDestroy {
    private isBrowser: boolean;
    public popupOn: boolean = false;
    public currentOffer: IOffers;
    public advertisersList: IAdvertiser[];
    public formType: string;
    public formSend:boolean =  false;
    private subsDataPopUp: Subscription = new Subscription();
    public labelPosition: 'before' | 'after' = 'after';

    public offersPopupForm = new FormGroup({
        nameInput: new FormControl('',Validators.required),
        statusInput: new FormControl('inactive', Validators.required),
        advertiserSelect: new FormControl('',  Validators.compose([Validators.pattern("^(?!.*Select advertiser).*$"),Validators.required])),
    })
    //loottieAnim
    public options: AnimationOptions = {
		path: 'assets/lottiefiles-json/pop-up_ok.json',
		autoplay: true,
		loop: false
    };
    
    constructor(@Inject(PLATFORM_ID)   private platformId: Object,
                @Inject(DOCUMENT) private document: Document,
                private cdRef: ChangeDetectorRef,
                private apiSvc: ApiService,
                private globSvc: GlobalService,) {
                this.isBrowser = isPlatformBrowser(platformId);
            };
    @HostListener('click', ['$event'])
        onClick(event) {
        if(event.target.classList.contains('show') || event.target.classList.contains('user-popup_close')) {
            this.closeUserPopUp();
        };
    };
    
    public ngOnInit() {
        this.subsDataPopUp = this.globSvc.offerPopUpDataSubject.subscribe((obj) => {
            this.currentOffer = obj.offer;
            this.formType =  obj.type;

            this.apiSvc.getAllAdvertisers()
                .subscribe((advertisers:IAdvertiser[]) => {
                    this.advertisersList = advertisers;
                    if(this.formType === 'edit') {
                        this.setFormValue();
                        this.openPopUp();
                    } else {
                        this.offersPopupForm.controls.advertiserSelect.setValue("Select advertiser")
                        // if(this.advertisersList.length> 0 ) this.offersPopupForm.controls["advertiserSelect"].setValidators([Validators.required]);
                        this.openPopUp()
                    }
                }) 

            this.offersPopupForm.valueChanges.subscribe(() => {
                this.cdRef.detectChanges();
            });
        });
    };

    public changeAdvertiser(event:any) {
        console.log(event.target.value)
    }

    private openPopUp() {
        this.document.querySelector('offer-popup').classList.add('show');
        this.document.body.classList.add("noscroll");
        this.formSend = false;
        this.popupOn = true
        this.cdRef.detectChanges();
    }

    public ngAfterViewInit() {
        this.document.getElementById('popUpForm').classList.add('open');
        this.cdRef.detectChanges()
    };

    public ngOnDestroy() {
        this.subsDataPopUp.unsubscribe();
    };

    //////////////////////////////////////////life cycle off

    public closeUserPopUp() {
        this.document.querySelector('offer-popup').classList.remove('show')
        this.document.body.classList.remove("noscroll");
        this.offersPopupForm.controls.advertiserSelect.setValue('')
        this.offersPopupForm.controls.nameInput.setValue('')
        this.offersPopupForm.controls.statusInput.setValue('inactive')
        this.popupOn = false;
    };

    public setFormValue() {
        this.offersPopupForm.controls.nameInput.setValue(this.currentOffer.name)
        this.offersPopupForm.controls.statusInput.setValue(this.currentOffer.status)
        this.offersPopupForm.controls.advertiserSelect.setValue(this.currentOffer.company)  //company name
    };

    public submit() {

        if(this.offersPopupForm.invalid) {
            return false;
        }
        this.advertiserOptionHelper(this.formType);
        try {
            if(this.formType === 'edit') {
                this.apiSvc.editOffer(this.currentOffer)
                    .subscribe( (res: any) => {
                        this.updateTableAfterSendData()
                    })
            } else {
                this.apiSvc.createOffer(this.currentOffer)
                    .subscribe( (res: any) => {
                        this.updateTableAfterSendData()
                    })
            };
        } catch (err) {
            console.log("error after send form", err)
        };
    };

    private updateTableAfterSendData()  {
        this.formSend  = true;
        this.globSvc.offerPopUpFormSendSubject.next(true)
    }

    private advertiserOptionHelper(type:  string) {
        const currentAdvertiser =  this.findAdvertiserId()
            this.currentOffer = {
                id:  this.currentOffer.id,
                name: this.offersPopupForm.controls.nameInput.value,
                advertiserId: currentAdvertiser.id,
                allowedCountries:  this.currentOffer.allowedCountries,
                payout:  this.currentOffer.payout,
                status: this.offersPopupForm.controls.statusInput.value,
            }
    }


    private findAdvertiserId():IAdvertiser{
        return this.advertisersList.find(advertiser => advertiser.company ===  this.offersPopupForm.controls.advertiserSelect.value)
    }

};