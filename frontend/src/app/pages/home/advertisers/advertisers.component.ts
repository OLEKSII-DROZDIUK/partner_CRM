import {Component, ChangeDetectionStrategy, ViewEncapsulation, OnInit, ChangeDetectorRef} from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { GlobalService } from '@app/services/global.service';
// interfaces
import IAdvertiser from '@app/interfaces/Advertiser';
import { Subscription } from 'rxjs';
import { RoleService } from '@app/services/role.service';

@Component({
	selector: 'app-home-advertisers',
	templateUrl: './advertisers.component.html',
	styleUrls: ['./advertisers.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation : ViewEncapsulation.None
})
export class AdvertisersComponent implements OnInit {
	public advertisers: IAdvertiser[];
	public focusedAdvertiser:  IAdvertiser;
	public advertisersLoad: boolean = false;
	public displayedColumns: string[] = ['id', 'company', 'manager', 'status', 'edit', 'details'];
	private subsDataPopUp: Subscription = new Subscription();
	public detailAdvertisersOn: boolean  = false;
	//access rights
	public canCreate:boolean;
	public  canEdit:boolean;
	constructor(
		private apiSvc: ApiService,
		private globSvc: GlobalService,
		public rService: RoleService,
		public cdr: ChangeDetectorRef,) {
		this.cdr.detach()
		this.canCreate =  this.rService.checkRoleRightForAction('advertisers','create');
		this.canEdit = this.rService.checkRoleRightForAction('advertisers','edit')

	};

	public ngOnInit() {	
		this.subsDataPopUp = this.globSvc.advertiserPopUpFormSendSubject.subscribe(bool => {
			if(bool) this.getAdvertisersData()
		})
		this.getAdvertisersData();
	};

	private getAdvertisersData()  {
		this.apiSvc.getAllAdvertisers()
			.subscribe((advertisersArr: IAdvertiser[]) => {
				this.advertisers = advertisersArr;
				this.cdr.detectChanges();
			})
			
	};

	public editAdvertisers(advertiser: IAdvertiser) {
		this.globSvc.advertiserPopUpDataSubject.next({advertiser, type: 'edit'})
		this.cdr.detectChanges()
	};

	public addNewAdvertiser() {
		this.globSvc.advertiserPopUpDataSubject.next({advertiser:{
			id: this.globSvc.generateuuid(),
			company: "",
			managerId: this.rService.currentUserId,
			email: "",
			name: "",
			status: "",
		}, type: 'create'})
		this.cdr.detectChanges()
	};

	public detailAdvertisers(advertiser: IAdvertiser)  {
		this.focusedAdvertiser = advertiser;
		this.detailAdvertisersOn = !this.detailAdvertisersOn;
		this.cdr.detectChanges();
	}
};
