import messages from "../../helper/constants/messages.ts";

interface StatusData {
  id: number;
  code: string;
  name: string;
  status: number;
}

interface StatusUpdateData {
  id: number;
  code: string;
  name: string;
  status: number;
}

interface StatusPatchData {
  id: number;
  code: string;
  name: string;
  status: number;
}

interface ValidationError {
  message: string;
}

interface ValidationResult<T> {
  error: { details: ValidationError[] } | null;
  validatedData?: T;
}


const validateStatus = (data: StatusData): ValidationResult<StatusData> => {
  const errors: ValidationError[] = [];

  // Validate code (required, string, 3-50 chars)
  if (!data.code || typeof data.code !== 'string' || data.code.length < 3 || data.code.length > 50) {
    errors.push({ message: messages.VALIDATION.CODE_INVALID });
  }

  // Validate name (required, string, 3-50 chars)
  if (!data.name || typeof data.name !== 'string' || data.name.length < 3 || data.name.length > 50) {
    errors.push({ message: messages.VALIDATION.NAME_INVALID });
  }

  return errors.length > 0 ? { error: { details: errors } } : { error: null, validatedData: data };
};

const validateStatusUpdate = (data: StatusUpdateData): ValidationResult<StatusData> => {
  const errors: ValidationError[] = [];

  // Validate code (required, string, 3-50 chars)
  if (!data.code || typeof data.code !== 'string' || data.code.length < 3 || data.code.length > 50) {
    errors.push({ message: messages.VALIDATION.CODE_INVALID });
  }

  // Validate name (required, string, 3-50 chars)
  if (!data.name || typeof data.name !== 'string' || data.name.length < 3 || data.name.length > 50) {
    errors.push({ message: messages.VALIDATION.NAME_INVALID });
  }

  // Validate status (optional, integer, 0 or 1)
  if (data.status !== undefined && (!Number.isInteger(data.status) || ![0, 1].includes(data.status))) {
    errors.push({ message: messages.VALIDATION.STATUS_INVALID });
  }

  return errors.length > 0 ? { error: { details: errors } } : { error: null, validatedData: data };
};

const validateStatusPatch = (data: StatusPatchData): ValidationResult<StatusData> => {
  const errors: ValidationError[] = [];

  // Ensure at least one field is provided
  if (!data.code && !data.name && data.status === undefined) {
    errors.push({ message: messages.VALIDATION.PATCH_FIELDS_REQUIRED });
  }

  // Validate code (optional, string, 3-50 chars)
  if (data.code !== undefined && (typeof data.code !== 'string' || data.code.length < 3 || data.code.length > 50)) {
    errors.push({ message: messages.VALIDATION.CODE_OPTIONAL_INVALID });
  }

  // Validate name (optional, string, 3-50 chars)
  if (data.name !== undefined && (typeof data.name !== 'string' || data.name.length < 3 || data.name.length > 50)) {
    errors.push({ message: messages.VALIDATION.NAME_OPTIONAL_INVALID });
  }

  // Validate status (optional, integer, 0 or 1)
  if (data.status !== undefined && (!Number.isInteger(data.status) || ![0, 1].includes(data.status))) {
    errors.push({ message: messages.VALIDATION.STATUS_INVALID });
  }

  return errors.length > 0 ? { error: { details: errors } } : { error: null, validatedData: data };
};

export { validateStatus, validateStatusUpdate, validateStatusPatch };