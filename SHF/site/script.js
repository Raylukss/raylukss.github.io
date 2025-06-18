// Page Navigation System - SCROLL LIVRE + NAVEGAÇÃO APENAS POR CLIQUE
class PageNavigator {
  constructor() {
    this.currentSection = "inicio"
    this.sections = ["inicio", "sobre", "pilares", "softwares", "planos", "equipe", "contato"]
    this.init()
  }

  init() {
    this.setupEventListeners()
    this.setupMobileMenu()
    this.hideLoading()
    this.updateNavigation()
    // REMOVER setupScrollSpy() - navegação APENAS por clique
  }

  setupEventListeners() {
    // Navigation links - APENAS para navegação entre seções
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const targetSection = link.getAttribute("href").substring(1)
        this.scrollToSection(targetSection)
      })
    })

    // CTA button
    const ctaButton = document.querySelector(".cta-button")
    if (ctaButton) {
      ctaButton.addEventListener("click", () => {
        this.scrollToSection("sobre")
      })
    }

    // SCROLL LIVRE - sem interferência
  }

  setupMobileMenu() {
    const hamburger = document.querySelector(".hamburger")
    const navMenu = document.querySelector(".nav-menu")

    if (hamburger && navMenu) {
      hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active")
        navMenu.classList.toggle("active")
      })

      document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", () => {
          hamburger.classList.remove("active")
          navMenu.classList.remove("active")
        })
      })
    }
  }

  // Scroll suave APENAS para navegação entre seções por clique
  scrollToSection(targetSection) {
    const targetElement = document.getElementById(targetSection)
    if (targetElement) {
      // Mostrar overlay de transição
      const transitionOverlay = document.getElementById("transitionOverlay")
      if (transitionOverlay) {
        transitionOverlay.classList.add("active")
      }

      setTimeout(() => {
        // Scroll suave para a seção
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })

        // Atualizar seção atual APENAS quando clicado
        this.currentSection = targetSection
        this.updateNavigation()

        // Esconder overlay
        if (transitionOverlay) {
          setTimeout(() => {
            transitionOverlay.classList.remove("active")
          }, 500)
        }
      }, 200)
    }
  }

  // REMOVER setupScrollSpy - navegação APENAS por clique
  // A seção ativa só muda quando clicamos nos links

  updateNavigation() {
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("current")
      if (link.getAttribute("href") === `#${this.currentSection}`) {
        link.classList.add("current")
      }
    })
  }

  hideLoading() {
    // LOADING FUNCIONANDO - tempo maior para ver o efeito
    setTimeout(() => {
      const loadingOverlay = document.getElementById("loadingOverlay")
      if (loadingOverlay) {
        loadingOverlay.classList.add("hidden")
        setTimeout(() => {
          loadingOverlay.remove()
        }, 800)
      }
    }, 3500) // 3.5 segundos de loading
  }
}

// Enhanced animations and effects
class AnimationController {
  constructor() {
    this.init()
  }

  init() {
    this.setupIntersectionObserver()
    this.setupHoverEffects()
    this.setupClickEffects()
  }

  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
        }
      })
    }, observerOptions)

    document.querySelectorAll(".mvv-card, .pillar-card, .software-card, .team-member").forEach((el) => {
      el.classList.add("fade-in")
      observer.observe(el)
    })
  }

  setupHoverEffects() {
    document.querySelectorAll(".software-card").forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-10px) scale(1.02)"
        card.style.boxShadow = "0 20px 40px rgba(16, 185, 129, 0.3)"
      })

      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0) scale(1)"
        card.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.1)"
      })
    })

    document.querySelectorAll(".team-member").forEach((member) => {
      member.addEventListener("mouseenter", () => {
        member.style.transform = "translateY(-8px) scale(1.05)"
      })

      member.addEventListener("mouseleave", () => {
        member.style.transform = "translateY(0) scale(1)"
      })
    })

    document.querySelectorAll(".pillar-card").forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-15px)"
        card.style.boxShadow = "0 25px 50px rgba(0, 0, 0, 0.2)"
      })

      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0)"
        card.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.1)"
      })
    })
  }

  setupClickEffects() {
    document.querySelectorAll(".cta-button, .software-card, .team-member").forEach((element) => {
      element.addEventListener("click", function (e) {
        const ripple = document.createElement("span")
        ripple.classList.add("ripple-effect")
        this.appendChild(ripple)

        const rect = this.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        ripple.style.left = `${x}px`
        ripple.style.top = `${y}px`

        setTimeout(() => {
          ripple.remove()
        }, 600)
      })
    })
  }
}

// Floating cards animation
class FloatingAnimation {
  constructor() {
    this.init()
  }

  init() {
    const floatingCards = document.querySelectorAll(".floating-card")
    floatingCards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.5}s`

      setInterval(
        () => {
          const randomX = (Math.random() - 0.5) * 10
          const randomY = (Math.random() - 0.5) * 10
          card.style.transform = `translate(${randomX}px, ${randomY}px)`
        },
        3000 + index * 1000,
      )
    })
  }
}

// Função global para navegação
function scrollToSection(sectionId) {
  const targetElement = document.getElementById(sectionId)
  if (targetElement) {
    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new PageNavigator()
  new AnimationController()
  new FloatingAnimation()
})

// Add CSS for ripple effect and navigation
const style = document.createElement("style")
style.textContent = `
  .ripple-effect {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
    width: 20px;
    height: 20px;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .nav-link.current {
    color: var(--emerald-green) !important;
  }
  
  .nav-link.current::after {
    width: 100% !important;
  }
`
document.head.appendChild(style)
