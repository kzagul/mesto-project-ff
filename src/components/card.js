import { likeCard, dislikeCard } from "./api"

const handleLikeCard = (likeButton, cardId, likesCount) => {
  const likeAction = likeButton.classList.contains("card__like-button_is-active") 
    ? dislikeCard 
    : likeCard
  likeAction(cardId)
    .then((result) => {
      likesCount.textContent = result.likes.length
      likeButton.classList.toggle("card__like-button_is-active")
    })
    .catch((error) => {
      console.log(error)
    })
}

const getTemplate = () => {
  return document
      .querySelector('#card-template')
      .content.querySelector('.card')
      .cloneNode(true)
}

export const createCard = (
  data,
  userId,
  { onPreview, onDelete }
) => {
  const card =  getTemplate()
  const image = card.querySelector(".card__image")

  image.src = data.link
  image.alt = data.name

  const likeButton = card.querySelector(".card__like-button")
  const deleteButton = card.querySelector(".card__delete-button")
  const likesCount = card.querySelector(".card__like-counter")

  likesCount.textContent = data.likes.length

  const title = card.querySelector(".card__title")
  title.textContent = data.name


  if (data.owner._id !== userId) {
    deleteButton.disabled = true
    deleteButton.style.display = "none"
  }

  if (data.likes.some((user) => user._id === userId)) {
    likeButton.classList.add("card__like-button_is-active")
  }

  likeButton.addEventListener("click", () => {
    handleLikeCard(likeButton, data._id, likesCount)
  })

  if (onDelete) {
    deleteButton.addEventListener("click", () => {
      onDelete(card, data._id)
    })
  }

  if (onPreview) {
    image.addEventListener("click", () => {
      onPreview({ name: data.name, link: data.link })
    })
  }

  return card
}
