<template>
  <div>
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="用户Id">
        <el-input
          v-model="searchForm.userId"
          placeholder="请输入用户Id"
        ></el-input>
      </el-form-item>
      <el-form-item label="注册时间">
        <el-date-picker
          v-model="searchForm.registerTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="用户Id" width="150"></el-table-column>
      <el-table-column
        prop="loginAccount"
        label="用户账号"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="nickname"
        label="用户昵称"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="phoneNumber"
        label="用户手机号"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="createdDate"
        label="注册时间"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="status"
        label="用户状态"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="registerWay"
        label="注册方式"
        width="100"
      ></el-table-column>
      <el-table-column prop="actions" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="onDelete(scope.row)" type="danger" size="small">
            作废
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
import { queryMemberPage } from "@/api/member-center";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination

export default {
  name: "MemberList",
  components: { Pagination },
  data() {
    return {
      searchForm: {
        id: "",
        registerTime: [],
        pageNo: 1,
        pageSize: 20,
      },
      listLoading: false,
      total: 0,
      tableData: [
        {
          id: "100015962",
          nickname: "张三",
          loginAccount: "12344",
          phoneNumber: "7425676",
          createdDate: "2021-12-29 08:11:56",
          status: "正常",
          registerWay: "手机号码注册",
        },
        {
          id: "100015963",
          nickname: "李四",
          loginAccount: "12345",
          phoneNumber: "74256767",
          createdDate: "2021-12-29 08:11:56",
          status: "正常",
          registerWay: "手机号码注册",
        },
      ],
    };
  },
  methods: {
    onSearch() {
      console.log("Search:", this.searchForm);
      // 这里可以添加搜索逻辑
      this.listLoading = true;
      const queryParams = {
        id: this.searchForm.id,
      };
      if (this.searchForm.registerTime) {
        queryParams.createdDateStart = this.searchForm.registerTime[0];
        queryParams.createdDateEnd = this.searchForm.registerTime[1];
      }
      queryMemberPage(queryParams).then((response) => {
        this.tableData = response.data.items;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    onReset() {
      this.searchForm.id = "";
      this.searchForm.registerTime = [];
      this.onSearch();
    },
    onDelete(row) {
      console.log("Delete:", row);
      // 这里可以添加编辑逻辑
    },
  },
};
</script>

<style scoped>
.demo-form-inline .el-form-item {
  margin-right: 10px;
}
</style>
