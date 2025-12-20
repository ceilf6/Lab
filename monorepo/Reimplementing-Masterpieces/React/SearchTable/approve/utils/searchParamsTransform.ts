import { StaffModel } from '@tmc/business/src/apis/staff';
import dayjs from 'dayjs';

/**
 * 搜索表单参数转换工具
 */
export interface SearchFormParams {
  /** 员工ID字段名 */
  proposerStaffId?: any;
  /** 日期区间字段 (RangePicker 返回的数组) */
  submitTimeRange?: [any, any] | null;
  /** 起始日期字段 */
  submitTimeFrom?: any;
  /** 结束日期字段 */
  submitTimeTo?: any;
  /** 单据标签字段 */
  searchTagList?: any;
  /** 其他字段 */
  [key: string]: any;
}

export interface TransformOptions {
  /** 选中的员工对象 */
  selectedStaff?: StaffModel | null;
}

/**
 * 转换搜索表单参数
 * @param params 原始表单参数
 * @param options 转换选项
 * @returns 转换后的参数
 */
export function transformSearchParams(
  params: SearchFormParams,
  options: TransformOptions = {}
): SearchFormParams {
  const { selectedStaff } = options;

  let transformedParams = { ...params };
  // 1. 处理员工ID转换
  if (selectedStaff && params.proposerStaffId !== undefined) {
    transformedParams.proposerStaffId = selectedStaff.staffId;
  }

  // 2. 处理日期转换
  transformedParams = transformDateParams(transformedParams);

  // 3. 处理标签转换
  if (params.searchTagList) {
    transformedParams.searchTagList = params.searchTagList.map(
      (tagCode: number) => switchTag(tagCode)
    );
  }

  return transformedParams;
}

// 由于不能将后端需要的Tag[]赋给select的value所以还得进行转换
function switchTag(value: number) {
  switch (value) {
    case 1:
      return {
        tagType: 1,
        label: '无需打印',
        tagValueList: ['2'],
      };
    case 2:
      return {
        tagType: 2,
        label: '无财务一级审批',
        tagValueList: ['2'],
      };
    case 312:
      return {
        tagType: 312,
        label: 'OCR',
        tagValueList: ['1'],
      };
    default:
      return null;
  }
}

/**
 * 转换日期参数
 * @param params 包含日期字段的参数
 * @returns 转换后的参数
 */
function transformDateParams(params: SearchFormParams): SearchFormParams {
  const result = { ...params };

  // 处理 RangePicker 返回的日期区间
  if (result.submitTimeRange && Array.isArray(result.submitTimeRange)) {
    const [startDate, endDate] = result.submitTimeRange;

    if (startDate && endDate) {
      // 两个日期都存在
      result.submitTimeFrom = dayjs(startDate).startOf('day').valueOf();
      result.submitTimeTo = dayjs(endDate).endOf('day').valueOf();
    }
    /* RangerPicker 添加了 single 参数那么两个日期都肯定会有
    else if (startDate && !endDate) {
      // 只有起始日期，结束日期默认为当前日期
      result.submitTimeFrom = dayjs(startDate).startOf('day').valueOf();
      result.submitTimeTo = dayjs().endOf('day').valueOf();
    } else if (!startDate && endDate) {
      // 只有结束日期，起始日期默认为结束时间的2年前
      result.submitTimeFrom = dayjs(endDate).subtract(2, 'year').startOf('day').valueOf();
      result.submitTimeTo = dayjs(endDate).endOf('day').valueOf();
    }
    */

    // 清除原始的 RangePicker 字段
    delete result.submitTimeRange;
  }

  /* 之前是用两个 DatePicker 实现的
  else if (result.submitTimeFrom || result.submitTimeTo) {
    // 如果只设置了起始日期，结束日期默认为当前日期
    if (result.submitTimeFrom && !result.submitTimeTo) {
      const startTime = dayjs(result.submitTimeFrom).startOf('day').valueOf();

      // 设置结束日期为当前日期的23:59:59
      const endTime = dayjs().endOf('day').valueOf();

      result.submitTimeFrom = startTime;
      result.submitTimeTo = endTime;
    }
    // 如果只设置了结束日期，起始日期默认为2年前，防止数据量过大
    else if (!result.submitTimeFrom && result.submitTimeTo) {
      const endTime = dayjs(result.submitTimeTo).endOf('day').valueOf();

      const startTime = dayjs().subtract(2, 'year').startOf('day').valueOf();

      result.submitTimeFrom = startTime;
      result.submitTimeTo = endTime;
    }
    // 如果两个日期都设置了
    else if (result.submitTimeFrom && result.submitTimeTo) {
      result.submitTimeFrom = dayjs(result.submitTimeFrom)
        .startOf('day')
        .valueOf();
      result.submitTimeTo = dayjs(result.submitTimeTo).endOf('day').valueOf();
    }
  }*/

  return result;
}
