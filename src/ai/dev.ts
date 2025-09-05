
import { config } from 'dotenv';
config();

import '@/ai/flows/inventory-object-identification.ts';
import '@/ai/flows/inventory-from-text.ts';
import '@/ai/flows/move-details.ts';
import '@/ai/flows/generate-reminder-email.ts';
import '@/ai/flows/route-optimization-flow.ts';

