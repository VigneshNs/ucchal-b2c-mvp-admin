import { Component, OnInit, Inject, Optional, Input } from '@angular/core';
import { SalesService } from '../sales.service';
import { Order } from '../orders/order.model';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AppSetting } from '../../config/appSetting';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TouchSequence } from 'selenium-webdriver';
import { style } from '@angular/animations';
import { Observable, of, Observer } from 'rxjs';
import { Dropbox } from 'dropbox';


@Component({
  selector: 'app-view-tailoring-detail',
  templateUrl: './view-tailoring-detail.component.html',
  styleUrls: ['./view-tailoring-detail.component.css']
})
export class ViewTailoringDetailComponent implements OnInit {
  measurementImageUrl: string;
  image: any;
 
  downloadedImg: HTMLImageElement;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ViewTailoringDetailComponent>,
              private  salesService: SalesService) {
    this.measurementImageUrl = AppSetting.measurementImageUrl;
  }

  ngOnInit() {
    this.onClick();
  }
  close() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
  dynamicContent() {
    const header = [];

  }
  tableValue() {
   /*  const obj = {};
    for (const ite of this.data) {
      if (!obj[ite.name]) {
        const subele = ite.name;
        obj[subele] = ite.value;
      }
    }
    console.log(obj);
    const newTestArray = [];
    const headerArray = [obj]; */

    /* for (const key of this.data) {
      headerArray = [{ text: key.name + key.value, style: 'tableHeaderRow' }]
    } */
    /* return headerArray; */
    
  }
  getStyleImage(style) {
    style.value === 'As Shown' ? this.getBase64FromDrobBox(style) : this.getBase64FromS3Bucket(style);
  }
  getBase64FromDrobBox(styleImage) {
    var xhr = new XMLHttpRequest()
    xhr.open("GET", styleImage);
    xhr.responseType = "blob";
    xhr.send();
    xhr.addEventListener("load", function() {
        var reader = new FileReader();
        reader.readAsDataURL(xhr.response); 
        reader.addEventListener("loadend", function() {             
            console.log(reader.result);
        });
    });
  }
  getBase64FromS3Bucket(style) {
    const obj: any = {};
    obj.imageName = style.styleImage;
    this.salesService.getBase64OfS3(obj, style.measureID).subscribe(data => {
      console.log(data);
      /* return data; */
      style.base64 = data;
     this.image = data;
  
    });
  }
  onClick() {
    for (const a of this.data.tailoringData) {
      if (a.styleImage !== undefined) {
        a.base64 = this.getStyleImage(a);
      }
    }
  /*   temp.then(value => {
      this.onPrint();
      console.log(value);
    }); */
    /* this.onPrint(); */
  }
 
  convert() {
    let testImage: any = {};
    const url = 'https://www.dropbox.com/s/ejuyde1zrsqiwbo/BEAS002-%281%29.JPG?raw=1';
    /* const temp = this.getBase64FromDrobBox(url); */
    var img = new Image();
    img.crossOrigin = "Anonymous";
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = url;
    img.width = 100;
    img.height = 200;
    const temp = this.getBase64ImageFromURL(url);
    console.log(temp);
   /*  const temp = this.getBase64Image(img); */
    /* const a = 'data:image/jpg;base64,' + temp; */
    console.log(btoa(url));
    /* toDataUrl(url, function(myBase64) {
      console.log(myBase64); // myBase64 is the base64 string
  }); */
    /* const temp = this.convertToDataURLviaCanvas(url); */
    /* let temp;
    this.convertImgToBase64URL(url, function(base64Img){
      temp = base64Img;
    // Base64DataURL
 }); */
    console.log(testImage.src);
    function toDataUrl(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
      xhr.onload = function() {
          var reader = new FileReader();
          reader.onloadend = function() {
              callback(reader.result);
          }
          reader.readAsDataURL(xhr.response);
      };
     
  }
  }
  getBase64ImageCheck(img:HTMLImageElement) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }
  
  
  
  getBase64ImageFromURL(url:string) {
    return Observable.create((observer: Observer<string>) => {
      let img = new Image();
      img.src = url;
      if (!img.complete) {
        img.onload = () => {
          observer.next(this.getBase64ImageCheck(img));
          observer.complete();
        };
        img.onerror = (err) => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64ImageCheck(img));
        observer.complete();
      }
    });
  }
  dropboxUrl() {
    const temp: any = {};
    temp.link = 'https://www.dropbox.com/s/ejuyde1zrsqiwbo/BEAS002-%281%29.JPG?raw=1';
    this.salesService.downloadDropBoxImage(temp).subscribe(data => {
      console.log(data);
    });
    /* const accessToken = '-skuoDBePTAAAAAAAAAAQAcOxUKKcr7r5vfnu-NswbzyRy2pjIh3gagJkkbuM8co';
    const clientId = 'w1vwhzkezj3wn3o';
    const clientSecret = 'it5f8r621iqh9mi';
    const dbx = new Dropbox({
      accessToken,
      fetch
    });
    dbx.setClientId('w1vwhzkezj3wn3o');
    dbx.setClientSecret('it5f8r621iqh9mi');
    dbx.filesListFolder({  
      path: 'https://www.dropbox.com/s/ejuyde1zrsqiwbo/BEAS002-%281%29.JPG?raw=1'  
    }).then(response => console.log(response)) */
  }
  convertImgToBase64URL(url, callback){
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = url;
    img.height = 100;
    img.width = 200;
    img.onload = () =>{
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'), dataURL;
        canvas.height = 100;
        canvas.width = 200;
        ctx.drawImage(img, 0, 0);
        dataURL = canvas.toDataURL('image/png');
        console.log(dataURL, 'check');
        callback(dataURL);
        canvas = null; 
    };
    
}
  convertToDataURLviaCanvas(url){
    var Img = new Image(),
      dataurl = '';
    Img.src = url;
    /* Img.onload = function () { *///to first ensure that the picture is fully fetched, this is an asynchronous event
      //Create canvas element
      var Canvas = document.createElement("canvas"),
        width = 100,//ensure canvas size and picture as
        height = 170;
      Canvas.width = width;
      Canvas.height = height;
      Canvas.getContext("2d").drawImage(Img, 0, 0, width, height);
      dataurl = Canvas.toDataURL(' image/jpeg ');//Convert picture to Dataurl
    /* }; */
    return dataurl

}
/* convertToDataURLviaCanvas(base64, "image/jpeg").then(base64 => console.log(base64)); */
  getBase64Image(imgUrl: HTMLImageElement) {
   
    var canvas = document.createElement("canvas");
    canvas.width = imgUrl.width;
    canvas.height = imgUrl.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(imgUrl,0,0);
    var dataURL = canvas.toDataURL('image/jpeg');
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
   /*  return dataURL; */
}
startDownload() {
  let imageURL = "https://www.dropbox.com/s/ejuyde1zrsqiwbo/BEAS002-%281%29.JPG";
 
  this.downloadedImg = new Image;
  this.downloadedImg.crossOrigin = "Anonymous";
  this.downloadedImg.addEventListener("load", this.imageReceived, false);
  this.downloadedImg.src = imageURL;
  this.imageReceived();
}
imageReceived() {
  let canvas = document.createElement("canvas");
  let context = canvas.getContext("2d");

  canvas.width = 100;
  canvas.height = 200;
 
  context.drawImage(this.downloadedImg, 0, 0);
/*   imageBox.appendChild(canvas); */
 
  try {
   console.log("saved-image-example", canvas.toDataURL("image/jpeg"));
  }
  catch(err) {
    console.log("Error: " + err);
  }  
}

  onPrint() {
      
    console.log(this.data.tailoringData);
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const title = [];
    const document = [];
    let frontStyle;
    let backStyle;
    let sleeveStyle;
    let bottomStyle;

    for (const key of this.data.tailoringData) {
      if (key.name === 'frontNeckStyle') {
        frontStyle = key.base64;
      } else if (key.name === 'backNeckStyle') {
        backStyle = key.base64;
      } else if (key.name === 'sleeveStyle') {
        sleeveStyle = key.base64;
      } else if (key.name === 'bottomStyle') {
        bottomStyle = key.base64;
      }
    }
    for (const key of this.data.tailoringData) {
      title.push({text: key.name, style: 'textHeader'});
    }
    const doc = [];
    for (const key of this.data.tailoringData) {
      if (key.styleImage === undefined) {
        doc.push({text: key.name  + '    :    ' + key.value, style: 'textContent' , alignment: 'center'});
      } else {
        if (key.value === 'As Shown') {
          doc.push({text: key.name  + '    :    ' + key.value, style: 'textContent' , alignment: 'center'});
        } else {
          doc.push({text: key.name  + '    :    ' + key.value, style: 'textContent', width:35 , alignment: 'center'}, { image: 'data:image/jpeg;base64,' + key.base64, width: 50,  alignment: 'center',});
        }
        
      }
      
    }
    const dd = {

      content: [
        { text: 'Tailoring Service', style: 'header'},
        {
          columns: [
           
            {
              type: 'none',
              style: 'left',
              ul: [
                { text: 'Customer Details',
                style: 'subheader'},
                this.data.customer.firstName === undefined ? '' : this.data.customer.firstName + ' ' + this.data.customer.lastName === undefined ? '' : this.data.customer.lastName,
                this.data.customer.mobileNumber,
                this.data.customer.emailId
              ]
            },
         
            {
              type: 'none',
              style: 'right',
              ul: [
                { text: 'Vendor Details',
                style: 'subheader'},
                this.data.vendor.vendorName,
                this.data.vendor.vendorEmailId,
                this.data.vendor.vendorMobileNumber
              ]
            }
          ]
        },
        {
          columns: [
           /*  {
              type: 'none',
              ul: [
                [title + ':' + doc]
              ]
            }, */
            {
              type: 'none',
              ul: [
                [doc]
              ]
            }
          ],
        },
        /* {
           image: 'data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAADICAYAAAAePETBAAACsUlEQVR4Xu3TQREAAAiEQK9/aWvsAxMw4O06ysAommCuINgTFKQgmAEMp4UUBDOA4bSQgmAGMJwWUhDMAIbTQgqCGcBwWkhBMAMYTgspCGYAw2khBcEMYDgtpCCYAQynhRQEM4DhtJCCYAYwnBZSEMwAhtNCCoIZwHBaSEEwAxhOCykIZgDDaSEFwQxgOC2kIJgBDKeFFAQzgOG0kIJgBjCcFlIQzACG00IKghnAcFpIQTADGE4LKQhmAMNpIQXBDGA4LaQgmAEMp4UUBDOA4bSQgmAGMJwWUhDMAIbTQgqCGcBwWkhBMAMYTgspCGYAw2khBcEMYDgtpCCYAQynhRQEM4DhtJCCYAYwnBZSEMwAhtNCCoIZwHBaSEEwAxhOCykIZgDDaSEFwQxgOC2kIJgBDKeFFAQzgOG0kIJgBjCcFlIQzACG00IKghnAcFpIQTADGE4LKQhmAMNpIQXBDGA4LaQgmAEMp4UUBDOA4bSQgmAGMJwWUhDMAIbTQgqCGcBwWkhBMAMYTgspCGYAw2khBcEMYDgtpCCYAQynhRQEM4DhtJCCYAYwnBZSEMwAhtNCCoIZwHBaSEEwAxhOCykIZgDDaSEFwQxgOC2kIJgBDKeFFAQzgOG0kIJgBjCcFlIQzACG00IKghnAcFpIQTADGE4LKQhmAMNpIQXBDGA4LaQgmAEMp4UUBDOA4bSQgmAGMJwWUhDMAIbTQgqCGcBwWkhBMAMYTgspCGYAw2khBcEMYDgtpCCYAQynhRQEM4DhtJCCYAYwnBZSEMwAhtNCCoIZwHBaSEEwAxhOCykIZgDDaSEFwQxgOC2kIJgBDKeFFAQzgOG0kIJgBjCcFlIQzACG00IKghnAcFpIQTADGE4LKQhmAMNpIQXBDGA4LaQgmAEMp4UUBDOA4bQQLMgDPVAAyTJqMy8AAAAASUVORK5CYII='
        }, */
      /*   {
          image: 'data:image/jpeg;base64,' + backStyle,
         width: 100
       }, */
      /*  {
        image: 'data:image/jpeg;base64,' + sleeveStyle,
       width: 100
     }, */
   /*   {
      image: 'data:image/jpeg;base64,' + bottomStyle,
     width: 100
   } */
       /*  {
         
          style: 'tableExample',
          table: {
            headerRows: 1,
           
            body:[ document]
          },
          layout: {
            hLineWidth: function (i, node) {
              return (i === 0 || i === node.table.body.length) ? 2 : 1;
            },
            vLineWidth: function (i, node) {
              return (i === 0 || i === node.table.widths.length) ? 2 : 1;
            },
            hLineColor: function (i, node) {
              return 'black';
            },
            vLineColor: function (i, node) {
              return 'black';
            },
            hLineStyle: function (i, node) {
              if (i === 0 || i === node.table.body.length) {
                return null;
              }
              return {dash: {length: 10, space: 4}};
            },
            vLineStyle: function (i, node) {
              if (i === 0 || i === node.table.widths.length) {
                return null;
              }
              return {dash: {length: 4}};
            },
            
          }
        } */
      ],
      styles: {
        header: {
          fontSize: 18,
          alignment: 'center',
          bold: true
        },
        subheader: {
          fontSize: 15,
          bold: true
        },
        quote: {
          italics: true
        },
        left: {
          alignment: 'left',
        },
        right: {
          alignment: 'right'
        },
        small: {
          fontSize: 8
        },
        tableExample: {
          border: [false, false, false, false],
        },
        textHeader: {
          fontSize: 11,
          bold: true
        },
        textContent: {
          fontSize: 10,
          margin: [0, 1, 0, 0]
        },

      }
    };
    pdfMake.createPdf(dd).download();
  }
}
