const db = require("./config/db");
const dbPromise = db.promise();

const getIdCustomer = async () => {
	try {
		let [data] = await dbPromise.query(
			"SELECT id_customer FROM customer_point order by id_customer DESC limit 1"
		);

		if (data.length > 0) {
			let generatedId = "";
			let id = data[0].id_customer;
			let inital = "C";
			let splitId = id.split(inital);
			let newId = Number(splitId[1]);
			newId++;

			if (newId.toString().length == 1) {
				generatedId = inital + "00" + newId;
			} else if (newId.toString().length == 2) {
				generatedId = inital + "0" + newId;
			} else {
				generatedId = inital + newId;
			}

			return generatedId;
		} else {
			return "C001";
		}
	} catch (error) {
		console.log(error.message);
	}
};

module.exports = {
	getIdCustomer,
};
