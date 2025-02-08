<template>
  <el-collapse v-model="activeNames">
    <el-collapse-item class="custom-collapse-item" :title="patientInfo.patientName + '&nbsp;&nbsp;&nbsp;&nbsp;' +patientInfo.idCard">
      <el-row>
        <el-col :span="6">
          <el-form :model="patientInfo" label-width="120px">
            <el-form-item label="姓名">
              <span>{{ patientInfo.patientName }}</span>
            </el-form-item>
            <el-form-item label="身份证号">
              <span>{{ patientInfo.idCard }}</span>
            </el-form-item>
            <el-form-item label="出生日期">
              <span>{{ patientInfo.birthDate }}</span>
            </el-form-item>
            <el-form-item label="性别">
              <span>{{ patientInfo.genderName }}</span>
            </el-form-item>
            <el-form-item label="国籍">
              <span>{{ patientInfo.nationalityName }}</span>
            </el-form-item>
            <el-form-item label="民族">
              <span>{{ patientInfo.nationName }}</span>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6">
          <el-form :model="patientInfo" label-width="120px">
            <el-form-item label="工作单位">
              <span>{{ patientInfo.workunit }}</span>
            </el-form-item>
            <el-form-item label="文化程度">
              <span>{{ patientInfo.educationName }}</span>
            </el-form-item>
            <el-form-item label="人群分类">
              <span>{{ patientInfo.nultitudeTypeName || patientInfo.nultitudeTypeOther }}</span>
            </el-form-item>
            <el-form-item label="药物过敏史">
              <span>{{ patientInfo.allergyDrug }}</span>
            </el-form-item>
            <el-form-item label="联系方式">
              <span>{{ patientInfo.contacts }}: {{ patientInfo.contactsTel }}</span>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6">
          <el-form :model="patientInfo" label-width="120px">
            <el-form-item label="病历分类">
              <span>{{ patientInfo.diagnoseStateCode }}</span>
            </el-form-item>
            <el-form-item label="流动状态">
              <span>{{ patientInfo.flowStatusCode }}</span>
            </el-form-item>
            <el-form-item label="风险分级">
              <span>{{ patientInfo.riskRatingCode }}</span>
            </el-form-item>
            <el-form-item label="排查状态">
              <span>{{ patientInfo.screeningStatusCode }}</span>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6">
          <el-form :model="patientInfo" label-width="120px">
            <el-form-item label="现住地址">
              <span>{{ patientInfo.currentAddrDetail }}</span>
            </el-form-item>
            <el-form-item label="户籍地址">
              <span>{{ patientInfo.permanentAddrDetail }}</span>
            </el-form-item>
            <el-form-item label="婚姻状况">
              <span>{{ patientInfo.maritalStatusName }}</span>
            </el-form-item>
            <el-form-item label="临时身份证号">
              <span>{{ patientInfo.tempIdCard }}</span>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-collapse-item>
  </el-collapse>
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
              <li v-for="(exam, index) in selectedRecord.exams" :key="index"
                  :class="{'abnormal-exam': exam.isAbnormal}">
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
import {ref} from 'vue';
import {
  ElRow,
  ElCol,
  ElTimeline,
  ElTimelineItem,
  ElCard,
  ElCollapse,
  ElCollapseItem,
  ElForm,
  ElFormItem
} from 'element-plus';

export default {
  name: 'PatientDashboard',
  setup() {
    const activeNames = ref(['1']); // 默认展开第一个面板

// 模拟患者基本信息数据
    const patientInfo = ref({
      patientName: '张三',
      idCard: '123456789012345678',
      birthDate: '1990-01-01',
      genderName: '男',
      nationalityName: '中国',
      nationName: '汉族',
      workunit: '某公司',
      educationName: '本科',
      nultitudeTypeName: '一般人群',
      nultitudeTypeOther: '',
      allergyDrug: '无',
      contacts: '李四',
      contactsTel: '13800000000',
      diagnoseStateCode: '未诊断',
      flowStatusCode: '流动',
      riskRatingCode: '中等',
      screeningStatusCode: '已排查',
      permanentAddrDetail: '北京市朝阳区',
      currentAddrDetail: '北京市海淀区',
      maritalStatusName: '未婚',
      tempIdCard: '987654321098765432',
    });

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
          {name: '血压测量', result: '145/95 mmHg', isAbnormal: true},
          {name: '血液常规', result: '正常', isAbnormal: false}
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
          {name: '胸部X光', result: '轻微阴影', isAbnormal: true},
          {name: '肺功能测试', result: '正常', isAbnormal: false}
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
          {name: '血压测量', result: '160/100 mmHg', isAbnormal: true},
          {name: '头颅CT', result: '正常', isAbnormal: false}
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
      selectRecord,
      patientInfo,
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

el-card {
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

el-row {
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
  el-col {
    padding: 10px;
  }

  .patient-dashboard {
    padding: 10px;
  }

  .timeline-container {
    border-right: none;
    padding-right: 0;
  }

  el-card {
    padding: 15px;
  }
}

el-collapse-item {
  margin-bottom: 16px;
}

el-form-item {
  margin-bottom: 10px;
}

.el-form span {
  font-size: 14px;
}

:deep .custom-collapse-item .el-collapse-item__header {
  font-size: 16px !important; /* 字体大小 */
  font-weight: 600 !important; /* 加粗 */
  color: #409EFF !important; /* 标题颜色，蓝色 */
  background-color: #f7f7f7 !important; /* 背景颜色，淡灰色 */
  padding: 10px 15px !important; /* 内边距调整 */
  border-radius: 5px !important; /* 圆角 */
  transition: background-color 0.3s !important; /* 动画过渡效果 */
}
:deep .custom-collapse-item .el-collapse-item__header:hover {
  background-color: #e0f7ff !important; /* 悬浮时改变背景颜色 */
}
</style>
