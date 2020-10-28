<template>
<div class="container mb-4">
    <div class="col-4 text-left"  style="top:25px; position:absolute;">
        <nuxt-link :to="{name:'dashboard'}">
            <i class="f7-icons text-white nuxt-link-active">chevron_left_circle_fill</i>
        </nuxt-link>
    </div>
    <div class="col-12 mt-4">
        <h5 class="text-center text-white font-weight-100" style="border-radius: 15px;">สะสมแต้ม</h5>
    </div>
    <div class="row mb-3" v-if="getPromotionObjects[102].status">
        <div class="col-12 col-md-12">
            <img class="img-fluid" :src="getPromotionObjects[102].img_banner" style="border-radius: 10px;" alt />
        </div>
    </div>
    <div class="row">
        <div class="col">
            <h4 class="mb-0 font-weight-100 text-center text-template">{{ $auth.user.point }} แต้ม</h4>
            <p class="text-dark text-center mb-2">ยอดคงเหลือทั้งหมด</p>
        </div>
    </div>

    <div class="text-right">

        <b-tabs>
            <!-- <div class="text-right">
                <button style="width: 115px;">ของรางวัล</button>
                <button class="buttom-point">ประวัติการแลก</button>
            </div> -->

            <b-tab no-body title="ของรางวัล">
                <div class="row">
                    <div class="col-6">
                        <div class="form-group float-label active">
                            <input @keyup="searchDetaiItemArray" ref="searchArray" type="text" class="mt-2 form-control text-tem text-templateplate" placeholder="ค้นหา.." style="background-color: white;padding: 0px 15px;" />
                            <label class="form-control-label" style="color:#000;">ค้นหา</label>
                        </div>

                    </div>
                    <div class="col-6">
                        <div class="form-group float-label active">
                            <select @change="searchDetaiItemArray" class="mt-2 custom-select form-control text-template form-control-lg text-template" ref="searchTypeItemArray" style="background-color: white;padding: 0px 15px;">
                                <option disabled="disabled" value>-- เลือกประเภท --</option>
                                <option value>ประเภท (ทั้งหมด)</option>
                                <option value="0">Lifestyle</option>
                                <option value="1">Credit</option>
                                <option value="2">Gadget</option>
                            </select>
                            <label class="form-control-label text-dark" style="color:#000;">ประเภท</label>
                        </div>
                    </div>

                    <div class="col-6">
                        <div class="form-group float-label active">
                            <select @change="searchDetaiItemArray" class="custom-select form-control mt-2 form-control-lg" text-template ref="searchPointItemArray" style="background-color: white;padding: 0px 15px;">
                                <option disabled="disabled" value>-- เลือกช่วงคะแนน --</option>
                                <option value>ช่วงคะแนน (ทั้งหมด)</option>
                                <option :value="item.id" v-for="(item, index) in typeOptions" :key="index">{{ item.over ? `มากกว่า ${item.over} คะแนน` : `${item.between.start} - ${item.between.end} คะแนน`}}</option>
                            </select>
                            <label class="form-control-label text-dark" style="color:#000;">เลือกช่วงคะแนน</label>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="form-group float-label active">
                            <select @change="searchDetaiItemArray" class="mt-2 custom-select form-control form-control-lg text-template" ref="searchSortItemArray" style="background-color: white;padding: 0px 15px;">
                                <option disabled="disabled" value>-- เรียงลำดับคะแนน --</option>
                                <option value="0">น้อยไปมาก</option>
                                <option value="1">มากไปน้อย</option>
                            </select>
                            <label class="form-control-label" style="color:#000;">เรียงลำดับคะแนน</label>
                        </div>
                    </div>
                </div>
                <div class="row mt-2" ref="formSearchItem">
                    <div class="col-md-6 col-xs-6 mb-3" @click="boxConfirm(item.id)" v-for="(item, index) in itemPagination" :key="index">
                        <img class="img-fluid pointer" :src="showAPI + item.img" :alt="item.detail" />
                    </div>
                </div>
                <div class="text-template overflow-auto col-12 mt-2 mb-3" v-if="searchArray.length">
                    <b-pagination pills align="center" v-model="currentPage" @change="searchDetaiItemArray" :per-page="perPage" :total-rows="rows" size="md"></b-pagination>
                </div>

            </b-tab>

            <b-tab no-body title="ประวัติการแลก">

                <div class="card shadow border-0 mb-3" v-for="(item, index) in historyArray" :key="index">
                    <div class="card-body">
                        <div class="row">
                            <div class="col text-left">
                                <h6 class="font-weight-normal mb-1 text-warning">{{item.detail}}</h6>
                                <p class="small text-secondary mb-2">
                                    <span class="badge small vm text-white" :class="[{ 'badge-info' :  item.accept_status == 0 ,'badge-success' :  item.accept_status == 1 ,'badge-danger' :  item.accept_status != 0 && item.accept_status != 1 } ] ">{{ toStatusString(item.accept_status) }}</span>
                                </p>
                                <p class="text-mute small text-secondary mb-2">{{item.create_at}}</p>
                                <div class="progress h-4">
                                    <div class="progress-bar" :class="[{ 'bg-info w-50' :  item.accept_status == 0 ,'bg-success  w-100' :  item.accept_status == 1,'bg-danger  w-100' :  item.accept_status != 0 && item.accept_status != 1 }]" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                            <div class="col-auto pl-0">
                                <button class="avatar avatar-50 no-shadow border-0 bg-template">
                                    <i class="material-icons">card_giftcard</i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card shadow border-0 mb-3 text-center" v-if="!historyArray.length">
                    <div class="card-body text-center">
                        <div class="avatar avatar-60 shadow border-0 bg-template" style="border-radius: 50%;">
                            <i class="material-icons vm md-36 text-white">redeem</i>
                        </div>

                        <h4 class="mt-3 mb-0 font-weight-normal text-dark">ไม่มีรายการแลกของรางวัล</h4>
                        <p class="text-secondary text-mute small">จะแสดงรายการแลกของรางวัลทั้งหมด</p>
                    </div>
                </div>

            </b-tab>
        </b-tabs>

    </div>

    <div class="col-12">
        <div class="tab-content">
            <div id="home" class="tab-pane fade in active"></div>

            <div id="menu1" class="tab-pane fade"></div>
        </div>
    </div>
    <!-- Dialog -->
    <confirm-dialog title="ยืนยันการแลกรางวัล" acceptText="ยืนยัน" cancelText="ยกเลิก" :active="pointActive" @hide="hidePointDialog" @submit="onSubmitPoint">
        <div class="text-center py-4">
            <vnodes :vnodes="messageVNode" />
        </div>

    </confirm-dialog>
