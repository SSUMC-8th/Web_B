import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import useForm from '../hooks/useForm';
import { UserSigninInformation, validateSignin } from '../utils/validate';
import { useNavigate } from 'react-router-dom';



const LoginPage = () => {
  const{login,accessToken} = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if(accessToken){
      navigate('/')
    }
  }, [accessToken, navigate])


  const {values, errors,touched, getInputProps} = useForm<UserSigninInformation>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: validateSignin,
  })


  const handleSubmit = async() => {
  
    await login(values)
  }

  const handleGoogleLogin = () => {
    window.location.href =
      `${import.meta.env.VITE_SERVER_API_URL}/v1/auth/google/login`
  }


  const isDisabled =  // Check if there are any errors or if the form is not filled out -> disable the button
    Object.values(errors || {}).some((error) => error.length > 0) ||
    Object.values(values).some((value) => value === "");

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className='flex flex-col gap-3'>
        <input 
          {...getInputProps('email')}
          name = "email"
          type={"email"} 
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
            ${errors?.email &&touched?.email ? "border-red-500 bg-red-200" : "border-gray-300"}`} 
          placeholder={"이메일"}
          />
          {errors?.email &&touched?.email &&(<div className='text-red-500 text-sm'>{errors.email}</div>)}
          
          <input 
          {...getInputProps('password')}
          type={"password"} 
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
            ${errors?.password &&touched?.password ? "border-red-500 bg-red-200" : "border-gray-300"}`} 
          placeholder={"비밀번호"}
          />
          {errors?.password &&touched?.password &&(<div className='text-red-500 text-sm'>{errors.password}</div>)}


          <button 
            type='button' 
            onClick={handleSubmit} 
            disabled={isDisabled} 
            className='w-full bg-[#807bff] text-white p-[10px] rounded-sm hover:bg-[#807bff]/80 active:bg-[#807bff]/90 disabled:bg-[#807bff]/50'
          >
            로그인
          </button>
          <button 
            type='button' 
            onClick={handleGoogleLogin} 
            //disabled={isDisabled} 
            className='w-full bg-[#807bff] text-white p-[10px] rounded-sm hover:bg-[#807bff]/80 active:bg-[#807bff]/90 disabled:bg-[#807bff]/50'
          >
            <div className='flex items-center justify-center gap-4'>
              <img src="images/google_logo.svg" alt="Google Logo Image" />
              <span>구글 로그인</span>
            </div>
          </button>
      </div>
    </div>
  );
}
export default LoginPage;