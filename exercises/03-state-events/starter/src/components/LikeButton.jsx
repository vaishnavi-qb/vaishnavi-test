// Bug 1: plain variable — not React state, changes don't trigger re-render
// Bug 2: direct mutation — React doesn't see this change
// Bug 3: onclick should be onClick (camelCase in React)

function LikeButton() {
  let liked = false

  function handleClick() {
    liked = !liked
    console.log('liked is now:', liked)
  }

  return (
    <button onclick={handleClick}>
      {liked ? 'Unlike ❤️' : 'Like 🤍'}
    </button>
  )
}

export default LikeButton
