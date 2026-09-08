"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

type Option<T extends string> = {
  value: T;
  label: string;
};

interface GuidanceSelectProps<T extends string> {
  id?: string;
  value: T;
  options: Option<T>[];
  disabled?: boolean;
  onChange: (value: T) => void;
}

export function GuidanceSelect<T extends string>({
  id,
  value,
  options,
  disabled,
  onChange,
}: GuidanceSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div className="custom-select" ref={rootRef}>
      <button
        type="button"
        id={id}
        className="custom-select-trigger"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{selected?.label ?? ""}</span>
        <ChevronDown
          size={14}
          className={`custom-select-chevron ${open ? "is-open" : ""}`}
        />
      </button>

      {open && (
        <ul className="custom-select-list" role="listbox">
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              className={`custom-select-option ${
                option.value === value ? "is-selected" : ""
              }`}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}