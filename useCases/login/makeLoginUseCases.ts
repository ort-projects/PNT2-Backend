import login from "./login.js";
import type { LoginDependencies } from "./login.js";
import type { LoginInput } from "../../schemas/loginSchema.js";

export default function makeLoginUseCases(dependencies: LoginDependencies) {
    return {
        login: (data: LoginInput) => login(data, dependencies),
    };
}

export type LoginUseCases = ReturnType<typeof makeLoginUseCases>;
