/** True for "[ADD ...]" placeholders or empty strings. */
export const isPlaceholder = (v: string | undefined | null) => !v || /^\s*\[ADD[^\]]*\]\s*$/.test(v)

/** True if the string contains a placeholder anywhere. */
export const hasPlaceholder = (v: string) => /\[ADD[^\]]*\]/.test(v)
