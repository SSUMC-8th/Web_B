export type UserSignInformation = {
  email: string;
  password: string;
};

function validateUser(values: UserSignInformation) {
  const errors: Partial<Record<keyof UserSignInformation, string>> = {};
  const { email, password } = values;

  // 이메일 유효성 검사
  if (!email) {
    errors.email = "이메일을 입력해주세요.";
  } else if (
    !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
      email,
    )
  ) {
    errors.email = "유효한 이메일 주소를 입력해주세요.";
  }

  // 비밀번호 유효성 검사
  if (!password) {
    errors.password = "비밀번호를 입력해주세요.";
  } else if (password.length < 8 || password.length > 20) {
    errors.password = "비밀번호는 8~20자 사이로 입력해주세요.";
  }

  return errors;
}

// useForm에 바로 넘길 수 있게 export
export function validateSignin(values: UserSignInformation) {
  return validateUser(values);
}
