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
import  IUser  from '@app/interfaces/User';


@Component({
    selector: 'user-popup',
    templateUrl: './user-popup.component.html',
    styleUrls: ['./user-popup.component.sass'],
    changeDetection: ChangeDetectionStrategy.Default,
    encapsulation : ViewEncapsulation.None
  })
  export class UserPopupComponent implements OnInit, OnDestroy {
    private isBrowser: boolean;
    public phonePopupOn: boolean = false;
    public currentUser: IUser;
    public formType: string;
    public formSend:boolean =  false;
    private subsDataPopUp: Subscription = new Subscription();
    public labelPosition: 'before' | 'after' = 'after';

    public userPopupForm = new FormGroup({
        nameInput: new FormControl('',Validators.required),
        emailInput: new FormControl('',Validators.required),
        statusInput: new FormControl('inactive', Validators.required),
        roleInput: new FormControl('admin', Validators.required),
        passwordInput: new FormControl(''),
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
        this.subsDataPopUp = this.globSvc.userPopUpDataSubject.subscribe((obj) => {
            this.currentUser = obj.user;
            this.formType =  obj.type;

            if(this.formType === 'edit') {
                this.setFormValue()
                this.userPopupForm.controls["passwordInput"].clearValidators()
                this.userPopupForm.controls["passwordInput"].updateValueAndValidity();
            }  else {
                this.userPopupForm.controls["passwordInput"].setValidators([Validators.required]);
            };

            this.document.querySelector('user-popup').classList.add('show');
            this.document.body.classList.add("noscroll");
            this.formSend = false;
            this.phonePopupOn = true
            this.userPopupForm.valueChanges.subscribe(() => {
                this.cdRef.detectChanges();
            });
			this.cdRef.detectChanges();
        });
    };

    public ngAfterViewInit() {
        this.document.getElementById('popUpForm').classList.add('open');
        this.cdRef.detectChanges()
    };

    public ngOnDestroy() {
        this.subsDataPopUp.unsubscribe();
    };

    //////////////////////////////////////////life cycle off

    public closeUserPopUp() {
        this.document.querySelector('user-popup').classList.remove('show')
        this.document.body.classList.remove("noscroll");
        this.userPopupForm.controls.nameInput.setValue('')
        this.userPopupForm.controls.emailInput.setValue('')
        this.userPopupForm.controls.passwordInput.setValue('')
        this.userPopupForm.controls.statusInput.setValue('inactive')
        this.userPopupForm.controls.roleInput.setValue('admin')
        this.phonePopupOn = false;
    };

    public setFormValue() {
        this.userPopupForm.controls.nameInput.setValue(this.currentUser.name)
        this.userPopupForm.controls.emailInput.setValue(this.currentUser.email)
        this.userPopupForm.controls.statusInput.setValue(this.currentUser.status)
        this.userPopupForm.controls.roleInput.setValue(this.currentUser.role)
    };

    public submit() {
        if(this.userPopupForm.invalid) {
            return false;
        }

        this.currentUser = {
            id:  this.currentUser.id,
            email: this.userPopupForm.controls.emailInput.value,
            name: this.userPopupForm.controls.nameInput.value,
            password: this.userPopupForm.controls.passwordInput.value,
            role: this.userPopupForm.controls.roleInput.value,
            status: this.userPopupForm.controls.statusInput.value,
        };

        try {
            if(this.formType === 'edit') {
                this.apiSvc.editUser(this.currentUser)
                    .subscribe( (res: any) => {
                        this.updateTableAfterSendData()
                    })
            } else {
                this.apiSvc.createUser(this.currentUser)
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
        this.globSvc.userPopUpFormSendSubject.next(true)
    }

};