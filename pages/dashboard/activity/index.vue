<template>
<div>
    <div class="col-4 text-left" style="top:25px; position:absolute;">
        <nuxt-link :to="{name:'dashboard'}">
            <i class="f7-icons text-white nuxt-link-active">chevron_left_circle_fill</i>
        </nuxt-link>
    </div>
    <div class="mt-4 col-12">
        <h5 class="text-center text-white font-weight-100" style="border-radius: 15px;"><i class="text fas fa-gift"></i> กิจกรรม</h5>
    </div>
    <div class="panel-center">
        <div class="container">
            <div class="row" v-for="(item, index) in getPromotionArray" :key="index">
                <div class="w-100 mx-2" v-if="rotues[item.id] && item.status">
                    <div class="col-12 mb-3">
                        <div class="card" style="border-bottom: 1px solid #555;">
                            <nuxt-link v-if="item.id!=103" :to="{name : rotues[item.id]}" class="text-center px-2">
                                <div class="d-flex align-items-center" style="height: 95px;">
                                    <div class="avatar avatar-60 border-0 bg-dark text-white" :class="[{'font-size-vh' : !rotues[item.id]}]" :style="'background-image:url('+item.img_banner+'); background-size:100%;'">
                                        <i class="material-icons" v-if="rotues[item.id]=='share'" @click="facebookShare">share</i>
                                    </div>
                                    <div class="p-2 flex-grow-1 bd-highlight">
                                        <h6 class="text-left mb-0 font-weight-normal text-template">
                                            {{item.pro_name}}
                                            <small class="badge badge-dark text-white" style="float:right;">{{ item.status == 1 && rotues[item.id] ? 'เข้าร่วม' : 'ปิด'}}</small>
                                        </h6>
                                    </div>
                                </div>
                            </nuxt-link>
                            <div v-else class="text-center px-2" style="cursor: pointer;">
                                <!-- share facebook (id 103)-->
                                <div v-if="item.id==103" @click="facebookShare()" class="d-flex align-items-center" style="height: 95px;">
                                    <div class="avatar avatar-60 border-0 bg-dark text-white" :class="[{'font-size-vh' : !rotues[item.id]}]" :style="' background-size:100%;'">
                                        <i class="material-icons">share</i>
                                    </div>
                                    <div class="p-2 flex-grow-1 bd-highlight">
                                        <h6 class="text-left mb-0 font-weight-normal text-template">
                                            {{item.pro_name}}
                                            <small class="badge badge-dark text-white" style="float:right;">{{ item.status == 1 && rotues[item.id] ? 'เข้าร่วม' : 'ปิด'}}</small>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    head() {
        return {
            title: "Activity",
            api_img: process.env.API,
        };
    },
    data() {
        return {
            rotues: {
                103: "share",
                116: "dashboard-activity-giftbox",
                127: "dashboard-activity-question",
                126: "dashboard-activity-cashback",
            },
            proSheare: ''
        }
    },
    computed: {
        getPromotionObjects: function () {
            return this.$store.getters.getPromotionObjects;
        },
        getPromotionArray: function () {
            return this.$store.getters.getPromotionArray;
        },
    },
    async asyncData({
        $axios
    }) {
        const checkProSheare = await $axios.$get(
            "api/free-bonus/check-pro-facebookshare"
        );
        return {
            proSheare: checkProSheare
        };
    },
    methods: {
        checkProShare() {
            const loader = this.$loading.show({
                container: this.$refs.formInfoUser
            });
            this.$store.dispatch("setLoading", true);
            this.$axios
                .$post("api/free-bonus/check-pro-facebookshare", "")
                .then((response) => {
                    this.check103 = response;
                });
        },
        facebookShare: async function () {
            var self = this;
            let shareUrl = JSON.parse(this.proSheare.data.values_json);
            FB.init({
                appId: shareUrl.appID,
                autoLogAppEvents: true,
                xfbml: true,
                version: "v6.0",
            });
            await this.$axios
                .$get("api/free-bonus/check-topup-facebook")
                .then((response) => {
                    if (response.success) {
                        FB.ui({
                                method: "feed",
                                link: shareUrl.url,
                            },
                            function (response) {
                                if (response) {
                                    if (response.length == 0) {
                                        self.$axios
                                            .$get("api/free-bonus/get-credit-facebook")
                                            .then((response) => {
                                                if (response.success) {
                                                    self.$toast.global.success({
                                                        message: response.message,
                                                    });
                                                } else {
                                                    self.$toast.global.error({
                                                        message: response.message,
                                                    });
                                                }
                                            });
                                    }
                                } else {
                                    self.$toast.global.error({
                                        message: "คุณแชร์ Facebook ไม่สำเร็จ !!",
                                    });
                                }
                            }
                        );
                    } else {
                        self.$toast.global.error({
                            message: response.message
                        });
                    }
                });
        },
    },
    mounted: function () {
        if (
            !this.getPromotionObjects[103].status &&
            !this.getPromotionObjects[116].status &&
            !this.getPromotionObjects[126].status
        ) {
            this.$toast.global.error({
                message: "COMING SOON..."
            });
            this.$router.push({
                name: "dashboard"
            });
        }
    },
};
</script>

<style scoped>
.shadow-custom {
    box-shadow: 0 0rem 0.6rem #a68750 !important;
}

.font-size-vh {
    font-size: 1vh;
}
</style>
