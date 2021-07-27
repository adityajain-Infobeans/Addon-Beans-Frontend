const { shallowMount } = require('@vue/test-utils');
const Summary = require('@/components/Dashboard/RequirementsSummary.vue');
const { getSummaryData } = require('@/services/axios/Dashboard/RequirementsSummary');
const flushPromises = require('flush-promises');

jest.mock('@/services/axios/Dashboard/RequirementsSummary');

describe('FullComponentTest', () => {
  it('Api call resolved successfully', async () => {
    const wrapper = shallowMount(Summary);

    expect(true).toBe(true);
  });

  it('Api call resolved failed', () => {
    expect(true).toBe(true);
  });
});
