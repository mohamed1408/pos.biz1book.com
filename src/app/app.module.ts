import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { OrderModule } from "ngx-order-pipe";
import { NgxPaginationModule } from 'ngx-pagination';
// import { MatRadioModule, MatTab, MatSortModule } from '@angular/material';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./auth.guard";
import { RoleGuard } from "./role.guard";
import { HeaderComponent } from "./hearder/header.component";
import { SignupComponent } from "./signup/signup.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { FooterComponent } from "./footer/footer.component";
import { TypeaheadComponent } from "./typeahead/typeahead.component";
import { ProductComponent } from "./product/product.component";
import { EditProductComponent } from "./edit-product/edit-product.component";
import { FilterPipe, CategoryPipe } from "./shared/order.filter.pipe";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
// import { ElectronService, NgxElectronModule } from 'ngx-electron';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { TaxGroupComponent } from './tax-group/tax-group.component';
import { AddTaxGroupComponent } from './add-tax-group/add-tax-group.component';
import { EditTaxComponent } from './edit-tax/edit-tax.component';
import { DiscountRulesComponent } from './discount-rules/discount-rules.component';
import { AddDiscountComponent } from './add-discount/add-discount.component';
import { EditDiscountComponent } from './edit-discount/edit-discount.component';
import { AdditionalChargesComponent } from './additional-charges/additional-charges.component';
import { CreateAdditionalChargesComponent } from './create-additional-charges/create-additional-charges.component';
import { EditAdditionalChargesComponent } from './edit-additional-charges/edit-additional-charges.component';
import { KOTGroupComponent } from './kotgroup/kotgroup.component';
import { CreateKOTGroupComponent } from './create-kotgroup/create-kotgroup.component';
import { CustomersComponent } from './customers/customers.component';
import { CreateCustomersComponent } from './create-customers/create-customers.component';
import { ToastComponent } from './toast/toast.component';
import { ToastNotificationsModule } from "ngx-toast-notifications";
import { AddCategoryComponent } from './add-category/add-category.component';
import { CategoryComponent } from './category/category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { StoreSettingsComponent } from './store-settings/store-settings.component';
import { DaywiseSalesRptComponent } from './daywise-sales-rpt/daywise-sales-rpt.component';
import { TranstypesComponent } from './transtypes/transtypes.component';
import { PrdWiseSalesRptComponent } from './prd-wise-sales-rpt/prd-wise-sales-rpt.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { TransactionRptComponent } from './transaction-rpt/transaction-rpt.component';
import { OrderWiseSalesRptComponent } from './order-wise-sales-rpt/order-wise-sales-rpt.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { OutletComponent } from './outlet/outlet.component';
import { CreateOutletComponent } from './create-outlet/create-outlet.component';
import { NgxPrintModule } from 'ngx-print';
import { UrbanPiperComponent } from './urban-piper/urban-piper.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { UsersComponent } from './users/users.component';
import { OptionGroupsComponent } from './option-groups/option-groups.component';
import { ModifyoptionComponent } from './modifyoption/modifyoption.component';
import { EditOptiongroupComponent } from './edit-optiongroup/edit-optiongroup.component';
import { CompanyComponent } from './company/company.component';
import { PinGenerateComponent } from './pin-generate/pin-generate.component';
import { PreferenceComponent } from './preference/preference.component';
import { StoreActionComponent } from './urban-piper/store-action/store-action.component';
import { UrbanPiperKeyComponent } from './urban-piper-key/urban-piper-key.component';
import { ItemActionComponent } from './urban-piper/item-action/item-action.component';
import { PriceBookComponent } from './price-book/price-book.component';
import { DiningAreaComponent } from './dining-area/dining-area.component';
import { CreateDiningareaComponent } from './create-diningarea/create-diningarea.component';
//import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { CategoryWiseRptComponent } from './category-wise-rpt/category-wise-rpt.component';
import { StorewiseRptComponent } from './storewise-rpt/storewise-rpt.component';
import { CommonModule } from '@angular/common';
// import { MatInputModule, MatToolbarModule } from '@angular/material';
// import { MatTableModule } from '@angular/material/table';
import { JwtInterceptor } from './_helpers';
import { LoaderComponent } from './loader/loader.component';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from './service/loader.service';
import { LoaderInterceptor } from './_helpers/loader.interceptor';
import { FileUploadModule } from 'ng2-file-upload';
// import { DragDropModule } from '@angular/cdk/drag-drop';
import { DragDropFileUploadDirective } from './drag-drop-file-upload.directive';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { StoreReportComponent } from './store-report/store-report.component';
import { TimeWiseRptComponent } from './time-wise-rpt/time-wise-rpt.component';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { MonthWiseProdSalesComponent } from './month-wise-prod-sales/month-wise-prod-sales.component';
import { CancelOrdReportComponent } from './cancel-ord-report/cancel-ord-report.component';
import { UPProdRptComponent } from './upprod-rpt/upprod-rpt.component';
import { TestComponent } from './test/test.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { OptionReportComponent } from './option-report/option-report.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { AdduserComponent } from './adduser/adduser.component';
import { EditcustomerComponent } from './editcustomer/editcustomer.component';
import { ScreenrulesComponent } from './screenrules/screenrules.component';
import { OrderTypeReportComponent } from './order-type-report/order-type-report.component';
import { MaterialModule } from './material-module';
// import { DateTimePickerModule, DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { NgxBarcodeModule } from 'ngx-barcode';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { PaymenttypeComponent } from './paymenttype/paymenttype.component';
import { ProductTagComponent } from './product-tag/product-tag.component';
import { SalebypaymentTypeComponent } from './salebypayment-type/salebypayment-type.component';
import { MultiCompaniesComponent } from './multi-companies/multi-companies.component';
import { CancelOrderComponent } from './cancel-order/cancel-order.component';
import { SaleProdGroupComponent } from './sale-prod-group/sale-prod-group.component';
import { SaleprodgroupwiseRptComponent } from './saleprodgroupwise-rpt/saleprodgroupwise-rpt.component';
import { DenominationsComponent } from './denominations/denominations.component';
import { DeliveryorderRptComponent } from './deliveryorder-rpt/deliveryorder-rpt.component';

