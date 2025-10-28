export interface Activity {
  id: number;
  name: string;
  type: string;
  description: string;
  x: number | null;
  y: number | null;
}

export type CreateActivityDto = Omit<Activity, 'id'>;
export type UpdateActivityDto = Omit<Activity, 'id'>;