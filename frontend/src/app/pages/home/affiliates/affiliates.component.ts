import {Component, ChangeDetectionStrategy, ViewEncapsulation, OnInit, ChangeDetectorRef} from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { GlobalService } from '@app/services/global.service';
import { Subscription } from 'rxjs';
import { RoleService } from '@app/services/role.service';

// interfaces
import IAffiliates from '../../../interfaces/Affiliates';

@Component({
	selector: 'app-home-affiliates',
	templateUrl: './affiliates.component.html',
	styleUrls: ['./affiliates.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation : ViewEncapsulation.None
})
export class AffiliatesComponent implements OnInit {
	public affiliates: IAffiliates[];
	public affiliatesLoad: boolean = false;
	public displayedColumns: string[] = ['id', 'company', 'manager', 'status', 'edit', 'details'];
	private subsDataPopUp: Subscription = new Subscription();

	public detailAffiliateOn:boolean  = false;
	public focusedAffiliate: IAffiliates;
	
	//access rights
	public canCreate:boolean;
	public  canEdit:boolean;
	constructor(
		private apiSvc: ApiService,
		private globSvc: GlobalService,
		public rService: RoleService,
		public cdr: ChangeDetectorRef,) {
		this.cdr.detach()
		this.canCreate =  this.rService.checkRoleRightForAction('offers','create');
		this.canEdit = this.rService.checkRoleRightForAction('offers','edit')

	};

	public ngOnInit() {	
		if(this.globSvc.pageDetaiilMenu === 'affiliates') {
			this.detailAffiliate(this.globSvc.pageDetailItem)
		}

		this.subsDataPopUp = this.globSvc.affiliatesPopUpFormSendSubject.subscribe(bool => {
			if(bool) this.getAffiliatesData()
		})
		this.getAffiliatesData();
	};

	private getAffiliatesData()  {
		const sub = this.apiSvc.getAllAffiliates()
			.subscribe((affiliatesArr: IAffiliates[]) => {
				this.affiliates = affiliatesArr;
				this.cdr.detectChanges();
			})
			
	};

	public editAffiliates(affiliate: IAffiliates) {
		this.globSvc.affiliatesPopUpDataSubject.next({affiliate, type: 'edit'})
		this.cdr.detectChanges()
	};

	public addNewAffiliates() {
		this.globSvc.affiliatesPopUpDataSubject.next({affiliate:{
			id: this.globSvc.generateuuid(),
			company: '',
			managerId: this.rService.currentUserId,
			email: '',
			name: '',
			status: "",
		}, type: 'create'})

		this.cdr.detectChanges()
	};

	public detailAffiliate(affiliate: IAffiliates) {
		this.focusedAffiliate = affiliate;
		this.detailAffiliateOn = !this.detailAffiliateOn;
		this.cdr.detectChanges();
	}
};
