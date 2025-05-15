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

  const {
    data: lp,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["lpDetail", LPid],

    queryFn: () => fetchLpDetail(LPid!),
    enabled: !!LPid,
    onSuccess: async (data) => {
      setLikeCount(data.likes.length);

      try {
        const res = await api.get("/lps/likes/me");
        const likedLpIds = res.data.data.map((lp: any) => lp.id);
        setLiked(likedLpIds.includes(data.id));
      } catch (err) {
        console.error("내 좋아요 정보 불러오기 실패", err);
      }
    },
  });

  // 좋아요 토글 서버 요청 (Optimistic Update 추가)
  const { mutate: toggleLike } = useMutation({
    mutationFn: async (prevLiked: boolean) => {
      if (prevLiked) {
        return await api.delete(`/lps/${LPid}/likes`);
      } else {
        return await api.post(`/lps/${LPid}/likes`);
      }
    },
    onMutate: async () => {
      const prevLiked = liked;
      const nextLiked = !prevLiked;
      setLiked(nextLiked);
      setLikeCount((count) => (nextLiked ? count + 1 : count - 1));
      return prevLiked;
    },
    onSuccess: async () => {
      try {
        const res = await api.get(`/lps/${LPid}`);
        const updatedLp = res.data.data;
        setLiked(updatedLp.likes.some((like: any) => like.userId === user?.id));
        setLikeCount(updatedLp.likes.length);
      } catch (err) {
        console.error("좋아요 상태 재조회 실패", err);
      }
    },
    onError: async (err: any, prevLiked) => {
      const rollbackLiked = prevLiked;
      setLiked(rollbackLiked);
      setLikeCount((count) => (rollbackLiked ? count + 1 : count - 1));

      if (err.response?.status === 409 || err.response?.status === 404) {
        try {
          const res = await api.get(`/lps/${LPid}`);
          const updatedLp = res.data.data;
          setLiked(
            updatedLp.likes.some((like: any) => like.userId === user?.id)
          );
          setLikeCount(updatedLp.likes.length);
        } catch (fetchErr) {
          console.error("좋아요 상태 재조회 실패 (fallback)", fetchErr);
        }
        return;
      }

      console.error("좋아요 처리 실패", err);
      alert("좋아요 처리에 실패했습니다.");
    },
  });

  const handleLike = () => {
    toggleLike(liked);
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
          {!editMode && <CommentSection LPid={LPid} user={user} />}
        </div>
      </main>
    </div>
  );
};

export default LPDetail;
