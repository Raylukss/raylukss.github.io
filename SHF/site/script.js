// Page Navigation System - Apenas cliques
class PageNavigator {
  constructor() {
    this.currentSection = "inicio"
    this.isTransitioning = false
    this.sections = ["inicio", "sobre", "pilares", "softwares", "equipe"]
    this.init()
  }

  init() {
    this.setupEventListeners()
    this.setupMobileMenu()
    this.hideLoading()
    this.updateNavigation() // Adicionar esta linha para marcar "Início" como ativo
  }

  setupEventListeners() {
    // APENAS Navigation links - remover todos os outros event listeners
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()
        const targetSection = link.getAttribute("href").substring(1)
        this.navigateToSection(targetSection)
      })
    })

    // CTA button
    const ctaButton = document.querySelector(".cta-button")
    if (ctaButton) {
      ctaButton.addEventListener("click", () => {
        this.navigateToSection("sobre")
      })
    }

    // REMOVER TODOS os event listeners de scroll, wheel, keyboard e touch
    // Prevenir scroll completamente
    document.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault()
      },
      { passive: false },
    )

    document.addEventListener(
      "touchmove",
      (e) => {
        e.preventDefault()
      },
      { passive: false },
    )

    document.addEventListener("keydown", (e) => {
      // Prevenir teclas de navegação
      if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", "Space"].includes(e.key)) {
        e.preventDefault()
      }
    })
  }

  setupMobileMenu() {
    const hamburger = document.querySelector(".hamburger")
    const navMenu = document.querySelector(".nav-menu")

    if (hamburger && navMenu) {
      hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active")
        navMenu.classList.toggle("active")
      })

      // Close mobile menu when clicking on a link
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", () => {
          hamburger.classList.remove("active")
          navMenu.classList.remove("active")
        })
      })
    }
  }

  navigateToSection(targetSection) {
    if (this.isTransitioning || targetSection === this.currentSection) return

    this.isTransitioning = true

    // Mostrar overlay de transição
    const transitionOverlay = document.getElementById("transitionOverlay")
    transitionOverlay.classList.add("active")

    const currentSectionEl = document.getElementById(this.currentSection)
    const targetSectionEl = document.getElementById(targetSection)

    if (!currentSectionEl || !targetSectionEl) return

    setTimeout(() => {
      // Fade out current section
      currentSectionEl.classList.add("fade-out")

      setTimeout(() => {
        // Hide current section
        currentSectionEl.classList.remove("active", "fade-out")

        // Show target section
        targetSectionEl.classList.add("active")

        // Trigger fade in animation
        setTimeout(() => {
          targetSectionEl.classList.add("fade-in")

          // Update current section
          this.currentSection = targetSection

          // Update navigation
          this.updateNavigation()

          // Hide transition overlay
          transitionOverlay.classList.remove("active")

          // Reset transition flag
          setTimeout(() => {
            this.isTransitioning = false
            targetSectionEl.classList.remove("fade-in")
          }, 400)
        }, 100)
      }, 200)
    }, 300)
  }

  updateNavigation() {
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("current")
      if (link.getAttribute("href") === `#${this.currentSection}`) {
        link.classList.add("current")
      }
    })
  }

  hideLoading() {
    // Loading mais longo e elaborado
    setTimeout(() => {
      const loadingOverlay = document.getElementById("loadingOverlay")
      if (loadingOverlay) {
        loadingOverlay.classList.add("hidden")
        setTimeout(() => {
          loadingOverlay.remove()
        }, 800)
      }
    }, 3500) // Aumentar tempo de loading para 3.5 segundos
  }
}

// Enhanced animations and effects - remover intersection observer baseado em scroll
class AnimationController {
  constructor() {
    this.init()
  }

  init() {
    this.setupHoverEffects()
    this.setupClickEffects()
    // Remover setupIntersectionObserver
  }

  setupHoverEffects() {
    // Enhanced software card hover
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

    // Enhanced team member hover
    document.querySelectorAll(".team-member").forEach((member) => {
      member.addEventListener("mouseenter", () => {
        member.style.transform = "translateY(-8px) scale(1.05)"
      })

      member.addEventListener("mouseleave", () => {
        member.style.transform = "translateY(0) scale(1)"
      })
    })

    // Enhanced pillar card hover
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
    // Ripple effect for buttons
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

      // Add random floating movement
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

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new PageNavigator()
  new AnimationController()
  new FloatingAnimation()
})

// Add CSS for ripple effect
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
