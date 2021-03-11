import { ref, useAsync } from '@nuxtjs/composition-api'
import firebase from 'firebase/app'
import { Building, BuildingRepo } from '~/domain'

/**
 * Use Buildings
 */
export const useBuildings = () => {
  const buildingRepo = new BuildingRepo(firebase.firestore())
  const buildings = ref<Building[]>([])

  const fetchBuildings = async () =>
    (buildings.value = await buildingRepo.getAll())

  useAsync(async () => await fetchBuildings())
  const createBilding = async (item: Building) => {
    await buildingRepo.createItem(item)
    buildings.value = await buildingRepo.getAll()
  }

  const updateBilding = async (id: string, item: Partial<Building>) => {
    await buildingRepo.updateItem(id, item)
    buildings.value = await buildingRepo.getAll()
  }

  const deleteBilding = async (id: string) => {
    await buildingRepo.deleteItem(id)
    buildings.value = await buildingRepo.getAll()
  }

  return {
    buildings,
    createBilding,
    updateBilding,
    deleteBilding,
    fetchBuildings,
  }
}
