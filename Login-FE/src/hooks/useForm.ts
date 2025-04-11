import { ChangeEvent, useEffect, useState } from 'react';

interface UseFormProps<T> {
  initialValues: T; // {email: '', password: ''}
  validate: (values: T) => Record<keyof T, string> //값이 올마른지 검증하는 함수
}

function useForm<T>({initialValues, validate}: UseFormProps<T>) {

  const [values, setValues] = useState(initialValues);

  const [touched, setTouched] = useState<Record<string, boolean>>() // 아직입력 안했는데 에러뜨면 기분 나쁨

  const [errors, setErrors] = useState<Record<string, string>>()

  //사용자가 입력값 바꿀 때 실행되는 함수
  const handleChange = (name: keyof T, text: string) => {
    setValues({
      ...values, //기존 입력값 유지
      [name]: text,
    })
  }

  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true,
    })
  }


  //이메일 인풋, 패스워드 인풋, 속성들을 가져오는 것
  const getInputProps = (name: keyof T) => {
    const value: T[keyof T] = values[name]
    const onChange = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => handleChange(name, e.target.value)
    const onBlur = () => handleBlur(name)

    return {value, onChange, onBlur}
  }

  //values가 변경될 때마다 에러 검증 로직
  // {email: ''}
  useEffect(() => {
    if (validate) {
      const newErrors = validate(values)
      setErrors(newErrors) // update errors message
    }
  },[validate, values])

  return {values, errors, touched, getInputProps}
}

export default useForm
