import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSetting } from '../config/appSetting';
import { Observable } from 'rxjs';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable({
  providedIn: 'root'
})
export class ReportService {
  commerceServiceUrl: string = AppSetting.commerceOrderServiceUrl;
  customerServiceUrl: string = AppSetting.customerSerivceUrl;
  constructor(private httpClient: HttpClient) { }

  getOrder(): Observable<any> {
    const salesUrl = 'getOrders';
    const url: string = this.commerceServiceUrl + salesUrl;
    return this.httpClient.get<any>(url);
  }
  getOrderOfRecent(): Observable<any> {
    const salesUrl = 'getordersofrecent';
    const url: string = this.commerceServiceUrl + salesUrl;
    return this.httpClient.get<any>(url);
  }
  getOrderTotalAmountByCustomer(): Observable<any> {
    const salesUrl = 'gethighesttotatbyuser';
    const url: string = this.commerceServiceUrl + salesUrl;
    return this.httpClient.get<any>(url);
  }
  getOrderTotalAmountByBetweenDate(date): Observable<any> {
    const salesUrl = 'gethighesttotatbybetweendate';
    const url: string = this.commerceServiceUrl + salesUrl;
    return this.httpClient.post<any>(url, date);
  }
  getOrderBetweenDate(date): Observable<any> {
    const salesUrl = 'getorderbetweentwodate';
    const url: string = this.commerceServiceUrl + salesUrl;
    return this.httpClient.post<any>(url, date);
  }
  getCustomerDetailForReport(cusomterId): Observable<any> {
    const salesUrl = 'getcusomerdetailforreport';
    const url: string = this.customerServiceUrl + salesUrl;
    return this.httpClient.post<any>(url, cusomterId);
  }

  // excel download   

  exportAsExcelFile(json: any[], excelFileName: string) {
    try {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { sheet1 : worksheet}, SheetNames: ['sheet1'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }    catch (Error) {
    alert(Error);
}
}
saveAsExcelFile(buffer: any, fileName: string): void {
  const data: Blob = new Blob([buffer], {
    type: EXCEL_TYPE
  });
  FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
}
}
