<template>
<div>
    <div class="register header bg-white">
        <div class="row no-gutters">
            <div class="col-3 text-left my-4 px-3">
                <nuxt-link :to="{name:'dashboard'}">
                    <i class="f7-icons text-template nuxt-link-active">chevron_left_circle_fill</i>
                </nuxt-link>
            </div>
            <div class="col-6 text-center my-4">
                <nuxt-link :to="{name : 'dashboard'}" class="text-center">
                    <b-img class="img-logo logo-small" :src="getThemeObject[2].img|| ''" alt="Responsive image"></b-img>
                </nuxt-link>
            </div>
            <div class="col-3"></div>
        </div>
    </div>
    <!-- header ends -->
    <div class="row no-gutters login-row justify-content-center bg-template pb-5 bg-theme" ref="formRegisterUser">
        <div class="col-12 col-md-6 px-3 pt-2">
            <!-- ----------------START @STEP 1 ----------------  -->
            <form class="form-signin mt-1 animated fadeIn" v-show="step == 1">
                <h5 class="text-center text-white font-weight-100" style="padding-top: 1rem;">
                    เงื่อนไขและข้อตกลงในการสมัคร
                </h5>
                <div class="row card bg-white px-2 py-4 mx-1" style="margin-top: 1.5rem;">
                    <div class="col-12 text-template">
                        <p class="font-weight-100 size-16">
                            1). หมายเลขโทรศัพท์ที่ใช้ ต้องสามารถรับ ข้อความได้ เพราะระบบจำเป็นต้องส่งรหัส
                            ยืนยันไปยังหมายเลขโทรศัพท์ของท่าน มิเช่นนั้นจะไม่สามารถทำรายการต่างๆได้
                        </p>
                        <p class="font-weight-100 size-16">2). ชื่อ - นามสกุล จะต้องตรงกับข้อมูลบัญชี มิเช่นนั้นจะไม่สามารถถอนเงินได้</p>
                        <p class="font-weight-100 size-16">3). ต้องใช้บัญชีที่สมัครฝากเงินเข้ามาเท่านั้น</p>
                        <p class="font-weight-100 size-16">
                            4). ถ้าเกิดข้อผิดพลาดของระบบ ให้ทำการ แจ้งพนักงานทันที กรณีที่ไม่แจ้ง ทางเรา
                            ขอสงวนสิทธิ์การถอนเงิน ทุกกรณี
                        </p>
                        <p class="font-weight-100 size-16">
                            5). สมาชิก 1 คน ต่อ 1 ไอดีเท่านั้น กรณีตรวจพบว่ามีการสมัครหลายไอดี ทางเราจะสงวนสิทธิ์การถอน
                            ทุกกรณี
                        </p>
                    </div>
                </div>
                <div class="my-4 custom-control custom-checkbox">
                    <input type="checkbox" class="custom-control-input" @change="removeValidation('checkBoxCondition')" :class="{'is-invalid' : formValidation('checkBoxCondition')}" ref="checkBoxCondition" id="checkBoxCondition" />
                    <label class="custom-control-label text-white pt-1 font-weight-100" for="checkBoxCondition">ยอมรับเงื่อนไขและข้อตกลงทั้งหมด</label>
                    <div class="invalid-feedback">{{ formValidation('checkBoxCondition') }}</div>
                </div>
                <div class="row mx-2 bottom-button-container justify-content-center btn-unset">
                    <div class="col-lg-6 font-weight-100">
                        <a id="accept-condition" class="btn btn-md shadow btn-block btn-theme" @click="nextStepCondition">ถัดไป</a>
                    </div>
                </div>
            </form>
            <!-- ----------------END @STEP 1 ----------------  -->

            <!-- ----------------START @STEP 2 ----------------  -->
            <form class="form-signin mt-3 animated fadeIn" v-show="step == 2">
                <h4 class="text-center text-white font-weight-100">
                    สมัครสมาชิก
                </h4>
                <div class="row">
                    <div class="col-12 mt-3">
                        <h6 class="txt-label">เบอร์โทร</h6>
                        <input type="text" v-model="inputPhoneNumber" id="tel1" @keyup="removeValidation('inputPhoneNumber')" pattern="\d*" ref="inputPhoneNumber" :class="{'is-invalid' : formValidation('inputPhoneNumber')}" class="form-control form-control-lg px-4 text-dark" placeholder="เบอร์โทร" required maxlength="10" />
                        <div class="invalid-feedback">{{ formValidation('inputPhoneNumber') }}</div>
                        <small class="text-warning" v-if="this.telerror">
                            {{this.telerror}}!
                            <span class>กรุณาลองใหม่</span>
                        </small>
                    </div>
                    <div class="col-12 mt-4">
                        <b-collapse id="collapse-otp">
                            <h6 class="txt-label">OTP</h6>
                            <input type="number" ref="inputOtpNumber" :class="{'is-invalid' : formValidation('inputOtpNumber')}" pattern="\d*" class="form-control form-control-lg px-4 text-dark" placeholder="OTP" required />
                            <a class="txt-size14" v-if="this.coutDownOtp < 0" @click="getOtp_Again">ขอ (OTP) ใหม่อีกครั้ง</a>
                            <a class="txt-size14" v-else>จะสามารถลองใหม่อีกครั้งภายใน เวลา {{this.textContent}} นาที</a>
                        </b-collapse>
                    </div>
                    <div class="col-12 mt-3" id="send-otp">
                        <b-overlay class="pt-2" :show="show" rounded="sm" :opacity="0.4" :blur="'2px'" :variant="'dark'">
                            <a id="step-1" class="btn btn-md shadow btn-block btn-theme" @click="nextStepPhoneNumber">รับ OTP</a>
                        </b-overlay>
                    </div>
                    <div class="col-12 mt-2">
                        <b-collapse id="collapse-pin">
                            <h6 class="txt-label">กรุณายืนยัน PIN 4 หลักที่ท่านเคยลงทะเบียนไว้</h6>
                            <input type="tel" ref="inputPinNumber" :class="{'is-invalid' : formValidation('inputPinNumber')}" v-model="inputPinNumber" @keyup="removeValidation('inputPinNumber')" class="form-control form-control-lg px-4 text-dark" placeholder="Pin" required />
                            <div class="invalid-feedback">{{formValidation('inputPinNumber')}}</div>
                            <p id="verify"></p>
                        </b-collapse>
                    </div>
                    <div class="col-12">
                        <b-overlay class="py-2" :show="show" :opacity="0.4" :blur="'2px'" :variant="'dark'" style="display:none;" id="accepted-pin">
                            <b-button class="btn btn-md  shadow btn-block btn-theme" @click="acceptPin">ยืนยัน PIN</b-button>
                        </b-overlay>
                    </div>
                    <div class="col-12 mb-2">
                        <b-button class="btn btn-md shadow btn-block btn-theme btn-hide" id="chk-pin">
                            กำลังตรวจสอบ PIN..
                            <i class="fa fa-spinner fa-spin"></i>
                        </b-button>
                    </div>
                    <a class="btn btn-md mx-3 shadow btn-block btn-theme" v-show="step != 1" @click="step--">กลับ</a>
                </div>
            </form>

            <!-- ----------------END @STEP 2 ----------------  -->

            <!-- ----------------START @STEP 3 ----------------  -->
            <form class="form-signin animated fadeIn" v-show="step == 3">
                <h4 class="text-center text-white font-weight-100">
                    สมัครสมาชิก
                </h4>
                <div class="row mt-5">
                    <div class="col-6">
                        <h6 class="txt-label">ชื่อจริง</h6>
                        <input type="text" ref="inputFname" @keyup="removeValidation('inputFname')" :class="{'is-invalid' : formValidation('inputFname')}" class="form-control form-control-lg px-4 text-dark" placeholder="ชื่อจริง" required />
                        <div class="invalid-feedback">{{ formValidation('inputFname') }}</div>
                    </div>
                    <div class="col-6">
                        <h6 class="txt-label">นามสกุล</h6>
                        <input type="text" ref="inputLname" @keyup="removeValidation('inputLname')" :class="{'is-invalid' : formValidation('inputLname')}" class="form-control form-control-lg px-4 text-dark" placeholder="นามสกุล" required />
                        <div class="invalid-feedback">{{ formValidation('inputLname') }}</div>
                    </div>
                    <div class="col-12 mt-4">
                        <h6 class="txt-label">เลือกธนาคารของลูกค้า</h6>
                        <select class="custom-select form-controls form-control-lg text-template font-weight-100 bg-white text-center" ref="selecBankAccounts" style="border-radius: 25px;height:50px;" @change="removeValidation('selecBankAccounts')" :class="{'is-invalid' : formValidation('selecBankAccounts')}">
                            <option value disabled selected>กรุณาเลือกธนาคารของลูกค้า</option>
                            <option :value="item.id" v-for="(item, index) in bankArray" :key="index">{{item.name}}</option>
                        </select>
                        <div class="invalid-feedback">{{formValidation('selecBankAccounts')}}</div>
                    </div>
                    <div class="col-12 mt-4">
                        <h6 class="txt-label">เลขบัญชีธนาคาร</h6>
                        <input type="number" v-model="inputBankAccountNumber" @keyup="removeValidation('inputBankAccountNumber')" ref="inputBankAccountNumber" :class="{'is-invalid' : formValidation('inputBankAccountNumber')}" class="form-control form-control-lg px-4 text-dark" placeholder="เลขบัญชีธนาคาร" pattern="\d*{10}" maxlength="13" required />
                        <div class="invalid-feedback">
                            <p class="m-0" v-for="(item, index) in formValidation('inputBankAccountNumber')" :key="index">{{item}}</p>
                        </div>
                        <small class="text-danger" style="white-space: nowrap;" v-if="this.accerror">
                            {{this.accerror}}!
                            <span class>กรุณาลองใหม่</span>
                        </small>
                    </div>
                    <div class="col-12 mt-4">
                        <div v-if="this.$route.params.id">
                            <h6 class="txt-label">
                                ยูสเซอร์เพื่อนที่แนะนำ
                                <span class="text-white">(ถ้ามี)</span>
                            </h6>
                            <input type="text" ref="inputReferCode" id="inputReferCode" class="form-control form-control-lg px-4 text-dark" placeholder="ยูสเซอร์เพื่อนที่แนะนำ" readonly />
                        </div>
                        <div v-else>
                            <h6 class="txt-label">
                                ยูสเซอร์เพื่อนที่แนะนำ
                                <span class="text-white">(ถ้ามี)</span>
                            </h6>
                            <input type="text" ref="inputReferCode" id="inputReferCode" class="form-control form-control-lg px-4 text-dark" placeholder="ยูสเซอร์เพื่อนที่แนะนำ" />
                        </div>
                    </div>
                    <div class="col-12 mt-4" v-if="Qrcode!=''">
                        <div class="form-group">
                            <h6 class="txt-label">
                                รหัสจาก QR Code
                            </h6>
                            <input v-model="Qrcode" type="text" :class="{'is-invalid' : formValidation('inputQrcode')}" id="inputQrcode" ref="inputQrcode" class="form-control form-control-lg px-4 text-dark" placeholder="รหัสจาก QR Code" readonly />
                            <div class="invalid-feedback">
                                <p class="m-0" v-for="(item, index) in formValidation('inputQrcode')" :key="index">{{item}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-12" v-show="(typeGame.bonus_status)">
                        <div class="form-group">
                            <h6 class="text-white my-3 font-weight-100" tabindex="0" id="yes-promotion">
                                โปรโมชั่น
                                <span class="material-icons shadow" style="border-radius:50%;position: absolute;margin: -3px 0px 0px 5px;">help</span>
                            </h6>
                            <div class="onoffswitch">
                                <input type="checkbox" ref="checkBoxPromotion" class="onoffswitch-checkbox" id="myonoffswitch" />
                                <label @click="acceptPromotion" class="onoffswitch-label" for="myonoffswitch">
                                    <span class="onoffswitch-inner"></span>
                                    <span class="onoffswitch-switch"></span>
                                </label>
                            </div>
                        </div>
                        <b-tooltip target="yes-promotion" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(12px, 211px, 0px);">
                            <!-- game slot -->
                            <span v-if="typeGame.slot_status">
                                <b-alert show variant="bg-danger dark" class="txt-size11">
                                    <small class="d-block text-white">เงื่อนไขหากเลือก "รับโปรโมชั่น"</small>
                                    <hr class="border-bottom" />
                                    <small class="text-left pl-2 d-block text-white">- ต้องทำยอดเทิร์นตามกติกา จึงจะถอนเงินได้</small>
                                    <small class="text-left pl-2 d-block text-white">- ได้สิทธิ์ร่วมกิจกรรม เช่น สะสมแต้ม ขาประจำ</small>
                                    <small class="text-left pl-2 d-block text-white">
                                        - หากมีการวางเดิมพัน
                                        <u>เกมคาสิโนออนไลน์</u> ในตอนท่านถอนเงินจะถูกตัดเงินเฉพาะส่วนโปรโมชั่นที่ท่านได้ออกทั้งหมด
                                    </small>
                                </b-alert>
                                <b-alert show variant="bg-dark dark" class="txt-size11">
                                    <small class="d-block text-white">เงื่อนไขหากเลือก "ไม่รับโปรโมชั่น"</small>
                                    <hr class="border-bottom" />
                                    <small class="text-left pl-2 d-block text-white">- ไม่ต้องทำเทิร์น ถอนเงินได้ทุกยอด</small>
                                    <small class="text-left pl-2 d-block text-white">- ไม่สามารถร่วมกิจกรรม เช่น สะสมแต้ม ขาประจำ</small>
                                </b-alert>
                            </span>
                            <!-- game luca -->
                            <span v-if="typeGame.casino_status">
                                <b-alert show variant="bg-danger dark" class="txt-size11">
                                    <small class="d-block text-white">เงื่อนไขหากเลือก "รับโปรโมชั่น"</small>
                                    <hr class="border-bottom" />
                                    <small class="text-left pl-2 d-block text-white">- ต้องทำยอดเทิร์นตามกติกา จึงจะถอนเงินได้</small>
                                </b-alert>
                                <b-alert show variant="bg-danger dark" sclass="txt-size11">
                                    <small class="d-block text-white">เงื่อนไขหากเลือก "ไม่รับโปรโมชั่น"</small>
                                    <hr class="border-bottom" />
                                    <small class="text-left pl-2 d-block text-white">- ไม่ต้องทำเทิร์น ถอนเงินได้ทุกยอด</small>
                                </b-alert>
                            </span>
                        </b-tooltip>
                    </div>
                </div>
                <div class="row mt-4 mx-2 bottom-button-container justify-content-center btn-unset">
                    <div class="col-12 col-sm-6 col-md-7 col-lg-7">
                        <b-overlay class="py-2" :show="show" rounded="sm" :opacity="0.4" :blur="'2px'" :variant="'dark'">
                            <a id="step-2" class="btn btn-md shadow btn-block btn-theme" @click="nextStepInfo">ถัดไป</a>
                        </b-overlay>
                        <b-overlay class="py-2" :show="show" rounded="sm" :opacity="0.4" :blur="'2px'" :variant="'dark'">
                            <a id="step-2" class="btn btn-md shadow btn-block btn-theme" v-show="step != 1" @click="step--">กลับ</a>
                        </b-overlay>
                    </div>
                </div>
            </form>
            <!-- END @STEP 3   -->

            <!-- START @STEP 4  -->
            <form class="form-signin mt-3 animated fadeIn" v-show="step == 4">
                <h4 class="text-white font-weight-100 text-center">ตั้งรหัส PIN เข้าสู่ระบบ</h4>
                <div class="row">
                    <div class="col-12">
                        <div class="input-wrappe">
                            <client-only placeholder="Loading...">
                                <pincode-input v-model="inputPincode" class="text-white" placeholder="." :autofocus="true"></pincode-input>
                            </client-only>
                            <small class="text-white text-left">{{formValidation('inputPincode')}}</small>
                        </div>
                    </div>
                </div>
                <div class="row mt-4 mx-2 justify-content-center bottom-button-container btn-unset">
                    <div class="col-lg-5">
                        <a id="step-3" class="btn btn-md shadow btn-block btn-theme" @click="nextStepPincode">ยืนยันการสมัคร</a>
                        <a iid="btnPinpush" class="btn btn-md shadow btn-block btn-theme" style="display:none;">กำลังบันทึกข้อมูล <i class="fa fa-spinner fa-spin"></i></a>
                        <a class="btn btn-md shadow btn-block btn-theme" v-show="step != 1" @click="step--">กลับ</a>
                    </div>
                </div>
            </form>
            <!-- ----------------END @STEP 4 ----------------  -->

            <!-- ----------------START @STEP 5 ----------------  -->
            <form class="form-signin mt-3 animated fadeIn" v-show="step == 6">
                <h4 class="font-weight-100 text-white text-center">ข้อมูลการสมัครสมาชิก</h4>
                <div class="row">
                    <div class="col-12">
                        <b-alert show variant="warning" class="card bg-white text-dark text-left" style="border-radius:25px;">
                            <span class="d-block text-dark txt-size14">* กรุณาบันทึก USERNAME และ PASSWORD ของท่าน หรือ บันทึกภาพหน้าจอไว้</span>
                            <span class="d-block text-dark txt-size14">* ท่านสามารถล็อกอินโดยใส่ PIN หรือ PASSWORD ก็ได้</span>
                        </b-alert>
                    </div>
                    <div class="col-12">
                        <div class="form-group float-label active">
                            <div class="input-group mb-3" style="border-radius: 25px; ">
                                <input type="text" class="form-controls text-dark px-3 bg-white" style="border-radius: 25px; height:50px;" ref="inputUsername" @click="copyAffiliate('inputUsername')" readonly />
                                <div class="input-group-append btn-copy px-2" style="border-radius: 25px; position: absolute; right:10px;margin-top:5px;">
                                    <button class="btn text-white" type="button" @click="copyAffiliate('inputUsername')" style="color:#fff;">คัดลอก</button>
                                </div>
                            </div>
                            <label class="form-control-label" style="color: #fff; margin-top: -24px;margin-left: -15px;">Username</label>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-group float-label active">
                            <div class="input-group mb-3" style="border-radius: 25px; ">
                                <input type="text" class="form-controls text-dark px-3 bg-white" style="border-radius: 25px; height:50px;" ref="inputPassword" @click="copyAffiliate('inputPassword')" readonly />
                                <div class="input-group-append btn-copy px-2" style="border-radius: 25px; position: absolute; right:10px;margin-top:5px;">
                                    <button class="btn text-white" type="button" @click="copyAffiliate('inputPassword')" style="color:#fff;">คัดลอก</button>
                                </div>
                            </div>
                            <label class="form-control-label" style="color: #fff; margin-top: -24px;margin-left: -15px;">Password</label>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-group float-label active">
                            <div class="input-group mb-3" style="border-radius: 25px; ">
                                <input type="text" class="form-controls text-dark px-3 bg-white" style="border-radius: 25px; height:50px;" ref="inputPincode" v-model="inputPincode" @click="copyAffiliate('inputPincode')" readonly />
                                <div class="input-group-append btn-copy px-2" style="border-radius: 25px; position: absolute; right:10px;margin-top:5px;">
                                    <button class="btn text-white" type="button" @click="copyAffiliate('inputPincode')" style="color:#fff;">คัดลอก</button>
                                </div>
                            </div>
                            <label class="form-control-label" style="color: #fff; margin-top: -24px;margin-left: -15px;">PIN</label>
                        </div>
                    </div>
                </div>
                <div class="row mt-4 justify-content-center mx-2 bottom-button-container btn-unset">
                    <div class="col-lg-5 ">
                        <a id="step-4" class="btn btn-md shadow mb-2 btn-block btn-theme" @click="nextStepLogin">เข้าสู่ระบบ</a>
                    </div>
                </div>
            </form>
            <!-- ----------------END @STEP 6 ----------------  -->

            <!-- login buttons -->
            <form class="mt-3 animated fadeIn" v-show="step == 5">
                <h4 class="font-weight-100 text-center text-white">ยืนยันข้อมูล</h4>
                <div class="row">
                    <div class="col-12">
                        <div class="col align-self-center">
                            <div class="row justify-content-center">
                                <div class="col-11 mb-3 bg-white" style="line-height: 1.2em;color: rgb(214, 188, 119) !important;border:solid 1px #444; border-radius: 25px;">
                                    <h6 class="text-center text-dark mt-3 font-weight-100">กฏกติกา การฝาก-ถอน</h6>
                                    <hr>
                                    <p class="text-dark my-2 font-weight-100">1. ชื่อ-นามสกุล กรุณาใช้ข้อมูลของบัญชีธนาคารเท่านั้น มิเช่นนั้นท่านจะไม่สามารถถอนเงินออกได้</p>

                                    <p class="text-dark my-4 font-weight-100">2.ต้องใช้เบอร์โทรศัพท์ของท่านเท่านั้นเพื่อยืนยันรหัส OTP</p>
                                </div>
                            </div>
                            <div style="overflow: hidden;">
                                <div class="row">
                                    <div class="col-6 pr-0 pl-4">
                                        <h6 class="text-white font-weight-100">เพศ</h6>
                                        <div class="form-group">
                                            <div class="custom-control custom-radio custom-control-inline text-center">
                                                <input type="radio" class="custom-control-input" :class="{'is-invalid' : formValidation('selectSex')}" @change="removeValidation('selectSex')" ref="selectSexMan" id="selectSexMan" name="radio-stacked" required />
                                                <label class="custom-control-label" for="selectSexMan">ชาย</label>
                                            </div>
                                            <div class="custom-control custom-radio custom-control-inline">
                                                <input type="radio" class="custom-control-input form-controls" :class="{'is-invalid' : formValidation('selectSex')}" @change="removeValidation('selectSex')" id="selectSexWoman" ref="selectSexWoman" name="radio-stacked" required />
                                                <label class="custom-control-label" for="selectSexWoman">หญิง</label>
                                            </div>
                                        </div>
                                        <small class="is-invalid-color">{{ formValidation('selectSex') }}</small>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <h6 class="text-white font-weight-100" style="margin-top:0">อายุ</h6>
                                            <select class="custom-select form-controls form-control-lg text-template font-weight-100 bg-white text-center" ref="selectAge" @change="removeValidation('selectAge')" :class="{'is-invalid' : formValidation('selectAge')}" style="border-radius: 25px;height:50px;" required>
                                                <option value disabled selected>เลือกช่วงอายุ</option>
                                                <option value="1">18 - 24 ปี</option>
                                                <option value="2">25 - 30 ปี</option>
                                                <option value="3">31 - 40 ปี</option>
                                                <option value="4">41 - 50 ปี</option>
                                                <option value="5">50 ปีขึ้นไป</option>
                                            </select>
                                            <div class="invalid-feedback">{{formValidation('selectAge')}}</div>
                                        </div>
                                    </div>
                                    <div class="col-12 mt-3">
                                        <div class="form-group">
                                            <h6 class="text-white font-weight-100">คุณรู้จักเรา จากช่องทางใด</h6>
                                            <select class="custom-select form-controls form-control-lg text-template font-weight-100 bg-white text-center" ref="selectWay" @change="removeValidation('selectWay')" :class="{'is-invalid' : formValidation('selectWay')}" style="border-radius: 25px;height:50px;" required>
                                                <option value disabled selected>กรุณาเลือกช่องทางของท่าน</option>
                                                <option value="1">- Facebook</option>
                                                <option value="2">- Line</option>
                                                <option value="3">- Youtube</option>
                                                <option value="4">- Google</option>
                                                <option value="5">- SMS</option>
                                                <option value="6">- ชวนเพื่อน</option>
                                                <option value="7">- อื่นๆ</option>
                                            </select>
                                            <div class="invalid-feedback">{{formValidation('selectWay')}}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-6">
                                        <div class="form-group">
                                            <h6 class="text-white" style="font-weight:100;">ชื่อจริง</h6>
                                            <input type="text" ref="inputFirstName" v-model="Fname" :class="{'is-invalid' : formValidation('inputFirstName')}" @keyup="removeValidation('inputFirstName')" class="form-control form-control-lg px-4 text-dark" placeholder="ชื่อจริง" required />
                                            <div class="invalid-feedback">{{ formValidation('inputFirstName') }}</div>
                                        </div>
                                    </div>
                                    <div class="col-6">
                                        <div class="form-group">
                                            <h6 class="text-white" style="font-weight:100;">นามสกุล</h6>
                                            <input type="text" ref="inputLastName" v-model="inputLastName" :class="{'is-invalid' : formValidation('inputLastName')}" @keyup="removeValidation('inputLastName')" class="form-control form-control-lg px-4 text-dark" placeholder="นามสกุล" required />
                                            <div class="invalid-feedback">{{ formValidation('inputLastName') }}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-12">
                                        <div class="form-group">
                                            <h6 class="text-white" style="font-weight:100;">เลือกธนาคาร</h6>
                                            <select class="custom-select form-controls form-control-lg text-dark font-weight-100 bg-white text-center" ref="selecBankAccount" @change="removeValidation('selecBankAccount')" :class="{'is-invalid' : formValidation('selecBankAccount')}" style="border-radius: 25px;">
                                                <option value disabled selected class="text-dark" style="font-weight:100;">กรุณาเลือกธนาคาร</option>
                                                <option class="text-dark" :value="item.id" v-for="(item, index) in bankArray" :key="index">{{item.name}}</option>
                                            </select>
                                            <div class="invalid-feedback">{{formValidation('selecBankAccount')}}</div>
                                        </div>
                                    </div>
                                    <div class="col-12 mt-3">
                                        <div class="form-group">
                                            <h6 class="text-white" style="font-weight:100;">เลขบัญชีธนาคาร <small style="letter-spacing:1px;">(ชื่อบัญต้องตรงกับชื่อที่สมัคร)</small></h6>
                                            <input type="text" pattern="\d*" maxlength="13" v-model="inputBankAccountNumbers" ref="inputBankAccountNumbers" :class="{'is-invalid' : formValidation('inputBankAccountNumbers')}" @keyup="removeValidation('inputBankAccountNumbers')" class="form-control form-control-lg px-4 text-dark" placeholder="เลขบัญชีธนาคาร" required />
                                            <div class="invalid-feedback">{{formValidation('inputBankAccountNumbers')}}</div>
                                        </div>
                                    </div>
                                    <div class="col-12 mt-3">
                                        <a class="btn btn-md shadow btn-block btn-theme" @click="sendLineRegister">ยืนยันข้อมูล</a>
                                    </div>
                                </div>
                            </div>

                            <div style="overflow: hidden; display: none;" id="verified-sucess">
                                <div class="row">
                                    <div class="col-12">
                                        <b-alert show variant="warning">
                                            <p class="text-template text-center">ยืนยันข้อมูลสำเร็จ</p>
                                            <small class="d-block">* กรุณาใช้บัญชีธนาคารที่ท่านลงทะเบียนไว้ในระบบเราเท่านั้น ในการโอนเงิน เครดิตจะเข้าเกมโดยอัตโนมัติ</small>
                                        </b-alert>
                                    </div>

                                    <div class="col-12 mt-2">
                                        <button class="w-100 btn shadow btn-block btn-theme" @click="nextStepLogin" style="color: #000;">ตกลง</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
</template>

<style scoped>
.form-group h6 {
  margin-top: -10px;
}

.form-control {
  font-size: 15px;
  height: 38px;
  color: #d7d4d4;
  border-radius: 25px;
  padding: 25px 10px;
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.vue-pincode-input-wrapper {
  display: flex !important;
  justify-content: center;
}

li.active {
  color: #fff;
}

.btn-ocean {
  width: 100%;
  background-image: linear-gradient(
    rgb(191, 191, 191),
    rgb(255, 255, 255),
    rgb(220, 220, 220)
  );
}

.border-bottom {
  margin: 5px;
  margin-left: 0;
  right: 0;
  width: 100%;
  height: 0px;
  background-color: #ff1100;
}

input.vue-pincode-input {
  color: #ffffff;
  background: #222222;
  max-width: 77px;
  height: 45px;
}

button.form-controls,
input.form-controls,
select.form-controls {
  color: #000;
  border: 1px solid #555;
  background-color: #000;
  width: 100%;
  border-radius: 5px;
}

.custom-control-label::after {
  position: absolute;
  top: 4px;
  left: -1.8rem;
  display: block;
  width: 25px;
  height: 25px;
  content: "";
  background: no-repeat 50%/50% 50%;
}

.custom-control-label::before {
  position: absolute;
  left: -1.8rem;
  display: block;
  width: 25px;
  height: 25px;
  pointer-events: none;
  content: "";
  background-color: #fff;
  border: #adb5bd solid 1px;
}

.tooltip-inner {
  max-width: 350px;
  padding: 0.25rem 0.5rem;

  text-align: center;
  background-color: #000;
  border-radius: 0.25rem;
}

.txt-size14 {
  color: #fff;
  font-size: 14px;
}

.txt-size12 {
  font-weight: 100;
  font-size: 12px;
}
.txt-size11 {
  font-weight: 100;
  font-size: 11px;
}
.register.header{
  height: 200px;
      border-bottom-left-radius: 0px;
     border-bottom-right-radius: 0px;
}
.txt-label {
  font-weight: 100;
  margin: -20px 0px;
  position: absolute;
}

.btn-hide {
  font-size: 26px;
  border-radius: 30px;
  font-weight: 100;
  display: none;
}

.bg-theme {
  width: 100%;
  position: absolute;
  margin-right: 0px;
  margin-left: 0px;
  margin-top: -80px;
  border-top-left-radius: 70px;
  border-top-right-radius: 70px;
  height: 110vh;
  overflow: overlay;
}

.overflow {
  overflow: hidden;
}

.btn-unset {
  bottom: unset;
}

.img-logo {
  width: auto;
  height: 60px;
  filter: drop-shadow(0px 1px 1px black);
}

body,
html {
  background-color: #000000 !important;
}

.progressbar {
  padding: 0px;
  counter-reset: step;
  height: 60px;
}

.progressbar li {
  list-style-type: none;
  width: 25%;
  float: left;
  font-size: 12px;
  position: relative;
  text-align: center;
  text-transform: uppercase;
  color: #fff;
}

.progressbar li:before {
  width: 30px;
  height: 30px;
  content: counter(step);
  counter-increment: step;
  line-height: 25px;
  font-size: 18px;
  border: 2px solid #fff;
  display: block;
  text-align: center;
  margin: 0 auto 10px auto;
  border-radius: 50%;
  background-color: #2d3050 !important;
}

.progressbar li:after {
  width: 100%;
  height: 1px;
  content: "";
  position: absolute;
  background-color: #7d7d7d;
  top: 13px;
  left: -50%;
  z-index: -1;
}

.progressbar li:first-child:after {
  content: none;
}

.progressbar li.active {
  color: #fff;
}

.progressbar li.active:before {
  color: #000;
  border: 3px solid #000;
  border-radius: 50%;
  background-color: #fff !important;
  -webkit-animation-duration: 1.4s;
  /* Safari 4.0 - 8.0 */
  -webkit-animation: fade-img 1.4s infinite;
  animation: fade-img 1.4s infinite;
  animation-duration: 1.4s;
}

.progressbar li.active + li:before {
  background-color: #fff;
}

@keyframes fade-img {
  0% {
    box-shadow: 0 0 1pt 0pt #fff;
  }

  100% {
    box-shadow: 0 0 4pt 1pt #ddd;
  }
}

.text-validation {
  width: 100%;
  margin-top: 0.25rem;
  font-size: 80%;
  color: #dc3545;
}

.onoffswitch {
  position: relative;
  width: 90px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.onoffswitch-checkbox {
  display: none;
}

.onoffswitch-label {
  display: block;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid #d1d1d1;
  border-radius: 20px;
}

.onoffswitch-inner {
  display: block;
  width: 200%;
  margin-left: -100%;
  transition: margin 0.3s ease-in 0s;
}

.onoffswitch-inner:before,
.onoffswitch-inner:after {
  display: block;
  float: left;
  width: 50%;
  height: 30px;
  padding: 0;
  line-height: 30px;
  font-size: 14px;
  color: white;
  font-family: Trebuchet, Arial, sans-serif;
  font-weight: bold;
  box-sizing: border-box;
}

.onoffswitch-switch {
  display: block;
  width: 15px;
  margin: 7.5px;
  background: #ffffff;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 56px;
  border: 2px solid #d1d1d1;
  border-radius: 20px;
  transition: all 0.3s ease-in 0s;
}

.onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-inner {
  margin-left: 0;
}

.onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-switch {
  right: 0px;
}

.custom-select.is-invalid,
.was-validated .custom-select:invalid {
  border-color: #dc3545;
  padding-right: calc(0.75em + 2.3125rem);
  background-color: #dc3545;
}
</style>

<script>
// import configTheme from "~/config/theme";
import { mapGetters } from "vuex";
export default {
  layout: "login",
  auth: "guest",
  head() {
    return {
      title: "Register",
      htmlAttrs: {
        // class: configTheme.color + " " + configTheme.background + " bg-black",
      },
    };
  },
  data: () => ({
    showText: false,
    telerror: "",
    accerror: "",
    fnerror: "",
    step: 1,
    inputPincode: "",
    formError: [],
    inputFirstName: "",
    inputLastName: "",
    inputBirthday: null,
    inputBankAccountNumber: null,
    inputBankAccountNumbers: null,
    inputPhoneNumber: "",
    inputPinNumber: "",
    statusOtp: false,
    textContent: "",
    coutDownOtp: 0,
    typeGame: {},
    show: false,
    Qrcode: "",
    Fname: "",
  }),

  asyncData: async function ({ $axios }) {
    const { data } = await $axios.$get("/api/type-bank", {
      progress: true,
    });
    const dataGame = await $axios
      .request({
        method: "GET",
        url: "/api/get-promotion-game",
      })
      .then((response) => response.data)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return {
          bonus_status: true,
          slot_status: null,
          casino_status: null,
        };
      });
    return {
      bankArray: data,
      typeGame: dataGame || {},
    };
  },
  computed: {
    inputDateClass: function () {
      return this.formValidation("inputBirthday") ? "is-invalid" : "";
    },
    ...mapGetters(["getThemeObject", "getSettingObject"]),
  },
  mounted() {
    $(".datepicker").datepicker({
      defaultViewDate: {
        year: "2540",
        month: "01",
        day: "01",
      },
      format: "dd/mm/yyyy",
      startView: 2,
      language: "th-th",
      autoclose: true,
    });
    $("#inputReferCode").val(this.$route.params.id);
    this.Qrcode = this.$route.query.code || "";
  },
  methods: {
    skipto: async function () {
      const loader = this.$loading.show({
        "is-full-page": true,
      });
      const respones = await this.$axios.$post(
        "/api/line/login-verlfeid-affter",
        {
          tel: this.inputPhoneNumber,
        }
      );
      if (respones.success) {
        window.location = respones.redirect;
      } else {
        loader.hide();
        this.$toast.global.error({
          message: respones.msg,
        });
      }
    },
    getOtp_Again: async function () {
      this.startTimer();
      const { data, success } = await this.$axios.$post("/api/send-otp", {
        tel: this.inputPhoneNumber,
      });
      if (data[0].status == "duplicate") {
        this.telerror = data[0].error;
        this.$toast.global.error({
          message: data[0].error,
        });
        return false;
      } else if (success) {
        this.$toast.global.success({
          message: "กรุณากรอก OTP ที่ได้รับให้ถูกต้อง",
        });
      } else {
        this.$toast.global.error({
          message: data,
        });
      }
      this.statusOtp = true;
    },
    getOtp: async function () {
      const { data, success } = await this.$axios.$post("/api/send-otp", {
        tel: this.inputPhoneNumber,
      });
      if (success) {
        this.startTimer();
        this.$toast.global.success({
          message: "ส่ง OTP ไปแล้ว กรุณารอซักครู่",
        });
        this.statusOtp = true;
        this.$root.$emit("bv::toggle::collapse", "collapse-otp");
        document.getElementById("tel1").disabled = "disabled";
        document.getElementById("step-1").innerHTML = "ยืนยัน OTP";
      } else {
        if (data[0].status == "duplicate") {
          var indexFormError = this.formError.findIndex(
            (item) => item.ref == "inputPhoneNumber"
          );
          indexFormError =
            indexFormError < 0
              ? (await this.formError.push({
                  step: 2,
                  ref: "inputPhoneNumber",
                  message: [],
                })) - 1
              : indexFormError;
          return this.formError[indexFormError].message.push(data[0].error);
        }
        this.$toast.global.error({
          message: data[0].error,
        });
        this.statusOtp = false;
        return false;
      }
      this.statusOtp = true;
    },
    copyAffiliate: function (target) {
      this.$refs[target].select();
      document.execCommand("copy");
      this.$toast.global.success({
        message: "คัดลอกลงคลิปบอร์ดแล้ว",
      });
    },
    checkFromRegister: async function () {
      if (!this.inputBankAccountNumber.match(/^[0-9]+$/)) {
        var indexFormError = this.formError.findIndex(
          (item) => item.ref == "inputBankAccountNumber"
        );
        indexFormError =
          indexFormError < 0
            ? (await this.formError.push({
                step: 3,
                ref: "inputBankAccountNumber",
                message: [],
              })) - 1
            : indexFormError;
        this.formError[indexFormError].message.push(
          "เลขที่บัญชี ต้องเป็นตัวเลขเท่านั้น"
        );
      } else {
        const { success, data } = await this.$axios.$post(
          "/api/check-from-regis",
          {
            fname: this.$refs.inputFname.value,
            lname: this.$refs.inputLname.value,
            refer_code: this.$refs.inputReferCode.value,
            type_bank_id: this.$refs.selecBankAccounts.value,
            bank_account: this.inputBankAccountNumber,
            tel: this.inputPhoneNumber,
            code: this.Qrcode || null,
          }
        );
        return {
          success,
          data,
        };
      }
    },
    acceptPromotion: function () {
      this.showText = true;
      this.$root.$emit("bv::toggle::collapse", "collapse-noPromotion");
      this.$root.$emit("bv::toggle::collapse", "collapse-yesPromotion");
    },
    sendLineRegister: async function () {
      if (
        !this.$refs.selectSexMan.checked &&
        !this.$refs.selectSexWoman.checked
      ) {
        this.formError.push({
          step: 6,
          ref: "selectSex",
          message: "กรุณาเลือกเพศ",
        });
      } else if (!this.$refs.selectAge.value) {
        this.formError.push({
          step: 6,
          ref: "selectAge",
          message: "กรุณาเลือกช่วงอายุ",
        });

        return false;
      } else if (!this.$refs.selectWay.value) {
        this.formError.push({
          step: 6,
          ref: "selectWay",
          message: "กรุณาเลือกช่องทางที่รู้จัก",
        });

        return false;
      } else if (!this.inputFirstName) {
        this.formError.push({
          step: 6,
          ref: "inputFirstName",
          message: "กรุณากรอกชื่อด้วยค่ะ",
        });
        return false;
      } else if (!this.inputLastName) {
        this.formError.push({
          step: 6,
          ref: "inputLastName",
          message: "กรุณากรอกนามสกุลด้วยค่ะ",
        });

        return false;
      } else if (!this.$refs.selecBankAccount.value) {
        this.formError.push({
          step: 6,
          ref: "selecBankAccount",
          message: "กรุณาเลือกธนาคาร",
        });

        return false;
      } else if (!this.inputBankAccountNumbers) {
        this.formError.push({
          step: 6,
          ref: "inputBankAccountNumbers",
          message: "กรุณากรอกเลขบัญชี",
        });

        return false;
      } else if (this.inputBankAccountNumbers.length < 10) {
        this.formError.push({
          step: 6,
          ref: "inputBankAccountNumbers",
          message: "กรุณากรอกเลขบัญชีให้ครบถ้วน",
        });

        return false;
      } else if (!this.inputBankAccountNumbers.match(/^[0-9]+$/)) {
        var indexFormError = this.formError.findIndex(
          (item) => item.ref == "inputBankAccountNumbers"
        );
        this.formError.push({
          step: 6,
          ref: "inputBankAccountNumbers",
          message: "เลขที่บัญชี ต้องเป็นตัวเลขเท่านั้น",
        });
        return false;
      } else {
        const chkregister = await this.$axios.$post("/api/line/line-register", {
          fname: this.$refs.inputFirstName.value,
          lname: this.$refs.inputLastName.value,
          age: this.$refs.selectAge.value,
          gender: this.$refs.selectSexMan.checked ? "1" : "2",
          acquaint: this.$refs.selectWay.value,
          refer_code: this.$refs.inputReferCode.value,
          type_bank_id: this.$refs.selecBankAccount.value,
          bank_account: this.inputBankAccountNumbers,
          tel: this.inputPhoneNumber,
          pincode: this.inputPinNumber,
          player_bonus: this.$refs.checkBoxPromotion.checked ? "1" : "0",
        });
        if (chkregister.success) {
          window.location =
            "/dashboard/login?username=" +
            this.inputPhoneNumber +
            "&password=" +
            this.inputPinNumber;
        } else {
          this.$toast.global.success({
            message: success + " " + data.filed + " " + data.error,
          });
        }
      }
    },
    sendRegister: async function () {
      const { success, data } = await this.$axios.$post("/api/register", {
        fname: this.$refs.inputFname.value,
        lname: this.$refs.inputLname.value,
        refer_code: this.$refs.inputReferCode.value,
        type_bank_id: this.$refs.selecBankAccounts.value,
        bank_account: this.inputBankAccountNumber,
        tel: this.inputPhoneNumber,
        pincode: this.inputPincode,
        player_bonus: this.$refs.checkBoxPromotion.checked ? "1" : "0",
        code: this.Qrcode || null,
      });

      return {
        success,
        data,
      };
    },
    startTimer() {
      this.coutDownOtp = 120;
      var minutes, seconds;
      var downloadTimer = setInterval(() => {
        minutes = parseInt(this.coutDownOtp / 60, 10);
        seconds = parseInt(this.coutDownOtp % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        this.textContent = minutes + ":" + seconds;

        if (--this.coutDownOtp < 0) {
          clearInterval(downloadTimer);
        }
      }, 1000);
    },
    calculateAge: function (birthday) {
      var str = this.$refs.inputBirthday.value.split("/");
      var date = new Date(str[2] + "-" + str[1] + "-" + str[0]);
      return str[2] - 543 + "-" + str[1] + "-" + str[0];
    },
    formValidation: function (ref) {
      let error = this.formError.find((item) => item.ref == ref);
      return error ? error.message : "";
    },
    isFormValidation: function (ref) {
      let error = this.formError.find((item) => item.ref == ref);
      return error ? true : null;
    },
    removeValidation: function (ref) {
      this.formError = this.formError.filter((item) => item.ref != ref);
    },
    nextStepCondition: async function () {
      if (!this.$refs.checkBoxCondition.checked)
        this.formError.push({
          step: 1,
          ref: "checkBoxCondition",
          message: "ท่านต้องยอมรับเงื่อนไข",
        });
      const formErrorStep = await this.formError.find((item) => item.step == 1);
      if (!formErrorStep) this.step++;
    },
    nextStepInfo: async function (res) {
      // alert(' uyuyuyuyu')
      if ((!this.$refs.inputFname.value && !this.isFormValidation("inputFname")) || this.$refs.inputFname.value.match(/^[A-Za-z0-9]*$/)){
        // this.formError.push({step: 3, ref: "inputFname", message: "ห้ามว่างและเป็นภาษาไทยทั้งหมด"});
        this.$toast.global.error({
            message: "ชื่อ ห้ามว่างและเป็นภาษาไทยทั้งหมด",
          });
          return false
      } 
      if ((!this.$refs.inputFname.value && !this.isFormValidation("inputLname")) || this.$refs.inputLname.value.match(/^[A-Za-z0-9]*$/)){
        //  this.formError.push({step: 3, ref: "inputLname", message: "ห้ามว่างและเป็นภาษาไทยทั้งหมด"});
         this.$toast.global.error({
            message: "นามสกุล ห้ามว่างและเป็นภาษาไทยทั้งหมด",
          });
          return false
      }
      if ( !this.$refs.selecBankAccounts.value && !this.isFormValidation("selecBankAccounts") ){
        // this.formError.push({
        //   step: 3,
        //   ref: "selecBankAccounts",
        //   message: "กรุณาเลือกบัญชีธนาคารของท่าน",
        // });
        this.$toast.global.error({
            message: "กรุณาเลือกบัญชีธนาคารของท่าน",
          });
          return false
      }
      if (!this.isFormValidation("inputBankAccountNumber")) {
        if (!this.inputBankAccountNumber || this.inputBankAccountNumber.length < 10) {
          var indexFormError = this.formError.findIndex(
            (item) => item.ref == "inputBankAccountNumber"
          );
          // indexFormError =
          //   indexFormError < 0
          //     ? (await this.formError.push({
          //         step: 3,
          //         ref: "inputBankAccountNumber",
          //         message: [],
          //       })) - 1
          //     : indexFormError;
          // this.formError[indexFormError].message.push("ห้ามว่าง และกรอกให้ถูกต้อง");
          this.$toast.global.error({
            message: "เลขบัญชี กรุณากรอกให้ถูกต้อง",
          });
          return false
        }
        if (
          !this.inputBankAccountNumber ||
          !this.inputBankAccountNumber.match(/^[0-9]+$/)
        ){
          var indexFormError = this.formError.findIndex(
            (item) => item.ref == "inputBankAccountNumber"
          );
         
          this.formError[indexFormError].message.push(
            "เลขบัญชีธนาคาร ต้องเป็นตัวเลขเท่านั้น"
          );
          this.$toast.global.error({
            message: "เลขบัญชีธนาคาร ต้องเป็นตัวเลขเท่านั้น",
          });
          return false
        }
      }

      const loader = this.$loading.show({
        "is-full-page": true,
      });
      const checkName = await this.$axios.$post("/api/check-from-regis/name", {
        fname: this.$refs.inputFname.value,
        lname: this.$refs.inputLname.value,
      });
      const checkAccount = await this.$axios.$post(
        "/api/check-from-regis/account",
        {
          bank_account: this.inputBankAccountNumber,
        }
      );
      loader.hide();
      this.fnerror = "";
      this.accerror = "";
      if (!checkName.success) {
        this.fnerror = checkName.message;
        this.formError.push({step: 3, ref: "inputFname", message: checkName.message});
      }
      if (!checkAccount.success) {
          var indexFormError = this.formError.findIndex((item) => item.ref == "inputBankAccountNumber"  );
          indexFormError = indexFormError < 0 ? (await this.formError.push({ step: 3, ref: "inputBankAccountNumber", message: [], })) - 1 : indexFormError;
          this.formError[indexFormError].message.push(
            checkAccount.message
          );
          this.$toast.global.error({
            message: "กรุณาตรวจสอบเลขบัญชี",
          });
          return false
      }

      this.step = 4;

        // const formErrorStep = await this.formError.find(item => item.step == 3);
        // if (!this.formError){
        //   this.step = 4;
        // }else{
        //   this.$toast.global.error({
        //     message: this.formError,
        //   });
        //   // this.step = 4;
        // }
     
    },

    nextStepPhoneNumber: async function () {
      //if (!this.isFormValidation("inputPhoneNumber")) {
      if (!this.inputPhoneNumber) {
        var indexFormError = this.formError.findIndex(
          (item) => item.ref == "inputPhoneNumber"
        );
        indexFormError =
          indexFormError < 0
            ? (await this.formError.push({
                step: 2,
                ref: "inputPhoneNumber",
                message: "ห้ามว่าง",
              })) - 1
            : indexFormError;
        return false;
      } else if (this.inputPhoneNumber.length != 10) {
        var indexFormError = this.formError.findIndex(
          (item) => item.ref == "inputPhoneNumber"
        );
        indexFormError =
          indexFormError < 0
            ? (await this.formError.push({
                step: 2,
                ref: "inputPhoneNumber",
                message: [],
              })) - 1
            : indexFormError;
        this.formError[indexFormError].message.push(
          "เบอร์โทรเท่ากับ 10 ตัวอักษร"
        );
      } else if (!this.inputPhoneNumber.match(/^[0-9]+$/)) {
        var indexFormError = this.formError.findIndex(
          (item) => item.ref == "inputPhoneNumber"
        );
        indexFormError =
          indexFormError < 0
            ? (await this.formError.push({
                step: 2,
                ref: "inputPhoneNumber",
                message: [],
              })) - 1
            : indexFormError;
        this.formError[indexFormError].message.push(
          "เบอร์โทรต้องเป็นตัวเลขเท่านั้น"
        );
        //}
      } else {
        this.show = true;
        const respone = await this.$axios.$post("/api/line/chk-phone", {
          tel: this.inputPhoneNumber,
        });
        if (respone.success) {
          this.otp();
        } else {
          this.getPin();
          document.getElementById("step-1").innerHTML = "ยืนยัน Pin";
          this.formError.push({
            step: 1,
            ref: "inputPhoneNumber",
            message: "",
          });
        }
        this.show = false;
      }
    },
    otp: async function () {
      const formErrorStep = await this.formError.find(
        (item) => item.step == 3 && item.ref != "inputOtpNumber"
      );

      if (!formErrorStep) {
        this.$refs.inputOtpNumber.focus();
        if (this.statusOtp) {
          if (
            !this.$refs.inputOtpNumber.value &&
            !this.isFormValidation("inputOtpNumber")
          )
            return this.formError.push({
              step: 2,
              ref: "inputOtpNumber",
              message: "กรุณากรอก OTP ที่ได้รับให้ถูกต้อง",
            });
          const checkOtp = await this.$axios.$post("/api/check-otp", {
            tel: this.$refs.inputPhoneNumber.value,
            otp: this.$refs.inputOtpNumber.value,
          });
          if (checkOtp.success) {
            this.step++;
          } else {
            this.$toast.global.error({
              message: "กรุณากรอก OTP ให้ถูกต้อง",
            });
          }
        } else {
          this.getOtp();
          if (
            !this.$refs.inputOtpNumber.value &&
            !this.isFormValidation("inputOtpNumber")
          )
            return this.formError.push({
              step: 2,
              ref: "inputOtpNumber",
              message: "กรุณากรอก OTP ที่ได้รับให้ถูกต้อง",
            });
        }
      }
    },
    getPin: function () {
      this.$root.$emit("bv::toggle::collapse", "collapse-pin");
      document.getElementById("send-otp").style.display = "none";
      document.getElementById("accepted-pin").style.display = "block";
    },
    acceptPin: async function () {
      document.getElementById("accepted-pin").style.display = "none";
      document.getElementById("chk-pin").style.display = "block";
      const chkpin = await this.$axios.$post("/api/line/chk-merge-line", {
        tel: this.inputPhoneNumber,
        pin: this.inputPinNumber,
      });
      if (!chkpin.success) {
        document.getElementById("accepted-pin").style.display = "block";
        document.getElementById("chk-pin").style.display = "none";
        return this.formError.push({
          step: 2,
          ref: "inputPinNumber",
          message: chkpin.message,
        });
      } else {
        document.getElementById("accepted-pin").style.display = "block";
        document.getElementById("chk-pin").style.display = "none";
        document.getElementById("accepted-pin").innerHTML =
          "<span><i class='fa fa-close' style='font-size:1rem;margin:0px auto;color:#000;'></i> " +
          chkpin.message +
          "</span>";
        document.getElementById("verify").innerHTML =
          "<span class='text-success'><i class='fa fa-close' style='font-size:1rem;margin:0px auto;'></i> " +
          chkpin.message +
          "</span>";

        if (chkpin.code == 22) {
          this.step = 5;
        } else {
          const loader = this.$loading.show({
            "is-full-page": true,
          });
          window.location = chkpin.redirect;
        }
      }
    },
    nextStepPincode: async function () {
      // if (!(!!this.inputPincode.match(/[a-z]/g) && !!this.inputPincode.match(/[A-Z]/g) && !!this.inputPincode.match(/[0-9]/g) && (this.inputPincode.length >= 6  && this.inputPincode.length <= 12)))  return this.formError.push({step : 4,ref : "inputPincode" , message : "รหัสผ่านต้องมีตั้งแต่ 6-12 ตัว มีภาษาอังกฤษพิมพ์เล็กกับใหญ่และตัวเลข เช่น Abc123"});
      if (this.inputPincode.length != 4)
        return this.formError.push({
          step: 4,
          ref: "inputPincode",
          message: "กรุณากรอก PINCODE",
        });
      const loaderOne = this.$loading.show({
        container: this.$refs.formRegisterUser,
      });
      const dataCheckFromRegister = await this.checkFromRegister();
      loaderOne.hide();
      if (dataCheckFromRegister.success) {
        const loaderTwo = this.$loading.show({
          container: this.$refs.formRegisterUser,
        });
        //  sennd-regis
        const dataSendRegister = await this.sendRegister();
        loaderTwo.hide();
        if (dataSendRegister.success) {
          this.$refs.inputUsername.value = dataSendRegister.data.username;
          this.$refs.inputPassword.value = dataSendRegister.data.password;
          this.$toast.global.success({
            message: "สมัครสมาชิกสำเร็จแล้ว",
          });
          this.step = 6;
        } else {
          this.$toast.global.error({
            message: dataSendRegister.data,
          });
        }
      } else {
        let errorFirstname = await dataCheckFromRegister.data.find(
          (error) => error.filed == "fname"
        );
        let errorLastname = await dataCheckFromRegister.data.find(
          (error) => error.filed == "lname"
        );
        let errorBankAccount = await dataCheckFromRegister.data.find(
          (error) => error.filed == "bank_account"
        );
        let errorTel = await dataCheckFromRegister.data.find(
          (error) => error.filed == "tel"
        );
        let errorCode = await dataCheckFromRegister.data.find(
          (error) => error.filed == "code"
        );

        if (errorFirstname)
          this.formError.push({
            step: 3,
            ref: "inputFname",
            message: errorFirstname.error,
          });
        if (errorLastname)
          this.formError.push({
            step: 3,
            ref: "inputLname",
            message: errorLastname.error,
          });
        if (errorBankAccount)
          this.formError.push({
            step: 3,
            ref: "inputBankAccountNumber",
            message: [errorBankAccount.error],
          });
        if (errorTel)
          this.formError.push({
            step: 2,
            ref: "inputPhoneNumber",
            message: [errorTel.error],
          });

        this.$toast.global.error({
          message: "กรุณาข้อมูลให้ถูกต้อง",
        });
        if (errorCode) {
          this.step = 3;
          this.formError.push({
            step: 3,
            ref: "inputQrcode",
            message: [errorCode.error],
          });
        }

        if (errorFirstname || errorLastname) return (this.step = 3);
        if (errorBankAccount) return (this.step = 3);
        if (errorTel) return (this.step = 2);
      }
    },
    nextStepLogin: async function (event) {
      const loader = this.$loading.show({
        "is-full-page": true,
      });
      await this.$auth
        .loginWith("local", {
          data: {
            username: this.inputPhoneNumber,
            password: this.inputPincode,
          },
        })
        .then(() => {
          this.$toast.global.success({
            message: "เข้าสู่ระบบเรียบร้อยแล้ว",
          });
          loader.hide();
        })
        .catch(() => {
          this.password = "";
          this.$toast.global.error({
            message: "เข้าสู่ระบบไม่สำเร็จ กรุณาตรวจสอบข้อมูล",
          });
          loader.hide();
        });
    },
  },
};
</script>
