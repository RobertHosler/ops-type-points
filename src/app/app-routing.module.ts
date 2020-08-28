import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TypeAnalyzerComponent } from './type-analyzer/type-analyzer.component';
import { UpdatesComponent } from './updates/updates.component';
import { HomeComponent } from './home/home.component';
import { TypeQuizComponent } from './type-quiz/type-quiz.component';


const routes: Routes = [
  { path: 'updates', component: UpdatesComponent },
  { path: 'analyzer', component: TypeAnalyzerComponent },
  { path: 'quiz', component: TypeQuizComponent },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
