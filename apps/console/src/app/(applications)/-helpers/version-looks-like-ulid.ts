/**
 * Check if the version looks like a ULID (i.e. 01JDQ5E6P4BQWSM7V4DFCZ5D94)
 * @param version string
 * @returns boolean
 */
function versionLooksLikeULID(version: string): boolean {
  return /^[0-9A-Z]{26}$/.test(version);
}

export {versionLooksLikeULID};
