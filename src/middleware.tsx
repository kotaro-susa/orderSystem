export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard", "/productRegister", "/order","/dashboard/:path*"],
};
