<script setup lang="ts">
import {
  NMessageProvider,
  NCard,
  NSpace,
  NTabs,
  NTabPane,
  NModal,
  NScrollbar,
} from 'naive-ui';
import RegisterStudentInfo from '/src/components/user/RegisterStudentInfo.vue';
import RegisterTeacherInfo from '/src/components/user/RegisterTeacherInfo.vue';

import { ref } from 'vue';

const showModal = ref(false);
const timeout = ref(10);

const countdown = () => {
  if (timeout.value <= 0) {
    // showModal.value = false
  } else {
    timeout.value -= 1;
    setTimeout(countdown, 1000);
  }
};

showModal.value = true;
timeout.value = 10;
countdown();

function onPositiveClick() {
  if (timeout.value <= 0) {
    showModal.value = false;
  }
}
</script>

<template>
  <n-message-provider>
    <n-modal
      :show="showModal"
      :mask-closable="false"
      :closable="false"
      preset="dialog"
      title="报名须知"
      :positive-text="timeout > 0 ? timeout + 's 后确认' : '确认'"
      @positive-click="onPositiveClick"
    >
      <n-card
        style="width: 100%; height: 50vh; overflow: scroll"
        size="small"
        :bordered="false"
      >
        <n-space justify="center" style="font-size: large; font-weight: bold"
          >活动要求</n-space
        >
        <n-space>
          <div>
            毅行活动是一项中高强度长距离的徒步活动，对参赛者身体状况有较高的要求，参赛者应身体健康。
          </div>
          <div>有下述情况之一的不适宜参加毅行活动：</div>
          <div>1.先天性心脏病和风湿性心脏病患者；</div>
          <div>2.高血压和心脑血管疾病患者；</div>
          <div>3.心肌炎和其他心脏病患者；</div>
          <div>4.冠状动脉病患者和严重心律不齐者；</div>
          <div>5.血糖过高或过少的糖尿病患者；</div>
          <div>6.其它不适合运动的疾病患者。</div>
        </n-space>

        <br />
        <n-space justify="center" style="font-size: large; font-weight: bold"
          >出发&行进&打卡须知</n-space
        >
        <n-space>
          <div>
            1.毅行是一个团队协作的活动，请和队员以及其他团队之间互帮互助，团结合作，勿要走散；
          </div>
          <div>
            2.队伍全部人员到齐之后才可以在打卡点打卡；各打卡点必须逐一盖章，不得跳盖；
          </div>
          <div>
            3.每个打卡点都有关门时间，到达关门时间后不得前进，需从打卡点处的下撤点直接下山；
          </div>
          <div>4.不在规定出发时间出发的团队不提供打卡单；</div>
          <div>5.请妥善保存打卡单，最终结果以打卡单为准；</div>
          <div>6.路线行至陡坡需有序通过；</div>
          <div>7.毅行的过程当中，请不要在一个地点逗留太久，以免造成堵塞；</div>
          <div>
            8.若存在小组成员退出，仅该小组其他成员完成全程，则该小组无法领取团体证书；
          </div>
          <div>
            9.毅行途中请尽量避免与他人发生冲突，毅行不易，且行且珍惜。必要时请联系工作人员解决。
          </div>
        </n-space>

        <br />
        <n-space justify="center" style="font-size: large; font-weight: bold"
          >安全须知</n-space
        >
        <n-space>
          <div>
            1.身体不适者请及时在指定位置下撤终止毅行或就近选择安全地点等待工作人员救助；
          </div>
          <div>
            2.如果队伍中有人受伤需要立即联系身边最近的工作人员，原地等待医务人员救治，不要随意移动以免二次受伤；
          </div>
          <div>3.禁止吸烟、明火，以防山火；</div>
          <div>
            4.本次活动可能包括但不限于交通事故、摔伤、坠崖、溺水、低温、生物攻击等导致的伤害或者死亡的风险，请自行评估后再作是否参与本次活动的决定；
          </div>
          <div>
            5.全程较长，请合理估计自己的身体状况，合理选择全程线或半程线路，如果发生体力不支等意外情况请及时联系工作人员下山，切勿逞能，以防发生危险。
          </div>
        </n-space>

        <br />
        <n-space justify="center" style="font-size: large; font-weight: bold"
          >免责声明</n-space
        >
        <n-space>
          <div>
            1.本活动是非商业性的长距离徒步自发群体活动，有一定的风险，参加者应根据自身的状况做出是否参加活动的决定，并应对自己的安全负完全责任。未成年人必须经监护人同意并由其监护人陪同参加；
          </div>
          <div>
            2.活动参与者保证已熟知并同意本次活动的所有行程与活动安排，充分了解毅行活动的潜在风险，愿意独立承担本次活动中可能发生的人身或财产损害；
          </div>
          <div>
            3.活动参与者在活动过程中将根据自身身体状况，独立判断行动风险以保障自身人身和财产安全，不受任何活动参加者及其他成员的影响，并有权随时中途退出活动；
          </div>
          <div>
            4.参加活动往返交通途中和活动中如果发生意外事故，组织者会尽能力范围内组织救援，但对于事故造成的身体损害，乃至不可逆转的永久性身体损伤、后遗症等，以及事件伴随的经济损失，活动组织者不承担任何法律和经济责任；
          </div>
          <div>
            5.一旦报名，即视为参加者（包括代他人报名者，被代报名参加者）已经充分了解并自愿接受本免责条款，本免责条款自动生效。否则，请终止报名参加，已报名的参加者请在活动开始前退出本次活动；
          </div>
          <div>
            6.请按规定路线前进，否则出现问题精弘网络概不负责；凡报名参加者均视为具有完全民事行为能力人，如在活动中发生人身损害后果，赔偿责任领队或召集人不承担，由受损害人依据法律规定和本领队或召集人声明依法解决，凡报名者均视为接受本领队或召集人声明；
          </div>
          <div>7.本条款同样适用于活动各环节工作人员及志愿者。</div>
        </n-space>
      </n-card>
    </n-modal>

    <n-card title="报名信息 &nbsp; 💻" style="margin: 4% auto; width: 93%">
      <n-tabs default-value="student">
        <n-tab-pane name="student" tab="学生报名">
          <register-student-info></register-student-info>
        </n-tab-pane>

        <n-tab-pane name="teacher" tab="教职工报名">
          <register-teacher-info></register-teacher-info>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </n-message-provider>
</template>

<style></style>
