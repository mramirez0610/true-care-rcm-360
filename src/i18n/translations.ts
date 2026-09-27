export const supportedLocales = ["en", "es"] as const;

export type Locale = (typeof supportedLocales)[number];

export const defaultLocale: Locale = "en";

export function getLocaleFromPath(pathname: string): Locale {
  return pathname === "/es" || pathname.startsWith("/es/") ? "es" : "en";
}

export function stripLocaleFromPath(pathname: string): string {
  if (pathname === "/es" || pathname === "/es/") return "/";
  return pathname.startsWith("/es/") ? pathname.slice(3) || "/" : pathname;
}

export function getLocalizedPath(path: string, locale: Locale): string {
  if (/^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith("mailto:") || path.startsWith("tel:")) {
    return path;
  }

  const [pathname, hash] = path.split("#");
  const basePath = stripLocaleFromPath(pathname || "/");
  const localizedPath =
    locale === "es"
      ? basePath === "/"
        ? "/es/"
        : `/es${basePath.startsWith("/") ? basePath : `/${basePath}`}`
      : basePath;

  return hash ? `${localizedPath}#${hash}` : localizedPath;
}

const sharedFaq = {
  en: [
    {
      question: "What services does TrueCare provide?",
      answer:
        "TrueCare supports medical billing and coding, claim submission, denial management, payment posting, accounts receivable follow-up, and provider credentialing.",
    },
    {
      question: "Can you help with denied or unpaid claims?",
      answer:
        "Yes. We review claim issues, support corrections and appeals, and follow up on unpaid claims and aging balances to help keep revenue moving.",
    },
    {
      question: "What information helps keep claims accurate?",
      answer:
        "Accurate patient and insurance information, payer details, required authorizations, and complete documentation all help reduce preventable claim issues.",
    },
    {
      question: "How does TrueCare communicate and report?",
      answer:
        "We focus on clear updates and practical reporting so you can understand what is happening across your revenue cycle and identify useful trends.",
    },
    {
      question: "How do I get started?",
      answer:
        "Schedule a free consultation so we can learn about your workflow, priorities, and goals and discuss the support that may fit your practice.",
    },
  ],
  es: [
    {
      question: "¿Qué servicios ofrece TrueCare?",
      answer:
        "TrueCare brinda apoyo con facturación y codificación médica, presentación de reclamaciones, gestión de denegaciones, registro de pagos, seguimiento de cuentas por cobrar y acreditación de proveedores.",
    },
    {
      question: "¿Pueden ayudar con reclamaciones denegadas o sin pagar?",
      answer:
        "Sí. Revisamos los problemas de las reclamaciones, apoyamos las correcciones y apelaciones, y damos seguimiento a las reclamaciones sin pagar y los saldos vencidos para mantener el flujo de ingresos.",
    },
    {
      question: "¿Qué información ayuda a mantener la exactitud de las reclamaciones?",
      answer:
        "La información precisa del paciente y del seguro, los datos del pagador, las autorizaciones requeridas y la documentación completa ayudan a reducir problemas prevenibles en las reclamaciones.",
    },
    {
      question: "¿Cómo se comunica TrueCare y presenta sus informes?",
      answer:
        "Nos enfocamos en actualizaciones claras e informes prácticos para que pueda entender lo que sucede en su ciclo de ingresos e identificar tendencias útiles.",
    },
    {
      question: "¿Cómo puedo comenzar?",
      answer:
        "Programe una consulta gratuita para que podamos conocer su flujo de trabajo, prioridades y objetivos, y conversar sobre el apoyo más adecuado para su práctica.",
    },
  ],
};

