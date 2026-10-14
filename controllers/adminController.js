export default class AdminController{
    constructor(adminUseCases){
        this.adminUseCases = adminUseCases;
    }

    async getDashboardData(req, res){
        const { selectedYear } = req.query;
        const dashData = await this.adminUseCases.getDashboardData(selectedYear);
        res.status(200).json(dashData);
    }
}
