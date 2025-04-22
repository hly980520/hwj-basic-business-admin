<template>
  <div>
    <el-form :inline="true" :model="searchForm" class="search-form">
      <el-form-item label="用户ID">
        <el-input
          v-model="searchForm.memberId"
          placeholder="请输入用户ID"
        ></el-input>
      </el-form-item>
      <el-form-item label="活动名称">
        <el-select v-model="searchForm.activityId" placeholder="请选择活动名称">
          <el-option
            v-for="(label, value) in activityNameOptions"
            :key="value"
            :label="label"
            :value="value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="50"></el-table-column>
      <el-table-column
        prop="memberId"
        label="用户ID"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="loginAccount"
        label="用户账号"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="activityName"
        label="活动名称"
        width="180"
      ></el-table-column>
      <el-table-column prop="status" label="状态" width="120">
        <template slot-scope="scope">
          {{ statusEnum[scope.row.status] }}
        </template>
      </el-table-column>
      <el-table-column
        prop="createdDate"
        label="活动参与时间"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="updatedDate"
        label="更新时间"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="updatedBy"
        label="更新人"
        width="120"
      ></el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="handleDelete(scope.row)"
            style="color: red"
            >作废</el-button
          >
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
import { queryActivityMemberPage } from "@/api/activity-center";

import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination

export default {
  name: "ActivityMemberList",
  components: { Pagination },
  data() {
    return {
      searchForm: {
        memberId: "",
        activityId: "",
        pageNo: 1,
        pageSize: 20,
      },
      statusEnum: {
        0: "无效",
        1: "有效",
      },
      activityNameOptions: {
        101: "活动A",
        111: "活动B",
        102: "活动C",
      },
      total: 0,
      tableData: [
        {
          id: 1,
          memberId: "1000193596",
          loginAccount: "7JZQ675",
          activityName: "101 - 活动A",
          status: 1,
          createdDate: "2024-12-09 08:13:05",
          updatedDate: "2024-12-09 08:13:05",
          updatedBy: "System",
        },
        {
          id: 2,
          memberId: "1000193596",
          loginAccount: "7JZQ675",
          activityName: "111 - 活动B",
          status: 0,
          createdDate: "2024-12-09 08:13:05",
          updatedDate: "2024-12-09 08:13:05",
          updatedBy: "System",
        },
        {
          id: 3,
          memberId: "1000193596",
          loginAccount: "7JZQ675",
          activityName: "102 - 活动C",
          status: 1,
          createdDate: "2024-12-09 08:13:05",
          updatedDate: "2024-12-09 08:13:05",
          updatedBy: "System",
        },
      ],
    };
  },
  methods: {
    onSearch() {
      console.log("查询", this.searchForm);
      // 添加查询逻辑
      const queryParams = this.searchForm;
      queryActivityMemberPage(queryParams).then((response) => {
        this.tableData = response.data.data;
        this.total = response.data.total;
      });
    },
    onReset() {
      this.searchForm = {
        userId: "",
        activityName: "",
      };
      this.onSearch();
    },
    handleView(row) {
      console.log("查看", row);
      // 添加查看逻辑
    },
    handleDelete(row) {
      console.log("删除", row);
      // 添加删除逻辑
    },
  },
};
</script>

<style scoped>
.search-form {
  margin-bottom: 20px;
}
</style>
