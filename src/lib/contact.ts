export const OFFICE_EMAIL = "info@khenbridge.com";
export const MAILTO_URL = `mailto:${OFFICE_EMAIL}`;
export const MAILTO_ENQUIRY_URL = `mailto:${OFFICE_EMAIL}?subject=${encodeURIComponent("Visa enquiry")}`;

export const OFFICE_PHONE = "+918848100293";
export const OFFICE_PHONE_DISPLAY = "+91 8848100293";

export const OFFICE_STREET_ADDRESS =
  "Door No. 70/1608 (D-7), Second Floor, Chammany Tower";
export const OFFICE_ADDRESS_LOCALITY = "Kochi";
export const OFFICE_ADDRESS_DISTRICT = "Ernakulam";
export const OFFICE_ADDRESS_REGION = "Kerala";
export const OFFICE_POSTAL_CODE = "682017";
export const OFFICE_ADDRESS_COUNTRY = "IN";
export const OFFICE_ADDRESS_DISPLAY = `${OFFICE_STREET_ADDRESS}, ${OFFICE_ADDRESS_LOCALITY}, ${OFFICE_ADDRESS_DISTRICT}, ${OFFICE_ADDRESS_REGION} ${OFFICE_POSTAL_CODE}`;

/** Brand primary CTA: accent yellow (#E3A72E) + indigo text — match Header “Book Free Consultation”. */
export const PRIMARY_CTA_BUTTON_CLASS =
  "bg-accent text-indigo font-bold rounded-sm hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/30 transition-all duration-300";

/** Secondary CTA: outline on ivory/light sections */
export const SECONDARY_CTA_BUTTON_CLASS =
  "inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-bold rounded-sm bg-transparent hover:bg-primary hover:text-white transition-all duration-300 transform hover:-translate-y-1";

/** Ghost text link CTA */
export const GHOST_LINK_CLASS =
  "font-normal text-primary hover:text-accent transition-colors duration-300";
