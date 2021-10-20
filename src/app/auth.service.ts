import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Route } from "@angular/compiler/src/core";
import { ok } from 'assert';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import moment from "moment";
@Injectable({
  providedIn: "root"
})
export class AuthService {

  private loggedStatus = false;
  //base_url = "http://192.168.2.66:8000/";
  base_url1 = "https://localhost:44383/api/";
  base_url = "https://biz1pos.azurewebsites.net/api/";
  pos_url = "http://localhost:2357/";
  //base_url=URL+'att';
  get isLoggedIn() {
    return this.loggedStatus;
  }
  constructor(private http: HttpClient) { }
  /* Attedance Service Start */
  setLoggedIn(value: boolean) {
    this.loggedStatus = value;
  }

  getUserDetails(username, password) {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    var formURL = this.base_url;
    //log-in?user_name=163&password=163
    var formURL =
      this.base_url +
      "att/log-in?user_name=" +
      username +
      "&password=" +
      password;
    return this.http.get(formURL);
  }

  toFormData(formValue) {
    const formData = new FormData();

    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      // console.log(key, value)
      formData.append(key, value);
    }
    return formData;
  }

  Registration(formdata) {
    let body = this.toFormData(formdata);
    return this.http.post(this.base_url + "Registration/Register", body);
  }
  LogIn(formdata) {
    let body = this.toFormData(formdata);
    return this.http.post(this.base_url + "LogIn/WebLogIn", body);
  }
  unlock(pin, companyid) {
    return this.http.get(this.base_url + `LogIn/pinlogin?companyid=${companyid}&pin=${pin}`)
  }
  sendmail(email) {
    return this.http.get(this.base_url + "Login/send_reset_link?email=" + email);
  }
  saveOrder(formdata) {
    let body = this.toFormData(formdata);
    // console.log(formdata);
    // // console.log("api");
    return this.http.post(this.base_url + "POSOrder/CreateOrder", body);
  }
  editOrder(formdata) {
    let body = this.toFormData(formdata);
    // console.log(formdata);
    // // console.log("api");
    return this.http.post(this.base_url + "POSOrder/UpdateOrder", body);
  }
  getStoreOrder(compId, storeId, start_date) {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    var formURL = this.base_url;
    // console.log(compId);
    var formURL =
      this.base_url +
      "POSOrder/POSOrderData?compId=" +
      compId +
      "&storeId=" +
      storeId +
      "&POSDate=" +
      start_date;
    return this.http.get(formURL);
  }
  getDashBoard(startdate, enddate, cmpId, Id) {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    var formURL = this.base_url;
    // console.log(startdate)
    // console.log(enddate)
    var formURL =
      this.base_url +
      "Dashboard/Post?fromDate=" + startdate + "&toDate=" + enddate + "&compId=" + cmpId + "&storeId=" + Id;
    return this.http.get(formURL);
  }
  getsum(CompanyId, frmdate, todate, StoreId) {
    // console.log(frmdate, todate)
    var formURL =
      this.base_url +
      "ShiftSummary/Post?compId=" + CompanyId + "&fromDate=" + frmdate + "&toDate=" + todate + "&storeId=" + StoreId;
    return this.http.get(formURL);
  }
  GetStoreData(CompanyId) {
    var formURL =
      this.base_url +
      "Dashboard/StoreData?CompanyId=" + CompanyId;
    return this.http.get(formURL);

  }
  GetStoreData1(CompanyId) {
    var formURL =
      this.base_url +
      "Stores/Get?CompanyId=" + CompanyId;
    return this.http.get(formURL);
  }
  AddStoreData1(formdata) {
    let body = this.toFormData(formdata);
    // console.log(formdata);
    return this.http.post(this.base_url + "Stores/AddStore", body);
  }
  Editoutlet(Id) {
    return this.http.get(this.base_url + "Stores/Edit?Id=" + Id);
  }
  Updateoutlet(formdata) {

    let body = this.toFormData(formdata);
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + "Stores/UpdateData", body);
  }
  DeleteOutlet(Id) {
    return this.http.get(this.base_url + "Stores/Delete?Id=" + Id);
  }
  getVariant(CompanyId) {

    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "Variant/Get?CompanyId=" + CompanyId;
    return this.http.get(formURL);
  }
  GetCatVar(Id) {
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "Category/EditVariant?Id=" + Id;
    return this.http.get(formURL);

  }
  getTax(CompanyId) {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "TaxGroup/Get?CompanyId=" + CompanyId;
    return this.http.get(formURL);
  }
  addvariant(formdata) {
    let body = this.toFormData(formdata);
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + "Variant/CreateVariant", body);
  }
  addTaxgrp(formdata) {
    let body = this.toFormData(formdata);
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + "TaxGroup/AddTax", body);
  }
  addChargesave(formdata) {
    let body = this.toFormData(formdata);
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + "AdditionalCharges/Create", body);
  }
  EditVariant(Id) {
    return this.http.get(this.base_url + "Variant/GetById?Id=" + Id);
  }
  getDiscount(CompanyId) {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "DiscountRule/Get?CompanyId=" + CompanyId;
    return this.http.get(formURL);
  }
  getCustomers(CompanyId) {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "Customer/GetIndex?CompanyId=" + CompanyId;
    return this.http.get(formURL);
  }
  addcustomers(formdata) {
    let body = this.toFormData(formdata);
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + "Customer/AddCustomer", body);

  }
  ImportData(formdata) {
    let body = this.toFormData(formdata);
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + "Category/AddCategory", body);


  }
  getcat1(id, CompanyId) {
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "Category/Edit?Id=" + id + "&CompanyId=" + CompanyId;
    return this.http.get(formURL);

  }
  getcat(CompanyId) {
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "Category/Index?CompanyId=" + CompanyId;
    return this.http.get(formURL);

  }
  getcatprd(CompanyId) {
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "StorewiseRpt/GetProduct?CompanyId=" + CompanyId;
    return this.http.get(formURL);

  }

  savecategory(formdata) {
    let body = this.toFormData(formdata);
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + "Category/SaveData", body);

  }
  savecategory1(formdata) {
    let body = this.toFormData(formdata);
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + "Category/Update", body);
  }
  Getcat(Id) {
    // console.log(Id);
    return this.http.get(this.base_url + "Category/EditVariant?Id=" + Id);

  }
  getoption(CompanyId) {
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "Category/CatOption?companyId=" + CompanyId;
    return this.http.get(formURL);
  }
  saveExpense(formdata) {
    let body = this.toFormData(formdata);
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + "Transtype/SaveData", body);

  }
  UpdateExpense(formdata) {
    let body = this.toFormData(formdata);
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + "Transtype/Update", body);

  }
  getpayment() {
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "Transtype/GetPay";
    return this.http.get(formURL);

  }
  EditType(Id) {
    // console.log(Id);
    return this.http.get(this.base_url + "Transtype/Edit?Id=" + Id);

  }
  EditCustomers(Id, CompanyId) {
    // console.log(Id);
    return this.http.get(this.base_url + "Customer/Edit?Id=" + Id + "&companyId=" + CompanyId);
  }
  UpdateCustomer(formdata) {

    let body = this.toFormData(formdata);
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + "Customer/Update", body);

  }
  Deletecustomer(Id) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('Id', Id);
    return this.http.get(this.base_url + "Customer/Delete?Id=" + Id);
  }
  saveCatgy(formdata) {
    let body = this.toFormData(formdata);
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + "Category/AddCategory", body);

  }
  getkotgrp(CompanyId) {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "KOTGroup/GetIndex?CompanyId=" + CompanyId;
    return this.http.get(formURL);
  }
  addkotgrp(formdata) {
    let body = this.toFormData(formdata);
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + "KOTGroup/Create", body);
  }
  Editkotgp(Id) {
    return this.http.get(this.base_url + "KOTGroup/Edit?Id=" + Id);
  }
  UpdateKot(formdata) {
    let body = this.toFormData(formdata);
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + "KOTGroup/Update", body);

  }
  getAddtnchrgs(CompanyId) {
    var formURL =
      this.base_url +
      "AdditionalCharges/Index?CompanyId=" + CompanyId;
    return this.http.get(formURL);
  }

  getAddon(CompanyId) {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "Addon/GetAddOn?CompanyId=" + CompanyId;
    return this.http.get(formURL);
  }
  GetRpt(Id) {
    return this.http.get(this.base_url + "SalesRpt/Get?Id=" + Id);
  }
  GetSalesRpt(Id, frmdate, todate, CompanyId, sourceId) {
    // console.log(CompanyId)
    // console.log(todate)
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "DayWiseSalesRpt/GetRpt?frmdate=" + frmdate + "&todate=" + todate + "&Id=" + Id + "&companyId=" + CompanyId + "&sourceId=" + sourceId;
    return this.http.get(formURL);

  }
  GetSalesRpt5(Id, frmdate, todate, CompanyId, ParentCatId, sourceId) {
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "CategorywiseRpt/GetCategRpt?frmdate=" + frmdate + "&todate=" + todate + "&Id=" + Id + "&companyId=" + CompanyId + "&ParentCatId=" + ParentCatId + "&sourceId=" + sourceId;
    return this.http.get(formURL);

  }

  catSales(storeId, frmdate, todate, CompanyId, categoryId, Id) {
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "CategorywiseRpt/GetCategRpt?Id=" + storeId + "&frmdate=" + frmdate + "&todate=" + todate + "&companyId=" + CompanyId + "&ParentCatId=" + categoryId + "&sourceId=" + Id;
    return this.http.get(formURL);

  }

  GetSalesRpt6(categoryId, frmdate, todate, CompanyId, sourceId, productId, tagId) {
    // console.log(productId + "productId")
    // console.log(categoryId + "categoryId")
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "StorewiseRpt/GetStoreRpt?frmdate=" + frmdate + "&todate=" + todate + "&categoryId=" + categoryId + "&companyId=" + CompanyId + "&sourceId=" + sourceId + "&productId=" + productId + "&tagId=" + tagId;
    return this.http.get(formURL);

  }


  GetSalesRpt1(Id, frmdate, todate, compId, sourceId) {
    // console.log(frmdate)
    // console.log(todate)
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "OrderWise/GetRpt?frmdate=" + frmdate + "&todate=" + todate + "&Id=" + Id + "&compId=" + compId + "&sourceId=" + sourceId;
    return this.http.get(formURL);
  }
  GetOrderWiseSalesRpt(Id, frmdate, todate, compId) {
    // console.log(frmdate)
    // console.log(todate)
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "OrderWise/GetRpt?frmdate=" + frmdate + "&todate=" + todate + "&Id=" + Id + "&compId=" + compId;
    return this.http.get(formURL);
  }
  GetTransactionRpt(Id, frmdate, todate, compId, sourceId, paymentId) {
    // console.log(frmdate)
    // console.log(todate)
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "TransactionRpt/GetRpt?frmdate=" + frmdate + "&todate=" + todate + "&Id=" + Id + "&compId=" + compId + "&sourceId=" + sourceId + "&PaymentId=" + paymentId;
    return this.http.get(formURL);
  }
  GetproductRpt(Id, frmdate, todate, compId, categoryId, sourceId, tagId, datatype) {
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "productwise/GetRpt?frmdate=" + frmdate + "&todate=" + todate + "&Id=" + Id + "&compId=" + compId + "&categoryId=" + categoryId + "&sourceId=" + sourceId + "&tagId=" + tagId + "&datatype=" + datatype;
    return this.http.get(formURL);

  }
  GetOptions(companyid) {
    var url = this.base_url + "OptionGroup/GetOptions?companyid=" + companyid;
    return this.http.get(url);
  }
  GetStoreName(CompanyId) {
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "Stores/Get?CompanyId=" + CompanyId;
    return this.http.get(formURL);

  }
  GetStoreName1(CompanyId) {
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "Stores/Get?CompanyId=" + CompanyId;
    return this.http.get(formURL);

  }
  GetStoreName2(CompanyId) {
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "Stores/Get?CompanyId=" + CompanyId;
    return this.http.get(formURL);
  }
  GetStoreName3(CompanyId) {
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "Stores/Get?CompanyId=" + CompanyId;
    return this.http.get(formURL);
  }
  Getoptgp(CompanyId) {
    var formURL = this.base_url;
    var formURL =
      this.base_url + ""
  }
  getStores(compId) {
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "Stores/Get?CompanyId=" + compId;
    return this.http.get(formURL);

  }
  GetRole(CompanyId) {
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "Role/Get?CompanyId=" + CompanyId;
    return this.http.get(formURL);

  }
  getUser(CompanyId) {
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "User/Get?companyId=" + CompanyId;
    return this.http.get(formURL);

  }

  createAddon(formdata) {
    let body = this.toFormData(formdata);
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + "Addon/Create", body);
  }
  addDiscount(formdata) {
    let body = this.toFormData(formdata);
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + "DiscountRule/AddDiscount", body);
  }
  EditAddOn(Id) {
    return this.http.get(this.base_url + "Addon/GetById?Id=" + Id);
  }

  EditTaxGrp(Id) {
    return this.http.get(this.base_url + "TaxGroup/Edit?Id=" + Id);
  }
  EditDiscRule(Id) {
    return this.http.get(this.base_url + "DiscountRule/Edit?Id=" + Id);
  }
  EditAddchrgs(Id, CompanyId) {
    return this.http.get(this.base_url + "AdditionalCharges/Edit?Id=" + Id + "&CompanyId=" + CompanyId);
  }
  UpdateTax(formdata) {
    let body = this.toFormData(formdata);
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + "TaxGroup/Update", body);

  }
  UpdateDisct(formdata) {
    let body = this.toFormData(formdata);
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + "DiscountRule/Update", body);

  }
  UpdateAddchrgs(formdata) {
    let body = this.toFormData(formdata);
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + "AdditionalCharges/Update", body);

  }
  formArray(formdata) {
    let body = this.toFormData(formdata);
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + "Variant/Update", body);

  }
  formuser(formdata, CompanyId) {
    let body = this.toFormData(formdata);
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + "User/Add?CompanyId=" + CompanyId, body);
  }
  UpdateAddon(formdata) {
    let body = this.toFormData(formdata);
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + "Addon/Update", body);

  }
  Deletecat(Id) {
    return this.http.get(this.base_url + "Category/Delete?Id=" + Id);

  }
  Delete(Id) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('Id', Id);

    // console.log(this.base_url + "Variant/Delete");
    return this.http.get(this.base_url + "Variant/Delete?Id=" + Id);
  }
  DeleteAddon(Id) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('Id', Id);
    // console.log(this.base_url + "Addon/Delete");
    return this.http.get(this.base_url + "Addon/Delete?Id=" + Id);
  }

  Deletekotgrp(Id) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('Id', Id);
    // console.log(this.base_url + "KOTGroup/Delete");
    return this.http.get(this.base_url + "KOTGroup/Delete?Id=" + Id);
  }
  DeleteAddchrgs(Id) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('Id', Id);
    // console.log(this.base_url + "AdditionalCharges/Delete");
    return this.http.get(this.base_url + "AdditionalCharges/Delete?Id=" + Id);
  }

  DeleteTax(Id) {
    // console.log(this.base_url + "TaxGroup/Delete");
    return this.http.get(this.base_url + "TaxGroup/Delete?Id=" + Id);
  }
  DeleteDisc(Id) {
    // console.log(this.base_url + "DiscountRule/Delete");
    return this.http.get(this.base_url + "DiscountRule/Delete?Id=" + Id);
  }
  autoProduct(formdata) {
    let body = this.toFormData(formdata);
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + "Addon/GetProductlist", body);
  }
  addProd(formdata) {
    let body = this.toFormData(formdata);
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + "Addon/Create", body);

  }
  DeleteProduct(Id, CompanyId) {
    return this.http.get(this.base_url + "Product/Delete?Id=" + Id + "&CompanyId=" + CompanyId);
  }
  DeleteUser(Id) {
    return this.http.get(this.base_url + "User/Delete?Id=" + Id);
  }
  EditCat(data) {
    return data;
  }
  getStore() {
    return this.http.get("https://localhost:44383/api/Stores/Get")
  }
  getStrePrd(data, id) {
    return this.http.get(this.base_url + "Stores/GetData?prodId=" + data + "&storeId=" + id);
  }
  savestoreProduct(data) {
    let body = this.toFormData(data);
    // console.log(data);
    // console.log(body);
    return this.http.post(this.base_url + "Stores/Update", body);
  }
  getSave(CompanyId) {
    var formURL =
      this.base_url +
      "Stores/Get?CompanyId=" + CompanyId;
    return this.http.get(formURL);

  }
  saveProduct(formdata, image, Id, CompanyId) {
    let body = this.toFormData(formdata);
    // let imagedata = this.toFormData(image);
    // // console.log(formdata, Id);
    // console.log(body);
    body.append('image', image);
    // let pd_image = this.toFormData(image);
    // return;
    if (Id > 0) {
      return this.http.post(this.base_url + "Product/Update?CompanyId=" + CompanyId, body);
    }
    else {
      return this.http.post(this.base_url + "Product/AddProduct?CompanyId=" + CompanyId, body);
    }
  }
  imageupload(file) {
    var foemdata = this.toFormData(file);
    return;
    return this.http.post('https://localhost:44383/api/Product/ImageUpload', foemdata);
  }
  getProduct(id, compId) {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "Product/GetById?id=" + id + "&compId=" + compId;
    return this.http.get(formURL);
  }
  getTag(compId) {
    var formURL =
      this.base_url +
      "TagMapping/GetTag?compId=" + compId;
    return this.http.get(formURL);
  }
  saveTagMapping(formdata) {
    let body = this.toFormData(formdata);
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + "TagMapping/SaveTagMapping", body);
  }
  // getReceipt(CompanyId, StoreId) {
  //   return this.http.get(this.base_url + "Receipt/Get?compId=" + CompanyId + "&storeId=" + StoreId);
  // }
  transact(formdata) {
    let body = this.toFormData(formdata)
    return this.http.post(this.base_url + "Receipt/Pay", body);
  }
  getExpense() {
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "Transtype/Get";
    return this.http.get(formURL);

  }
  DeleteExpense(Id) {
    // console.log(this.base_url + "Transtype/Delete");
    return this.http.get(this.base_url + "Transtype/Delete?Id=" + Id);

  }
  getCustomerByPhone(Phone) {
    return this.http.get(this.base_url + "Customer/GetCustomerByPhone?Phone=" + Phone);
  }
  GetVar() {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "Category/CatVariant";
    return this.http.get(formURL);

  }
  saveCategory(formdata) {
    let body = this.toFormData(formdata);
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + "Category/SaveData", body);
  }
  updateCat(formdata) {
    let body = this.toFormData(formdata);
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + "Category/Update", body);

  }
  importProduct(formdata, Id) {
    let body = this.toFormData(formdata);
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + "Product/ImportProduct?companyId=" + Id, body, {
      headers: new HttpHeaders({
        // "APIKey": "5567GGH67225HYVGG",
        // "Content-Type": "application/json"
      })
    });

  }
  getOption(companyId) {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "OptionGroup/Get?companyId=" + companyId;
    return this.http.get(formURL);

  }
  saveoption(formdata) {
    let body = this.toFormData(formdata);
    return this.http.post(this.base_url + "OptionGroup/CreateOption", body);
  }
  EditOption(Id) {
    return this.http.get(this.base_url + "OptionGroup/GetById?Id=" + Id);
  }
  Updateoption(formdata) {
    let body = this.toFormData(formdata);
    return this.http.post(this.base_url + "OptionGroup/Update", body);
  }
  DeleteOption(Id) {
    return this.http.get(this.base_url + "OptionGroup/Delete?Id=" + Id);
  }
  getPrinter() {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "Printer/Get";
    return this.http.get(formURL);
  }
  getUserdata(companyId) {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "Company/Index?companyId=" + companyId;
    return this.http.get(formURL);
  }
  saveCompany(formdata) {
    let body = this.toFormData(formdata);
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + "Company/SaveData", body);
  }
  savePrefer(formdata) {
    let body = this.toFormData(formdata);
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + "Preference/Savedata", body);
  }
  getprefdata(companyId) {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "Preference/Get?companyId=" + companyId;
    return this.http.get(formURL);

  }
  GetUrban(companyId) {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "UrbanPiper/GetIndex?companyId=" + companyId;
    return this.http.get(formURL);

  }
  updatepiper(formdata) {
    let body = this.toFormData(formdata);
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + "UrbanPiper/Update", body);
  }
  urbandata(companyId) {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "UrbanPiperStores/GetIndex?companyId=" + companyId;
    return this.http.get(formURL);
  }
  GetUpStoresById(Id) {
    return this.http.get(this.base_url + "UrbanPiperStores/GetById?Id=" + Id);
  }
  GetBrand(companyId) {
    return this.http.get(this.base_url + "Brand/GetBrand?companyId=" + companyId);
  }
  Getitem(storeId, CompanyId, brandId) {
    // console.log(storeId);
    return this.http.get(this.base_url + "UrbanPiper/GetPrd?Id=" + storeId + "&compId=" + CompanyId + "&brandId=" + brandId);
  }
  updatepipe(formdata) {
    let body = this.toFormData(formdata);
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + "UrbanPiperStores/Update", body);
  }
  enable_disable(enable, disable) {
    var data = "{\t\"location_ref_id\": \"1234567892584\",\t\"platforms\": [\"zomato\"],\t\"action\": \"enable\"}"
    // // console.log(platformData);
    return this.http.get(this.base_url + "UrbanPiper/StoreAction?enable=" + enable + "&disable=" + disable);

  }
  AddStore(jstring) {
    var data = "{\"stores\":[{\"city\":\"Chennai\",\"name\":\"FBCakes2\",\"min_pickup_time\":900,\"min_delivery_time\":1800,\"contact_phone\":\"98234566222\",\"notification_phones\":[\"+919134345345\",\"98234566778\"],\"ref_id\":\"1234567892584\",\"min_order_value\":200,\"hide_from_ui\":false,\"address\":\"60, RGM Complex, OMR Road, Karapakkam\",\"notification_emails\":[\"b1@mail.com\",\"b2@mail.com\"],\"zip_codes\":[\"560033\",\"560022\"],\"geo_longitude\":80.2291568,\"active\":true,\"geo_latitude\":12.9137880,\"ordering_enabled\":true}],\"translations\":[{\"language\":\"fr\", \"name\":\"c\'est un magasin\"}]}"
    // console.log(jstring);
    var companyid = JSON.parse(localStorage.getItem("loginInfo")).CompanyId;
    return this.http.get(this.base_url + "UrbanPiper/AddStore?value=" + jstring + "&companyId=" + companyid);
  }
  tasktest() {
    return this.http.get(this.base_url + "Values/task");
  }
  storeAction(jstring) {
    var data = "{\"stores\":[{\"city\":\"Chennai\",\"name\":\"FBCakes2\",\"min_pickup_time\":900,\"min_delivery_time\":1800,\"contact_phone\":\"98234566222\",\"notification_phones\":[\"+919134345345\",\"98234566778\"],\"ref_id\":\"1234567892584\",\"min_order_value\":200,\"hide_from_ui\":false,\"address\":\"60, RGM Complex, OMR Road, Karapakkam\",\"notification_emails\":[\"b1@mail.com\",\"b2@mail.com\"],\"zip_codes\":[\"560033\",\"560022\"],\"geo_longitude\":80.2291568,\"active\":true,\"geo_latitude\":12.9137880,\"ordering_enabled\":true}],\"translations\":[{\"language\":\"fr\", \"name\":\"c\'est un magasin\"}]}"
    let body = this.toFormData(jstring)
    var companyid = JSON.parse(localStorage.getItem("loginInfo")).CompanyId;
    return this.http.post(this.base_url + "UrbanPiper/StoreAction?companyId=" + companyid, body);
  }
  catalogue(catalogue, storeId, brandId) {
    // console.log(catalogue);
    let body = this.toFormData(catalogue);
    var companyid = JSON.parse(localStorage.getItem("loginInfo")).CompanyId;
    return this.http.post(this.base_url + "UrbanPiper/Catalouge?storeId=" + storeId + "&BrandId=" + brandId + "&companyId=" + companyid, body);
  }
  bulksync(catalogue, companyid) {
    let body = this.toFormData(catalogue);
    var companyid = JSON.parse(localStorage.getItem("loginInfo")).CompanyId;
    return this.http.post(this.base_url + "UrbanPiper/BulkCatalogue?" + "&companyId=" + companyid, body);
  }
  items(item) {
    // console.log(item)
    let body = this.toFormData(item);
    var companyid = JSON.parse(localStorage.getItem("loginInfo")).CompanyId;
    return this.http.post(this.base_url + "UrbanPiper/ItemAction?companyId=" + companyid, body);
  }
  storeitemaction(formdata, brandId) {
    let body = this.toFormData(formdata);
    return this.http.post(this.base_url + "Stores/itemaction?BrandId=" + brandId, body);
  }
  ///////////////////URBANPIPER
  UpdateProductUPPrice(frormdata) {
    let body = this.toFormData(frormdata);
    return this.http.post(this.base_url + "UrbanPiperStores/StoreProduct", body);
  }
  GetPrice(StoreId) {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "StoreData/GetPrice?storeId=" + StoreId;
    return this.http.get(formURL);
  }
  Updatepricebook(formdata) {
    let body = this.toFormData(formdata);
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + "StoreData/Update", body);
  }
  Updateoptionbook(formdata) {
    let body = this.toFormData(formdata);
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + "StoreData/UpdateOption", body);
  }
  GetStores(CompanyId) {
    var formURL =
      this.base_url +
      "Stores/Get?CompanyId=" + CompanyId;
    return this.http.get(formURL);
  }
  getdining(companyId) {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "DiningArea/Get?companyId=" + companyId;
    return this.http.get(formURL);
  }
  addtable(formdata) {
    let body = this.toFormData(formdata);
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + "DiningArea/CreateArea", body);
  }
  EditTable(Id) {
    return this.http.get(this.base_url + "DiningArea/GetById?Id=" + Id);
  }
  UpdateTable(formdata) {
    let body = this.toFormData(formdata);
    return this.http.post(this.base_url + "DiningArea/Update", body);
  }
  deleteArea(Id) {
    return this.http.get(this.base_url + "DiningArea/Delete?Id=" + Id);
  }
  UpdateOptionUPPrice(formdata) {
    let body = this.toFormData(formdata);
    return this.http.post(this.base_url + "UrbanPiperStores/StoreOption", body);
  }
  Getprddata(Id, frmdate, todate, companyId, sourceId, categoryId, tagId) {
    return this.http.get(this.base_url + "StorewiseRpt/StorePrd?Id=" + Id + "&frmdate=" + frmdate + "&todate=" + todate + "&companyId=" + companyId + "&sourceId=" + sourceId + "&categoryId=" + categoryId + "&tagId=" + tagId);
  }
  GetStorewiseRpt(frmdate, todate, compId) {
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "StoreRpt/GetStoreRpt?frmdate=" + frmdate + "&todate=" + todate + "&companyId=" + compId;
    return this.http.get(formURL);

  }
  getParams(raw_obj) {
    let params = new HttpParams();
    params.set("_id", "q7we7eq")
    Object.keys(raw_obj).forEach(key => {
      // console.log(key, raw_obj[key])
      if (raw_obj[key])
        params.set(key, raw_obj[key])
      console.log(key, raw_obj[key], params.get(key))
    })
    return params
  }
  TimeSalesRpt(storeId, frmdate, todate, fromTime, toTime, interval, sourceId, productId, categoryId, saleproductgroupid, companyid) {
    console.log(storeId, frmdate, todate, fromTime, toTime, interval, sourceId, productId, categoryId)
    // let params = new BizParams({ storeId, frmdate, todate, fromTime, toTime, interval, sourceId, productId, categoryId })
    const formURL =
      this.base_url +
      "TimeWiseRpt/GetRpt?frmdate=" + frmdate + "&todate=" + todate + "&fromTime=" + fromTime + "&toTime=" + toTime + "&storeId=" + storeId + "&interval=" + interval + "&sourceId=" + sourceId + "&productId=" + productId + "&categoryId=" + categoryId + '&saleproductgroupid=' + saleproductgroupid + "&companyid=" + companyid;
    // console.log(params_obj, this.getParams(params_obj).toString())
    // const url = this.base_url + "TimeWiseRpt/GetRpt"
    // const formURL = this.base_url + "TimeWiseRpt/GetRpt" + params.stringify()
    return this.http.get(formURL);
  }

  getTimeWiseProducts(storeId, frmdate, todate, fromTime, toTime, sourceId, productId, saleproductgroupid, companyid) {
    const formURL =
      this.base_url +
      "TimeWiseRpt/GetReportProducts?frmdate=" + frmdate + "&todate=" + todate + "&fromTime=" + fromTime + "&toTime=" + toTime + "&storeId=" + storeId + "&sourceId=" + sourceId + "&productId=" + productId + '&saleproductgroupid=' + saleproductgroupid + "&companyid=" + companyid;
    return this.http.get(formURL);
  }

  OrderTypeRreport(fromDate, toDate, storeId, companyId, ordertypeid) {
    const url = this.base_url + "Report/OrderTypeReport?fromDate=" + fromDate + "&toDate=" + toDate + "&storeId=" + storeId + "&companyId=" + companyId + "&ordertypeid=" + ordertypeid
    return this.http.get(url)
  }

  MonthSalesRpt(Id, frmdate, todate, sourceId, grpby, companyId, categoryId, productId) {
    console.log(Id, frmdate, todate, sourceId)
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "Monthwise/GetRpt?frmdate=" + frmdate + "&todate=" + todate + "&companyId=" + companyId + "&groupBy=" + grpby + "&storeId=" + Id + "&sourceId=" + sourceId + "&categoryId=" + categoryId + "&productId=" + productId;
    return this.http.get(formURL);
  }

  updateactive(Id, active, CompanyId) {
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "Category/UpdateAct?Id=" + Id + "&active=" + active + "&CompanyId=" + CompanyId;
    return this.http.get(formURL);
  }

  storeactive(Id, active) {
    console.log(Id, active)
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "Stores/UpdateAct?Id=" + Id + "&active=" + active;
    return this.http.get(formURL);

  }
  optactive(Id, active) {
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "OptionGroup/UpdateAct?Id=" + Id + "&active=" + active;
    return this.http.get(formURL);

  }
  prdactive(Id, active) {
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "Product/UpdateAct?Id=" + Id + "&active=" + active;
    return this.http.get(formURL);

  }
  getpaymt() {
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "TransactionRpt/Payment";
    return this.http.get(formURL);
  }
  GetOrdRpt(frmdate, todate, CompanyId, sourceId, storeId) {
    console.log(frmdate, todate, CompanyId, sourceId, storeId)
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "CancelordRpt/GetRpt?frmDate=" + frmdate + "&todate=" + todate + "&CompanyId=" + CompanyId + "&sourceId=" + sourceId + "&storeId=" + storeId;
    return this.http.get(formURL);

  }
  gettimeprd(CompanyId, frmdate, todate, sourceId, storeId, starttime, endtime) {
    console.log(starttime, endtime)
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "TimeWiseRpt/GetPrdRpt?frmDate=" + frmdate + "&todate=" + todate + "&CompanyId=" + CompanyId + "&sourceId=" + sourceId + "&storeId=" + storeId + "&fromTime=" + starttime + "&toTime=" + endtime;
    return this.http.get(formURL);

  }
  getupprd(CompanyId, CategoryId) {
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "UPPrdRpt/GetPrdRpt?CompanyId=" + CompanyId + "&CategoryId=" + CategoryId;
    return this.http.get(formURL);
  }
  get_optiongrp(companyid) {
    return this.http.get(this.base_url + "OptionGroup/Get?CompanyId=" + companyid);
  }
  getOptions(companyid) {
    return this.http.get(this.base_url + "OptionGroup/GetOptions?companyid=" + companyid);
  }
  optionreport(payload) {
    console.log(payload)
    var formdata = this.toFormData(payload)
    return this.http.post(this.base_url + "Report/OptionReport", payload)
  }
  getoptionproduct(companyid) {
    return this.http.get(this.base_url + "Product/OptionProducts?companyid=" + companyid)
  }
  ordertypereport(fromdate, todate, companyid) {
    return this.http.get(this.base_url + `Report/OrderTypeReport?fromdate=${fromdate}&todate=${todate}&companyid=${companyid}`);
  }
  getOrderwebhooks(options) {
    var formdata = this.toFormData(options);
    return this.http.post("https://biz.urbanpiper.com/portal/76312844/webhooks/3736/_webhook_deliveries/lookup/", formdata);
  }
  getStatuswebhooks(options) {
    var formdata = this.toFormData(options);
    return this.http.post("https://biz.urbanpiper.com/portal/76312844/webhooks/3738/_webhook_deliveries/lookup/", formdata);
  }
  getwebhookdata(delivery_id) {
    return this.http.get("https://biz.urbanpiper.com/portal/76312844/webhook/?delivery_id=" + delivery_id);
  }
  test() {
    return this.http.get("https://jsonplaceholder.typicode.com/todos");
  }

  getpaymenttypes(companyid) {
    return this.http.get(this.base_url + "PaymentType/getpaymenttypes?companyid=" + companyid);
  }
  getstorepaymentsbytype(storeid, companyid, from, to) {
    return this.http.get(this.base_url + `Receipt/storepaymentsbytype?storeid=${storeid}&companyid=${companyid}&from=${from}&to=${to}`);
  }
  gettransactionsbytype(storeid, companyid, from, to, sourceid, ptypeid) {
    return this.http.get(this.base_url + `Receipt/transactionsbytype?storeid=${storeid}&companyid=${companyid}&from=${from}&to=${to}&sourceid=${sourceid}&ptypeid=${ptypeid}`);
  }
  savetransaction(transaction) {
    return this.http.post(this.base_url + `Receipt/saveTransaction`, transaction)
  }
  getusercompanies(userid) {
    return this.http.get(this.base_url + `Dashboard/GetUserCompanies?userid=${userid}`);
  }
  getdashboardbycompany(fromdate, totdate, companyid, storeid) {
    return this.http.get(this.base_url + `Dashboard/Post?fromDate=${fromdate}&toDate=${totdate}&compId=${companyid}&storeId=${storeid}`);
  }
  getReceipt(storeId, companyId, startId, Type, dataType, fromdate, todate, invoice) {
    return this.http.get(
      this.base_url +
      'Receipt/Get?StoreId=' +
      storeId +
      '&CompanyId=' +
      companyId +
      '&StartId=' +
      startId +
      '&type=' +
      Type +
      '&dataType=' +
      dataType +
      '&fromdate=' +
      fromdate +
      '&todate=' +
      todate +
      '&invoice=' +
      invoice,
    )
  }
  getorderbyinvoice(invoiceno, companyId) {
    return this.http.get(this.base_url + `POSOrder/getorderbyinvoiceno?invoiceno=${invoiceno}&companyId=${companyId}`);
  }
  cancelorder(orderid, payload) {
    return this.http.post(this.base_url + `POSOrder/cancellorder?orderid=${orderid}`, payload);
  }
  updateorder(payload) {
    return this.http.post(this.base_url + 'POSOrder/updateorder_2', payload)
  }
  updateuporder(orderid, payload) {
    return this.http.post(this.base_url + 'UrbanPiper/updateuporder?orderid=' + orderid, payload)
  }
  getSaleProducts(companyid) {
    return this.http.get(this.base_url + "SaleProductGroup/GetSaleProducts?companyid=" + companyid)
  }
  getproductsNoptions(companyid, catId, desc) {
    return this.http.get(this.base_url + `SaleProductGroup/GetProductsNoptions?companyid=${companyid}&catId=${catId}&desc=${desc}`);
  }
  saveSaleProdGroup(formdata) {
    let body = this.toFormData(formdata);
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + "SaleProductGroup/Save", body);
  }
  GetSaleProdGroupRpt(Id, frmdate, todate, compId, sourceId, saleProdId) {
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "SaleProductGroupwise/GetRpt?frmdate=" + frmdate + "&todate=" + todate + "&Id=" + Id + "&compId=" + compId + "&sourceId=" + sourceId + "&saleProdId=" + saleProdId;
    return this.http.get(formURL);

  }

  GetStockPrdwise(frmdate, todate, saleProdId, compId, sourceId, storeId, type) {
    var formURL = this.base_url;
    var formURL =
      this.base_url +
      "SaleProductGroupwise/GetStockPrdwise?frmdate=" + frmdate + "&todate=" + todate + "&saleProdId=" + saleProdId +
      "&compId=" + compId + "&sourceId=" + sourceId + "&storeId=" + storeId + "&type=" + type;
    return this.http.get(formURL);

  }
  fetchDenominationEntries(storeid, date, companyid, entrytypeid) {
    return this.http.get(this.base_url + `Denomination/getDenomEntry?storeid=${storeid}&date=${date}&companyid=${companyid}&entrytypeid=${entrytypeid}`)
  }
  GetChildProds(saleProdId, compId) {
    return this.http.get(this.base_url + `SaleProductGroup/GetChildProds?saleProdId=${saleProdId}&compId=${compId}`);

  }
  DeliveryOrderReport(storeid, companyid, fromdate, todate, invoiceno) {
    return this.http.get(this.base_url + `Report/DeliveryOrderReport?storeid=${storeid}&companyid=${companyid}&fromdate=${fromdate}&todate=${todate}&invoiceno=${invoiceno}`);
  }
  savepredefinedqtys(prodid, qtys) {
    return this.http.post(this.base_url + `Product/UpdatePredefQtys?productid=${prodid}`, qtys);
  }

  getlocalorders() {
    return this.http.post(this.pos_url + "getdbdata", ["tableorders", "loginfo"])
  }

  copyCategoryToSaleProductGroup(companyid, selectedIds) {
    return this.http.post(this.base_url + "Category/CopyToSaleProductGroup?companyId=" + companyid, selectedIds)
  }
  // GetproductRpt(Id, frmdate, todate, compId, categoryId, sourceId) {
  //   var formURL = this.base_url;
  //   var formURL =
  //     this.base_url +
  //     "productwise/GetRpt?frmdate=" + frmdate + "&todate=" + todate + "&Id=" + Id + "&compId=" + compId + "&categoryId=" + categoryId + "&sourceId=" + sourceId;
  //   return this.http.get(formURL);

  // }


  // getProduct(id,compId,storeId)
  // {
  //   let headers = new Headers({ "Content-Type": "application/json" });
  //   let options = new RequestOptions({ headers: headers });
  //   var formURL = this.base_url;
  //   //log-in?user_name=163&password=163
  //   var formURL =
  //     this.base_url +
  //     "Product/GetById?id="+id+"&compId="+compId+"&storeId="+storeId;
  //   return this.http.get(formURL);
}

class BizParams {
  paramas: any
  constructor(paramobj = {}) {
    this.paramas = paramobj
    console.log(this.paramas)
  }

  set(key: string, value: any) {
    this.paramas[key] = value.toString()
  }

  stringify() {
    var paramString = '?'
    Object.keys(this.paramas).forEach((key, ind, keys) => {
      console.log(key, this.paramas[key], paramString)
      paramString = paramString + key + '=' + this.paramas[key] + (ind == keys.length - 1) ? '' : '&'
    })
    return paramString
  }
}
