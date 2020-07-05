import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ProductService } from './../../../product/product.service';
import { Product } from './../../../product/add-product/product.model';
import { EditProduct } from './edit.model';
import { SuperCategory } from '../../../category/super-category/superCategory.model';
import { MainCategory } from '../../../category/main-category/mainCategory.model';
import { SubCategory } from '../../../category/sub-category/sub-category.model';
import { BrandModel } from './../../../brand/add-brand/brand.model';
import { ProductSettings } from './../../product-settings/product-settings.model';
import { ProductOption } from './../../settings/product-option/add-product-option/product-option.model';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  id: string;
  childId: string;
  productModel: Product;
  productSettingsModel: ProductSettings;
  brandModel: BrandModel;
  editProductModel: EditProduct;
  productOptionModel: ProductOption[];
  productOptionValue: ProductOption;
  superCategoryModel: SuperCategory[];
  supCategoryDetails: SuperCategory;
  mainCategoryDetails: MainCategory;
  subCategoryDetails: SubCategory;
  editCategoryName: string;
  editMainCategoryName: string;
  editSubCategoryName: string;
  supCategoryId;
  mainCategoryId;
  subCategoryId;
  sizeError = false;
  productForm: FormGroup;
  material;
  color;
  sizeDetail;
  occasion;
  productTagModel;
  sizeguideData: any;
  attributeModel: any[];
  categoryAttributeModel: any;
  constructor(private fb: FormBuilder,
              private productService: ProductService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      this.childId = this.activatedRoute.snapshot.queryParamMap.get('childId');
    });
   }

  ngOnInit() {
    this.viewSingleProducts();
    this.showSuperCategory();
    this.getAllBrand();
    this.getProductSettings();
    this.getAllProductOption();
    this.createForm();
    this.getAllProductTag();
    this.getSizeGuide();
    this.editProductModel = new EditProduct();
    this.editProductModel.categoryEdit = false;
    this.editProductModel.productDetailsEdit = false;
    this.editProductModel.categoryEdit = false;
    this.editProductModel.brandEdit = false;
    this.editProductModel.imageEdit = false;
    this.editProductModel.seoEdit = false;
    this.editProductModel.sizeEdit = true;
    this.editProductModel.guideEdit = false;
    this.editProductModel.attributeEdit = false;
    this.getColor();
  }
  getProductSettings() {
    this.productService.getProductSettings().subscribe(data => {
      this.productSettingsModel = data;
      this.material = data[0].material;
      this.sizeDetail = data[0].size;
      this.occasion = data[0].occasion;
    }, err => {
      console.log(err);
    });
  }
  getBack() {
    this.router.navigate(['product/viewproduct']);
  }
  getColor() {
    this.productService.getColors().subscribe(data => {
      this.color = data;
    }, err => {
      console.log(err);
    });
  }

  getAllProductOption() {
    this.productService.allProductOption().subscribe(data => {
    this.productOptionModel = data;
    this.productOptionValue = this.productOptionModel.find(value => value._id === this.productModel.sizeVariantId);
    }, error => {
      console.log(error);
    });
  }
  addProductVariant(variant) {
    this.productService.addSizeVariant({id: this.productModel._id, size: variant}).subscribe(data => {
    this.productModel = data;
  }, error => {
    console.log(error);
  });
}
  getAllBrand() {                                        // Retrieve All Brand
    this.productService.getAllBrand().subscribe(data => {
      this.brandModel = data;
    }, error => {
      console.log(error);
    });
  }
  deleteProductImageData(event) {
    this.productService.deleteSingleImage(event, this.id).subscribe(data => {
    this.productModel = data;
    }, error => {
      console.log(error);
    });
  }
  deleteProductVariantData(event) {
    this.productService.deleteProductVariant(event, 'null').subscribe(data => {
    this.productModel = data;
    }, error => {
      console.log(error);
    });
  }
  imageUploadServerToS3(formData) {
    this.productService.editImagesToS3(this.id, formData).subscribe(data => {
      console.log('saved images', data);
      this.imageUploadServer(data);
    }, error => {
      console.log(error);
    });
  }
  imageUploadServer(imageData) {
    this.productModel = new Product();
    this.productModel.productImage = imageData.map(e => e.originalname);
    this.productService.editProductImageNamePush(this.id, this.productModel).subscribe(data => {
      this.productModel = data;
      this.cancel();
    }, error => {
      console.log(error);
    });
  }
  updateBrand(brand) {
    this.productService.editProductBrand(this.id, brand).subscribe(data => {
    this.productModel = data;
    this.editProductModel = new EditProduct();
    this.editProductModel.brandEdit = false;
    this.editProductModel = this.editProductModel;
    }, error => {
      console.log(error);
    });
  }
  updateProductvariant(editvariant) {
    this.productService.editProductVariant(editvariant).subscribe(data => {
      this.productModel = data;
    }, error => {
      console.log(error);
    });
  }
  selectedIndexChange(val: number) {
    this.editProductModel = new EditProduct();
    this.editProductModel.categoryEdit = false;
    this.editProductModel.productDetailsEdit = false;
    this.editProductModel.categoryEdit = false;
    this.editProductModel.brandEdit = false;
    this.editProductModel.imageEdit = false;
    this.editProductModel.seoEdit = false;
    this.editProductModel.sizeEdit = true;
    this.editProductModel = this.editProductModel;
  }
  editCategory() {
    this.editProductModel = new EditProduct();
    this.editProductModel.categoryEdit = true;
  }
  cancel() {
    this.editProductModel = new EditProduct();
    this.editProductModel.categoryEdit = false;
    this.editProductModel.categoryEdit = false;
    this.editProductModel.brandEdit = false;
    this.editProductModel.imageEdit = false;
    this.editProductModel.seoEdit = false;
    this.editProductModel.sizeEdit = false;
  }

  createForm() {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      productDescription: ['', Validators.required],
      styleCode: ['', Validators.required],
      manufacturer:  ['', Validators.required],
      bulletPoints: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
      material: ['', Validators.required],
      occassion: ['', Validators.required],
      color:  ['', Validators.required],
      price:  ['', Validators.required],
      sizeName: [''],
      sizeVariantId: [''],
      sizeGuideName: [''],
      sizeGuideId: [''],
      metaTitle:  ['', Validators.required],
      metaDescription:  ['', Validators.required],
      metaKeyword:  ['', Validators.required],
      optionValue: this.fb.array([]),
      productImage: this.fb.array([])
      /*  sizeVariant: this.fb.array([
       ]) */
    });
  }
  updateProductParentInfo(product) {
    this.productService.editProductParentInfo(this.id, product).subscribe(data => {
      this.productModel = data;
      this.editProductModel = new EditProduct();
      this.editProductModel.categoryEdit = false;
      this.editProductModel = this.editProductModel;
      if (this.childId) {
        this.productModel = data.child.find(ele => ele._id === this.childId);
      } else {
        this.productModel = data;
      }
      }, error => {
        console.log(error);
      });
  }
  updateProductInfro(product) {
    if (this.childId) {
      this.updateProductChildInfo(product);
    } else {
      this.updateProductParentInfo(product);
    }
  }
  updateProductChildInfo(product) {
    this.productService.editProductChildInfo(this.id, this.childId, product).subscribe(data => {
    this.productModel = data;
    this.editProductModel = new EditProduct();
    this.editProductModel.categoryEdit = false;
    this.editProductModel = this.editProductModel;
    if (this.childId) {
      this.productModel = data.child.find(ele => ele._id === this.childId);
    } else {
      this.productModel = data;
    }
   
    }, error => {
      console.log(error);
    });
  }
  updateProductSeo(product) {
    this.productService.editProductSeo(this.id, product).subscribe(data => {
    this.productModel = data;
    this.editProductModel = new EditProduct();
    this.editProductModel.categoryEdit = false;
    this.editProductModel = this.editProductModel;
    }, error => {
      console.log(error);
    });
  }
  updateCategoryDetails(product) {
    this.productService.editProductCategory(this.id, product).subscribe(data => {
    this.productModel = data;
    const supCat = this.superCategoryModel.find(elem => elem._id === this.productModel.superCategoryId);
    const mainCat = supCat.mainCategory.find(elem => elem._id === this.productModel.mainCategoryId);
    const subCat = mainCat.subCategory.find(elem => elem._id === this.productModel.subCategoryId);
    this.editCategoryName = supCat.categoryName;
    this.editMainCategoryName = mainCat.mainCategoryName;
    this.editSubCategoryName = subCat.subCategoryName;
    this.editProductModel = new EditProduct();
    this.editProductModel.categoryEdit = false;
    this.editProductModel = this.editProductModel;
    }, error => {
      console.log(error);
    });
  }

  showSuperCategory() {
    this.productService.getSuperCategory().subscribe(data => {
    this.superCategoryModel = data;
    
    const supCat = this.superCategoryModel.find(elem => elem._id === this.productModel.superCategoryId);
    const mainCat = supCat.mainCategory.find(elem => elem._id === this.productModel.mainCategoryId);
    const subCat = mainCat.subCategory.find(elem => elem._id === this.productModel.subCategoryId);
    this.editCategoryName = supCat.categoryName;
    this.editMainCategoryName = mainCat.mainCategoryName;
    this.editSubCategoryName = subCat.subCategoryName;
    }, err => {
      console.log(err);
    });
  }
  addForm() {
    const productoptionValue = this.fb.group({
      sizeName: ['', Validators.required],
      sku: ['', Validators.required],
      sizeQuantity: ['', Validators.required],
      sizePrice: [0, Validators.required],
    });
    this.productOptionValueForms.push(productoptionValue);
}
deleteForm(i) {
  this.productOptionValueForms.removeAt(i);
}
get  productOptionValueForms() {
  return this.productForm.get('optionValue') as FormArray;
}
addImageForm() {
  const productImage = this.fb.group({
    productImageName: ['']
  });
  this.productImageForm.push(productImage);
}
deleteImageForm(i) {
this.productImageForm.removeAt(i);
}
get  productImageForm() {
return this.productForm.get('productImage') as FormArray;
}
addNewForm() {
  for (let i = 0; i <= this.productModel.productImage.length - 1; i++) {
    const productImage = this.fb.group({
      productImageName: [this.productModel.productImage[i].productImageName],
    });
    this.productImageForm.push(productImage);
  }
  console.log(this.productModel, 'cain');
}
  viewSingleProducts() {
    this.productService.getSingleProducts(this.id).subscribe(data => {
      if (this.childId) {
        this.productModel = data.child.find(ele => ele._id === this.childId);
      } else {
        this.productModel = data;
      }
      this.addNewForm();
      if (this.productModel.variation === 'Child') {
        this.getKeyValue(this.productModel.attribute);
      }
      
      console.log('dddd', this.productModel);
    }, error => {
      console.log(error);
    });
  }
  getAllProductTag() {
    this.productService.allProductTag().subscribe(data => {
      this.productTagModel = data;
    }, error => {
      console.log(error);
    });
  }
  getSizeGuide() {
    this.productService.getSizeGuide().subscribe(data => {
      this.sizeguideData = data;
      }, error => {
        console.log(error);
      });
  }
  editProductSizeGuideData(e) {
    this.productService.editProductSizeGuide(this.id, e).subscribe(data => {
      this.productModel = data;
    }, error => {
      console.log(error);
    });
  }
  updateImage() {
    const temp = new Product();
    temp.productImage = this.productForm.controls.productImage.value;
    console.log(temp);
    this.editProductModel.imageEdit = false;
    if (this.childId) {
      this.childImageUpdate(temp);
    } else {
      this.parentImageUpdate(temp);
    }
  }
  parentImageUpdate(product) {
    this.productService.parentProductImageUpdate(product, this.id).subscribe(data => {
      this.productModel = data;
    }, error => {
      console.log(error);
    });
  }
  childImageUpdate(product) {
    this.productService.childProductImageUpdate(product, this.id, this.childId).subscribe(data => {
      this.productModel = data;
    }, error => {
      console.log(error);
    });
  }
  getKeyValue(attribute) {
    let key, keys = [];
    for (let i = 0; i < attribute.length; i++) {
      for (key in attribute[i]) {
        if (attribute[i].hasOwnProperty(key)) {
          keys.push({ field: key, value: attribute[i][key]});
        }
      }
    }
    keys = keys.filter(na => (na.field !== '_id') && (na.field !== 'attributeId') &&(na.field !== 'attributeFieldId') );
    console.log('key', keys);
    this.attributeModel = keys;
    console.log('product', this.productModel);
  }
  getCatAttribute() {
    console.log('category', this.superCategoryModel);
    if (this.productModel.subCategoryId) {
      this.superCategoryModel.forEach(element => {
        if (element._id === this.productModel.superCategoryId) {
          element.mainCategory.forEach(elem => {
            if (elem._id === this.productModel.mainCategoryId) {
              elem.subCategory.forEach(el => {
                if (el._id === this.productModel.subCategoryId) {
                  this.getSelectedAttribute(el.attribute, this.attributeModel);
                }
              });
            }
          });
        }
      });
    } else {
      this.superCategoryModel.forEach(element => {
        if (element._id === this.productModel.superCategoryId) {
          this.getSelectedAttribute(element.attribute, this.attributeModel);
        }
      });
    }
  }
  getSelectedAttribute(category, attribute) {
    this.categoryAttributeModel = [];
    console.log(category, attribute);
    attribute.forEach(a => {
      category.forEach(b => {
        if (b.fieldName === a.field) {
          this.categoryAttributeModel.push(b);
        }
      });
    });
    console.log(this.categoryAttributeModel);
  }
  updateAttribute(attribute) {
    const temp = new Product();
    temp.attribute = attribute;
    this.productService.editChildAttributeInfo(this.id, this.childId, temp).subscribe(data => {
      console.log(data);
      if (this.childId) {
        this.productModel = data.child.find(ele => ele._id === this.childId);
      } else {
        this.productModel = data;
      }
      this.editProductModel.attributeEdit = false;
      this.addNewForm();
      if (this.productModel.variation === 'Child') {
        this.getKeyValue(this.productModel.attribute);
      }
     
    }, error => {
      console.log(error);
    });
  }
}
