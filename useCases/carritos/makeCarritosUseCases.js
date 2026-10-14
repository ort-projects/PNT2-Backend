import getCart from "./getCart.js";

export default function makeCarritosUseCases(cartRepository) {
    return {
        getCart: (id) => getCart(id, cartRepository),
    };
}
