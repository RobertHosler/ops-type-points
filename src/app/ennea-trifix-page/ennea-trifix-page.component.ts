import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-ennea-trifix-page',
  templateUrl: './ennea-trifix-page.component.html',
  styleUrls: ['./ennea-trifix-page.component.scss'],
})
export class EnneaTrifixPageComponent implements OnInit {
  selectedFix: string;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.selectedFix = params.get('fix');
    });
  }

  goToFixPage(fix: string) {
    const queryParams: Params = {
      fix: fix,
    };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }

  clearFix() {
    this.selectedFix = null;
    const queryParams: Params = {
      fix: null,
    };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }
}
