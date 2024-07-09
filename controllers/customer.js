const db = require("../config/db");
const { getIdCustomer } = require("../helper");
const dbPromise = db.promise();

const getCustomerById = async (req, res) => {
	try {
		const id = req.query.id_customer;

		if (!id) {
			throw new Error("customer id not found!");
		}

		let [data] = await dbPromise.query(
			`SELECT cp.id_customer,SUM(pd.point_amount) as total_point,cp.id_point,cp.no_hp_customer as no_handpone,cp.address_customer as alamat
            FROM customer_point cp 
            join point_details pd ON cp.id_customer = pd.id_customer 
            where cp.id_customer='${id}'`
		);

		let [point_details] = await dbPromise.query(`
            SELECT id_point as id_point_details, point_amount, transaction_date, transaction_type FROM point_details WHERE id_customer = '${id}'
            `);

		data[0].point_details = point_details;

		res.json({ data: data[0] });
	} catch (error) {
		res.send(error.message);
	}
};

const postCreateCustomer = async (req, res) => {
	try {
		const {
			no_handphone,
			nm_customer,
			id_point,
			point_type,
			alamat,
			point_amount,
		} = req.body;

		const id_customer = await getIdCustomer();

		if (typeof id_customer == "undefined") {
			throw new Error("failed to generate customer id!");
		}

		const [create] = await dbPromise.query(`

		    INSERT INTO customer_point (id_customer, nm_customer, id_point, point_type, point_customer, no_hp_customer, address_customer)
		    values ('${id_customer}','${nm_customer}','${id_point}','${point_type}',${point_amount},${no_handphone},'${alamat}')`);

		if (create) {
			let data = [
				{
					id_customer: id_customer,
					nm_customer: nm_customer,
					point_amount: point_amount,
				},
			];

			res.json({
				respon_code: "00",
				message: "Berhasil menambahkan pelanggan",
				data,
			});
		} else {
			throw new Error("Create data customer failed!");
		}
	} catch (error) {
		res.send(error.message);
	}
};

module.exports = {
	getCustomerById,
	postCreateCustomer,
};
