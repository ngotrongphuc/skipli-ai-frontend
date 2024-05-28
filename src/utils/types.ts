export type AuthContextType = {
  phoneNumber: string | null;
  setPhoneNumber: (phoneNumber: string | null) => void;
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
