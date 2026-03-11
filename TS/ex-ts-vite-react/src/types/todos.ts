export interface todoItem {
    id: number,
    text: string,
    done: boolean
}

export const filters = ['全部', '已完成', '未完成'] as const
// as const 把这个值推导为最“窄”的只读字面量类型（literal type），不要进行类型拓宽
export type Filter = typeof filters[number]