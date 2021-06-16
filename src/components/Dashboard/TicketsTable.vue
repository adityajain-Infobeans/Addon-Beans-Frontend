<template>
  <v-container>
    <h2 class="display-2 mb-6 white--text">Tickets:</h2>

    <template>
      <v-expansion-panels flat>
        <v-expansion-panel v-for="(item, i) in 1" :key="i">
          <v-expansion-panel-header>
            <h2>Filters</h2>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row class="px-5">
              <v-col cols="4">
                <v-checkbox
                  v-model="showClosed"
                  label="Show Closed Ticket"
                ></v-checkbox>
              </v-col>
              <v-col cols="4" v-if="isHR">
                <v-autocomplete
                  v-model="employee"
                  :items="employeeList"
                  item-value="emp_id"
                  item-text="emp_name"
                  label="Search by employee"
                ></v-autocomplete>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </template>

    <!-- refer this  https://stackoverflow.com/questions/59081299/vuetify-insert-action-button-in-data-table-and-get-row-data -->
    <div v-resize="onResize" class="pb-12">
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
            <td>{{ row.item.status == 1 ? 'Open' : 'Closed' }}</td>
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
                :disabled="row.item.status == 1 ? false : true"
                small
              >
                <v-icon>mdi-pencil</v-icon> Edit</v-btn
              >
            </td>
            <td>
              <v-btn
                class="red white--text"
                @click="confirmDelete(row.item.ticket_id)"
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
                  {{ row.item.status == 1 ? 'Open' : 'Closed' }}
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
                    :disabled="row.item.status == 1 ? false : true"
                    small
                  >
                    <v-icon>mdi-pencil</v-icon> Edit</v-btn
                  >
                </li>
                <li class="flex-item" data-label="Delete Ticket">
                  <v-btn
                    class="red white--text"
                    @click="confirmDelete(row.item.ticket_id)"
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
  </v-container>
</template>

<script>
const axios = require('axios');

export default {
  data: () => ({
    isMobile: false,
    employeeList: [],
    employee: null,
    showClosed: false,
  }),

  methods: {
    editTicket(id) {
      this.$router.push({ name: 'Update Ticket', params: { id } });
    },
    confirmDelete(id) {
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`/ticket/${id}`, {
              headers: {
                Authorization: `Bearer ${this.$store.state.Auth.userData.token}`,
              },
            })
            .then((response) => {
              this.$store.dispatch('deleteTicker', id);
              this.$swal({
                icon: 'success',
                title: 'Success',
                text: response.data.message,
              });
            })
            .catch((error) => {
              this.$swal({
                icon: 'error',
                title: 'Some Error Occured',
                text: error.data.message,
              });
            });
        }
      });
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
  computed: {
    isHR() {
      return this.$store.state.Auth.userData.is_hr;
    },
    ticketsData() {
      let { ticketsData } = this.$store.state.Ticket;
      if (!this.showClosed && this.employee) {
        ticketsData = this.$store.state.Ticket.ticketsData.filter((ticket) => {
          if (ticket.status !== '2' && ticket.emp_id === this.employee) {
            return true;
          }
          return false;
        });
      } else if (this.employee) {
        ticketsData = this.$store.state.Ticket.ticketsData.filter(
          (ticket) => ticket.emp_id === this.employee,
        );
      } else if (!this.showClosed) {
        ticketsData = this.$store.state.Ticket.ticketsData.filter(
          (ticket) => ticket.status !== '2',
        );
      }
      return ticketsData;
    },
  },

  created() {
    axios
      .get('/ticket', {
        headers: {
          Authorization: `Bearer ${this.$store.state.Auth.userData.token}`,
        },
      })
      .then((response) => {
        this.$store.dispatch('setTicker', response.data.data.ticketsList);
      })
      .catch((error) => {
        this.$swal({
          icon: 'error',
          title: 'Some Error Occured',
          text: error.data.message,
        });
      });

    if (this.isHR) {
      axios
        .get('/employee')
        .then((response) => {
          this.employeeList = response.data.data.employeeList;
        })
        .catch((error) => {
          this.$swal({
            icon: 'error',
            title: 'Some Error Occured',
            text: error.data.message,
          });
        });
    }
  },
  beforeDestroy() {
    this.$store.dispatch('clearTickets');
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

<style>
.v-data-table-header > tr:nth-child(1) {
  background-color: #000000;
  color: #ffffff;
}
th.text-center > span {
  color: #ffffff;
  font-size: 1rem;
}
</style>
