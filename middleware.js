export { default } from "next-auth/middleware";

export const config = {
  mathcher: ["/properties/add", "/profile", "/properties/saved", "/messages"],
};
