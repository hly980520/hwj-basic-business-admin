<template>
  <div>
    <el-form :model="form" label-width="120px" class="gift-form">
      <el-form-item label="礼品名称">
        <el-input
          v-model="form.giftName"
          placeholder="请输入礼品名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="礼品类型">
        <el-select v-model="form.giftType" placeholder="请选择礼品类型">
          <el-option
            v-for="(label, value) in giftTypeEnum"
            :key="value"
            :label="label"
            :value="value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发放数量">
        <el-input-number
          v-model="form.quantity"
          :min="1"
          placeholder="请输入发放数量"
        ></el-input-number>
      </el-form-item>

      <!-- 操作按钮 -->
      <el-form-item>
        <el-button type="primary" @click="onSave">保存</el-button>
        <el-button @click="onCancel">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { queryGiftInfo, editGift, createGift } from "@/api/gift-center";

export default {
  data() {
    return {
      id: null,
      operationType: "ADD",
      form: {
        giftName: "",
        giftType: "",
        quantity: null,
      },
      giftTypeEnum: {
        1: "积分",
        2: "抽奖机会",
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

      //调用查询礼品详情接口
      queryGiftInfo({ id: this.id }).then((response) => {
        this.id = response.data.id;
        this.form.giftName = response.data.giftName;
        this.form.giftType = response.data.giftType;
        this.form.quantity = response.data.quantity;
      });
    },
    onSave() {
      console.log("保存", this.form);
      // 这里添加保存逻辑
      const saveParams = this.form;
      console.log("saveParams: ", saveParams);
      if (this.operationType === "ADD") {
        createGift(saveParams).then((response) => {
          this.onCancel();
        });
        return;
      }
      saveParams.id = this.id;
      editGift(saveParams).then((response) => {
        this.onCancel();
      });
    },
    onCancel() {
      console.log("返回");
      this.$router.push({
        name: "giftList",
      });
    },
  },
};
</script>

<style scoped>
.gift-form {
  max-width: 600px;
  margin: 0 auto;
}
</style>
