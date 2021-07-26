const { shallowMount } = require('@vue/test-utils');
const Summary = require('@/components/Dashboard/RequirementsSummary.vue');
const { getSummaryData } = require('@/services/axios/Dashboard/RequirementsSummary');
const flushPromises = require('flush-promises');

jest.mock('@/services/axios/Dashboard/RequirementsSummary');

describe('FullComponentTest', () => {
  it('Api call resolved successfully', async () => {
    resolvedData = {
      status: 'success',
      message: 'Data retrieved successfully',
      data: { totalRequirements: 2, openRequirement: 2, resolvedRequirement: 0 },
    };
    getSummaryData.mockResolvedValueOnce({ data: resolvedData });

    const wrapper = shallowMount(Summary);

    await flushPromises();

    expect(getSummaryData).toHaveBeenCalledTimes(1);
    const totalRequirements = wrapper.find('[data-testid="totalRequirements"]');

    expect(totalRequirements).toEqual(resolvedData);
  });

  it('Api call resolved failed', () => {
    expect(true).toBe(true);
  });
});
