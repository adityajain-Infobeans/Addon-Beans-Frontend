<template>
  <v-container>
    <h2 class="display-2 mb-6 white--text">Tickets:</h2>

    <!-- <v-layout v-resize="onResize"> -->
    <!-- refer this  https://stackoverflow.com/questions/59081299/vuetify-insert-action-button-in-data-table-and-get-row-data -->
    <div v-resize="onResize">
      <v-data-table
        :headers="this.$store.state.headers"
        :items="ticketsData"
        :items-per-page="10"
        class="elevation-1"
        light
        :hide-default-header="isMobile"
        :class="{ mobile: isMobile }"
      >
        <template v-slot:item="row">
          <tr class="text-center" v-if="!isMobile">
            <td>{{ row.item.ticket_id }}</td>
            <td>{{ row.item.status }}</td>
            <td class="font-weight-bold">
              <v-chip :color="bgColor(row.item.priority)" light>
                {{ row.item.priority }}
              </v-chip>
            </td>
            <td
              class="text-left font-weight-bold"
              @click="detailTicket(row.item.ticket_id)"
            >
              {{
                row.item.subject.length > 140
                  ? row.item.subject.substring(0, 140) + '...'
                  : row.item.subject
              }}
            </td>
            <td>{{ row.item.updated_on }}</td>
            <td>
              <v-btn
                class="blue white--text"
                @click="editTicket(row.item.ticket_id)"
                small
              >
                <v-icon>mdi-pencil</v-icon> Edit</v-btn
              >
            </td>
            <td>
              <v-btn
                class="red white--text"
                @click="deleteTicket(row.item.ticket_id)"
                small
              >
                <v-icon>mdi-delete</v-icon> Delete</v-btn
              >
            </td>
          </tr>
          <tr class="text-center" v-else>
            <td>
              <ul class="flex-content">
                <li
                  class="flex-item"
                  :class="isMobile ? 'my-auto' : ''"
                  data-label="Ticket Id"
                >
                  {{ row.item.ticket_id }}
                </li>
                <li
                  class="flex-item"
                  :class="isMobile ? 'my-auto' : ''"
                  data-label="Ticket Status"
                >
                  {{ row.item.status }}
                </li>
                <li
                  class="font-weight-bold flex-item"
                  data-label="Ticket Priority"
                >
                  <v-chip :color="bgColor(row.item.priority)" light>
                    {{ row.item.priority }}
                  </v-chip>
                </li>

                <li
                  class="text-left font-weight-bold flex-item"
                  data-label="Ticket Subject"
                  @click="detailTicket(row.item.ticket_id)"
                >
                  {{
                    row.item.subject.length > 140
                      ? row.item.subject.substring(0, 140) + '...'
                      : row.item.subject
                  }}
                </li>
                <li class="flex-item" data-label="Ticket Last Updated">
                  {{ row.item.updated_on }}
                </li>
                <li class="flex-item" data-label="Edit Ticket">
                  <v-btn
                    class="blue white--text"
                    @click="editTicket(row.item.ticket_id)"
                    small
                  >
                    <v-icon>mdi-pencil</v-icon> Edit</v-btn
                  >
                </li>
                <li class="flex-item" data-label="Delete Ticket">
                  <v-btn
                    class="red white--text"
                    @click="deleteTicket(row.item.ticket_id)"
                    small
                  >
                    <v-icon>mdi-delete</v-icon> Delete</v-btn
                  >
                </li>
              </ul>
            </td>
          </tr>
        </template>
      </v-data-table>
    </div>
    <!-- </v-layout> -->
  </v-container>
</template>

<script>
const axios = require('axios');

export default {
  data: () => ({
    isMobile: false,
    ticketsData: [],
  }),

  methods: {
    editTicket(id) {
      this.$router.push({ name: 'Update Ticket', params: { id } });
    },
    deleteTicket(id) {
      console.log(id);
    },
    detailTicket(id) {
      this.$router.push({ name: 'View Ticket', params: { id } });
    },

    bgColor(priority) {
      if (priority === 'P1') {
        return 'red';
      }
      if (priority === 'P2') {
        return 'orange';
      }
      if (priority === 'P3') {
        return 'yellow';
      }
      return 'green';
    },

    onResize() {
      if (window.innerWidth < 650) this.isMobile = true;
      else this.isMobile = false;
    },
  },

  created() {
    axios
      .get('/ticket', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        this.ticketsData = response.data.data.ticketsList;
        console.log(response.data.data.ticketsList);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
.flex-content {
  padding: 1.5rem 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.flex-item {
  padding: 0.5rem;
}
</style>
