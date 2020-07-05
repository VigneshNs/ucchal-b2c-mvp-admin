
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBrandComponent } from './add-brand/add-brand.component';
import { ViewBrandComponent } from './view-brand/view-brand.component';
import { EditBrandComponent } from './edit-brand/edit-brand.component';
const routes: Routes = [{
  path: 'addbrand',
  component: AddBrandComponent
},
{
  path: 'viewbrand',
  component: ViewBrandComponent
},
{
  path: 'editbrand/:id',
  component: EditBrandComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandRoutingModule { }
