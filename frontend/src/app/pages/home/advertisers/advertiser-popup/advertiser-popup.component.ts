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
import IAdvertiser from '@app/interfaces/Advertiser';


@Component({
    selector: 'advertiser-popup',
    templateUrl: './advertiser-popup.component.html',
    styleUrls: ['./advertiser-popup.component.sass'],
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation : ViewEncapsulation.None
  })
  export class AdvertiserPopupComponent implements OnInit, OnDestroy {
    private isBrowser: boolean;
    public popupOn: boolean = false;
    public currentAdvertiser: IAdvertiser;
    public formType: string;
    public formSend:boolean =  false;
    private subsDataPopUp: Subscription = new Subscription();
    public labelPosition: 'before' | 'after' = 'after';

    public advertiserPopupForm = new FormGroup({
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
        this.subsDataPopUp = this.globSvc.advertiserPopUpDataSubject.subscribe((obj) => {
            this.currentAdvertiser = obj.advertiser;
            this.formType =  obj.type;

            if(this.formType === 'edit') {
                this.setFormValue()
            }  
            this.document.querySelector('advertiser-popup').classList.add('show');
            this.document.body.classList.add("noscroll");
            this.formSend = false;
            this.popupOn = true
        });
        this.advertiserPopupForm.valueChanges.subscribe(() => {
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
        this.document.querySelector('advertiser-popup').classList.remove('show')
        this.document.body.classList.remove("noscroll");
        this.advertiserPopupForm.controls.nameInput.setValue('')
        this.advertiserPopupForm.controls.emailInput.setValue('')
        this.advertiserPopupForm.controls.statusInput.setValue('inactive')
        this.advertiserPopupForm.controls.companyInput.setValue('')
        this.popupOn = false;
    };

    public setFormValue() {
        this.advertiserPopupForm.controls.nameInput.setValue(this.currentAdvertiser.name)
        this.advertiserPopupForm.controls.emailInput.setValue(this.currentAdvertiser.email)
        this.advertiserPopupForm.controls.statusInput.setValue(this.currentAdvertiser.status)
        this.advertiserPopupForm.controls.companyInput.setValue(this.currentAdvertiser.company)
    };

    public submit() {
        if(this.advertiserPopupForm.invalid) {
            return false;
        }

        this.currentAdvertiser  = {
            id:  this.currentAdvertiser.id,
            company: this.advertiserPopupForm.controls.companyInput.value,
            managerId: this.currentAdvertiser.managerId,
            email: this.advertiserPopupForm.controls.emailInput.value,
            name: this.advertiserPopupForm.controls.nameInput.value,
            status: this.advertiserPopupForm.controls.statusInput.value,
        };

        try {
            if(this.formType === 'edit') {
                this.apiSvc.editAdvertiser(this.currentAdvertiser)
                    .subscribe( (res: any) => {
                        this.updateTableAfterSendData()
                    })
            } else {
                this.apiSvc.createAdvertiser(this.currentAdvertiser)
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
        this.globSvc.advertiserPopUpFormSendSubject.next(true)
    }

};