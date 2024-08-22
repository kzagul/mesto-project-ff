const showInputError = (modal, input, config, errorMessage) => {
  const inputError = modal.querySelector(`.${input.id}-error`)
  input.classList.add(config.inputErrorClass)
  inputError.textContent = errorMessage
  inputError.classList.add(config.errorClass)
}

const removeInputError = (modal, input, config) => {
  const inputError = modal.querySelector(`.${input.id}-error`)
  input.classList.remove(config.inputErrorClass)
  inputError.classList.remove(config.errorClass)
  inputError.textContent = ""
}

const isValid = (modal, input, config) => {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage)
  } else {
    input.setCustomValidity("")
  }

  if (!input.validity.valid) {
    showInputError(
      modal,
      input,
      config,
      input.validationMessage
    )
  } else {
    removeInputError(modal, input, config)
  }
}

const toggleValidation = (inputList, submitButton, config) => {
  if (inputList.some((input) => !input.validity.valid)) {
    submitButton.classList.add(config.inactiveButtonClass)
    submitButton.disabled = true
  } else {
    submitButton.classList.remove(config.inactiveButtonClass)
    submitButton.disabled = false
  }
}

const setEventListeners = (modal, config) => {
  const inputList = Array.from(
    modal.querySelectorAll(config.inputSelector)
  )
  const submitButton = modal.querySelector(config.submitButtonSelector)
  toggleValidation(inputList, submitButton, config)
  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      isValid(modal, input, config)
      toggleValidation(inputList, submitButton, config)
    })
  })
}

export const enableValidation = (config) => {
  const popupList = Array.from(document.querySelectorAll(config.formSelector))
  popupList.forEach((modal) => {
    setEventListeners(modal, config)
  })
}

export const clearValidation = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  )
  const submitButton = formElement.querySelector(config.submitButtonSelector)
  inputList.forEach((input) => {
    removeInputError(formElement, input, config)
  })
  toggleValidation(inputList, submitButton, config)
}
