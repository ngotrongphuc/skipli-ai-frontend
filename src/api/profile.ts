import axiosInstance from '.';

export const getUserGeneratedContent = async (params: {
  phoneNumber: string;
}) => {
  try {
    const { data } = await axiosInstance.get(`/get-user-generated-contents`, {
      params,
    });
    return data;
  } catch (error: any) {
    alert(error.response.data);
    throw error;
  }
};
