import {Router} from 'express';
import {createVendor, getAllVendors,getVendorById,updateVendor} from '../controllers/vendor.controller';


const router = Router();

router.post('/',createVendor);
router.get('/', getAllVendors);
router.get('/:id', getVendorById);
router.patch('/:id',updateVendor);

export default router;

