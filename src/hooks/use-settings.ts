import { useState, useCallback, useEffect } from "react";

function getStored<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(`settings_${key}`);
    return v !== null ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}

function setStored<T>(key: string, value: T) {
  localStorage.setItem(`settings_${key}`, JSON.stringify(value));
}

export function useSetting<T>(key: string, fallback: T): [T, (v: T) => void] {
  const [value, setValue] = useState<T>(() => getStored(key, fallback));

  const update = useCallback((v: T) => {
    setValue(v);
    setStored(key, v);
  }, [key]);

  return [value, update];
}
