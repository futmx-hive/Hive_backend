import * as yup from 'yup';

const phoneSignupSchema = yup.object().shape({
	countryCode: yup.string().required('country code is required').matches(/^\d/),
	phoneNumber: yup
		.string()
		.required('please enter your phone number')
		.matches(/^0?\d{9,10}$/, 'enter a valid phone number'),
});

const recordPaymentSchema = yup.object().shape({
	date: yup.number().max(new Date().getTime(), 'invalid date'),
});

const mmSchema = phoneSignupSchema.concat(
	yup.object().shape({
		network: yup.string().required('please select the service provider.'),
	}),
);

const addProductSchema = yup.object().shape({
	productName: yup
		.string()
		.test('sok', 'pleae specify a product name', (v) => v.trim().length > 1)
		.matches(/^\s?\w/, 'a product name cannot begin with that')
		.required('please specify your product name'),
	categoryName: yup.string().required('what category does this product belong to'),
	isNewCategory: yup.boolean(),

	productDetails: yup.string(),
	originalPrice: yup
		.number('a product should have a price')
		.positive()
		.transform(function (value, orig) {
			if (this.isType(value)) return value;
			return 0;
		})
		.min(1, 'the price of an item cannot be zero')
		.required('specify the price for this item'),

	discountedPrice: yup
		.number()
		.nullable()
		.positive('discounted price cannot be a negative or zero')
		.transform(function (value, orig) {
			if (this.isType(value)) return value;
			return null;
		})
		.max(yup.ref('originalPrice'), "discount can't be more than original price"),
	quantity: yup
		.number()
		// .positive('quantity cannot be empty')
		.integer('quantity should be a whole number')
		.min(1, 'minimum is one')
		.required('please specify the quantity')
		.transform(function (value, orig) {
			if (this.isType(value)) return value;
			return 0;
		}),
	unit: yup.string().required(),
	size: yup
		.array()
		.nullable()
		.of(
			yup
				.string()
				.nullable()
				.matches(/^(\w+?\s?){1,}$/, 'size should not contain special characters')
				.required('please specify a size'),
		),
	color: yup.array().nullable().of(yup.string().required('please choose a color')),
	// images: yup.array ().of (yup.mixed ()),
});
// .required ('attach product images')
const addCategory = yup.object().shape({
	categoryName: yup
		.string()
		.min(4, 'category name should be at least 4 characters')
		.matches(/^(\w+?\s?){1,}$/, 'your category name should not contain special characters')
		.test('is-soko-category', 'category name not acceptable!', (v) => !/\bsoko\b/i.test(v))
		.test('sok', 'this field is required', (v) => v.trim().length > 1)
		.required('specify a category name'),
});

const bankDetailsSchema = yup.object().shape({
	holderName: yup
		.string()
		.matches(/^([a-z]+?\s?){1,}$/i, 'your name should not contain special characters')
		.required('please enter your name'),
	bankName: yup.string().required('what is your bank name'),
	accountNo: yup
		.string()
		.matches(/^[0-9]{10}$/, 'this account number is not valid')
		.required('please enter a valid account number'),
});

const deliveryZoneSchema = yup.object().shape({
	area: yup
		.string()
		.min(2)
		.matches(/^(\w+?\s?){1,}$/, 'name not acceptable')
		.required('please specify the area where you can deliver to'),
	deliveryFee: yup
		.number()
		.positive()
		.transform(function (value, orig) {
			if (this.isType(value)) return value;
			return 0;
		})
		.required('please specify the delivery fee'),
	freeAbove: yup
		.number()
		.nullable()
		.default(0)
		.positive()
		.transform(function (value, orig) {
			if (this.isType(value)) return value;
			return null;
		}),
	expectedTime: yup
		.number()
		.nullable()
		.min(1, 'minimum is 1')
		.transform(function (value, orig) {
			if (this.isType(value)) return value;
			return null;
		})
		.required('field is required'),
	timeUnit: yup.string().required('specify the time unit'),
});

