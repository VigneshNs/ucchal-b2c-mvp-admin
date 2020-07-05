import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { SuperCategory } from 'src/app/category/super-category/superCategory.model';
import { MainCategory } from 'src/app/category/main-category/mainCategory.model';
import { SubCategory } from 'src/app/category/sub-category/sub-category.model';
import { AppSetting } from 'src/app/config/appSetting';

@Component({
  selector: 'app-update-image-url',
  templateUrl: './update-image-url.component.html',
  styleUrls: ['./update-image-url.component.css']
})
export class UpdateImageUrlComponent implements OnInit {
  superCategoryModel: SuperCategory;
  mainCategoryDetails = <MainCategory[]>[{}];
  subCategory = <SubCategory[]>[{}];
  superCategoryId: string;
  mainCategoryId: string;
  subCategoryId: string;
  limit: number = AppSetting.limitResize;
  updateStatus = false;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getSuperCategory();
  }
  getSuperCategory() {
    this.mainCategoryDetails = [];
    this.subCategory = [];
    this.productService.getSuperCategory().subscribe(data => {
      this.superCategoryModel = data;
      
    });
  }
  categorySelected(category){
    this.superCategoryId = '';
    this.mainCategoryId = '';
    this.subCategoryId = '';
    this.mainCategoryDetails = [];
    this.subCategory = [];
    this.mainCategoryDetails = category.value.mainCategory
    this.superCategoryId = category.value._id
  }
  categoryMainCategory(maincategory){
    this.mainCategoryId = '';
    this.subCategoryId = '';
    this.subCategory = maincategory.value.subCategory;
    this.mainCategoryId = maincategory.value._id
  }
  categorySubCategory(subcategory) {
    this.subCategoryId = subcategory.value._id
  }
  imageUpdate(){
    this.updateStatus = false;
    if(this.subCategoryId && this.superCategoryId && this.mainCategoryId) {
      this.getSubCategoryImageCount(this.subCategoryId)
  } else if(this.superCategoryId && this.mainCategoryId) {
    this.getMainCategoryImageCount(this.mainCategoryId)
  } else if(this.superCategoryId) {
    
    this.getSuperCategoryImageCount(this.superCategoryId);
  }
  }
  // super category
  getSuperCategoryImageCount(supId) {
    this.productService.superCategoryParentImageCount(supId).subscribe(data => {
      let totalPages = Math.ceil(data.total / this.limit)
      if(totalPages > 0){
        this.pushParentSuperCategoryImagesToSQS(supId, totalPages)
      }else{
        this.getChildSuperCategoryImageCount(supId)
      }
    }, error => {
      console.log(error);
    });
  }
  
  pushParentSuperCategoryImagesToSQS(supId, totalPages) {
    this.productService.pushParentSuperCategoryImagesToSQS(supId, totalPages, this.limit).subscribe(data => {
      console.log(data, 'super parent')
      this.getChildSuperCategoryImageCount(supId);
    }, error => {
      console.log(error);
    });
  }
  getChildSuperCategoryImageCount(supId) {
    this.productService.superCategoryChildImageCount(supId).subscribe(data => {
      let totalPages = Math.ceil(data.total / this.limit)
      if(totalPages > 0){
        this.pushChildSuperCategoryImagesToSQS(supId, totalPages)
      }
    }, error => {
      console.log(error);
    });
  }
  
  pushChildSuperCategoryImagesToSQS(supId, totalPages) {
    this.productService.pushChildSuperCategoryImagesToSQS(supId, totalPages, this.limit).subscribe(data => {
      console.log(data, 'super child');
      this.updateStatus = true;
    }, error => {
      console.log(error);
    });
  }

  // main category
  getMainCategoryImageCount(supId) {
    this.productService.mainCategoryParentImageCount(supId).subscribe(data => {
      let totalPages = Math.ceil(data.total / this.limit)
      if(totalPages > 0){
        this.pushParentMainCategoryImagesToSQS(supId, totalPages)
      }else{
        this.getChildMainCategoryImageCount(supId)
      }
    }, error => {
      console.log(error);
    });
  }
  
  pushParentMainCategoryImagesToSQS(mainId, totalPages) {
    this.productService.pushParentMainCategoryImagesToSQS(mainId, totalPages, this.limit).subscribe(data => {
      console.log(data, 'main parent')
      this.getChildMainCategoryImageCount(mainId);
    }, error => {
      console.log(error);
    });
  }
  getChildMainCategoryImageCount(mainId) {
    this.productService.mainCategoryChildImageCount(mainId).subscribe(data => {
      let totalPages = Math.ceil(data.total / this.limit)
      if(totalPages > 0){
        this.pushChildMainCategoryImagesToSQS(mainId, totalPages)
      }
    }, error => {
      console.log(error);
    });
  }
  pushChildMainCategoryImagesToSQS(mainId, totalPages) {
    this.productService.pushChildMainCategoryImagesToSQS(mainId, totalPages, this.limit).subscribe(data => {
      console.log(data, 'main child');
      this.updateStatus = true;
    }, error => {
      console.log(error);
    });
  }
  
  // sub category
  getSubCategoryImageCount(subId) {
    console.log(subId)
    this.productService.subCategoryParentImageCount(subId).subscribe(data => {
      console.log(data);
      let totalPages = Math.ceil(data.total / this.limit)
      if(totalPages > 0){
        this.pushParentSubCategoryImagesToSQS(subId, totalPages)
      } else{
        this.getChildSubCategoryImageCount(subId);
      }
    }, error => {
      console.log(error);
    });
  }
  pushParentSubCategoryImagesToSQS(supId, totalPages) {
    this.productService.pushParentSubCategoryImagesToSQS(supId, totalPages, this.limit).subscribe(data => {
      console.log(data, 'sub parent')
      this.getChildSubCategoryImageCount(supId);
    }, error => {
      console.log(error);
    });
  }
  getChildSubCategoryImageCount(subId) {
    this.productService.subCategoryChildImageCount(subId).subscribe(data => {
      let totalPages = Math.ceil(data.total / this.limit)
      if(totalPages > 0){
        this.pushChildSubCategoryImagesToSQS(subId, totalPages)
      }
    }, error => {
      console.log(error);
    });
  }
  
  pushChildSubCategoryImagesToSQS(subId, totalPages) {
    this.productService.pushChildSubCategoryImagesToSQS(subId, totalPages, this.limit).subscribe(data => {
      console.log(data, 'sub child');
      this.updateStatus = true;
    }, error => {
      console.log(error);
    });
  }
}
