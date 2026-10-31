import type { ComponentProps } from 'react';
import type { Ionicons } from '@expo/vector-icons';

type IconName = ComponentProps<typeof Ionicons>['name'];

export const TABS: { name: string; title: string; icon: IconName; iconFilled: IconName; sf: 'house' | 'list.bullet' | 'square.and.arrow.up' | 'tag'; sfSelected: 'house.fill' | 'list.bullet' | 'square.and.arrow.up.fill' | 'tag.fill'; md: 'home' | 'list' | 'upload' | 'sell' }[] = [
    { name: 'index', title: 'Home', icon: 'home-outline', iconFilled: 'home', sf: 'house', sfSelected: 'house.fill', md: 'home' },
    { name: 'transactions', title: 'Transactions', icon: 'list-outline', iconFilled: 'list', sf: 'list.bullet', sfSelected: 'list.bullet', md: 'list' },
    { name: 'statements', title: 'Statements', icon: 'cloud-upload-outline', iconFilled: 'cloud-upload', sf: 'square.and.arrow.up', sfSelected: 'square.and.arrow.up.fill', md: 'upload' },
    { name: 'categories', title: 'Categories', icon: 'pricetag-outline', iconFilled: 'pricetag', sf: 'tag', sfSelected: 'tag.fill', md: 'sell' },
];
