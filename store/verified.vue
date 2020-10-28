<template>
  <!-- <b-modal id="verified-modal" class="modal-bootstrap" hide-footer title="กรุณายืนยันข้อมูล" role="dialog" aria-labelledby="documentLabel" aria-hidden="true"> -->
  <div>
    <div class="container pt-5">
      <div class="row mb-3">
        <div class="col-2 text-left" style="top:25px; position:absolute;">
          <nuxt-link :to="{name:'dashboard'}" class="mt-4">
            <i class="f7-icons text-pink">chevron_left_circle_fill</i>
          </nuxt-link>
        </div>
        <div class="col-8">
          <h4 class="text-center font-weight-100">ยืนยันข้อมูล</h4>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="text-left mt-2">
        <div class="col align-self-center">
          <!-- ----------------START @STEP 1 ----------------  -->
          <form class="mt-3 animated fadeIn" v-show="step == 1">
            <div class="row">
              <!-- <b-alert show variant="warning"> -->
              <div
                class="col-12 mb-3 bg-black"
                style="line-height: 1.2em;color: rgb(214, 188, 119) !important;border:solid 1px #444; border-radius: 5px;"
              >
                <h6 class="text-center text-pink mt-1">กฏกติกา การฝาก-ถอน</h6>
                <small
                  class="text-white"
                >1. ชื่อ-นามสกุล กรุณาใช้ข้อมูลของบัญชีธนาคารเท่านั้น มิเช่นนั้นท่านจะไม่สามารถถอนเงินออกได้</small>
                <br />
                <small class="text-white">2.ต้องใช้เบอร์โทรศัพท์ของท่านเท่านั้นเพื่อยืนยันรหัส OTP</small>
                <br />
                <br />
              </div>
            </div>
            <div style="overflow: hidden;">
              <div class="row">
                <div class="col-6">
                  <h6 class="text-white font-weight-100">เพศ</h6>
                  <div class="form-group m-0" style="font-weight: 100; white-space: nowrap;">
                    <div
                      class="custom-control custom-radio custom-control-inline"
                      style="font-weight: 100; white-space: nowrap;"
                    >
                      <input
                        type="radio"
                        class="custom-control-input"
                        :class="{'is-invalid' : formValidation('selectSex')}"
                        @change="removeValidation('selectSex')"
                        ref="selectSexMan"
                        id="selectSexMan"
                        name="radio-stacked"
                        required
                      />
                      <label
                        class="custom-control-label mr-2 small font-weight-100"
                        for="selectSexMan"
                      >ชาย</label>
                    </div>
                    <div class="custom-control custom-radio custom-control-inline">
                      <input
                        type="radio"
                        class="custom-control-input form-controls"
                        :class="{'is-invalid' : formValidation('selectSex')}"
                        @change="removeValidation('selectSex')"
                        id="selectSexWoman"
                        ref="selectSexWoman"
                        name="radio-stacked"
                        required
                      />
                      <label
                        class="custom-control-label small font-weight-100"
                        for="selectSexWoman"
                      >หญิง</label>
                    </div>
                  </div>
                  <small class="is-invalid-color">{{ formValidation('selectSex') }}</small>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <h6 class="text-white font-weight-100">อายุ</h6>
                    <select
                      class="custom-select form-controls form-control-lg text-white text-center"
                      ref="selectAge"
                      @change="removeValidation('selectAge')"
                      :class="{'is-invalid' : formValidation('selectAge')}"
                      required
                    >
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
                <div class="col-12 mt-2">
                  <div class="form-group">
                    <h6 class="text-white font-weight-100">คุณรู้จักเรา จากช่องทางใด</h6>
                    <select
                      class="custom-select form-controls form-control-lg text-white text-center"
                      ref="selectWay"
                      @change="removeValidation('selectWay')"
                      :class="{'is-invalid' : formValidation('selectWay')}"
                      required
                    >
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
              <div class="row">
                <div class="col-6">
                  <div class="form-group">
                    <h6 class="text-white" style="font-weight:100;">ชื่อจริง</h6>
                    <input
                      type="text"
                      ref="inputFirstName"
                      :class="{'is-invalid' : formValidation('inputFirstName')}"
                      @keyup="removeValidation('inputFirstName')"
                      class="form-controls form-control-lg text-center"
                      placeholder="ชื่อจริง"
                      required
                    />
                    <div class="invalid-feedback">{{ formValidation('inputFirstName') }}</div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-group">
                    <h6 class="text-white" style="font-weight:100;">นามสกุล</h6>
                    <input
                      type="text"
                      ref="inputLastName"
                      :class="{'is-invalid' : formValidation('inputLastName')}"
                      @keyup="removeValidation('inputLastName')"
                      class="form-controls form-control-lg text-center"
                      placeholder="นามสกุล"
                      required
                    />
                    <div class="invalid-feedback">{{ formValidation('inputLastName') }}</div>
                  </div>
                </div>
              </div>
              <!-- {{bankArray.data}} -->
              <div class="row mb-5">
                <div class="col-12">
                  <div class="form-group">
                    <h6 class="text-white" style="font-weight:100;">เลือกธนาคารของลูกค้า</h6>
                    <select
                      class="custom-select form-controls form-control-lg"
                      ref="selecBankAccount"
                      @change="removeValidation('selecBankAccount')"
                      :class="{'is-invalid' : formValidation('selecBankAccount')}"
                    >
                      <option
                        value
                        disabled
                        selected
                        class="text-white"
                        style="font-weight:100;"
                      >กรุณาเลือกธนาคารของลูกค้า</option>
                      <option
                        :value="item.id"
                        v-for="(item, index) in bankArray"
                        :key="index"
                      >{{item.name}}</option>
                    </select>
                    <div class="invalid-feedback">{{formValidation('selecBankAccount')}}</div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group">
                    <h6 class="text-white" style="font-weight:100;">เลขบัญชีธนาคาร</h6>
                    <input
                      type="number"
                      pattern="\d*"
                      maxlength="13"
                      v-model="inputBankAccountNumber"
                      ref="inputBankAccountNumber"
                      :class="{'is-invalid' : formValidation('inputBankAccountNumber')}"
                      @keyup="removeValidation('inputBankAccountNumber')"
                      class="form-controls form-control-lg text-center"
                      placeholder=" เลขบัญชีธนาคาร"
                      required
                    />
                    <div class="invalid-feedback">
                      <p
                        class="m-0"
                        v-for="(item, index) in formValidation('inputBankAccountNumber')"
                        :key="index"
                      >{{item}}</p>
                    </div>
                  </div>
                </div>

                <div class="col-12 mt-3">
                  <a
                    class="btn btn-theme btn-lg shadow"
                    @click="sendRegister"
                  >ยืนยันข้อมูล</a>
                </div>
              </div>
              <div class="row mb-5"></div>
            </div>
          </form>
          <div style="overflow: hidden;">
            <!-- ----------------START @STEP 2 ---------------- -->
            <form class="form-signin mt-3 animated fadeIn" v-show="step == 2">
              <div class="row">
                <div class="col-12">
                  <div class="text-template">
                    <h5 class="text-center" style="color:#fff;">ยืนยันข้อมูลสำเร็จ</h5>
                    <hr class="bg-dark border-dark" />
                    <small
                      class="d-block"
                    >* กรุณาใช้บัญชีธนาคารที่ท่านลงทะเบียนไว้ในระบบเราเท่านั้น ในการโอนเงิน เครดิตจะเข้าเกมโดยอัตโนมัติ</small>
                    <small
                      class="d-block my-3"
                    >* ยอดที่แจ้งถอน จะโอนเข้าบัญชีที่ท่านลงทะเบียนภายใน 5-10 นาที</small>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group float-label active">
                    <div class="input-group mb-3"></div>
                    <!-- <label class="form-control-label">Username</label> -->
                  </div>
                </div>
                <div class="col-12 mt-2">
                  <button
                    class="w-100 btn btn-ocean btn-lg shadow btn-block"
                    @click="nextStepLogin"
                    style="color: #000; font-size:22px;"
                  >ตกลง</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- </b-modal> -->
</template>
<style>
button.form-controls,
input.form-controls,
select.form-controls {
  color: #555;
  border: 1px solid #555;
  background-color: #000;
  width: 100%;
  border-radius: 5px;
}
.btn-ocean {
  width: 100%;
  background-image: linear-gradient(
    rgb(191, 191, 191),
    rgb(255, 255, 255),
    rgb(220, 220, 220)
  );
}
.vue-pincode-input-wrapper {
  display: flex !important;
  justify-content: center;
}
.modal-body {
  position: relative;
  flex: 1 1 auto;
  padding: 0 1rem;
  padding: 0 1rem 1rem;
}
.invalid-feedback {
  display: none;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 80%;
}
.invalid-warning {
  color: #000;
}
input.vue-pincode-input {
  color: #fff;
  background: #222222;
  max-width: 77px;
  height: 45px;
}
.form-group .form-control-lg {
  color: #ccc;
}
</style>

<style scoped>
body {
  background-color: #000000;
}

