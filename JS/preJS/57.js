var insert = function(intervals, newInterval) {
    let result = [];
    let i = 0;

    // 1. 添加所有左侧不重叠区间
    while (i < intervals.length && intervals[i][1] < newInterval[0]) {
        result.push(intervals[i]);
        i++;
    }

    // 2. 合并所有与 newInterval 有重叠的区间
    let start = newInterval[0];
    let end = newInterval[1];
    while (i < intervals.length && intervals[i][0] <= end) {
        start = Math.min(start, intervals[i][0]);
        end = Math.max(end, intervals[i][1]);
        i++;
    }
    result.push([start, end]);

    // 3. 添加所有右侧不重叠区间
    while (i < intervals.length) {
        result.push(intervals[i]);
        i++;
    }

    return result;
};