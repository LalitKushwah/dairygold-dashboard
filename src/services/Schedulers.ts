import { Api, ApiWithoutToken } from './Api';

const SCHEDULERS_API: any = {
	CREATE_CUSTOMER: 'erp/create/new/customer/mongo',
	UPDATE_CUSTOMER: 'erp/update/customer/mongo',
	UPDATE_PARENT_ID: 'erp/update/parent/mongo',
	UPDATE_CUSTOMER_DASHBOARD: 'erp/update/dashboard/data',
	UPDATE_SALES_TREE: 'erp/update/associated/sm/mongo',
	UPDATE_CUSTOMER_STATEMENT: 'erp/create/customer/statements',
	UPDATE_CUSTOMER_PENDING_INVOICE: 'erp/create/customer/pendinginvoice',
	// Product API's
	CREATE_PRODUCT: 'erp/create/new/product/mongo',
	UPDATE_PRODUCT: 'erp/update/product/mongo',
	//Non-Customers API's
	UPDATE_NON_CUSTOMER_DASHBOARD: 'erp/update/noncustomer/dashboard/data',
	MAP_CATEGORIES_TO_SALES_EXECUTIVE: 'erp/create/customer/category',
	MAP_SALESMAN_TO_SALESMANAGER: 'erp/map/salesman/to/sm',
	//Orders API's
	UPDATE_IN_PROGRESS_ORDER_IN_ERP: 'erp/store/inprogress/order/to/erp',
	UPDATE_ORDER_STATUS_BILLED_IN_APP: 'erp/update/order/status/billed/mongo',
	DELETE_ORDER: 'erp/order/delete/erp/mongo',
	//Reports API's
	UPDATE_CUSTOMER_PERFORMANCE: 'erp/customer/report/customerperformance',
	UPDATE_SKU_PERFORMANCE: 'erp/customer/report/skuperformance',
	UPDATE_VAN_PERFORMANCE: 'erp/customer/report/vanperformance',
	UPDATE_FOCUSED_PACK: 'erp/customer/focused/pack/report',
	UPDATE_TGT_VS_ACHIEVE: 'erp/sync/target_vs_achieve/report',
	UPDATE_INVOICE_AGAINST_ORDER: 'erp/customer/report/invoiceagainstorder',
	// Others API's
	UPDATE_BANKS: 'erp/create/bank',
	UPDATE_MILK_COLLECTION_IN_ERP: 'erp/update/milk/collection/erp',
};

export const triggerScheduler = async (identifier: string, method: string) => {
	const END_POINT = SCHEDULERS_API[identifier];
	try {
		const repsonse = await Api(END_POINT, {
			method: method,
			data: {},
		});
		return repsonse.data;
	} catch (ex) {
		console.error(ex);
		throw new Error();
	}
};

export const deleteOrder = async (identifier: string, orderId: string) => {
	const END_POINT = SCHEDULERS_API[identifier];
	try {
		const repsonse = await Api(END_POINT, {
			method: 'POST',
			data: { orderId },
		});
		return repsonse.data;
	} catch (ex) {
		console.error(ex);
		throw new Error();
	}
};
