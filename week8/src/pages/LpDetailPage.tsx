
import { useParams } from 'react-router-dom'
import useGetLpDetail from '../hooks/queries/useGetLpDetail'
import { Heart } from 'lucide-react'
import useGetMyInfo from '../hooks/queries/useGetMyInfo'
import { useAuth } from '../context/AuthContext'
import usePostLike from '../hooks/mutations/usePostLike'
import useDeleteLike from '../hooks/mutations/useDeleteLike'

export const LpDetailPage = () => {

  const {lpId} = useParams()
  const {data:lp, isPending, isError} = useGetLpDetail({lpId: Number(lpId)})
  const {accessToken} = useAuth()
  const {data:me} = useGetMyInfo(accessToken)

  const {mutate:likeMutate} = usePostLike()
  const {mutate:dislikeMutate} = useDeleteLike()

  const isLiked = lp?.data.likes.some((like) => like.userId === me?.data.id)


  const handleLike = () => {
    likeMutate({lpId: Number(lpId)})
  }
  const handleDislike = () => {
    dislikeMutate({lpId: Number(lpId)})
  }

  const handleToggleLike = () => {
    if (isLiked) {
      handleDislike();
    } else {
      handleLike();
    }
};

  if(isPending) return <div>Loading...</div>
  if(isError) return <div>Error occurred</div>

  return (
    
    <div className='mt-12'>
      <div className='flex flex-col items-center'>
        <img 
          src={lp?.data.thumbnail} 
          alt={lp?.data.title} 
          className='object-cover w-full h-48' />
        <h1 className='text-2xl font-bold mt-4'>{lp?.data.title}</h1>
        </div>  
        <p>{lp?.data.content}</p>
        <button onClick={handleToggleLike} className='flex items-center mt-8'>
          <Heart
          color={isLiked ? 'red' : 'gray'}
          fill={isLiked ? 'red' : 'transparent'}
          />
        </button>

    </div>
  )
}
