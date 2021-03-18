import * as functions from 'firebase-functions'
// FIXME: importにするとhas no construct signatures errorがでる
const firestore = require('@google-cloud/firestore')
const client = new firestore.v1.FirestoreAdminClient()

export const backupFirestoreToStorage = functions
  .region(functions.config().locale.region)
  .pubsub.schedule('0 3 * * *')
  .timeZone(functions.config().locale.timezone)
  .onRun(() => {
    const projectId = process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT
    const databaseName = client.databasePath(projectId, '(default)')
    const bucket = functions.config().backup.gs

    return client
      .exportDocuments({
        name: databaseName,
        outputUriPrefix: bucket,
        collectionIds: [],
      })
      .then((responses: any) => {
        const response = responses[0]
        console.log(`Operation Name: ${response['name']}`)
      })
      .catch((err: any) => {
        console.error(err)
        throw new Error('Export operation failed')
      })
  })
