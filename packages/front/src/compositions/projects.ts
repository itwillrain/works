import firebase from 'firebase/app'
import { ref, useAsync, useRoute } from '@nuxtjs/composition-api'
import { ProjectRepo, Project } from '~/domain'
/**
 * Pickup Project
 * @returns
 */
export const usePickupProjects = () => {
  const projectRepo = new ProjectRepo(firebase.firestore())
  const pickupProjects = ref<Project[]>([])

  const fetchPickupProjects = async () =>
    (pickupProjects.value = await projectRepo.getPickupProjects())

  useAsync(async () => (pickupProjects.value = await fetchPickupProjects()))
  return { pickupProjects, fetchPickupProjects }
}

export const useProject = () => {
  const route = useRoute()
  const { id } = route.value.params
  const projectRepo = new ProjectRepo(firebase.firestore())
  const project = ref<Project | undefined>(new Project({}, ''))

  const fetchProject = async (id: string) =>
    (project.value = await projectRepo.getProject(id))
  useAsync(async () => (project.value = await fetchProject(id)))
  return { project, fetchProject }
}
