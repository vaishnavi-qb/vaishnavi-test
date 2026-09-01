import { useState } from 'react'

function LikeButton() {
  const [liked, setLiked] = useState(false)

  function handleClick() {
    setLiked(!liked)
  }

  return (
    <button onClick={handleClick}>
      {liked ? 'Unlike ❤️' : 'Like 🤍'}
    </button>
  )
}

export default LikeButton
