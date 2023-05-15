import { Subtype } from '../features/TypeNative';

const validateDuplicateSubtype = (value: string, subtypes: Subtype[]) => {
  return (
    value &&
    !subtypes.some(
      x =>
        x.subtypeName.toLocaleLowerCase().trim() ===
        value.toLocaleLowerCase().trim()
    )
  );
};

export { validateDuplicateSubtype };
