import { DOCUMENT } from '@angular/common';
import {Component, ChangeDetectionStrategy, ViewEncapsulation, OnInit, ChangeDetectorRef, Inject, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { GlobalService } from '../../services/global.service';
import { RoleService } from '../../services/role.service';
import { AuthenticationService } from "@app/services/authentication.service";

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation : ViewEncapsulation.None
})
export class HomeComponent implements OnInit, OnDestroy {
	public menuList: string[] = [
		'Advertisers',
		'Offers',
		'Affiliates',
		'Users'
	];
	public menuListShow: boolean[];
	public selectedMenu: string;
	private subsDetailData: Subscription = new Subscription();
	
	constructor(
		@Inject(DOCUMENT) private document: Document,
		public cdr: ChangeDetectorRef,
		private authSvc:  AuthenticationService,
		public rService: RoleService,
		private globSvc: GlobalService,) {
		this.menuListShow = this.menuList.map((name) => this.rService.checkRoleRightForAction(name.toLowerCase(),'view'));
	};

	public ngOnInit() {

		this.subsDetailData = this.globSvc.goToDetailPageSubject
			.subscribe(newData => {
				if(newData.pageName  !=  "") this.selectedMenu = newData.pageName;
				this.menuClassHelper()
			})
	};

	public ngOnDestroy()  {
		this.subsDetailData.unsubscribe()
	}

	public onClickMenu (select: string) {
		this.selectedMenu = select.toLowerCase();
		this.rService.activeHomeCategorySubject.next(this.selectedMenu)
		this.menuClassHelper()
		this.cdr.detectChanges();
	};

	public menuClassHelper() {
		const menu = this.document.getElementById('headerList');
		const menuArr = menu.querySelectorAll('.mat-list-item')

		if(menu.querySelector('.mat-list-single-selected-option')) {
			menu.querySelector('.mat-list-single-selected-option').classList.remove('mat-list-single-selected-option'); //del current classactive
			const indexMenu  = this.menuList.findIndex(item =>  item.toLowerCase() === this.selectedMenu)
			menuArr[indexMenu].classList.add('mat-list-single-selected-option')
		}
		this.cdr.detectChanges();
	};

	public logout()  {
        this.authSvc.logout()
    };
};
