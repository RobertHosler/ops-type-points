import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OpsDataService, TypedPerson } from '../service/ops-data.service';
import { OpsType, OpsTypeUtil } from '../type-analyzer/ops-type';
import { DarkModeService } from '../service/dark-mode.service';

@Component({
  selector: 'app-type-record-expanded',
  templateUrl: './type-record-expanded.component.html',
  styleUrls: ['./type-record-expanded.component.scss'],
})
export class TypeRecordExpandedComponent implements OnInit, OnDestroy {
  @Input()
  person: TypedPerson;
  @Input()
  personName: string;

  personOpsType: OpsType;

  activeTab: string;

  activeOps = 'Summary';
  activeEnnea = 'Summary';

  opsOptions = [
    'Summary',
    'Checklist',
    'Links',
    'Description',
    'Twins',
    'Extroversion',
  ];

  allNames: Map<string, TypedPerson>;

  subscription: Subscription;
  routeSubscription: Subscription;
  darkMode: DarkModeService;

  constructor(
    private opsDataService: OpsDataService,
    private route: ActivatedRoute,
    private router: Router,
    darkMode: DarkModeService
  ) {
    console.log('expanded');
    this.darkMode = darkMode;
  }

  ngOnInit(): void {
    if (this.person) {
      // Person passed in - determine type
      if (this.person.type) {
        this.personOpsType = OpsTypeUtil.getPersonOpsType(this.person);
      }
      this.personName = this.person.name;
      const queryParams: Params = {
        name: this.personName,
      };
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: queryParams,
        queryParamsHandling: 'merge',
      });
      this.initActiveTab();
    } else {
      console.time('allNames-expanded');
      this.subscription = this.opsDataService.allNames.subscribe((allNamesMap) => {
        console.timeEnd('allNames-expanded');
        this.allNames = allNamesMap;
        if (!this.personName) {
          this.initRoute(); // get name from route - then setup
        } else if (!this.person) {
          this.setupPerson();
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  private setupPerson() {
    if (!this.person) {
      this.person = this.allNames.get(this.personName);
    }
    if (this.person.type) {
      this.personOpsType = OpsTypeUtil.getPersonOpsType(this.person);
    }
    this.initActiveTab();
    if (this.person.socialType) {
      this.opsOptions.push("Social Type");
    }
  }

  private initRoute(setup?) {
    this.routeSubscription = this.route.queryParamMap.subscribe((params) => {
      this.personName = params.get('person');
      let opsType = params.get('ops');
      let name = params.get('name');
      if (this.personName) {
        this.setupPerson();
      } else if (opsType && opsType.length === 16) {
        this.person = {
          name: name,
          type: opsType,
          mod: opsType.substring(0,2),
          s1: opsType.substring(3,5),
          s2: opsType.substring(6,8),
          animals: opsType.substring(9)
        };
        this.setupPerson();
      } else {
        // redirect to search
      }
    });
  }

  private initActiveTab() {
    if (this.person.type) {
      this.activeTab = 'OPS';
    } else if (this.person.eType) {
      this.activeTab = 'Enneagram';
    } else if (this.person.wssType) {
      this.activeTab = 'WSS';
    } else if (this.person.apType) {
      this.activeTab = 'AP';
    } else {
      // NO ACTIVE TAB? - error? - show default message?
      this.activeTab = 'Default';
    }
  }
}
