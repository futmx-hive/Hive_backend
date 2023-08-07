import { serviceAcc } from "./service.account";
import admin from "firebase-admin";

export function getFirebaseApp() {
	let app;
	try {
		app = admin.initializeApp({
			credential: admin.credential.cert(
				serviceAcc as admin.ServiceAccount,
			),
			storageBucket: "gs://hive-3b806.appspot.com",
		});
	} catch (error) {
		console.log(error);
		app = admin.app();
	}

	return app;
}
