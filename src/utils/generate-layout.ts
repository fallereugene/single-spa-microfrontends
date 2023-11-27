import { ContentTypeItem } from "../services/config/contracts";

export const generateLayout = (content: ContentTypeItem[]) => {
  const res = content
    .map(
      (item) =>
        `<route path=${item.path}><application name=${item.applicationName} error=${item.error} loader=${item.loader}></application></route>`
    )
    .join("");
  return res;
};
