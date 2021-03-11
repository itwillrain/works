import { useAsync, ref } from '@nuxtjs/composition-api'
import firebase from 'firebase'
import {
  DeleteUserDto,
  RegisterUserDto,
  IUserWIthBuilding,
} from '@works/core'
import { User, UserRepo } from '~/domain'

export interface Invitation {
  selectedManageBuildings: string[]
  selectedBuilding: string
  user: User
  password: string
  isValid: boolean
  isVisible: boolean
}

/**
 * Users
 * @returns
 */
export const useUsers = () => {
  const userRepo = new UserRepo(firebase.firestore())
  const users = ref<User[]>([])

  const fetchUsers = async () => {
    return (users.value = await userRepo.getList())
  }
  useAsync(async () => (users.value = await fetchUsers()))
  return { users, fetchUsers }
}

/**
 * UsersWithBuilding
 * @returns
 */
export const useUsersWithBuilding = () => {
  const userRepo = new UserRepo(firebase.firestore())
  const usersWithBuilding = ref<IUserWIthBuilding[]>([])

  const fetchUsersWithBuilding = async () => {
    return (usersWithBuilding.value = await userRepo.getUsersWithBuilding())
  }

  const findByEmail = () => {
    userRepo.findByEmail()
  }

  useAsync(
    async () => (usersWithBuilding.value = await fetchUsersWithBuilding())
  )
  return { usersWithBuilding, fetchUsersWithBuilding }
}

/**
 *  ユーザー削除
 * @param {User} user
 */
export const deleteUser = async (user: User) => {
  const data = new DeleteUserDto({ uid: user.id })
  const deleteUser = firebase
    .functions()
    .httpsCallable('v1-callable-users-deleteUser')
  await deleteUser(data)
}

/**
 * ユーザー登録
 * @param {User} user
 */
export const registerUser = async (invitation: Invitation) => {
  const data = new RegisterUserDto({
    user: invitation.user,
    buildingId: invitation.selectedBuilding,
    manageBuildingIds: invitation.selectedManageBuildings,
    password: invitation.password,
  })
  const register = firebase
    .functions()
    .httpsCallable('v1-callable-users-register')
  await register(data)
}
