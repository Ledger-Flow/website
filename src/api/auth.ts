import { supabaseClient } from "@/lib/supabase/client";
import { toast } from "sonner";

type LoginData = {
  email: string;
  password: string;
};
export const logIn = async ({ email, password }: LoginData) => {
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    toast.error(error.name, {
      description: error.message,
    });
    throw new Error("Error logging user in");
  }
  return data;
};

export type GENDER = "male" | "female" | "others";
type SignupData = {
  full_name: string;
  password: string;
  email: string;
  dob: Date;
  gender: GENDER;
};
export const signUp = async ({
  email,
  full_name,
  password,
  dob,
  gender,
}: SignupData) => {
  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name,
        dob,
        gender,
      },
    },
  });

  if (error) {
    toast.error(error.name, {
      description: error.message,
    });
    throw new Error("Error signing user up");
  }
  return data;
};

export const logOut = async () => {
  const { error } = await supabaseClient.auth.signOut();

  if (error) {
    toast.error(error.name, {
      description: error.message,
    });
    throw new Error("Error logging user out");
  }

  toast.success("Logged out successfully");
  return { success: true };
};
