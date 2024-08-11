
import "../styles/index.css"
import { initialCards } from "./cards"
import { closeModal, openModal, setCloseModalEventListeners } from "./modal"
import { likeCard, deleteCard, createCard, renderCards } from "./card"

const placesWrap = document.querySelector(".places__list")
const modalEdit = document.querySelector(".popup_type_edit")

const cardFormModal = document.querySelector(".popup_type_new-card")
const cardForm = cardFormModal.querySelector(".popup__form")
const cardNameInput = cardForm.querySelector(".popup__input_type_card-name")
const cardLinkInput = cardForm.querySelector(".popup__input_type_url")
const openCardFormButton = document.querySelector(".profile__add-button")

const imageModal = document.querySelector(".popup_type_image")
const image = imageModal.querySelector(".popup__image")
const imageCaption = imageModal.querySelector(".popup__caption")

const profile = document.querySelector(".profile")
const profileForm = modalEdit.querySelector(".popup__form")
const profileTitle = profile.querySelector(".profile__title")
const profileDescription = profile.querySelector(".profile__description")
const openProfileFormButton = document.querySelector(".profile__edit-button")
const nameInput = profileForm.querySelector(".popup__input_type_name")
const descriptionInput = profileForm.querySelector(".popup__input_type_description")

const handlePreview = (item) => { 
    image.src = item.link
    image.alt = item.name
    imageCaption.textContent = item.name
    openModal(imageModal)
}

const handleProfileFormSubmit = (evt) => {
    evt.preventDefault()
    profileTitle.textContent = nameInput.value
    profileDescription.textContent = descriptionInput.value
    closeModal(modalEdit)
}

const handleCardFormSubmit = (evt) => { 
    evt.preventDefault()
    placesWrap.prepend(
        createCard({
            name: cardNameInput.value,
            link: cardLinkInput.value,
        },
        {
            onPreview: handlePreview,
            onLike: likeCard,
            onDelete: deleteCard,
        })
    )
    closeModal(cardFormModal)
    cardForm.reset()
}

setCloseModalEventListeners(modalEdit)

setCloseModalEventListeners(cardFormModal) 

setCloseModalEventListeners(imageModal)

profileForm.addEventListener("submit", handleProfileFormSubmit)

cardForm.addEventListener("submit", handleCardFormSubmit)

openProfileFormButton.addEventListener("click", () => {     
    nameInput.value = profileTitle.textContent
    descriptionInput.value = profileDescription.textContent
    openModal(modalEdit)
})

openCardFormButton.addEventListener("click", () => { 
    openModal(cardFormModal)
})

renderCards(initialCards, placesWrap, {
    onPreview: handlePreview,
    onLike: likeCard,
    onDelete: deleteCard,
})
