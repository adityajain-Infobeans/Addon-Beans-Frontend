<template>
  <v-container>
    <h2 class="display-2 mb-6 white--text">Requirements:</h2>

    <template>
      <v-expansion-panels flat>
        <v-expansion-panel v-for="(item, i) in 1" :key="i">
          <v-expansion-panel-header>
            <h2>Filters</h2>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row class="px-5">
              <v-col cols="4">
                <v-checkbox v-model="showClosed" label="Show Closed Requirement"></v-checkbox>
              </v-col>
              <v-col cols="4" v-if="isHR">
                <v-autocomplete
                  v-model="employee"
                  :items="employeeList"
                  item-value="emp_id"
                  item-text="emp_name"
                  label="Search by Manager"
                ></v-autocomplete>
              </v-col>
              <v-col cols="4">
                <v-autocomplete
                  v-model="client"
                  :items="clientsList"
                  item-value="client_id"
                  item-text="client_name"
                  label="Search by Client"
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
        :headers="this.$store.state.Requirement.headers"
        :items="RequirementsData"
        :items-per-page="10"
        class="elevation-1"
        light
        :hide-default-header="isMobile"
        :class="{ mobile: isMobile }"
      >
        <template v-slot:item="row">
          <tr class="text-center" v-if="!isMobile">
            <td>{{ row.item.requirement_id }}</td>
            <td>{{ row.item.status == 1 ? 'Open' : 'Closed' }}</td>
            <td class="font-weight-medium">
              <v-chip :color="bgColor(row.item.timeline, row.item.status)" light>
                {{ row.item.status === 2 ? 'resolved' : `${row.item.timeline} week` }}
              </v-chip>
            </td>
            <td
              class="text-left font-weight-bold"
              @click="detailRequirement(row.item.requirement_id)"
            >
              {{
                generateSubject(
                  row.item.number_of_position,
                  row.item.experience,
                  row.item.skill_set,
                )
              }}
            </td>
            <td>{{ row.item.updated_on }}</td>
            <td>{{ clientName(row.item.client_id) }}</td>
            <td>
              <v-btn
                class="blue white--text"
                @click="editRequirement(row.item.requirement_id)"
                :disabled="row.item.status == 1 ? false : true"
                small
              >
                <v-icon>mdi-pencil</v-icon> Edit</v-btn
              >
            </td>
            <td>
              <v-btn class="red white--text" @click="confirmDelete(row.item.requirement_id)" small>
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
                  data-label="Requirement Id"
                >
                  {{ row.item.requirement_id }}
                </li>
                <li
                  class="flex-item"
                  :class="isMobile ? 'my-auto' : ''"
                  data-label="Requirement Status"
                >
                  {{ row.item.status == 1 ? 'Open' : 'Closed' }}
                </li>
                <li class="font-weight-bold flex-item" data-label="Requirement Timeline">
                  <v-chip :color="bgColor(row.item.timeline, row.item.status)">
                    {{ row.item.status === 2 ? 'resolved' : `${row.item.timeline} week` }}
                  </v-chip>
                </li>

                <li
                  class="text-left flex-item font-weight-bold"
                  data-label="Requirement Subject"
                  @click="detailRequirement(row.item.requirement_id)"
                >
                  {{ generateSubject(row.item.number_of_position, row.item.skill_set) }}
                </li>
                <li class="flex-item" data-label="Requirement Last Updated">
                  {{ row.item.updated_on }}
                </li>
                <li class="flex-item" data-label="Client id">
                  {{ clientName(row.item.client_id) }}
                </li>
                <li class="flex-item" data-label="Edit Requirement">
                  <v-btn
                    class="blue white--text"
                    @click="editRequirement(row.item.requirement_id)"
                    :disabled="row.item.status == 1 ? false : true"
                    small
                  >
                    <v-icon>mdi-pencil</v-icon> Edit</v-btn
                  >
                </li>
                <li class="flex-item" data-label="Delete Requirement">
                  <v-btn
                    class="red white--text"
                    @click="confirmDelete(row.item.requirement_id)"
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
const {
  getRequirementData,
  getSkillsetData,
  getClientsData,
  deleteRequirementData,
  getEmployeesData,
} = require('@/services/axios/Table/RequirementsTable');

