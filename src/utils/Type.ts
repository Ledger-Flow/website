// export interface Member {
//   id: number;
//   email: string;
//   name: string;
//   createdAt: Date;
//   status: "Paid" | "Pending";
// }

export enum Page {
  Home = "home",
  ConfirmPayment = "confirm-payment",
  Admin = "admin",
}

export interface AdminUser {
  isAuthenticated: boolean;
  username: string | null;
}
