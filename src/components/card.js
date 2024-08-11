const likeCard = (event) => {
    event.target.classList.toggle('card__like-button_is-active')
}

const deleteCard = (event) => {
    event.target.closest(".card").remove()
}

const getTemplate = () => {
    return document
        .querySelector('#card-template')
        .content.querySelector('.card')
        .cloneNode(true)
}

const createCard = (
    data,
    { onPreview, onLike, onDelete }
) => {
    const card = getTemplate()
    const image = card.querySelector('.card__image')
    image.src = data.link
    image.alt = data.name
    const likeButton = card.querySelector(".card__like-button")
    const deleteButton = card.querySelector(".card__delete-button")

    const title = card.querySelector('.card__title')
    title.textContent = data.name

    if (onLike) {
        likeButton.addEventListener("click", onLike)
    }

    if (onDelete) {
        deleteButton.addEventListener("click", onDelete)
    }

    if (onPreview) {
        image.addEventListener("click", () => onPreview(data))
    }
    
    return card
};

export {
    likeCard,
    deleteCard,
    getTemplate,
    createCard,
}
