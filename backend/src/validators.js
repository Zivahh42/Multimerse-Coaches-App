import { z } from 'zod';


export const CoachSchema = z.object({
id: z.string().optional(),
name: z.string().min(2, 'Name is required'),
email: z.string().email('Valid email is required'),
category: z.string().min(2, 'Category is required'),
rating: z.number().int().min(1).max(5),
status: z.enum(['active', 'inactive']),
createdAt: z.string().optional()
});


export function parseCoach(input) {
return CoachSchema.parse(input);
}