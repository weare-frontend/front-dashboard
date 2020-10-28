<template>
<div class="container question">
    <h3 class="pt-5 text-danger text-center">ตอบคำถาม รับเครดิตฟรี</h3>
    <div class="row pb-5">
        <div class="col-12 my-2">
            <span class="my-2">(1) ระบุ LINE ID ของท่าน</span>
            <b-form-input v-model="q1" class="my-2" size="lg" placeholder="LINE ID"></b-form-input>
        </div>
        <div class="col-12 my-2">
            <span class="my-2">(2) ระบบที่ใช้งาน</span>
            <b-form-select class="my-2" v-model="q2">
                <template v-slot:first>
                    <b-form-select-option :value="null" disabled>-- กรุณาเลือก --</b-form-select-option>
                </template>
                <b-form-select-option value="1">ระบบ IOS</b-form-select-option>
                <b-form-select-option value="2">ระบบ Android</b-form-select-option>
            </b-form-select>
        </div>
        <div class="col-12 my-2">
            <span class="my-2">(3) สิ่งที่ลูกค้าสนใจในเว็บของเรา</span>
            <b-form-select class="my-2" v-model="q3">
                <template v-slot:first>
                    <b-form-select-option :value="null" disabled>-- กรุณาเลือก --</b-form-select-option>
                </template>
                <b-form-select-option value="1">โปรโมชั่นโบนัสเติมเงิน</b-form-select-option>
                <b-form-select-option value="2">โปรโมชั่นขาประจำ</b-form-select-option>
                <b-form-select-option value="3">แฮปปี้ไทม์</b-form-select-option>
                <b-form-select-option value="4">กิจกรรมชวนเพื่อน</b-form-select-option>
                <b-form-select-option value="5">กิจกรรมแลกของรางวัลสะสมแต้ม</b-form-select-option>
                <b-form-select-option value="6">กิจกรรมพิเศษแจกเครดิตฟรี</b-form-select-option>
                <b-form-select-option value="7">อื่นๆ</b-form-select-option>
            </b-form-select>
            <b-form-textarea v-show="q3==7" class="my-2" v-model="q3_other" placeholder="สิ่งที่สนใจในเว็บของเรา..." rows="2" max-rows="6"></b-form-textarea>
        </div>
        <div class="col-12 my-2">
            <span class="my-2">(4) ปัญหาที่พบบ่อย</span>
            <b-form-select class="my-2" v-model="q4">
                <template v-slot:first>
                    <b-form-select-option :value="null" disabled>-- กรุณาเลือก --</b-form-select-option>
                </template>
                <b-form-select-option value="1">ปัญหาเรื่อง การบริการของพนักงาน</b-form-select-option>
                <b-form-select-option value="2">ปัญหาเรื่อง ระบบฝากเงินอัตโนมัติ</b-form-select-option>
                <b-form-select-option value="3">ปัญหาเรื่อง ระบบการถอนเงิน</b-form-select-option>
                <b-form-select-option value="4">อื่นๆ</b-form-select-option>
            </b-form-select>
            <b-form-textarea v-show="q4==4" class="my-2" v-model="q4_other" placeholder="ปัญหาที่พบบ่อย..." rows="2" max-rows="6"></b-form-textarea>
        </div>
        <div class="col-12 my-2">
            <span class="my-2">(5) ข้อเสนอแนะ</span>
            <b-form-textarea class="my-2" v-model="q5" placeholder="ข้อเสนอแนะ..." rows="2" max-rows="6"></b-form-textarea>
        </div>
        <div class="col-12 my-2 text-right">
            <b-button variant="danger" @click="checkValidate" size="lg">ยืนยันคำตอบ <i class="fas fa-check-circle"></i></b-button>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            q1: null,
            q2: null,
            q3: null,
            q3_other: null,
            q4: null,
            q4_other: null,
            q5: null
        }
    },
    mounted() {
        this.checkQuestion()
    },
    methods: {
        checkQuestion() {
            this.$axios.$get("/api/free-credit-question/check").then(response => {
                if (response.success) {
                    return true
                } else {
                    this.$toast.global.error({
                        message: response.message,
                    });
                    this.$router.push({
                        path: `/dashboard`
                    });
                }
            });
        },
        checkValidate() {
            if (this.q1 == null && this.q2 == null && this.q3 == null && this.q4 == null && this.q5 == null) {
                this.$toast.global.error({
                    message: "กรุณาป้อนคำตอบให้ครบถ้วน",
                });
            } else {
                this.$axios.request({
                    method: "POST",
                    url: "/api/free-credit-question",
                    data: {
                        line_id: this.q1,
                        os_type: this.q2,
                        impress: this.q3,
                        impress_other: this.q3_other,
                        problem: this.q4,
                        problem_other: this.q4_other,
                        guidance: this.q5,
                    }
                }).then(response => {
                    if (response.data.success === true) {
                        this.$toast.global.success({
                            message: response.data.message,
                        });
                         this.$router.push({path: `/dashboard`});

                    } else {
                        this.$toast.global.error({
                            message: response.data.message,
                        });
                    }
                }).catch(error => {
                    this.$toast.global.error({
                        message: 'เกิดข้อผิดพลาด กรุณาลองใหม่ในภายหลัง',
                    });
                });
            }
        }
    }
}
</script>

<style>
.question span {
    font-size: 20px;
    font-weight: 200;
}

.question input {
    color: #fff;
}

.question .form-control:focus {
    color: #fff;
}
</style>
