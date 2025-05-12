import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z
      .string()
      .min(8, {
        message: "비밀번호는 8자 이상이어야 합니다.",
      })
      .max(20, {
        message: "비밀번호는 20자 이하이어야 합니다.",
      }),
    confirmPassword: z.string(),
    name: z.string().min(1, {
      message: "이름을 입력해주세요.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "비밀번호가 일치하지 않습니다.",
  });

export type FormFields = z.infer<typeof schema>;

export const SignupFormProvider = ({ children }: { children: ReactNode }) => {
  const methods = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};
