export type UserSigninInfomation = {
  email: string;
  password: string;
};

export const emailRegEx =
  /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
export const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;

function validateUser(values: UserSigninInfomation) {
  const errors = {
    email: "",
    password: "",
  };

  if (!emailRegEx.test(values.email)) {
    errors.email = "올바른 이메일 형식이 아닙니다.";
  }

  if (!passwordRegEx.test(values.password)) {
    errors.password = "비밀번호는 8~20자 사이로 입력해주세요.";
  }

  return errors;
}

// 로그인 유효성 검사
function validateSignin(values: UserSigninInfomation) {
  return validateUser(values);
}

export { validateSignin };
