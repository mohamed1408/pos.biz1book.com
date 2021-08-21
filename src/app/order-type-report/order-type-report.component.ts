import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { AuthService } from '../auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataSource } from '@angular/cdk/table';

declare function setHeightWidth(): any;

export interface Report {
  Store: string;
  dineinsales: number;
  takeawaysales: number;
  deliverysales: number;
  pickupsales: number;
  countersales: number;
  swiggysales: number;
  zomatosales: number;
}

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

/** Constants used to fill up our data base. */
// const COLORS: string[] = [
//   'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
//   'aqua', 'blue', 'navy', 'black', 'gray'
// ];
// const NAMES: string[] = [
//   'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
//   'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
// ];

/**
 * @title Data table with sorting, pagination, and filtering.
 */

@Component({
  selector: 'app-order-type-report',
  templateUrl: './order-type-report.component.html',
  styleUrls: ['./order-type-report.component.css']
})

export class OrderTypeReportComponent implements OnInit {
  loginfo: any;
  report: Array<Report> = [];
  // displayedColumns: string[] = ['id', 'name', 'progress', 'color'];
  // dataSource: MatTableDataSource<UserData>;
  displayedColumns: string[] = ['Store', 'dineinsales', 'takeawaysales', 'deliverysales', 'pickupsales', 'countersales', 'swiggysales', 'zomatosales'];
  dataSource: MatTableDataSource<Report>;
  islight: boolean = false;
  public today: Date = new Date(new Date().toDateString());
  public weekStart: Date = new Date(new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 7) % 7)).toDateString());
  public weekEnd: Date = new Date(new Date(new Date().setDate(new Date(new Date().setDate((new Date().getDate()
    - (new Date().getDay() + 7) % 7))).getDate() + 6)).toDateString());
  public monthStart: Date = new Date(new Date(new Date().setDate(1)).toDateString());
  public monthEnd: Date = this.today;
  public lastStart: Date = new Date(new Date(new Date(new Date().setMonth(new Date().getMonth() - 1)).setDate(1)).toDateString());
  public lastEnd: Date = this.today;
  public yearStart: Date = new Date(new Date(new Date().setDate(new Date().getDate() - 365)).toDateString());
  public yearEnd: Date = this.today;
  public selected: Date[] = [this.today, this.today];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  constructor(private Auth: AuthService) {
    this.loginfo = JSON.parse(localStorage.getItem('loginInfo'));
    this.oredertypereport(moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'));
    // Create 100 users
    // const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    // console.log(users)
    // this.dataSource = new MatTableDataSource(users);
  }
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  ngOnInit() {
    setHeightWidth();
  }
  oredertypereport(startDate, endDate) {
    this.Auth.ordertypereport(startDate, endDate, this.loginfo.CompanyId).subscribe(data => {
      console.log(data);
      this.report = data["report"];
      this.report.forEach(element => {
        element.countersales = +(element.countersales.toFixed(2));
        element.dineinsales = +(element.dineinsales.toFixed(2));
        element.deliverysales = +(element.deliverysales.toFixed(2));
        element.pickupsales = +(element.pickupsales.toFixed(2));
        element.takeawaysales = +(element.takeawaysales.toFixed(2));
        element.swiggysales = +(element.swiggysales.toFixed(2));
        element.zomatosales = +(element.zomatosales.toFixed(2));
      });
      this.dataSource = new MatTableDataSource(this.report);
      // console.log(this.dataSource)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource)
      // console.log(this.dataSource1)
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    console.log(this.dataSource)
  }
  iscolumndisplayed(column) {
    return this.displayedColumns.some(x => x == column);
  }
  togglecolumn(column) {
    var displayedColumns: string[] = ['Store', 'dineinsales', 'takeawaysales', 'deliverysales', 'pickupsales', 'countersales', 'swiggysales', 'zomatosales'];
    var index = displayedColumns.findIndex(x => x == column);
    if (this.displayedColumns.some(x => x == column)) {
      this.displayedColumns = this.displayedColumns.filter(x => x != column);
    } else {
      this.displayedColumns.splice( index, 0, column );
    }
  }
  setdate(event) {
    this.oredertypereport(moment(event.startDate).format('YYYY-MM-DD'), moment(event.endDate).format('YYYY-MM-DD'))
  }
  getTotal() {
    var obj = { dinenin: 0, takeaway: 0, delivery: 0, pickup: 0, counter: 0, swiggy: 0, zomato: 0 }
    if (this.dataSource) {
      this.dataSource.filteredData.forEach(data => {
        obj.dinenin += +data.dineinsales;
        obj.takeaway += +data.takeawaysales;
        obj.delivery += +data.deliverysales;
        obj.pickup += +data.pickupsales;
        obj.counter += +data.countersales;
        obj.swiggy += +data.swiggysales;
        obj.zomato += +data.zomatosales;
      });
    }
    obj.dinenin = +obj.dinenin.toFixed(2);
    obj.takeaway = +obj.takeaway.toFixed(2);
    obj.delivery = +obj.delivery.toFixed(2);
    obj.pickup = +obj.pickup.toFixed(2);
    obj.counter = +obj.counter.toFixed(2);
    obj.swiggy = +obj.swiggy.toFixed(2);
    obj.zomato = +obj.zomato.toFixed(2);
    return obj;
  }
}

/** Builds and returns a new User. */
// function createNewUser(id: number): UserData {
//   const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

//   return {
//     id: id.toString(),
//     name: name,
//     progress: Math.round(Math.random() * 100).toString(),
//     color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
//   };
// }
