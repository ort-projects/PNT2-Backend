import getCart from "./getCart.js";
import type { CarritosDao } from "../../types/daos.js";

export default function makeCarritosUseCases(cartRepository: CarritosDao) {
    return {
        getCart: (id: number) => getCart(id, cartRepository),
    };
}

export type CarritosUseCases = ReturnType<typeof makeCarritosUseCases>;
