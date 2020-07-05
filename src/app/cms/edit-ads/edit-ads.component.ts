import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material';
import { CmsService } from '../cms.service';
import { ADSModel } from '../ads/ads.model';
import { AdsImageData } from '../ads/adsImageData.model';
@Component({
  selector: 'app-edit-ads',
  templateUrl: './edit-ads.component.html',
  styleUrls: ['./edit-ads.component.css']
})
export class EditAdsComponent implements OnInit {
  ADSForm: FormGroup;
  imageEdit = false;
  id: string;
  adsModel: any;
  holder: ADSModel;
  fileToUpload: any;
  adsImageData: AdsImageData = new AdsImageData();
  urls: any[];
  reader: FileReader;
  imageNameFilter: any;
  showImageNameError: boolean;
  fileLength: any;
  adsDetailModel: ADSModel;
  width: number;
  height: number;
  showImageError = false;
  ImageDimenetionSubmitError = false;
  constructor(private cmsService: CmsService, private fb: FormBuilder, private router: Router,
              private route: ActivatedRoute, private snackBar: MatSnackBar) {
                this.route.paramMap.subscribe((params: ParamMap) => {
                  this.id = params.get('id');
                });
              }

  ngOnInit() {
    this.createForm();
    this.getSelectedADS();
  }
createForm() {
  this.ADSForm = this.fb.group({
    id: [''],
    position: [''],
    adsTitle: [''],
    adsDescription: [''],
    link: [''],
    buttonContent: ['']
  });
}
getSelectedADS() {
  this.cmsService.getSelectedADS(this.id).subscribe(data => {
    this.adsModel = data;
  }, error => {
    console.log(error);
  });
}
handleFileInput(images: any) {
  this.fileToUpload = images;
  this.adsImageData.adsImage = this.fileToUpload[0];
  this.urls = [];
  const files = images;
  if (files) {
    for (const file of files) {
      this.reader = new FileReader();
      this.reader.onload = (e: any) => {
        this.urls.push(e.target.result);
        const store = new Image();
        store.onload = (o: any) => {
          this.width = store.width;
          this.height = store.height;
          this.checkImageValidation();
        };
        store.src = e.target.result;
      };
      this.reader.readAsDataURL(file);
    }
  }
}
checkImageValidation() {
  if (this.fileToUpload.length !== 0) {
    if (this.width === 840 && this.height === 906) {
      this.showImageError = false;
    } else {
      this.showImageError = true;
    }
} else {
  this.showImageError = false;
}
}
editImage() {
  this.imageEdit = true;
}
cancelImage() {
  this.imageEdit = false;
}
creatADS(pos, tit, dec, lin, btn) {
  this.holder = new ADSModel();
  this.holder.position = pos;
  this.holder.adsTitle = tit;
  this.holder.adsDescription = dec;
  this.holder.link = lin;
  this.holder.buttonContent = btn;
  this.cmsService.updateSelectedADS(this.holder, this.id).subscribe(data => {
    this.adsModel = data;
  /*   if (this.fileToUpload === undefined) { */
      this.router.navigate(['cms/viewAds']);
/*     } else {
      this.updateImage();
    } */
  }, error => {
    console.log(error);
  });
}
updateImage() {
  const formData: any = new FormData();
  this.fileLength = this.fileToUpload.length;
  for (let i = 0; i <= this.fileLength; i++) {
    formData.append('single', this.fileToUpload[i]);
  }
  this.cmsService.updateSelectedADSImage(formData, this.id).subscribe(data => {
    this.adsModel = data;
    this.imageEdit = false;
    this.storeAdsName(data.Key);
  }, error => {
    console.log(error);
  });
}
storeAdsName(name) {
  this.adsDetailModel = new ADSModel();
  this.adsDetailModel.adsImageName = name;
  this.cmsService.StoreADSImageName(this.adsDetailModel, this.id).subscribe(data => {
  /* this.router.navigate(['cms/viewAds']); */
  this.adsModel = data;
  this.imageEdit = false;
  console.log('store', data);
  }, error => {
    console.log(error);
  });
}
cancel() {
  this.router.navigate(['cms/viewAds']);
}
checkImageDimension() {
  if (this.showImageError === false) {
   
    this.updateImage();
  } else {
    this.ImageDimenetionSubmitError = true;
  }
}
}
