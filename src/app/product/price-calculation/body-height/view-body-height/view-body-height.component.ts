import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BodyHeightService } from '../edit-body-height/body-height.service';

@Component({
  selector: 'app-view-body-height',
  templateUrl: './view-body-height.component.html',
  styleUrls: ['./view-body-height.component.css']
})
export class ViewBodyHeightComponent implements OnInit {
  holder: any;

  constructor(private productService: ProductService, private router: Router, private bodyHeightService: BodyHeightService) {
    this.getAllBodyHeight();
  }

  ngOnInit() {
  }
  getAllBodyHeight() {
    this.productService.getAllBodyHeight().subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
  onAdd() {
    this.router.navigate(['product/addbodyheight']);
  }
  onEdit(height) {
    this.bodyHeightService.edit(height).subscribe( data => {
      if (data) {
        this.holder = data;
      }
    });
  }
  onDelete(id) {
    this.productService.deleteSingleBodyHeight(id).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
}
