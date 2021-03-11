import * as functions from "firebase-functions";
import {COLLECTION_NAME} from "@works/core";
export const onCreateUser = functions
    .region('asia-northeast1')
    .auth.user()
    .onCreate(async (user) => {
      console.info(`auth create${user.uid} ${COLLECTION_NAME} !`);
    });
