import {Router} from 'express';
import {createVendor, getAllVendors,getVendorById,updateVendor} from '../controllers/vendor.controller';


const vendorRouter = Router();

vendorRouter.post('/',createVendor);
vendorRouter.get('/', getAllVendors);
vendorRouter.get('/:id', getVendorById);
vendorRouter.patch('/:id',updateVendor);

export default vendorRouter;

