import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../product.service';
import { SizeWiseIncrementService } from '../edit-size-wise-increment/size-wise-increment.service';

@Component({
  selector: 'app-view-size-wise-increment',
  templateUrl: './view-size-wise-increment.component.html',
  styleUrls: ['./view-size-wise-increment.component.css']
})
export class ViewSizeWiseIncrementComponent implements OnInit {
  holder: any;

  constructor(private productService: ProductService, private router: Router,
              private sizeWiseIncrementService: SizeWiseIncrementService) {
    this.getAllSizeWiseIncrement();
  }

  ngOnInit() {
  }
  getAllSizeWiseIncrement() {
    this.productService.getAllSizeWiseIncrement().subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
  onAdd() {
    this.router.navigate(['product/addsizewiseincrement']);
  }
  onEdit(size) {
    this.sizeWiseIncrementService.edit(size).subscribe(data => {
      if (data) {
        this.holder = data;
      }
    });
  }
  onDelete(id) {
    this.productService.deleteSingleSizeWiseIncrement(id).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
}
