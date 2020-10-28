<template>
  <div class="container" >
    <div class="text-left col-4" style="top:25px; position:absolute;">
         <nuxt-link :to="{name:'dashboard'}">
            <i  class="f7-icons text-white nuxt-link-active">chevron_left_circle_fill</i>
        </nuxt-link>
    </div>
    <div class="row justify-content-center">
      <div class="col-12">
        <page-promotions :slides="promotionArray" />
      </div>
    </div>
  </div>
</template>
<script>
import Promotions from "~/components/Promotions.vue";
export default {
  head() {
    return {
      title: "Promotions",
    };
  },
  asyncData: async function ({ $axios, env }) {
    const promotion = await $axios.$get(
      "/api/get-promotion/get-all-path-photo"
    );
    let promotionArray = promotion.data.map((item) => {
      item.img = env.API + item.img;
      return item;
    });
    return { promotionArray: promotionArray };
  },
  components: {
    "page-promotions": Promotions,
  },
  computed: {
    getSettingObject: function () {
      return this.$store.getters.getSettingObject;
    },
  },
  mounted: function () {
    console.log(this.promotionArray);
  },
};
</script>