import axiosInstance from '.';

export const generatePostCaptions = async (payload: {
  socialNetwork: string;
  subject: string;
  tone: string;
}) => {
  try {
    const { data } = await axiosInstance.post(
      `/generate-post-captions`,
      payload,
    );
    return data;
  } catch (error: any) {
    alert(error.response.data);
    throw error;
  }
};

export const saveGeneratedContent = async (payload: {
  phoneNumber: string;
  caption: string;
}) => {
  try {
    const { data } = await axiosInstance.post(
      `/save-generated-content`,
      payload,
    );
    return data;
  } catch (error: any) {
    alert(error.response.data);
    throw error;
  }
};

export const unsaveContent = async (payload: {
  phoneNumber: string;
  captionId: string;
}) => {
  try {
    const { data } = await axiosInstance.post(`/unsave-content`, payload);
    return data;
  } catch (error: any) {
    alert(error.response.data);
    throw error;
  }
};
