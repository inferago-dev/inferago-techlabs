export type CompanyContact = {
  email?: string;
  phone?: string;
  whatsapp?: string;
  linkedin?: string;
  instagram?: string;
  location?: string;
};

// Only fill in channels that are actively monitored — see spec §30.
export const COMPANY_CONTACT: CompanyContact = {
  email: "inferago@gmail.com",
};
