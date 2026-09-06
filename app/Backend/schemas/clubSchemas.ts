import { z } from "zod";

const clubIdParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

const clubSelectionBodySchema = z.object({
  clubId: z.coerce.number().int().positive(),
});

export { clubIdParamsSchema, clubSelectionBodySchema };
