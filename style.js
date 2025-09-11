// Elementos do DOM
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")
const navLinks = document.querySelectorAll(".nav-link")
const themeToggle = document.getElementById("themeToggle")
const themeIcon = themeToggle.querySelector("i")
const body = document.body

// Menu mobile toggle
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
})

// Fechar menu ao clicar em um link
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
    })
})

// Navegação ativa baseada no scroll
const sections = document.querySelectorAll("section")

function updateActiveNavLink() {
    let current = ""

    sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight

        if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute("id")
        }
    })

    navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href").substring(1) === current) {
            link.classList.add("active")
        }
    })
}

// Atualizar navegação ativa no scroll
window.addEventListener("scroll", updateActiveNavLink)

// Smooth scroll para links de navegação
navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault()
        const targetId = link.getAttribute("href").substring(1)
        const targetSection = document.getElementById(targetId)

        if (targetSection) {
            const headerHeight = document.querySelector(".header").offsetHeight
            const targetPosition = targetSection.offsetTop - headerHeight

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth",
            })
        }
    })
})

// Funcionalidade do modo escuro/claro
function updateThemeIcon(theme) {
    if (theme === "dark") {
        themeIcon.className = "fas fa-sun"
    } else {
        themeIcon.className = "fas fa-moon"
    }
}

function toggleTheme() {
    const currentTheme = body.getAttribute("data-theme")
    const newTheme = currentTheme === "dark" ? "light" : "dark"

    // Adicionar animação de rotação
    themeToggle.classList.add("rotating")

    setTimeout(() => {
        body.setAttribute("data-theme", newTheme)
        updateThemeIcon(newTheme)
        localStorage.setItem("theme", newTheme)

        // Remover animação após completar
        setTimeout(() => {
            themeToggle.classList.remove("rotating")
        }, 300)
    }, 150)
}

// Verificar tema salvo no localStorage
const savedTheme = localStorage.getItem("theme")
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

// Aplicar tema inicial
if (savedTheme) {
    body.setAttribute("data-theme", savedTheme)
    updateThemeIcon(savedTheme)
} else if (prefersDark) {
    body.setAttribute("data-theme", "dark")
    updateThemeIcon("dark")
}

// Event listener para o botão de toggle
themeToggle.addEventListener("click", toggleTheme)

// Detectar mudanças na preferência do sistema
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
        const newTheme = e.matches ? "dark" : "light"
        body.setAttribute("data-theme", newTheme)
        updateThemeIcon(newTheme)
    }
})

// Animação de elementos ao scroll
const intersectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in")
            }
        })
    },
    { threshold: 0.1 },
)

// Observar elementos para animação
document
    .querySelectorAll(
        ".section-title, .hero-text, .hero-image, .sobre-img, .sobre-text, .skill-category, .projeto-card, .contato-info, .contato-form",
    )
    .forEach((el) => {
        intersectionObserver.observe(el)
    })

// Efeito de digitação para o subtítulo
function typeWriter() {
    const text = "Full Stack Developer"
    const subtitle = document.querySelector(".hero-text h2")

    if (subtitle) {
        subtitle.textContent = ""
        let i = 0

        const typing = () => {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i)
                i++
                setTimeout(typing, 100)
            }
        }

        setTimeout(typing, 1000)
    }
}

// Iniciar efeito de digitação após carregar a página
window.addEventListener("load", typeWriter)

// Formulário de contato
const form = document.querySelector(".contato-form form")

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault()

        // Simulação de envio
        const submitBtn = form.querySelector('button[type="submit"]')
        const originalText = submitBtn.textContent

        submitBtn.textContent = "Enviando..."
        submitBtn.disabled = true

        setTimeout(() => {
            alert("Mensagem enviada com sucesso!")
            form.reset()
            submitBtn.textContent = originalText
            submitBtn.disabled = false
        }, 1500)
    })
}

// Animação para os números nas estatísticas
function animateStats() {
    const stats = document.querySelectorAll(".stat-item h3")

    stats.forEach((stat) => {
        const target = Number.parseInt(stat.textContent)
        let count = 0
        const duration = 2000 // 2 segundos
        const interval = Math.floor(duration / target)

        const counter = setInterval(() => {
            count++
            stat.textContent = count + "+"

            if (count >= target) {
                clearInterval(counter)
            }
        }, interval)
    })
}

// Iniciar animação das estatísticas quando visíveis
const statsSection = document.querySelector(".stats")
if (statsSection) {
    const statsObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animateStats()
                    statsObserver.unobserve(entry.target)
                }
            })
        },
        { threshold: 0.5 },
    )

    statsObserver.observe(statsSection)
}

