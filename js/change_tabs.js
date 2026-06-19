function setProductTab(activeTab) {
  const productTab = document.getElementById('product-tab');
  const imagesTab = document.getElementById('images-tab');
  const productSection = document.getElementById('information-section');
  const imagesSection = document.getElementById('images-section');

  if (!productTab || !imagesTab || !productSection || !imagesSection) return;

  const showImages = activeTab === 'images';
  productSection.classList.toggle('hidden', showImages);
  imagesSection.classList.toggle('hidden', !showImages);

  productTab.classList.toggle('bg-blue-600', !showImages);
  productTab.classList.toggle('text-white', !showImages);
  productTab.classList.toggle('bg-slate-100', showImages);
  productTab.classList.toggle('bg-gray-100', showImages);
  productTab.classList.toggle('text-slate-700', showImages);
  productTab.classList.toggle('text-gray-700', showImages);

  imagesTab.classList.toggle('bg-blue-600', showImages);
  imagesTab.classList.toggle('text-white', showImages);
  imagesTab.classList.toggle('bg-slate-100', !showImages);
  imagesTab.classList.toggle('bg-gray-100', !showImages);
  imagesTab.classList.toggle('text-slate-700', !showImages);
  imagesTab.classList.toggle('text-gray-700', !showImages);
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
});
