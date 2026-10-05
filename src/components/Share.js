import React, { useId, useRef, useState } from "react";
import { trackEvent } from "../utils/analytics.js";
import styles from "./Share.module.css";

export const SHARE_URL = "https://sushilathreya.com/howareyoufeeling";
const SHARE_TEXT = "How to feel better in 10s. Try this :)";
const SHARE_DATA = {
  title: "How are you feeling?",
  text: SHARE_TEXT,
  url: SHARE_URL,
};
const encodedUrl = encodeURIComponent(SHARE_URL);
const encodedText = encodeURIComponent(SHARE_TEXT);
const destinations = [
  { name: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${SHARE_TEXT}\n${SHARE_URL}`)}` },
  { name: "Telegram", href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}` },
  { name: "X", href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}` },
  { name: "Email", href: `mailto:?subject=${encodeURIComponent(SHARE_DATA.title)}&body=${encodeURIComponent(`${SHARE_TEXT}\n\n${SHARE_URL}`)}` },
];

const Share = ({ shareText }) => {
  const dialog = useRef(null);
  const linkInput = useRef(null);
  const sharing = useRef(false);
  const copying = useRef(false);
  const [busy, setBusy] = useState(false);
  const [copyBusy, setCopyBusy] = useState(false);
  const [message, setMessage] = useState("");
  const titleId = useId();
  const descriptionId = useId();
  const linkId = useId();

  function showOptions() {
    setMessage("");
    if (!dialog.current.open) dialog.current.showModal();
  }

  function share() {
    trackEvent("Share Clicked", "user", "button_label", 1);
    // Touch devices get their familiar system sheet; desktop gets direct choices.
    if (typeof navigator.share === "function" && window.matchMedia("(pointer: coarse)").matches) {
      shareNatively();
    } else {
      showOptions();
    }
  }

  async function shareNatively() {
    if (sharing.current) return;
    sharing.current = true;
    setBusy(true);
    try {
      // Keep the call in the click handler to preserve user activation.
      await navigator.share(SHARE_DATA);
      trackEvent("Share handed off", "share", "native", 1);
    } catch (error) {
      // Closing the device's sheet is an ordinary cancellation.
      if (error?.name !== "AbortError") showOptions();
    } finally {
      sharing.current = false;
      setBusy(false);
    }
  }

  async function copyLink() {
    if (copying.current) return;
    copying.current = true;
    setCopyBusy(true);
    try {
      await navigator.clipboard.writeText(SHARE_URL);
      setMessage("Link copied! Paste it into a chat with a friend.");
      trackEvent("Link copied", "share", "clipboard", 1);
    } catch {
      // The visible, selectable URL still works if clipboard access is denied.
      linkInput.current.focus();
      linkInput.current.select();
      setMessage("Select and copy the link below, then paste it into a chat.");
    } finally {
      copying.current = false;
      setCopyBusy(false);
    }
  }

  return (
    <>
      <button type="button" className={styles.shareBtn} onClick={share} disabled={busy}>
        {busy ? "Opening share…" : shareText}
      </button>
      <dialog ref={dialog} className={styles.dialog} aria-labelledby={titleId}
        aria-describedby={descriptionId} onClick={(event) => {
          if (event.target === event.currentTarget) {
            const bounds = event.currentTarget.getBoundingClientRect();
            if (event.clientX < bounds.left || event.clientX > bounds.right ||
                event.clientY < bounds.top || event.clientY > bounds.bottom) {
              dialog.current.close();
            }
          }
        }}>
        <div className={styles.header}>
          <h2 id={titleId}>Make a friend’s day</h2>
          <button type="button" className={styles.close} aria-label="Close sharing options"
            onClick={() => dialog.current.close()}>×</button>
        </div>
        <p id={descriptionId} className={styles.description}>A 10-second mood boost. Pass it on.</p>
        <div className={styles.destinations}>
          {destinations.map(({ name, href }) => (
            <a key={name} href={href} target={name === "Email" ? undefined : "_blank"}
              rel="noopener noreferrer" onClick={() => trackEvent("Share destination opened", "share", name, 1)}>
              {name}
            </a>
          ))}
        </div>
        {typeof navigator.share === "function" && (
          <button type="button" className={styles.more} onClick={shareNatively} disabled={busy}>
            {busy ? "Opening share…" : "More apps…"}
          </button>
        )}
        <button type="button" className={styles.copy} onClick={copyLink} disabled={copyBusy} autoFocus>
          {copyBusy ? "Copying…" : "Copy link"}
        </button>
        <label className={styles.linkLabel} htmlFor={linkId}>Or share this link</label>
        <input id={linkId} ref={linkInput} className={styles.link} readOnly value={SHARE_URL}
          onFocus={(event) => event.target.select()} />
        <p className={styles.status} role="status">{message}</p>
      </dialog>
    </>
  );
};

export default Share;
