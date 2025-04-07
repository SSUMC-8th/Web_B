export const NavBar = () => {
  return (
    <div className="h-14 flex justify-between items-center bg-neutral-900 px-7">
      <h2 className="text-pink-600 font-bold text-xl">돌려돌려LP판</h2>
      <div className="flex gap-4">
        <div className="w-20 h-10 flex justify-center items-center rounded-md bg-black text-white cursor-pointer">
          로그인
        </div>
        <div className="w-20 h-10 flex justify-center items-center rounded-md bg-pink-600 text-white cursor-pointer">
          회원가입
        </div>
      </div>
    </div>
  );
};
