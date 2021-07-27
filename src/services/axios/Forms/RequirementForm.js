const axios = require('axios');

export function postRequirement(
  token,
  timeline,
  numberOfPosition,
  skillSet,
  experience,
  clientId,
  additionalNote,
) {
  return axios
    .post(
      '/Requirement',
      {
        timeline,
        number_of_position: numberOfPosition,
        skill_set: skillSet,
        experience,
        client_id: clientId,
        additional_note: additionalNote,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((response) => response)
    .catch((error) => error);
}

export function updateRequirement(
  token,
  requirementId,
  timeline,
  numberOfPosition,
  skillSet,
  experience,
  clientId,
  additionalNote,
) {
  return axios
    .put(
      `/Requirement/${requirementId}`,
      {
        timeline,
        number_of_position: numberOfPosition,
        skill_set: skillSet,
        experience,
        client_id: clientId,
        additional_note: additionalNote,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((response) => response)
    .catch((error) => error);
}
