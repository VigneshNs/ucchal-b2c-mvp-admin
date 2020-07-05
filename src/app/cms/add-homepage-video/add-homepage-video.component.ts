import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CmsService } from '../cms.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { MatSnackBar,MatDialog } from '@angular/material';
import { DeleteConfirmBoxComponent } from '../../shared/delete-confirm-box/delete-confirm-box.component';
export interface PeriodicElement {
  videoTitle: string;
  videoLink: string;
  
}
@Component({
  selector: 'app-add-homepage-video',
  templateUrl: './add-homepage-video.component.html',
  styleUrls: ['./add-homepage-video.component.css']
})
export class AddHomepageVideoComponent implements OnInit {
  VideoForm: FormGroup;
  homepageData:any;
  showNoData:boolean;
  message;
  action;
  displayedColumns: string[] = ['videoTitle', 'videoLink','Status','addedDate', 'action'];
  dataSource: MatTableDataSource<PeriodicElement>;
  constructor( private fb: FormBuilder,private cmsService:CmsService,private snackBar: MatSnackBar,public dialog: MatDialog) { }

  ngOnInit() {
    this.createForm();
    this.getAllHomepageVideo();
     }
createForm(){
  this.VideoForm = this.fb.group({
    videoTitle: [''],
    videoLink: [''],
  
  });
}
createHomepageVideo() {                              // Create homepge details Details
 
  const videoModel = {
    videoTitle : this.VideoForm.controls.videoTitle.value,
    videoLink : this.VideoForm.controls.videoLink.value ,
   
  }
   this.cmsService.CreateHomepageVideo(videoModel).subscribe(data => { 
     this.homepageData = new MatTableDataSource<PeriodicElement>(data);
    
     this.dataSource = new MatTableDataSource<PeriodicElement>(data);
     if(data.length === 0) {
       this.showNoData = true;
     } else {
       this.showNoData = false;
     }
  }, error => {
    console.log(error);
  });
  // this.VideoForm.reset();
}
getAllHomepageVideo() {                                        
  this.cmsService.getHomepageVideo().subscribe(data => {
    this.homepageData = new MatTableDataSource<PeriodicElement>(data);
  
    if(data.length === 0) {
      this.showNoData = true;
    } else {
      this.showNoData = false;
    }
  }, error => {
    console.log(error);
  });
}
openDialog(row):void {
  const dialogRef = this.dialog.open(DeleteConfirmBoxComponent, {
 width: '350px',
});
dialogRef.afterClosed().subscribe(result => {
 if(result) {
  
   this. deleteVideo(row);
 }
});
}
deleteVideo(row) {     
  this.message = 'Deleted Successfully';                                   // Delete Single video
  this.cmsService.deleteSingleHomepagVideo(row._id).subscribe(data => {
    this.homepageData = data;
    this.snackBar.open(this.message, this.action, {
      duration: 500,
    });
  //  this.dataSource = new MatTableDataSource<PeriodicElement>(data);
  }, error => {
    console.log(error);
  });
 }
 cancel() {
  
}
changeStatus(e, id) {
  
  const videoModel = {
   publish: e.target.checked
  }
  console.log(e.target.checked);
  console.log(id);
 
 
  this.cmsService.changeVideoStatus(videoModel, id).subscribe(data => {
    this.homepageData = data;
    console.log('status',data);
    this.homepageData = new MatTableDataSource<PeriodicElement>(data);
  
   
  }, error => {
    console.log(error);
  });
}
}
