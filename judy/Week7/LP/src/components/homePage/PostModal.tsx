import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { LpFormData, lpSchema } from "../../schema/lp.scheam";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tag } from "./Tag";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../api/apiClient";

interface Props {
  onClose: () => void;
}

interface IFFormDate {
  title: string;
  content: string;
  thumbnail: string | null;
  tags: string[];
  published: boolean;
}

export const PostModal = ({ onClose }: Props) => {
  const [tagName, setTagName] = useState<string>("");
  const [img, setImg] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImg(URL.createObjectURL(file));
      setFile(file);
    }
  };

  const onChangeTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagName(e.target.value);
  };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid },
  } = useForm<LpFormData>({
    resolver: zodResolver(lpSchema),
    mode: "onChange", // 실시간 유효성 검사
    defaultValues: {
      name: "",
      content: "",
      tags: [],
    },
  });

  const tags = watch("tags");

  const handleAddTag = () => {
    if (tags.includes(tagName)) return;

    setValue("tags", [...tags, tagName]);
    setTagName("");
  };

  const handleRemoveTag = (removeTag: string) => {
    const newTags = tags.filter((tag) => tag != removeTag);
    setValue("tags", newTags);
  };

  const { mutate } = useMutation({
    mutationFn: async (data: IFFormDate) => {
      const response = await apiClient.post("/lps", data);
      return response.data;
    },
  });

  const onSubmit = async (data: LpFormData) => {
    let imgUrl;
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      const response = await apiClient.post("/uploads", formData);
      imgUrl = response.data.data.imageUrl;
      console.log(imgUrl);
    }

    const requestData = {
      title: data.name,
      content: data.content,
      thumbnail: imgUrl || null,
      tags: data.tags,
      published: true,
    };

    mutate(requestData, {
      onSuccess: (result) => {
        const id = result.data.id;
        navigate(`/lp/${id}`);
      },
      onError: (err) => {
        console.error(err);
        alert("LP 등록 중에 오류가 발생헀습니다.");
      },
    });
  };
  return (
    <div
      className="flex flex-col w-110 h-150 bg-neutral-800 rounded-lg text-white px-5 py-5"
      ref={modalRef}
    >
      <div
        className="w-full flex justify-end cursor-pointer mb-5"
        onClick={onClose}
      >
        <IoClose size={20} />
      </div>

      <div className="w-full flex justify-center items-center mb-13">
        <label htmlFor="image-upload">
          <div className="w-55 h-55 rounded-full bg-black cursor-pointer overflow-hidden">
            {img && <img src={img} />}
          </div>
        </label>

        <input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageSelect}
        />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-between flex-1"
      >
        <div className="flex flex-col gap-4">
          <input
            {...register("name")}
            placeholder="LP Name"
            className="border-1 border-neutral-500 rounded-sm px-2 py-2 outline-0"
          />
          <input
            {...register("content")}
            placeholder="LP Content"
            className="border-1 border-neutral-500 rounded-sm px-2 py-2 outline-0"
          />
          <div className="flex gap-2">
            <input
              type="text"
              value={tagName}
              placeholder="LP Tag"
              className="border-1 border-neutral-500 rounded-sm px-2 py-2 flex-1 outline-0"
              onChange={onChangeTag}
            />
            <button
              type="button"
              className={`w-18 rounded-md ${
                tagName ? "bg-pink-600" : "bg-neutral-500"
              }  cursor-pointer flex items-center justify-center`}
              onClick={handleAddTag}
            >
              Add
            </button>
          </div>

          <div className="flex gap-2">
            {tags &&
              tags.map((tag, index) => (
                <Tag
                  tag={tag}
                  key={index}
                  onRemove={() => handleRemoveTag(tag)}
                />
              ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className={`rounded-md ${
            isValid ? "bg-pink-600" : "bg-neutral-500"
          }  mt-2 px-2 py-2 cursor-pointer w-full`}
        >
          AddLP
        </button>
      </form>
    </div>
  );
};
