export type AuthContextType = {
  phoneNumber: string | null;
  setPhoneNumber: (phoneNumber: string | null) => void;
};

export type InputPhoneNumberType = {
  phoneNumber: string;
  handleChangePhoneNumber: (value: string) => void;
  submitPhoneNumber: () => void;
  loading: boolean;
};

export type InputOtpType = {
  phoneNumber: string;
  otp: string;
  handleChangeOtp: (value: string) => void;
  submitOtp: () => void;
  loading: boolean;
};

export type DrawerItemType = {
  text: string;
  slug: string;
  icon: React.ReactNode;
  func?: (params?: any) => void;
};

export type ContentType = {
  subject: string;
  caption: string;
  contentId?: string;
  captionId?: string;
  onDelete?: (contentId: string, captionId: string) => void;
};

export type ContentsListType = {
  [contentId: string]: {
    captions: {
      [captionId: string]: string;
    };
    subject: string;
  };
};
