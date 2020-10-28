// import Vue from 'vue'
// import VueGtm from 'vue-gtm';
 

// export default function ({ app ,store }) {
//   if(store.getters.getSettingObject && store.getters.getSettingObject.key_google_tag){
//     Vue.use(VueGtm, {
//       id: store.getters.getSettingObject.key_google_tag, // Your GTM single container ID or array of container ids ['GTM-xxxxxxx', 'GTM-yyyyyyy']
//       // queryParams: { // Add url query string when load gtm.js with GTM ID (optional)
//       //   gtm_auth:'AB7cDEf3GHIjkl-MnOP8qr',
//       //   gtm_preview:'env-4',
//       //   gtm_cookies_win:'x'
//       // },
//       enabled: true, // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
//       debug: false, // Whether or not display console logs debugs (optional)
//       loadScript: true, // Whether or not to load the GTM Script (Helpful if you are including GTM manually, but need the dataLayer functionality in your components) (optional) 
//       vueRouter: app.router, // Pass the router instance to automatically sync with router (optional)
//       ignoredViews: [] // If router, you can exclude some routes name (case insensitive) (optional)
//     });
//   }
// }


const axios = require('axios')

export default async function({ $gtm, route }) {
    const res = await axios.get(process.env.API+'backend/api/get-setting/google-tag')
    .then(({ data }) => {
        return data.key_google_tag
    }).catch(error => {
        return "GTM-XXXXXXX"
    })
  $gtm.init(res)
}