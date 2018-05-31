const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });
module.exports = (req, res, next) => {
	const schema = {
		type : 'object',
		properties: {
			pm_2_5: {
				type: ['number', 'string']
			}, temperature: {
				type: ['number', 'string']
			}, humidity: {
				type: ['number', 'string']
			}, lat: {
				type: ['number', 'string']
			}, lng: {
				type: ['number', 'string']
			}
		},
		required: ['pm_2_5', 'temperature', 'humidity', 'lat', 'lng']
	};
	const validate = ajv.compile(schema);
	const val = validate(req.body);
	// console.log(val)
	// console.log(req.body)
	if (req.body.pm_2_5 < 0) req.body.pm_2_5 = Math.abs(req.body.pm_2_5); 
	if(val) return next();
	// console.log(
	// 	ajv.errorsText(validate.errors)
	// )
	return res.json(ajv.errorsText(validate.errors))
}