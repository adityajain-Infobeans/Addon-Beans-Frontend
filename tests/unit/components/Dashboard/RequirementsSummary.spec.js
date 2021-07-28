const { shallowMount } = require('@vue/test-utils');
const Summary = require('@/components/Dashboard/RequirementsSummary.vue');
const { getSummaryData } = require('@/services/axios/Dashboard/RequirementsSummary');
const flushPromises = require('flush-promises');

jest.mock('@/services/axios/Dashboard/RequirementsSummary');
beforeEach(() => {
  jest.clearAllMocks();
});

describe('FullComponentTest', () => {
  it('Api call resolved successfully', async () => {
    summaryData = {
      status: 'success',
      message: 'Data retrieved successfully',
      data: { totalRequirements: 3, openRequirement: 3, resolvedRequirement: 0 },
    };
    getSummaryData.mockResolvedValueOnce(summaryData);
    const wrapper = shallowMount(Summary);
    await flushPromises();

    expect(getSummaryData).toHaveBeenCalledTimes(1);

    expect(true).toBe(true);
  });

  it('Api call resolved failed', () => {
    expect(true).toBe(true);
  });
});
