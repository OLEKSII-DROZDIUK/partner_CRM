import {Component, ChangeDetectionStrategy, ViewEncapsulation, OnInit, ChangeDetectorRef} from '@angular/core';
import { ApiService } from '@app/services/api.service';
import { GlobalService } from '@app/services/global.service';
// interfaces
import  IUser  from '@app/interfaces/User'
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-home-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation : ViewEncapsulation.None
})
export class UsersComponent implements OnInit {
	public users: IUser[];
	public usersLoad: boolean = false;
	public displayedColumns: string[] = ['id', 'name', 'email', 'role', 'status', 'edit'];
	private subsDataPopUp: Subscription = new Subscription();
	
	constructor(
		private apiSvc: ApiService,
		private globSvc: GlobalService,
		public cdr: ChangeDetectorRef,) {
			this.cdr.detach()
	};

	public ngOnInit() {	

		this.subsDataPopUp = this.globSvc.userPopUpFormSendSubject.subscribe(bool => {
			if(bool) this.getUsersData()
		})
		this.getUsersData();
	};

	private getUsersData()  {
		const sub = this.apiSvc.getAllUsers()
			.subscribe((usersArr: any) => {
				this.users = usersArr;
				this.cdr.detectChanges();
			})
	};

	public editUser(user: IUser) {
		this.globSvc.userPopUpDataSubject.next({user, type: 'edit'})
		this.cdr.detectChanges()
	};

	public addNewUser() {
		this.globSvc.userPopUpDataSubject.next({user:{
			email: "",
			id: this.globSvc.generateuuid(),
			name: "",
			password: "",
			role: "",
			status: "",
		}, type: 'create'})
		this.cdr.detectChanges()
	};
};
