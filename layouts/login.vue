<template>
  <div>
    <div class="wrapper ">
       <nuxt /> 
    </div>
    <page-notification /> 
  </div>
</template>


<script>
import Footer from '~/components/Footer.vue'
import Sidebar from '~/components/Sidebar.vue'
import Loading from '~/components/Loading.vue'
import Notification from '~/components/Notification.vue'

export default {
  head () {
    return {
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'robots', name: 'robots', content :'index,follow' },
        { property : 'description' ,hid: 'description', name: 'description', content: this.getSettingObject.title },
        { property : 'og:description' ,hid: 'og:description', name: 'og:description', content: this.getSettingObject.title },
        { property : 'og:type' ,hid: 'og:type', name: 'og:type', content: 'website' },
      ]
    }
  },
  components: {
    'page-sidebar' : Sidebar,
    'page-footer' : Footer,
    'page-loading' : Loading,
    'page-notification' : Notification,
  },
  computed: {
    getSettingObject : function(){
      return this.$store.getters.getSettingObject;
    },
  },
}
</script>