const shopCategorySchema = yup.object().shape({
	categoryName: yup
		.string()
		.matches(/^(\w+?\s?){1,}$/, 'shop category should not contain special characters')
		.required('this field is required'),
});

const storeName = yup
	.string()
	.min(4, 'store name should be at least 4 characters')
	.matches(/^(\w+?\s?){1,}$/, 'your store name should not contain special characters')
	.test('is-soko', 'store name should not contain soko', (v) => !/\bsoko\b/i.test(v))
	.required('store name is required');
let shopCategories = yup
	.array()
	.of(yup.number())
	.max(1, 'please choose a shop category')
	.required('specify the categories you want your store to belong to')
	.transform(function (value, originalValue) {
		if (this.isType(value) && value !== null) {
			return value;
		}

		return [];
	});
const createStoreSignupSchema = yup.object().shape({
	storeName,
	shopCategories,
});

const itemSchema = yup.object().shape({
	maxQuantity: yup.number().nullable(),
	productId: yup.number().required('required'),
	categoryId: yup.number().required('required'),
	quantity: yup.number().min(1).max(yup.ref('maxQuantity'), 'cant be more than available quantity').required('req'),
});

const createOrderSchema = yup.object().shape({
	customerDetailsId: yup.number().required(),
	customerName: yup.string().required(),
	email: yup.string().email('this email is invalid'),
	deliveryNote: yup.string(),
	paymentMethod: yup.string().required('specify payment method'),
	shippingZoneId: yup.number().when('deliveryMethod', {
		is: 'Default',
		then: yup.number().required('specify shipping zone'),
	}),
	salesChannel: yup.string().required('where did this order come from?'),
	deliveryMethod: yup.string().required('specify delivery method'),
	cartItems: yup
		.array()
		.of(itemSchema)
		.min(1, 'you have to add at least an item before making an order')
		.required()
		.transform(function (value, originalValue) {
			if (this.isType(value) && value !== null) {
				return value;
			}
			return [];
		}),
});

const updateMerchantDetailsSchema = yup
	.object()
	.shape({
		oldImage: yup.string().nullable(),
		email: yup.string().email('this email is invalid').required('please specify an email'),
		storeName,
		shopURL: yup
			.string()
			.min(4, 'should be at least 4 characters')
			.matches(/^(\w+|[_-]){1,}$/, 'special characters are not allowed')
			.test('is-sok', 'should not contain soko', (v) => !/\bsoko\b/i.test(v))
			.required('specify store url'),
		shopDescription: yup.string().nullable().min(100, 'description should be at least 20 words'),
		address: yup.string().nullable().min(10),
		city: yup.string(),
		state: yup.string(),
		postalCode: yup.string().nullable().min(4, 'specify a valid postal code').trim(),
		shopCategories,
	})
	.concat(phoneSignupSchema);

const createCustomerSchema = yup
	.object()
	.shape({
		name: yup.string().min(4, 'should be atleast 4 characters').required('please enter your name'),
		email: yup.string().email('please enter a valid email'),
		address: yup.string().min(7, 'address to short').required('please enter your email'),
		billingAddress: yup.string().trim(),
	})
	.concat(phoneSignupSchema);

const filterOrderSchema = yup.object().shape({
	from: yup
		.number()
		.lessThan(yup.ref('to'))
		.when('to', {
			is(key) {
				return key;
			},
			then: yup.number().required(),
		}),
	to: yup.number().nullable().moreThan(yup.ref('from')),
	pStatus: yup.string(),
	dStatus: yup.string(),
});

export {
	phoneSignupSchema,
	addProductSchema,
	addCategory,
	bankDetailsSchema,
	deliveryZoneSchema,
	mmSchema,
	shopCategorySchema,
	createStoreSignupSchema,
	createOrderSchema,
	itemSchema,
	updateMerchantDetailsSchema,
	createCustomerSchema,
	filterOrderSchema,
	recordPaymentSchema,
};
