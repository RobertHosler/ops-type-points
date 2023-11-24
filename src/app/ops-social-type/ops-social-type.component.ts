import { Component, Input, OnInit } from '@angular/core';
import { Term, TypePicture, TypedPerson } from '../service/ops-data.service';
import { TermsService } from '../service/terms.service';

@Component({
  selector: 'app-ops-social-type',
  templateUrl: './ops-social-type.component.html',
  styleUrls: ['./ops-social-type.component.scss']
})
export class OpsSocialTypeComponent implements OnInit {
  
  @Input()
  typedPerson: TypedPerson;

  term: Term;
  loaded = false;

  constructor(private termsService: TermsService) {
    
  }

  ngOnInit(): void {
    if (!this.termsService.dataLoaded()) {
      this.termsService.ready.subscribe({
        next: () => this.initialLoad()
      });
    } else {
      this.initialLoad();
    }
  }

  initialLoad() {
    this.loaded = true;
    this.term = this.termsService.terms.get("Social Type " + this.typedPerson.socialType);
  }

}
