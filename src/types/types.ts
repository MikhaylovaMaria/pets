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
}

export interface menuItem {
  key: string;
  text: string;
  icon: React.ReactNode;
}
