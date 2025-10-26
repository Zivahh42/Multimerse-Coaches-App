export type Coach = {
id: string;
name: string;
email: string;
category: string; // Fitness, Yoga, Cricket
rating: number; // 1-5
status: 'active' | 'inactive';
createdAt: string;
};