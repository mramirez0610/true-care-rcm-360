import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./Cards.css";

const services = [
  {
    id: "medical-billing-coding",
    number: "1.",
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
    number: "2.",
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
    number: "3.",
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
    number: "4.",
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
    number: "5.",
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
    number: "6.",
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
  if (layout === "compact") {
    return {
      x: 0,
      y: 0,
      rotation: 0,
      scale: 1,
      opacity: depth === 0 ? 1 : 0,
      zIndex: services.length - depth,
    };
  }

  if (layout === "tablet") {
    return {
      // x: depth * 7,
      // y: depth * -9,
      // rotation: depth * 1.45,
      x: depth * 2,
      y: depth * -12,
      rotation: depth * 2,
      scale: 1 - depth * 0.006,
      opacity: depth < 4 ? 1 : 0,
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

export default function Cards() {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef([]);
  const deckOrder = useRef(services.map((_, index) => index));
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

        deckOrder.current.forEach((serviceIndex, depth) => {
          gsap.set(
            cardRefs.current[serviceIndex],
            getCardPosition(depth, layout),
          );
        });
      },
    );

    return () => {
      timeline.current?.kill();
      media.revert();
    };
  }, []);

  const selectService = (selectedIndex) => {
    const currentIndex = deckOrder.current[0];

    if (selectedIndex === currentIndex || isAnimating.current) return;

    const layout = window.matchMedia("(max-width: 640px)").matches
      ? "compact"
      : window.matchMedia("(max-width: 960px)").matches
        ? "tablet"
        : "desktop";
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

    if (layout === "compact") {
      animation
        .to(outgoingCard, { autoAlpha: 0, y: 16, duration: 0.22 })
        .set(outgoingCard, getCardPosition(services.length - 1, "compact"))
        .set(incomingCard, {
          ...getCardPosition(0, "compact"),
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

  return (
    <section className="services-section">
      <div className="services-shell">
        <div className="services-copy">
          <h2 className="services-title">Our Services</h2>
          <div className="services-divider" />

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
                  <span className="service-item-title">
                    {service.number} {service.title}
                  </span>
                  <span className="service-item-summary">
                    {service.summary}
                  </span>
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

          <div className="services-deck">
            {services.map((service, index) => {
              const isActive = index === activeIndex;

              return (
                <article
                  key={service.id}
                  ref={(element) => {
                    cardRefs.current[index] = element;
                  }}
                  className={`service-card ${isActive ? "is-active" : ""}`}
                  role={isActive ? "tabpanel" : undefined}
                  id={`service-panel-${service.id}`}
                  aria-labelledby={`service-tab-${service.id}`}
                  aria-hidden={!isActive}
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
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
