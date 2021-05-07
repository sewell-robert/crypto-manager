<template>
  <div>
    <v-container>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">
                Date
              </th>
              <th class="text-left">
                Symbol
              </th>
              <th class="text-left">
                USD
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in investments"
              :key="item.name"
            >
              <td>{{ item.entryDt }}</td>
              <td>{{ item.assetSym }}</td>
              <td>{{ item.amountUSD }}</td>
              <td>
                <v-btn
                  icon
                  tile
                  color="secondary"
                  elevation="2"
                  v-on:click="deleteRecord(item.id)"
                >
                  <v-icon>mdi-trash-can-outline</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>

    <br /><br /><br />
  </div>
</template>

<script>
import CreateRecordService from '@/api-services/CreateRecord.Service'

export default {
  name: 'CreateRecord',
  props: ['investments'],
  methods: {
    deleteRecord (id) {
      CreateRecordService.deleteRecord(id).then(response => {
        if (response.data == true) {
          this.$emit('loadInvestments');
        }
      })
    }
  },
  data () {
    return {
      // investments: Array
    }
  }
}
</script>

<style scoped>

</style>
