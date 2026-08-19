import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./Cards.css";

const services = [
  {
    id: "medical-billing-coding",
    number: "01",
    title: "Medical Billing & Coding",
    summary: "Accurate coding. Clean claims.",
    description:
      "We help healthcare practices submit accurate claims, reduce billing errors, and keep revenue moving.",
    bullets: [
      "Accurate coding support",
      "Clean claim preparation",
      "Fewer rejected or denied claims",
    ],
  },
  {
    id: "claims-submission",
    number: "02",
    title: "Claims Submission",
    summary: "Timely submission. Faster payments.",
    description:
      "We handle clean and timely claim submission so your practice gets paid faster with fewer avoidable delays.",
    bullets: [
      "Electronic claim submission",
      "Payer-specific claim review",
      "Faster payment turnaround",
    ],
  },
  {
    id: "denial-management",
    number: "03",
    title: "Denial Management",
    summary: "Reducing denials. Recover revenue.",
    description:
      "We investigate denials, correct claim issues, and build a tighter process to recover more earned revenue.",
    bullets: [
      "Root-cause denial review",
      "Appeals and corrections",
      "Recovery-focused follow-up",
    ],
  },
  {
    id: "payment-posting",
    number: "04",
    title: "Payment Posting",
    summary: "Accurate posting. Up-to-date records.",
    description:
      "We keep payment posting accurate and current so your books reflect the real status of every claim.",
    bullets: [
      "ERA and manual posting",
      "Accurate account updates",
      "Clear payment visibility",
    ],
  },
  {
    id: "ar-follow-up",
    number: "05",
    title: "Accounts Receivable Follow-Up",
    summary: "Persistent follow-up. Improved collections.",
    description:
      "We stay on unpaid claims and aging balances to improve collections and reduce outstanding receivables.",
    bullets: [
      "A/R aging review",
      "Payer follow-up workflows",
      "Improved collections pace",
    ],
  },
  {
    id: "credentialing-support",
    number: "06",
    title: "Credentialing Support",
    summary: "Hassle-free credentialing. Stay in-network.",
    description:
      "We support provider enrollment and recredentialing so your practice stays compliant and in-network.",
    bullets: [
      "Provider enrollment support",
      "Recredentialing tracking",
      "Network participation help",
    ],
  },
];

const getCardPosition = (depth, layout = "desktop") => {
  if (layout === "compact" || layout === "tablet") {
    return {
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      opacity: depth === 0 ? 1 : 0,
      zIndex: services.length - depth,
    };
  }

  return {
    x: depth * 18,
    y: depth * -15,
    rotation: depth * 1.35,
    scale: 1 - depth * 0.012,
    opacity: 1,
    zIndex: services.length - depth,
  };
};

const getFannedCardPosition = (depth) => {
  return {
    x: depth * -150,
    y: depth * -11,
    rotation: depth * -1.15,
    scale: 1,
    opacity: 1,
    zIndex: services.length - depth,
  };
};

const getLayout = () =>
  window.matchMedia("(max-width: 640px)").matches
    ? "compact"
    : window.matchMedia("(max-width: 960px)").matches
      ? "tablet"
      : "desktop";

