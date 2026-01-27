export type MemberStatus = "active" | "inactive" | "suspended";

export interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  status: MemberStatus;
  img: string;
}
