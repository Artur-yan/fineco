export const setBodyScrolling = (scroll: boolean) => {
  scroll
    ? document.querySelector("body")?.classList.remove("no-scroll")
    : document.querySelector("body")?.classList.add("no-scroll");
};

type Modal = "contact" | "project";

const modalToClass = (m: Modal): string => {
  switch (m) {
    case "contact":
      return "contact-modal";
    case "project":
      return "project-modal";
  }
};

export const getModalWrapper = () => document.querySelector(".modal-wrapper");
export const getMenuWrapper = () =>
  document.querySelector(".menu-list-wrapper");

export const openModal = (modal: Modal) => {
  const modalWrapper = getModalWrapper();
  setBodyScrolling(false);
  modalWrapper?.classList.add("is-active");
  modalWrapper?.classList.add(modalToClass(modal));
};

export const closeModal = (modal: Modal) => {
  const modalWrapper = getModalWrapper();
  setBodyScrolling(true);
  modalWrapper?.classList.remove("is-active");
  modalWrapper?.classList.remove(modalToClass(modal));
};

export const openMenu = () => {
  const menuWrapper = getMenuWrapper();
  setBodyScrolling(false);
  menuWrapper?.classList.add("is-active");
};

export const closeMenu = () => {
  const menuWrapper = getMenuWrapper();
  setBodyScrolling(true);
  menuWrapper?.classList.remove("is-active");
};
