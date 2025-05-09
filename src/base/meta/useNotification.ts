"use client";

import { useEffect } from "react";

import { subscribeToNewContent } from "@/utils/notification";

import toast from "react-hot-toast";

export const useNotification = () => {
  useEffect(() => {
    const setupNotifications = async () => {
      if (typeof window === "undefined") return;

      // Check if browser supports notifications
      if (!("Notification" in window)) {
        console.log("Notifications are not supported in this browser");
        localStorage.setItem("notification_permission", "unsupported");
        return;
      }

      // Check if we're on HTTPS
      if (
        window.location.protocol !== "https:" &&
        window.location.hostname !== "localhost"
      ) {
        console.log("Notifications require HTTPS");
        localStorage.setItem("notification_permission", "unavailable");
        return;
      }

      try {
        // Check existing permission first
        if (Notification.permission === "granted") {
          localStorage.setItem("notification_permission", "granted");
          subscribeToNewContent((content) => {
            console.log("New content added:", content);
          });
          return;
        }

        // If permission is denied, don't ask again
        if (Notification.permission === "denied") {
          console.log("Notification permission was denied");
          localStorage.setItem("notification_permission", "denied");
          return;
        }

        // Request permission
        const permission = await Notification.requestPermission();
        localStorage.setItem("notification_permission", permission);

        if (permission === "granted") {
          toast.success("Notifikasi berhasil diaktifkan!");
          subscribeToNewContent((content) => {
            console.log("New content added:", content);
          });
        } else {
          toast.error("Notifikasi tidak diizinkan");
        }
      } catch (error) {
        console.error("Error setting up notifications:", error);
        toast.error("Gagal mengaktifkan notifikasi");
        localStorage.setItem("notification_permission", "error");
      }
    };

    setupNotifications();
  }, []);
};
