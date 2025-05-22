import { ChangeEvent, useEffect, useState } from "react";
import { apiClient } from "../api/apiClient";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import { TiPencil } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface IFMyInfo {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

interface IFLogout {
  status: boolean;
  statusCode: number;
  message: string;
  data: null;
}

interface UserRequest {
  name: string;
  bio: string | null;
  avatar: string | null;
}

export const MyPage = () => {
  const [myInfo, setMyInfo] = useState<IFMyInfo["data"] | null>(null);
  const [newName, setNewName] = useState<string>("");
  const [newBio, setNewBio] = useState<string | null>(null);
  const [newImg, setNewImg] = useState<string | null>(null);
  const [newImgFile, setNewImgFile] = useState<File | null>(null);
  const [modify, setModify] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // 내 정보 조회
  const getMyInfo = async () => {
    try {
      const response = await apiClient.get<IFMyInfo>("/users/me");
      console.log(response);
      setMyInfo(response.data.data);
      setNewImg(response.data.data.avatar || null);
      setNewName(response.data.data.name);
      setNewBio(response.data.data.bio || null);
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
    } catch (error) {
      console.log(error);
      alert("마이페이지 정보를 가져오는데 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    getMyInfo();
  }, []);

  // 닉네임 onChange 함수
  const onChangeNickname = (e: ChangeEvent<HTMLInputElement>) => {
    setNewName(e.target.value);
  };

  // 자기소개 onChange 함수
  const onChangeBio = (e: ChangeEvent<HTMLInputElement>) => {
    setNewBio(e.target.value);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setNewImg(URL.createObjectURL(file));
      setNewImgFile(file);
    }
  };

  //로그아웃
  const handleLogout = async () => {
    try {
      const { data } = await apiClient.post<IFLogout>("/auth/signout", {});
      if (data.statusCode === 201) {
        navigate("/login");
        // localstorage에 저장해놓은 accessToken과 refreshToken 삭제
        window.localStorage.removeItem("accessToken");
        window.localStorage.removeItem("refreshToken");
      }
    } catch (error) {
      console.log(error);
      alert("로그아웃에 실패했습니다. ");
    }
  };

  const modifyUserMutation = useMutation({
    mutationFn: async (data: UserRequest) => {
      await apiClient.patch("/users", data);
    },
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: ["userInfo"] });

      const previous = queryClient.getQueryData(["userInfo"]);

      queryClient.setQueryData(["userInfo"], (old: any) => {
        if (!old?.data) return old;

        return {
          ...old,
          data: {
            ...old.data,
            name: newData.name,
            bio: newData.bio,
            avatar: newData.avatar,
          },
        };
      });

      return { previous };
    },
    onError: (err, _, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["userInfo"], context.previous);
      }
    },

    onSettled: () => {
      setModify(false);
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
    },
  });

  const onUserModify = async () => {
    let imgUrl;
    if (newImgFile) {
      const formData = new FormData();
      formData.append("file", newImgFile);
      const response = await apiClient.post("/uploads", formData);
      imgUrl = response.data.data.imageUrl;
      console.log(imgUrl);
    }

    const requestData = {
      name: newName,
      bio: newBio,
      avatar: imgUrl || null,
    };

    modifyUserMutation.mutate(requestData);
  };

  return (
    <div className="bg-black flex justify-center">
      <div className="flex flex-col items-center mt-15 h-96 justify-between">
        <div className="flex items-center gap-10">
          <div>
            {modify ? (
              <>
                <label htmlFor="image-upload" className="cursor-pointer">
                  {newImg ? (
                    <img
                      src={newImg}
                      className="w-35 h-35 overflow-hidden rounded-full"
                    />
                  ) : (
                    <FaUserCircle color="white" size={"150"} className="mb-3" />
                  )}
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageSelect}
                />
              </>
            ) : (
              <>
                {newImg ? (
                  <img
                    src={newImg}
                    className="w-35 h-35 overflow-hidden rounded-full"
                  />
                ) : (
                  <FaUserCircle color="white" size={"150"} className="mb-3" />
                )}
              </>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-white text-2xl">
              {modify ? (
                <input
                  type="text"
                  placeholder="닉네임을 작성해주세요"
                  value={newName}
                  className="border-1 text-white rounded-sm px-2"
                  onChange={onChangeNickname}
                />
              ) : (
                newName
              )}
            </span>
            <span className="text-white text-lg">
              {modify ? (
                <input
                  type="text"
                  placeholder="자기소개를 작성해주세요"
                  value={newBio || ""}
                  className="border-1 text-white rounded-sm px-2"
                  onChange={onChangeBio}
                />
              ) : (
                newBio || ""
              )}
            </span>
            <span className="text-white text-l">이메일: {myInfo?.email}</span>
          </div>
          <button disabled={!newName.trim()} className="border-0">
            {modify ? (
              <FaCheck
                className="text-white cursor-pointer"
                size={20}
                onClick={onUserModify}
              />
            ) : (
              <TiPencil
                className="text-white cursor-pointer"
                size={20}
                onClick={() => setModify(true)}
              />
            )}
          </button>
        </div>

        <div
          className="text-red-400 w-full cursor-pointer flex justify-end"
          onClick={handleLogout}
        >
          로그아웃
        </div>
      </div>
    </div>
  );
};
