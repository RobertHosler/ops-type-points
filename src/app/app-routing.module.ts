import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TypeAnalyzerComponent } from './type-analyzer/type-analyzer.component';
import { UpdatesComponent } from './updates/updates.component';


const routes: Routes = [
  { path: 'updates', component: UpdatesComponent },
  { path: 'home', component: TypeAnalyzerComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
