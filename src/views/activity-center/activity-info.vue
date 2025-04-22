<template>
  <div>
    <el-form :model="form" label-width="100px" class="form">
      <!-- 基础配置 -->
      <div class="section">
        <h3>基础配置</h3>
        <el-form-item label="活动id">
          <el-input
            v-model="form.id"
            :disabled="isViewOperation() || isEditOperation()"
          ></el-input>
        </el-form-item>
        <el-form-item label="活动名称">
          <el-input
            v-model="form.name"
            :disabled="isViewOperation()"
          ></el-input>
        </el-form-item>
        <el-form-item label="活动类型">
          <el-select
            v-model="form.activityType"
            placeholder="请选择活动类型"
            :disabled="isViewOperation()"
          >
            <el-option
              v-for="(label, value) in activityTypeEnum"
              :key="value"
              :label="label"
              :value="value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-date-picker
            v-model="form.activityTime"
            :disabled="isViewOperation()"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
      </div>

      <!-- 文案配置 -->
      <div class="section">
        <h3>文案配置</h3>
        <el-form-item label="活动规则说明">
          <el-input
            type="textarea"
            v-model="form.activityRuleDesc"
            :disabled="isViewOperation()"
          ></el-input>
        </el-form-item>
      </div>

      <!-- 存量运营活动配置 -->
      <div v-if="form.activityType == 2" class="section">
        <h3>存量运营活动配置(活动类型为存量运营活动)</h3>
        <el-form-item label="筛选方式">
          <el-radio-group
            v-model="form.features.selectionMode"
            :disabled="isViewOperation()"
          >
            <el-radio :label="1">不限人群</el-radio>
            <el-radio :label="2">限定人群</el-radio>
          </el-radio-group>
        </el-form-item>
        <div v-if="form.features.selectionMode != 1">
          <el-form-item label="目标人群">
            <el-select
              v-model="form.features.targetGroup"
              placeholder="请选择目标人群"
              :disabled="isViewOperation()"
            >
              <el-option label="注册未转化用户" value="1"></el-option>
              <el-option label="活跃用户" value="2"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>

      <!-- 获客活动配置 -->
      <div v-if="form.activityType == 1" class="section">
        <h3>获客活动配置(活动类型为获客活动)</h3>
        <el-form-item label="筛选方式">
          <el-radio-group
            v-model="form.features.selectionMode"
            :disabled="isViewOperation()"
          >
            <el-radio :label="1">不限注册方式</el-radio>
            <el-radio :label="2">限定注册方式</el-radio>
          </el-radio-group>
        </el-form-item>
        <div v-if="form.features.selectionMode != 1">
          <el-form-item label="注册方式">
            <el-select
              v-model="form.features.targetGroup"
              placeholder="请选择注册方式"
              :disabled="isViewOperation()"
            >
              <el-option label="手机号注册" value="1"></el-option>
              <el-option label="邮箱注册" value="2"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>

      <!-- 操作按钮 -->
      <el-form-item>
        <el-button type="primary" @click="onSave">保存</el-button>
        <el-button @click="onCancel">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  queryActivityInfo,
  createActivity,
  editActivity,
} from "@/api/activity-center";

export default {
  data() {
    return {
      form: {
        id: null,
        name: null,
        activityType: null,
        activityTime: [],
        activityRuleDesc: "",
        features: {
          selectionMode: 1,
          targetGroup: null,
        },
      },
      operationType: "ADD",
      activityTypeEnum: {
        1: "获客活动",
        2: "存量运营活动",
      },
    };
  },
  created() {
    this.form.id = this.$route.query.id;
    this.operationType = this.$route.query.operationType;
    console.log(this.form);
    this.initData();
  },
  methods: {
    initData() {
      if (this.operationType === "ADD") {
        return;
      }
      if (!this.form.id) {
        return;
      }

      //调用查询活动详情接口
      queryActivityInfo({ id: this.form.id }).then((response) => {
        this.form.id = response.data.id;
        this.form.name = response.data.name;
        this.form.activityType = response.data.activityType;
        this.form.activityRuleDesc = response.data.activityRuleDesc;
        this.form.features.selectionMode = response.data.features.selectionMode;
        this.form.features.targetGroup = response.data.features.targetGroup;
      });
    },
    onSave() {
      console.log("保存", this.form);
      // 这里添加保存逻辑
      const saveParams = {
        id: this.form.id,
        name: this.form.name,
        activityType: this.form.activityType,
        activityRuleDesc: this.form.activityRuleDesc,
        features: {
          selectionMode: this.form.features.selectionMode,
          targetGroup: this.form.features.targetGroup,
        },
        startTime: this.form.activityTime[0],
        endTime: this.form.activityTime[1],
      };
      console.log("saveParams: ", saveParams);
      if (this.operationType === "ADD") {
        createActivity(saveParams).then((response) => {
          this.onCancel();
        });
        return;
      }
      editActivity(saveParams).then((response) => {
        this.onCancel();
      });
    },
    onCancel() {
      console.log("返回");
      this.$router.push({
        name: "activityList",
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
.form {
  max-width: 600px;
  margin: 0 auto;
}
.section {
  margin-bottom: 20px;
}
.section h3 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}
</style>
