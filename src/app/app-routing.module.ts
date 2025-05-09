import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TypeAnalyzerComponent } from './type-analyzer/type-analyzer.component';
import { UpdatesComponent } from './updates/updates.component';
import { HomeComponent } from './home/home.component';
import { TypeQuizComponent } from './type-quiz/type-quiz.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SearchComponent } from './search/search.component';
import { TypePracticeComponent } from './type-practice/type-practice.component';
import { TermsComponent } from './terms/terms.component';
import { NineTypesComponent } from './nine-types/nine-types.component';
import { AdminComponent } from './admin/admin.component';
import { TypeRecordExpandedComponent } from './type-record-expanded/type-record-expanded.component';
import { EnneaTermsComponent } from './ennea-terms/ennea-terms.component';
import { EnneaTrifixPageComponent } from './ennea-trifix-page/ennea-trifix-page.component';
import { TypeExemplarsComponent } from './type-exemplars/type-exemplars.component';
import { EnneaGridPageComponent } from './ennea-grid-page/ennea-grid-page.component';
import { EnneaDaaChronologicalComponent } from './ennea-daa-chronological/ennea-daa-chronological.component';
import { OpsClassComponent } from './ops-class/ops-class.component';

const routes: Routes = [
  {
    path: 'updates',
    component: MainLayoutComponent,
    children: [{ path: '', component: UpdatesComponent }],
  },
  {
    path: 'analyzer',
    component: MainLayoutComponent,
    children: [
      { path: '', component: TypeAnalyzerComponent },
      { path: 'custom', component: TypeRecordExpandedComponent }
    ],
  },
  {
    path: 'search',
    component: MainLayoutComponent,
    children: [
      { path: '', component: SearchComponent },
      { path: 'person', component: TypeRecordExpandedComponent },
    ],
  },
  { path: 'terms', redirectTo: '/ops/terms', pathMatch: 'full' },
  {
    path: 'ops',
    component: MainLayoutComponent,
    children: [
      { path: '', component: OpsClassComponent },
      { path: 'class', component: OpsClassComponent },
      { path: 'class-practice', redirectTo: '/ops/class?p=t&r=t&qa=t', pathMatch: 'full' },
      { path: 'terms', component: TermsComponent },
    ],
  },
  {
    path: 'nineTypes',
    component: MainLayoutComponent,
    children: [
      { path: '', component: NineTypesComponent },
      { path: 'descriptions', component: EnneaTermsComponent },
      { path: 'trifix', component: EnneaTrifixPageComponent },
      { path: 'grid', component: EnneaGridPageComponent },
      { path: 'daa', component: EnneaDaaChronologicalComponent },
    ],
  },
  {
    path: 'analyzer',
    component: MainLayoutComponent,
    children: [{ path: '', component: TypeAnalyzerComponent }],
  },
  {
    path: 'practice',
    component: MainLayoutComponent,
    children: [
      { path: '', component: TypePracticeComponent },
      { path: 'exemplars', component: TypeExemplarsComponent },
    ],
  },
  {
    path: 'quiz',
    component: MainLayoutComponent,
    children: [{ path: '', component: TypeQuizComponent }],
  },
  {
    path: 'admin',
    component: MainLayoutComponent,
    children: [{ path: '', component: AdminComponent }],
  },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled'
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
