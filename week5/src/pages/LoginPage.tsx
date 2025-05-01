import useForm from '../hooks/useForm';
import { UserSigninInformation, validateSignin } from '../utils/validate';

const LoginPage = () => {

  const {values, errors,touched, getInputProps} = useForm<UserSigninInformation>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: validateSignin,
  })


  const handleSubmit = () => {}

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className='flex flex-col gap-3'>
        <input 
          {...getInputProps('email')}
          type={"email"} 
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
            ${errors?.email &&touched?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`} 
          placeholder={"이메일"}
          />
          {errors?.email &&touched?.email &&(<div className='text-red-500 text-sm'>{errors.email}</div>)}
          <input 
          {...getInputProps('password')}
          type={"password"} 
          className={'border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm'} 
          placeholder={"비밀번호"}
          />
          <button 
            type='button' 
            onClick={handleSubmit} 
            disabled={false} 
            className='w-full bg-[#807bff] text-white p-[10px] rounded-sm hover:bg-[#807bff]/80 active:bg-[#807bff]/90 disabled:bg-[#807bff]/50'
          >
            로그인
          </button>
      </div>
    </div>
  );
}
export default LoginPage;