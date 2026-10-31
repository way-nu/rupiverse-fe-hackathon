/** User-facing messages for the statement import error codes in docs/statement-import-contract.md. */
export const IMPORT_ERROR_MESSAGES: Record<string, string> = {
    WRONG_PASSWORD: 'Wrong password. The file could not be opened.',
    PASSWORD_REQUIRED: 'This PDF is password protected. Enter its password.',
    UNREADABLE_PDF: "Couldn't read this PDF. It looks like a scanned image, not a bank statement.",
    UNRECOGNISED_STATEMENT: "Couldn't read this PDF. It doesn't look like a bank statement.",
};

export const DEFAULT_IMPORT_ERROR = 'Something went wrong while importing this file.';

/** Codes where entering the password again can fix the problem. */
export const RETRYABLE_CODES = ['WRONG_PASSWORD', 'PASSWORD_REQUIRED'];
