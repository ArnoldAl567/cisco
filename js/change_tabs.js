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
}

function viewImage(src) {
  const modal = document.getElementById('image-modal');
  const modalImage = document.getElementById('modal-image');
  if (!modal || !modalImage || !src) return;

  modalImage.src = src;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
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
  });

  initializeWhatsappMessage();
});
