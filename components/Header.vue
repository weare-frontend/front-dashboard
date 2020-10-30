<template>
  <!-- header -->
  <div class="header bg-template" v-show="$auth.loggedIn">
    <div class="row no-gutters justify-content-center">
      <div class="col-3 text-center">
        <!-- <i class="pr-4 f7-icons font-weight-100 text-white mt-5">person_crop_circle</i>
        <small class=" size-9 col-user">
          <span class="font-weight-100">{{ $auth.user.account_api}}</span>
          <i class="p-2 f7-icons font-weight-400 text-white size-14" @click="$refs['modal-logout'].show()">power</i>
        </small> -->
      </div>
      <div class="col-6 text-center my-3">
        <nuxt-link :to="{name : 'dashboard'}">
          <img :src="getThemeObject[2].img" alt class="header-logo" style="height:100px;" />
        </nuxt-link>
      </div>
      <div class="col-3 text-right py-2">      
        <button class="btn btn-link text-white bg-white menu-btn mt-3 mr-4">
          <span class="material-icons">more_horiz</span>
        </button>
        </div>
    </div>
    <!-- <div class="x-ocean-contact-us text-center">
      <div class="dot"></div> Light
    </div>
    <div class="x-ocean-contact-us text-center" style="margin-top:35px;">
      <div class="dot"></div> Color
    </div> -->
  </div>
  <!-- header ends -->
</template>

<style>
.x-ocean-contact-us {
  z-index: 999;
  right: 0;
  position: absolute;
  border-top: solid 2px #fff;
  width: 65px;
  top: 70px;
  font-size: 12px;
  padding: 4px 0 4px 18px;
  background: hsl(0deg 0% 4% / 37%);
  border-top-left-radius: 24px;
  border-bottom-left-radius: 24px;
}
.text-shape {
  font-weight: lighter;
}
.input-group-text {
  padding: 0.375rem 0.2rem;
  background-color: #ffff;
}
.dot {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  position: absolute;
  left: 6px;
  margin-top: 1px;
  filter: drop-shadow(0px 1px 2px #000);
}
.col-user {
  align-items: center;
  font-size: 3vw;
  white-space: nowrap;
  margin-right: 10px;
}
/* .col-user i{
  font-size: 18px;
} */
.font-size-22 {
  font-size: 32px;
}
.marquees-text {
  height: 50px;
  overflow: hidden;
  position: relative;
}

.marquees-text p {
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0;
  line-height: 50px;
  text-align: center;
  /* Starting position */
  -moz-transform: translateX(100%);
  -webkit-transform: translateX(100%);
  transform: translateX(100%);
  /* Apply animation to this element */
  -moz-animation: marquees-text 8s linear infinite;
  -webkit-animation: marquees-text 8s linear infinite;
  animation: marquees-text 8s linear infinite;
}

/* Move it (define the animation) */
@-moz-keyframes marquees-text {
  0% {
    -moz-transform: translateX(100%);
  }

  100% {
    -moz-transform: translateX(-100%);
  }
}

@-webkit-keyframes marquees-text {
  0% {
    -webkit-transform: translateX(100%);
  }

  100% {
    -webkit-transform: translateX(-100%);
  }
}

@keyframes marquees-text {
  0% {
    -moz-transform: translateX(100%);
    /* Firefox bug fix */
    -webkit-transform: translateX(100%);
    /* Firefox bug fix */
    transform: translateX(100%);
  }

  100% {
    -moz-transform: translateX(-100%);
    /* Firefox bug fix */
    -webkit-transform: translateX(-100%);
    /* Firefox bug fix */
    transform: translateX(-100%);
  }
}
</style>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      userfullname: this.$auth.user.fullname,
    };
  },
  computed: {
    ...mapGetters(["getThemeObject", "getSettingObject"]),
    getThemeObject() {
      return this.$store.getters.getThemeObject;
    },
  },
  mounted: function () {
    if (this.$auth.user.fullname.length > 11)
      this.userfullname = this.$auth.user.fullname.substring(0, 11) + "...";
    if (this.$auth.user.account_api.length > 11)
      this.useraccount_api =
        this.$auth.user.account_api.substring(0, 11) + "...";

    $(".menu-btn").on("click", function (e) {
      e.stopPropagation();
      if ($("body").hasClass("sidemenu-open") == true) {
        $("body, html").removeClass("sidemenu-open");
        setTimeout(function () {
          $("body, html").removeClass("menuactive");
        }, 500);
      } else {
        $("body, html").addClass("sidemenu-open menuactive");
      }
    });
    $(".wrapper, .closesidemenu , .list-group-item-action").on(
      "click",
      function () {
        if ($("body").hasClass("sidemenu-open") == true) {
          $("body, html").removeClass("sidemenu-open");
          setTimeout(function () {
            $("body, html").removeClass("menuactive");
          }, 500);
        }
      }
    );
  },
  methods: {
    userLogout: async function () {
      this.$refs["modal-logout"].hide();
      this.$nuxt.$loading.start();
      this.$toast.global.success({
        message: "ออกจากระบบสำเร็จแล้ว",
      });
      this.$auth.logout();
      if (
        this.getSettingObject.link_front &&
        !this.getSettingObject.link_front.includes("localhost")
      ) {
        window.location.replace(this.getSettingObject.link_front);
      }
    },
  },
};
</script>
