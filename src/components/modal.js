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

const setCloseModalEventListeners = (modal) => { 
  const closeButtonElement = modal.querySelector(".popup__close")
  closeButtonElement.addEventListener("click", () => {
    closeModal(modal)
  })

  modal.addEventListener("click", (evt) => { 
    if (evt.target.classList.contains("popup")) {
      closeModal(modal)
    }
  })
}

export {
  openModal,
  closeModal,
  setCloseModalEventListeners
}
