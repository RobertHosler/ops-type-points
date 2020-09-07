import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TypeAnalyzerComponent } from './type-analyzer/type-analyzer.component';
import { UpdatesComponent } from './updates/updates.component';
import { HomeComponent } from './home/home.component';
import { TypeQuizComponent } from './type-quiz/type-quiz.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

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
    path: 'analyzer',
    component: MainLayoutComponent,
    children: [{ path: '', component: TypeAnalyzerComponent }],
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
