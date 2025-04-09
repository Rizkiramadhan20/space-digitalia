import { analytics } from "./firebase";
import { setConsent, ConsentSettings } from "firebase/analytics";
import { subscribeToNewContent } from "./notification";

type ConsentStatus = "granted" | "denied";
type DataLayerItem = {
  consent: "default" | "update";
  analytics_storage: ConsentStatus;
  ad_storage: ConsentStatus;
  notification_storage: ConsentStatus;
};

const requestNotificationPermission = async (): Promise<
  "granted" | "denied"
> => {
  if (typeof window === "undefined") return "denied";

  if (!("Notification" in window)) {
    return "denied";
  }

  try {
    const permission = await Notification.requestPermission();
    return permission as "granted" | "denied";
  } catch (error) {
    console.error("Error requesting notification permission:", error);
    return "denied";
  }
};

const updateConsent = async (status: ConsentStatus) => {
  // Update analytics consent
  if (analytics) {
    const consentSettings: ConsentSettings = {
      analytics_storage: status,
      ad_storage: status,
    };
    setConsent(consentSettings);
  }

  // Update dataLayer
  if (typeof window !== "undefined" && "dataLayer" in window) {
    (window as unknown as { dataLayer: DataLayerItem[] }).dataLayer.push({
      consent: status === "granted" ? "update" : "default",
      analytics_storage: status,
      ad_storage: status,
      notification_storage: status,
    });
  }

  // Handle notification consent
  if (status === "granted") {
    const notificationPermission = await requestNotificationPermission();
    if (notificationPermission === "granted") {
      subscribeToNewContent((content) => {
        console.log("New content added:", content);
      });
    }
  }

  // Save preferences
  localStorage.setItem("analytics_consent", status);
  localStorage.setItem("notification_consent", status);
};

const getStoredConsent = (): ConsentStatus => {
  if (typeof window === "undefined") return "denied";
  return (
    (localStorage.getItem("analytics_consent") as ConsentStatus) || "denied"
  );
};

export { requestNotificationPermission, updateConsent, getStoredConsent };