.text-validation {
  width: 100%;
  margin-top: 0.25rem;
  font-size: 80%;
  color: #fd6d03;
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
.onoffswitch-inner:before {
  content: "ON";
  padding-left: 10px;
  background-color: #34c251;
  color: #ffffff;
}
.onoffswitch-inner:after {
  content: "OFF";
  padding-right: 10px;
  background-color: #eeeeee;
  color: #999999;
  text-align: right;
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

#stars {
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow: 1226px 1621px #fff, 1021px 1311px #fff, 589px 396px #fff,
    106px 950px #fff, 1628px 685px #fff, 1982px 1853px #fff, 683px 1196px #fff,
    885px 147px #fff, 140px 572px #fff, 1414px 202px #fff, 1287px 375px #fff,
    812px 233px #fff, 245px 366px #fff, 619px 1786px #fff, 158px 727px #fff,
    1051px 1759px #fff, 1232px 1572px #fff, 304px 515px #fff, 1107px 1063px #fff,
    1409px 293px #fff, 844px 1928px #fff, 1297px 766px #fff, 769px 53px #fff,
    1796px 1499px #fff, 1096px 1588px #fff, 6px 1066px #fff, 954px 1823px #fff,
    449px 1318px #fff, 742px 324px #fff, 1360px 430px #fff, 474px 517px #fff,
    1638px 553px #fff, 65px 362px #fff, 1668px 305px #fff, 618px 1791px #fff,
    1248px 698px #fff, 526px 1505px #fff, 443px 1738px #fff, 968px 744px #fff,
    1509px 1343px #fff, 940px 891px #fff, 1426px 313px #fff, 86px 1904px #fff,
    1852px 914px #fff, 1774px 1138px #fff, 1406px 378px #fff, 82px 384px #fff,
    1195px 1561px #fff, 472px 1994px #fff, 887px 708px #fff, 1078px 680px #fff,
    1715px 140px #fff, 333px 1224px #fff, 1538px 412px #fff, 1476px 644px #fff,
    976px 149px #fff, 938px 1127px #fff, 531px 1088px #fff, 996px 403px #fff,
    279px 1233px #fff, 1761px 1297px #fff, 1126px 1184px #fff, 1417px 375px #fff,
    1085px 1137px #fff, 669px 987px #fff, 1149px 1963px #fff, 1097px 880px #fff,
    1591px 85px #fff, 1858px 884px #fff, 1187px 1483px #fff, 1246px 415px #fff,
    126px 516px #fff, 1824px 672px #fff, 178px 250px #fff, 1675px 146px #fff,
    1827px 816px #fff, 803px 992px #fff, 1703px 1664px #fff, 1658px 970px #fff,
    1607px 1896px #fff, 268px 499px #fff, 465px 395px #fff, 287px 468px #fff,
    980px 1675px #fff, 1959px 1989px #fff, 429px 1263px #fff, 1419px 1703px #fff,
    302px 335px #fff, 1470px 698px #fff, 431px 1784px #fff, 1397px 1168px #fff,
    585px 143px #fff, 1163px 455px #fff, 1007px 1355px #fff, 764px 1147px #fff,
    1528px 1835px #fff, 1298px 1629px #fff, 438px 971px #fff, 1940px 1307px #fff,
    1767px 1080px #fff, 1700px 1582px #fff, 911px 709px #fff, 1733px 1916px #fff,
    1650px 1153px #fff, 1491px 1908px #fff, 1221px 1065px #fff, 389px 749px #fff,
    576px 602px #fff, 84px 1595px #fff, 1887px 1748px #fff, 1293px 1674px #fff,
    1372px 986px #fff, 834px 1280px #fff, 241px 777px #fff, 1122px 1540px #fff,
    908px 1032px #fff, 1715px 14px #fff, 732px 1014px #fff, 1888px 766px #fff,
    1433px 1174px #fff, 1273px 1889px #fff, 337px 301px #fff, 1449px 1878px #fff,
    946px 1411px #fff, 965px 181px #fff, 1508px 537px #fff, 977px 1648px #fff,
    696px 1932px #fff, 601px 305px #fff, 1734px 186px #fff, 1962px 1776px #fff,
    965px 791px #fff, 1563px 422px #fff, 1427px 822px #fff, 1540px 599px #fff,
    1246px 1681px #fff, 1271px 1136px #fff, 1411px 641px #fff,
    1108px 1981px #fff, 961px 1884px #fff, 788px 631px #fff, 172px 783px #fff,
    1729px 455px #fff, 1682px 1051px #fff, 911px 1455px #fff, 1652px 489px #fff,
    880px 94px #fff, 59px 747px #fff, 417px 223px #fff, 332px 1397px #fff,
    699px 659px #fff, 693px 728px #fff, 1232px 208px #fff, 1514px 774px #fff,
    1070px 633px #fff, 1768px 165px #fff, 1261px 1666px #fff, 35px 1979px #fff,
    54px 1408px #fff, 820px 745px #fff, 1732px 147px #fff, 1282px 1121px #fff,
    1640px 1px #fff, 1932px 632px #fff, 895px 31px #fff, 1751px 266px #fff,
    746px 54px #fff, 1197px 986px #fff, 1032px 658px #fff, 234px 1526px #fff,
    1267px 1176px #fff, 1280px 357px #fff, 1333px 381px #fff, 1739px 1375px #fff,
    888px 1325px #fff, 704px 550px #fff, 20px 359px #fff, 987px 1218px #fff,
    794px 1724px #fff, 774px 590px #fff, 1024px 227px #fff, 1487px 400px #fff,
    1446px 627px #fff, 984px 1342px #fff, 966px 703px #fff, 105px 1673px #fff,
    1225px 1267px #fff, 119px 1202px #fff, 1458px 273px #fff, 1057px 1167px #fff,
    116px 735px #fff, 665px 1021px #fff, 476px 1830px #fff, 145px 906px #fff,
    502px 596px #fff, 1629px 645px #fff, 728px 1972px #fff, 342px 605px #fff,
    1331px 179px #fff, 707px 1684px #fff, 388px 1757px #fff, 805px 73px #fff,
    659px 180px #fff, 848px 915px #fff, 182px 1550px #fff, 1955px 155px #fff,
    973px 1546px #fff, 1061px 1579px #fff, 52px 687px #fff, 1104px 1352px #fff,
    408px 1386px #fff, 1888px 1692px #fff, 956px 1018px #fff, 1355px 1568px #fff,
    1505px 1550px #fff, 1182px 705px #fff, 959px 1050px #fff, 498px 1432px #fff,
    301px 647px #fff, 443px 334px #fff, 1402px 461px #fff, 147px 1270px #fff,
    391px 1572px #fff, 1017px 341px #fff, 68px 1770px #fff, 235px 860px #fff,
    505px 816px #fff, 1312px 986px #fff, 1079px 1293px #fff, 324px 611px #fff,
    1179px 1011px #fff, 277px 434px #fff, 1767px 252px #fff, 1775px 1487px #fff,
    1705px 19px #fff, 326px 721px #fff, 378px 70px #fff, 895px 1736px #fff,
    1570px 365px #fff, 513px 615px #fff, 1092px 147px #fff, 1318px 1932px #fff,
    1592px 1734px #fff, 699px 918px #fff, 111px 388px #fff, 1067px 890px #fff,
    1169px 332px #fff, 358px 481px #fff, 1630px 750px #fff, 179px 1787px #fff,
    355px 489px #fff, 852px 821px #fff, 868px 364px #fff, 386px 1700px #fff,
    799px 1420px #fff, 1472px 644px #fff, 1552px 905px #fff, 48px 1998px #fff,
    1850px 51px #fff, 416px 678px #fff, 759px 1046px #fff, 1451px 1951px #fff,
    101px 1610px #fff, 1469px 912px #fff, 1214px 1292px #fff, 1368px 1018px #fff,
    484px 470px #fff, 816px 322px #fff, 1821px 1326px #fff, 327px 1936px #fff,
    752px 550px #fff, 1215px 1924px #fff, 180px 122px #fff, 784px 1924px #fff,
    1597px 336px #fff, 248px 1429px #fff, 4px 181px #fff, 1801px 1613px #fff,
    1581px 1719px #fff, 640px 1391px #fff, 960px 302px #fff, 1483px 1207px #fff,
    520px 1119px #fff, 25px 1754px #fff, 545px 317px #fff, 1573px 751px #fff,
    1415px 2px #fff, 101px 761px #fff, 679px 291px #fff, 1785px 676px #fff,
    1256px 136px #fff, 855px 197px #fff, 1399px 1973px #fff, 1243px 429px #fff,
    1281px 571px #fff, 839px 531px #fff, 789px 1980px #fff, 877px 783px #fff,
    1526px 1850px #fff, 644px 1283px #fff, 1982px 1953px #fff,
    1109px 1232px #fff, 1532px 643px #fff, 823px 1287px #fff, 667px 34px #fff,
    24px 1469px #fff, 1029px 1130px #fff, 1645px 254px #fff, 1054px 1000px #fff,
    1341px 254px #fff, 184px 188px #fff, 1160px 1521px #fff, 348px 1083px #fff,
    1436px 1796px #fff, 441px 361px #fff, 1239px 575px #fff, 1055px 140px #fff,
    1552px 502px #fff, 607px 864px #fff, 967px 1883px #fff, 1407px 1955px #fff,
    405px 1148px #fff, 604px 992px #fff, 1116px 506px #fff, 13px 832px #fff,
    295px 189px #fff, 964px 1175px #fff, 1988px 52px #fff, 935px 209px #fff,
    17px 142px #fff, 770px 333px #fff, 682px 633px #fff, 510px 466px #fff,
    366px 79px #fff, 199px 954px #fff, 882px 277px #fff, 744px 655px #fff,
    37px 1659px #fff, 1217px 1885px #fff, 1107px 597px #fff, 1060px 1335px #fff,
    773px 601px #fff, 1939px 1632px #fff, 1607px 1774px #fff, 1531px 1550px #fff,
    1042px 60px #fff, 850px 1502px #fff, 1670px 492px #fff, 1357px 1654px #fff,
    1279px 1521px #fff, 633px 1956px #fff, 1122px 1981px #fff, 661px 657px #fff,
    521px 1132px #fff, 1593px 813px #fff, 1204px 1463px #fff, 1112px 1495px #fff,
    1755px 367px #fff, 1685px 1805px #fff, 1982px 196px #fff, 484px 51px #fff,
    1041px 330px #fff, 1487px 563px #fff, 311px 1872px #fff, 330px 976px #fff,
    6px 1754px #fff, 1447px 1182px #fff, 1926px 148px #fff, 1640px 490px #fff,
    1548px 1357px #fff, 1052px 1340px #fff, 1083px 56px #fff, 1890px 339px #fff,
    277px 1609px #fff, 892px 1792px #fff, 1322px 86px #fff, 1509px 1515px #fff,
    1650px 1722px #fff, 334px 497px #fff, 888px 143px #fff, 1325px 259px #fff,
    1330px 1505px #fff, 1374px 645px #fff, 1184px 937px #fff, 911px 1044px #fff,
    32px 1257px #fff, 297px 1884px #fff, 1031px 963px #fff, 411px 916px #fff,
    243px 1305px #fff, 898px 200px #fff, 1550px 156px #fff, 159px 716px #fff,
    240px 1130px #fff, 1046px 1905px #fff, 1405px 1277px #fff, 275px 124px #fff,
    964px 795px #fff, 1270px 1387px #fff, 1391px 1880px #fff, 484px 1027px #fff,
    1681px 1706px #fff, 1665px 697px #fff, 1073px 1078px #fff,
    1808px 1313px #fff, 1669px 1266px #fff, 1965px 747px #fff, 1734px 972px #fff,
    1549px 1434px #fff, 945px 146px #fff, 1211px 1383px #fff, 1921px 1637px #fff,
    271px 1725px #fff, 739px 1725px #fff, 1634px 1827px #fff, 961px 1131px #fff,
    513px 839px #fff, 1553px 1725px #fff, 82px 1667px #fff, 3px 1797px #fff,
    517px 1511px #fff, 1644px 929px #fff, 120px 1638px #fff, 579px 1168px #fff,
    147px 680px #fff, 61px 1146px #fff, 884px 598px #fff, 630px 1324px #fff,
    1709px 1340px #fff, 1332px 1142px #fff, 1990px 1397px #fff,
    854px 1527px #fff, 1293px 634px #fff, 1063px 506px #fff, 1361px 668px #fff,
    926px 347px #fff, 145px 1031px #fff, 1289px 1519px #fff, 1977px 1560px #fff,
    70px 1353px #fff, 653px 1634px #fff, 1182px 340px #fff, 1264px 1127px #fff,
    1246px 40px #fff, 428px 691px #fff, 1531px 1817px #fff, 431px 1906px #fff,
    1406px 1665px #fff, 597px 1588px #fff, 1273px 355px #fff, 995px 1018px #fff,
    1319px 528px #fff, 1454px 715px #fff, 1587px 1052px #fff, 921px 193px #fff,
    1012px 479px #fff, 689px 1019px #fff, 1307px 420px #fff, 1153px 108px #fff,
    1343px 775px #fff, 1236px 1061px #fff, 1117px 1099px #fff, 308px 533px #fff,
    1262px 509px #fff, 830px 24px #fff, 426px 695px #fff, 1148px 1397px #fff,
    1016px 1719px #fff, 1142px 1280px #fff, 1841px 310px #fff,
    1890px 1708px #fff, 1399px 589px #fff, 913px 1291px #fff, 955px 1445px #fff,
    431px 491px #fff, 580px 1002px #fff, 796px 186px #fff, 445px 1634px #fff,
    1543px 1377px #fff, 1853px 57px #fff, 34px 620px #fff, 1056px 923px #fff,
    1027px 134px #fff, 1248px 1252px #fff, 756px 1855px #fff, 143px 654px #fff,
    253px 347px #fff, 181px 943px #fff, 1044px 1774px #fff, 367px 1925px #fff,
    1125px 854px #fff, 1276px 141px #fff, 422px 413px #fff, 1261px 973px #fff,
    1030px 1349px #fff, 1349px 1850px #fff, 552px 1286px #fff, 606px 888px #fff,
    464px 1922px #fff, 1799px 260px #fff, 1984px 788px #fff, 1210px 450px #fff,
    1288px 1530px #fff, 911px 1896px #fff, 689px 4px #fff, 806px 162px #fff,
    1201px 604px #fff, 908px 531px #fff, 137px 1123px #fff, 1165px 496px #fff,
    1567px 1797px #fff, 614px 504px #fff, 1551px 1165px #fff, 1309px 1032px #fff,
    1321px 26px #fff, 1372px 326px #fff, 1762px 1159px #fff, 728px 5px #fff,
    1364px 459px #fff, 1333px 918px #fff, 1082px 1732px #fff, 286px 319px #fff,
    1636px 1220px #fff, 350px 966px #fff, 124px 219px #fff, 184px 1654px #fff,
    1195px 160px #fff, 1690px 737px #fff, 1386px 472px #fff, 1522px 1911px #fff,
    1082px 1129px #fff, 491px 67px #fff, 826px 393px #fff, 643px 632px #fff,
    1934px 1461px #fff, 1325px 316px #fff, 934px 1722px #fff, 1044px 879px #fff,
    1109px 1482px #fff, 1040px 642px #fff, 801px 509px #fff, 1352px 1583px #fff,
    160px 339px #fff, 1111px 1731px #fff, 1650px 1190px #fff, 1804px 1019px #fff,
    745px 604px #fff, 1391px 1108px #fff, 344px 708px #fff, 395px 111px #fff,
    913px 1180px #fff, 537px 1036px #fff, 1048px 1611px #fff, 1926px 155px #fff,
    392px 193px #fff, 1980px 1465px #fff, 1853px 1349px #fff, 204px 1317px #fff,
    1342px 1956px #fff, 785px 1564px #fff, 1478px 612px #fff, 1459px 491px #fff,
    1767px 265px #fff, 1032px 495px #fff, 946px 1196px #fff, 607px 285px #fff,
    887px 1940px #fff, 1618px 962px #fff, 85px 801px #fff, 1828px 525px #fff,
    523px 1927px #fff, 280px 1676px #fff, 551px 1133px #fff, 1888px 936px #fff,
    875px 863px #fff, 395px 1954px #fff, 155px 590px #fff, 1924px 262px #fff,
    1039px 1430px #fff, 1356px 1816px #fff, 978px 671px #fff, 1968px 1044px #fff,
    1693px 15px #fff, 266px 1506px #fff, 1061px 224px #fff, 690px 1132px #fff,
    1149px 313px #fff, 744px 898px #fff, 848px 1851px #fff, 296px 761px #fff,
    55px 624px #fff, 573px 131px #fff, 483px 1869px #fff, 157px 1304px #fff,
    496px 489px #fff, 729px 1730px #fff, 163px 1023px #fff, 1065px 1426px #fff,
    1058px 865px #fff, 1204px 1762px #fff, 73px 527px #fff, 668px 1237px #fff,
    1px 259px #fff, 1027px 107px #fff, 1347px 842px #fff, 720px 819px #fff,
    97px 1047px #fff, 474px 1262px #fff, 1406px 1163px #fff, 1620px 1312px #fff,
    292px 423px #fff, 1579px 1735px #fff, 687px 305px #fff, 1810px 1822px #fff,
    1499px 241px #fff, 1578px 1308px #fff, 770px 1441px #fff, 398px 646px #fff,
    1186px 1423px #fff, 6px 201px #fff, 1684px 1057px #fff, 1252px 1352px #fff,
    1649px 317px #fff, 746px 1777px #fff, 537px 97px #fff, 347px 1613px #fff,
    1709px 1896px #fff, 134px 957px #fff, 755px 340px #fff, 107px 1057px #fff,
    263px 1459px #fff, 1559px 1124px #fff, 1082px 19px #fff, 557px 795px #fff,
    596px 455px #fff, 1877px 1535px #fff, 457px 320px #fff, 532px 270px #fff,
    773px 1991px #fff, 644px 1840px #fff, 777px 1413px #fff, 726px 203px #fff,
    20px 740px #fff, 655px 909px #fff, 396px 1998px #fff, 235px 954px #fff,
    1737px 264px #fff, 670px 1532px #fff, 498px 159px #fff, 540px 1997px #fff,
    1792px 1327px #fff, 880px 1023px #fff, 1917px 1938px #fff, 1859px 148px #fff,
    1147px 1781px #fff, 428px 1876px #fff, 1952px 605px #fff, 655px 80px #fff,
    1500px 1545px #fff, 1656px 644px #fff, 615px 247px #fff, 795px 1881px #fff,
    1750px 586px #fff, 148px 1490px #fff, 1434px 74px #fff, 417px 1969px #fff,
    962px 1526px #fff, 835px 962px #fff, 330px 1767px #fff, 1557px 435px #fff,
    240px 341px #fff, 1857px 1589px #fff, 765px 281px #fff, 1452px 405px #fff,
    1480px 1724px #fff, 950px 1094px #fff, 710px 1388px #fff, 1333px 1919px #fff,
    706px 1589px #fff, 1476px 1465px #fff, 744px 291px #fff, 123px 870px #fff,
    1406px 428px #fff, 727px 1609px #fff, 1149px 1838px #fff, 78px 169px #fff,
    1088px 284px #fff, 670px 399px #fff, 711px 1923px #fff, 42px 1720px #fff,
    667px 570px #fff, 1274px 693px #fff, 1056px 644px #fff, 1937px 793px #fff,
    1200px 602px #fff, 1493px 755px #fff, 545px 870px #fff, 887px 270px #fff,
    1290px 164px #fff, 265px 1185px #fff;
  animation: animStar 50s linear infinite;
}
#stars:after {
  content: " ";
  position: absolute;
  top: 2000px;
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow: 1226px 1621px #fff, 1021px 1311px #fff, 589px 396px #fff,
    106px 950px #fff, 1628px 685px #fff, 1982px 1853px #fff, 683px 1196px #fff,
    885px 147px #fff, 140px 572px #fff, 1414px 202px #fff, 1287px 375px #fff,
    812px 233px #fff, 245px 366px #fff, 619px 1786px #fff, 158px 727px #fff,
    1051px 1759px #fff, 1232px 1572px #fff, 304px 515px #fff, 1107px 1063px #fff,
    1409px 293px #fff, 844px 1928px #fff, 1297px 766px #fff, 769px 53px #fff,
    1796px 1499px #fff, 1096px 1588px #fff, 6px 1066px #fff, 954px 1823px #fff,
    449px 1318px #fff, 742px 324px #fff, 1360px 430px #fff, 474px 517px #fff,
    1638px 553px #fff, 65px 362px #fff, 1668px 305px #fff, 618px 1791px #fff,
    1248px 698px #fff, 526px 1505px #fff, 443px 1738px #fff, 968px 744px #fff,
    1509px 1343px #fff, 940px 891px #fff, 1426px 313px #fff, 86px 1904px #fff,
    1852px 914px #fff, 1774px 1138px #fff, 1406px 378px #fff, 82px 384px #fff,
    1195px 1561px #fff, 472px 1994px #fff, 887px 708px #fff, 1078px 680px #fff,
    1715px 140px #fff, 333px 1224px #fff, 1538px 412px #fff, 1476px 644px #fff,
    976px 149px #fff, 938px 1127px #fff, 531px 1088px #fff, 996px 403px #fff,
    279px 1233px #fff, 1761px 1297px #fff, 1126px 1184px #fff, 1417px 375px #fff,
    1085px 1137px #fff, 669px 987px #fff, 1149px 1963px #fff, 1097px 880px #fff,
    1591px 85px #fff, 1858px 884px #fff, 1187px 1483px #fff, 1246px 415px #fff,
    126px 516px #fff, 1824px 672px #fff, 178px 250px #fff, 1675px 146px #fff,
    1827px 816px #fff, 803px 992px #fff, 1703px 1664px #fff, 1658px 970px #fff,
    1607px 1896px #fff, 268px 499px #fff, 465px 395px #fff, 287px 468px #fff,
    980px 1675px #fff, 1959px 1989px #fff, 429px 1263px #fff, 1419px 1703px #fff,
    302px 335px #fff, 1470px 698px #fff, 431px 1784px #fff, 1397px 1168px #fff,
    585px 143px #fff, 1163px 455px #fff, 1007px 1355px #fff, 764px 1147px #fff,
    1528px 1835px #fff, 1298px 1629px #fff, 438px 971px #fff, 1940px 1307px #fff,
    1767px 1080px #fff, 1700px 1582px #fff, 911px 709px #fff, 1733px 1916px #fff,
    1650px 1153px #fff, 1491px 1908px #fff, 1221px 1065px #fff, 389px 749px #fff,
    576px 602px #fff, 84px 1595px #fff, 1887px 1748px #fff, 1293px 1674px #fff,
    1372px 986px #fff, 834px 1280px #fff, 241px 777px #fff, 1122px 1540px #fff,
    908px 1032px #fff, 1715px 14px #fff, 732px 1014px #fff, 1888px 766px #fff,
    1433px 1174px #fff, 1273px 1889px #fff, 337px 301px #fff, 1449px 1878px #fff,
    946px 1411px #fff, 965px 181px #fff, 1508px 537px #fff, 977px 1648px #fff,
    696px 1932px #fff, 601px 305px #fff, 1734px 186px #fff, 1962px 1776px #fff,
    965px 791px #fff, 1563px 422px #fff, 1427px 822px #fff, 1540px 599px #fff,
    1246px 1681px #fff, 1271px 1136px #fff, 1411px 641px #fff,
    1108px 1981px #fff, 961px 1884px #fff, 788px 631px #fff, 172px 783px #fff,
    1729px 455px #fff, 1682px 1051px #fff, 911px 1455px #fff, 1652px 489px #fff,
    880px 94px #fff, 59px 747px #fff, 417px 223px #fff, 332px 1397px #fff,
    699px 659px #fff, 693px 728px #fff, 1232px 208px #fff, 1514px 774px #fff,
    1070px 633px #fff, 1768px 165px #fff, 1261px 1666px #fff, 35px 1979px #fff,
    54px 1408px #fff, 820px 745px #fff, 1732px 147px #fff, 1282px 1121px #fff,
    1640px 1px #fff, 1932px 632px #fff, 895px 31px #fff, 1751px 266px #fff,
    746px 54px #fff, 1197px 986px #fff, 1032px 658px #fff, 234px 1526px #fff,
    1267px 1176px #fff, 1280px 357px #fff, 1333px 381px #fff, 1739px 1375px #fff,
    888px 1325px #fff, 704px 550px #fff, 20px 359px #fff, 987px 1218px #fff,
    794px 1724px #fff, 774px 590px #fff, 1024px 227px #fff, 1487px 400px #fff,
    1446px 627px #fff, 984px 1342px #fff, 966px 703px #fff, 105px 1673px #fff,
    1225px 1267px #fff, 119px 1202px #fff, 1458px 273px #fff, 1057px 1167px #fff,
    116px 735px #fff, 665px 1021px #fff, 476px 1830px #fff, 145px 906px #fff,
    502px 596px #fff, 1629px 645px #fff, 728px 1972px #fff, 342px 605px #fff,
    1331px 179px #fff, 707px 1684px #fff, 388px 1757px #fff, 805px 73px #fff,
    659px 180px #fff, 848px 915px #fff, 182px 1550px #fff, 1955px 155px #fff,
    973px 1546px #fff, 1061px 1579px #fff, 52px 687px #fff, 1104px 1352px #fff,
    408px 1386px #fff, 1888px 1692px #fff, 956px 1018px #fff, 1355px 1568px #fff,
    1505px 1550px #fff, 1182px 705px #fff, 959px 1050px #fff, 498px 1432px #fff,
    301px 647px #fff, 443px 334px #fff, 1402px 461px #fff, 147px 1270px #fff,
    391px 1572px #fff, 1017px 341px #fff, 68px 1770px #fff, 235px 860px #fff,
    505px 816px #fff, 1312px 986px #fff, 1079px 1293px #fff, 324px 611px #fff,
    1179px 1011px #fff, 277px 434px #fff, 1767px 252px #fff, 1775px 1487px #fff,
    1705px 19px #fff, 326px 721px #fff, 378px 70px #fff, 895px 1736px #fff,
    1570px 365px #fff, 513px 615px #fff, 1092px 147px #fff, 1318px 1932px #fff,
    1592px 1734px #fff, 699px 918px #fff, 111px 388px #fff, 1067px 890px #fff,
    1169px 332px #fff, 358px 481px #fff, 1630px 750px #fff, 179px 1787px #fff,
    355px 489px #fff, 852px 821px #fff, 868px 364px #fff, 386px 1700px #fff,
    799px 1420px #fff, 1472px 644px #fff, 1552px 905px #fff, 48px 1998px #fff,
    1850px 51px #fff, 416px 678px #fff, 759px 1046px #fff, 1451px 1951px #fff,
    101px 1610px #fff, 1469px 912px #fff, 1214px 1292px #fff, 1368px 1018px #fff,
    484px 470px #fff, 816px 322px #fff, 1821px 1326px #fff, 327px 1936px #fff,
    752px 550px #fff, 1215px 1924px #fff, 180px 122px #fff, 784px 1924px #fff,
    1597px 336px #fff, 248px 1429px #fff, 4px 181px #fff, 1801px 1613px #fff,
    1581px 1719px #fff, 640px 1391px #fff, 960px 302px #fff, 1483px 1207px #fff,
    520px 1119px #fff, 25px 1754px #fff, 545px 317px #fff, 1573px 751px #fff,
    1415px 2px #fff, 101px 761px #fff, 679px 291px #fff, 1785px 676px #fff,
    1256px 136px #fff, 855px 197px #fff, 1399px 1973px #fff, 1243px 429px #fff,
    1281px 571px #fff, 839px 531px #fff, 789px 1980px #fff, 877px 783px #fff,
    1526px 1850px #fff, 644px 1283px #fff, 1982px 1953px #fff,
    1109px 1232px #fff, 1532px 643px #fff, 823px 1287px #fff, 667px 34px #fff,
    24px 1469px #fff, 1029px 1130px #fff, 1645px 254px #fff, 1054px 1000px #fff,
    1341px 254px #fff, 184px 188px #fff, 1160px 1521px #fff, 348px 1083px #fff,
    1436px 1796px #fff, 441px 361px #fff, 1239px 575px #fff, 1055px 140px #fff,
    1552px 502px #fff, 607px 864px #fff, 967px 1883px #fff, 1407px 1955px #fff,
    405px 1148px #fff, 604px 992px #fff, 1116px 506px #fff, 13px 832px #fff,
    295px 189px #fff, 964px 1175px #fff, 1988px 52px #fff, 935px 209px #fff,
    17px 142px #fff, 770px 333px #fff, 682px 633px #fff, 510px 466px #fff,
    366px 79px #fff, 199px 954px #fff, 882px 277px #fff, 744px 655px #fff,
    37px 1659px #fff, 1217px 1885px #fff, 1107px 597px #fff, 1060px 1335px #fff,
    773px 601px #fff, 1939px 1632px #fff, 1607px 1774px #fff, 1531px 1550px #fff,
    1042px 60px #fff, 850px 1502px #fff, 1670px 492px #fff, 1357px 1654px #fff,
    1279px 1521px #fff, 633px 1956px #fff, 1122px 1981px #fff, 661px 657px #fff,
    521px 1132px #fff, 1593px 813px #fff, 1204px 1463px #fff, 1112px 1495px #fff,
    1755px 367px #fff, 1685px 1805px #fff, 1982px 196px #fff, 484px 51px #fff,
    1041px 330px #fff, 1487px 563px #fff, 311px 1872px #fff, 330px 976px #fff,
    6px 1754px #fff, 1447px 1182px #fff, 1926px 148px #fff, 1640px 490px #fff,
    1548px 1357px #fff, 1052px 1340px #fff, 1083px 56px #fff, 1890px 339px #fff,
    277px 1609px #fff, 892px 1792px #fff, 1322px 86px #fff, 1509px 1515px #fff,
    1650px 1722px #fff, 334px 497px #fff, 888px 143px #fff, 1325px 259px #fff,
    1330px 1505px #fff, 1374px 645px #fff, 1184px 937px #fff, 911px 1044px #fff,
    32px 1257px #fff, 297px 1884px #fff, 1031px 963px #fff, 411px 916px #fff,
    243px 1305px #fff, 898px 200px #fff, 1550px 156px #fff, 159px 716px #fff,
    240px 1130px #fff, 1046px 1905px #fff, 1405px 1277px #fff, 275px 124px #fff,
    964px 795px #fff, 1270px 1387px #fff, 1391px 1880px #fff, 484px 1027px #fff,
    1681px 1706px #fff, 1665px 697px #fff, 1073px 1078px #fff,
    1808px 1313px #fff, 1669px 1266px #fff, 1965px 747px #fff, 1734px 972px #fff,
    1549px 1434px #fff, 945px 146px #fff, 1211px 1383px #fff, 1921px 1637px #fff,
    271px 1725px #fff, 739px 1725px #fff, 1634px 1827px #fff, 961px 1131px #fff,
    513px 839px #fff, 1553px 1725px #fff, 82px 1667px #fff, 3px 1797px #fff,
    517px 1511px #fff, 1644px 929px #fff, 120px 1638px #fff, 579px 1168px #fff,
    147px 680px #fff, 61px 1146px #fff, 884px 598px #fff, 630px 1324px #fff,
    1709px 1340px #fff, 1332px 1142px #fff, 1990px 1397px #fff,
    854px 1527px #fff, 1293px 634px #fff, 1063px 506px #fff, 1361px 668px #fff,
    926px 347px #fff, 145px 1031px #fff, 1289px 1519px #fff, 1977px 1560px #fff,
    70px 1353px #fff, 653px 1634px #fff, 1182px 340px #fff, 1264px 1127px #fff,
    1246px 40px #fff, 428px 691px #fff, 1531px 1817px #fff, 431px 1906px #fff,
    1406px 1665px #fff, 597px 1588px #fff, 1273px 355px #fff, 995px 1018px #fff,
    1319px 528px #fff, 1454px 715px #fff, 1587px 1052px #fff, 921px 193px #fff,
    1012px 479px #fff, 689px 1019px #fff, 1307px 420px #fff, 1153px 108px #fff,
    1343px 775px #fff, 1236px 1061px #fff, 1117px 1099px #fff, 308px 533px #fff,
    1262px 509px #fff, 830px 24px #fff, 426px 695px #fff, 1148px 1397px #fff,
    1016px 1719px #fff, 1142px 1280px #fff, 1841px 310px #fff,
    1890px 1708px #fff, 1399px 589px #fff, 913px 1291px #fff, 955px 1445px #fff,
    431px 491px #fff, 580px 1002px #fff, 796px 186px #fff, 445px 1634px #fff,
    1543px 1377px #fff, 1853px 57px #fff, 34px 620px #fff, 1056px 923px #fff,
    1027px 134px #fff, 1248px 1252px #fff, 756px 1855px #fff, 143px 654px #fff,
    253px 347px #fff, 181px 943px #fff, 1044px 1774px #fff, 367px 1925px #fff,
    1125px 854px #fff, 1276px 141px #fff, 422px 413px #fff, 1261px 973px #fff,
    1030px 1349px #fff, 1349px 1850px #fff, 552px 1286px #fff, 606px 888px #fff,
    464px 1922px #fff, 1799px 260px #fff, 1984px 788px #fff, 1210px 450px #fff,
    1288px 1530px #fff, 911px 1896px #fff, 689px 4px #fff, 806px 162px #fff,
    1201px 604px #fff, 908px 531px #fff, 137px 1123px #fff, 1165px 496px #fff,
    1567px 1797px #fff, 614px 504px #fff, 1551px 1165px #fff, 1309px 1032px #fff,
    1321px 26px #fff, 1372px 326px #fff, 1762px 1159px #fff, 728px 5px #fff,
    1364px 459px #fff, 1333px 918px #fff, 1082px 1732px #fff, 286px 319px #fff,
    1636px 1220px #fff, 350px 966px #fff, 124px 219px #fff, 184px 1654px #fff,
    1195px 160px #fff, 1690px 737px #fff, 1386px 472px #fff, 1522px 1911px #fff,
    1082px 1129px #fff, 491px 67px #fff, 826px 393px #fff, 643px 632px #fff,
    1934px 1461px #fff, 1325px 316px #fff, 934px 1722px #fff, 1044px 879px #fff,
    1109px 1482px #fff, 1040px 642px #fff, 801px 509px #fff, 1352px 1583px #fff,
    160px 339px #fff, 1111px 1731px #fff, 1650px 1190px #fff, 1804px 1019px #fff,
    745px 604px #fff, 1391px 1108px #fff, 344px 708px #fff, 395px 111px #fff,
    913px 1180px #fff, 537px 1036px #fff, 1048px 1611px #fff, 1926px 155px #fff,
    392px 193px #fff, 1980px 1465px #fff, 1853px 1349px #fff, 204px 1317px #fff,
    1342px 1956px #fff, 785px 1564px #fff, 1478px 612px #fff, 1459px 491px #fff,
    1767px 265px #fff, 1032px 495px #fff, 946px 1196px #fff, 607px 285px #fff,
    887px 1940px #fff, 1618px 962px #fff, 85px 801px #fff, 1828px 525px #fff,
    523px 1927px #fff, 280px 1676px #fff, 551px 1133px #fff, 1888px 936px #fff,
    875px 863px #fff, 395px 1954px #fff, 155px 590px #fff, 1924px 262px #fff,
    1039px 1430px #fff, 1356px 1816px #fff, 978px 671px #fff, 1968px 1044px #fff,
    1693px 15px #fff, 266px 1506px #fff, 1061px 224px #fff, 690px 1132px #fff,
    1149px 313px #fff, 744px 898px #fff, 848px 1851px #fff, 296px 761px #fff,
    55px 624px #fff, 573px 131px #fff, 483px 1869px #fff, 157px 1304px #fff,
    496px 489px #fff, 729px 1730px #fff, 163px 1023px #fff, 1065px 1426px #fff,
    1058px 865px #fff, 1204px 1762px #fff, 73px 527px #fff, 668px 1237px #fff,
    1px 259px #fff, 1027px 107px #fff, 1347px 842px #fff, 720px 819px #fff,
    97px 1047px #fff, 474px 1262px #fff, 1406px 1163px #fff, 1620px 1312px #fff,
    292px 423px #fff, 1579px 1735px #fff, 687px 305px #fff, 1810px 1822px #fff,
    1499px 241px #fff, 1578px 1308px #fff, 770px 1441px #fff, 398px 646px #fff,
    1186px 1423px #fff, 6px 201px #fff, 1684px 1057px #fff, 1252px 1352px #fff,
    1649px 317px #fff, 746px 1777px #fff, 537px 97px #fff, 347px 1613px #fff,
    1709px 1896px #fff, 134px 957px #fff, 755px 340px #fff, 107px 1057px #fff,
    263px 1459px #fff, 1559px 1124px #fff, 1082px 19px #fff, 557px 795px #fff,
    596px 455px #fff, 1877px 1535px #fff, 457px 320px #fff, 532px 270px #fff,
    773px 1991px #fff, 644px 1840px #fff, 777px 1413px #fff, 726px 203px #fff,
    20px 740px #fff, 655px 909px #fff, 396px 1998px #fff, 235px 954px #fff,
    1737px 264px #fff, 670px 1532px #fff, 498px 159px #fff, 540px 1997px #fff,
    1792px 1327px #fff, 880px 1023px #fff, 1917px 1938px #fff, 1859px 148px #fff,
    1147px 1781px #fff, 428px 1876px #fff, 1952px 605px #fff, 655px 80px #fff,
    1500px 1545px #fff, 1656px 644px #fff, 615px 247px #fff, 795px 1881px #fff,
    1750px 586px #fff, 148px 1490px #fff, 1434px 74px #fff, 417px 1969px #fff,
    962px 1526px #fff, 835px 962px #fff, 330px 1767px #fff, 1557px 435px #fff,
    240px 341px #fff, 1857px 1589px #fff, 765px 281px #fff, 1452px 405px #fff,
    1480px 1724px #fff, 950px 1094px #fff, 710px 1388px #fff, 1333px 1919px #fff,
    706px 1589px #fff, 1476px 1465px #fff, 744px 291px #fff, 123px 870px #fff,
    1406px 428px #fff, 727px 1609px #fff, 1149px 1838px #fff, 78px 169px #fff,
    1088px 284px #fff, 670px 399px #fff, 711px 1923px #fff, 42px 1720px #fff,
    667px 570px #fff, 1274px 693px #fff, 1056px 644px #fff, 1937px 793px #fff,
    1200px 602px #fff, 1493px 755px #fff, 545px 870px #fff, 887px 270px #fff,
    1290px 164px #fff, 265px 1185px #fff;
}

