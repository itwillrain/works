<template>
  <v-card>
    <v-form ref="form" v-model="isValid" @submit.prevent="submit">
      <v-card-title class="headline"> 管理者招待する </v-card-title>
      <v-card-text>
        <v-row>
          <v-col class="pt-0" cols="12">
            <!-- Roleの設定 -->
            <v-radio-group v-model="user.role" hide-details>
              <v-radio
                v-for="(role, idx) in rolelist"
                :key="idx"
                :rules="[rules.required]"
                :label="role.name"
                :value="role.value"
              >
                <template #label>
                  <div>
                    <p class="primary--text ma-0">
                      <strong>{{ role.name }}</strong>
                    </p>
                    <span>{{ role.desc }}</span>
                  </div>
                </template>
              </v-radio>
            </v-radio-group>
          </v-col>
          <v-col
            v-if="user && user.role && user.role === 'owner'"
            class="pt-0"
            cols="12"
          >
            <!-- 管理対象のマンションIDを指定 -->
            <v-select
              v-model="selectedManageBuildings"
              :items="buildings"
              :rules="[ownerRequired]"
              label="管理マンション"
              item-text="name"
              item-value="id"
              hide-details
              multiple
              outlined
              dense
            ></v-select>
          </v-col>

          <v-col class="pb-0" cols="6">
            <v-text-field
              v-model.trim="user.email"
              :rules="[rules.email, rules.required]"
              label="email"
              dense
              outlined
              clearable
            />
          </v-col>
          <v-col class="pb-0" cols="6">
            <v-text-field
              v-model.trim="password"
              :rules="[rules.required]"
              :type="isVisible ? 'text' : 'password'"
              outlined
              dense
              label="Password"
              :append-icon="isVisible ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="isVisible = !isVisible"
            />
          </v-col>
          <v-col v-if="user.role === 'user'" cols="6" class="pb-0">
            <v-text-field
              v-model.trim="user.room.name"
              label="部屋番号"
              dense
              :rules="[userRequired]"
              outlined
              clearable
            >
            </v-text-field>
          </v-col>
          <v-col v-if="user.role === 'user'" cols="6" class="pb-0">
            <v-select
              v-model="selectedBuilding"
              :items="buildings"
              item-text="name"
              item-value="id"
              label="居住マンション"
              outlined
              dense
              persistent-hint
              single-line
            ></v-select>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" depressed type="submit" :disabled="!isValid">
          招待する
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  toRefs,
} from '@nuxtjs/composition-api'
import { RULES, Role, DEFAULT_ERROR_MESSAGE } from '@works/core'
import { useSnackbarMessage } from '~/compositions/snackbar'
import { User } from '~/domain'
import { useBuildings } from '~/compositions/buildings'
import { Invitation, registerUser } from '~/compositions/users'
interface UserRoleList {
  name: string
  value: Role
  desc: string
}

export default defineComponent({
  components: {},
  props: {},
  setup(_, { emit }) {
    const { setMessage } = useSnackbarMessage()
    const { fetchBuildings, buildings } = useBuildings()
    const form = ref<any>()

    const invitation = reactive<Invitation>({
      selectedManageBuildings: [],
      selectedBuilding: '',
      password: '',
      user: new User({}, ''),
      isValid: false,
      isVisible: false,
    })

    const rolelist: UserRoleList[] = [
      {
        name: 'システム管理者',
        value: 'systemAdmin',
        desc: '全マンションの管理権限',
      },
      {
        name: 'マンションオーナ−',
        value: 'owner',
        desc: '各マンションごとの管理者権限',
      },
      {
        name: 'マンションユーザー',
        value: 'user',
        desc: '各マンションのユーザー追加',
      },
    ]

    onMounted(async () => await fetchBuildings())

    const userRequired = computed(
      () => invitation.user.role === 'user' && RULES.required
    )

    const ownerRequired = computed(() => (v: any) =>
      invitation.user.role === 'owner' && RULES.size(1, v)
    )

    /**
     * Submit
     */
    const submit = async () => {
      try {
        await registerUser(invitation)
        setMessage({ level: 'info', content: '追加しました。' })
        form.value.reset()
      } catch (e) {
        showErrorMessage(e)
      } finally {
        emit('close')
        emit('refetch')
      }
    }

    /**
     * エラーメッセージ表示
     */
    const showErrorMessage = (e: any) => {
      switch (e.code) {
        case 'already-exists':
          return setMessage({
            level: 'error',
            content: 'すでに登録済みのユーザーが含まれています',
          })
        default:
          return setMessage({ level: 'error', content: DEFAULT_ERROR_MESSAGE })
      }
    }

    return {
      rolelist,
      ...toRefs(invitation),
      rules: RULES,
      submit,
      form,
      buildings,
      userRequired,
      ownerRequired,
    }
  },
})
</script>
