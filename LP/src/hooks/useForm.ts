import { ChangeEvent, useEffect, useState } from "react";

type UseFormProps<T> = {
  initialValues: T;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
};

function useForm<T>({ initialValues, validate }: UseFormProps<T>) {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  //사용자가 입력값을 바꿀때 실행되는 함수
  const handleChange = (name: keyof T, text: string) => {
    setValues({
      ...values, //불변성 유지
      [name]: text,
    });
  };

  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  //이메일 인풋, 패스워드 인풋, 속성들
  const getInputProps = (name: keyof T) => {
    const value: T[keyof T] = values[name];
    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      handleChange(name, e.target.value);

    const onBlur = () => handleBlur(name);

    return { value, onChange, onBlur };
  };

  useEffect(() => {
    const newErrors = validate ? validate(values) : {};
    setErrors(newErrors as Record<string, string>);
  }, [validate, values]);

  return { values, errors, touched, getInputProps };
}

export default useForm;
