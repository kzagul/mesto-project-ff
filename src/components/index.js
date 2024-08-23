import "../styles/index.css"
import { createCard, handleLikeCard } from "./card"
import { closeModal, openModal, setCloseModalEventListeners } from "./modal"
import { enableValidation, clearValidation } from "./validation"
import {
  getCards,
  postCard,
  deleteCard,
  getUser,
  updateAvatar,
  editProfile
} from "./api"

const placesWrap = document.querySelector(".places__list")

const profile = document.querySelector(".profile")
const profileTitle = profile.querySelector(".profile__title")
const profileDescription = profile.querySelector(".profile__description")
const userAvatar = profile.querySelector(".profile__image")

// модальные окна
const modalEditProfile = document.querySelector(".popup_type_edit")
const modalAddCard = document.querySelector(".popup_type_new-card")
const modalEditAvatar = document.querySelector(".popup_type_avatar_edit")
const modalImage = document.querySelector(".popup_type_image")
const modalDeleteCard = document.querySelector(".popup_type_confirm_delete")

// Формы
const profileForm = modalEditProfile.querySelector(".popup__form")
const cardForm = modalAddCard.querySelector(".popup__form")
const avatarForm = modalEditAvatar.querySelector(".popup__form")
const formDeleteCard = modalDeleteCard.querySelector(".popup__form")

// Поля ввода форм
const nameInput = profileForm.querySelector(".popup__input_type_name")
const descriptionInput = profileForm.querySelector(".popup__input_type_description")
const cardNameInput = cardForm.querySelector(".popup__input_type_card-name")
const cardLinkInput = cardForm.querySelector(".popup__input_type_url")
const avatarInput = avatarForm.querySelector(".popup__input_type_avatar")
const image = modalImage.querySelector(".popup__image")
const imageCaption = modalImage.querySelector(".popup__caption")

// buttons открытия форм
const openProfileFormButton = profile.querySelector(".profile__edit-button")
const openCardFormButton = profile.querySelector(".profile__add-button")
const openAvatarFormButton = profile.querySelector(".profile__avatar-button")

let userId
let cardToDelete
let cardToDeleteId

const validation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
}

window.addEventListener('load', () => {
  enableValidation(validation)
})

const handlePreview = (card) => {
  image.src = card.link
  image.alt = card.name
  imageCaption.textContent = card.name
  openModal(modalImage)
}

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault()
  renderLoading(true, modalEditProfile)
  editProfile({ name: nameInput.value, about: descriptionInput.value })
    .then((data) => {
      profileTitle.textContent = data.name
      profileDescription.textContent = data.about
      closeModal(modalEditProfile)
    })
    .catch((error) => console.error("Произошла ошибка:", error))
    .finally(() => renderLoading(false, modalEditProfile))
}

const handleCardFormSubmit = (evt) => {
  evt.preventDefault()
  const popupElement = document.querySelector(".popup_is-opened")
  renderLoading(true, popupElement)
  postCard({
    name: cardNameInput.value,
    link: cardLinkInput.value,
  })
    .then((newCard) => {
      placesWrap.prepend(
        createCard(
          newCard,
          userId,
          { 
            onPreview: handlePreview,
            onDelete: openDeleteForm,
            onLike: handleLikeCard
          }
        )
      )
    })
    .then(() => {
      closeModal(popupElement)
    })
    .catch((error) => {
      console.error("Произошла ошибка:", error)
    })
    .finally(() =>{
      renderLoading(false, popupElement)
    })
  cardForm.reset()
}

const handleAvatarFormSubmit = (evt) => {
  evt.preventDefault()
  renderLoading(true, modalEditAvatar)
  updateAvatar(avatarInput.value)
    .then((data) => {
      userAvatar.style.backgroundImage = `url('${data.avatar}')`
      closeModal(modalEditAvatar)
    })
    .catch((error) => console.error("Произошла ошибка:", error))
    .finally(() => renderLoading(false, modalEditAvatar))
}

const openDeleteForm = (card, cardId) => {
  openModal(modalDeleteCard)
  cardToDelete = card
  cardToDeleteId = cardId
}

const handleDeleteCardSubmit = (evt) => {
  evt.preventDefault()
  renderLoadingDelete(true, modalDeleteCard)
  deleteCard(cardToDeleteId)
    .then(() => {
      cardToDelete.remove()
      closeModal(modalDeleteCard)
    })
    .catch((error) => console.error("Произошла ошибка:", error))
    .finally(() => renderLoadingDelete(false, modalDeleteCard))
}

openProfileFormButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent
  descriptionInput.value = profileDescription.textContent
  openModal(modalEditProfile)
})

openCardFormButton.addEventListener("click", () => {
  openModal(modalAddCard)
  clearValidation(cardForm, validation)
})

openAvatarFormButton.addEventListener("click", () => {
  avatarInput.value = ""
  openModal(modalEditAvatar)
  clearValidation(avatarForm, validation)
})

profileForm.addEventListener("submit", handleProfileFormSubmit)
cardForm.addEventListener("submit", handleCardFormSubmit)
avatarForm.addEventListener("submit", handleAvatarFormSubmit)
formDeleteCard.addEventListener("submit", handleDeleteCardSubmit)

setCloseModalEventListeners()

const renderLoading = (isLoading, modal) => {
  const activeButton = modal.querySelector(".popup__button")
  activeButton.textContent = isLoading ? "Сохранение..." : "Сохранить"
}

const renderLoadingDelete = (isLoading, modal) => {
  const activeButton = modal.querySelector(".popup__button")
  activeButton.textContent = isLoading ? "Удаление..." : "Да"
}

Promise.all([getUser(), getCards()])
  .then(([userData, cardData]) => {
    profileTitle.textContent = userData.name
    profileDescription.textContent = userData.about
    userAvatar.style.backgroundImage = `url('${userData.avatar}')`
    userId = userData._id

    cardData.forEach((card) => {
      placesWrap.append(
        createCard(
          card,
          userId,
          {
            onPreview: handlePreview,
            onDelete: openDeleteForm,
            onLike: handleLikeCard
          }
        )
      )
    })
  })
  .catch((error) => console.error("Ошибка:", error))
