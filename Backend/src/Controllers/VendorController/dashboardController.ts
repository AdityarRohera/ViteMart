import type { Request , Response } from "express";
import type { AuthenticatedRequest } from "../../Middlewares/auth.js";
import { vendorDashboardInfo } from "../../Services/vendors/dashboard.service.js";

export const vendorDashboardHandler = async(req : Request , res : Response) => {
    try{

        console.log("1 Inside Getting Vendor Dashoard Info")
        const vendor_id = (req as AuthenticatedRequest).user.userId;

        const dashboardInfo = await vendorDashboardInfo(vendor_id)

        return res.status(200).json({
            success : true,
            message : 'Get Vendor dashboard Info Successfully',
            result : dashboardInfo
        })
        
    } catch(err : unknown){
        console.log("Error comes in getting vendor dashboard handler-> " , err);
        let errmessage;
        if(err instanceof Error){
            errmessage = err.message
        } else if(typeof err === "string"){
            errmessage = err
        }

        res.status(500).send({
            status : false,
            message : "Something wrong in getting vednor dashboard info",
            error : errmessage
        })
    }
}
