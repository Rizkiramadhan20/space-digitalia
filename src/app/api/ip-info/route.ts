import { NextResponse } from "next/server";

// Define more specific interfaces for IP data
interface IPData {
  ip: string;
  // Common fields that might be returned by different providers
  city?: string;
  region?: string;
  country?: string;
  org?: string;
  hostname?: string;
  loc?: string;
  postal?: string;
  timezone?: string;
  [key: string]: string | number | boolean | undefined; // For other properties with safer types
}

export async function GET() {
  try {
    // Add retry logic with exponential backoff
    const fetchWithRetry = async (url: string, retries = 3, delay = 1000) => {
      for (let i = 0; i < retries; i++) {
        try {
          const response = await fetch(url);
          if (response.status === 429) {
            // Rate limited, wait and retry
            await new Promise((resolve) =>
              setTimeout(resolve, delay * Math.pow(2, i))
            );
            continue;
          }
          return response;
        } catch (e) {
          if (i === retries - 1) throw e;
          await new Promise((resolve) =>
            setTimeout(resolve, delay * Math.pow(2, i))
          );
        }
      }
    };

    // Try alternative IP API endpoints if one fails
    const ipApis = [
      "https://ipapi.co/json/",
      "https://api.ipify.org?format=json",
      "https://ip.seeip.org/json",
    ];

    let data: IPData | null = null;
    let lastError: Error | null = null;

    for (const api of ipApis) {
      try {
        const response = await fetchWithRetry(api);

        if (!response || !response.ok) {
          continue;
        }

        const responseData = await response.json();
        data = responseData as IPData;

        // Different APIs return data in different formats
        if (api.includes("ipify") && data && data.ip) {
          // ipify only returns IP, so we need to enhance
          const geoResponse = await fetch(`https://ipinfo.io/${data.ip}/json`);
          if (geoResponse.ok) {
            const geoData = await geoResponse.json();
            data = { ...data, ...geoData };
          }
        }

        // Validate that we have an IP address
        if (data && data.ip) {
          break; // Successfully got data, exit the loop
        }
      } catch (error) {
        if (error instanceof Error) {
          console.error(`Error with ${api}:`, error);
          lastError = error;
        } else {
          console.error(`Unknown error with ${api}`);
          lastError = new Error(`Unknown error with ${api}`);
        }
      }
    }

    if (!data || !data.ip) {
      throw new Error(
        lastError?.message || "Failed to get IP information from all sources"
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching IP info:", error);
    let errorMessage = "Failed to fetch IP info";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({
      error: "Failed to fetch IP info",
      ip: "unknown", // Provide a fallback IP
      message: errorMessage,
    });
  }
}
