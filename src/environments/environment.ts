// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: 'http://localhost:4200/api/v1',
  api_upload: 'https://upload.offer-117.shop/offer-upload-function',
  images_bucket: 'https://offer-images-public.s3.amazonaws.com',
  mapKey: 'AIzaSyCtalJi24kpS6SKQriHUD5nBSEndLKy43o',
  cognito: {
    userPoolId: 'us-east-1_JIbr3G8CW',
    userPoolWebClientId: 'pk8poqrf2f8rc7mi6lrfgnjrd',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
