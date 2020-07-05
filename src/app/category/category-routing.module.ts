import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {SuperCategoryComponent} from './super-category/super-category.component';
import {MainCategoryComponent} from './main-category/main-category.component';
import {SubCategoryComponent} from './sub-category/sub-category.component';
import { EditSuperCategoryComponent } from './edit-super-category/edit-super-category.component';
import { EditMainCategoryComponent } from './edit-main-category/edit-main-category.component';
import { EditSubCategoryComponent } from './edit-sub-category/edit-sub-category.component';
import { CategoryTemplateComponent } from './../category/category-template/category-template.component';
import { SupercategoryResolver } from './../category/resolver/supercategory-product-resolver'
import { AddMainCategoryComponent } from './add-main-category/add-main-category.component';
import { AddSubCategoryComponent } from './add-sub-category/add-sub-category.component';
import { AddSuperCategoryComponent } from './add-super-category/add-super-category.component';



const routes: Routes = [{
  path: 'supercategory',
  component: SuperCategoryComponent
},
{
  path: 'maincategory',
  component: MainCategoryComponent
},
{
  path: 'subcategory',
  component: SubCategoryComponent
},
{
  path: 'addmaincategory',
  component: AddMainCategoryComponent
},
{
  path: 'addsupercategory',
  component: AddSuperCategoryComponent
},
{
  path: 'addsubcategory',
  component: AddSubCategoryComponent
},
{
  path: 'editsupercategory/:id',
  component: EditSuperCategoryComponent, resolve: {
    supcategory: SupercategoryResolver
  }
},
{
  path: 'editmaincategory/:id/:mainid',
  component: EditMainCategoryComponent
},
{
  path: 'editsubcategory/:id/:mainid/:subid',
  component: EditSubCategoryComponent
},
{
  path: 'templateupload',
  component: CategoryTemplateComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
