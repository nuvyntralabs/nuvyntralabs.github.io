import type { Analytics } from "firebase/analytics";
import type { FirebaseApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyCTkTScNLr5_cCFO4RfhLqzvTjPZvAWkfU",
  authDomain: "nuvyntralabs.firebaseapp.com",
  projectId: "nuvyntralabs",
  storageBucket: "nuvyntralabs.firebasestorage.app",
  messagingSenderId: "519074684615",
  appId: "1:519074684615:web:6c9dbb6ec305f6464f68e2",
  measurementId: "G-JLYTNTEY6E",
} as const;

let analyticsPromise: Promise<Analytics | null> | null = null;

function getApp(): Promise<FirebaseApp> {
  return import("firebase/app").then(({ getApp, getApps, initializeApp }) =>
    getApps().length ? getApp() : initializeApp(firebaseConfig),
  );
}

export function getFirebaseAnalytics(): Promise<Analytics | null> {
  if (typeof window === "undefined") {
    return Promise.resolve(null);
  }

  if (!analyticsPromise) {
    analyticsPromise = (async () => {
      const [{ isSupported, initializeAnalytics }, app] = await Promise.all([
        import("firebase/analytics"),
        getApp(),
      ]);

      if (!(await isSupported())) {
        return null;
      }

      return initializeAnalytics(app, {
        config: { "send_page_view": false },
      });
    })();
  }

  return analyticsPromise;
}

export function screenNameFromPath(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed === "" ? "home" : trimmed.replace(/^\/+/, "");
}

export async function logScreenView(pathname: string): Promise<void> {
  const analytics = await getFirebaseAnalytics();
  if (!analytics) {
    return;
  }

  const { logEvent } = await import("firebase/analytics");
  await new Promise<void>((resolve) => {
    window.setTimeout(resolve, 0);
  });

  const screenName = screenNameFromPath(pathname);
  const pageLocation = window.location.href;
  const pageTitle = document.title;

  logEvent(analytics, "page_view", {
    page_path: pathname,
    page_location: pageLocation,
    page_title: pageTitle,
    screen_name: screenName,
  });

  logEvent(analytics, "screen_view", {
    firebase_screen: screenName,
    firebase_screen_class: "page",
    page_path: pathname,
    page_title: pageTitle,
  });
}

export async function logClick(element: HTMLElement, pathname: string): Promise<void> {
  const analytics = await getFirebaseAnalytics();
  if (!analytics) {
    return;
  }

  const { logEvent } = await import("firebase/analytics");
  const link = element.closest("a");
  const href = link instanceof HTMLAnchorElement ? link.href : "";
  const outbound = Boolean(href) && !href.startsWith(window.location.origin);
  const text =
    element.getAttribute("data-analytics") ||
    element.getAttribute("aria-label") ||
    element.textContent?.replace(/\s+/g, " ").trim() ||
    element.tagName.toLowerCase();

  logEvent(analytics, "click", {
    link_url: href,
    link_text: text.slice(0, 100),
    link_id: element.id || link?.id || "",
    link_classes: element.className.toString().slice(0, 100),
    outbound,
    screen_name: screenNameFromPath(pathname),
    page_path: pathname,
  });
}
