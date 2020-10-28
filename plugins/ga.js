/* eslint-disable */
const axios = require('axios')

export default async ({ app }) => {
    /*
    ** Only run on client-side and only in production mode
    */
    if (process.env.NODE_ENV !== 'production') return
    /*
    ** Include Google Analytics Script
    */
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    /*
    ** Set the current page
    */
    // ga('create', 'UA-165860776-1', 'auto')
    // ga('create', 'UA-XXXXXXX-X', 'auto')

    const res = await axios.get(process.env.API+'backend/api/get-setting/google-tag')
    .then(({ data }) => {
        // return data.key_google_tag
      ga('create', `${data.key_google_analytic}`, 'auto')
    }).catch(error => {
      ga('create', 'UA-XXXXXXX-X', 'auto')
    })
    /*
    ** Every time the route changes (fired on initialization too)
    */
    app.router.afterEach((to, from) => {
      /*
      ** We tell Google Analytics to add a pageview
      */
      ga('set', 'page', to.fullPath)
      ga('send', 'pageview')
    })
  }