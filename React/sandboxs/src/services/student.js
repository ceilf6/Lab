/**
 * 获取所有学生
 */
export async function getAllStudents() {
    // return await fetch()
    //     .then(resp => resp.json()).then(resp => resp.data);
    return [
        {
            id: 1,
            name: 'ceilf1'
        }, {
            id: 2,
            name: 'ceilf2'
        }, {
            id: 3,
            name: 'ceilf3'
        }, {
            id: 4,
            name: 'ceilf4'
        }, {
            id: 5,
            name: 'ceilf5'
        }, {
            id: 6,
            name: 'ceilf6'
        }
    ]
}
