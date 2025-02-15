import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OpsDataService, TypedPerson } from '../service/ops-data.service';
import { OpsType, OpsTypeUtil } from '../type-analyzer/ops-type';
import { DarkModeService } from '../service/dark-mode.service';
import { NgForm } from '@angular/forms';

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

  activeName: string;
  activeTab: string;
  custom: boolean;
  formValid = true;

  activeOps;// = 'Summary';
  activeEnnea;// = 'Summary';

  opsOptions = [
    'Summary',
    'Description',
    'Twins',
  ];

  modalities: string;
  saviors: string;
  animals: string;

  fullOps: string;

  wss: string;

  ap: string;
  apSub: string;

  enneaCore: string;
  enneaInstincts: string;
  enneaTrifix: string;

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
      this.subscription = this.opsDataService.allNames.subscribe((allNamesMap) => {
        this.allNames = allNamesMap;
        if (!this.personName) {
          this.initRoute(); // get name from route - then setup
        } else if (!this.person) {
          this.setupPerson();
        }
      });
    }
    // this.updateRoute();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  private setupPerson() {
    if (!this.person) {
      this.person = this.allNames.get(this.personName);
    }
    if (this.person && this.person.type) {
      this.personOpsType = OpsTypeUtil.getPersonOpsType(this.person);
    }
    this.initActiveTab();
  }

  private initRoute(setup?) {
    this.routeSubscription = this.route.queryParamMap.subscribe((params) => {
      this.person = null; // reset person
      this.personName = params.get('person');
      this.activeTab = params.get('active');
      if (params.get('activeOps')) {
        this.activeOps = params.get('activeOps');
      }
      if (params.get('activeEnnea')) {
        this.activeEnnea = params.get('activeEnnea');
      }
      if (this.personName) {
        this.setupPerson();
      } else {
        this.custom = true;
        this.activeName = params.get('name');
        let opsType = params.get('ops');
        if (opsType && opsType.length === 16) {
          this.initBasicPerson();
          this.person.type = opsType;
          this.person.mod = opsType.substring(0, 2);
          this.person.s1 = opsType.substring(3, 5);
          this.person.s2 = opsType.substring(6, 8);
          this.person.animals = opsType.substring(9);
          this.modalities = this.person.mod;
          this.saviors = this.person.s1 + '/' + this.person.s2;
          this.animals = this.person.animals;
        }
        let apType = params.get('ap');
        if (apType && apType.length === 4) {
          this.initBasicPerson();
          this.person.apType = apType.toLocaleUpperCase();
          let apSubtype = params.get('aps');
          if (apSubtype && apSubtype.length === 4) {
            this.person.apSubtype = apSubtype;
          }
        }
        let wssType = params.get('wss');
        if (wssType && wssType.length === 3) {
          this.wss = wssType;
          this.initBasicPerson();
          this.person.wssType = wssType.toLocaleUpperCase();
        }
        let enneaType = params.get('e');
        if (enneaType && enneaType.length === 3) {
          this.initBasicPerson();
          this.enneaCore = enneaType;
          this.person.eType = enneaType;
          this.person.coreEType = enneaType.substring(0, 1);
          this.person.wing = enneaType.substring(2, 3);
          this.person.coreETypeLong = enneaType.substring(0, 1); // should be spelled out ex: Nine
          let instinct = params.get('i'); // ex: so/sp
          this.enneaInstincts = instinct;
          this.person.instinct = instinct;
          let trifix = params.get('t'); // may contain wings '9w1 6w5 3w2'
          if (trifix && (trifix.length === 11 || trifix.length === 3)) {
            this.enneaTrifix = trifix;
            this.person.fullTrifix = trifix;
            if (trifix.length === 11) {
              let trifixArray = trifix.split(' ');
              this.person.trifix = trifixArray[0].charAt(0) + trifixArray[1].charAt(0) + trifixArray[2].charAt(0);
              this.person.fullEType = instinct + ' ' + trifix;
            } else {
              this.person.trifix = trifix;
              this.person.fullEType = instinct + ' ' + enneaType + ' ' + trifix;
            }
          } else {
            this.person.fullEType = instinct + ' ' + enneaType;
          }
        }
        this.setupPerson();
      }
    });
  }

  initBasicPerson() {
    if (!this.person) {
      this.person = {
        name: this.activeName,
        tags: []
      };
    }
    return this.person;
  }

  get multipleTypes(): boolean {
    let typeCount = 0;
    if (this.person.type) {
      typeCount++;
    }
    if (this.person.eType) {
      typeCount++;
    }
    if (this.person.wssType) {
      typeCount++;
    }
    if (this.person.apType) {
      typeCount++;
    }
    return typeCount > 1;
  }

  private initActiveTab() {
    if (!this.person && this.custom) {
      this.activeTab = 'Custom';
      this.initBasicPerson();
    } else if (this.activeTab) {
      return; // already set
    } else if (this.person.type) {
      this.activeTab = 'OPS';
      this.activeOps = 'Summary';
    } else if (this.person.eType) {
      this.activeTab = 'Enneagram';
      this.activeEnnea = 'Summary';
    } else if (this.person.wssType) {
      this.activeTab = 'WSS';
    } else if (this.person.apType) {
      this.activeTab = 'AP';
    } else {
      // NO ACTIVE TAB? - error? - show default message?
      this.activeTab = 'Default';
    }
  }

  changeTab(tab: string) {
    if (!this.activeOps && tab === 'OPS') {
      this.activeOps = 'Summary';
    }
    if (!this.activeEnnea && tab === 'Enneagram') {
      this.activeEnnea = 'Summary';
    }
    this.activeTab = tab;
    this.updateRoute();
  }

  changeOpsTab(tab: string) {
    this.activeOps = tab;
    this.updateRoute();
  }

  changeEnneaTab(tab: string) {
    this.activeEnnea = tab;
    this.updateRoute();
  }

  updateRoute() {
    const queryParams: Params = {
      person: this.personName,
      active: this.activeTab,
      activeOps: this.activeOps,
      activeEnnea: this.activeEnnea,
    };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }

  clear

  onSubmit(ngForm: NgForm) {
    if (ngForm.valid) {
      this.formValid = true;
      this.modalities

      let ops = null;
      if (this.saviors && this.animals) {
        let cleanSaviors = this.saviors.replace('/', '').toUpperCase();
        let cleanS1 = cleanSaviors.charAt(0) + cleanSaviors.charAt(1).toLowerCase();
        let cleanS2 = cleanSaviors.charAt(2) + cleanSaviors.charAt(3).toLowerCase();
        let cleanAnimals = this.animals.replace(/[\/\(\)]/g, '').toUpperCase();
        ops = new OpsType(
          this.modalities.toUpperCase(),
          cleanS1, cleanS2,
          cleanAnimals
        );
      }

      if (this.enneaInstincts) {
        let cleanInstincts = this.enneaInstincts.replace('/', '').toLowerCase();
        this.enneaInstincts = cleanInstincts.substring(0, 2) + '/' + cleanInstincts.substring(2, 4);
      }

      if (this.enneaTrifix && this.enneaTrifix.length === 3 && this.enneaTrifix.includes('w')) {
        this.enneaTrifix = null;
      }

      const queryParams: Params = {
        person: this.personName,
        active: this.activeTab,
        activeOps: this.activeOps,
        activeEnnea: this.activeEnnea,
        ops: ops && ops.valid ? ops.opsCode : null,
        ap: this.ap,
        aps: this.apSub,
        e: this.enneaCore,
        i: this.enneaInstincts,
        t: this.enneaTrifix,
        wss: this.wss,
      };
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: queryParams,
        queryParamsHandling: '',
      });
    } else {
      this.formValid = false;
      alert("Not valid");
    }
  }

}
