<template>
<div class="container mb-5">
    <div class="col-4 text-left" style="top:25px; position:absolute;">
        <nuxt-link :to="{name:'dashboard'}">
            <i class="f7-icons text-white nuxt-link-active">chevron_left_circle_fill</i>
        </nuxt-link>
    </div>
    <div class="row justify-content-center mt-4" v-if="getPromotionObjects[106].status">
        <div class="col-12 col-md-8 px-5">
            <h5 class="text-center font-weight-100 text-white mb-3">ฝากประจำ</h5>
            <img class="img-fluid" :src="getPromotionObjects[106].img_banner" alt style="border-radius: 10px">

            <div class="row mt-3" v-for="(row, index) in rows" :key="index">
                <div class="col px-1" @click="boxConfirm((index * colunms + (colunm)))" v-for="(colunm, key) in colunms" :key="key">
                    <div class="card shadow border-0 text-center" :class="{'bg-template': (index * colunms + (colunm)) <= countDate , 'push': dailyArray[(index * colunms + (colunm))] }">
                        <div class="card-body p-2">
                            <h4 class="mb-0 font-weight-normal" :class="{'text-muted' : (index * colunms + (colunm)) > countDate }">{{ index * colunms + (colunm) }}</h4>
                            <p style="white-space: nowrap;" class="text-warning small" v-if="dailyArray[(index * colunms + (colunm))]<=countDate">
                                {{'รับ ' +dailyArray[(index * colunms + (colunm))].credit}}
                                <small></small>
                            </p>
                            <p style="white-space: nowrap;" class="text-warning small" v-else-if="dailyArray[(index * colunms + (colunm))]">
                                {{'รับ ' +dailyArray[(index * colunms + (colunm))].credit}}
                                <small></small>
                            </p>
                            <p class="text-secondary small" v-else>วันที่ {{(index * colunms + (colunm))}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Dialog -->
    <confirm-dialog 
      title="ยืนยันว่าคุณต้องการรับรางวัล" 
      acceptText="ยืนยัน" 
      cancelText="ยกเลิก" 
      :active="dailyActive" 
      @hide="hideDailyDialog"
      @submit="onSubmitDaily"
    >
        <div class="text-center py-4">
      
            <vnodes :vnodes="messageVNode"/>
        </div>
    </confirm-dialog>
</div>
</template>

<script>
import ConfirmDialog from "~/components/common/ConfirmDialog.vue"
var _ = require("underscore");
export default {
    head() {
        return {
            title: "Daily",
        };
    },
    components: {
        "confirm-dialog": ConfirmDialog,
        Vnodes: {
          functional: true,
          render: (h, ctx) => ctx.props.vnodes
        }
    },
    data: () => ({
        rows: 3,
        colunms: 5,
        dailyActive: false,
        day: null,
        messageVNode: null
    }),
    computed: {
        getPromotionObjects() {
            return this.$store.getters.getPromotionObjects;
        },
    },
    mounted: function () {
        if (!this.getPromotionObjects[106].status) {
            this.$toast.global.error({
                message: "COMING SOON..."
            });
            this.$router.push({
                name: "dashboard"
            });
        }
    },
    asyncData: async function ({
        $axios
    }) {
        const {
            data
        } = await $axios.$get("/api/daily");
        var dailyDay = _.indexBy(data.daily, "day");
        return {
            dailyArray: dailyDay,
            countDate: data.count_date
        };
    },
    methods: {
        hideDailyDialog(val) {
            this.dailyActive = val
        },
        onSubmitDaily(){
            this.acceptDaily(this.day)
        },
        acceptDaily: async function (day) {
            const daily = await this.$axios.$post("/api/daily-accecpt", {
                day: day
            });
            if (daily.success) {
                window.location = "/dashboard/daily";
                return this.$toast.global.success({
                    message: daily.message ? daily.message : "ได้รับรางวัลเรียบร้อยแล้ว",
                });
            }
            if (!daily.success)
                return this.$toast.global.error({
                    message: daily.msg ? daily.msg : "ไม่สามารถรับได้",
                });
        },
        boxConfirm: function (day) {
            const item = this.dailyArray[day];
            if (!item) return false;
            const h = this.$createElement;
            const messageVNode = h("div", {
                class: ["text-center text-white"]
            }, [
                h("h5", {
                    class: ["text-center"]
                }, [
                    `รับโปรโมชั่นของวันที่ ${item.day}`,
                ]),
                h("p", {
                    class: ["text-center"]
                }, [
                    `ได้รับรางวัล  ${item.credit} บาท`,
                ]),
            ]);
            this.dailyActive = true
            this.day = day
            this.messageVNode = messageVNode

            /*this.$bvModal
                .msgBoxConfirm(messageVNode, {
                    title: "โปรดยืนยันว่าคุณต้องการรับรางวัล",
                    size: "md",
                    buttonSize: "md",
                    okVariant: "success",
                    okTitle: "ยืนยัน",
                    cancelTitle: "ยกเลิก",
                    footerClass: "p-2",
                    hideHeaderClose: false,
                    centered: true,
                })
                .then((value) => {
                    if (value) this.acceptDaily(day);
                });*/
        },
        findDaily(day) {
            const item = this.dailyArray.find((item) => item.day == day);
            return item;
        },
    },
};
</script>

<style>
.bg-template.push {
    border-radius: 10px;
    background-color: coral;
    -webkit-animation-duration: 1.4s;
    /* Safari 4.0 - 8.0 */
    -webkit-animation: fade-img 1.4s infinite;
    animation: fade-img 1.4s infinite;
    animation-duration: 1.4s;
}

@keyframes fade-img {
    0% {
        color: warning;
        margin-top: -4px;
        margin-left: -4px;
        border: solid 2px #fff;
        background-color: coral;
    }

    50% {
        margin-top: 0px;
        margin-left: 0px;
        border: solid 0px #fff;
        color: white;
        background: rgb(175, 171, 171);
    }

    100% {
        color: warning;
        margin-top: -4px;
        margin-left: -4px;
        border: solid 2px #fff;
        background-color: coral;
    }
}
</style>
