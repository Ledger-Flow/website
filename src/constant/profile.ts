import { Business, User } from "@/types/profile";

export const mockUser: User = {
  id: "1",
  avatar: "/user.png",
  fullName: "John Doe",
  email: "john.doe@example.com",
  phone: "+1234567890",
  dob: "1990-01-01",
};

export const mockBusiness: Business = {
  id: "1",
  name: "Tech Solutions Ltd",
  address: "123 Business Ave,",
  businessType: "Private Limited",
  industry: "Technology",
  currency: "NGN",
  taxId: "TAX123456789",
  logo: "/icon.png",
  banner: "/banner.png",
  email: "business@example.com",
  phone: "+1234567890",
  state: "Lagos",
  country: "Nigeria",
  zipCode: "12345",
};
