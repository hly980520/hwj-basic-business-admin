<template>
  <div>
    <el-row :gutter="20" class="toolbar">
      <el-col :span="6">
        <el-select v-model="searchForm.searchType" placeholder="请选择搜索类型">
          <el-option label="用户id" value="memberId"></el-option>
          <el-option label="用户账号" value="loginAccount"></el-option>
        </el-select>
      </el-col>
      <el-col :span="12">
        <el-input
          v-model="searchForm.searchParams"
          placeholder="请输入用户id"
        ></el-input>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="onSearch">查询</el-button>
      </el-col>
      <el-col :span="3">
        <el-button @click="reset">重置</el-button>
      </el-col>
    </el-row>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="id" width="60"></el-table-column>
      <el-table-column
        prop="memberId"
        label="用户id"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="loginAccount"
        label="用户账号"
        width="120"
      ></el-table-column>
      <el-table-column prop="giftInfos" label="礼品信息" width="120">
        <template slot-scope="scope">
          {{ formatGiftInfos(scope.row.giftInfos) }}
        </template>
      </el-table-column>
      <el-table-column prop="sourceType" label="来源类型" width="120">
        <template slot-scope="scope">
          {{ sourceTypeEnum[scope.row.sourceType] }}
        </template>
      </el-table-column>
      <el-table-column
        prop="sourceId"
        label="来源id"
        width="120"
      ></el-table-column>
      <el-table-column prop="processStatus" label="发放状态" width="120">
        <template slot-scope="scope">
          {{ processStatusEnum[scope.row.processStatus] }}
        </template>
      </el-table-column>
      <el-table-column
        prop="createdDate"
        label="创建时间"
        width="180"
      ></el-table-column>
      <el-table-column label="操作" width="100">
        <template v-slot="scope">
          <el-button
            type="text"
            @click="handleSend(scope.row)"
            v-show="scope.row.processStatus != 2"
            >发放</el-button
          >
        </template>
      </el-table-column>
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="searchForm.pageNo"
        :limit.sync="searchForm.pageSize"
        @pagination="onSearch"
      />
    </el-table>
  </div>
</template>

<script>
import Pagination from "@/components/Pagination";
export default {
  name: "GiftIssueLog",
  components: { Pagination },
  data() {
    return {
      searchForm: {
        searchType: "memberId",
        searchParams: "",
      },
      processStatusEnum: {
        0: "待发放",
        1: "发放中",
        2: "发放成功",
        3: "发放失败",
      },
      sourceTypeEnum: {
        1: "活动下发",
      },
      total: 0,
      tableData: [
        {
          id: 1,
          memberId: "1000136506",
          loginAccount: "7420575",
          giftInfos: [
            { giftName: "100积分", quantity: 1 },
            { giftName: "100积分", quantity: 1 },
          ],
          sourceType: 1,
          sourceId: "1111",
          processStatus: 0,
          createdDate: "2024-12-09 08:31:05",
        },
        {
          id: 2,
          memberId: "1000136506",
          loginAccount: "7420575",
          giftInfos: [
            { giftName: "100积分", quantity: 1 },
            { giftName: "100积分", quantity: 1 },
          ],
          sourceType: 1,
          sourceId: "1112",
          processStatus: 1,
          createdDate: "2024-12-09 08:31:05",
        },
        {
          id: 3,
          memberId: "1000136506",
          loginAccount: "7420575",
          giftInfos: [
            { giftName: "100积分", quantity: 1 },
            { giftName: "100积分", quantity: 1 },
          ],
          sourceType: 1,
          sourceId: "1112",
          processStatus: 2,
          createdDate: "2024-12-09 08:31:05",
        },
      ],
    };
  },
  methods: {
    formatGiftInfos(giftInfos) {
      return giftInfos
        .map((info) => `${info.giftName} x${info.quantity}`)
        .join(" \n");
    },
    onSearch() {
      // 触发搜索，数据由 computed 属性 filteredData 处理
      const params = {};
      params[this.searchForm.searchType] = this.searchForm.searchParams;
      console.log("查询: ", params);
    },
    reset() {
      this.searchForm = {
        searchType: "memberId",
        searchParams: "",
      };
      this.onSearch();
    },
    handleSend(row) {
      // 实现发放功能
      console.log("发放:", row);
    },
  },
};
</script>

<style scoped>
.toolbar {
  margin-bottom: 20px;
}
</style>
