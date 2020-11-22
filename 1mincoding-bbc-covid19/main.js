(() => {
    const stepElements = document.querySelectorAll(".step")
    const graphicElements = document.querySelectorAll(".graphic-item")
    let currentItem = graphicElements[0]
    let ioIndex;

    const actions = { 
        birdFlies(isActive) {
            if (isActive) {
                document.querySelector('[data-index="2"] .bird').style.transform = `translateX(${window.innerWidth}px)`
            } else { 
                document.querySelector('[data-index="2"] .bird').style.transform = `translateX(-100%)`
            }
            
        },
        birdFlies2(isActive) {
            if (isActive) {
                document.querySelector('[data-index="5"] .bird').style.transform = `translate(${window.innerWidth}px, ${-window.innerHeight * 0.8}px)`
            } else { 
                document.querySelector('[data-index="5"] .bird').style.transform = `translateX(-100%)`;
            }
        }
    }

    const io = new IntersectionObserver((entries) => {
        ioIndex = Number(entries[0].target.dataset.index)
    })

    stepElements.forEach((element, i) => { 
        io.observe(element)
        element.setAttribute("data-index", i)
    })  

    graphicElements.forEach((element, i) => { 
        element.setAttribute("data-index", i)
    })

    function activate(action) {
        currentItem.classList.add("visible")
        if (action) {
            actions[action](true)
        }
    }

    function inactivate(action) {  
        currentItem.classList.remove("visible")
        if (action) {
            actions[action](false)
        }
    }

    window.addEventListener("scroll", () => {
        stepElements.forEach((el, index) => {
            if (index > ioIndex + 1 || index < ioIndex) {
                return
            }
            const boundingRect = el.getBoundingClientRect()
            if (boundingRect.top > window.innerHeight * 0.1 && boundingRect.top < window.innerHeight * 0.8) {
                let action = currentItem.dataset.action
                inactivate(action)
                currentItem = graphicElements[el.dataset.index]
                action = currentItem.dataset.action
                activate(action)
            }
        })
    })

    window.addEventListener("load", () => {
        setTimeout(() => {
            window.scrollTo(0, 0)
        }, 100); 
    })

    activate()
})() 