import { Endpoints } from '@/constants/api';
import { http } from '@/services/http-client';
import type { PickedFile, Statement, StatementImport, Transaction } from '@/types';

/** Wire format from docs/statement-import-contract.md (money in paise). */
type StatementImportWire = {
    statement: Statement;
    summary: StatementImport['summary'];
    balance: { previousPaise: number; amountPaise: number; asOf: string };
    transactions: { id: string; accountId: string; date: string; description: string; amountPaise: number; categoryId: string | null }[];
};

export const fetchStatements = (accountId: string) => http.get<Statement[]>(Endpoints.statements(accountId));

export async function importStatement(accountId: string, file: PickedFile, password: string): Promise<StatementImport> {
    const wire = await http.postForm<StatementImportWire>(Endpoints.statements(accountId), { file, password });
    const transactions: Transaction[] = wire.transactions.map((t) => ({
        id: t.id,
        date: t.date,
        description: t.description,
        amount: t.amountPaise / 100,
        categoryId: t.categoryId,
        // Account name and last 4 are joined from GET /accounts by the UI layer when needed.
        accountName: '',
        accountLast4: null,
    }));
    return {
        statement: wire.statement,
        summary: wire.summary,
        balance: { previous: wire.balance.previousPaise / 100, amount: wire.balance.amountPaise / 100, asOf: wire.balance.asOf },
        transactions,
    };
}
