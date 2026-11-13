import { Request, Response, NextFunction } from 'express';
import * as vendorService from '../services/vendor.service';
import { createVendorSchema,updateVendorSchema  } from '../validators/vendor.validator';

export const createVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
	// safeParse output obj struct
	// {success:true, data:output}
	// {success:false, error:ZodError}
    const validation = createVendorSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        errors: validation.error.issues
      });
    }

    const vendor = await vendorService.createVendor(validation.data);

    return res.status(201).json({
      success: true,
      data: vendor
    });

  } catch (error) {
    next(error);
  }
};

export const getAllVendors = async(req:Request, res:Response,
 next:NextFunction) =>{
try{

const page = Number(req.query.page??1);
const limit = Number(req.query.limt??10);

if(!Number.isInteger(page) || page<1 ||
   !Number.isInteger(limit) || limit<1 || limit > 100){

	return res.status(400).json({
	success: false,
	message:'Invalid pagination params'
	});
}

const result = await vendorService.getAllVendors(page,limit);

return res.status(200).json({
success:true,
data: result.vendors,
pagination: result.pagination
});
}
catch(error){
next(error);
}
};

export const getVendorById = async (req:Request, res:Response, next:NextFunction)=>{
    try{
       const id = Number(req.params.id);
        if(!Number.isInteger(id) || id <= 0){
            return res.status(400).json({
            success:false,
            message: 'Invalid vendor Id'
        });
        }
    const vendor = await vendorService.getVendorById(id);
    if(!vendor){
        return res.status(404).json({
            success:false,
            message: 'vendor not found'
        });
    }
    
    return res.status(200).json({
        success:true,
        data: vendor
    }); 
    }
    catch(error){
        next(error);
    }   
};

export const updateVendor = async(req:Request, res:Response, next:NextFunction)=>{
    try{
        const id = Number(req.params.id);
    if(!Number.isInteger(id) || id<0){
        return res.status(400).json({
            success: false,
            message: "Invalid vendor Id"
        });
    }

    const validatedData =  updateVendorSchema.safeParse(req.body);
    if(!validatedData.success){
        return res.status(400).json({
            success:false,
            message:"Invalid request body"
        });
    }
    const vendor = await vendorService.updateVendor(id,validatedData.data);
    return res.status(200).json({
        success: true,
        message: 'Vendor updated successfully',
        data: vendor
    });
    }
    catch(error){
        next(error);
    }
    
};




