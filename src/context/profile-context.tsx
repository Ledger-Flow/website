"use client";

import { mockBusiness, mockUser } from "@/constant/profile";
import { useToggle } from "@/hooks/useToggle";
import { Business, User } from "@/types/profile";
import { createContext, useContext, useEffect, useReducer } from "react";

const Context = createContext<
  | ({
      profileDispatcher: (action: Action) => void;
      fetchingProfile: boolean;
    } & State)
  | undefined
>(undefined);

interface State {
  user: User;
  business: Business;
}

type Action =
  | {
      type: "SET_USER";
      payload: User;
    }
  | {
      type: "SET_BUSINESS";
      payload: Business;
    }
  | {
      type: "UPDATE_USER";
      payload: { field: keyof User; value: string };
    }
  | {
      type: "UPDATE_BUSINESS";
      payload: { field: keyof Business; value: string };
    };

const initialState: { user: User; business: Business } = {
  user: {
    id: "",
    avatar: "",
    fullName: "",
    email: "",
    phone: "",
    dob: "",
  },
  business: {
    id: "",
    name: "",
    address: "",
    businessType: "",
    industry: "",
    currency: "",
    taxId: "",
    logo: "",
    banner: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    zipCode: "",
  },
};

const ProfileProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const profileDispatcher = (action: Action) => dispatch(action);
  const [fetchingProfile, toggleFetchingProfile] = useToggle(true);

  useEffect(() => {
    toggleFetchingProfile(true);
    profileDispatcher({ type: "SET_USER", payload: mockUser });
    profileDispatcher({ type: "SET_BUSINESS", payload: mockBusiness });
    toggleFetchingProfile(false);
  }, [toggleFetchingProfile]);

  return (
    <Context.Provider value={{ ...state, profileDispatcher, fetchingProfile }}>
      {children}
    </Context.Provider>
  );
};

export default ProfileProvider;

export const useProfile = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useProfile: must be use within ProfileProvider.");
  }
  return context;
};

const reducer = (state: State, action: Action): State => {
  const { payload, type } = action;

  switch (type) {
    case "SET_USER": {
      return { ...state, user: payload };
    }
    case "SET_BUSINESS": {
      return { ...state, business: payload };
    }
    case "UPDATE_USER": {
      return {
        ...state,
        user: {
          ...state.user,
          [payload.field]: payload.value,
        },
      };
    }
    case "UPDATE_BUSINESS": {
      return {
        ...state,
        business: {
          ...state.business,
          [payload.field]: payload.value,
        },
      };
    }

    default:
      return state;
  }
};
