export const formatPhoneNumberForDisplay = (phoneNumber: string): string => {
  const cleaned = phoneNumber.replace(/[^\d+]/g, "");

  if (cleaned.startsWith("00")) {
    return `+${cleaned.slice(2)}`;
  }

  if (cleaned.startsWith("+")) {
    return cleaned;
  }

  if (cleaned.startsWith("0")) {
    return `+62${cleaned.slice(1)}`;
  }

  return cleaned ? `+${cleaned}` : "";
};
