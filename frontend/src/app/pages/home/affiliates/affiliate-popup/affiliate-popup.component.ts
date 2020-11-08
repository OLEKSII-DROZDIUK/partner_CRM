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
import IAffiliates from "../../../../interfaces/Affiliates";

@Component({
    selector: 'affiliate-popup',
    templateUrl: './affiliate-popup.component.html',
    styleUrls: ['./affiliate-popup.component.sass'],
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation : ViewEncapsulation.None
  })
  export class AffiliatePopupComponent implements OnInit, OnDestroy {
    private isBrowser: boolean;
    public popupOn: boolean = false;
    public currentAffiliate: IAffiliates;
    public formType: string;
    public formSend:boolean =  false;
    private subsDataPopUp: Subscription = new Subscription();
    public labelPosition: 'before' | 'after' = 'after';

    public affiliatePopupForm = new FormGroup({
        companyInput: new FormControl('',Validators.required),
        emailInput: new FormControl('',Validators.required),
        nameInput: new FormControl('',Validators.required),
        statusInput: new FormControl('inactive', Validators.required),
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
        this.subsDataPopUp = this.globSvc.affiliatesPopUpDataSubject.subscribe((obj) => {
            this.currentAffiliate = obj.affiliate;
            this.formType =  obj.type;

            if(this.formType === 'edit') {
                this.setFormValue()
            }  
            this.document.querySelector('affiliate-popup').classList.add('show');
            this.document.body.classList.add("noscroll");
            this.formSend = false;
            this.popupOn = true
        });
        this.affiliatePopupForm.valueChanges.subscribe(() => {
            this.cdRef.detectChanges();
        });
    };

    public ngAfterViewInit() {
        this.document.getElementById('popUpForm').classList.add('open');
    };

    public ngOnDestroy() {
        this.subsDataPopUp.unsubscribe();
    };

    //////////////////////////////////////////life cycle off

    public closeUserPopUp() {
        this.document.querySelector('affiliate-popup').classList.remove('show')
        this.document.body.classList.remove("noscroll");
        this.affiliatePopupForm.controls.nameInput.setValue('')
        this.affiliatePopupForm.controls.emailInput.setValue('')
        this.affiliatePopupForm.controls.statusInput.setValue('inactive')
        this.affiliatePopupForm.controls.companyInput.setValue('')
        this.popupOn = false;
    };

    public setFormValue() {
        this.affiliatePopupForm.controls.nameInput.setValue(this.currentAffiliate.name)
        this.affiliatePopupForm.controls.emailInput.setValue(this.currentAffiliate.email)
        this.affiliatePopupForm.controls.statusInput.setValue(this.currentAffiliate.status)
        this.affiliatePopupForm.controls.companyInput.setValue(this.currentAffiliate.company)
    };

    public submit() {
        if(this.affiliatePopupForm.invalid) {
            return false;
        }

        this.currentAffiliate  = {
            id:  this.currentAffiliate.id,
            company: this.affiliatePopupForm.controls.companyInput.value,
            managerId: this.currentAffiliate.managerId,
            email: this.affiliatePopupForm.controls.emailInput.value,
            name: this.affiliatePopupForm.controls.nameInput.value,
            status: this.affiliatePopupForm.controls.statusInput.value,
        };

        try {
            if(this.formType === 'edit') {
                this.apiSvc.editAffiliates(this.currentAffiliate)
                    .subscribe( (res: any) => {
                        this.updateTableAfterSendData()
                    })
            } else {
                this.apiSvc.createAffiliates(this.currentAffiliate)
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
        this.globSvc.affiliatesPopUpFormSendSubject.next(true)
    }

};