#stars2 {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: transparent;
  box-shadow: 236px 1043px #fff, 784px 298px #fff, 594px 611px #fff,
    1790px 363px #fff, 1099px 831px #fff, 1619px 474px #fff, 903px 652px #fff,
    1472px 978px #fff, 1620px 1445px #fff, 1533px 1396px #fff, 303px 994px #fff,
    318px 1761px #fff, 1755px 263px #fff, 783px 482px #fff, 1224px 216px #fff,
    1625px 1456px #fff, 813px 1703px #fff, 1918px 1212px #fff, 1872px 799px #fff,
    280px 793px #fff, 1932px 99px #fff, 1925px 1863px #fff, 1444px 809px #fff,
    879px 484px #fff, 1283px 1275px #fff, 154px 1516px #fff, 1986px 404px #fff,
    526px 774px #fff, 540px 664px #fff, 953px 1818px #fff, 1931px 1100px #fff,
    1105px 92px #fff, 1290px 210px #fff, 1739px 33px #fff, 466px 1203px #fff,
    1821px 139px #fff, 1524px 269px #fff, 777px 1345px #fff, 116px 29px #fff,
    692px 10px #fff, 1165px 1444px #fff, 230px 1666px #fff, 1293px 811px #fff,
    1349px 414px #fff, 1598px 785px #fff, 1058px 1829px #fff, 1995px 1740px #fff,
    947px 614px #fff, 141px 1062px #fff, 1167px 248px #fff, 1366px 1098px #fff,
    811px 1344px #fff, 1723px 872px #fff, 1450px 1137px #fff, 1225px 1762px #fff,
    1766px 144px #fff, 1160px 1662px #fff, 931px 589px #fff, 937px 579px #fff,
    941px 592px #fff, 864px 681px #fff, 41px 995px #fff, 761px 1239px #fff,
    1890px 1598px #fff, 1262px 1800px #fff, 1990px 990px #fff, 1259px 880px #fff,
    1151px 1318px #fff, 352px 1485px #fff, 1345px 876px #fff, 1446px 945px #fff,
    1259px 1789px #fff, 1290px 374px #fff, 1388px 717px #fff, 32px 1673px #fff,
    1204px 862px #fff, 1184px 1186px #fff, 514px 574px #fff, 1625px 279px #fff,
    1491px 1821px #fff, 990px 398px #fff, 1552px 1243px #fff, 1427px 1528px #fff,
    222px 808px #fff, 732px 190px #fff, 12px 1378px #fff, 964px 444px #fff,
    317px 267px #fff, 1193px 161px #fff, 401px 716px #fff, 1399px 901px #fff,
    547px 318px #fff, 1365px 1943px #fff, 1083px 1137px #fff, 689px 251px #fff,
    833px 1431px #fff, 236px 177px #fff, 103px 1987px #fff, 320px 1421px #fff,
    1938px 1277px #fff, 1738px 1755px #fff, 777px 1942px #fff, 480px 1451px #fff,
    905px 1958px #fff, 993px 1429px #fff, 1748px 1796px #fff, 1596px 79px #fff,
    1355px 140px #fff, 1914px 261px #fff, 1027px 1239px #fff, 242px 534px #fff,
    1557px 192px #fff, 1884px 88px #fff, 1602px 296px #fff, 872px 307px #fff,
    998px 1373px #fff, 38px 1192px #fff, 763px 516px #fff, 1463px 925px #fff,
    1554px 147px #fff, 1322px 2000px #fff, 1885px 555px #fff, 1092px 1729px #fff,
    259px 735px #fff, 1852px 295px #fff, 49px 1307px #fff, 1111px 1808px #fff,
    1939px 643px #fff, 440px 1370px #fff, 1386px 657px #fff, 968px 611px #fff,
    1270px 1739px #fff, 870px 392px #fff, 1257px 765px #fff, 1106px 1530px #fff,
    1232px 1910px #fff, 1901px 1368px #fff, 1027px 1105px #fff,
    1787px 368px #fff, 735px 375px #fff, 1475px 825px #fff, 1836px 518px #fff,
    349px 1667px #fff, 1260px 495px #fff, 1799px 1574px #fff, 1018px 682px #fff,
    648px 995px #fff, 935px 577px #fff, 156px 1690px #fff, 602px 1920px #fff,
    1876px 384px #fff, 1561px 1362px #fff, 1446px 632px #fff, 1923px 209px #fff,
    1076px 1611px #fff, 738px 722px #fff, 1484px 1655px #fff, 137px 1339px #fff,
    1721px 541px #fff, 1544px 1082px #fff, 1083px 1601px #fff,
    1475px 1526px #fff, 1653px 1500px #fff, 451px 1136px #fff, 288px 372px #fff,
    290px 810px #fff, 1492px 814px #fff, 1508px 1379px #fff, 730px 1116px #fff,
    505px 929px #fff, 1775px 1887px #fff, 1942px 1091px #fff, 927px 1676px #fff,
    406px 992px #fff, 983px 626px #fff, 1356px 741px #fff, 1609px 936px #fff,
    313px 1244px #fff, 616px 984px #fff, 713px 1281px #fff, 1050px 844px #fff,
    1010px 104px #fff, 1858px 547px #fff, 429px 1678px #fff, 916px 763px #fff,
    418px 378px #fff, 7px 631px #fff, 1702px 1288px #fff, 799px 987px #fff,
    1661px 1081px #fff, 1655px 1846px #fff, 361px 1676px #fff,
    1979px 1521px #fff, 415px 418px #fff, 1641px 1999px #fff, 955px 882px #fff,
    1290px 324px #fff, 930px 1826px #fff, 989px 807px #fff, 461px 917px #fff;
  animation: animStar 100s linear infinite;
}
#stars2:after {
  content: " ";
  position: absolute;
  top: 2000px;
  width: 2px;
  height: 2px;
  background: transparent;
  box-shadow: 236px 1043px #fff, 784px 298px #fff, 594px 611px #fff,
    1790px 363px #fff, 1099px 831px #fff, 1619px 474px #fff, 903px 652px #fff,
    1472px 978px #fff, 1620px 1445px #fff, 1533px 1396px #fff, 303px 994px #fff,
    318px 1761px #fff, 1755px 263px #fff, 783px 482px #fff, 1224px 216px #fff,
    1625px 1456px #fff, 813px 1703px #fff, 1918px 1212px #fff, 1872px 799px #fff,
    280px 793px #fff, 1932px 99px #fff, 1925px 1863px #fff, 1444px 809px #fff,
    879px 484px #fff, 1283px 1275px #fff, 154px 1516px #fff, 1986px 404px #fff,
    526px 774px #fff, 540px 664px #fff, 953px 1818px #fff, 1931px 1100px #fff,
    1105px 92px #fff, 1290px 210px #fff, 1739px 33px #fff, 466px 1203px #fff,
    1821px 139px #fff, 1524px 269px #fff, 777px 1345px #fff, 116px 29px #fff,
    692px 10px #fff, 1165px 1444px #fff, 230px 1666px #fff, 1293px 811px #fff,
    1349px 414px #fff, 1598px 785px #fff, 1058px 1829px #fff, 1995px 1740px #fff,
    947px 614px #fff, 141px 1062px #fff, 1167px 248px #fff, 1366px 1098px #fff,
    811px 1344px #fff, 1723px 872px #fff, 1450px 1137px #fff, 1225px 1762px #fff,
    1766px 144px #fff, 1160px 1662px #fff, 931px 589px #fff, 937px 579px #fff,
    941px 592px #fff, 864px 681px #fff, 41px 995px #fff, 761px 1239px #fff,
    1890px 1598px #fff, 1262px 1800px #fff, 1990px 990px #fff, 1259px 880px #fff,
    1151px 1318px #fff, 352px 1485px #fff, 1345px 876px #fff, 1446px 945px #fff,
    1259px 1789px #fff, 1290px 374px #fff, 1388px 717px #fff, 32px 1673px #fff,
    1204px 862px #fff, 1184px 1186px #fff, 514px 574px #fff, 1625px 279px #fff,
    1491px 1821px #fff, 990px 398px #fff, 1552px 1243px #fff, 1427px 1528px #fff,
    222px 808px #fff, 732px 190px #fff, 12px 1378px #fff, 964px 444px #fff,
    317px 267px #fff, 1193px 161px #fff, 401px 716px #fff, 1399px 901px #fff,
    547px 318px #fff, 1365px 1943px #fff, 1083px 1137px #fff, 689px 251px #fff,
    833px 1431px #fff, 236px 177px #fff, 103px 1987px #fff, 320px 1421px #fff,
    1938px 1277px #fff, 1738px 1755px #fff, 777px 1942px #fff, 480px 1451px #fff,
    905px 1958px #fff, 993px 1429px #fff, 1748px 1796px #fff, 1596px 79px #fff,
    1355px 140px #fff, 1914px 261px #fff, 1027px 1239px #fff, 242px 534px #fff,
    1557px 192px #fff, 1884px 88px #fff, 1602px 296px #fff, 872px 307px #fff,
    998px 1373px #fff, 38px 1192px #fff, 763px 516px #fff, 1463px 925px #fff,
    1554px 147px #fff, 1322px 2000px #fff, 1885px 555px #fff, 1092px 1729px #fff,
    259px 735px #fff, 1852px 295px #fff, 49px 1307px #fff, 1111px 1808px #fff,
    1939px 643px #fff, 440px 1370px #fff, 1386px 657px #fff, 968px 611px #fff,
    1270px 1739px #fff, 870px 392px #fff, 1257px 765px #fff, 1106px 1530px #fff,
    1232px 1910px #fff, 1901px 1368px #fff, 1027px 1105px #fff,
    1787px 368px #fff, 735px 375px #fff, 1475px 825px #fff, 1836px 518px #fff,
    349px 1667px #fff, 1260px 495px #fff, 1799px 1574px #fff, 1018px 682px #fff,
    648px 995px #fff, 935px 577px #fff, 156px 1690px #fff, 602px 1920px #fff,
    1876px 384px #fff, 1561px 1362px #fff, 1446px 632px #fff, 1923px 209px #fff,
    1076px 1611px #fff, 738px 722px #fff, 1484px 1655px #fff, 137px 1339px #fff,
    1721px 541px #fff, 1544px 1082px #fff, 1083px 1601px #fff,
    1475px 1526px #fff, 1653px 1500px #fff, 451px 1136px #fff, 288px 372px #fff,
    290px 810px #fff, 1492px 814px #fff, 1508px 1379px #fff, 730px 1116px #fff,
    505px 929px #fff, 1775px 1887px #fff, 1942px 1091px #fff, 927px 1676px #fff,
    406px 992px #fff, 983px 626px #fff, 1356px 741px #fff, 1609px 936px #fff,
    313px 1244px #fff, 616px 984px #fff, 713px 1281px #fff, 1050px 844px #fff,
    1010px 104px #fff, 1858px 547px #fff, 429px 1678px #fff, 916px 763px #fff,
    418px 378px #fff, 7px 631px #fff, 1702px 1288px #fff, 799px 987px #fff,
    1661px 1081px #fff, 1655px 1846px #fff, 361px 1676px #fff,
    1979px 1521px #fff, 415px 418px #fff, 1641px 1999px #fff, 955px 882px #fff,
    1290px 324px #fff, 930px 1826px #fff, 989px 807px #fff, 461px 917px #fff;
}

