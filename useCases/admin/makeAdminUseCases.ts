import getDashboardData from "./getDashboardData.js";

export default function makeAdminUseCases() {
    return {
        getDashboardData: (selectedYear: unknown) => getDashboardData(selectedYear),
    };
}

export type AdminUseCases = ReturnType<typeof makeAdminUseCases>;
