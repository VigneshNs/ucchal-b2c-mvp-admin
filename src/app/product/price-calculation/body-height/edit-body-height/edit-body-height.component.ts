import { Component, OnInit, ViewChild, ElementRef,  Optional, Injector, Inject } from '@angular/core';
import { ProductService } from '../../../product.service';
import { BodyHeight } from '../../../../shared/model/bodyHeight.model';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { MAT_DIALOG_DATA, TransitionCheckState, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-edit-body-height',
  templateUrl: './edit-body-height.component.html',
  styleUrls: ['./edit-body-height.component.css']
})
export class EditBodyHeightComponent implements OnInit {
  @ViewChild('height', {static: false}) inputData: ElementRef;
  id: string;
  holder: any;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              private productService: ProductService, private router: Router,
              private activatedRoute: ActivatedRoute,
              private dialog: MatDialogRef<EditBodyHeightComponent>
             ) {
   }

  ngOnInit() {
  }
  getSingleBodyHeight() {
    this.productService.getSingleBodyHeight(this.id).subscribe(data => {
      this.holder = data;
    }, error => {
      console.log(error);
    });
  }
  addSize(height) {
    this.data.height.push(height);
    this.inputData.nativeElement.value = '';
  }
  clear(height) {
    const index = this.data.height.indexOf(height);
    this.data.height.splice(index, 1);
  }
  onSubmit() {
    this.productService.updateBodyHeight(this.data, this.data._id).subscribe(data => {
      this.dialog.close(data);
    }, error => {
      console.log(error);
    });
  }
  onCancel() {
    this.dialog.close(false);
  }
}
