<template>
  <div>
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="活动名称">
        <el-input
          v-model="searchForm.name"
          placeholder="请输入活动名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="活动类型">
        <el-select
          v-model="searchForm.activityType"
          placeholder="请选择活动类型"
        >
          <el-option label="获客活动" value="1"></el-option>
          <el-option label="存量运营活动" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动状态">
        <el-select v-model="searchForm.status" placeholder="请选择活动状态">
          <el-option label="草稿" value="0"></el-option>
          <el-option label="上线" value="1"></el-option>
          <el-option label="下线" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">查询</el-button>
        <el-button @click="onReset">重置</el-button>
        <el-button type="primary" @click="onCreateNewActivity">新增</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="id" width="50"></el-table-column>
      <el-table-column
        prop="name"
        label="活动名称"
        width="150"
      ></el-table-column>
      <el-table-column prop="activityType" label="活动类型" width="150">
        <template slot-scope="scope">
          {{ activityTypeEnum[scope.row.activityType] }}
        </template></el-table-column
      >
      <el-table-column prop="status" label="活动状态" width="150">
        <template slot-scope="scope">
          {{ statusEnum[scope.row.status] }}
        </template>
      </el-table-column>
      <el-table-column
        prop="startTime"
        label="活动开始时间"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="endTime"
        label="活动结束时间"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="createdDate"
        label="创建时间"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="createdBy"
        label="创建人"
        width="150"
      ></el-table-column>
      <el-table-column prop="actions" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="onView(scope.row)" type="text" size="small"
            >查看</el-button
          >

          <el-button @click="onEdit(scope.row)" type="text" size="small"
            >编辑</el-button
          >

          <!-- 上线/下线按钮，根据状态动态显示 -->
          <el-button
            @click="
              scope.row.status === 1 ? downLine(scope.row) : onLine(scope.row)
            "
            :style="{ color: scope.row.status === 1 ? 'red' : 'green' }"
            type="text"
            size="small"
          >
            {{ scope.row.status === 1 ? "下线" : "上线" }}
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
import { queryActivityPage } from "@/api/activity-center";
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination
export default {
  name: "ActivityList",
  components: { Pagination },

  data() {
    return {
      statusEnum: { 0: "草稿", 1: "上线", 2: "下线" },
      activityTypeEnum: { 1: "获客活动", 2: "存量运营活动" },
      searchForm: {
        name: "",
        activityType: null,
        status: null,
        pageNo: 1,
        pageSize: 20,
      },
      total: 0,
      tableData: [
        {
          id: 1,
          name: "线上活动",
          activityType: 1,
          startTime: "2024-12-09 08:11:56",
          endTime: "2024-12-09 08:11:56",
          createdDate: "2024-12-09 08:11:56",
          createdBy: "System",
          status: 0,
        },
        {
          id: 2,
          name: "线下活动",
          activityType: 2,
          startTime: "2024-12-09 08:11:56",
          endTime: "2024-12-09 08:11:56",
          createdDate: "2024-12-09 08:11:56",
          createdBy: "System",
          status: 1,
        },
        {
          id: 3,
          name: "线下活动",
          activityType: 1,
          startTime: "2024-12-09 08:11:56",
          endTime: "2024-12-09 08:11:56",
          createdDate: "2024-12-09 08:11:56",
          createdBy: "System",
          status: 2,
        },
      ],
    };
  },
  methods: {
    onSearch() {
      console.log("Search:", this.searchForm);
      // 这里可以添加搜索逻辑
      queryActivityPage(this.searchForm).then((response) => {
        this.tableData = response.data.items;
        this.total = response.data.total;
      });
    },
    onReset() {
      this.searchForm.name = "";
      this.searchForm.activityType = null;
      this.searchForm.status = null;
      this.onSearch();
    },
    onView(row) {
      console.log("Edit:", row);
      // 这里可以添加查看逻辑
      this.$router.push({
        name: "viewActivity",
        query: {
          id: row.id,
          operationType: "VIEW",
        },
      });
    },
    onEdit(row) {
      console.log("Edit:", row);
      // 这里可以添加查看逻辑
      this.$router.push({
        name: "editActivity",
        query: {
          id: row.id,
          operationType: "EDIT",
        },
      });
    },
    onLine(row) {
      console.log("OnLine:", row);
      // 这里可以添加上架逻辑
    },
    downLine(row) {
      console.log("DownLine:", row);
      // 这里可以添加上架逻辑
    },
    onCreateNewActivity() {
      this.$router.push({
        name: "createNewActivity",
      });
    },
  },
};
</script>

<style scoped>
.demo-form-inline .el-form-item {
  margin-right: 10px;
}
</style>
