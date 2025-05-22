import { z } from "zod";

export const lpSchema = z.object({
  name: z.string().min(1, "LP 이름을 입력해주세요."),
  content: z.string().min(1, "LP 내용을 입력해주세요."),
  tags: z.array(z.string()),
});

export type LpFormData = z.infer<typeof lpSchema>;
