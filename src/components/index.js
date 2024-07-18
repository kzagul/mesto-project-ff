import '../styles/index.css'
// .src/pages/index.css

import {initialCards} from './cards'

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content.querySelector('.places__item')

// @todo: DOM узлы
const placesList = document.querySelector('.places__list')

// @todo: Функция создания карточки
const createCard = (data, handleDelete) => {
    const card = cardTemplate.cloneNode(true)
    const image = card.querySelector('.card__image')
    const title = card.querySelector('.card__title');
    const deleteButton = card.querySelector('.card__delete-button')

    image.src = data.link
    image.alt = data.name
    title.textContent = data.name;

    deleteButton.addEventListener('click', handleDelete)

    return card
}

// @todo: Функция удаления карточки
const deleteCard = (event) => {
    event.target.closest('.card').remove()
}

// @todo: Вывести карточки на страницу
const renderCards = (cards, place) => {
    cards.forEach((cardData) => {
        place.append(createCard(cardData, deleteCard))
    })
}

renderCards(initialCards, placesList)
