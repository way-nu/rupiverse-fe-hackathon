import type { ComponentProps } from 'react';
import type { Ionicons } from '@expo/vector-icons';

import { Colors } from '@/constants/theme';

export const STATUS_STYLE: Record<'imported' | 'skipped' | 'failed', { background: string; color: string; icon: ComponentProps<typeof Ionicons>['name'] }> = {
    imported: { background: Colors.successTint, color: Colors.success, icon: 'checkmark' },
    skipped: { background: Colors.warningTint, color: Colors.warning, icon: 'alert' },
    failed: { background: Colors.dangerTint, color: Colors.danger, icon: 'close' },
};
