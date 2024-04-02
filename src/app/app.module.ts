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
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AccordionModule  } from 'ngx-bootstrap/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
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
import { TypeIndicatorComponent } from './type-indicator/type-indicator.component';
import { NineTypesComponent } from './nine-types/nine-types.component';
import { AdminComponent } from './admin/admin.component';
import { TypeRecordExpandedComponent } from './type-record-expanded/type-record-expanded.component';
import { TypeTagsComponent } from './type-tags/type-tags.component';
import { SocionicsReferenceComponent } from './socionics-reference/socionics-reference.component';
import { SocionicsShapeComponent } from './socionics-shape/socionics-shape.component';
import { EnneagramTypeComponent } from './enneagram-type/enneagram-type.component';
import { EnneagramInstinctComponent } from './enneagram-instinct/enneagram-instinct.component';
import { EnneagramTrifixComponent } from './enneagram-trifix/enneagram-trifix.component';
import { EnneagramTrifixCombinationComponent } from './enneagram-trifix-combination/enneagram-trifix-combination.component';
import { OpsTypeAnimalComponent } from './ops-type-animal/ops-type-animal.component';
import { OpsTypeTableComponent } from './ops-type-table/ops-type-table.component';
import { TypeDashboardAnimalsComponent } from './type-dashboard-animals/type-dashboard-animals.component';
import { OpsTypeTwinsComponent } from './ops-type-twins/ops-type-twins.component';
import { EnneaTypeTwinsComponent } from './ennea-type-twins/ennea-type-twins.component';
import { OpsTypeLinksComponent } from './ops-type-links/ops-type-links.component';
import { EnneaDescriptionComponent } from './ennea-description/ennea-description.component';
import { EnneaTriadsComponent } from './ennea-triads/ennea-triads.component';
import { EnneaTermsComponent } from './ennea-terms/ennea-terms.component';
import { EnneaTrifixPageComponent } from './ennea-trifix-page/ennea-trifix-page.component';
import { EnneaTrifixStemsComponent } from './ennea-trifix-stems/ennea-trifix-stems.component';
import { EnneaTypeLinksComponent } from './ennea-type-links/ennea-type-links.component';
import { EnneaTypeCalculatorComponent } from './ennea-type-calculator/ennea-type-calculator.component';
import { TypeExemplarsComponent } from './type-exemplars/type-exemplars.component';
import { EnneaGridComponent } from './ennea-grid/ennea-grid.component';
import { EnneaGridPageComponent } from './ennea-grid-page/ennea-grid-page.component';
import { EnneaDaaChronologicalComponent } from './ennea-daa-chronological/ennea-daa-chronological.component';
import { TypeRecordItemComponent } from './type-record-item/type-record-item.component';
import { OpsClassComponent } from './ops-class/ops-class.component';
import { CookieBannerComponent } from './cookie-banner/cookie-banner.component';
import { OpsSocialTypeComponent } from './ops-social-type/ops-social-type.component';
import { ApSummaryComponent } from './ap-summary/ap-summary.component';
import { ApLinksComponent } from './ap-links/ap-links.component';
import { ApFunctionsComponent } from './ap-functions/ap-functions.component';
import { ApRelationsComponent } from './ap-relations/ap-relations.component';
import { ApDescriptionComponent } from './ap-description/ap-description.component';
import { ApSextaComponent } from './ap-sexta/ap-sexta.component';

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
    TermsComponent,
    TypeIndicatorComponent,
    NineTypesComponent,
    AdminComponent,
    TypeRecordExpandedComponent,
    TypeTagsComponent,
    SocionicsReferenceComponent,
    SocionicsShapeComponent,
    EnneagramTypeComponent,
    EnneagramInstinctComponent,
    EnneagramTrifixComponent,
    EnneagramTrifixCombinationComponent,
    OpsTypeAnimalComponent,
    OpsTypeTableComponent,
    TypeDashboardAnimalsComponent,
    OpsTypeTwinsComponent,
    EnneaTypeTwinsComponent,
    OpsTypeLinksComponent,
    EnneaDescriptionComponent,
    EnneaTriadsComponent,
    EnneaTermsComponent,
    EnneaTrifixPageComponent,
    EnneaTrifixStemsComponent,
    EnneaTypeLinksComponent,
    EnneaTypeCalculatorComponent,
    TypeExemplarsComponent,
    EnneaGridComponent,
    EnneaGridPageComponent,
    EnneaDaaChronologicalComponent,
    TypeRecordItemComponent,
    OpsClassComponent,
    CookieBannerComponent,
    OpsSocialTypeComponent,
    ApSummaryComponent,
    ApLinksComponent,
    ApFunctionsComponent,
    ApRelationsComponent,
    ApDescriptionComponent,
    ApSextaComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    EmojiModule,
    SocketIoModule.forRoot(config),
    TabsModule.forRoot(),
    PopoverModule.forRoot(),
    TooltipModule.forRoot(),
    ButtonsModule.forRoot(),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    NgxBootstrapIconsModule.pick(allIcons)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
