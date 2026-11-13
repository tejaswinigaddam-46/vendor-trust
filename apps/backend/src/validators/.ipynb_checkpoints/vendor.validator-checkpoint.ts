import {z} from 'zod';

export const createVendorSchema = z.object({
	company_name: z.string().trim().min(2).max(200),
	website: z.string().url().optional().or(z.literal('')),
	country: z.string().trim().min(2).max(100),
	contact_email: z.string().email().max(255)
});

export type CreateVendorInput = z.infer<typeof createVendorSchema>;

export const updateVendorSchema = createVendorSchema
                                .partial().strict()
                                .refine(
                                    (data) => Object.keys(data).length>0,
                                        'At least one field must be provided'
                                );
export type UpdateVendorInput = z.infer<typeof updateVendorSchema>;