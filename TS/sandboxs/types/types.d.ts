declare let type2: "ceilf6";
declare let type3: string | number | false;
declare let sex: "male" | "female";
declare let arrType: number[];
declare let arrType2: Array<number>;
declare const arr: Array<number> | string[];
declare let pos: [number, string];
declare let emptyArr: [];
declare let emptyArr2: any[];
declare function sum(a: number, b: number, c: string, ...args: number[]): string;
declare const sum2: (a: number, args: number[]) => void;
declare const fanXing: <T>(arg: T) => T;
interface fanXing2<T> {
    att: T;
}
declare let ins: string;
declare const obj: fanXing2<number>;
declare const obj2: fanXing2<string>;
type Transform<T> = T extends number ? string : T extends string ? number : never;
declare function transform<T extends number | string>(arg: T): Transform<T>;
declare function transform2(arg: number): string;
declare function transform2(arg: string): number;
declare function tuple<T1, T2>(a: T1, b: T2): [T1, T2];
declare function filterNumCallback<T1, callbackT extends T1>(args: T1[], callback: (item: callbackT) => void, guard: (item: T1) => item is callbackT): number[];
declare let Obj: {
    id: number;
    name: string;
    sex?: 'male' | 'female';
};
declare const Objs: {
    id: number;
    name: string;
}[];
type pos = {
    x: number;
    y: number;
} | undefined;
declare const posIns: pos;
interface pos2 {
    x: number;
    y: number;
    callback(str: string): void;
    callback2?: (num: number) => void;
}
declare const pos2Ins: pos2;
declare function clg(pos: pos2): void;
type a1 = {
    id: number;
    name: string;
};
type a2 = {
    id: number;
    age: number;
};
type a = a1 & a2;
declare const aIns: a;
type aCom = a1 | a2;
declare const aComIns: aCom;
type t = number & string;
declare function split(val: any): void;
declare let maybeVal: string | undefined;
declare const objIns: {
    id?: number;
};
