function setProductTab(activeTab) {
  const productTab = document.getElementById('product-tab');
  const imagesTab = document.getElementById('images-tab');
  const productSection = document.getElementById('information-section');
  const productPanel = document.getElementById('product-content') || productSection;
  const imagesSection = document.getElementById('images-section');

  if (!productTab || !imagesTab || !productSection || !imagesSection) return;

  const showImages = activeTab === 'images';
  productPanel.classList.toggle('hidden', showImages);
  imagesSection.classList.toggle('hidden', !showImages);

  productTab.classList.toggle('is-active', !showImages);
  imagesTab.classList.toggle('is-active', showImages);
}

function toExchangeImage(image) {
  const mainImage = document.getElementById('img_main');
  if (!mainImage || !image) return;

  mainImage.src = image.src;
  mainImage.alt = image.alt || mainImage.alt;
  mainImage.dataset.hdSrc = image.dataset.hdSrc || image.src;
}

let currentModalIndex = 0;
let galleryImages = [];

function getGalleryImages() {
  if (!galleryImages.length) {
    galleryImages = Array.from(document.querySelectorAll('#images-section img')).map((image) => ({
      src: image.dataset.hdSrc || image.src,
      alt: image.alt || 'Imagen ampliada'
    }));
  }

  return galleryImages;
}

function setModalImage(index) {
  const images = getGalleryImages();
  const modalImage = document.getElementById('modal-image');
  const modalCounter = document.getElementById('modal-counter');
  if (!modalImage || !images.length) return;

  currentModalIndex = (index + images.length) % images.length;
  modalImage.src = images[currentModalIndex].src;
  modalImage.alt = images[currentModalIndex].alt;
  if (modalCounter) modalCounter.textContent = `${currentModalIndex + 1} / ${images.length}`;
}

function openModal() {
  const modal = document.getElementById('image-modal');
  if (!modal) return;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
}

function viewGalleryImage(index) {
  setModalImage(index);
  openModal();
}

function viewImage(src) {
  const modal = document.getElementById('image-modal');
  const modalImage = document.getElementById('modal-image');
  if (!modal || !modalImage || !src) return;

  const images = getGalleryImages();
  const imageIndex = images.findIndex((image) => image.src === src);

  if (imageIndex >= 0) {
    setModalImage(imageIndex);
  } else {
    modalImage.src = src;
    modalImage.alt = 'Imagen ampliada';
    const modalCounter = document.getElementById('modal-counter');
    if (modalCounter) modalCounter.textContent = '1 / 1';
  }

  openModal();
}

function moveModalImage(direction) {
  const modal = document.getElementById('image-modal');
  if (!modal || modal.classList.contains('hidden')) return;

  const images = getGalleryImages();
  if (images.length < 2) return;
  setModalImage(currentModalIndex + direction);
}

function closeModal() {
  const modal = document.getElementById('image-modal');
  const modalImage = document.getElementById('modal-image');
  if (!modal) return;

  modal.classList.add('hidden');
  modal.classList.remove('flex');
  if (modalImage) modalImage.src = '';
  document.body.style.overflow = '';
}

function initializeWhatsappMessage() {
  const messageInput = document.getElementById('whatsapp-message');
  const sendButton = document.getElementById('whatsapp-send');
  const charCount = document.getElementById('whatsapp-char-count');
  const storageKey = 'ds3_amp_6-1427200-4_whatsapp_message';
  const phone = '994428965';
  const defaultMessage = 'Hola, tengo una consulta sobre el cable 6-1427200-4';

  if (!messageInput || !sendButton) return;

  function buildMessage() {
    const customMessage = messageInput.value.trim();
    if (!customMessage) return defaultMessage;
    return `${defaultMessage}: ${customMessage}`;
  }

  function updateWhatsappLink() {
    const message = buildMessage();
    sendButton.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    if (charCount) charCount.textContent = `${messageInput.value.length}/500`;
  }

  const savedMessage = localStorage.getItem(storageKey);
  if (savedMessage) messageInput.value = savedMessage;
  updateWhatsappLink();

  messageInput.addEventListener('input', () => {
    localStorage.setItem(storageKey, messageInput.value);
    updateWhatsappLink();
  });

  sendButton.addEventListener('click', updateWhatsappLink);
}

document.addEventListener('DOMContentLoaded', () => {
  const productTab = document.getElementById('product-tab');
  const imagesTab = document.getElementById('images-tab');
  const modal = document.getElementById('image-modal');

  if (productTab) productTab.addEventListener('click', () => setProductTab('product'));
  if (imagesTab) imagesTab.addEventListener('click', () => setProductTab('images'));

  if (modal) {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
    if (event.key === 'ArrowLeft') moveModalImage(-1);
    if (event.key === 'ArrowRight') moveModalImage(1);
  });

  initializeWhatsappMessage();
});
