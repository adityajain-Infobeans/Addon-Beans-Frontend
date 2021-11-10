<template>
  <v-container class="mt-5">
    <v-card light class="px-10" :class="bottomPadding">
      <v-row v-if="isHr" class="marginBottom" data-testid="isHRCheck">
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
            data-testid="submitStatusBtn"
            >Change Status</v-btn
          >
        </v-col>
      </v-row>

      <v-divider v-if="currentStatus == 1 ? true : false"></v-divider>
      <v-form v-model="isCommentValid" ref="formComment" v-if="currentStatus == 1 ? true : false">
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
              data-testid="commentBox"
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
            data-testid="commentSubmitBtn"
            >Submit Comment</v-btn
          >
        </v-row>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

import { ApiEndpoint } from '@/services/axios/';

export default {
  props: ['type'],
  data() {
    return {
      requirementId: this.$route.params.id,
      statuses: [
        { status: 'Open', value: 1 },
        { status: 'Closed', value: 2 },
      ],

      isCommentValid: false,

      status: null,
      currentStatus: null,
      comment: null,

      statusRules: [(v) => !!v || 'Please select Requirement status.'],

      commentRules: [
        (v) => !!v || 'Please write a valid comment.',
        (v) =>
          // eslint-disable-next-line implicit-arrow-linebreak
          (v && v.length >= 30) || 'Comment must be more than 30 characters',
      ],
    };
  },

  computed: {
    ...mapGetters({ isHr: 'Auth/is_hr', empName: 'Auth/emp_name' }),
    ifView() {
      return !this.type;
    },

    statusChanged() {
      if (this.status !== this.currentStatus) {
        return true;
      }
      return false;
    },
    bottomPadding() {
      return this.currentStatus === 1 ? 'pb-10' : 'pb-3';
    },
    marginBottom() {
      return this.currentStatus === 1 ? 'mb-5' : '';
    },
  },
  methods: {
    submitComment() {
      const apiData = {
        requirement_id: this.requirementId,
        comment: this.comment,
      };
      ApiEndpoint.postComment(apiData)
        .then((response) => {
          if (response.status !== 200) {
            return new Error(response);
          }

          const commentData = {
            comment_by: this.empName,
            comment: this.comment,
          };
          this.$refs.formComment.reset();
          this.$store.dispatch('Comment/addComment', commentData);
          this.$swal({
            icon: 'success',
            title: 'Success',
            text: response.data.message,
          });

          return true;
        })
        .catch((error) => {
          this.$swal({
            icon: 'error',
            title: 'Some Error Occured',
            text: error.response.data.message,
          });
        });
    },
    submitStatusChanged() {
      console.log('submit button called');
      const apiData = {
        status: this.status,
      };
      ApiEndpoint.updateStatus(this.requirementId, apiData)
        .then((response) => {
          if (response.status !== 200) {
            return new Error(response);
          }

          this.$swal({
            icon: 'success',
            title: 'Success',
            text: response.data.message,
          });
          this.currentStatus = this.status;
          return true;
        })
        .catch((error) => {
          this.$swal({
            icon: 'error',
            title: 'Some Error Occured',
            text: error.response.data.message,
          });
        });
    },
  },
  created() {
    ApiEndpoint.getRequirementIdData(this.requirementId)
      .then((response) => {
        if (response.status !== 200) {
          return new Error(response);
        }

        this.status = response.data.data.status;
        this.currentStatus = response.data.data.status;

        return true;
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

<style></style>
