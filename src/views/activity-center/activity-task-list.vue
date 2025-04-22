<template>
  <div>
    <!-- 搜索条件区域 -->
    <div class="toolbar">
      <el-input
        v-model="searchForm.taskName"
        placeholder="请输入任务名称"
        style="width: 200px; margin-right: 10px"
      ></el-input>
      <el-select
        v-model="searchForm.activityName"
        placeholder="活动名称"
        style="width: 200px; margin-right: 10px"
      >
        <el-option
          v-for="(label, value) in activityEnum"
          :key="value"
          :label="label"
          :value="value"
        ></el-option>
      </el-select>
      <el-select
        v-model="searchForm.taskStatus"
        placeholder="任务状态"
        style="width: 200px; margin-right: 10px"
      >
        <el-option
          v-for="(label, value) in statusEnum"
          :key="value"
          :label="label"
          :value="value"
        ></el-option>
      </el-select>
      <el-button type="primary" @click="handleAdd">新增</el-button>
      <el-button @click="handleReset">重置</el-button>
      <el-button type="primary" @click="handleSearch">查询</el-button>
    </div>

    <!-- 表格区域 -->
    <el-table :data="tableData" stripe>
      <el-table-column prop="id" label="id" width="50"></el-table-column>
      <el-table-column
        prop="taskName"
        label="任务名称"
        width="150"
      ></el-table-column>
      <el-table-column prop="activityId" label="活动名称" width="150">
        <template slot-scope="scope">
          {{ activityEnum[scope.row.activityId] }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template slot-scope="scope">
          {{ statusEnum[scope.row.status] }}
        </template>
      </el-table-column>
      <el-table-column
        prop="createdDate"
        label="创建时间"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="createdBy"
        label="创建人"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="updatedDate"
        label="更新时间"
        width="180"
      ></el-table-column>
      <el-table-column
        prop="updatedBy"
        label="更新人"
        width="100"
      ></el-table-column>
      <el-table-column label="操作" width="150">
        <template v-slot="scope">
          <el-button type="text" @click="handleView(scope.row)">查看</el-button>
          <el-button
            type="text"
            :style="{ color: scope.row.status == '1' ? 'red' : 'green' }"
            @click="
              scope.row.status == '1'
                ? handleDownLine(scope.row)
                : handleOnLine(scope.row)
            "
          >
            {{ scope.row.status == "1" ? "下线" : "上线" }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="searchForm.pageNo"
      :limit.sync="searchForm.pageSize"
      @pagination="handleSearch"
    />
  </div>
</template>
<script>
import Pagination from "@/components/Pagination"; // Secondary package based on el-pagination

export default {
  name: "ActivityTaskList",
  components: { Pagination },
  data() {
    return {
      searchForm: {
        taskName: "",
        activityId: null,
        status: null,
        pageNo: 1,
        pageSize: 20,
      },
      activityEnum: {
        101: "101 - 新人活动",
        102: "102 - 转化活动",
        103: "103 - 促活活动",
      },
      statusEnum: {
        0: "草稿",
        1: "上线",
        2: "下线",
      },
      total: 0,
      tableData: [
        {
          id: 1,
          taskName: "新人活动任务",
          activityId: "101",
          status: "0",
          createdDate: "2024-12-09 08:31:05",
          createdBy: "System",
          updatedDate: "2024-12-09 08:31:05",
          updatedBy: "System",
        },
        {
          id: 2,
          taskName: "转化活动任务",
          activityId: "102",
          status: "1",
          createdDate: "2024-12-09 08:31:05",
          createdBy: "System",
          updatedDate: "2024-12-09 08:31:05",
          updatedBy: "System",
        },
        {
          id: 3,
          taskName: "促活活动任务",
          activityId: "103",
          status: "2",
          createdDate: "2024-12-09 08:31:05",
          createdBy: "System",
          updatedDate: "2024-12-09 08:31:05",
          updatedBy: "System",
        },
      ],
    };
  },
  methods: {
    handleAdd() {
      console.log("新增");
      // 实现新增功能
      this.$router.push({
        name: "createActivityTask",
      });
    },
    handleReset() {
      this.searchForm = {
        taskName: "",
        activityName: "",
        taskStatus: "",
      };
    },
    handleSearch() {
      console.log("查询", this.searchForm);
      // 实现查询功能
    },
    handleView(row) {
      console.log("查看", row);
      // 实现查看功能
      this.$router.push({
        name: "viewActivityTask",
        query: {
          id: row.id,
          operationType: "VIEW",
        },
      });
    },
    handleEdit(row) {
      console.log("查看", row);
      // 实现查看功能
      this.$router.push({
        name: "editActivityTask",
        query: {
          id: row.id,
          operationType: "Edit",
        },
      });
    },
    handleDownLine(row) {
      console.log("状态变更", row);
      // 实现状态变更功能
    },
    handleOnLine(row) {
      console.log("状态变更", row);
      // 实现状态变更功能
    },
  },
};
</script>
<style scoped>
.toolbar {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}
.toolbar .el-input,
.toolbar .el-select,
.toolbar .el-button {
  margin-right: 10px;
}
</style>
