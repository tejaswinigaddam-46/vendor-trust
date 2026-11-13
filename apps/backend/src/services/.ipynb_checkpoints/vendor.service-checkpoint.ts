import * as vendorRepository from '../repos/vendor.repository';
import { CreateVendorInput, UpdateVendorInput} from '../validators/vendor.validator';

export const createVendor = async (input: CreateVendorInput) => {
  const vendor = await vendorRepository.createVendor(input);

  return vendor;
};

export const getAllVendors = async(page:number, limit:number)=>{

const offset = (page-1) * limit;

const[vendors,total]= await Promise.all([
	vendorRepository.getAllVendors(limit,offset),
	vendorRepository.getVendorCount()
	]);

return {
	vendors,
	pagination:{
		page,
		limit,
		total,
		totalPage: Math.ceil(total/limit)
		}
};

};

export const getVendorById = async (id:number) => {
    const vendor = await vendorRepository.getVendorById(id);
    return vendor??null;
};

export const updateVendor = async(id:number,input:UpdateVendorInput)=>{
    const vendor = await vendorRepository.updateVendor(id,input);
    return vendor ?? null;
};
