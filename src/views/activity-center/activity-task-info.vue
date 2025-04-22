<template>
  <div>
    <!-- 基础配置 -->
    <el-card class="box-card" header="基础配置">
      <el-form :model="baseConfig" label-width="120px">
        <el-form-item label="任务名称">
          <el-input
            v-model="baseConfig.taskName"
            :disabled="isViewOperation()"
          ></el-input>
        </el-form-item>
        <el-form-item label="关联活动">
          <el-select
            v-model="baseConfig.activityName"
            placeholder="请选择关联活动"
            :disabled="isViewOperation()"
          >
            <el-option
              v-for="activity in activities"
              :key="activity.id"
              :label="activity.name"
              :value="activity.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 奖品配置 -->
    <el-card class="box-card" header="奖品配置" style="margin-top: 20px">
      <div
        v-for="(reward, index) in rewardConfig"
        :key="index"
        class="prize-config"
      >
        <el-form :model="reward" label-width="120px">
          <el-form-item :label="'奖品 ' + (index + 1)">
            <el-select
              v-model="reward.giftId"
              placeholder="请选择奖品"
              :disabled="isViewOperation()"
            >
              <el-option
                v-for="item in giftList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发放方式">
            <el-select
              v-model="reward.sendType"
              placeholder="请选择发放方式"
              :disabled="isViewOperation()"
            >
              <el-option
                v-for="(label, value) in sendTypeEnum"
                :key="value"
                :label="label"
                :value="value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <el-button type="primary" @click="addReward" :disabled="isViewOperation()"
        >新增奖品项</el-button
      >
    </el-card>

    <!-- 规则配置 -->
    <el-card class="box-card" header="规则配置" style="margin-top: 20px">
      <div v-for="(rule, index) in ruleConfig" :key="index" class="rule-config">
        <el-form :model="rule" label-width="120px">
          <el-form-item :label="'规则 ' + (index + 1)">
            <el-select
              v-model="rule.ruleType"
              placeholder="请选择规则类型"
              :disabled="isViewOperation()"
            >
              <el-option
                v-for="(label, value) in ruleTypeEnum"
                :key="value"
                :label="label"
                :value="value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="注册时间类型" v-if="rule.ruleType == '1'">
            <el-select
              v-model="rule.ruleTimeType"
              placeholder="请选择注册时间类型"
              :disabled="isViewOperation()"
            >
              <el-option
                v-for="(label, value) in ruleTimeTypeEnum"
                :key="value"
                :label="label"
                :value="value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <el-button type="primary" @click="addRule" :disabled="isViewOperation()"
        >新增规则</el-button
      >
    </el-card>

    <!-- 操作按钮 -->
    <div class="operation-buttons" style="margin-top: 20px">
      <el-button
        type="primary"
        :disabled="isViewOperation()"
        @click="handleSave"
        >保存</el-button
      >
      <el-button @click="handleBack">返回</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      operationType: "ADD",
      id: null,
      baseConfig: {
        name: "",
        activityId: null,
      },
      rewardConfig: [
        {
          giftId: null,
          sendType: "1",
        },
      ],
      ruleConfig: [
        {
          ruleType: "1",
          ruleTimeType: "1",
        },
      ],
      giftList: [],
      activities: [],
      sendTypeEnum: {
        0: "手动领取",
        1: "自动发放",
      },
      ruleTypeEnum: {
        1: "注册规则",
      },
      ruleTimeTypeEnum: {
        1: "活动时间内",
      },
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.operationType = this.$route.query.operationType;
    this.initData();
  },
  methods: {
    initData() {
      if (this.operationType === "ADD") {
        return;
      }
      if (!this.id) {
        return;
      }
    },
    addReward() {
      this.rewardConfig.push({
        giftId: null,
        sendType: "1",
      });
    },
    addRule() {
      this.ruleConfig.push({
        ruleType: "1",
        ruleTimeType: "1",
      });
    },
    handleSave() {
      console.log("保存配置", {
        baseConfig: this.baseConfig,
        prizes: this.prizes,
        rules: this.rules,
      });
      // 实现保存功能
    },
    handleBack() {
      console.log("返回");
      // 实现返回功能
      this.$router.push({
        name: "activityTaskList",
      });
    },
    isViewOperation() {
      if (this.operationType === "VIEW") {
        return true;
      }
      return false;
    },
    isEditOperation() {
      if (this.operationType === "EDIT") {
        return true;
      }
      return false;
    },
  },
};
</script>
<style scoped>
.box-card {
  margin-bottom: 20px;
}
.prize-config,
.rule-config {
  margin-bottom: 20px;
}
.operation-buttons {
  display: flex;
  justify-content: space-between;
}
</style>
