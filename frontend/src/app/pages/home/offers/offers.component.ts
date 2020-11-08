import {Component, ChangeDetectionStrategy, ViewEncapsulation, OnInit, ChangeDetectorRef, OnDestroy, Input} from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { GlobalService } from '@app/services/global.service';
import { Subscription } from 'rxjs';
import { RoleService } from '@app/services/role.service';

// interfaces
import IOffers from '../../../interfaces/Offers';

@Component({
	selector: 'app-home-offers',
	templateUrl: './offers.component.html',
	styleUrls: ['./offers.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation : ViewEncapsulation.None
})
export class OffersComponent implements OnInit,  OnDestroy {
	// @Input() detailActive:boolean;
	// @Input() offerDataDetail:IOffers;

	public offers: IOffers[];
	public offersLoad: boolean = false;
	public displayedColumns: string[] = ['id', 'name', 'advertiser', 'status', 'edit', 'details'];
	private subsDataPopUp: Subscription = new Subscription();
	private subsDetailRout: Subscription = new Subscription();
	public detailOfferOn:boolean  = false;
	public focusedOffer: IOffers;
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
		
		if(this.globSvc.pageDetaiilMenu === 'offers') {
			this.detailOffer(this.globSvc.pageDetailItem)
		}

		this.subsDataPopUp = this.globSvc.offerPopUpFormSendSubject.subscribe(bool => {
			if(bool) this.getOffersData()
		})
		this.getOffersData();
	};

	public ngOnDestroy(): void {
		
	}

	private getOffersData()  {
		const sub = this.apiSvc.getAllOffers()
			.subscribe((offersArr: IOffers[]) => {
				this.offers = offersArr;
				this.cdr.detectChanges();
			})	
	};

	public editOffer(offer: IOffers) {
		this.globSvc.offerPopUpDataSubject.next({offer, type: 'edit'})
		this.cdr.detectChanges()
	};

	public addNewOffer() {
		this.globSvc.offerPopUpDataSubject.next({offer:{
			id: this.globSvc.generateuuid(),
			advertiserId: '',
			company: '',  //company name
			name:'',
			allowedCountries: [],
			payout: '',
			status: "",
		}, type: 'create'})
		this.cdr.detectChanges()
	};

	public detailOffer(offer: IOffers)  {
		this.focusedOffer = offer;
		this.detailOfferOn = !this.detailOfferOn;
		this.cdr.detectChanges();
	}
};
