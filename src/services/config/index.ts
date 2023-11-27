import { MenuItem, ContentTypeItem } from "./contracts";

export const getDynamicMenuInfo: () => Promise<MenuItem[]> = () =>
  Promise.resolve([
    {
      textName: "Go to welcome page",
      path: "/",
      isAvailable: true,
    },
    {
      textName: "Go to react application",
      path: "/react",
      isAvailable: true,
    },
    {
      textName: "Go to non-framework application",
      path: "/non-framework",
      isAvailable: true,
    },
    {
      textName: "Go to incorrect/link or broken application",
      path: "/broken-service",
      isAvailable: true,
    },
  ]);

export const getDynamicContent: () => Promise<ContentTypeItem[]> = () =>
  Promise.resolve([
    {
      path: "/react",
      applicationName: "@mf/react-app",
      error: "reactError",
      loader: "reactLoader",
    },
    {
      path: "/non-framework",
      applicationName: "@mf/non-framework-app",
      error: "nonFrameworkError",
      loader: "nonFrameworkLoader",
    },
    {
      path: "/broken-service",
      applicationName: "@mf/broken-service",
      error: "brokenServiceError",
      loader: "brokenServiceLoader",
    },
  ]);