#stars3 {
  width: 3px;
  height: 3px;
  background: transparent;
  box-shadow: 1948px 1304px #fff, 255px 1453px #fff, 146px 1809px #fff,
    1216px 205px #fff, 1418px 1507px #fff, 206px 1111px #fff, 734px 1490px #fff,
    1985px 1787px #fff, 188px 1154px #fff, 1447px 113px #fff, 1484px 1176px #fff,
    1495px 1763px #fff, 1597px 453px #fff, 1840px 1052px #fff, 655px 1587px #fff,
    1171px 1430px #fff, 1106px 410px #fff, 97px 1054px #fff, 714px 1158px #fff,
    1877px 1980px #fff, 181px 105px #fff, 1387px 1624px #fff, 485px 1406px #fff,
    1770px 1868px #fff, 1403px 770px #fff, 204px 1690px #fff, 300px 406px #fff,
    103px 364px #fff, 1376px 774px #fff, 1885px 753px #fff, 162px 822px #fff,
    1944px 1848px #fff, 500px 269px #fff, 317px 1205px #fff, 49px 905px #fff,
    1897px 1698px #fff, 1937px 84px #fff, 1831px 1273px #fff, 1244px 1355px #fff,
    731px 737px #fff, 1536px 802px #fff, 628px 394px #fff, 1582px 1266px #fff,
    1583px 668px #fff, 1548px 1611px #fff, 303px 945px #fff, 1749px 980px #fff,
    909px 732px #fff, 645px 808px #fff, 56px 1087px #fff, 1320px 1359px #fff,
    1053px 473px #fff, 1783px 834px #fff, 137px 1176px #fff, 786px 1701px #fff,
    656px 906px #fff, 620px 793px #fff, 1471px 423px #fff, 1046px 108px #fff,
    1849px 1270px #fff, 1152px 1323px #fff, 323px 623px #fff, 304px 1154px #fff,
    678px 1427px #fff, 734px 955px #fff, 1717px 674px #fff, 1974px 1431px #fff,
    859px 1871px #fff, 822px 1386px #fff, 1961px 1081px #fff, 750px 1690px #fff,
    1387px 547px #fff, 776px 907px #fff, 435px 1934px #fff, 542px 321px #fff,
    320px 754px #fff, 622px 1759px #fff, 1758px 597px #fff, 742px 469px #fff,
    638px 1795px #fff, 1578px 1755px #fff, 1881px 1923px #fff, 148px 1001px #fff,
    1333px 1015px #fff, 663px 453px #fff, 166px 730px #fff, 319px 1423px #fff,
    1571px 1401px #fff, 1538px 1363px #fff, 851px 15px #fff, 1884px 590px #fff,
    1016px 778px #fff, 1993px 1060px #fff, 40px 444px #fff, 667px 639px #fff,
    1299px 1074px #fff, 547px 923px #fff, 93px 1476px #fff, 1411px 1712px #fff,
    535px 1825px #fff;
  animation: animStar 150s linear infinite;
}
#stars3:after {
  content: " ";
  position: absolute;
  top: 2000px;
  width: 3px;
  height: 3px;
  background: transparent;
  box-shadow: 1948px 1304px #fff, 255px 1453px #fff, 146px 1809px #fff,
    1216px 205px #fff, 1418px 1507px #fff, 206px 1111px #fff, 734px 1490px #fff,
    1985px 1787px #fff, 188px 1154px #fff, 1447px 113px #fff, 1484px 1176px #fff,
    1495px 1763px #fff, 1597px 453px #fff, 1840px 1052px #fff, 655px 1587px #fff,
    1171px 1430px #fff, 1106px 410px #fff, 97px 1054px #fff, 714px 1158px #fff,
    1877px 1980px #fff, 181px 105px #fff, 1387px 1624px #fff, 485px 1406px #fff,
    1770px 1868px #fff, 1403px 770px #fff, 204px 1690px #fff, 300px 406px #fff,
    103px 364px #fff, 1376px 774px #fff, 1885px 753px #fff, 162px 822px #fff,
    1944px 1848px #fff, 500px 269px #fff, 317px 1205px #fff, 49px 905px #fff,
    1897px 1698px #fff, 1937px 84px #fff, 1831px 1273px #fff, 1244px 1355px #fff,
    731px 737px #fff, 1536px 802px #fff, 628px 394px #fff, 1582px 1266px #fff,
    1583px 668px #fff, 1548px 1611px #fff, 303px 945px #fff, 1749px 980px #fff,
    909px 732px #fff, 645px 808px #fff, 56px 1087px #fff, 1320px 1359px #fff,
    1053px 473px #fff, 1783px 834px #fff, 137px 1176px #fff, 786px 1701px #fff,
    656px 906px #fff, 620px 793px #fff, 1471px 423px #fff, 1046px 108px #fff,
    1849px 1270px #fff, 1152px 1323px #fff, 323px 623px #fff, 304px 1154px #fff,
    678px 1427px #fff, 734px 955px #fff, 1717px 674px #fff, 1974px 1431px #fff,
    859px 1871px #fff, 822px 1386px #fff, 1961px 1081px #fff, 750px 1690px #fff,
    1387px 547px #fff, 776px 907px #fff, 435px 1934px #fff, 542px 321px #fff,
    320px 754px #fff, 622px 1759px #fff, 1758px 597px #fff, 742px 469px #fff,
    638px 1795px #fff, 1578px 1755px #fff, 1881px 1923px #fff, 148px 1001px #fff,
    1333px 1015px #fff, 663px 453px #fff, 166px 730px #fff, 319px 1423px #fff,
    1571px 1401px #fff, 1538px 1363px #fff, 851px 15px #fff, 1884px 590px #fff,
    1016px 778px #fff, 1993px 1060px #fff, 40px 444px #fff, 667px 639px #fff,
    1299px 1074px #fff, 547px 923px #fff, 93px 1476px #fff, 1411px 1712px #fff,
    535px 1825px #fff;
}

