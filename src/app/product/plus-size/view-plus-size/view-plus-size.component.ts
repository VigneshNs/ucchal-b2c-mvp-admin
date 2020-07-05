import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';
import { Router } from '@angular/router';
import { PlusSizeService } from '../add-plus-size/plus-size.service';
@Component({
  selector: 'app-view-plus-size',
  templateUrl: './view-plus-size.component.html',
  styleUrls: ['./view-plus-size.component.css']
})
export class ViewPlusSizeComponent implements OnInit {
  holder: any;

  constructor(private productService: ProductService, private router: Router ,
              private plusSizeService: PlusSizeService) {
    this.getAllPlusSize();
  }

  ngOnInit() {
  }
  getAllPlusSize() {
    this.productService.getPlusSize().subscribe(data => {
      this.holder = data;
      console.log(this.holder);
    }, error => {
      console.log(error);
    });
  }
  addPlusSize() {
    this.plusSizeService.addPlusSize().subscribe(data => {
      if (data) {
        console.log(data);
        this.getAllPlusSize();
      }
    });
  }
  editPlusSize(plusSize) {
    console.log(plusSize);
    this.plusSizeService.editPlusSize(plusSize).subscribe(data => {
      if (data) {
        console.log(data);
        this.getAllPlusSize();
      }
    });
  }
  deletePlusSize(id) {
    this.productService.deleteSinglePlusSize(id).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
}
