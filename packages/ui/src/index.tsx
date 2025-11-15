import type { ReactNode } from "react";

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

export function Button({ children, onClick, variant = "primary" }: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "8px 16px",
        borderRadius: "4px",
        backgroundColor: variant === "primary" ? "#0070f3" : "#eaeaea",
        color: variant === "primary" ? "#fff" : "#000",
        border: "none",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

export interface CardProps {
  title: string;
  children: ReactNode;
}

export function Card({ title, children }: CardProps) {
  return (
    <div
      style={{
        padding: "16px",
        border: "1px solid #eaeaea",
        borderRadius: "8px",
      }}
    >
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
}
