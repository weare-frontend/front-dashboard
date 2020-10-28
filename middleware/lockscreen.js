export default function ({ app, redirect ,route}) {
    if(app.$cookies.get('lockscreen') && route.name != 'dashboard-lockscreen'){
      return redirect('/dashboard/lockscreen')
    }
  }