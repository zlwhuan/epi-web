<template>
  <el-row class="patient-dashboard" gutter={20}>
    <!-- 左侧时间轴 -->
    <el-col :span="6" class="timeline-col">
      <el-timeline :reverse="false" class="timeline-container">
        <el-timeline-item
            v-for="(record, index) in timelineData"
            :key="index"
            :timestamp="record.date"
            :icon="record.icon"
            :color="record.color"
            @click="selectRecord(record, index)"
            placement="top"
            :class="{'timeline-item-selected': selectedIndex === index}"
            class="timeline-item">
<!--          <div class="timeline-item-text">{{ record.hospital }}</div>-->
          <div class="timeline-item-text">{{ record.diagnosis }}</div>
        </el-timeline-item>
      </el-timeline>
    </el-col>

    <!-- 右侧详细信息 -->
    <el-col :span="18" class="details-col">
      <el-card class="patient-card" shadow="hover" v-if="selectedRecord">
        <div slot="header" class="card-header">
          <span>当次检查详细信息</span>
        </div>
        <el-row>
          <el-col :span="12">
            <h4>医院：{{ selectedRecord.hospital }}</h4>
            <p><strong>诊断：</strong>{{ selectedRecord.diagnosis }}</p>
            <p><strong>检查日期：</strong>{{ selectedRecord.date }}</p>
            <p><strong>住院情况：</strong>{{ selectedRecord.hospitalization }}</p>
          </el-col>
          <el-col :span="12">
            <h4>治疗方案</h4>
            <p>{{ selectedRecord.treatment }}</p>

            <h4>检查检验</h4>
            <ul>
              <li v-for="(exam, index) in selectedRecord.exams" :key="index" :class="{'abnormal-exam': exam.isAbnormal}">
                <span>{{ exam.name }}: </span>
                <span>{{ exam.result }}</span>
              </li>
            </ul>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { ref } from 'vue';
import { ElRow, ElCol, ElTimeline, ElTimelineItem, ElCard } from 'element-plus';

export default {
  name: 'PatientDashboard',
  setup() {
    // 当前选择的记录
    const selectedRecord = ref(null);
    const selectedIndex = ref(null);

    // 时间轴数据
    const timelineData = ref([
      {
        date: '2025-01-01',
        hospital: '山西省人民医院',
        diagnosis: '高血压，初步诊断',
        treatment: '建议服用降压药',
        hospitalization: '无住院',
        exams: [
          { name: '血压测量', result: '145/95 mmHg', isAbnormal: true },
          { name: '血液常规', result: '正常', isAbnormal: false }
        ],
        icon: 'el-icon-medical',
        color: 'green',
      },
      {
        date: '2025-01-10',
        hospital: '太原市第一医院',
        diagnosis: '慢性支气管炎',
        treatment: '继续使用吸入类药物，建议增加体育锻炼',
        hospitalization: '住院3天',
        exams: [
          { name: '胸部X光', result: '轻微阴影', isAbnormal: true },
          { name: '肺功能测试', result: '正常', isAbnormal: false }
        ],
        icon: 'el-icon-apple',
        color: 'blue',
      },
      {
        date: '2025-01-20',
        hospital: '山西医科大学附属医院',
        diagnosis: '高血压伴有头晕',
        treatment: '调整药物剂量，定期监测血压',
        hospitalization: '无住院',
        exams: [
          { name: '血压测量', result: '160/100 mmHg', isAbnormal: true },
          { name: '头颅CT', result: '正常', isAbnormal: false }
        ],
        icon: 'el-icon-headset',
        color: 'red',
      },
    ]);

    // 选择某个时间点时的处理方法
    const selectRecord = (record, index) => {
      selectedRecord.value = record;
      selectedIndex.value = index;
    };

    return {
      timelineData,
      selectedRecord,
      selectedIndex,
      selectRecord
    };
  }
};
</script>

<style scoped>
.patient-dashboard {
  padding: 20px;
}

.card-header {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 10px;
}

.timeline-container {
  border-right: 2px solid #f0f0f0;
  padding-right: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.timeline-item {
  cursor: pointer;
  display: flex;
}

.timeline-item-text {
  font-weight: bold;
  color: #333;
  font-size: 14px;
}

.timeline-item-selected {
  background-color: #f5f5f5;
}

.el-card {
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.el-row {
  margin-top: 20px;
}

h4 {
  margin-top: 10px;
  font-size: 16px;
  color: #555;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  font-size: 14px;
  color: #333;
  margin: 5px 0;
}

.abnormal-exam {
  color: red;
  font-weight: bold;
}

@media (max-width: 768px) {
  .el-col {
    padding: 10px;
  }

  .patient-dashboard {
    padding: 10px;
  }

  .timeline-container {
    border-right: none;
    padding-right: 0;
  }

  .el-card {
    padding: 15px;
  }
}
</style>
