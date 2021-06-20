<template >
  <v-card light class="mt-8 pa-5">
    <v-form v-model="formValidated" ref="form">
      <v-container>
        <div v-if="type === 'add'">
          <h1 class="h1">Open Requirement</h1>
          <p class="caption">
            Please fill in the form below to open a new Requirement.
          </p>
        </div>
        <div v-else-if="type === 'update'">
          <h1 class="h1">Update Your Requirement</h1>
          <p class="caption">
            Please fill in the form below to update your Requirement.
          </p>
        </div>
        <div v-else>
          <h1 class="h1">Requirement Details</h1>
        </div>

        <v-row class="mt-4 pa-2">
          <v-col cols="12">
            <v-autocomplete
              :items="timelineGenerator"
              item-value="value"
              item-text="name"
              label="Timeline (required)"
              name="name"
              v-model="timeline"
              :rules="timelineRules"
              :disabled="ifView"
              required
            ></v-autocomplete>
          </v-col>

          <v-col cols="12">
            <v-autocomplete
              :items="numberOfPositionGenerator"
              item-value="value"
              item-text="name"
              label="Number Of Position (required)"
              name="numberOfPosition"
              v-model="no_of_position"
              :rules="no_of_positionRules"
              :disabled="ifView"
              required
            ></v-autocomplete>
          </v-col>

          <v-col cols="12">
            <v-autocomplete
              multiple
              :items="skill_sets"
              item-value="skill_id"
              item-text="skill_name"
              label="Skill Set (required)"
              name="skill_set"
              v-model="skill_set"
              :rules="skill_setRules"
              :disabled="ifView"
              required
            ></v-autocomplete>
          </v-col>

          <v-col cols="12">
            <v-autocomplete
              :items="experienceGenerator"
              item-value="value"
              item-text="name"
              label="Experience (required)"
              name="experience"
              v-model="experience"
              :rules="experienceRules"
              :disabled="ifView"
              required
            ></v-autocomplete>
          </v-col>

          <v-col cols="12">
            <v-autocomplete
              :items="clients"
              item-value="client_id"
              item-text="client_name"
              label="Client (required)"
              name="client"
              v-model="client"
              :rules="clientRules"
              :disabled="ifView"
              required
            ></v-autocomplete>
          </v-col>

          <v-col cols="12">
            <v-textarea
              name="additional_note"
              label="Additional notes (optional)"
              v-model="additional_note"
              :disabled="ifView"
              :rules="additional_note_rules"
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
      clients: [{ client_id: 0, client_name: '' }],
      skill_sets: [],

      timeline: null,
      no_of_position: null,
      skill_set: null,
      experience: null,
      client: null,
      additional_note: null,
      formValidated: false,

      clientRules: [(v) => !!v || 'Please select a client.'],

      timelineRules: [(v) => !!v || 'Please select timelie.'],
      no_of_positionRules: [(v) => !!v || 'Please enter number of positions.'],
      skill_setRules: [(v) => !!v || 'Please select skill sets.'],
      experienceRules: [(v) => !!v || 'Please select required experience.'],

      additional_note_rules: [
        (v) => {
          if (v) {
            return v.length >= 50
              ? true
              : 'Description must be more than 50 characters';
          }
          return true;
        },
      ],
    };
  },

  computed: {
    isFormValid: () => {},
    ifView() {
      return !this.type;
    },
    timelineGenerator: () => {
      const timeline = [];
      // eslint-disable-next-line no-plusplus
      for (let index = 1; index <= 10; index++) {
        timeline.push({ name: `${index} week`, value: index });
      }
      return timeline;
    },
    numberOfPositionGenerator: () => {
      const numberOfPosition = [];
      // eslint-disable-next-line no-plusplus
      for (let index = 1; index <= 100; index++) {
        numberOfPosition.push({
          name: `${index} position only `,
          value: index,
        });
      }
      return numberOfPosition;
    },
    experienceGenerator: () => {
      const experience = [];
      // eslint-disable-next-line no-plusplus
      for (let index = 1; index <= 50; index++) {
        experience.push({ name: `${index} week`, value: index });
      }
      return experience;
    },
  },

  methods: {
    formSubmit() {
      if (this.type === 'add') {
        // call add api
        axios
          .post(
            '/Requirement',
            {
              timeline: this.timeline,
              number_of_position: this.no_of_position,
              skill_set: this.skill_set,
              experience: this.experience,
              client_id: this.client,
              additional_note: this.additional_note,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$store.state.Auth.userData.token}`,
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
              text: error.response.data.message,
            });
          });
      } else if (this.type === 'update') {
        // call update api

        const RequirementId = this.$route.params.id;
        axios
          .put(
            `/Requirement/${RequirementId}`,
            {
              timeline: this.timeline,
              number_of_position: this.no_of_position,
              skill_set: this.skill_set,
              experience: this.experience,
              client_id: this.client,
              additional_note: this.additional_note,
            },
            {
              headers: {
                Authorization: `Bearer ${this.$store.state.Auth.userData.token}`,
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
              text: error.response.data.message,
            });
          });
      } else {
        // invalid
      }
    },
  },

  created() {
    if (this.type !== 'add') {
      // get Requirement data to view or update

      const RequirementId = this.$route.params.id;
      axios
        .get(`/Requirement/${RequirementId}`, {
          headers: {
            Authorization: `Bearer ${this.$store.state.Auth.userData.token}`,
          },
        })
        .then((response) => {
          this.timeline = response.data.data.timeline;
          this.no_of_position = response.data.data.number_of_position;
          this.skill_set = JSON.parse(response.data.data.skill_set);
          this.experience = response.data.data.experience;
          this.additional_note = response.data.data.additional_note;
          this.client = response.data.data.client_id;
        })
        .catch((error) => {
          this.$swal({
            icon: 'error',
            title: 'Some Error Occured',
            text: error.response.data.message,
          });
        });
    }

    axios
      .get('/client', {
        headers: {
          Authorization: `Bearer ${this.$store.state.Auth.userData.token}`,
        },
      })
      .then((response) => {
        this.clients = this.clients.concat(response.data.data.clientsList);
      })
      .catch((error) => {
        this.$swal({
          icon: 'error',
          title: 'Some Error Occured',
          text: error.response.data.message,
        });
      });

    axios
      .get('/skillset', {
        headers: {
          Authorization: `Bearer ${this.$store.state.Auth.userData.token}`,
        },
      })
      .then((response) => {
        this.skill_sets = this.skill_sets.concat(response.data.data);
      })
      .catch((error) => {
        this.$swal({
          icon: 'error',
          title: 'Some Error Occured',
          text: error.response.data.message,
        });
      });
  },
};
</script>

<style>
</style>
