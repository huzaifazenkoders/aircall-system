// ---------------------------------------------------------
//
//                    Translation Messages
//
// ---------------------------------------------------------

type MessageParams = Record<string, string | number>;

interface Messages {
  [key: string]: string | ((params: MessageParams) => string);
}

const messages: Messages = {
  // Common fields
  email: "Email",
  phoneNumber: "Phone Number",

  // Validation messages
  isRequired: ({ field }: MessageParams) => `${field} is required`,

  mustContainAtLeast: ({ field, count }: MessageParams) =>
    `${field} must contain at least ${count} characters`,

  cannotExceedCharacters: ({ field, count }: MessageParams) =>
    `${field} cannot exceed ${count} characters`,

  cannotContainEmptySpaces: ({ field }: MessageParams) =>
    `${field} cannot contain only empty spaces`,

  cannotContainOnlySpecialCharacters: ({ field }: MessageParams) =>
    `${field} cannot contain only special characters`,

  shouldBeValid: ({ field }: MessageParams) => `${field} should be valid`
};

/**
 * Translation function to get messages with parameter interpolation
 * @param key - The message key
 * @param params - Parameters to interpolate in the message
 * @returns The translated message
 */
export const t = (key: string, params?: MessageParams): string => {
  const message = messages[key];

  if (!message) {
    console.warn(`Translation key not found: ${key}`);
    return key;
  }

  // If message is a function, call it with params
  if (typeof message === "function") {
    return message(params || {});
  }

  // Return as-is if it's a string and no params
  if (!params) {
    return message;
  }

  // Simple string replacement for static messages with params
  let result = message;
  Object.entries(params).forEach(([key, value]) => {
    result = result.replace(`{${key}}`, String(value));
  });

  return result;
};

export default messages;