#title {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  color: #fff;
  text-align: center;
  font-family: "lato", sans-serif;
  font-weight: 300;
  font-size: 50px;
  letter-spacing: 10px;
  margin-top: -60px;
  padding-left: 10px;
}
#title span {
  background: -webkit-linear-gradient(white, #38495a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

@keyframes animStar {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-2000px);
  }
}
</style>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    bankArray: [],
    step: 1,
    inputPincode: "",
    inputConfirmPincode: "",
    formError: [],
    inputBankAccountNumber: null,
    inputPhoneNumber: "",
    statusOtp: false,
    coutDownOtp: 0,
  }),

  computed: {
    ...mapGetters(["getThemeObject", "getSettingObject"]),
  },
  mounted: function () {
    this.getBank();
    if (this.$auth.user.lname != "Not verified") {
      this.$toast.global.success({ message: "You verified finish" });
      setTimeout(() => {
        this.$router.push({ name: "dashboard-withdraw" });
      }, 800);
    }
  },
  methods: {
    getBank() {
      this.$axios
        .request({
          method: "GET",
          url: "/api/type-bank",
        })
        .then((response) => response.data)
        .then((Response) => {
          this.bankArray = Response.data;
        })
        .catch((error) => {
          return false;
        });
    },
    // getOtp :async function(){
    //   this.countDownOtp();
    //   const {data , success} = await this.$axios.$post('/api/send-otp', { tel: this.inputPhoneNumber });
    //   if(success){
    //      this.$toast.global.success({message :'ส่ง OTP ไปแล้ว กรุณารอซักครู่'});
    //   }else{
    //      this.$toast.global.error({message :data});
    //   };
    //   this.statusOtp = true;
    // },
    copyAffiliate: function (target) {
      this.$refs[target].select();
      document.execCommand("copy");
      this.$toast.global.success({ message: "คัดลอกลงคลิปบอร์ดแล้ว" });
    },
    checkFromRegister: async function () {
      const { success, data } = await this.$axios.$post(
        "/api/check-from-regis",
        {
          fname: this.$refs.inputFirstName.value,
          lname: this.$refs.inputLastName.value,
          type_bank_id: this.$refs.selecBankAccount.value,
          bank_account: this.inputBankAccountNumber,
          // tel: this.inputPhoneNumber
        }
      );
      return { success, data };
    },
    sendRegister: async function () {
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
        const chkregister = await this.$axios.$post("/api/line/line-register", {
          fname: this.$refs.inputFirstName.value,
          lname: this.$refs.inputLastName.value,
          type_bank_id: this.$refs.selecBankAccount.value,
          bank_account: this.inputBankAccountNumber,
          tel: this.$auth.user.tel,
          id: this.$auth.user.account_api,
          account_api: this.$auth.user.account_api,
          age: this.$refs.selectAge.value,
          acquaint: this.$refs.selectWay.value,
          gender: this.$refs.selectSexMan.checked ? "1" : "2",
        });

        if (chkregister.success) {
          this.$toast.global.success({ message: "ยืนยันข้อมูลเรียบร้อย" });
          return (this.step = 2);
        } else {
          this.$toast.global.error({ message: chkregister.data[0].error });
          return (this.step = 1);
        }
        this.formError.push({
          ref: "inputBankAccountNumber",
          message: "ห้ามว่าง! ",
        });
      }
    },

    countDownOtp: function () {
      this.coutDownOtp = 60;
      var downloadTimer = setInterval(() => {
        this.coutDownOtp -= 1;
        if (this.coutDownOtp <= 0) {
          clearInterval(downloadTimer);
        }
      }, 1000);
    },
    // calculateAge : function(birthday){
    //   var str = this.$refs.inputBirthday.value.split("/");
    //   var date = new Date(str[2]+'-'+str[1]+'-' + str[0]);
    //   return  (str[2]-543) +'-'+str[1]+'-' + str[0];
    // },
    formValidation: function (ref, isArray = false) {
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

    nextStepPhoneNumber: async function () {
      var letters = /^[ก-๙]+$/gi;
      if (
        (!this.$refs.inputFirstName.value ||
          !/^[ก-๙]+$/gi.test(this.$refs.inputFirstName.value)) &&
        !this.isFormValidation("inputFirstName")
      )
        this.formError.push({
          step: 2,
          ref: "inputFirstName",
          message: "ห้ามว่าง! และเป็นภาษาไทยทั้งหมด",
        });
      if (
        (!this.$refs.inputLastName.value ||
          !/^[ก-๙]+$/gi.test(this.$refs.inputLastName.value)) &&
        !this.isFormValidation("inputLastName")
      )
        this.formError.push({
          step: 2,
          ref: "inputLastName",
          message: "ห้ามว่าง! และเป็นภาษาไทยทั้งหมด",
        });

      if (
        !this.$refs.selecBankAccount.value &&
        !this.isFormValidation("selecBankAccount")
      )
        this.formError.push({
          step: 3,
          ref: "selecBankAccount",
          message: "กรุณาเลือกบัญชีธนาคารของท่าน",
        });
      if (!this.isFormValidation("inputBankAccountNumber")) {
        if (!this.inputBankAccountNumber) {
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
          this.formError[indexFormError].message.push("ห้ามว่าง!");
        }

        if (
          !this.inputBankAccountNumber ||
          !this.inputBankAccountNumber.match(/^[0-9]+$/)
        ) {
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
            "เลขบัญชีธนาคารต้องเป็นตัวเลขเท่านั้น"
          );
        }
      }
      // if(!this.isFormValidation('inputPhoneNumber')){
      //   if(!this.inputPhoneNumber){
      //     var indexFormError =  this.formError.findIndex(item => item.ref == 'inputPhoneNumber');
      //     indexFormError = indexFormError < 0 ? (await this.formError.push({step : 4,ref : "inputPhoneNumber",message : []})) - 1 : indexFormError;
      //     this.formError[indexFormError].message.push('ห้ามว่าง!')
      //   }
      //   if(!this.inputPhoneNumber || this.inputPhoneNumber.length != 10){
      //     var indexFormError =  this.formError.findIndex(item => item.ref == 'inputPhoneNumber');
      //     indexFormError = indexFormError < 0 ? (await this.formError.push({step : 4,ref : "inputPhoneNumber",message : []})) - 1 : indexFormError;
      //     this.formError[indexFormError].message.push('เบอร์โทรเท่ากับ 10 ตัวอักษร')
      //   }
      //   if(!this.inputPhoneNumber || !this.inputPhoneNumber.match(/^[0-9]+$/)){
      //     var indexFormError =  this.formError.findIndex(item => item.ref == 'inputPhoneNumber');
      //     indexFormError = indexFormError < 0 ? (await this.formError.push({step : 4,ref : "inputPhoneNumber",message : []})) - 1 : indexFormError;
      //     this.formError[indexFormError].message.push('เบอร์โทรต้องเป็นตัวเลขเท่านั้น')
      //   }
      // }

      // const formErrorStep = await  this.formError.find(item => item.step == 2 && item.ref != 'inputOtpNumber');

      // if(!formErrorStep){
      //   this.$refs.inputOtpNumber.focus();
      //   if(this.statusOtp){
      //        if(!this.$refs.inputOtpNumber.value && !this.isFormValidation('inputOtpNumber'))  return this.formError.push({step : 4,ref : "inputOtpNumber" , message : "กรุณาใส่กรอก OTP ที่ได้รับให้ถูกต้อง"});
      //        const checkOtp =  await this.$axios.$post('/api/check-otp', { tel: this.$refs.inputPhoneNumber.value , otp: this.$refs.inputOtpNumber.value });
      //        if(checkOtp.success){
      //           this.step++;
      //        }else{
      //           this.$toast.global.error({message : 'กรุณากรอก OTP ให้ถูกต้อง'});
      //        }
      //   }else{
      //        this.$root.$emit('bv::toggle::collapse', 'collapse-otp');
      //        this.getOtp();
      //        if(!this.$refs.inputOtpNumber.value && !this.isFormValidation('inputOtpNumber'))  return this.formError.push({step : 4,ref : "inputOtpNumber" , message : "กรุณาใส่กรอก OTP ที่ได้รับให้ถูกต้อง"});

      //   }
      // }
    },

    duplicateline: async function () {
      const checkDuplicate = await this.$axios.$post(
        "/api/line/duplicate-line",
        {
          tel: this.$refs.inputPhoneNumber.value,
          account_api: this.$auth.user.account_api,
        }
      );

      if (checkDuplicate.success) {
        // this.$toast.global.success({message : checkDuplicate.msg});
        // console.log(checkDuplicate.username);
        const loader = this.$loading.show({
          container: this.$refs.formInfoUser,
        });
        await this.$auth
          .loginWith("local", {
            data: {
              username: checkDuplicate.username,
              password: checkDuplicate.password,
            },
          })
          .then(() => {
            window.location = "dashboard/withdraw";
            loader.hide();
            this.$toast.global.success({ message: checkDuplicate.msg });
          })
          .catch(() => {
            this.password = "";
            this.$toast.global.error({
              message: "ยืนยันไม่สำเร็จ กรุณาตรวจลองใหม่",
            });
            loader.hide();
          });
      }
    },
    nextStepLogin: async function () {
      window.location = "dashboard/withdraw";
      // await this.$auth.loginWith("local", {
      //     data: {
      //       username: this.inputPhoneNumber,
      //       password: this.$auth.user.pincode
      //     }
      //   })
      //   .then(() => {
      //      this.$toast.global.success({message :'เข้าสู่ระบบเรียบร้อยแล้ว'});
      //      loader.hide();
      //   })
      //   .catch(() => {
      //      this.password = "";
      //      this.$toast.global.error({message :'เข้าสู่ระบบไม่สำเร็จ กรุณาตรวจสอบข้อมูล'});
      //      loader.hide();
      //   });
    },
  },
};
</script>
