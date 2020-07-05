import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EditProduct } from './../edit-product/edit.model';

@Component({
  selector: 'app-edit-attribute',
  templateUrl: './edit-attribute.component.html',
  styleUrls: ['./edit-attribute.component.css']
})
export class EditAttributeComponent implements OnInit {
  @Input() productModel: any;
  @Input() editProductModel: any;
  @Input() attributeModel: any;
  @Input() categoryAttributeModel: any;
  @Output() editAttributeCat = new EventEmitter<any>();
  @Output() updateAttributeValue = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  editAttribute() {
    this.editProductModel = new EditProduct();
    this.editProductModel.attributeEdit = true;
    this.editAttributeCat.emit();
  }
  cancelAttribute() {
    this.editProductModel = new EditProduct();
    this.editProductModel.attributeEdit = false;
  }
  selectedAttribute(e, field) {
    this.categoryAttributeModel.forEach(element => {
      if (element.fieldName === field) {
       /*  console.log(element); */
        this.productModel.attribute.forEach(a => {
           if (element._id === a.attributeId) {
             element.fieldValue.forEach(b => {
               if (b.fieldAttributeValue === e.value) {
                /*  console.log('final', b); */
                 a.attributeFieldId = b._id;
                 a[field] = b.fieldAttributeValue;
               }
             });
           }
      });
      }

    });
   /*  console.log('after', this.productModel.attribute);
    console.log(e.value);
    console.log(field); */
  }
  onKey(event, field) {
    console.log(event.target.value, field);
    this.productModel.attribute.forEach(e => {
      console.log(e[field] === true);
      if (e.hasOwnProperty(field)) {
       /*  console.log(e); */
       e[field] = event.target.value;
      }
    }); 
   /*  console.log(this.productModel.attribute); */
  }
  updateAttribute() {
    /* console.log(this.productModel.attribute); */
    this.updateAttributeValue.emit(this.productModel.attribute);
  }
}