// import { DataTablesModule } from 'angular-datatables';
// import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
// let config1 = new AuthServiceConfig([
//   {q
//     id: GoogleLoginProvider.PROVIDER_ID,
//     provider: new GoogleLoginProvider("325980122234-jl9lhccf5psqba9idtpf09m90jvvfq33.apps.googleusercontent.com")
//   }, {
//     id: FacebookLoginProvider.PROVIDER_ID,
//     provider: new FacebookLoginProvider("769784703505890")
//   },

// ]);

// export function provideConfig() {
//   return config1;
// }
//import { ChartsModule } from 'ng2-charts'
const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    SignupComponent,
    DashboardComponent,
    FooterComponent,
    TypeaheadComponent,
    ProductComponent,
    CategoryComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    EditProductComponent,
    OrderTypeReportComponent,
    FilterPipe,
    CategoryPipe,
    TaxGroupComponent,
    AddTaxGroupComponent,
    EditTaxComponent,
    DiscountRulesComponent,
    AddDiscountComponent,
    EditDiscountComponent,
    AdditionalChargesComponent,
    CreateAdditionalChargesComponent,
    EditAdditionalChargesComponent,
    KOTGroupComponent,
    CreateKOTGroupComponent,
    CustomersComponent,
    ToastComponent,
    CreateCustomersComponent,
    StoreSettingsComponent,
    DaywiseSalesRptComponent,
    TranstypesComponent,
    AddExpenseComponent,
    OutletComponent,
    CreateOutletComponent,
    UrbanPiperComponent,
    UsersComponent,
    PrdWiseSalesRptComponent,
    OptionGroupsComponent,
    ModifyoptionComponent,
    EditOptiongroupComponent,
    CompanyComponent,
    TransactionRptComponent,
    OrderWiseSalesRptComponent,
    TransactionRptComponent,
    OrderWiseSalesRptComponent,
    PinGenerateComponent,
    PreferenceComponent,
    StoreActionComponent,
    UrbanPiperKeyComponent,
    ItemActionComponent,
    PriceBookComponent,
    DiningAreaComponent,
    CreateDiningareaComponent,
    CategoryWiseRptComponent,
    StorewiseRptComponent,
    LoaderComponent,
    DragDropFileUploadDirective,
    DashBoardComponent,
    StoreReportComponent,
    TimeWiseRptComponent,
    MonthWiseProdSalesComponent,
    CancelOrdReportComponent,
    UPProdRptComponent,
    TestComponent,
    PasswordResetComponent,
    OptionReportComponent,
    CustomerListComponent,
    AdduserComponent,
    EditcustomerComponent,
    ScreenrulesComponent,
    LoginSignupComponent,
    PaymenttypeComponent,
    ProductTagComponent,
    SalebypaymentTypeComponent,
    MultiCompaniesComponent,
    CancelOrderComponent,
    SaleProdGroupComponent,
    SaleprodgroupwiseRptComponent,
    DenominationsComponent,
    DeliveryorderRptComponent

    
  ],
  exports: [CommonModule],

  imports: [
    // SocialLoginModule,
    // NgxMaterialTimepickerModule,
    BrowserAnimationsModule,
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    HttpModule,
    OrderModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    Ng2SearchPipeModule,
    AutocompleteLibModule,
    NgxPrintModule,
    CommonModule,
    FileUploadModule,
    // DateTimePickerModule,
    // DateRangePickerModule,
    // NgxElectronModule,
    NgMultiSelectDropDownModule,
    NgxDaterangepickerMd.forRoot(),
    ToastNotificationsModule.forRoot(),
    SocketIoModule.forRoot(config),
    AmazingTimePickerModule,
    NgxBarcodeModule,
    // DataTablesModule,
    //ChartsModule,
    // ToastModule,ButtonModule,
    // AgmCoreModule.forRoot({
    //   // please get your own API key here:
    //   // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
    //   apiKey: 'AIzaSyAvcDy5ZYc2ujCS6TTtI3RYX5QmuoV8Ffw'
    // }),
    RouterModule.forRoot([
      { path: "", component: LoginComponent },
      { path: "signup", component: SignupComponent },
      { path: "dashboard", component: DashBoardComponent, canActivate: [RoleGuard] },
      { path: "typeahead", component: TypeaheadComponent, canActivate: [AuthGuard] },
      { path: "product", component: ProductComponent, canActivate: [AuthGuard] },
      { path: "edit-product/:id", component: EditProductComponent, canActivate: [AuthGuard] },
      { path: "taxgroup", component: TaxGroupComponent, canActivate: [AuthGuard] },
      { path: "addtaxgroup", component: AddTaxGroupComponent, canActivate: [AuthGuard] },
      { path: "edittaxgroup/:Id", component: EditTaxComponent, canActivate: [AuthGuard] },
      { path: "discountrule", component: DiscountRulesComponent, canActivate: [AuthGuard] },
      { path: "addDiscountrule", component: AddDiscountComponent, canActivate: [AuthGuard] },
      { path: "editdiscount/:Id", component: EditDiscountComponent, canActivate: [AuthGuard] },
      { path: "addtnchrgs", component: AdditionalChargesComponent, canActivate: [AuthGuard] },
      { path: "createaddtnchrgs", component: CreateAdditionalChargesComponent, canActivate: [AuthGuard] },
      { path: "EditAddchrgs/:Id", component: EditAdditionalChargesComponent, canActivate: [AuthGuard] },
      { path: "kotgroup", component: KOTGroupComponent, canActivate: [AuthGuard] },
      { path: "CreateKot/:Id", component: CreateKOTGroupComponent, canActivate: [AuthGuard] },
      { path: "customer", component: CustomersComponent, canActivate: [RoleGuard] },
      { path: "createcustomer/:Id", component: CreateCustomersComponent, canActivate: [AuthGuard] },
      { path: "storesetting/:Id", component: StoreSettingsComponent, canActivate: [AuthGuard] },
      { path: "category", component: CategoryComponent, canActivate: [AuthGuard] },
      { path: "add-category", component: AddCategoryComponent, canActivate: [AuthGuard] },
      { path: "edit-category/:Id", component: EditCategoryComponent, canActivate: [AuthGuard] },
      { path: "orderwiserpt", component: OrderWiseSalesRptComponent, canActivate: [RoleGuard] },
      { path: "productwiserpt", component: PrdWiseSalesRptComponent, canActivate: [RoleGuard] },
      { path: "daywiserpt", component: DaywiseSalesRptComponent, canActivate: [RoleGuard] },
      { path: "transactionrpt", component: TransactionRptComponent, canActivate: [AuthGuard] },
      { path: "transtype", component: TranstypesComponent, canActivate: [AuthGuard] },
      { path: "addtranstype/:Id", component: AddExpenseComponent, canActivate: [AuthGuard] },
      { path: "outlet", component: OutletComponent, canActivate: [RoleGuard] },
      { path: "createoutlet/:Id", component: CreateOutletComponent, canActivate: [AuthGuard] },
      { path: "urban", component: UrbanPiperComponent, canActivate: [RoleGuard] },
      { path: "users", component: UsersComponent, canActivate: [RoleGuard] },
      { path: "company", component: CompanyComponent, canActivate: [RoleGuard] },
      { path: "options", component: OptionGroupsComponent, canActivate: [AuthGuard] },
      { path: "modifyoption/:Id", component: ModifyoptionComponent, canActivate: [AuthGuard] },
      { path: "editoption/:Id", component: EditOptiongroupComponent, canActivate: [AuthGuard] },
      { path: "unlockscreen", component: PinGenerateComponent },
      { path: "transactionrpt", component: TransactionRptComponent, canActivate: [AuthGuard] },
      { path: "orderwiserpt", component: OrderWiseSalesRptComponent, canActivate: [RoleGuard] },
      { path: "preference", component: PreferenceComponent, canActivate: [RoleGuard] },
      { path: "urban/location", component: StoreActionComponent, canActivate: [RoleGuard] },
      { path: "urbanpiper", component: UrbanPiperKeyComponent, canActivate: [AuthGuard] },
      { path: "itemaction/:Id", component: ItemActionComponent, canActivate: [AuthGuard] },
      { path: "pricebook", component: PriceBookComponent, canActivate: [AuthGuard] },
      { path: "diningarea", component: DiningAreaComponent, canActivate: [AuthGuard] },
      { path: "creatediningarea/:Id", component: CreateDiningareaComponent, canActivate: [AuthGuard] },
      { path: "categorywiserpt", component: CategoryWiseRptComponent, canActivate: [RoleGuard] },
      { path: "storewiserpt", component: StorewiseRptComponent, canActivate: [RoleGuard] },
      { path: "storerpt", component: StoreReportComponent, canActivate: [RoleGuard] },
      { path: "timewiserpt", component: TimeWiseRptComponent, canActivate: [RoleGuard] },
      { path: "monthwiseprodsales", component: MonthWiseProdSalesComponent, canActivate: [RoleGuard] },
      { path: "cancelordreport", component: CancelOrdReportComponent, canActivate: [RoleGuard] },
      { path: "upprdrpt", component: UPProdRptComponent, canActivate: [RoleGuard] },
      { path: "test", component: TestComponent },
      { path: "password-reset", component: PasswordResetComponent },
      { path: "option-report", component: OptionReportComponent, canActivate: [AuthGuard] },
      {
        path: "customerlist", component: CustomerListComponent, canActivate: [AuthGuard],
        children: [
          { path: "adduser", component: AdduserComponent },
          { path: "edituser/:num", component: EditcustomerComponent }
        ]
      },
      { path: "screenrule", component: ScreenrulesComponent, canActivate: [RoleGuard] },
      { path: "ordertypereport", component: OrderTypeReportComponent, canActivate: [RoleGuard] },
      { path: "paymentypes", component: PaymenttypeComponent, canActivate: [RoleGuard] },
      { path: "product-tag", component: ProductTagComponent, canActivate: [RoleGuard] },
      { path: "salebypayment", component: SalebypaymentTypeComponent, canActivate: [RoleGuard] },
      { path: "multicompanies", component: MultiCompaniesComponent, canActivate: [RoleGuard] },
      { path: "cancelorder", component: CancelOrderComponent, canActivate: [RoleGuard] },
      { path: "sale-prod-group", component: SaleProdGroupComponent, canActivate: [RoleGuard] },
      { path: "saleprodgroupwiserpt", component: SaleprodgroupwiseRptComponent, canActivate: [RoleGuard] },
      { path: "denomination", component: DenominationsComponent, canActivate: [RoleGuard] },
      { path: "deliveryorder-rpt", component: DeliveryorderRptComponent, canActivate: [RoleGuard] }






      
      

      /*
      /*
      
        path: "scheduler",
        component: SchedulerComponent
        //canActivate:[AuthGuard]
      } */
    ]),
  ],
  providers: [JwtHelperService, AuthGuard, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    // {provide: AuthServiceConfig,
    //   useFactory: provideConfig},
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }