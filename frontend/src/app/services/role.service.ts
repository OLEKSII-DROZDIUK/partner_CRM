
import { Injectable, Inject} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

//DATA
import { GLOBAL_ROLES } from  '../DATA/roles.hard';

@Injectable({ providedIn: 'root' })
export class RoleService {
    private currentUserRole: string = JSON.parse(atob(localStorage.getItem('accessToken').split('.')[1])).role;
    public currentUserId: string = JSON.parse(atob(localStorage.getItem('accessToken').split('.')[1])).id;
    public allRoleRules: any;

    public activeHomeCategorySubject:BehaviorSubject<string> = new BehaviorSubject('');

	constructor() {
        this.allRoleRules = GLOBAL_ROLES;
    };
    
    public checkRoleRightForAction(categoryName:string, action: string): boolean {
        const activeUserForThisAction = this.allRoleRules[categoryName][action]
        return activeUserForThisAction.indexOf(this.currentUserRole) +1
    }

};
