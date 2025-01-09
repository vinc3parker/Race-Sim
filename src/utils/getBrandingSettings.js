import { defaultBranding } from "../branding/defaultBranding";

function getBrandingSettings() {
  try {
    const storedSettings = localStorage.getItem("brandingSettings");
    if (storedSettings) {
      return JSON.parse(storedSettings);
    }
  } catch (error) {
      console.error("Error parsing branding settings from localStorage: ", error);
  }
  return defaultBranding;
}

export default getBrandingSettings;