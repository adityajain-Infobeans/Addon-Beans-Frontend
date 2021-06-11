<template >
  <v-card light class="mt-8 pa-5">
    <v-form v-model="formValidated" ref="form">
      <v-container>
        <div v-if="type === 'add'">
          <h1 class="h1">Open Support Ticket</h1>
          <p class="caption">
            Please fill in the form below to open a new ticket.
          </p>
        </div>
        <div v-else-if="type === 'update'">
          <h1 class="h1">Update Your Ticket</h1>
          <p class="caption">
            Please fill in the form below to update your ticket.
          </p>
        </div>
        <div v-else>
          <h1 class="h1">Your Ticket</h1>
        </div>

        <v-row class="mt-4 pa-2">
          <v-col cols="12">
            <v-text-field
              v-model="subject"
              label="Subject"
              name="subject"
              :rules="subjectRules"
              :disabled="ifView"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-select
              :items="priorities"
              item-value="value"
              item-text="priority"
              label="Priority"
              name="priority"
              v-model="priority"
              :rules="priorityRules"
              :disabled="ifView"
              required
            ></v-select>
          </v-col>

          <v-col cols="12">
            <v-text-field
              name="contactNo"
              v-model="contactNumber"
              label="Contact Number"
              :disabled="ifView"
              :rules="contactNumberRules"
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-select
              :items="clients"
              item-value="client_id"
              item-text="client_name"
              label="Client"
              name="client"
              v-model="client"
              :rules="clientRules"
              :disabled="ifView"
              required
            ></v-select>
          </v-col>

          <v-col cols="12">
            <v-textarea
              name="description"
              label="Description"
              v-model="description"
              :disabled="ifView"
              :rules="descriptionRules"
            ></v-textarea>
          </v-col>

          <v-col cols="12">
            <v-btn
              block
              color="primary"
              dark
              v-if="!ifView"
              :disabled="!formValidated"
              @click="formSubmit"
              >Submit</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
const axios = require('axios');

export default {
  props: ['type'],
  data() {
    return {
      priorities: this.$store.state.priorities,
      clients: [{ client_id: 0, client_name: '' }],

      client: null,
      subject: null,
      priority: null,
      contactNumber: null,
      description: null,
      formValidated: false,

      subjectRules: [
        (v) => !!v || 'Subject is required',
        (v) =>
          // eslint-disable-next-line implicit-arrow-linebreak
          (v && v.length >= 10) || 'Subject must be more than 10 characters',
      ],

      priorityRules: [(v) => !!v || 'Please select a priority level.'],
      clientRules: [(v) => !!v || 'Please select a client.'],

      contactNumberRules: [
        (v) => {
          if (v) {
            if (v.length !== 10) {
              return 'Invalid length';
            }
            if (!/^[6-9]\d{9}$/.test(v)) {
              return 'Invalid mobile number';
            }
            return true;
          }
          return true;
        },
      ],

      descriptionRules: [
        (v) => !!v || 'Please write a valid description.',
        (v) =>
          // eslint-disable-next-line
          (v && v.length >= 50) ||
          'Description must be more than 50 characters',
      ],
    };
  },

  computed: {
    isFormValid: () => {},
    ifView() {
      return !this.type;
    },
  },

  methods: {
    formSubmit() {
      if (this.type === 'add') {
        // call add api
        axios
          .post(
            '/ticket',
            {
              priority: this.priority,
              contact: this.contactNumber,
              subject: this.subject,
              description: this.description,
              client_id: this.client,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$store.state.userData.token}`,
              },
            },
          )
          .then((response) => {
            this.$refs.form.reset();
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
      } else if (this.type === 'update') {
        // call update api

        const ticketId = this.$route.params.id;
        axios
          .put(
            `/ticket/${ticketId}`,
            {
              priority: this.priority,
              contact: this.contactNumber,
              subject: this.subject,
              description: this.description,
              client_id: this.client,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$store.state.userData.token}`,
              },
            },
          )
          .then((response) => {
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
      } else {
        // invalid
      }
    },
  },

  created() {
    if (this.type !== 'add') {
      // get ticket data to view or update

      const ticketId = this.$route.params.id;
      axios
        .get(`/ticket/${ticketId}`, {
          headers: {
            Authorization: `Bearer ${this.$store.state.userData.token}`,
          },
        })
        .then((response) => {
          this.status = response.data.data.status;
          this.priority = response.data.data.priority;
          this.contactNumber = response.data.data.contact;
          this.subject = response.data.data.subject;
          this.description = response.data.data.description;
          this.client = response.data.data.client_id;
        })
        .catch((error) => {
          this.$swal({
            icon: 'error',
            title: 'Some Error Occured',
            text: error.data.message,
          });
        });
    }

    axios
      .get('/client', {
        headers: {
          Authorization: `Bearer ${this.$store.state.userData.token}`,
        },
      })
      .then((response) => {
        this.clients = this.clients.concat(response.data.data.clientsList);
      })
      .catch((error) => {
        this.$swal({
          icon: 'error',
          title: 'Some Error Occured',
          text: error.data.message,
        });
      });
  },
};
</script>

<style>
</style>
