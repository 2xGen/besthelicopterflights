"use client";

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => {
        window.dispatchEvent(new Event("bh-open-cookie-settings"));
      }}
      className="hover:text-white"
    >
      Cookie settings
    </button>
  );
}
