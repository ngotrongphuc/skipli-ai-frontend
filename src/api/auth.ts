import axiosInstance from '.';

export const createNewAccessCode = async (payload: { phoneNumber: string }) => {
  try {
    const { data } = await axiosInstance.post(
      `/create-new-access-code`,
      payload,
    );
    return data;
  } catch (error: any) {
    alert(error.response.data);
    throw error;
  }
};

export const validateAccessCode = async (payload: {
  accessCode: string;
  phoneNumber: string;
}) => {
  try {
    const { data } = await axiosInstance.post(`/validate-access-code`, payload);
    return data;
  } catch (error: any) {
    alert(error.response.data);
    throw error;
  }
};
