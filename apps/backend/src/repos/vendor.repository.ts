import {pool} from '../config/database';
import {CreateVendorInput} from '../validators/vendor.validator';


export const createVendor = async (input: CreateVendorInput) =>{

const query = `INSERT INTO vendors (company_name, website,country, contact_email)
		VALUES ($1,$2,$3,$4)
		RETURNING *;`;

const values = [input.company_name, input.website||null, input.country, input.contact_email];

const result = await pool.query(query, values);

return result.rows[0];
};

export const getAllVendors = async(limit:number, offset:number)=>{

const query = `SELECT * FROM vendors
		ORDER BY created_at DESC, id DESC
		LIMIT $1 OFFSET $2`;

const values = [limit,offset];
const result = await pool.query(query, values);

return result.rows;

};

export const getVendorCount = async()=>{

const query = 'SELECT COUNT(*) FROM vendors';

const result = await pool.query(query);

return Number(result.rows[0].count);

};


export const getVendorById = async(id:number)=>{

    const query = `SELECT * FROM vendors WHERE id =$1`;

    const result = await pool.query(query,[id]);

    return result.rows[0];
    
};

export const updateVendor = async(id:number,  data:UpdateVendorInput)=>{
    const fields = Object.keys(data) as Array<keyof UpdateVendorInput>;
    const setClause = fields.map((field,index)=>`${field} = $${index+1}`).join(', ');
    const values = fields.map((field) => data[field]);
    values.push(id);
    const query = `UPDATE vendors SET ${setClause} where id=$${values.length} RETURNING *;`;
    const result = await pool.query(query, values);

    return result.rows[0];
};


