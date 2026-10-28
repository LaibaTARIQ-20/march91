import { cn } from "@/lib/cn";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "main" | "header" | "footer";
  id?: string;
};

/**
 * Centered layout container — max-w 1320px, 20px on mobile, 40px from md.
 */
export default function Container({
  children,
  className,
  as: Tag = "div",
  id,
}: ContainerProps) {
  return (
    <Tag id={id} className={cn("mx-auto w-full max-w-[1320px] px-5 md:px-10", className)}>
      {children}
    </Tag>
  );
}