export default {
  data: () => ({
    isMobile: false,
    employeeList: [{ emp_id: 0, emp_name: '' }],
    clientsList: [{ client_id: 0, client_name: '' }],
    employee: null,
    client: null,
    showClosed: false,
    skillset: [],
  }),

  methods: {
    editRequirement(id) {
      this.$router.push({ name: 'Update Requirement', params: { id } });
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
          deleteRequirementData(this.$store.state.Auth.userData.token)
            .then((response) => {
              this.$store.dispatch('Requirement/deleteRequirement', id);
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
                text: error.response.data.message,
              });
            });
        }
      });
    },
    detailRequirement(id) {
      this.$router.push({ name: 'View Requirement', params: { id } });
    },

    bgColor(timeline, status) {
      if (status === 2) {
        return 'green';
      }
      if (timeline <= 1) {
        return 'red';
      }
      if (timeline <= 5) {
        return 'orange';
      }
      if (timeline <= 10) {
        return 'grey';
      }
      return 'green';
    },

    onResize() {
      if (window.innerWidth < 650) this.isMobile = true;
      else this.isMobile = false;
    },

    generateSubject(noOfPosition, yOe, skillSet) {
      let skills = '';
      JSON.parse(skillSet).forEach((skill, index) => {
        this.skillset.filter((filterSkill) => {
          if (filterSkill.skill_id === skill) {
            skills =
              index === JSON.parse(skillSet).length - 1
                ? `${skills + filterSkill.skill_name}`
                : `${skills + filterSkill.skill_name}, `;
            return true;
          }
          return false;
        });
      });

      return `${yOe}+ years experience,  ${noOfPosition} positions for ${skills} `;
    },

    clientName(clientId) {
      const client = () => this.clientsList.filter((clients) => clients.client_id === clientId);
      if (client()[0]) {
        return client()[0].client_name;
      }
      return '';
    },
  },
  computed: {
    isHR() {
      return this.$store.state.Auth.userData.is_hr;
    },
    RequirementsData() {
      let requirementsData = this.$store.state.Requirement.RequirementsData;
      if (!this.showClosed && this.employee && this.client) {
        requirementsData = this.$store.state.Requirement.RequirementsData.filter((Requirement) => {
          if (
            Requirement.status !== '2' &&
            Requirement.emp_id === this.employee &&
            Requirement.client_id === this.client
          ) {
            return true;
          }
          return false;
        });
      } else if (this.employee && this.client) {
        requirementsData = this.$store.state.Requirement.RequirementsData.filter((Requirement) => {
          if (Requirement.emp_id === this.employee && Requirement.client_id === this.client) {
            return true;
          }
          return false;
        });
      } else if (!this.showClosed && this.employee) {
        requirementsData = this.$store.state.Requirement.RequirementsData.filter((Requirement) => {
          if (Requirement.status !== 2 && Requirement.emp_id === this.employee) {
            return true;
          }
          return false;
        });
      } else if (!this.showClosed && this.client) {
        requirementsData = this.$store.state.Requirement.RequirementsData.filter((Requirement) => {
          if (Requirement.status !== 2 && Requirement.client_id === this.client) {
            return true;
          }
          return false;
        });
      } else if (this.client) {
        requirementsData = this.$store.state.Requirement.RequirementsData.filter(
          (Requirement) => Requirement.client_id === this.client,
        );
      } else if (this.employee) {
        requirementsData = this.$store.state.Requirement.RequirementsData.filter(
          (Requirement) => Requirement.emp_id === this.employee,
        );
      } else if (!this.showClosed) {
        requirementsData = this.$store.state.Requirement.RequirementsData.filter(
          (Requirement) => Requirement.status !== 2,
        );
      }
      return requirementsData;
    },
  },

  created() {
    getRequirementData(this.$store.state.Auth.userData.token)
      .then((response) => {
        this.$store.dispatch('Requirement/setRequirement', response.data.data.requirementsList);
      })
      .catch((error) => {
        this.$swal({
          icon: 'error',
          title: 'Some Error Occured',
          text: error.response.data.message,
        });
      });

    getSkillsetData(this.$store.state.Auth.userData.token)
      .then((response) => {
        this.skillset = response.data.data;
      })
      .catch((error) => {
        this.$swal({
          icon: 'error',
          title: 'Some Error Occured',
          text: error.response.data.message,
        });
      });

    getClientsData(this.$store.state.Auth.userData.token)
      .then((response) => {
        this.clientsList = this.clientsList.concat(response.data.data.clientsList);
      })
      .catch((error) => {
        this.$swal({
          icon: 'error',
          title: 'Some Error Occured',
          text: error.response.data.message,
        });
      });

    if (this.isHR) {
      getEmployeesData(this.$store.state.Auth.userData.token)
        .then((response) => {
          this.employeeList = this.employeeList.concat(response.data.data.employeeList);
        })
        .catch((error) => {
          this.$swal({
            icon: 'error',
            title: 'Some Error Occured',
            text: error.response.data.message,
          });
        });
    }
  },
  beforeDestroy() {
    this.$store.dispatch('Requirement/clearRequirements');
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
.v-data-table-header__icon {
  color: #ffffff !important;
}
</style>
