const handleEscape = (evt) => {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".popup_is-opened")
    closeModal(activePopup)
  }
}

const openModal = (modal) => {
  modal.classList.add("popup_is-opened")
  document.addEventListener("keyup", handleEscape)
}

const closeModal = (modal) => { 
  modal.classList.remove("popup_is-opened")
  document.removeEventListener("keyup", handleEscape)
}

const setCloseModalEventListeners = () => {
  const popups = document.querySelectorAll(".popup")
  popups.forEach((popup) => {
    popup.addEventListener("click", (event) => {
      if (event.target === popup || event.target.classList.contains("popup__close")) {
        closeModal(popup)
      }
    })
  })
} 

export {
  openModal,
  closeModal,
  setCloseModalEventListeners
}
