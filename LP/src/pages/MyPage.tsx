import { useEffect, useState, useRef } from "react";
import api from "../api/axios";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

interface UserInfo {
  id: number;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
}

const Mypage = () => {
  const { accessToken, logout, setUser, user } = useAuthContext();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [bioInput, setBioInput] = useState("");
  const [avatarInput, setAvatarInput] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const previousUserRef = useRef<UserInfo | null>(null);

  const { mutate: updateUser } = useMutation({
    mutationFn: async () => {
      const payload: any = {};
      if (nameInput.trim()) payload.name = nameInput;
      if (bioInput.trim()) payload.bio = bioInput;
      if (avatarInput.trim()) payload.avatar = avatarInput;
      return await api.patch("/users", payload);
    },
    onMutate: async () => {
      if (!user) return;

      previousUserRef.current = user;

      const optimisticUser: UserInfo = {
        ...user,
        name: nameInput,
        bio: bioInput,
        avatar: avatarInput,
      };

      setUser(optimisticUser);
      setEditMode(false);
    },
    onSuccess: (res) => {
      setUser(res.data.data);
    },
    onError: () => {
      alert("수정 실패");
      if (previousUserRef.current) {
        setUser(previousUserRef.current);
      }
    },
  });

  useEffect(() => {
    console.log("Fetching mypage user info", accessToken);
    const fetchUser = async () => {
      try {
        const res = await api.get("/users/me");
        setUser(res.data.data);
      } catch (err) {
        console.error("내 정보 불러오기 실패", err);
      }
    };

    fetchUser();
  }, [accessToken]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center bg-black min-h-screen text-white">
      <div className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold mb-4">마이페이지</h1>
        {user ? (
          editMode ? (
            <div className="space-y-4 flex flex-col items-center">
              <div
                className="w-40 h-40 rounded-full bg-gray-700 flex items-center justify-center text-3xl text-white cursor-pointer border-2 border-white"
                onClick={() => fileInputRef.current?.click()}
              >
                {avatarInput ? (
                  <img
                    src={avatarInput}
                    alt="프로필"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  "👤"
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = () => {
                        if (reader.result)
                          setAvatarInput(reader.result.toString());
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
              <input
                className="w-[80%] text-center p-2 bg-transparent border border-white text-white rounded-full"
                placeholder="이름"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
              />
              <input
                className="w-[80%] text-center p-2 bg-transparent border border-white text-white rounded-full"
                placeholder="Bio (선택)"
                value={bioInput}
                onChange={(e) => setBioInput(e.target.value)}
              />
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => updateUser()}
                  className="border border-white text-white px-4 py-2 rounded-full"
                  disabled={!nameInput.trim()}
                >
                  ✔
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="border border-white text-white px-4 py-2 rounded-full"
                >
                  ✖
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4 mb-4">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt="프로필 이미지"
                  className="w-20 h-20 rounded-full object-cover border border-gray-500"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center text-3xl text-white">
                  👤
                </div>
              )}
              <div>
                <p className="text-lg font-semibold">{user.name}</p>
                <p className="text-sm text-gray-400">{user.email}</p>
                <button
                  onClick={() => {
                    setEditMode(true);
                    setNameInput(user.name);
                    setBioInput(user.bio || "");
                    setAvatarInput(user.avatar || "");
                  }}
                  className="mt-2 px-4 py-2 bg-yellow-500 rounded"
                >
                  ✏️ 설정
                </button>
              </div>
            </div>
          )
        ) : (
          <p>로딩 중...</p>
        )}

        <div className="mt-6 space-x-4">
          <button
            onClick={handleLogout}
            className="bg-gray-600 px-4 py-2 rounded"
          >
            로그아웃
          </button>
          <button
            onClick={() => navigate("/token-test")}
            className="bg-blue-600 px-4 py-2 rounded"
          >
            토큰 테스트
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
