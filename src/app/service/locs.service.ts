import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class LocsService {
  getData(name) {
    let Data = localStorage.getItem(name);
    var DataObj = JSON.parse(Data);
    return DataObj[0];
  }

  getDataall(name) {
    let Data = localStorage.getItem(name);
    return JSON.parse(Data);
  }

  setData(Key, Value) {
    localStorage.setItem(Key, JSON.stringify(Value));
  }

  setDataBykeyValue(Key, Value) {
    localStorage.setItem(Key, Value);
  }
  getDataBykey(Key) {
    return localStorage.getItem(Key);
  }

  RemoveKey(Key) {
    localStorage.removeItem(Key);
  }

  constructor() {}
}
