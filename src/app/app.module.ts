import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TypeAnalyzerComponent } from './type-analyzer/type-analyzer.component';
import { TypeDashboardComponent } from './type-analyzer/type-dashboard/type-dashboard.component';
import { UpdatesComponent } from './updates/updates.component';
import { TypePointsComponent } from './type-analyzer/type-points/type-points.component';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { HeaderComponent } from './header/header.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { TypeDescriptionComponent } from './type-analyzer/type-description/type-description.component';
import { TypeAnimalComponent } from './type-analyzer/type-animal/type-animal.component';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { TypeVisualComponent } from './type-analyzer/type-visual/type-visual.component';
import { TypeBubblesComponent } from './type-analyzer/type-visual/type-bubbles/type-bubbles.component';
import { TypeQuizComponent } from './type-quiz/type-quiz.component';
import { HomeComponent } from './home/home.component';
import { CardComponent } from './home/card/card.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SearchComponent } from './search/search.component';
import { TypeRecordListComponent } from './type-record-list/type-record-list.component';
import { TypeChecklistComponent } from './type-analyzer/type-checklist/type-checklist.component';
import { TypePracticeComponent } from './type-practice/type-practice.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { TermsComponent } from './terms/terms.component';
import { environment } from 'src/environments/environment';

const config: SocketIoConfig = { url: environment.socketUrl, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    TypePointsComponent,
    TypeAnalyzerComponent,
    TypeDashboardComponent,
    UpdatesComponent,
    HeaderComponent,
    TypeDescriptionComponent,
    TypeAnimalComponent,
    TypeVisualComponent,
    TypeBubblesComponent,
    TypeQuizComponent,
    HomeComponent,
    CardComponent,
    MainLayoutComponent,
    FooterComponent,
    SearchComponent,
    TypeRecordListComponent,
    TypeChecklistComponent,
    TypePracticeComponent,
    TermsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    EmojiModule,
    SocketIoModule.forRoot(config),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    ButtonsModule.forRoot(),
    NgxBootstrapIconsModule.pick(allIcons)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
