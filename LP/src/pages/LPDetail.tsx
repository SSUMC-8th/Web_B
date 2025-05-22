import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchLpDetail } from "../api/lp";
import api from "../api/axios";
import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import LPHeader from "../components/LPHeader";
import LPContent from "../components/LPContent";
import LPControls from "../components/LPControls";
import LikeButton from "../components/LikeButton";
import CommentSection from "../components/CommentSection";

const LPDetail = () => {
  const { LPid } = useParams();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editThumbnail, setEditThumbnail] = useState("");
  const [editTags, setEditTags] = useState("");
  const [isLiking, setIsLiking] = useState(false);

  const {
    data: lp,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["lpDetail", LPid],
    queryFn: () => fetchLpDetail(LPid!),
    enabled: !!LPid,
    onSuccess: (data) => {
      setLiked(data.likes.some((like: any) => like.userId === user?.id));
      setLikeCount(data.likes.length);
    },
  });

  // 좋아요 토글 서버 요청 (Simplified)
  const { mutate: toggleLike } = useMutation({
    mutationFn: async (prevLiked: boolean) => {
      if (prevLiked) {
        return await api.delete(`/lps/${LPid}/likes`);
      } else {
        return await api.post(`/lps/${LPid}/likes`);
      }
    },
    onMutate: (prevLiked) => {
      const nextLiked = !prevLiked;
      setLiked(nextLiked);
      setLikeCount((count) => (nextLiked ? count + 1 : count - 1));
      return prevLiked;
    },
    onError: (err: any, prevLiked) => {
      setLiked(prevLiked);
      if (err.response?.status === 409) {
        alert("이미 좋아요가 되어 있거나 오류가 발생했습니다.");
      } else {
        console.error("좋아요 처리 실패", err);
        alert("좋아요 처리에 실패했습니다.");
      }
    },
    onSuccess: async () => {
      try {
        const res = await api.get(`/lps/${LPid}`);
        const updatedLp = res.data.data;
        setLiked(updatedLp.likes.some((like: any) => like.userId === user?.id));
      } catch (err) {
        console.error("좋아요 상태 재조회 실패", err);
      }
    },
  });

  const handleLike = () => {
    if (isLiking) return;
    setIsLiking(true);
    toggleLike(liked, {
      onSettled: () => {
        setIsLiking(false);
      },
    });
  };

  const isAuthor = user?.id === lp?.author?.id;

  // LP 삭제 기능
  const { mutate: deleteLp } = useMutation({
    mutationFn: async () => {
      return await api.delete(`/lps/${LPid}`);
    },
    onSuccess: () => {
      alert("삭제되었습니다.");
      navigate("/");
    },
  });

  const { mutate: editLp } = useMutation({
    mutationFn: async () => {
      return await api.patch(`/lps/${LPid}`, {
        title: editTitle,
        content: editContent,
        thumbnail: editThumbnail,
        tags: editTags.split(",").map((tag) => tag.trim()),
        published: true,
      });
    },
    onSuccess: () => {
      alert("수정되었습니다.");
      setEditMode(false);
      window.location.reload();
    },
  });

  if (isLoading) {
    return <p className="text-white text-center mt-10">로딩 중...</p>;
  }

  if (isError || !lp) {
    return (
      <p className="text-white text-center mt-10">
        LP 정보를 불러올 수 없습니다.
      </p>
    );
  }

  return (
    <div className="w-full">
      <main className="flex-1 text-white px-4">
        <div className="bg-[#1e1e1e] rounded-lg p-6 w-full max-w-3xl mx-auto transition-all duration-300 relative">
          <LPHeader lp={lp} />
          {editMode ? (
            <EditForm
              lp={lp}
              editTitle={editTitle}
              editContent={editContent}
              editThumbnail={editThumbnail}
              editTags={editTags}
              setEditTitle={setEditTitle}
              setEditContent={setEditContent}
              setEditThumbnail={setEditThumbnail}
              setEditTags={setEditTags}
            />
          ) : (
            <LPContent lp={lp} />
          )}

          {isAuthor && (
            <LPControls
              editMode={editMode}
              setEditMode={setEditMode}
              lp={lp}
              editLp={editLp}
              deleteLp={deleteLp}
              setEditTitle={setEditTitle}
              setEditContent={setEditContent}
              setEditThumbnail={setEditThumbnail}
              setEditTags={setEditTags}
            />
          )}

          {!editMode && (
            <LikeButton
              liked={liked}
              likeCount={likeCount}
              handleLike={handleLike}
            />
          )}
          {!editMode && <CommentSection LPid={Number(LPid)} user={user} />}
        </div>
      </main>
    </div>
  );
};

export default LPDetail;
