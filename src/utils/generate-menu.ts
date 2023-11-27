import { MenuItem } from "../services/config/contracts";

export const generateMenu = (menu: MenuItem[]) => {
  return menu
    .map(
      (item) =>
        `<button class="btn" linkUrl=${item.path}>${item.textName}</button>`
    )
    .join("");
};
