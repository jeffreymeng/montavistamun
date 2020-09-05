// the below firebase is used only for the type, so typescript removes it before gatsby compiles
// thus, we can use it as a type even though firebase uses `window` which gatsby doesnt allow in ssr
// the below lazy import of firebase is still necessary.
import * as FirebaseType from "firebase";
import useIsMounted from "ismounted";
import React, { useState } from "react";
import firebaseConfig from "../../firebase-config";

export default function useFirebase(): null | typeof FirebaseType {
	const isMounted = useIsMounted();
	const [firebase, setFirebase] = useState(null);
	React.useEffect(() => {
		if (typeof window == "undefined") {
			return;
		}
		(async (): Promise<void> => {
			// import firebase app
			const firebaseApp: any = await import("firebase/app");
			//
			await Promise.all([
				import("firebase/auth"),
				import("firebase/firestore"),
				import("firebase/functions"),
			]);
			// lazy load firebase in an async IIFE
			if (firebaseApp.apps.length === 0) {
				firebaseApp.initializeApp(firebaseConfig);
			}
			if (isMounted.current) {
				setFirebase(firebaseApp);
			}
		})();
	}, [firebaseConfig]);
	return firebase;
}
