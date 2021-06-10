<template >
  <v-container class="mt-5" v-if="currentStatus == 1 ? true : false">
    <v-card light class="px-10 pb-10">
      <v-row v-if="isHR" class="mb-5">
        <v-col cols="12" sm="3" class="">
          <v-select
            :items="statuses"
            item-value="value"
            item-text="status"
            label="Status"
            name="status"
            v-model="status"
            :rules="statusRules"
            required
          ></v-select>
        </v-col>

        <v-col cols="12" sm="3" class="my-auto">
          <v-btn
            block
            color="primary"
            dark
            :disabled="!statusChanged"
            @click="submitStatusChanged"
            >Change Status</v-btn
          >
        </v-col>

        <v-col cols="12" sm="3" class="">
          <v-select
            :items="priorities"
            item-value="value"
            item-text="priority"
            label="Priority"
            name="priority"
            v-model="priority"
            :rules="priorityRules"
            required
          ></v-select>
        </v-col>

        <v-col cols="12" sm="3" class="my-auto">
          <v-btn
            block
            color="primary"
            dark
            :disabled="!priorityChanged"
            @click="submitPriorityChanged"
            >Change Priority</v-btn
          >
        </v-col>
      </v-row>

      <v-divider></v-divider>
      <v-form v-model="isCommentValid" ref="formComment">
        <v-row class="mt-10">
          <v-col cols="12">
            <v-textarea
              name="comment"
              label="Write your comment here"
              v-model="comment"
              v-if="ifView"
              :rules="commentRules"
              solo
              outlined
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            dark
            :disabled="!isCommentValid"
            @click="submitComment"
            >Submit Comment</v-btn
          >
        </v-row>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
const axios = require('axios');

export default {
  props: ['type'],
  data() {
    return {
      priorities: this.$store.state.priorities,
      statuses: [
        { status: 'Open', value: '1' },
        { status: 'Closed', value: '2' },
      ],

      isCommentValid: false,

      priority: null,
      status: null,
      currentPriority: null,
      currentStatus: null,
      comment: null,

      priorityRules: [(v) => !!v || 'Please select a priority level.'],
      statusRules: [(v) => !!v || 'Please select ticket status.'],

      commentRules: [
        (v) => !!v || 'Please write a valid comment.',
        (v) =>
          // eslint-disable-next-line implicit-arrow-linebreak
          (v && v.length >= 30) || 'Comment must be more than 30 characters',
      ],
    };
  },

  computed: {
    isHR() {
      return localStorage.getItem('is_hr') !== 'false';
    },
    ifView() {
      return !this.type;
    },
    priorityChanged() {
      if (this.priority !== this.currentPriority) {
        return true;
      }
      return false;
    },
    statusChanged() {
      if (this.status !== this.currentStatus) {
        return true;
      }
      return false;
    },
  },
  methods: {
    submitComment() {
      axios
        .post(
          '/comment',
          {
            ticket_id: this.$route.params.id,
            comment: this.comment,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        )
        .then((response) => {
          this.$refs.formComment.reset();
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
    },
    submitStatusChanged() {
      const ticketId = this.$route.params.id;
      axios
        .put(
          `/ticket/${ticketId}`,
          {
            status: this.status,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
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
    },
    submitPriorityChanged() {
      const ticketId = this.$route.params.id;
      axios
        .put(
          `/ticket/${ticketId}`,
          {
            priority: this.priority,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
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
    },
  },
  created() {
    const ticketId = this.$route.params.id;
    axios
      .get(`/ticket/${ticketId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        this.status = response.data.data.status;
        this.priority = response.data.data.priority;
        this.currentStatus = response.data.data.status;
        this.currentPriority = response.data.data.priority;
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
