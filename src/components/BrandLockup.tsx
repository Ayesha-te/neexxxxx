import brandLogo from "@/assets/logo.jpeg";
import { BRAND_NAME, BRAND_SHORT_NAME, BRAND_TAGLINE } from "@/lib/brand";
import { cn } from "@/lib/utils";

type BrandLockupProps = {
  className?: string;
  imageClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  name?: string;
  subtitle?: string;
};

export function BrandLockup({
  className,
  imageClassName,
  titleClassName,
  subtitleClassName,
  name = BRAND_SHORT_NAME,
  subtitle = BRAND_TAGLINE,
}: BrandLockupProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <img
        src={brandLogo}
        alt={`${BRAND_NAME} logo`}
        className={cn(
          "size-11 shrink-0 rounded-[1.35rem] border border-primary/15 bg-white object-cover shadow-[0_16px_40px_-24px_var(--color-primary)]",
          imageClassName,
        )}
      />
      <div className="min-w-0">
        <div className={cn("font-semibold leading-tight text-foreground", titleClassName)}>
          {name}
        </div>
        {subtitle ? (
          <div
            className={cn(
              "text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground",
              subtitleClassName,
            )}
          >
            {subtitle}
          </div>
        ) : null}
      </div>
    </div>
  );
}
