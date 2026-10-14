import getDashboardData from "./getDashboardData.js";

export default function makeAdminUseCases() {
    return {
        getDashboardData: (selectedYear) => getDashboardData(selectedYear),
    };
}
