import { ProductA } from "./ProductA";
import { ProductB } from "./ProductB";
import { IProduct } from "./Interface";

export default class SimpleFactory {
    static createProduct(type: string): IProduct {
        switch (type) {
            case 'A':
                return new ProductA()
            case 'B':
                return new ProductB()
            default:
                throw new Error("No such product")
        }
    }
}