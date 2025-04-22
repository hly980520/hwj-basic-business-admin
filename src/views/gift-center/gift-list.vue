<template>
  <div>
    <el-form :inline="true" :model="searchForm" class="search-form">
      <el-form-item label="礼品名称">
        <el-input
          v-model="searchForm.giftName"
          placeholder="请输入礼品名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="礼品类型">
        <el-select v-model="searchForm.giftType" placeholder="请选择礼品类型">
          <el-option
            v-for="(label, value) in giftTypeEnum"
            :key="value"
            :label="label"
            :value="value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="礼品状态">
        <el-select v-model="searchForm.giftStatus" placeholder="请选择礼品状态">
          <el-option
            v-for="(label, value) in giftStatusEnum"
            :key="value"
            :label="label"
            :value="value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button @click="onReset">重置</el-button>
        <el-button type="primary" @click="handleCreate">新增</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="50"></el-table-column>
      <el-table-column
        prop="giftName"
        label="礼品名称"
        width="150"
      ></el-table-column>
      <el-table-column prop="giftType" label="礼品类型" width="120">
        <template slot-scope="scope">
          {{ giftTypeEnum[scope.row.giftType] }}
        </template>
      </el-table-column>
      <el-table-column prop="giftStatus" label="礼品状态" width="120">
        <template slot-scope="scope">
          {{ giftStatusEnum[scope.row.giftStatus] }}
        </template>
      </el-table-column>
      <el-table-column
        prop="quantity"
        label="奖品数量"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="createdDate"
        label="创建时间"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="updatedDate"
        label="更新时间"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="createdBy"
        label="创建人"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="updatedBy"
        label="更新人"
        width="120"
      ></el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleView(scope.row)"
            >查看</el-button
          >
          <el-button type="text" size="small" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <!-- 禁用/启用按钮，根据状态动态显示 -->
          <el-button
            @click="
              scope.row.giftStatus == '1'
                ? handleDisable(scope.row)
                : handleEnable(scope.row)
            "
            :style="{ color: scope.row.giftStatus == '1' ? 'red' : 'green' }"
            type="text"
            size="small"
          >
            {{ scope.row.giftStatus == "1" ? "禁用" : "启用" }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="searchForm.pageNo"
      :limit.sync="searchForm.pageSize"
      @pagination="onSearch"
    />
  </div>
</template>

<script>
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
import { queryGiftPage } from "@/api/gift-center";
export default {
  name: "GiftList",
  components: { Pagination },
  data() {
    return {
      searchForm: {
        giftName: "",
        giftType: null,
        giftStatus: null,
        pageNo: 1,
        pageSize: 20,
      },
      giftTypeEnum: {
        1: "积分",
        2: "抽奖机会",
      },
      giftStatusEnum: {
        0: "禁用",
        1: "启用",
      },
      total: 0,
      tableData: [
        {
          id: 1,
          giftName: "新人活动礼品",
          giftType: "1",
          giftStatus: "0",
          quantity: 10,
          createdDate: "2024-12-09 08:13:05",
          updatedDate: "2024-12-09 08:13:05",
          createdBy: "System",
          updatedBy: "System",
        },
        {
          id: 2,
          giftName: "转化活动礼品",
          giftType: "2",
          giftStatus: "1",
          quantity: 10,
          createdDate: "2024-12-09 08:13:05",
          updatedDate: "2024-12-09 08:13:05",
          createdBy: "System",
          updatedBy: "System",
        },
        {
          id: 3,
          giftName: "促销活动礼品",
          giftType: "2",
          giftStatus: "1",
          quantity: 10,
          createdDate: "2024-12-09 08:13:05",
          updatedDate: "2024-12-09 08:13:05",
          createdBy: "System",
          updatedBy: "System",
        },
      ],
    };
  },
  methods: {
    onSearch() {
      console.log("查询", this.searchForm);
      // 添加查询逻辑
      queryGiftPage(this.searchForm).then((response) => {
        this.tableData = response.data.data;
        this.total = response.data.total;
      });
    },
    onReset() {
      this.searchForm = {
        giftName: "",
        giftType: null,
        giftStatus: null,
      };
      this.onSearch();
    },
    handleCreate() {
      this.$router.push({
        name: "createNewGift",
      });
    },
    handleView(row) {
      console.log("查看", row);
      // 添加查看逻辑
      this.$router.push({
        name: "viewGift",
        query: {
          id: row.id,
          operationType: "VIEW",
        },
      });
    },
    handleDisable(row) {},
    handleEnable(row) {},
    handleEdit(row) {
      console.log("编辑", row);
      // 添加删除逻辑
      this.$router.push({
        name: "editGift",
        query: {
          id: row.id,
          operationType: "EDIT",
        },
      });
    },
  },
};
</script>

<style scoped>
.search-form {
  margin-bottom: 20px;
}
</style>