// Efeito de hover nos cards de projetos
document.querySelectorAll(".projeto-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-15px)"
        card.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.2)"
    })

    card.addEventListener("mouseleave", () => {
        card.style.transform = ""
        card.style.boxShadow = ""
    })
})

// Função para criar efeito de estrelas no modo escuro
function createStars() {
    const currentTheme = body.getAttribute("data-theme")

    if (currentTheme === "dark") {
        const hero = document.querySelector(".hero")

        // Remover estrelas existentes
        const existingStars = hero.querySelectorAll(".star")
        existingStars.forEach((star) => star.remove())

        // Criar novas estrelas
        for (let i = 0; i < 100; i++) {
            const star = document.createElement("div")
            star.classList.add("star")

            star.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: white;
        border-radius: 50%;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        animation: twinkle ${Math.random() * 3 + 2}s linear infinite;
        opacity: ${Math.random() * 0.8 + 0.2};
        z-index: 0;
        pointer-events: none;
      `

            hero.appendChild(star)
        }
    } else {
        // Remover estrelas no modo claro
        const stars = document.querySelectorAll(".star")
        stars.forEach((star) => star.remove())
    }
}

// Adicionar estilos para as estrelas
const starStyles = document.createElement("style")
starStyles.textContent = `
  @keyframes twinkle {
    0%, 100% { opacity: 0.2; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.2); }
  }
`
document.head.appendChild(starStyles)

// Criar partículas coloridas no modo escuro
function createColorfulParticles() {
    const currentTheme = body.getAttribute("data-theme")

    if (currentTheme === "dark") {
        const sections = document.querySelectorAll("section")

        sections.forEach((section) => {
            // Remover partículas existentes
            const existingParticles = section.querySelectorAll(".color-particle")
            existingParticles.forEach((particle) => particle.remove())

            // Criar partículas coloridas
            for (let i = 0; i < 10; i++) {
                const particle = document.createElement("div")
                particle.classList.add("color-particle")

                const colors = ["#ff00ff", "#00ffff", "#00ff00", "#ffff00", "#ff7f00"]
                const randomColor = colors[Math.floor(Math.random() * colors.length)]

                particle.style.cssText = `
          position: absolute;
          width: ${Math.random() * 6 + 2}px;
          height: ${Math.random() * 6 + 2}px;
          background: ${randomColor};
          border-radius: 50%;
          top: ${Math.random() * 100}%;
          left: ${Math.random() * 100}%;
          animation: colorFloat ${Math.random() * 15 + 10}s linear infinite;
          opacity: ${Math.random() * 0.3 + 0.1};
          z-index: 0;
          pointer-events: none;
          box-shadow: 0 0 10px ${randomColor};
        `

                section.style.position = "relative"
                section.appendChild(particle)
            }
        })
    } else {
        // Remover partículas no modo claro
        const particles = document.querySelectorAll(".color-particle")
        particles.forEach((particle) => particle.remove())
    }
}

// Adicionar estilos para partículas coloridas
const particleColorStyles = document.createElement("style")
particleColorStyles.textContent = `
  @keyframes colorFloat {
    0% {
      transform: translateY(0) translateX(0) rotate(0deg);
    }
    25% {
      transform: translateY(-20px) translateX(10px) rotate(90deg);
    }
    50% {
      transform: translateY(-10px) translateX(-10px) rotate(180deg);
    }
    75% {
      transform: translateY(-30px) translateX(5px) rotate(270deg);
    }
    100% {
      transform: translateY(0) translateX(0) rotate(360deg);
    }
  }
`
document.head.appendChild(particleColorStyles)

// Observer para mudanças de tema
const themeObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "data-theme") {
            createStars()
            setTimeout(createColorfulParticles, 300)
        }
    })
})

themeObserver.observe(body, { attributes: true })

// Criar efeitos iniciais se já estiver no modo escuro
createStars()
setTimeout(createColorfulParticles, 1000)

// Header transparente no scroll
window.addEventListener("scroll", () => {
    const header = document.querySelector(".header")
    if (window.scrollY > 100) {
        header.style.background =
            body.getAttribute("data-theme") === "dark" ? "rgba(26, 26, 26, 0.98)" : "rgba(255, 255, 255, 0.98)"
    } else {
        header.style.background =
            body.getAttribute("data-theme") === "dark" ? "rgba(26, 26, 26, 0.95)" : "rgba(255, 255, 255, 0.95)"
    }
})

// Salvar preferência do usuário
window.addEventListener("beforeunload", () => {
    const currentTheme = body.getAttribute("data-theme")
    if (currentTheme) {
        localStorage.setItem("theme", currentTheme)
    }
})

// Inicializar navegação ativa
updateActiveNavLink()