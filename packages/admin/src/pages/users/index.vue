<template>
  <v-container :class="$style.users">
    <!-- ユーザー招待 -->

    <v-row>
      <v-col cols="4"> <h3>Manage Access</h3> </v-col>
      <v-spacer></v-spacer>
      <v-col cols="auto">
        <!-- dialog -->
        <v-dialog v-model="dialog" min-width="500" max-width="800">
          <template #activator="{ on }">
            <v-btn depressed color="success" v-on="on"> invite people </v-btn>
          </template>
          <c-users-invitation @close="dialog = false" @refetch="refetchUsers" />
        </v-dialog>
      </v-col>
    </v-row>
    <!-- ユーザーリスト -->
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            ユーザー検索
            <v-spacer></v-spacer>
            <v-text-field
              v-model="searchQuery"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              @keydown.enter="search"
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="usersWithBuilding"
            hide-default-footer
            multi-sort
          >
            <template #item.createdAt="{ item }">
              {{ formatDate(item.createdAt) }}
            </template>
            <template #item.role="{ item }">
              <v-chip :color="roleColor(item.role)" small>
                {{ item.role }}
              </v-chip>
            </template>
            <template #item.actions="{ item }">
              <v-icon small @click="onDelete(item)"> mdi-delete </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { formatDate, Role } from '@works/core'
import { useUsersWithBuilding, deleteUser } from '~/compositions/users'
import { User } from '~/domain'
import { useSnackbarMessage } from '~/compositions/snackbar'

interface TableHeader {
  text: string
  value: string
  align?: 'start' | 'end' | 'center' | 'space-between' | ''
  sortable?: boolean
}
export default defineComponent({
  components: {},
  props: {},
  setup() {
    const invite = () => {}
    const headers: TableHeader[] = [
      { text: 'email', value: 'email' },
      { text: 'マンション', value: 'building.name' },
      { text: '部屋', value: 'room.name' },
      { text: '作成日', value: 'createdAt' },
      { text: '権限', value: 'role' },
      { text: 'Actions', value: 'actions', sortable: false },
    ]
    const { setMessage } = useSnackbarMessage()
    const { usersWithBuilding, fetchUsersWithBuilding } = useUsersWithBuilding()
    const dialog = false

    const searchQuery = ref<string>('')

    const refetchUsers = async () => await fetchUsersWithBuilding()

    const roleColor = (role: Role) => {
      switch (role) {
        case 'systemAdmin':
          return 'accent'
        case 'owner':
          return 'primary'
        case 'user':
          return 'info'
        default: {
          return 'primary'
        }
      }
    }

    const search = () => {
      console.log(searchQuery)
    }

    const onDelete = async (user: User) => {
      try {
        if (confirm('削除しますか？')) {
          await deleteUser(user)
        }
      } catch (err) {
        setMessage({ level: 'error', content: err.message ?? '' })
      } finally {
        await refetchUsers()
      }
    }

    return {
      invite,
      dialog,
      headers,
      searchQuery,
      usersWithBuilding,
      //
      onDelete,
      refetchUsers,
      formatDate,
      roleColor,
      search,
    }
  },
})
</script>
<style lang="scss" module>
.users {
  margin-top: 2rem;
}
</style>
