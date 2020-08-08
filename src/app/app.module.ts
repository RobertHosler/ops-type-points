import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TypeAnalyzerComponent } from './type-analyzer/type-analyzer.component';
import { TypeDashboardComponent } from './type-analyzer/type-dashboard/type-dashboard.component';
import { UpdatesComponent } from './updates/updates.component';
import { TypePointsComponent } from './type-analyzer/type-points/type-points.component';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { HeaderComponent } from './header/header.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TypeDescriptionComponent } from './type-analyzer/type-description/type-description.component';
import { TypeAnimalComponent } from './type-analyzer/type-animal/type-animal.component';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';


@NgModule({
  declarations: [
    AppComponent,
    TypePointsComponent,
    TypeAnalyzerComponent,
    TypeDashboardComponent,
    UpdatesComponent,
    HeaderComponent,
    TypeDescriptionComponent,
    TypeAnimalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    EmojiModule,
    TabsModule.forRoot(),
    NgxBootstrapIconsModule.pick(allIcons)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
