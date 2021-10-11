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

const routes: Routes = [
  {
    path: 'updates',
    component: MainLayoutComponent,
    children: [{ path: '', component: UpdatesComponent }],
  },
  {
    path: 'analyzer',
    component: MainLayoutComponent,
    children: [{ path: '', component: TypeAnalyzerComponent }],
  },
  {
    path: 'search',
    component: MainLayoutComponent,
    children: [{ path: '', component: SearchComponent }],
  },
  {
    path: 'terms',
    component: MainLayoutComponent,
    children: [{ path: '', component: TermsComponent }],
  },
  {
    path: 'analyzer',
    component: MainLayoutComponent,
    children: [{ path: '', component: TypeAnalyzerComponent }],
  },
  {
    path: 'practice',
    component: MainLayoutComponent,
    children: [{ path: '', component: TypePracticeComponent }],
  },
  {
    path: 'quiz',
    component: MainLayoutComponent,
    children: [{ path: '', component: TypeQuizComponent }],
  },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      relativeLinkResolution: 'legacy',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
