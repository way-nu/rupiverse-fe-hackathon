import { Endpoints } from '@/constants/api';
import { http } from '@/services/http-client';
import type { Category } from '@/types';

export const fetchCategories = () => http.get<Category[]>(Endpoints.categories);

export const createCategory = (name: string) => http.post<Category>(Endpoints.categories, { name });
