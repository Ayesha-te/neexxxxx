import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { B as BRAND_NAME, a as BRAND_SHORT_NAME, b as BRAND_TAGLINE } from "./router-BRGvJkPm.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
const brandLogo = "/assets/logo-B-uE-gkP.jpeg";
function BrandLockup({
  className,
  imageClassName,
  titleClassName,
  subtitleClassName,
  name = BRAND_SHORT_NAME,
  subtitle = BRAND_TAGLINE
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex items-center gap-3", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: brandLogo,
        alt: `${BRAND_NAME} logo`,
        className: cn(
          "size-11 shrink-0 rounded-[1.35rem] border border-primary/15 bg-white object-cover shadow-[0_16px_40px_-24px_var(--color-primary)]",
          imageClassName
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("font-semibold leading-tight text-foreground", titleClassName), children: name }),
      subtitle ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: cn(
            "text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground",
            subtitleClassName
          ),
          children: subtitle
        }
      ) : null
    ] })
  ] });
}
export {
  BrandLockup as B,
  brandLogo as b
};
