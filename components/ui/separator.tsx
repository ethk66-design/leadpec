/* eslint-disable */
import * as React from "react"
import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
        orientation?: "horizontal" | "vertical"
        decorative?: boolean
    }
>(
    (
        { className, orientation = "horizontal", decorative = true, ...props },
        ref
    ) => {
        if (decorative) {
            return (
                <div
                    ref={ref}
                    role="none"
                    className={cn(
                        "shrink-0 bg-border",
                        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
                        className
                    )}
                    {...props}
                />
            )
        }

        if (orientation === "vertical") {
            return (
                <div
                    ref={ref}
                    role="separator"
                    aria-orientation="vertical"
                    className={cn(
                        "shrink-0 bg-border",
                        "h-full w-[1px]",
                        className
                    )}
                    {...props}
                />
            )
        }

        return (
            <div
                ref={ref}
                role="separator"
                aria-orientation="horizontal"
                className={cn(
                    "shrink-0 bg-border",
                    "h-[1px] w-full",
                    className
                )}
                {...props}
            />
        )
    }
)
Separator.displayName = "Separator"

export { Separator }
