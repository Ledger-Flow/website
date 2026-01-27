import {
  CheckCircle2,
  Circle,
  ShieldQuestionMark,
  XCircle,
} from "lucide-react";

export const getStatus = (status: string) => {
  // roles: active, inactive, suspended
  switch (status) {
    case "active": {
      return { color: "text-green-600", icon: <CheckCircle2 /> };
    }
    case "inactive": {
      return { color: "text-gray-400", icon: <Circle /> };
    }
    case "suspended": {
      return { color: "text-red-600", icon: <XCircle /> };
    }
    default: {
      return { color: "text-amber-600", icon: <ShieldQuestionMark /> };
    }
  }
};

export const getRoleBadgeColor = (role: string): string => {
  switch (role) {
    case "Owner":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};
