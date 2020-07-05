import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { ActivatedRoute, Router, Data } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent implements OnInit {
  @ViewChild('lineChart', {static: true}) private chartRef;
  @ViewChild('orderChart', {static: true}) private orderChartRef;
  vendorCount;
  productCount: any;
  inventoryCount: any;
  categoryWiseCount: any;
  poCount: any;
  outOfStock: any;
  customerChart: any;
  month = [{ id: 1, name: 'Jan', count: 0 }, { id: 2, name: 'Feb', count: 0 }, { id: 3, name: 'Mar', count: 0 },
  { id: 4, name: 'Apr', count: 0 }, { id: 5, name: 'May', count: 0 }, { id: 6, name: 'Jun', count: 0 },
  { id: 7, name: 'Jul', count: 0 }, { id: 8, name: 'Aug', count: 0 }, { id: 9, name: 'Sep', count: 0 },
  { id: 10, name: 'Oct', count: 0 }, { id: 11, name: 'Nov', count: 0 }, { id: 12, name: 'Dec', count: 0 }];
  orderMonth = [{ id: 1, name: 'Jan', count: 0 }, { id: 2, name: 'Feb', count: 0 }, { id: 3, name: 'Mar', count: 0 },
  { id: 4, name: 'Apr', count: 0 }, { id: 5, name: 'May', count: 0 }, { id: 6, name: 'Jun', count: 0 },
  { id: 7, name: 'Jul', count: 0 }, { id: 8, name: 'Aug', count: 0 }, { id: 9, name: 'Sep', count: 0 },
  { id: 10, name: 'Oct', count: 0 }, { id: 11, name: 'Nov', count: 0 }, { id: 12, name: 'Dec', count: 0 }];
  chart: any;
  orderChart: any;
  orderChartData: any;
  orderCount: any;
  customerCount: any;
  constructor(private dashboadService: DashboardService, private activatedRoute: ActivatedRoute) {  }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: Data) => {
      this.vendorCount = data.vendorCount;
      this.productCount = data.productCount;
      this.inventoryCount = data.inventoryQty.length === 0 ? 0 : data.inventoryQty[0].totalAmount;
      this.categoryWiseCount = data.categoryWiseCount;
      this.poCount = data.poCount;
      this.outOfStock = data.outOfStock.length === 0 ? 0 : data.outOfStock[0].outOfStock;
      this.customerChart = data.customerDate.filter(a => a.date !== undefined);
      this.orderChart = data.orderDate;
      this.orderCount = this.orderChart.length;
      this.customerCount = this.customerChart.length;
      console.log(this.customerCount);
  });
    this.setCustomerCart();
    this.setOrderChart();
}
setCustomerCart() {
  for (const data of this.customerChart) {
    const d = new Date (data.date);
    data.m = d.getMonth() + 1;
    if (this.month.find(e => e.id === data.m )) {
      this.customerChart.filter(t => t.m === data.m);
      for (const c of this.month) {
      if (c.id === data.m) {
      c.count = this.customerChart.filter(t => t.m === data.m ).length;
    }
     }
    }
}
  this.getChart();
}
setOrderChart() {
  for (const data of this.orderChart) {
    const d = new Date (data.orderDate);
    data.m = d.getMonth() + 1;
    if (this.orderMonth.find(e => e.id === data.m )) {
      this.orderChart.filter(t => t.m === data.m);
      for (const c of this.orderMonth) {
      if (c.id === data.m) {
      c.count = this.orderChart.filter(t => t.m === data.m ).length;
    }
     }
    }
}
  this.getOrderChart();
}
getChart() {
  this.chart = new Chart(this.chartRef.nativeElement, {
    type: 'line',
    data: {
      labels: this.month.map(id => id.name), // your labels array
      datasets: [
        {
          data: this.month.map(id => id.count), // your data array
          /* borderColor: 'red', */
          fill: false,
         /*  backgroundColor: "#e755ba", */
          backgroundColor: [ 'rgba(117, 201, 196,0.4)',
           'rgba(117, 201, 196,0.4)', 'rgba(117, 201, 196,0.4)',
           'rgba(117, 201, 196,0.4)', 'rgba(117, 201, 196,0.4)',
           'rgba(117, 201, 196,0.4)', 'rgba(117, 201, 196,0.4)',
           'rgba(117, 201, 196,0.4)', 'rgba(117, 201, 196,0.4)',
           'rgba(117, 201, 196,0.4)' ],
          borderColor: "#45a249",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: [ "#00d6b4", "#00d6b4", "#00d6b4", "#00d6b4", "#00d6b4", "#00d6b4", "#00d6b4", "#00d6b4", "#00d6b4", "#00d6b4" ],
          pointBackgroundColor: [ "#d41111", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff" ],
          pointBorderWidth: 5,
          pointHoverRadius: 10,
          pointHoverBackgroundColor: [ "red", "rgb(117, 201, 196)", "rgb(117, 201, 196)", "rgb(117, 201, 196)", "rgb(117, 201, 196)", "rgb(117, 201, 196)", "rgb(117, 201, 196)", "rgb(117, 201, 196)", "rgb(117, 201, 196)", "rgb(117, 201, 196)" ],
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
          pointHitRadius: 10,
        }
      ]
    },
    options: {
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          display: true
        }],
        yAxes: [{
          display: true
        }],
      }
    }
  });
}

getOrderChart() {
  this.orderChartData = new Chart(this.orderChartRef.nativeElement, {
    type: 'line',
    data: {
      labels: this.orderMonth.map(id => id.name), // your labels array
      datasets: [
        {
          data: this.orderMonth.map(id => id.count), // your data array
          borderColor: '#20c2d6',
          fill: false
        }
      ]
    },
    options: {
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          display: true
        }],
        yAxes: [{
          display: true
        }],
      }
    }
  });
}
}
