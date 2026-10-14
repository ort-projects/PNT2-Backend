import login from "./login.js";

export default function makeLoginUseCases(dependencies) {
    return {
        login: (data) => login(data, dependencies),
    };
}
