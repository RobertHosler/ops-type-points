import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OpsDataService, TypedPerson } from '../service/ops-data.service';
import { OpsType, OpsTypeUtil } from '../type-analyzer/ops-type';

@Component({
  selector: 'app-type-record-expanded',
  templateUrl: './type-record-expanded.component.html',
  styleUrls: ['./type-record-expanded.component.scss'],
})
export class TypeRecordExpandedComponent implements OnInit {
  @Input()
  person: TypedPerson;
  @Input()
  personName: string;

  personOpsType: OpsType;

  activeTab: string;

  activeOps = 'Summary';

  opsOptions = [
    'Summary',
    'Checklist',
    'Description',
    'Twins',
    'Points',
    'Extroversion',
  ];

  allNames: Map<string, TypedPerson>;

  constructor(
    private opsDataService: OpsDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

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
      this.opsDataService.allNames.subscribe((allNamesMap) => {
        this.allNames = allNamesMap;
        if (!this.personName) {
          this.initRoute(); // get name from route - then setup
        } else {
          this.setupPerson();
        }
      });
    }
  }

  private setupPerson() {
    this.person = this.allNames.get(this.personName);
    if (this.person.type) {
      this.personOpsType = OpsTypeUtil.getPersonOpsType(this.person);
    }
    this.initActiveTab();
  }

  private initRoute(setup?) {
    this.route.queryParamMap.subscribe((params) => {
      this.personName = params.get('person');
      if (!this.personName) {
        // redirect to search
      }
      this.setupPerson();
    });
  }

  private initActiveTab() {
    if (this.person.type) {
      this.activeTab = 'OPS';
    } else if (this.person.eType) {
      this.activeTab = 'Enneagram';
    } else if (this.person.wssType) {
      this.activeTab = 'WSS';
    } else {
      // NO ACTIVE TAB? - error? - show default message?
      this.activeTab = 'Default';
    }
  }
}
