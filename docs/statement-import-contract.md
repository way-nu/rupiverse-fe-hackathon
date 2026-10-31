# Statement import: API contract (v1, draft)

The app uploads one bank or credit-card statement PDF plus its password. The backend unlocks it, extracts the transactions, stores them, and returns them so the app can render the result straight away. The app calls this once per file, so each file succeeds or fails on its own.

Base URL: `https://api.rupios.app/v1`. All requests carry `Authorization: Bearer <token>`.

## Conventions

| Topic | Rule |
|---|---|
| Money | Integer **paise** (₹1 = 100). Never floats. Field names end in `Paise`. |
| Sign | `amountPaise < 0` is money out (spend, debit). `> 0` is money in (credit, refund, card payment). Same for bank accounts and cards. |
| Dates | ISO `YYYY-MM-DD`, India time. No timestamps needed. |
| Balance of a card | `balance.amountPaise` is the amount **owed**, positive. |
| Errors | `{ "error": { "code": "WRONG_PASSWORD", "message": "..." } }` with the status below. |

## `POST /accounts/{accountId}/statements`

`Content-Type: multipart/form-data`

| Field | Type | Required | Notes |
|---|---|---|---|
| `file` | PDF | yes | `application/pdf`, max 10 MB |
| `password` | string | no | Omit if the PDF is not protected. Used only to open the file. **Do not log or store it.** |

The account's `openingDate` is already known server-side (set when the account is created). Transactions dated on or before it are **not** returned or stored, so nothing is counted twice.

Re-uploading the same or an overlapping statement must be safe. Dedupe on (account, date, description, amount, running balance if present) and report the count in `summary.duplicatesIgnored`.

### 200 OK

```jsonc
{
  "statement": {
    "id": "st_01J9",
    "fileName": "ICICI_Sep_2026.pdf",
    "sizeBytes": 219136,
    "periodStart": "2026-09-01",
    "periodEnd": "2026-09-30",
    "status": "imported"            // "imported" | "skipped"
  },
  "summary": {
    "transactionsAdded": 42,
    "duplicatesIgnored": 0,
    "skippedBeforeOpeningDate": 0,
    "skipReason": null               // set when status = "skipped", e.g. "ALL_BEFORE_OPENING_DATE"
  },
  "balance": {                       // the account's balance after this import
    "previousPaise": 38450000,
    "amountPaise": 39782000,
    "asOf": "2026-09-30"
  },
  "transactions": [
    {
      "id": "tx_8f2a",
      "accountId": "acc_01",
      "date": "2026-09-29",
      "description": "UPI-48291-RAMESH",   // cleaned merchant/narration, as shown in the app
      "amountPaise": -85000,
      "categoryId": null                    // OPTIONAL, see Categories
    }
  ]
}
```

`status: "skipped"` is a normal 200: the file was readable but nothing was imported (for example, "All 38 transactions are before your start date"). Return `transactions: []` and `skipReason`.

`transactions` is the full list added by **this** import, newest first. The same records must then appear in `GET /transactions`.

### Errors (one file each)

| Status | `code` | When | App behaviour |
|---|---|---|---|
| 400 | `INVALID_REQUEST` | Missing file, not a PDF, over 10 MB | Show message |
| 401 | `UNAUTHENTICATED` | Bad or expired token | Back to login |
| 404 | `ACCOUNT_NOT_FOUND` | Unknown `accountId` | Show message |
| 422 | `PASSWORD_REQUIRED` | PDF is encrypted and no password was sent | Ask for the password |
| 422 | `WRONG_PASSWORD` | Password does not open the PDF | "Try again" |
| 422 | `UNREADABLE_PDF` | Scanned image, or text cannot be extracted | "Couldn't read this PDF" |
| 422 | `UNRECOGNISED_STATEMENT` | Readable PDF that is not a bank or card statement | Same as above |
| 500 | `INTERNAL` | Anything else | Show message |

## `GET /accounts/{accountId}/statements`

Used by the Upload screen's "Imported statements" list. Returns the `statement` objects from above (newest first), each with `transactionsAdded`:

```jsonc
[ { "id": "st_01J9", "fileName": "ICICI_Sep_2026.pdf", "sizeBytes": 219136, "periodStart": "2026-09-01",
    "periodEnd": "2026-09-30", "status": "imported", "transactionsAdded": 42 } ]
```

`GET /accounts` should also include `statementCount` (integer) on each account; the app shows a tick next to accounts that have at least one statement.

## Categories (optional for now)

Categories are not finalised on the backend, so `categoryId` is **optional** and may always be `null`. The app treats `null` as "Uncategorised" and the user can fix it later.

If the backend can suggest a category:
- `categoryId` must be an `id` from `GET /categories`. Never invent free-text names in this field.
- Only set it when reasonably confident. Wrong guesses are worse than `null`.

`GET /categories` (already used by the app):

```jsonc
[ { "id": "food", "name": "Food", "color": "#B5460F", "source": "system" },
  { "id": "c_9ab", "name": "Pets", "color": "#1F5A50", "source": "user" } ]
```

Suggested starting set of `system` categories: `food`, `rent`, `transport`, `bills`, `subscriptions`, `shopping`. Until the backend serves this endpoint the app uses its own mock list, so the ids above are the ones we will align to.

## Mapping to the app

The app's `Transaction` type has `id, date, description, amount (rupees), categoryId, accountName, accountLast4`. The service layer will convert `amountPaise` to rupees and join the account name and last 4 digits from `GET /accounts`, so the backend does not need to return them here. Only that one service file changes when the backend goes live.

## Open questions for the backend

1. Can you return a `categoryId` suggestion at launch, or should we ship with `null` everywhere?
2. Is the 10 MB limit and a single PDF per request acceptable?
3. Should `description` be the raw bank narration or a cleaned merchant name? The app shows it as-is, and cleaned is better.
