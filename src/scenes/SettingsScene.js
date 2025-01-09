import { COLORS, FONT_SIZES } from "../constants/styles";

export async function createSettingsScene(renderer) {
  const app = document.getElementById("app");
  app.innerHTML = ""; // Clear existing content

  // Load settings.css if not already added
  if (!document.querySelector('link[href="/css/settings.css"]')) {
    const settingsCss = document.createElement("link");
    settingsCss.rel = "stylesheet";
    settingsCss.href = "/css/settings.css";
    document.head.appendChild(settingsCss);
  }

  // Inject settings form directly into the app
  app.innerHTML = `
    <form id="settingsForm">
      <label for="backgroundColor">Background Color:</label>
      <input type="color" id="backgroundColor" value="#cccccc" />

      <label for="textColor">Text Color:</label>
      <input type="color" id="textColor" value="#ffffff" />

      <label for="fontFace">Font Face:</label>
      <input type="text" id="fontFace" placeholder="Arial" />

      <label for="fontSize">Font Size:</label>
      <input type="number" id="fontSize" placeholder="16" />

      <label for="racerColor">Racer Color:</label>
      <input type="color" id="racerColor" value="#ff0000" />

      <label for="spacing">Spacing:</label>
      <input type="number" id="spacing" step="0.1" placeholder="1.2" />

      <label for="location">Location:</label>
      <select id="location" name="location">
        <option value="london">London</option>
        <option value="manchester">Manchester</option>
        <option value="bristol">Bristol</option>
      </select>

      <!-- Save Button -->
      <button type="submit">Save Settings</button>
    </form>
  `;

  // Load saved settings or use defaults
  const savedSettings = JSON.parse(
    localStorage.getItem("brandingSettings") || "{}"
  );
  const defaultSettings = {
    location: "",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    fontFace: "Arial",
    fontSize: FONT_SIZES.medium,
    racerColor: COLORS.red,
    spacing: 1.2,
  };
  const settings = { ...defaultSettings, ...savedSettings };

  // Populate the form fields with the saved settings
  const form = document.getElementById("settingsForm");
  if (form) {
    // Populate fields if they exist
    document.getElementById("location").value = settings.location || "";
    document.getElementById("backgroundColor").value =
      settings.backgroundColor || "";
    document.getElementById("textColor").value = settings.textColor || "";
    document.getElementById("fontFace").value = settings.fontFace || "Arial";
    document.getElementById("fontSize").value = settings.fontSize || "";
    document.getElementById("racerColor").value = settings.racerColor || "";
    document.getElementById("spacing").value = settings.spacing || 1.2;

    // Form submit event to save settings
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      // Collect values from the form
      const location = document.getElementById("location")?.value || "";
      const backgroundColor = document.getElementById("backgroundColor")?.value;
      const textColor = document.getElementById("textColor")?.value;
      const fontFace = document.getElementById("fontFace")?.value || "Arial";
      const fontSize =
        document.getElementById("fontSize")?.value || FONT_SIZES.medium;
      const racerColor =
        document.getElementById("racerColor")?.value || COLORS.red;
      const spacing = parseFloat(
        document.getElementById("spacing")?.value || 1.2
      );

      // Create settings object
      const brandingSettings = {
        location,
        backgroundColor,
        textColor,
        fontFace,
        fontSize,
        racerColor,
        spacing,
      };

      // Save to localStorage
      localStorage.setItem(
        "brandingSettings",
        JSON.stringify(brandingSettings)
      );
      console.log("Branding settings saved:", brandingSettings);

      // Notify app of the settings change
      const settingsUpdatedEvent = new Event("settingsUpdated");
      window.dispatchEvent(settingsUpdatedEvent);
    });
  } else {
    console.warn("Settings form not found.");
  }

  // Add a button to log branding settings from localStorage
  const logButton = document.createElement("button");
  logButton.textContent = "Log Branding Settings";
  logButton.style.marginTop = "20px";
  logButton.addEventListener("click", () => {
    const brandingSettings = localStorage.getItem("brandingSettings");
    if (brandingSettings) {
      console.log(
        "Branding Settings from localStorage:",
        JSON.parse(brandingSettings)
      );
    } else {
      console.log("No branding settings found in localStorage.");
    }
  });

  // Append the button to the app
  app.appendChild(logButton);
}

// Optional: Apply settings dynamically after saving
function applySettings(branding) {
  document.body.style.backgroundColor = branding.backgroundColor || "";
  document.body.style.fontFamily = branding.fontFace || "";
}
