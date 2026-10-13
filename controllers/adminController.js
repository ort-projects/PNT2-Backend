import getDashboardData from '../useCases/admin/getDashboardData.js'

class AdminController{
    constructor(){}

    async getDashboardData(req, res){
        const { selectedYear } = req.query;
        const dashData = await getDashboardData(selectedYear);
        res.status(200).json(dashData);
    }
}

export default AdminController;