import { ComponentProps } from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useToggle } from "@/hooks/useToggle";

function Input({
  className,
  type = "text",
  ...props
}: ComponentProps<"input">) {
  const [show, toggleShow] = useToggle(false);
  return (
    <div className="relative">
      <input
        type={type === "password" ? (show ? "text" : "password") : type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className,
          { "pr-8.5": type === "password" },
        )}
        {...props}
      />

      {type === "password" && (
        <button
          type="button"
          className="absolute top-1/2 right-0 h-full -translate-y-1/2 cursor-pointer px-2 opacity-70 [&>svg]:size-4"
          onClick={() => {
            toggleShow();
            const inputElement = props.id
              ? document.getElementById(props.id)
              : null;
            if (inputElement) inputElement.focus();
          }}
        >
          {show ? <EyeOff /> : <Eye />}
        </button>
      )}
    </div>
  );
}

export { Input };
