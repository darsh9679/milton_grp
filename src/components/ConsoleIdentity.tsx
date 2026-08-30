"use client";

import { useEffect } from "react";

type IdentityPayload = {
  ciphertext: string;
  salt: string;
  iv: string;
};

declare global {
  interface Window {
    whoAmI?: (passphrase: string) => Promise<void>;
  }
}

const payloads: IdentityPayload[] = [
  {
    ciphertext:
      "nWtk6ERh++T7B2vU6Yo/N1QqVmmUrD+DG8VotMKT1a/U9ehLkCz9G+4iyDXgOcczVAwwhv11NhpeANDTxv+YOlB2BYKvDA==",
    salt: "URVs3XKaamTHF/xzOWPd/Q==",
    iv: "iOlYP7gMJt39ABRk"
  },
  {
    ciphertext: "TpDzuPBmre9FtzsJtcn4ovjJM2lFt+RhB0tFt1FrDAg6PNEPvuGC",
    salt: "4iVwMfV4nbzECkmlolGIFw==",
    iv: "spEKx2pB3H+xLEAA"
  },
  {
    ciphertext: "INdlpgabZNuXDtOED9qmQ7/GzwbSSuhIClCbKJXvUa2Plh+IKgDO",
    salt: "rLrdnk5xx4E0P3BbthvBKg==",
    iv: "IPnx5oYnYFSczJyd"
  }
];

const iterations = 120000;
const successStyle = "color:#7c3aed; font-weight:bold; font-size:14px;";
const errorStyle = "color:#ef4444; font-weight:bold;";

function decodeBase64(value: string) {
  return Uint8Array.from(window.atob(value), (character) =>
    character.charCodeAt(0)
  );
}

function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  const buffer = new ArrayBuffer(bytes.byteLength);
  new Uint8Array(buffer).set(bytes);
  return buffer;
}

async function deriveKey(passphrase: string, salt: Uint8Array) {
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(passphrase),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: toArrayBuffer(salt),
      iterations,
      hash: "SHA-256"
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );
}

async function decryptPayload(passphrase: string, payload: IdentityPayload) {
  const salt = decodeBase64(payload.salt);
  const iv = decodeBase64(payload.iv);
  const ciphertext = decodeBase64(payload.ciphertext);
  const key = await deriveKey(passphrase, salt);
  const decrypted = await window.crypto.subtle.decrypt(
    { name: "AES-GCM", iv: toArrayBuffer(iv) },
    key,
    toArrayBuffer(ciphertext)
  );

  return new TextDecoder().decode(decrypted);
}

export function ConsoleIdentity() {
  useEffect(() => {
    const revealIdentity = async (passphrase: string) => {
      if (!passphrase || !window.crypto?.subtle) {
        console.log("%cWrong phrase.", errorStyle);
        return;
      }

      for (const payload of payloads) {
        try {
          const decryptedText = await decryptPayload(passphrase, payload);
          console.log(`%c${decryptedText}`, successStyle);
          return;
        } catch {
          // Continue until one encrypted payload matches the passphrase.
        }
      }

      console.log("%cWrong phrase.", errorStyle);
    };

    Object.defineProperty(window, "whoAmI", {
      value: revealIdentity,
      configurable: true,
      writable: true
    });

    return () => {
      if (window.whoAmI === revealIdentity) {
        delete window.whoAmI;
      }
    };
  }, []);

  return null;
}
