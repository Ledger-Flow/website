"use client";

import { mockTeamMembers } from "@/constant/team";
import { useToggle } from "@/hooks/useToggle";
import { Member, MemberStatus } from "@/types/members";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";

type Action =
  | {
      type: "UPDATE_TEAM";
      payload: { id: string; status: MemberStatus | "delete" };
    }
  | {
      type: "SET_TEAM";
      payload: Member[];
    };

const Context = createContext<
  | {
      teamMembers: Member[];
      teamDispatcher: (action: Action) => void;
      fetchingTeam: boolean;
    }
  | undefined
>(undefined);

const TeamProvider = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const [teamMembers, dispatcher] = useReducer(reducer, []);
  const teamDispatcher = (action: Action) => dispatcher(action);
  const [fetchingTeam, toggleFetchingTeam] = useToggle(true);

  useEffect(() => {
    toggleFetchingTeam(true);
    teamDispatcher({ type: "SET_TEAM", payload: mockTeamMembers });
    toggleFetchingTeam(false);
  }, [toggleFetchingTeam]);

  return (
    <Context.Provider value={{ teamMembers, teamDispatcher, fetchingTeam }}>
      {children}
    </Context.Provider>
  );
};

export default TeamProvider;

export const useTeam = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useTeam: must be use within TeamProvider.");
  }
  return context;
};

const reducer = (state: Member[], action: Action): Member[] => {
  const { type, payload } = action;

  switch (type) {
    case "UPDATE_TEAM":
      const findMember = state.find((member) => member.id === payload.id);
      if (!findMember) return state;

      if (payload.status === "delete") {
        if (confirm("Are you sure you want to remove this member?")) {
          return state.filter((member) => member.id !== findMember.id);
        }
        return state;
      }

      return state.map((member) => {
        if (member.id === payload.id) {
          return { ...member, status: payload.status as MemberStatus };
        }
        return member;
      });

    case "SET_TEAM":
      return payload;

    default:
      return state;
  }
};
