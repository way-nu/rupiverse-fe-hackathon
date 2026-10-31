import { useState } from 'react';

export function useTextField(revealable?: boolean) {
    const [hidden, setHidden] = useState(!!revealable);
    return { hidden, toggle: () => setHidden((h) => !h) };
}
