import { z } from "zod";

const clubIdParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export { clubIdParamsSchema };
