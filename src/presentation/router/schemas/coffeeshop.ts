import { t } from 'elysia';

export const CreateCoffeeshopRequestSchema = t.Object({
  name: t.String(),
  location: t.String(),
  lat: t.Number(),
  long: t.Number(),
  hasWifi: t.Boolean(),
  notes: t.String(),
  createdAt: t.Date(),
  updatedAt: t.Date(),
  geojson: t.String(),
});

export const UpdateCoffeeshopRequestSchema = t.Object({
  name: t.String(),
  location: t.String(),
  lat: t.Number(),
  long: t.Number(),
  hasWifi: t.Boolean(),
  notes: t.String(),
  createdAt: t.Date(),
  updatedAt: t.Date(),
  geojson: t.String(),
});

export const CoffeeshopByUserResponseSchema = t.Object({
  name: t.String(),
  location: t.String(),
  lat: t.Number(),
  long: t.Number(),
  hasWifi: t.Boolean(),
  notes: t.String(),
  createdAt: t.Date(),
  updatedAt: t.Date(),
  geojson: t.String(),
});
