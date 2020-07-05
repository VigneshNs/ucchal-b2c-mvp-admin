 // This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// export const environment = {
//   production: false,
//   imageUploadServiceUrl:  'http://localhost:3200/',
//   productServiceUrl: 'http://localhost:3072/',
//   /* productServiceUrl: 'https://7hs6v5qhs4.execute-api.ap-south-1.amazonaws.com/qa/', */
//   marketingServiceUrl: 'http://localhost:3117/',
//   cmsServiceUrl: 'http://localhost:3110/',
//   /* cmsServiceUrl: 'https://065h6q6de3.execute-api.ap-south-1.amazonaws.com/qa/', */
//   productImageUrl: 'https://product-microservice-image.s3.ap-south-1.amazonaws.com/images/product/',
//   sizeGuideImageUrl: 'https://product-microservice-image.s3.ap-south-1.amazonaws.com/images/size/',
//   categoryImageUrl: 'https://product-microservice-image.s3.ap-south-1.amazonaws.com/images/category/',
//   brandImageUrl: 'https://product-microservice-image.s3.ap-south-1.amazonaws.com/images/brand/',
//   vendorImageServiceUrl: 'https://ucchalfashion-images.s3.ap-south-1.amazonaws.com/images/',
//   excelUrl:  'https://ucchalfashion-images.s3.ap-south-1.amazonaws.com/excel/',
//   subCategoryImageUrl: 'https://product-microservice-image.s3.ap-south-1.amazonaws.com/images/subcategory/',
//   /* cmsServiceUrl: 'https://5au0d7kvok.execute-api.ap-south-1.amazonaws.com/qa/', */
//   commerceOrderServiceUrl: 'http://localhost:3112/',
//   customerSerivceUrl: 'http://localhost:3111/',
//   appId: 'ucchal'
// };
 export const environment = {
  production: false,
  // imageUploadServiceUrl: 'https://d90agzc3m7.execute-api.ap-south-1.amazonaws.com/qa/',
  /* imageUploadServiceUrl:  'http://localhost:3200/', */
  imageUploadServiceUrl: 'https://d90agzc3m7.execute-api.ap-south-1.amazonaws.com/qa/',
  mainCategoryBannerImageUrl: 'https://ucchalfashion-product-images.s3.ap-south-1.amazonaws.com/images/maincategory/',
  productImageUrl: 'https://ucchalfashion-product-images.s3.ap-south-1.amazonaws.com/images/product/',
  // measurementImageUrl: 'https://product-microservice-image.s3.ap-south-1.amazonaws.com/images/measurement/',
  measurementImageUrl: 'https://ucchalfashion-product-images.s3.ap-south-1.amazonaws.com/images/measurement/', 
  howToMeasureImageUrl: 'https://ucchalfashion-product-images.s3.ap-south-1.amazonaws.com/images/howtomeasure/',
  sizeGuideImageUrl: 'https://ucchalfashion-product-images.s3.ap-south-1.amazonaws.com/images/size/',
  categoryImageUrl: 'https://ucchalfashion-product-images.s3.ap-south-1.amazonaws.com/images/category/',
  // cmsServiceUrl: 'https://065h6q6de3.execute-api.ap-south-1.amazonaws.com/qa/',
  cmsServiceUrl: 'http://localhost:3110/',
  commerceOrderServiceUrl: 'https://ddxia2qpii.execute-api.ap-south-1.amazonaws.com/qa/',
  productServiceUrl: 'http://localhost:3072/',
// productServiceUrl: 'https://9z5k5sxgc0.execute-api.ap-south-1.amazonaws.com/qa/',
  //  productServiceUrl: 'https://7hs6v5qhs4.execute-api.ap-south-1.amazonaws.com/qa/', 
  /* marketingServiceUrl: 'http://localhost:3117/', */
  categoryBannerImageUrl: 'https://ucchalfashion-product-images.s3.ap-south-1.amazonaws.com/images/categorybanner/',
  subCategoryImageUrl: 'https://ucchalfashion-product-images.s3.ap-south-1.amazonaws.com/images/subcategory/',
  brandImageUrl: 'https://ucchalfashion-product-images.s3.ap-south-1.amazonaws.com/images/brand/',
  // marketingServiceUrl: 'https://9p6levewy7.execute-api.ap-south-1.amazonaws.com/qa/',
  vendorImageServiceUrl: 'https://ucchalfashion-images.s3.ap-south-1.amazonaws.com/images/',
  marketingServiceUrl: 'https://9p6levewy7.execute-api.ap-south-1.amazonaws.com/qa/',
  //  commerceOrderServiceUrl: 'http://localhost:3112/',
  /* customerSerivceUrl: 'http://localhost:3111/', */
  customerSerivceUrl: 'https://7vkipfu9da.execute-api.ap-south-1.amazonaws.com/qa/',
  excelUrl:  'https://ucchalfashion-images.s3.ap-south-1.amazonaws.com/excel/',
  parentResizeId: 1,
  childResizeId: 2,
  limitResize: 500,
  appId: 'ucchal'
 };
 /* * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
