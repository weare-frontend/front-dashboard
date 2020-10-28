<template>
        <div class="container" style="max-width: 540px; padding-top:80px;">
            <h6 class="subtitle">แจกรางวัล</h6>
            
            <nav class="nav nav-pills nav-fill" role="tablist">
            <a class="nav-item nav-link active rounded-0" id="nav-top-deposit-tab" data-toggle="tab" href="#nav-top-deposit" role="tab" aria-controls="nav-home" aria-selected="true">ยอดเติมมากที่สุด</a>
            <a class="nav-item nav-link rounded-0" id="nav-top-lose-tab" data-toggle="tab" href="#nav-top-lose" role="tab" aria-controls="nav-profile" aria-selected="false">ยอดเสียมากที่สุด </a>
            <a class="nav-item nav-link rounded-0" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">ผู้โชคดี</a>
            </nav>

            <div class="tab-content" >
              <div class="tab-item fade show active" id="nav-top-deposit" role="tabpanel" aria-labelledby="nav-home-tab">
                  <div class="container">
                    <div class="row">
                      <div class="col-12 px-0">
                        <ul class="list-group list-group-flush border-top border-bottom">
                          <li class="list-group-item" v-for="(item, index) in topDepositArray" :key="index">
                            <div class="row align-items-center">
                              <div class="col-auto pr-0">
                                <div class="avatar avatar-50 no-shadow border-0 align-items-center d-flex">
                                  <h5 class="flex-1">
                                    <i class="material-icons text-info">{{ shortRankingIcon(index+1) }}</i>
                                    <span v-if="!shortRankingIcon(index+1)">{{index+1}}</span>
                                  </h5>
                                </div>
                              </div>
                              <div class="col align-self-center pr-0">
                                <h6 class="font-weight-normal mb-1 text-template">{{item.person_id}}</h6>
                                <p class="text-mute small text-secondary">สำหรับยอดเติมมากที่สุด</p>
                              </div>
                              <div class="col-auto">
                                <h6 class="text-success">{{item.credit}}</h6>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="tab-item fade" id="nav-top-lose" role="tabpanel" aria-labelledby="nav-profile-tab">
                  <div class="container">
                    <div class="row">
                      <div class="col-12 px-0">
                        <ul class="list-group list-group-flush border-top border-bottom">
                          <li class="list-group-item" v-for="(item, index) in topLoseArray" :key="index">
                            <div class="row align-items-center">
                              <div class="col-auto pr-0">
                                <div class="avatar avatar-50 no-shadow border-0 align-items-center d-flex">
                                  <h5 class="flex-1">
                                    <i class="material-icons text-info">{{ shortRankingIcon(index+1) }}</i>
                                    <span v-if="!shortRankingIcon(index+1)">{{index+1}}</span>
                                  </h5>
                                </div>
                              </div>
                              <div class="col align-self-center pr-0">
                                <h6 class="font-weight-normal mb-1 text-template">{{item.person_id}}</h6>
                                <p class="text-mute small text-secondary">สำหรับยอดเติมมากที่สุด</p>
                              </div>
                              <div class="col-auto">
                                <h6 class="text-success">{{item.credit}}</h6>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
              </div>
              <div class="tab-item fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                  <div class="container">
                    <div class="row">
                      <div class="col-12 px-0">
                        <ul class="list-group list-group-flush border-top border-bottom">
                          <li class="list-group-item" v-for="(item, index) in luckyPlayerArray" :key="index">
                            <div class="row align-items-center">
                              <div class="col-auto pr-0">
                                <div class="avatar avatar-50 no-shadow border-0 align-items-center d-flex">
                                  <h5 class="flex-1">
                                    <i class="material-icons text-info">{{ shortRankingIcon(index+1) }}</i>
                                    <span v-if="!shortRankingIcon(index+1)">{{index+1}}</span>
                                  </h5>
                                </div>
                              </div>
                              <div class="col align-self-center pr-0">
                                <h6 class="font-weight-normal mb-1 text-template">{{item.person_id}}</h6>
                                <p class="text-mute small text-secondary">สำหรับผู้โชคดี</p>
                              </div>
                              <div class="col-auto">
                                <h6 class="text-success">{{item.credit}}</h6>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
        </div>
</template>

<style  scoped>
.flex-1{
    flex: 1;
}
.tab-content>.tab-item {
    display: none;
}
.tab-content>.tab-item {
    display: none;
}

.tab-content>.active {
    display: block;
}
</style>