</div>
</template>

<script>
import ConfirmDialog from "~/components/common/ConfirmDialog.vue"
export default {
    head() {
        return {
            title: "Point",
        };
    },
    data: () => ({
        currentPage: 1,
        perPage: 10,
        pointActive: false,
        messageVNode: null
    }),
    components: {
        "confirm-dialog": ConfirmDialog,
        Vnodes: {
            functional: true,
            render: (h, ctx) => ctx.props.vnodes
        }
    },
    computed: {
        showAPI: function () {
            return this.getSettingObject.share_reward ?
                this.getSettingObject.link_share_reward + "/web/rewards/" :
                process.env.API + "backend/web/rewards/";
        },
        rows: function () {
            return this.searchArray.length;
        },
        itemPagination: function () {
            return this.searchArray.slice(
                (this.currentPage - 1) * this.perPage,
                this.perPage * this.currentPage
            );
        },
        getPromotionObjects() {
            return this.$store.getters.getPromotionObjects;
        },
        getSettingObject() {
            return this.$store.getters.getSettingObject;
        },
    },
    mounted: function () {
        if (!this.getPromotionObjects[102].status) {
            this.$toast.global.error({
                message: "COMING SOON..."
            });
            this.$router.push({
                name: "dashboard"
            });
        }
    },
    asyncData: async function ({
        $axios,
        $auth
    }) {
        // if (this.$refs.searchArray.value.match(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi)){
        //     this.$toast.global.error({
        //         message: "ห้ามว่างและเป็นภาษาไทยทั้งหมด",
        //     });
        // }
        const {
            data
        } = await $axios.$get("/api/reward");
        const historyData = await $axios.$get("/api/player-reward-history", {
            params: {
                account_api: $auth.user.account_api
            },
        });
        const typeOptions = [{
                id: 0,
                between: {
                    start: 1,
                    end: 12000
                }
            },
            {
                id: 1,
                between: {
                    start: 12000,
                    end: 24000
                }
            },
            {
                id: 2,
                between: {
                    start: 24000,
                    end: 36000
                }
            },
            {
                id: 3,
                between: {
                    start: 36000,
                    end: 48000
                }
            },
            {
                id: 4,
                between: {
                    start: 48000,
                    end: 60000
                }
            },
            {
                id: 5,
                between: {
                    start: 60000,
                    end: 72000
                }
            },
            {
                id: 6,
                over: 72000
            },
        ];
        if (!historyData) {
            this.$toast.global.error({
                message: "ไม่สามารถ..."
            });
        }
        return {
            historyArray: historyData.data,
            itemArray: data,
            searchArray: data,
            typeOptions: typeOptions,
        };
    },
    methods: {
        hidePointDialog(val) {
            this.pointActive = val
        },
        onSubmitPoint() {
            this.acceptReward(this.id);
            this.pointActive = false
        },
        boxConfirm: function (id) {
            var item = this.itemArray.find((item) => item.id == id);
            const h = this.$createElement;
            const messageVNode = h("div", {
                class: ["text-center text-white"]
            }, [
                h("img", {
                    attrs: {
                        class: ["img-fluid mb-3"],
                        src: [this.showAPI + item.img]
                    },
                }),
                h("h5", {
                    class: ["text-center"]
                }, [`ชื่อของรางวัล ${item.detail}`]),
                h("p", {
                    class: ["text-center text-white"]
                }, [
                    `ใช้ทั้งหมด ${item.reward_point} คะแนน`,
                ]),
            ]);
            this.pointActive = true
            this.id = id
            this.messageVNode = messageVNode
            // this.$bvModal
            //     .msgBoxConfirm(messageVNode, {
            //         title: "โปรดยืนยันว่าคุณต้องการแลกของรางวัล",
            //         size: "md",
            //         buttonSize: "md",
            //         okVariant: "success",
            //         okTitle: "ยืนยัน",
            //         cancelTitle: "ยกเลิก",
            //         footerClass: "p-2",
            //         hideHeaderClose: false,
            //         centered: true,
            //     })
            //     .then((value) => {
            //         if (value) this.acceptReward(id);
            //     });
        },
        searchDetaiItemArray: async function () {
            // if ((this.searchArray.value.match(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}/]+$/))){
            //     this.$toast.global.error({
            //         message: "ห้ามว่างและเป็นภาษาไทยทั้งหมด",
            //     });
              
            // }
            const loader = this.$loading.show({
                container: this.$refs.formSearchItem,
            });
             let search = "";
            if ((this.$refs.searchArray.value.match(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}/]+$/))){
                this.$toast.global.error({
                    message: "กรุณากรอกข้อมูลให้ถูกต้อง",
                });
                setTimeout(function(){
                    loader.hide();
                },400);
                return false;
            }else{
               search = new RegExp(this.$refs.searchArray.value, "i"); 
            }
            
            this.searchArray = await this.itemArray.filter((item) =>
                search.test(item.detail)
            );
            if (this.$refs.searchTypeItemArray.value != "")
                this.searchArray = await this.searchArray.filter(
                    (item) => item.reward_item == this.$refs.searchTypeItemArray.value
                );
            if (this.$refs.searchPointItemArray.value) {
                var findBetweenPiont = this.typeOptions.find(
                    (item) => item.id == this.$refs.searchPointItemArray.value
                );
                this.searchArray = await this.searchArray.filter((item) =>
                    findBetweenPiont.over ?
                    item.reward_point >= findBetweenPiont.over :
                    item.reward_point >= findBetweenPiont.between.start &&
                    item.reward_point <= findBetweenPiont.between.end
                );
            }

            if (this.$refs.searchSortItemArray.value == 0) {
                this.searchArray = await this.searchArray.sort(
                    (a, b) => a.reward_point - b.reward_point
                );
            }

            if (this.$refs.searchSortItemArray.value == 1) {
                this.searchArray = await this.searchArray.sort(
                    (a, b) => b.reward_point - a.reward_point
                );
            }

            loader.hide();
        },
        acceptReward: async function (id) {
            const loader = this.$loading.show({
                "is-full-page": true
            });
            const {
                success,
                data
            } = await this.$axios.$get(
                "/api/player-reward-accept", {
                    params: {
                        id: id
                    },
                }
            );
            if (success) {
                this.$auth.fetchUser();
                this.$toast.global.success({
                    message: data
                });
            } else {
                this.$toast.global.error({
                    message: data
                });
            }
            loader.hide();
        },
        toStatusString: function (value) {
            value = parseInt(value);
            switch (value) {
                case 0:
                    return "รอการตรวจสอบ";
                    break;
                case 1:
                    return "อนุมัติ";
                    break;
                default:
                    return "ไม่อนุมัติ";
                    break;
            }
        },
    },
};
</script>

<style scoped>
.bg-input {
    background-color: white;
    padding: 0px 15px;
    color: #550202;
}

.nav-tabs .nav-link {
    margin-bottom: -1px;
    width: 50%;
    /* padding: 17px 19px 29px 57px; */
    border: 0;
    /* border-radius: 15px 15px 0 0; */
}

.pointer {
    cursor: pointer;
}
</style>