export default function Cards() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDeckOpen, setIsDeckOpen] = useState(false);
  const [canFanDeck, setCanFanDeck] = useState(false);
  const cardRefs = useRef([]);
  const deckOrder = useRef(services.map((_, index) => index));
  const deckOpen = useRef(false);
  const timeline = useRef(null);
  const isAnimating = useRef(false);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();

    media.add(
      {
        desktop: "(min-width: 961px)",
        tablet: "(min-width: 641px) and (max-width: 960px)",
        compact: "(max-width: 640px)",
      },
      (context) => {
        const layout = context.conditions.compact
          ? "compact"
          : context.conditions.tablet
            ? "tablet"
            : "desktop";

        const supportsFan = layout === "desktop";
        setCanFanDeck(supportsFan);

        if (!supportsFan && deckOpen.current) {
          timeline.current?.kill();
          deckOpen.current = false;
          isAnimating.current = false;
          setIsDeckOpen(false);
        }

        deckOrder.current.forEach((serviceIndex, depth) => {
          gsap.set(
            cardRefs.current[serviceIndex],
            deckOpen.current
              ? getFannedCardPosition(depth)
              : getCardPosition(depth, layout),
          );
        });
      },
    );

    return () => {
      timeline.current?.kill();
      media.revert();
    };
  }, []);

  const openDeck = () => {
    if (
      !window.matchMedia("(min-width: 961px)").matches ||
      deckOpen.current ||
      isAnimating.current
    )
      return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    deckOpen.current = true;
    setIsDeckOpen(true);
    timeline.current?.kill();

    if (reduceMotion) {
      deckOrder.current.forEach((serviceIndex, depth) => {
        gsap.set(
          cardRefs.current[serviceIndex],
          getFannedCardPosition(depth),
        );
      });
      return;
    }

    isAnimating.current = true;
    timeline.current = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        isAnimating.current = false;
      },
    });

    deckOrder.current.forEach((serviceIndex, depth) => {
      timeline.current.to(
        cardRefs.current[serviceIndex],
        {
          ...getFannedCardPosition(depth),
          duration: 0.52,
        },
        depth * 0.045,
      );
    });
  };

  const closeDeck = (selectedIndex) => {
    if (!deckOpen.current || isAnimating.current) return;

    const currentIndex = deckOrder.current[0];
    const layout = getLayout();
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const remainingCards = deckOrder.current.filter(
      (serviceIndex) =>
        serviceIndex !== selectedIndex && serviceIndex !== currentIndex,
    );
    const nextOrder =
      selectedIndex === currentIndex
        ? [...deckOrder.current]
        : [selectedIndex, ...remainingCards, currentIndex];

    deckOpen.current = false;
    setIsDeckOpen(false);
    setActiveIndex(selectedIndex);
    timeline.current?.kill();

    if (reduceMotion) {
      nextOrder.forEach((serviceIndex, depth) => {
        gsap.set(
          cardRefs.current[serviceIndex],
          getCardPosition(depth, layout),
        );
      });
      deckOrder.current = nextOrder;
      cardRefs.current[selectedIndex]?.focus({ preventScroll: true });
      return;
    }

    isAnimating.current = true;
    timeline.current = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        deckOrder.current = nextOrder;
        isAnimating.current = false;
        cardRefs.current[selectedIndex]?.focus({ preventScroll: true });
      },
    });

    nextOrder.forEach((serviceIndex, depth) => {
      timeline.current.to(
        cardRefs.current[serviceIndex],
        {
          ...getCardPosition(depth, layout),
          duration: 0.5,
        },
        depth * 0.035,
      );
    });
  };

  const selectService = (selectedIndex) => {
    if (deckOpen.current) {
      closeDeck(selectedIndex);
      return;
    }

    const currentIndex = deckOrder.current[0];

    if (selectedIndex === currentIndex || isAnimating.current) return;

    const layout = getLayout();
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const outgoingCard = cardRefs.current[currentIndex];
    const incomingCard = cardRefs.current[selectedIndex];
    const remainingCards = deckOrder.current.filter(
      (serviceIndex) =>
        serviceIndex !== selectedIndex && serviceIndex !== currentIndex,
    );
    const nextOrder = [selectedIndex, ...remainingCards, currentIndex];

    setActiveIndex(selectedIndex);

    if (reduceMotion) {
      nextOrder.forEach((serviceIndex, depth) => {
        gsap.set(
          cardRefs.current[serviceIndex],
          getCardPosition(depth, layout),
        );
      });
      deckOrder.current = nextOrder;
      return;
    }

    isAnimating.current = true;
    timeline.current?.kill();

    const animation = gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        deckOrder.current = nextOrder;
        isAnimating.current = false;
      },
    });

    timeline.current = animation;

    if (layout === "compact" || layout === "tablet") {
      animation
        .to(outgoingCard, { autoAlpha: 0, y: 16, duration: 0.22 })
        .set(outgoingCard, getCardPosition(services.length - 1, layout))
        .set(incomingCard, {
          ...getCardPosition(0, layout),
          y: -12,
        })
        .to(incomingCard, { autoAlpha: 1, y: 0, duration: 0.34 });
      return;
    }

    animation
      .to(outgoingCard, {
        x: -92,
        y: 22,
        rotation: -9,
        scale: 0.97,
        duration: 0.3,
        ease: "power2.in",
      })
      .to(
        nextOrder
          .slice(0, -1)
          .map((serviceIndex) => cardRefs.current[serviceIndex]),
        {
          x: (_, element) => {
            const serviceIndex = cardRefs.current.indexOf(element);
            return getCardPosition(nextOrder.indexOf(serviceIndex), layout).x;
          },
          y: (_, element) => {
            const serviceIndex = cardRefs.current.indexOf(element);
            return getCardPosition(nextOrder.indexOf(serviceIndex), layout).y;
          },
          rotation: (_, element) => {
            const serviceIndex = cardRefs.current.indexOf(element);
            return getCardPosition(nextOrder.indexOf(serviceIndex), layout)
              .rotation;
          },
          scale: (_, element) => {
            const serviceIndex = cardRefs.current.indexOf(element);
            return getCardPosition(nextOrder.indexOf(serviceIndex), layout)
              .scale;
          },
          opacity: (_, element) => {
            const serviceIndex = cardRefs.current.indexOf(element);
            return getCardPosition(nextOrder.indexOf(serviceIndex), layout)
              .opacity;
          },
          zIndex: (_, element) => {
            const serviceIndex = cardRefs.current.indexOf(element);
            return getCardPosition(nextOrder.indexOf(serviceIndex), layout)
              .zIndex;
          },
          duration: 0.52,
          stagger: 0.025,
        },
        0.16,
      )
      .fromTo(
        incomingCard.querySelectorAll(".service-card-content > *"),
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.32,
          stagger: 0.045,
          ease: "power2.out",
        },
        0.35,
      )
      .to(
        outgoingCard,
        {
          ...getCardPosition(services.length - 1, layout),
          duration: 0.48,
          ease: "power3.out",
        },
        0.34,
      );
  };

  const selectPreviousService = () => {
    selectService((activeIndex - 1 + services.length) % services.length);
  };

  const selectNextService = () => {
    selectService((activeIndex + 1) % services.length);
  };

  const handleCardClick = (index) => {
    if (deckOpen.current) {
      closeDeck(index);
      return;
    }

    if (index === activeIndex) openDeck();
  };

  const handleCardKeyDown = (event, index) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    handleCardClick(index);
  };

  return (
    <section className={`services-section ${isDeckOpen ? "is-deck-open" : ""}`}>
      <div className="services-shell">
        <div className="services-copy">
          <h1 className="services-title">Our Services</h1>
          <div className="services-divider" />
          <p className="services-intro">
            Comprehensive revenue cycle support designed to keep your practice
            running smoothly.
          </p>

          <div className="services-list" role="tablist" aria-label="Services">
            {services.map((service, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={service.id}
                  type="button"
                  className={`service-item ${isActive ? "is-active" : ""}`}
                  onClick={() => selectService(index)}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`service-panel-${service.id}`}
                  id={`service-tab-${service.id}`}
                >
                  <span className="service-item-number">{service.number}</span>
                  <span className="service-item-title">{service.title}</span>
                  <svg
                    className="service-item-arrow"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              );
            })}
          </div>
        </div>

        <div className="services-preview">
          <div
            className="services-mobile-selector"
            role="group"
            aria-label="Choose a service"
          >
            <button
              type="button"
              className="services-selector-arrow"
              onClick={selectPreviousService}
              aria-label="Previous service"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>

            <p className="services-selector-label" aria-live="polite">
              <span className="services-selector-number">
                {services[activeIndex].number}
              </span>
              {services[activeIndex].title}
            </p>

            <button
              type="button"
              className="services-selector-arrow"
              onClick={selectNextService}
              aria-label="Next service"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>

          <div
            className={`services-deck ${isDeckOpen ? "is-open" : ""}`}
            role={isDeckOpen ? "listbox" : undefined}
            aria-label="Service card deck"
          >
            {services.map((service, index) => {
              const isActive = index === activeIndex;

              return (
                <article
                  key={service.id}
                  ref={(element) => {
                    cardRefs.current[index] = element;
                  }}
                  className={`service-card ${isActive ? "is-active" : ""}`}
                  role={
                    isDeckOpen
                      ? "option"
                      : isActive && canFanDeck
                        ? "button"
                        : isActive
                          ? "tabpanel"
                          : undefined
                  }
                  id={`service-panel-${service.id}`}
                  aria-labelledby={`service-tab-${service.id}`}
                  aria-hidden={!isDeckOpen && !isActive}
                  aria-selected={isDeckOpen ? isActive : undefined}
                  aria-expanded={
                    !isDeckOpen && isActive && canFanDeck ? false : undefined
                  }
                  aria-label={
                    isDeckOpen
                      ? `Select ${service.title}`
                      : isActive && canFanDeck
                        ? "Open the service card deck"
                        : undefined
                  }
                  tabIndex={isDeckOpen || (isActive && canFanDeck) ? 0 : -1}
                  onClick={() => handleCardClick(index)}
                  onKeyDown={(event) => handleCardKeyDown(event, index)}
                >
                  <div className="service-card-content">
                    <h3 className="service-card-title">{service.title}</h3>
                    <div className="service-card-divider" />
                    <p className="service-card-description">
                      {service.description}
                    </p>

                    <ul className="service-card-list">
                      {service.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>

                  <span className="service-card-fan-label" aria-hidden="true">
                    <span>{service.number}</span>
                    {service.title}
                  </span>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
