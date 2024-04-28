export type ErrorWithMessage = {
  status: number;
  data: {
    message: string;
  };
};

export interface User {
  userId: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  sex: string;
  avatar?: string;
  email: string;
  cityId: string;
  typeUser: string;
  createdAt: string;
  updatedAt?: string;
}

export interface menuItem {
  key: string;
  text: string;
  icon: React.ReactNode;
  link: string;
}

export interface Announment {
  announcementId: string;
  announcementTitle: string;
  announcementTypeId: number;
  description: string;
  announcementLocation: [number, number];
  photos: string[];
  announcementStatusId?: string;
}

export interface announcementType {
  announcementTypeId: number;
  announcementTypeName: string;
}

export interface Announments {
  announcementId: string;
  announcementTypeId: number;
  announcementTitle: string;
  description: string;
  announcementLocation: [string, string];
  photos: string[] | [];
  announcementStatusId?: string;
}

export interface Map {
  showdetails?: boolean;
  showMarker?: boolean;
  clickedPosition?: [number, number];
  setClickedPosition?: any;
  announcements?: Announment[] | [];
}

export type smallMapType = {
  announcementCoords: [number, number];
};

// export interface Article {
//   articleId: string;
//   title: string;
//   description: string;
//   articleStatusId?: string | null;
//   photos?: string[] | [];
//   createdAt: Date;
//   updatedAt: Date;
// }

export interface Article {
  title: string;
  createdAt: Date;
  photos: string[] | [];
  description: string;
  userId: string;
  User?: { firstName: string; lastName: string; userId: string };
  articleId: string;
}
