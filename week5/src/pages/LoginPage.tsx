import { postSignin } from '../apis/auth';
import useForm from '../hooks/useForm';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { UserSigninInformation, validateSignin } from '../utils/validate';



const LoginPage = () => {

  const{setItem} = useLocalStorage('LOCAL_STORAGE_KEY.ACCESS_TOKEN') 

  const {values, errors,touched, getInputProps} = useForm<UserSigninInformation>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: validateSignin,
  })


  const handleSubmit = async() => {
    try{
      const response = await postSignin(values)
      console.log(response)
      // 로그인 성공 시 accessToken을 localStorage에 저장
      setItem(response.data.accessToken)
    } catch (error) {
      alert("로그인에 실패했습니다.")
    }
    
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
      </div>
    </div>
  );
}
export default LoginPage;