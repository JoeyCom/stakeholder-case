<template>
  <div class="pg_case">
    <van-nav-bar
      title="进展详情"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    <van-steps direction="vertical" :active="step">
      <van-step>
        <h3 v-if="step1">提交资料 {{ '【'+step1+'】' }} </h3>
        <h3 v-else>提交资料</h3>
        <p>{{ list.proofInfo.commitTime }}</p>
      </van-step>
      <van-step>
        <h3 v-if="step2">审核资料 {{ '【'+step2+'】' }} </h3>
        <h3 v-else>审核资料</h3>
         <p>{{ list.proofInfo.reviewTime }}</p>
      </van-step>
      <van-step>
        <h3 v-if="step3">权益确认 {{ '【'+step3+'】' }} </h3>
        <h3 v-else>权益确认</h3>
        <p>{{ list.proofInfo.confirmTime }}</p>
      </van-step>
      <van-step>
        <h3 v-if="step4">资金发放 {{ '【'+step4+'】' }} </h3>
        <h3 v-else>资金发放</h3>
        <p>{{ list.finishTime }}</p>
      </van-step>
    </van-steps>
  </div>
</template>

<script>
import { Toast, Dialog } from "vant";
export default {
  data() {
    return {
      list: {},
      loading: false,
      step: 0,
      step1: '',
      step2: '',
      step3: '',
      step4: '',
    };
  },
  created() {
    // 判断角色权限
    if (this.$store.state.user.power) {
      this.power = this.$store.state.user.power;
    }

    let progress_data = JSON.parse(
      sessionStorage.getItem("progress_data")
    );
    this.list = progress_data;
    let proofInfo = this.list.proofInfo

    console.log(this.list)

    if(proofInfo.agencyState === 0 && this.list.state == 3) {
      this.step = 0
      this.step1 = "退回"
    }

    if(proofInfo.agencyState === 1 && this.list.state == 3) {
      this.step = 0
      this.step1 = "待提交"
    }

    if(proofInfo.agencyState === 2 && this.list.state == 3) {
      this.step = 1
      this.step2 = "审核中"
    }

    if(proofInfo.agencyState === 3 && this.list.state == 3) {
      this.step = 1
      this.step2 = "审核中"
    }

    if(proofInfo.agencyState === 4) {
      this.step2 = "审核通过"
    }

    if(proofInfo.confirm === 0 && proofInfo.agencyState === 4) {
       this.step = 2
      this.step3 = "未确认"
    }

    if(proofInfo.confirm === 1 && proofInfo.agencyState === 4) {
       this.step = 2
      this.step3 = "已确认"
    }

    if(proofInfo.confirm === 1 && proofInfo.agencyState === 4 && this.list.state == 4) {
       this.step = 3
      this.step4 = "资金发放中"
    }

    if(proofInfo.confirm === 1 && proofInfo.agencyState === 4 && this.list.state == 6) {
       this.step = 3
      this.step4 = "资金发放中"
    }

    if(proofInfo.confirm === 1 && proofInfo.agencyState === 4 && this.list.state == 7) {
       this.step = 3
      this.step4 = "资金发放中"
    }

    if(proofInfo.confirm === 1 && proofInfo.agencyState === 4 && this.list.state == 8) {
       this.step = 3
      this.step4 = "资金发放中"
    }

    if(proofInfo.confirm === 1 && proofInfo.agencyState === 4 && this.list.state == 9) {
       this.step = 3
      this.step4 = "已完成"
    }
  },
  components: {},
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    }
  }
};
</script>

<style lang="less">
.pg_case {
}
</style>
