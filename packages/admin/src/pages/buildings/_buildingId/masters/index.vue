<template>
  <v-container class="fill-height">
    <v-layout column justify-center align-center>
      <v-card>
        <v-card-title
          >マンション一覧
          <v-spacer />
          <v-btn fab small class="mb-2" @click="add">
            <v-icon> mdi-plus </v-icon>
          </v-btn>
        </v-card-title>
        <v-data-table
          dense
          :headers="headers"
          :items="buildings"
          :items-per-page="4"
          :sort-desc="true"
          class="elevation-1"
        >
          <template #top>
            <v-dialog v-model="isDialog">
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle(building) }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="6">
                        <v-text-field
                          v-model="building.name"
                          label="マンション名"
                        />
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn @click="close">閉じる</v-btn>
                  <v-btn
                    v-if="isEdit(building)"
                    class="primary"
                    @click="update(building)"
                    >更新する</v-btn
                  >
                  <v-btn v-else class="primary" @click="create(building)"
                    >追加する</v-btn
                  >
                  <v-spacer />
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
          <template #item.actions="{ item }">
            <v-icon small @click="edit(item)"> mdi-pencil </v-icon>
            <v-icon small @click="remove(item)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-layout>
  </v-container>
</template>
<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import { useBuildings } from '~/compositions/buildings'
import { Building } from '~/domain'
export default defineComponent({
  components: {},
  props: {},
  setup() {
    const {
      buildings,
      createBilding,
      updateBilding,
      deleteBilding,
    } = useBuildings()
    const isDialog = ref<boolean>(false)
    const building = ref<Building>(new Building({ name: '' }, ''))

    const edit = (item: Building) => {
      building.value = item
      isDialog.value = true
    }
    const update = (item: Building) => {
      updateBilding(item.id, item)
      close()
    }
    const remove = (item: Building) => {
      deleteBilding(item.id)
    }
    const close = () => {
      isDialog.value = false
    }
    const add = () => {
      building.value = new Building({ name: '' }, '')
      isDialog.value = true
    }
    const create = (item: Building) => {
      createBilding(item)
      close()
    }
    const isEdit = (item: Building) => {
      return !!item.id
    }
    const formTitle = (item: Building) => {
      return isEdit(item) ? 'マンション編集' : 'マンション追加'
    }

    return {
      isDialog,
      buildings,
      headers: [
        { text: 'マンション名', value: 'name' },
        { text: '更新日付', value: 'updatedAt' },
        { text: '作成日付', value: 'createdAt' },
        { text: '操作', value: 'actions' },
      ],
      building,
      edit,
      update,
      remove,
      close,
      add,
      create,
      isEdit,
      formTitle,
    }
  },
})
</script>
