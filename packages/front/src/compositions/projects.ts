import firebase from 'firebase/app'
import { ref, useAsync, useRoute, reactive, toRefs } from '@nuxtjs/composition-api'
import { StateChanger } from 'vue-infinite-loading'
import { ProjectRepo, Project } from '~/domain'

/**
 * Project list
 * @returns
 */
export const useProjects = () => {
  const projectRepo = new ProjectRepo(firebase.firestore())

  const projectSet = reactive<{
    hasMore: boolean
    projects: Project[]
    last: Project | undefined
  }>({
    hasMore: false,
    projects: [],
    last: undefined,
  })

  const fetchProjects = async () => {
    const { hasMore: _hasMore, projects: _projects, last: _last } = projectSet.last ? await projectRepo.getProjectsWithHasMore(projectSet.last) : await projectRepo.getProjectsWithHasMore()

    projectSet.hasMore = _hasMore
    projectSet.projects = [...projectSet.projects, ..._projects]
    projectSet.last = _last
  }

  const infiniteHandler = async ($state: StateChanger) => {
    await fetchProjects()
    if (projectSet.hasMore) {
      $state.loaded()
    } else {
      $state.complete()
    }
  }
  return { ...toRefs(projectSet), fetchProjects, infiniteHandler }
}

/**
 * Pickup Project
 * @returns
 */
export const usePickupProjects = () => {
  const projectRepo = new ProjectRepo(firebase.firestore())
  const pickupProjects = ref<Project[]>([])

  const fetchPickupProjects = async () => await projectRepo.getPickupProjects()

  useAsync(async () => (pickupProjects.value = await fetchPickupProjects()))
  return { pickupProjects, fetchPickupProjects }
}

/**
 * Project
 * @returns
 */
export const useProject = () => {
  const route = useRoute()
  const { id } = route.value.params
  const projectRepo = new ProjectRepo(firebase.firestore())
  const project = ref<Project | undefined>(new Project({}, ''))

  const fetchProject = async (id: string) => (project.value = await projectRepo.getProject(id))
  useAsync(async () => (project.value = await fetchProject(id)))
  return { project, fetchProject }
}
