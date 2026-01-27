import { supabaseClient } from "@/lib/supabase/client";
import { toast } from "sonner";

export const logIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
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
export const signUp = async ({
  email,
  full_name,
  password,
  dob,
  gender,
}: {
  full_name: string;
  password: string;
  email: string;
  dob: Date;
  gender: GENDER;
}) => {
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
