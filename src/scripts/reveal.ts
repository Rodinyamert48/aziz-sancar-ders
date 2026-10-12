// Bölümler ekrana girdikçe yumuşakça belirsin.
const items = document.querySelectorAll<HTMLElement>('[data-reveal]')

if (!('IntersectionObserver' in window)) {
  items.forEach((el) => el.classList.add('is-visible'))
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          io.unobserve(entry.target)
        }
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
  )
  items.forEach((el) => io.observe(el))
}