export const translations = {
  en: {
    common: {
      consultation: "Schedule a Free Consultation",
      consultationShort: "Get a Free Consultation",
      consultationIntro: "Schedule your first consultation to talk through:",
      opensNewTab: "opens in a new tab",
      faqEyebrow: "Frequently Asked Questions",
      navLabel: "Main navigation",
      openMenu: "Open main menu",
      closeMenu: "Close main menu",
      footerLabel: "Site footer",
      homeLabel: "TrueCare RCM360 Solutions home",
      languageLabel: "Language",
      viewInEnglish: "View this page in English",
      viewInSpanish: "Ver esta página en español",
      nav: {
        home: "Home",
        about: "About Us",
        services: "Services",
        whyUs: "Why Us",
        resources: "Resources",
        contact: "Contact",
      },
      contact: {
        title: "Contact Us",
        intro:
          "If you have any questions, please feel free to get in touch with us via phone, email, or the form below.",
        getInTouch: "Get in touch",
        name: "Name",
        namePlaceholder: "Enter your name *",
        phoneNumber: "Phone Number",
        phonePlaceholder: "Enter your phone number *",
        email: "Email",
        emailPlaceholder: "Enter your email address *",
        message: "Message",
        messagePlaceholder: "Enter your message *",
        send: "Send Message",
        info: "Contact Info",
        phone: "Phone",
        officeHours: "Office Hours",
        hours: "Mon - Fri, 9 AM - 5 PM",
      },
    },
    home: {
      metaTitle: "Medical Billing & Revenue Cycle Management",
      metaDescription:
        "TrueCare RCM360 Solutions helps healthcare practices simplify medical billing, claims, denials, payment posting, A/R follow-up, and credentialing.",
      hero: {
        lineOne: "Turning Claims",
        lineTwo: "Into Consistent Cash Flow",
        subtitle:
          "Reliable Medical Billing Solutions That Help Your Practice Get Paid Faster",
        description:
          "At TrueCare RCM360 Solutions, we take the complexities of billing off your plate so you can focus on what matters most, your patients.",
        servicesCta: "Our Services",
        imageAlt: "A medical billing specialist helping a family",
      },
      careBanner: {
        primary: "Compassionate Care. Precise Billing. Better Results.",
        secondary: "Your Practice Thrives. Your Patients Win.",
      },
      cashFlowBanner: {
        primary: "Ready to Improve Your Cash Flow?",
        secondary: "Let's talk about how we can make your business thrive.",
      },
      whatWeDo: {
        eyebrow: "What We Can Do",
        title: "For You",
        description:
          "Reliable billing support designed to help your practice reduce denials, improve cash flow, and spend more time with patients.",
        cta: "Explore All Services",
        items: [
          {
            title: "Medical Billing & Coding",
            description: "Accurate coding, clean claims, and faster reimbursement.",
          },
          {
            title: "Claims Submission",
            description: "Timely submission and follow-up so payments arrive sooner.",
          },
          {
            title: "Denial Management",
            description: "Reduce denials, recover revenue, and protect your cash flow.",
          },
        ],
      },
      whyUs: {
        title: "Why Practices Choose TrueCare",
        description:
          "Billing support you can feel confident in. Your practice deserves billing support that is accurate, organized, and handled with care. TrueCare helps simplify the revenue cycle so you can focus on your patients.",
        items: [
          {
            title: "Reliable Communication",
            description: "Stay informed with clear updates and responsive support.",
          },
          {
            title: "Clean Claim Focus",
            description: "We work to reduce errors, rejections, and avoidable delays.",
          },
          {
            title: "Practice-Centered Support",
            description:
              "Your billing process is handled with your workflow and goals in mind.",
          },
        ],
      },
      process: {
        title: "Our Process",
        description:
          "Getting started is simple. We learn about your practice, review your needs, and build a billing support process that works for you.",
        steps: [
          {
            title: "Consult",
            description:
              "We learn about your practice, billing needs, and current challenges.",
          },
          {
            title: "Review",
            description:
              "We identify claim issues, workflow gaps, and revenue opportunities.",
          },
          {
            title: "Onboard",
            description:
              "We organize access, payer details, systems, and documentation.",
          },
          {
            title: "Support",
            description:
              "We manage claims, follow-up, payment posting, and reporting.",
          },
        ],
      },
      results: {
        title: "Results You Can Expect",
        description:
          "Reliable billing support means fewer interruptions, faster reimbursements, and more time to focus on patient care.",
        items: [
          {
            title: "Cleaner Claims",
            description: "Reduce billing errors before they become denials.",
          },
          {
            title: "Fewer Delays",
            description: "Keep claims moving with timely submission and follow-up.",
          },
          {
            title: "Better Revenue Visibility",
            description: "Know what is paid, pending, and needs attention.",
          },
          {
            title: "More Time for Clients",
            description: "Spend less time on billing and more time with patients.",
          },
        ],
      },
      faqTitle: "Questions about billing support?",
      faqDescription:
        "Start with a few of the questions practices commonly ask. If you need something more specific, we’re happy to talk it through.",
      faqItems: sharedFaq.en,
    },
    about: {
      metaTitle: "About Us",
      metaDescription:
        "Meet the TrueCare RCM360 Solutions team and learn how their finance, billing, analytics, and client support experience serves healthcare practices.",
      heroEyebrow: "About Us",
      heroTitle: "Support built around your practice",
      heroDescription:
        "TrueCare RCM360 Solutions supports healthcare practices with organized, dependable revenue cycle management. Our goal is to make the billing process easier to understand and easier to manage.",
      teamEyebrow: "Meet the people behind the work",
      teamTitle: "Our Team",
      closingTitle: "Let's talk about your practice.",
      closingDescription:
        "Tell us what your team needs from billing support.",
      closingTopics: [
        {
          emphasis: "Your current process",
          detail: "for billing and follow-up",
        },
        {
          emphasis: "Your team's pressure points",
          detail: "and where more capacity could help",
        },
        {
          emphasis: "A practical partnership",
          detail: "built around your practice",
        },
      ],
      members: [
        {
          name: "Elizabeth",
          role: "Founder & RCM Specialist",
          description: [
            "With more than 25 years of experience in finance, financial analysis, accounts receivable, billing, pricing, and customer operations, I bring a strong analytical foundation and a passion for helping businesses succeed. Throughout my career, I’ve worked across banking, manufacturing, transportation, media, and consumer goods, developing expertise in financial reporting, revenue analysis, billing accuracy, process improvement, and team leadership.",
            "My experience has taught me that every successful organization depends on efficient systems, accurate financial processes, and attention to detail. After spending decades helping businesses improve operations, analyze financial performance, and strengthen revenue processes, I chose to transition into medical billing to apply those same skills in a field where I can make a meaningful difference.",
            "Today, I combine my background in finance, accounts receivable, billing, and financial analysis with a commitment to helping healthcare providers maintain healthy revenue cycles. My goal is to provide accurate, dependable medical billing services so providers can spend less time worrying about administrative tasks and more time focusing on their patients.",
          ],
        },
        {
          name: "Lizbeth",
          role: "Billing & Client Support",
          description: [
            "With a master’s degree in sociology, a bachelor’s degree in sociology and psychology, and a minor in Spanish, I bring a unique combination of analytical, research, and interpersonal skills.",
            "While my focus is medical billing, I also have experience in data analytics and enjoy using data to identify patterns, improve processes, and support better decision-making. Whether that’s through business analytics or evaluating patient outcomes, I believe data can be a powerful tool for helping organizations grow. My goal is to provide accurate, reliable medical billing while bringing an analytical perspective that adds value beyond the day-to-day.",
          ],
        },
      ],
    },
    whyUsPage: {
      metaTitle: "Why Us",
      metaDescription:
        "See how TrueCare supports healthcare practices with clear communication, careful claim review, consistent follow-up, and practical revenue cycle reporting.",
      heroEyebrow: "Why TrueCare",
      heroTitle: "Billing support built on clarity and care.",
      heroDescription:
        "Revenue cycle management should give your practice more confidence, not more complexity. We bring an attentive, organized approach to the work behind every claim.",
      differenceEyebrow: "Our Difference",
      differenceTitle: "What you can expect from us",
      differenceDescription:
        "A straightforward partnership grounded in dependable work, thoughtful follow-through, and the needs of your practice.",
      contactCta: "Get In Touch",
      reasons: [
        {
          title: "Attentive, reliable support",
          description:
            "We keep communication clear and make it easy to understand what is happening across your revenue cycle.",
        },
        {
          title: "A focus on clean claims",
          description:
            "Careful review and consistent follow-up help reduce preventable errors, rejections, and delays.",
        },
        {
          title: "Support shaped around your practice",
          description:
            "We take time to understand your workflow, priorities, and goals before recommending a way forward.",
        },
      ],
      bannerPrimary: "Ready for dependable billing support?",
      bannerSecondary:
        "Let’s talk about what that could look like for your practice.",
      closingTitle: "Ready for a more confident revenue cycle?",
      closingDescription:
        "Let's explore how attentive billing support could fit your practice.",
      closingTopics: [
        {
          emphasis: "Clear communication",
          detail: "and practical billing reports",
        },
        {
          emphasis: "Claims and denials",
          detail: "with attentive review and follow-up",
        },
        {
          emphasis: "Your workflow",
          detail: "and the support that fits it",
        },
      ],
      partnershipEyebrow: "The Partnership",
      partnershipTitle: "Your practice stays at the center.",
      partnershipDescription:
        "We view billing as an extension of patient care. Our role is to support the financial health of your practice while respecting the people, systems, and standards that make it yours.",
      commitmentsLabel: "Our commitments",
      commitments: [
        "Clear, responsive communication",
        "Organized and accurate billing support",
        "Consistent claim and denial follow-up",
        "Practical reporting you can understand",
      ],
    },
    resources: {
      metaTitle: "Resources",
      metaDescription:
        "Find straightforward medical billing education, revenue cycle guidance, and practical answers to common questions from healthcare practices.",
      heroEyebrow: "Resources",
      heroTitle: "Clear answers for a healthier revenue cycle.",
      heroDescription:
        "Straightforward billing education and practical tools to help your practice understand the work behind every claim.",
      libraryEyebrow: "Resource Library",
      libraryTitle: "Start with the topic you need.",
      libraryDescription:
        "Don't know where to start? We're here for you. We’re building a focused library of guides, billing explainers, and useful worksheets for healthcare practices.",
      shortcutsLabel: "Resource shortcuts",
      faqShortcut: "Jump to frequently asked questions",
      closingTitle: "Need a clearer answer for your practice?",
      closingDescription:
        "Bring us your billing questions and priorities.",
      closingTopics: [
        {
          emphasis: "Claims and denials",
          detail: "including unpaid balances",
        },
        {
          emphasis: "Useful billing insights",
          detail: "worth tracking",
        },
        {
          emphasis: "A clear starting point",
          detail: "for your current process",
        },
      ],
      faqLabel: "FAQ",
      contactShortcut: "Contact TrueCare",
      contact: "Contact",
      comingSoon: "Coming soon",
      comingSoonLabel: "coming soon",
      groups: [
        {
          title: "Revenue Cycle Management",
          description:
            "Clear explanations of the work that keeps claims moving and revenue on track.",
          resources: [
            "Understanding the medical billing process",
            "Common causes of claim denials",
            "Steps to improve cash flow",
            "Importance of accurate patient information",
          ],
        },
        {
          title: "Insurance & Billing Education",
          description:
            "Practical guidance for navigating coverage, payer requirements, and approvals.",
          resources: [
            "Coordination of benefits basics",
            "Understanding Explanation of Benefits",
            "Medicare and Medicaid billing tips",
            "Prior authorizations explained",
          ],
        },
        {
          title: "Downloads & Worksheets",
          description:
            "Simple checklists and worksheets your practice can put to use.",
          resources: [
            "New patient intake checklist",
            "Insurance verification checklist",
            "Revenue cycle health assessment worksheet",
          ],
        },
      ],
      faqTitle: "Questions about billing support?",
      faqDescription:
        "Start with a few of the questions practices commonly ask. If you need something more specific, we’re happy to talk it through.",
      faqItems: sharedFaq.en,
    },
    services: {
      metaTitle: "Our Services",
      metaDescription:
        "Explore medical billing and coding, claims submission, denial management, payment posting, A/R follow-up, and credentialing support for your practice.",
      title: "Our Services",
      intro:
        "Comprehensive revenue cycle support designed to keep your practice running smoothly.",
      servicesLabel: "Services",
      chooseService: "Choose a service",
      previousService: "Previous service",
      nextService: "Next service",
      cardDeck: "Service card deck",
      select: "Select",
      openDeck: "Open the service card deck",
      integrationTitle: "Services that work together.",
      integrationDescription:
        "Revenue cycle problems rarely stay in one lane. We can support the complete workflow or focus on the areas creating the most friction.",
      integrationItems: [
        {
          title: "Start with your workflow",
          description:
            "We review your workflow to find where support can make the clearest difference.",
        },
        {
          title: "Build the right scope",
          description:
            "Choose one service or connect support across your revenue cycle.",
        },
        {
          title: "Keep the work visible",
          description:
            "Clear updates keep progress, priorities, and next steps visible.",
        },
      ],
      faqEyebrow: "Services FAQ",
      faqTitle: "Questions before choosing a service?",
      faqDescription:
        "You do not need to have every detail figured out. These answers cover what practices commonly want to know before getting started.",
      faqItems: [
        {
          question: "Can we begin with only one service?",
          answer:
            "Yes. Support can focus on one part of your revenue cycle or connect several services when your workflow would benefit from broader help. We can define the right starting scope during your consultation.",
        },
        {
          question: "Can you help with existing denials or aging accounts?",
          answer:
            "We can review current denials, unpaid claims, and aging balances to understand what needs attention and discuss an appropriate follow-up scope for your practice.",
        },
        {
          question: "What does onboarding look like?",
          answer:
            "We begin by learning your workflow, systems, payer relationships, priorities, and access requirements. From there, we establish responsibilities, communication, and a practical path into the work.",
        },
        {
          question: "Do you work with every specialty and billing system?",
          answer:
            "Every practice has different requirements. Your consultation gives us a chance to understand your specialty, systems, and payer mix so we can confirm whether the support is a good fit.",
        },
        {
          question: "How will we know what is happening with our billing?",
          answer:
            "We prioritize clear communication and practical reporting. The exact update process can be shaped around your workflow so your team knows what is moving and what needs attention.",
        },
      ],
      closingTitle: "Not sure where your revenue cycle needs support?",
      closingDescription:
        "You do not need to diagnose every billing issue before reaching out. We will start with your workflow and identify where focused support could make the clearest difference.",
      closingTopics: [
        {
          emphasis: "Your current workflow",
          detail: "and the pressure points slowing it down",
        },
        {
          emphasis: "Claims, denials, or aging balances",
          detail: "that need attention",
        },
        {
          emphasis: "A service scope",
          detail: "shaped around your practice",
        },
      ],
      items: [
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
      ],
    },
  },
  es: {
    common: {
      consultation: "Programe una consulta gratuita",
      consultationShort: "Obtenga una consulta gratuita",
      consultationIntro: "Programe su primera consulta para conversar sobre:",
      opensNewTab: "se abre en una pestaña nueva",
      faqEyebrow: "Preguntas frecuentes",
      navLabel: "Navegación principal",
      openMenu: "Abrir el menú principal",
      closeMenu: "Cerrar el menú principal",
      footerLabel: "Pie de página del sitio",
      homeLabel: "Página de inicio de TrueCare RCM360 Solutions",
      languageLabel: "Idioma",
      viewInEnglish: "View this page in English",
      viewInSpanish: "Ver esta página en español",
      nav: {
        home: "Inicio",
        about: "Nosotros",
        services: "Servicios",
        whyUs: "Por qué elegirnos",
        resources: "Recursos",
        contact: "Contacto",
      },
      contact: {
        title: "Contáctenos",
        intro:
          "Si tiene alguna pregunta, comuníquese con nosotros por teléfono, correo electrónico o mediante el siguiente formulario.",
        getInTouch: "Comuníquese con nosotros",
        name: "Nombre",
        namePlaceholder: "Ingrese su nombre *",
        phoneNumber: "Número de teléfono",
        phonePlaceholder: "Ingrese su número de teléfono *",
        email: "Correo electrónico",
        emailPlaceholder: "Ingrese su correo electrónico *",
        message: "Mensaje",
        messagePlaceholder: "Ingrese su mensaje *",
        send: "Enviar mensaje",
        info: "Información de contacto",
        phone: "Teléfono",
        officeHours: "Horario de atención",
        hours: "Lun - Vie, 9 a. m. - 5 p. m.",
      },
    },
    home: {
      metaTitle: "Facturación médica y gestión del ciclo de ingresos",
      metaDescription:
        "TrueCare RCM360 Solutions ayuda a las prácticas médicas a simplificar la facturación, las reclamaciones, las denegaciones, el registro de pagos, el seguimiento de cuentas por cobrar y la acreditación.",
      hero: {
        lineOne: "Convertimos reclamaciones",
        lineTwo: "en un flujo de efectivo constante",
        subtitle:
          "Soluciones confiables de facturación médica para que su práctica reciba pagos más rápido",
        description:
          "En TrueCare RCM360 Solutions, nos encargamos de las complejidades de la facturación para que usted pueda enfocarse en lo más importante: sus pacientes.",
        servicesCta: "Nuestros servicios",
        imageAlt: "Una especialista en facturación médica ayudando a una familia",
      },
      careBanner: {
        primary: "Atención compasiva. Facturación precisa. Mejores resultados.",
        secondary: "Su práctica prospera. Sus pacientes ganan.",
      },
      cashFlowBanner: {
        primary: "¿Listo para mejorar su flujo de efectivo?",
        secondary: "Hablemos de cómo podemos ayudar a que su negocio prospere.",
      },
      whatWeDo: {
        eyebrow: "Lo que podemos hacer",
        title: "Por usted",
        description:
          "Apoyo confiable de facturación diseñado para ayudar a su práctica a reducir denegaciones, mejorar el flujo de efectivo y dedicar más tiempo a los pacientes.",
        cta: "Explore todos los servicios",
        items: [
          {
            title: "Facturación y codificación médica",
            description:
              "Codificación precisa, reclamaciones limpias y reembolsos más rápidos.",
          },
          {
            title: "Presentación de reclamaciones",
            description:
              "Presentación y seguimiento oportunos para recibir los pagos antes.",
          },
          {
            title: "Gestión de denegaciones",
            description:
              "Reduzca las denegaciones, recupere ingresos y proteja su flujo de efectivo.",
          },
        ],
      },
      whyUs: {
        title: "Por qué las prácticas eligen TrueCare",
        description:
          "Apoyo de facturación en el que puede confiar. Su práctica merece un servicio preciso, organizado y brindado con dedicación. TrueCare simplifica el ciclo de ingresos para que pueda enfocarse en sus pacientes.",
        items: [
          {
            title: "Comunicación confiable",
            description:
              "Manténgase informado con actualizaciones claras y un servicio atento.",
          },
          {
            title: "Enfoque en reclamaciones limpias",
            description:
              "Trabajamos para reducir errores, rechazos y demoras evitables.",
          },
          {
            title: "Apoyo centrado en su práctica",
            description:
              "Gestionamos su proceso de facturación teniendo en cuenta su flujo de trabajo y sus objetivos.",
          },
        ],
      },
      process: {
        title: "Nuestro proceso",
        description:
          "Comenzar es sencillo. Conocemos su práctica, revisamos sus necesidades y creamos un proceso de apoyo de facturación que funcione para usted.",
        steps: [
          {
            title: "Consulta",
            description:
              "Conocemos su práctica, sus necesidades de facturación y sus desafíos actuales.",
          },
          {
            title: "Revisión",
            description:
              "Identificamos problemas en las reclamaciones, deficiencias en el flujo de trabajo y oportunidades de ingresos.",
          },
          {
            title: "Incorporación",
            description:
              "Organizamos los accesos, datos de pagadores, sistemas y documentación.",
          },
          {
            title: "Apoyo",
            description:
              "Gestionamos reclamaciones, seguimiento, registro de pagos e informes.",
          },
        ],
      },
      results: {
        title: "Resultados que puede esperar",
        description:
          "Un servicio de facturación confiable significa menos interrupciones, reembolsos más rápidos y más tiempo para enfocarse en la atención al paciente.",
        items: [
          {
            title: "Reclamaciones más limpias",
            description:
              "Reduzca los errores de facturación antes de que se conviertan en denegaciones.",
          },
          {
            title: "Menos demoras",
            description:
              "Mantenga las reclamaciones en marcha con presentación y seguimiento oportunos.",
          },
          {
            title: "Mayor visibilidad de los ingresos",
            description:
              "Sepa qué se ha pagado, qué está pendiente y qué requiere atención.",
          },
          {
            title: "Más tiempo para los pacientes",
            description:
              "Dedique menos tiempo a la facturación y más tiempo a sus pacientes.",
          },
        ],
      },
      faqTitle: "¿Tiene preguntas sobre el apoyo de facturación?",
      faqDescription:
        "Comience con algunas de las preguntas que las prácticas suelen hacer. Si necesita información más específica, con gusto podemos conversar.",
      faqItems: sharedFaq.es,
    },
    about: {
      metaTitle: "Nosotros",
      metaDescription:
        "Conozca al equipo de TrueCare RCM360 Solutions y cómo su experiencia en finanzas, facturación, análisis y atención al cliente beneficia a las prácticas médicas.",
      heroEyebrow: "Nosotros",
      heroTitle: "Apoyo creado en torno a su práctica",
      heroDescription:
        "TrueCare RCM360 Solutions brinda a las prácticas médicas una gestión del ciclo de ingresos organizada y confiable. Nuestro objetivo es hacer que el proceso de facturación sea más fácil de entender y administrar.",
      teamEyebrow: "Conozca a las personas detrás de nuestro trabajo",
      teamTitle: "Nuestro equipo",
      closingTitle: "Hablemos de su práctica.",
      closingDescription:
        "Cuéntenos qué apoyo de facturación necesita su equipo.",
      closingTopics: [
        {
          emphasis: "Su proceso actual",
          detail: "de facturación y seguimiento",
        },
        {
          emphasis: "Los puntos de presión de su equipo",
          detail: "y dónde más capacidad podría ayudar",
        },
        {
          emphasis: "Una colaboración práctica",
          detail: "creada en torno a su práctica",
        },
      ],
      members: [
        {
          name: "Elizabeth",
          role: "Fundadora y especialista en gestión del ciclo de ingresos",
          description: [
            "Con más de 25 años de experiencia en finanzas, análisis financiero, cuentas por cobrar, facturación, fijación de precios y operaciones de atención al cliente, aporto una sólida base analítica y una pasión por ayudar a las empresas a alcanzar el éxito. A lo largo de mi carrera, he trabajado en los sectores bancario, manufacturero, transporte, medios de comunicación y bienes de consumo, desarrollando experiencia en informes financieros, análisis de ingresos, precisión de facturación, mejora de procesos y liderazgo de equipos.",
            "Mi experiencia me ha enseñado que toda organización exitosa depende de sistemas eficientes, procesos financieros precisos y atención al detalle. Después de décadas ayudando a empresas a mejorar sus operaciones, analizar su desempeño financiero y fortalecer sus procesos de ingresos, decidí pasar a la facturación médica para aplicar esas mismas habilidades en un campo donde puedo lograr una diferencia significativa.",
            "Hoy combino mi experiencia en finanzas, cuentas por cobrar, facturación y análisis financiero con el compromiso de ayudar a los proveedores de atención médica a mantener ciclos de ingresos saludables. Mi objetivo es ofrecer servicios de facturación médica precisos y confiables para que los proveedores dediquen menos tiempo a las tareas administrativas y más tiempo a sus pacientes.",
          ],
        },
        {
          name: "Lizbeth",
          role: "Facturación y atención al cliente",
          description: [
            "Con una maestría en sociología, una licenciatura en sociología y psicología, y una especialización secundaria en español, aporto una combinación única de habilidades analíticas, de investigación e interpersonales.",
            "Aunque mi enfoque es la facturación médica, también tengo experiencia en análisis de datos y disfruto utilizar los datos para identificar patrones, mejorar procesos y respaldar mejores decisiones. Ya sea mediante análisis empresarial o la evaluación de resultados de pacientes, creo que los datos pueden ser una herramienta poderosa para ayudar a las organizaciones a crecer. Mi objetivo es ofrecer una facturación médica precisa y confiable, además de una perspectiva analítica que aporte valor más allá de las tareas diarias.",
          ],
        },
      ],
    },
    whyUsPage: {
      metaTitle: "Por qué elegirnos",
      metaDescription:
        "Descubra cómo TrueCare apoya a las prácticas médicas con comunicación clara, revisión cuidadosa de reclamaciones, seguimiento constante e informes prácticos del ciclo de ingresos.",
      heroEyebrow: "Por qué TrueCare",
      heroTitle: "Apoyo de facturación basado en la claridad y el cuidado.",
      heroDescription:
        "La gestión del ciclo de ingresos debe darle más confianza a su práctica, no más complejidad. Aportamos un enfoque atento y organizado al trabajo detrás de cada reclamación.",
      differenceEyebrow: "Nuestra diferencia",
      differenceTitle: "Lo que puede esperar de nosotros",
      differenceDescription:
        "Una colaboración sencilla basada en un trabajo confiable, seguimiento cuidadoso y las necesidades de su práctica.",
      contactCta: "Comuníquese con nosotros",
      reasons: [
        {
          title: "Apoyo atento y confiable",
          description:
            "Mantenemos una comunicación clara y facilitamos la comprensión de lo que sucede en todo su ciclo de ingresos.",
        },
        {
          title: "Enfoque en reclamaciones limpias",
          description:
            "La revisión cuidadosa y el seguimiento constante ayudan a reducir errores, rechazos y demoras prevenibles.",
        },
        {
          title: "Apoyo adaptado a su práctica",
          description:
            "Nos tomamos el tiempo para comprender su flujo de trabajo, prioridades y objetivos antes de recomendar los próximos pasos.",
        },
      ],
      bannerPrimary: "¿Está listo para recibir apoyo de facturación confiable?",
      bannerSecondary:
        "Hablemos de cómo podría funcionar para su práctica.",
      closingTitle: "¿Listo para un ciclo de ingresos con más claridad?",
      closingDescription:
        "Exploremos cómo un apoyo atento con la facturación podría adaptarse a su práctica.",
      closingTopics: [
        {
          emphasis: "Comunicación clara",
          detail: "e informes prácticos de facturación",
        },
        {
          emphasis: "Reclamaciones y denegaciones",
          detail: "con revisión y seguimiento atentos",
        },
        {
          emphasis: "Su flujo de trabajo",
          detail: "y el apoyo que mejor se adapta",
        },
      ],
      partnershipEyebrow: "La colaboración",
      partnershipTitle: "Su práctica permanece en el centro.",
      partnershipDescription:
        "Consideramos la facturación como una extensión de la atención al paciente. Nuestra función es apoyar la salud financiera de su práctica respetando a las personas, los sistemas y los estándares que la hacen única.",
      commitmentsLabel: "Nuestros compromisos",
      commitments: [
        "Comunicación clara y ágil",
        "Apoyo de facturación organizado y preciso",
        "Seguimiento constante de reclamaciones y denegaciones",
        "Informes prácticos y fáciles de entender",
      ],
    },
    resources: {
      metaTitle: "Recursos",
      metaDescription:
        "Encuentre información clara sobre facturación médica, orientación sobre el ciclo de ingresos y respuestas prácticas a preguntas comunes de las prácticas médicas.",
      heroEyebrow: "Recursos",
      heroTitle: "Respuestas claras para un ciclo de ingresos más saludable.",
      heroDescription:
        "Información sencilla sobre facturación y herramientas prácticas para ayudar a su práctica a comprender el trabajo detrás de cada reclamación.",
      libraryEyebrow: "Biblioteca de recursos",
      libraryTitle: "Comience con el tema que necesita.",
      libraryDescription:
        "¿No sabe por dónde comenzar? Estamos aquí para ayudarle. Estamos creando una biblioteca especializada de guías, explicaciones sobre facturación y hojas de trabajo útiles para prácticas médicas.",
      shortcutsLabel: "Accesos directos a recursos",
      faqShortcut: "Ir a las preguntas frecuentes",
      closingTitle: "¿Necesita una respuesta más clara para su práctica?",
      closingDescription:
        "Comparta sus preguntas y prioridades de facturación.",
      closingTopics: [
        {
          emphasis: "Reclamaciones y denegaciones",
          detail: "incluidos los saldos pendientes",
        },
        {
          emphasis: "Información útil de facturación",
          detail: "que conviene revisar",
        },
        {
          emphasis: "Un punto de partida claro",
          detail: "para su proceso actual",
        },
      ],
      faqLabel: "Preguntas",
      contactShortcut: "Contactar a TrueCare",
      contact: "Contacto",
      comingSoon: "Próximamente",
      comingSoonLabel: "próximamente",
      groups: [
        {
          title: "Gestión del ciclo de ingresos",
          description:
            "Explicaciones claras del trabajo que mantiene las reclamaciones en marcha y los ingresos encaminados.",
          resources: [
            "Cómo entender el proceso de facturación médica",
            "Causas comunes de las denegaciones de reclamaciones",
            "Pasos para mejorar el flujo de efectivo",
            "Importancia de contar con información precisa del paciente",
          ],
        },
        {
          title: "Educación sobre seguros y facturación",
          description:
            "Orientación práctica para comprender la cobertura, los requisitos de los pagadores y las aprobaciones.",
          resources: [
            "Conceptos básicos de la coordinación de beneficios",
            "Cómo entender la Explicación de Beneficios",
            "Consejos de facturación de Medicare y Medicaid",
            "Explicación de las autorizaciones previas",
          ],
        },
        {
          title: "Descargas y hojas de trabajo",
          description:
            "Listas de verificación y hojas de trabajo sencillas que su práctica puede utilizar.",
          resources: [
            "Lista de verificación para el ingreso de pacientes nuevos",
            "Lista de verificación del seguro",
            "Hoja de evaluación de la salud del ciclo de ingresos",
          ],
        },
      ],
      faqTitle: "¿Tiene preguntas sobre el apoyo de facturación?",
      faqDescription:
        "Comience con algunas de las preguntas que las prácticas suelen hacer. Si necesita información más específica, con gusto podemos conversar.",
      faqItems: sharedFaq.es,
    },
    services: {
      metaTitle: "Nuestros servicios",
      metaDescription:
        "Explore nuestros servicios de facturación y codificación médica, presentación de reclamaciones, gestión de denegaciones, registro de pagos, seguimiento de cuentas por cobrar y acreditación.",
      title: "Nuestros servicios",
      intro:
        "Apoyo integral para el ciclo de ingresos, diseñado para que su práctica funcione sin contratiempos.",
      servicesLabel: "Servicios",
      chooseService: "Elija un servicio",
      previousService: "Servicio anterior",
      nextService: "Servicio siguiente",
      cardDeck: "Tarjetas de servicios",
      select: "Seleccionar",
      openDeck: "Abrir las tarjetas de servicios",
      integrationTitle: "Servicios que funcionan como un solo proceso.",
      integrationDescription:
        "Los problemas del ciclo de ingresos rara vez permanecen en una sola área. Podemos apoyar todo el flujo de trabajo o concentrarnos en los puntos que generan más dificultad.",
      integrationItems: [
        {
          title: "Comenzamos con su flujo de trabajo",
          description:
            "Revisamos su flujo de trabajo para encontrar dónde el apoyo puede marcar la diferencia más clara.",
        },
        {
          title: "Definimos el alcance adecuado",
          description:
            "Elija un servicio o conecte el apoyo en todo su ciclo de ingresos.",
        },
        {
          title: "Mantenemos el trabajo visible",
          description:
            "Las actualizaciones claras mantienen visibles el progreso, las prioridades y los próximos pasos.",
        },
      ],
      faqEyebrow: "Preguntas sobre los servicios",
      faqTitle: "¿Tiene preguntas antes de elegir un servicio?",
      faqDescription:
        "No necesita tener todos los detalles resueltos. Estas respuestas cubren lo que las prácticas suelen querer saber antes de comenzar.",
      faqItems: [
        {
          question: "¿Podemos comenzar con un solo servicio?",
          answer:
            "Sí. El apoyo puede concentrarse en una parte de su ciclo de ingresos o conectar varios servicios cuando su flujo de trabajo necesita una solución más amplia. Podemos definir el alcance inicial durante su consulta.",
        },
        {
          question: "¿Pueden ayudar con denegaciones o cuentas vencidas existentes?",
          answer:
            "Podemos revisar las denegaciones actuales, las reclamaciones sin pagar y los saldos vencidos para comprender qué necesita atención y conversar sobre un alcance de seguimiento adecuado para su práctica.",
        },
        {
          question: "¿Cómo es el proceso de incorporación?",
          answer:
            "Comenzamos por conocer su flujo de trabajo, sistemas, relaciones con pagadores, prioridades y requisitos de acceso. Luego establecemos las responsabilidades, la comunicación y una manera práctica de comenzar el trabajo.",
        },
        {
          question: "¿Trabajan con todas las especialidades y sistemas de facturación?",
          answer:
            "Cada práctica tiene requisitos diferentes. La consulta nos permite conocer su especialidad, sistemas y combinación de pagadores para confirmar si nuestro apoyo es adecuado.",
        },
        {
          question: "¿Cómo sabremos qué sucede con nuestra facturación?",
          answer:
            "Damos prioridad a la comunicación clara y los informes prácticos. El proceso de actualización puede adaptarse a su flujo de trabajo para que su equipo sepa qué avanza y qué necesita atención.",
        },
      ],
      closingTitle: "¿No sabe dónde necesita apoyo su ciclo de ingresos?",
      closingDescription:
        "No necesita diagnosticar cada problema de facturación antes de comunicarse con nosotros. Comenzaremos con su flujo de trabajo e identificaremos dónde el apoyo puede marcar la diferencia más clara.",
      closingTopics: [
        {
          emphasis: "Su flujo de trabajo actual",
          detail: "y los puntos que lo están retrasando",
        },
        {
          emphasis: "Reclamaciones, denegaciones o saldos vencidos",
          detail: "que necesitan atención",
        },
        {
          emphasis: "Un alcance de servicios",
          detail: "adaptado a su práctica",
        },
      ],
      items: [
        {
          id: "medical-billing-coding",
          number: "01",
          title: "Facturación y codificación médica",
          summary: "Codificación precisa. Reclamaciones limpias.",
          description:
            "Ayudamos a las prácticas médicas a presentar reclamaciones precisas, reducir errores de facturación y mantener el flujo de ingresos.",
          bullets: [
            "Apoyo para una codificación precisa",
            "Preparación de reclamaciones limpias",
            "Menos reclamaciones rechazadas o denegadas",
          ],
        },
        {
          id: "claims-submission",
          number: "02",
          title: "Presentación de reclamaciones",
          summary: "Presentación oportuna. Pagos más rápidos.",
          description:
            "Gestionamos la presentación correcta y oportuna de reclamaciones para que su práctica reciba pagos más rápido y con menos demoras evitables.",
          bullets: [
            "Presentación electrónica de reclamaciones",
            "Revisión según los requisitos del pagador",
            "Procesamiento más rápido de los pagos",
          ],
        },
        {
          id: "denial-management",
          number: "03",
          title: "Gestión de denegaciones",
          summary: "Menos denegaciones. Recuperación de ingresos.",
          description:
            "Investigamos las denegaciones, corregimos los problemas de las reclamaciones y mejoramos el proceso para recuperar más ingresos obtenidos.",
          bullets: [
            "Análisis de la causa de las denegaciones",
            "Apelaciones y correcciones",
            "Seguimiento enfocado en la recuperación",
          ],
        },
        {
          id: "payment-posting",
          number: "04",
          title: "Registro de pagos",
          summary: "Registro preciso. Datos actualizados.",
          description:
            "Mantenemos el registro de pagos preciso y actualizado para que sus libros reflejen el estado real de cada reclamación.",
          bullets: [
            "Registro manual y de remesas electrónicas",
            "Actualizaciones precisas de las cuentas",
            "Visibilidad clara de los pagos",
          ],
        },
        {
          id: "ar-follow-up",
          number: "05",
          title: "Seguimiento de cuentas por cobrar",
          summary: "Seguimiento persistente. Mejores cobros.",
          description:
            "Damos seguimiento a las reclamaciones sin pagar y a los saldos vencidos para mejorar los cobros y reducir las cuentas pendientes.",
          bullets: [
            "Revisión de antigüedad de cuentas por cobrar",
            "Procesos de seguimiento con pagadores",
            "Mejor ritmo de cobro",
          ],
        },
        {
          id: "credentialing-support",
          number: "06",
          title: "Apoyo para la acreditación",
          summary: "Acreditación sin complicaciones. Permanezca dentro de la red.",
          description:
            "Apoyamos la inscripción y reacreditación de proveedores para que su práctica cumpla con los requisitos y permanezca dentro de la red.",
          bullets: [
            "Apoyo para la inscripción de proveedores",
            "Seguimiento de la reacreditación",
            "Ayuda con la participación en redes",
          ],
        },
      ],
    },
  },
};

export function getTranslations(locale: Locale) {
  return translations[locale];
}
