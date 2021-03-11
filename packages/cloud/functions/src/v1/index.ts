import * as admin from "firebase-admin";
admin.initializeApp();

// import * as Firestore from './firestore';
import * as Callable from './callable';
import * as Auth from "./auth";
import * as Pubsub from "./pubsub";


// export const firestore = { ...Firestore };
export const callable = { ...Callable };
export const auth = {...Auth};
export const pubsub = {...Pubsub};
