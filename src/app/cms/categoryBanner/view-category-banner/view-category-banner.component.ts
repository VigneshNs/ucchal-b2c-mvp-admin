import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { CategoryBanner } from './categoryBanner.model';
import { CmsService } from '../../cms.service';
import { AppSetting } from '../../../config/appSetting';

@Component({
  selector: 'app-view-category-banner',
  templateUrl: './view-category-banner.component.html',
  styleUrls: ['./view-category-banner.component.css']
})
export class ViewCategoryBannerComponent implements OnInit {
  dataHolder;
  viewCategoryBanner: FormGroup;
  dataSource: MatTableDataSource<any>;
  categoryBannerServiceUrl: string;
  displayedColumns: string[] = ['imageName', 'title', 'position', 'vposition', 'hposition', 'Action' ];
  holder: any;
  constructor(private cmsService: CmsService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.getAllCategoryBanner();
    this.categoryBannerServiceUrl = AppSetting.categoryBannerImageUrl;
   }

  ngOnInit() {
  }
  getAllCategoryBanner() {
    this.cmsService.getAllCategoryBanner().subscribe(data => {
      console.log(data);
      this.holder = data;
      for (let i = 0; i <= this.holder.length - 1; i++) {
        this.holder[i].duplicate = false;
        for (let j = 0; j <= this.holder.length - 1 ; j++) {
          if (this.holder[i]._id !== this.holder[j]._id) {
            if (this.holder[i].imagePosition === this.holder[j].imagePosition) {
              this.holder[i].duplicate = true;
            }
          }
        }
      }
      this.dataHolder = new MatTableDataSource<any>(this.holder);
      this.dataSource = new MatTableDataSource<any>(this.holder);
    }, error => {
      console.log(error);
    });
  }
  openDialog(element) {
    this.cmsService.deleteCategoryBanner(element._id).subscribe(data => {
      this.dataHolder = new MatTableDataSource<any>(data);
      this.dataSource = new MatTableDataSource<any>(data);
    }, error => {
      console.log(error);
    });
  }
  Edit(element) {
    this.router.navigate(['cms/editCategoryBanner/', element._id]);
  }

}
