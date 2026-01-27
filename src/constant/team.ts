import { Member, MemberStatus } from "@/types/members";

export const mockTeamStatus: MemberStatus[] = [
  "active",
  "inactive",
  "suspended",
];

export const mockTeamMembers: Member[] = [
  {
    id: "1",
    name: "Chioma Okafor",
    email: "chioma@business.com",
    role: "Owner",
    status: "active",
    img: "/avatars/avatar1.png",
  },
  {
    id: "2",
    name: "Tunde Adeyemi",
    email: "tunde@business.com",
    role: "Sales Rep",
    status: "active",
    img: "/avatars/avatar2.png",
  },
  {
    id: "3",
    name: "Fatima Hassan",
    email: "fatima@business.com",
    role: "Sales Rep",
    status: "active",
    img: "/avatars/avatar3.png",
  },
  {
    id: "4",
    name: "Zainab Ibrahim",
    email: "zainab@business.com",
    role: "Sales Rep",
    status: "active",
    img: "/avatars/avatar4.png",
  },
  {
    id: "5",
    name: "Ayo Oluwaseun",
    email: "ayo@business.com",
    role: "Sales Rep",
    status: "inactive",
    img: "/avatars/avatar5.png",
  },
  {
    id: "6",
    name: "Grace Okonkwo",
    email: "grace@business.com",
    role: "Sales Rep",
    status: "suspended",
    img: "/avatars/avatar6.png",
  },
];