<script>
export default {
    head() {
      return {
        title: 'Activities',
      }
    },
    asyncData : function({$axios}){
        var topDeposit  = {"success":true,"code":"1","data":[{"id":"1","person_id":"02592686544","credit":"iPhone 11 (128GB)","created_at":"2018-08-24 18:58:51","updated_at":"2019-12-31 23:45:32"},{"id":"2","person_id":"02576851304","credit":"ทอง 1 บาท","created_at":"2018-08-24 19:00:37","updated_at":"2019-12-31 23:45:32"},{"id":"3","person_id":"02698205520","credit":"ทอง 50 สตางค์","created_at":"2018-08-24 19:00:37","updated_at":"2019-12-31 23:45:32"},{"id":"4","person_id":"02864143758","credit":"ทอง 25 สตางค์","created_at":"2018-08-24 19:00:37","updated_at":"2019-12-31 23:45:32"},{"id":"5","person_id":"02405980998","credit":"ทอง 25 สตางค์","created_at":"2018-08-24 19:00:37","updated_at":"2019-12-31 23:45:32"},{"id":"6","person_id":"02864272855","credit":"ทอง 25 สตางค์","created_at":"2018-08-24 19:00:37","updated_at":"2019-12-31 23:45:32"},{"id":"7","person_id":"02346901118","credit":"ทอง 25 สตางค์","created_at":"2018-08-24 19:00:37","updated_at":"2019-12-31 23:45:32"},{"id":"8","person_id":"02326788802","credit":"ทอง 25 สตางค์","created_at":"2018-08-24 19:00:38","updated_at":"2019-12-31 23:45:32"},{"id":"9","person_id":"02526586054","credit":"ทอง 25 สตางค์","created_at":"2018-08-24 19:00:38","updated_at":"2019-12-31 23:45:32"},{"id":"10","person_id":"02574462717","credit":"ทอง 25 สตางค์","created_at":"2018-08-24 19:01:24","updated_at":"2019-12-31 23:45:32"},{"id":"11","person_id":"02797410150","credit":"3,000","created_at":"2018-08-24 19:01:24","updated_at":"2019-12-31 23:45:32"},{"id":"12","person_id":"02133115184","credit":"3,000","created_at":"2018-08-24 19:01:24","updated_at":"2019-12-31 23:45:32"},{"id":"13","person_id":"02679234687","credit":"3,000","created_at":"2018-08-24 19:01:24","updated_at":"2019-12-31 23:45:32"},{"id":"14","person_id":"02351138448","credit":"3,000","created_at":"2018-08-24 19:01:24","updated_at":"2019-12-31 23:45:32"},{"id":"15","person_id":"02914597331","credit":"3,000","created_at":"2018-08-24 19:01:25","updated_at":"2019-12-31 23:45:32"},{"id":"16","person_id":"02583882295","credit":"3,000","created_at":"2018-08-24 19:01:50","updated_at":"2019-12-31 23:45:32"},{"id":"17","person_id":"02720297289","credit":"3,000","created_at":"2018-08-24 19:01:50","updated_at":"2019-12-31 23:45:32"},{"id":"18","person_id":"02320679277","credit":"3,000","created_at":"2018-08-24 19:01:50","updated_at":"2019-12-31 23:45:32"},{"id":"19","person_id":"02758155546","credit":"3,000","created_at":"2018-08-24 19:01:50","updated_at":"2019-12-31 23:45:32"},{"id":"20","person_id":"02283617192","credit":"3,000","created_at":"2018-08-24 19:01:50","updated_at":"2019-12-31 23:45:32"},{"id":"21","person_id":"02344762006","credit":"2,000","created_at":"2018-08-24 19:01:50","updated_at":"2019-12-31 23:45:32"},{"id":"22","person_id":"02211841844","credit":"2,000","created_at":"2018-08-24 19:01:50","updated_at":"2019-12-31 23:45:32"},{"id":"23","person_id":"02446879935","credit":"2,000","created_at":"2018-08-24 19:01:50","updated_at":"2019-12-31 23:45:32"},{"id":"24","person_id":"02509475763","credit":"2,000","created_at":"2018-08-24 19:01:51","updated_at":"2019-12-31 23:45:32"},{"id":"25","person_id":"02208337239","credit":"2,000","created_at":"2018-08-24 19:01:51","updated_at":"2019-12-31 23:45:32"},{"id":"26","person_id":"02321391576","credit":"2,000","created_at":"2018-08-24 19:01:51","updated_at":"2019-12-31 23:45:32"},{"id":"27","person_id":"02164024372","credit":"2,000","created_at":"2018-08-24 19:01:51","updated_at":"2019-12-31 23:45:33"},{"id":"28","person_id":"02737667746","credit":"2,000","created_at":"2018-08-24 19:01:51","updated_at":"2019-12-31 23:45:33"},{"id":"29","person_id":"02138425799","credit":"2,000","created_at":"2018-08-24 19:01:51","updated_at":"2019-12-31 23:45:33"},{"id":"30","person_id":"02763294398","credit":"2,000","created_at":"2018-08-24 19:01:51","updated_at":"2019-12-31 23:45:33"},{"id":"31","person_id":"02622747700","credit":"2,000","created_at":"2018-08-24 19:01:51","updated_at":"2019-12-31 23:45:33"},{"id":"32","person_id":"02861665044","credit":"1,000","created_at":"2018-08-24 19:01:51","updated_at":"2019-12-31 23:45:33"},{"id":"33","person_id":"02611391724","credit":"1,000","created_at":"2018-08-24 19:01:51","updated_at":"2019-12-31 23:45:33"},{"id":"34","person_id":"02957535979","credit":"1,000","created_at":"2018-08-24 19:01:51","updated_at":"2019-12-31 23:45:33"},{"id":"35","person_id":"02751303471","credit":"1,000","created_at":"2018-08-24 19:01:51","updated_at":"2019-12-31 23:45:33"},{"id":"36","person_id":"02928144483","credit":"1,000","created_at":"2018-08-24 19:01:51","updated_at":"2019-12-31 23:45:33"},{"id":"37","person_id":"02296498323","credit":"1,000","created_at":"2018-08-24 19:01:51","updated_at":"2019-12-31 23:45:33"},{"id":"38","person_id":"02096585150","credit":"1,000","created_at":"2018-08-24 19:01:51","updated_at":"2019-12-31 23:45:33"},{"id":"39","person_id":"02435870519","credit":"1,000","created_at":"2018-08-24 19:01:51","updated_at":"2019-12-31 23:45:33"},{"id":"40","person_id":"02940264869","credit":"1,000","created_at":"2018-08-24 19:01:51","updated_at":"2019-12-31 23:45:33"},{"id":"41","person_id":"02054669203","credit":"1,000","created_at":"2018-08-24 19:01:51","updated_at":"2019-12-31 23:45:33"},{"id":"42","person_id":"02242197193","credit":"1,000","created_at":"2018-08-24 19:01:51","updated_at":"2019-12-31 23:45:33"},{"id":"43","person_id":"02684856980","credit":"1,000","created_at":"2018-08-24 19:01:51","updated_at":"2019-12-31 23:45:33"},{"id":"44","person_id":"02724730352","credit":"1,000","created_at":"2018-08-24 19:01:51","updated_at":"2019-12-31 23:45:33"},{"id":"45","person_id":"02512452782","credit":"1,000","created_at":"2018-08-24 19:01:51","updated_at":"2019-12-31 23:45:33"},{"id":"46","person_id":"02596020357","credit":"1,000","created_at":"2018-08-24 19:02:08","updated_at":"2019-12-31 23:45:33"},{"id":"47","person_id":"02531194041","credit":"1,000","created_at":"2018-08-24 19:02:08","updated_at":"2019-12-31 23:45:33"},{"id":"48","person_id":"02997759066","credit":"1,000","created_at":"2018-08-24 19:02:08","updated_at":"2019-12-31 23:45:33"},{"id":"49","person_id":"02532071694","credit":"1,000","created_at":"2018-08-24 19:02:08","updated_at":"2019-12-31 23:45:33"},{"id":"50","person_id":"02728646815","credit":"1,000","created_at":"2018-08-24 19:02:08","updated_at":"2019-12-31 23:45:33"}]}
        var topLose = {"success":true,"code":"1","data":[{"id":"1","person_id":"02863791753","credit":"iPhone 11 (128GB)","created_at":"2018-08-23 05:36:25","updated_at":"2019-12-31 23:43:25"},{"id":"2","person_id":"02861276945","credit":"ทอง 1 บาท","created_at":"2018-08-23 06:18:09","updated_at":"2019-12-31 23:43:25"},{"id":"3","person_id":"02203790462","credit":"ทอง 50 สตางค์","created_at":"2018-08-23 06:18:09","updated_at":"2019-12-31 23:43:25"},{"id":"4","person_id":"02953481851","credit":"ทอง 25 สตางค์","created_at":"2018-08-23 06:18:09","updated_at":"2019-12-31 23:43:25"},{"id":"5","person_id":"02720121404","credit":"ทอง 25 สตางค์","created_at":"2018-08-23 06:18:09","updated_at":"2019-12-31 23:43:25"},{"id":"6","person_id":"02201331188","credit":"ทอง 25 สตางค์","created_at":"2018-08-23 06:18:09","updated_at":"2019-12-31 23:43:25"},{"id":"7","person_id":"02389899672","credit":"ทอง 25 สตางค์","created_at":"2018-08-23 06:18:10","updated_at":"2019-12-31 23:43:25"},{"id":"8","person_id":"02060950082","credit":"ทอง 25 สตางค์","created_at":"2018-08-23 06:18:10","updated_at":"2019-12-31 23:43:25"},{"id":"9","person_id":"02985111854","credit":"ทอง 25 สตางค์","created_at":"2018-08-23 06:18:10","updated_at":"2019-12-31 23:43:25"},{"id":"10","person_id":"02221378934","credit":"ทอง 25 สตางค์","created_at":"2018-08-23 06:18:10","updated_at":"2019-12-31 23:43:25"}]}
        var luckyPlayer = {"success":true,"code":"1","data":[{"id":"1","person_id":"02230421835","credit":"1000","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"2","person_id":"02968557690","credit":"1000","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"3","person_id":"02363062787","credit":"1000","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"4","person_id":"02786430230","credit":"1000","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"5","person_id":"02265818865","credit":"1000","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"6","person_id":"02290801137","credit":"500","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"7","person_id":"02233954280","credit":"500","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"8","person_id":"02139153680","credit":"500","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"9","person_id":"02477556843","credit":"500","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"10","person_id":"02988278635","credit":"500","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"11","person_id":"02710115889","credit":"300","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"12","person_id":"02174088520","credit":"300","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"13","person_id":"02372685796","credit":"300","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"14","person_id":"02786753961","credit":"300","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"15","person_id":"02668038375","credit":"300","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"16","person_id":"02792640537","credit":"300","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"17","person_id":"02655019601","credit":"300","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"18","person_id":"02764933244","credit":"300","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"19","person_id":"02339126106","credit":"300","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"20","person_id":"02218779844","credit":"300","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"21","person_id":"02192556503","credit":"300","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"22","person_id":"02403578113","credit":"300","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"23","person_id":"02350217322","credit":"300","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"24","person_id":"02817988216","credit":"300","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"25","person_id":"02636851332","credit":"300","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"26","person_id":"02496597248","credit":"300","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"27","person_id":"02177797533","credit":"300","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"28","person_id":"02193393480","credit":"300","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"29","person_id":"02268121912","credit":"300","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"30","person_id":"02440324422","credit":"300","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"31","person_id":"02809260886","credit":"300","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"32","person_id":"02363524597","credit":"300","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"33","person_id":"02300342619","credit":"300","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"34","person_id":"02620183710","credit":"300","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"35","person_id":"02714079079","credit":"300","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"36","person_id":"02915660211","credit":"300","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"37","person_id":"02894286553","credit":"300","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"38","person_id":"02633906049","credit":"300","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"39","person_id":"02974709798","credit":"300","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"40","person_id":"02957983430","credit":"300","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"41","person_id":"02871776483","credit":"300","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"42","person_id":"02133863673","credit":"300","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"43","person_id":"02840861779","credit":"300","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"44","person_id":"02397431601","credit":"300","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"45","person_id":"02611455986","credit":"300","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"46","person_id":"02323046068","credit":"300","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"47","person_id":"02444239224","credit":"300","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"48","person_id":"02732942713","credit":"300","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"49","person_id":"02205457598","credit":"300","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"},{"id":"50","person_id":"02815546826","credit":"300","created_at":"2020-01-26 12:00:15","updated_at":"2020-01-26 12:00:15"}]}
       // const  topDeposit = $axios.$get('/api/top-deposit');
        // const  topLose = $axios.$get('/api/top-lose');
        // const  luckyPlayer = $axios.$get('/api/lucky-player');
        return { topDepositArray : topDeposit.data , topLoseArray : topLose.data , luckyPlayerArray : luckyPlayer.data }
    },
    methods: {
        shortRankingIcon : function(rank) {
            switch (rank) {
                case 1:
                    return 'looks_one';
                    break;
                case 2:
                    return 'looks_two';
                    break;
                case 3:
                    return 'looks_3';
                    break;
                case 4:
                    return 'looks_4';
                    break;
                case 5:
                    return 'looks_5';
                    break;
            
                default:
                    return '';
                    break;
            }
        }
    },
}
</script>   