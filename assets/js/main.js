/* UMAX Sports — global interactions, inquiry context and optional analytics hooks. */

(() => {
  "use strict";

  const WHATSAPP_NUMBER = "8618358338643";

  const trackEvent = (name, parameters = {}) => {
    if (typeof window.gtag === "function") {
      window.gtag("event", name, parameters);
    }
  };

  const pageContext = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      product: params.get("product") || "",
      project: params.get("project") || "",
      intent: params.get("intent") || params.get("inquiry") || "",
      pathname: window.location.pathname,
      title: document.title,
    };
  };

  const buildWhatsAppUrl = (message) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  const genericWhatsAppMessage = () => {
    const context = pageContext();
    const details = [context.product, context.project, context.intent]
      .filter(Boolean)
      .join(" / ");
    return `Hello UMAX, I am viewing ${context.pathname}${details ? ` (${details})` : ""} and would like to discuss a project.`;
  };

  const setSelectValue = (form, name, value) => {
    if (!value) return;
    const field = form.elements.namedItem(name);
    if (field && [...field.options].some((option) => option.value === value)) {
      field.value = value;
    }
  };

  const prefillInquiry = (form) => {
    const params = new URLSearchParams(window.location.search);
    const productAliases = {
      "custom-gym-turf": "turf",
      "rubber-flooring": "flooring",
      "functional-equipment": "equipment",
      "golf-sports-mats": "golf_mats",
      "golf-baseball-mats": "golf_mats",
    };
    const projectMap = {
      "commercial-gym": { buyer: "commercial_gym", type: "new_facility" },
      "fitness-studio": { buyer: "boutique_studio", type: "new_facility" },
      distribution: { buyer: "distributor_importer", type: "resale_private_label" },
      "sports-facility": { buyer: "sports_facility", type: "new_facility" },
      "custom-branding": { buyer: "private_label", type: "resale_private_label" },
      "mixed-order": { buyer: "distributor_importer", type: "resale_private_label" },
    };

    const product = params.get("product") || "";
    const project = params.get("project") || "";
    const intent = params.get("intent") || params.get("inquiry") || "";
    const productValue = productAliases[product] || product;

    if (productValue) {
      const productInput = form.querySelector(
        `input[name="products"][value="${CSS.escape(productValue)}"]`,
      );
      if (productInput) productInput.checked = true;
    }

    if (projectMap[project]) {
      setSelectValue(form, "buyer_type", projectMap[project].buyer);
      setSelectValue(form, "project_type", projectMap[project].type);
    }
    if (intent === "free-sample" || intent === "sample") {
      setSelectValue(form, "project_type", "trial_order");
    }

    const sourceField = form.elements.namedItem("source_page");
    if (sourceField) sourceField.value = document.referrer || window.location.href;

    const contextField = form.elements.namedItem("inquiry_context");
    if (contextField) {
      contextField.value = [
        product && `product=${product}`,
        project && `project=${project}`,
        intent && `intent=${intent}`,
      ].filter(Boolean).join("; ") || "general website inquiry";
    }

    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach((name) => {
      const field = form.elements.namedItem(name);
      if (field) field.value = params.get(name) || "";
    });

    const title = document.getElementById("rfq-title");
    const subtitle = document.getElementById("rfq-subtitle");
    const productTitles = {
      "custom-gym-turf": "Get Your Custom Gym Turf Plan",
      "rubber-flooring": "Get Your Rubber Flooring Plan",
      "functional-equipment": "Build Your Equipment Quote",
      "golf-sports-mats": "Discuss Your Sports Mat Project",
    };
    if (title && productTitles[product]) title.innerHTML = productTitles[product];
    if (title && intent === "mockup") title.innerHTML = "Get Your 1-Hour<br>Initial Mockup";
    if (title && (intent === "free-sample" || intent === "sample")) title.innerHTML = "Request a Product<br>Sample";
    if (subtitle && project) {
      subtitle.textContent = "Your project context is already selected. Complete the essentials and add any details you have available.";
    }

    if (intent === "free-sample" || intent === "sample") {
      trackEvent("sample_request", { product: product || "not_selected" });
    }
  };

  const showFormStep = (form, stepNumber) => {
    form.querySelectorAll("[data-form-step]").forEach((step) => {
      step.hidden = step.dataset.formStep !== String(stepNumber);
    });
    document.querySelectorAll("[data-progress-step]").forEach((item) => {
      item.classList.toggle("is-active", item.dataset.progressStep === String(stepNumber));
    });
    form.dataset.currentStep = String(stepNumber);
    form.closest(".quote-panel")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const validateFirstStep = (form) => {
    const requiredFields = [...form.querySelectorAll('[data-form-step="1"] [required]')];
    const invalidField = requiredFields.find((field) => !field.checkValidity());
    if (invalidField) {
      invalidField.reportValidity();
      return false;
    }

    const productsSelected = form.querySelectorAll('input[name="products"]:checked').length > 0;
    const productError = form.querySelector("[data-product-error]");
    productError?.classList.toggle("is-visible", !productsSelected);
    if (!productsSelected) return false;

    const email = form.elements.namedItem("email");
    const whatsapp = form.elements.namedItem("whatsapp");
    const hasContact = Boolean(email?.value.trim() || whatsapp?.value.trim());
    const contactError = form.querySelector("[data-contact-error]");
    contactError?.classList.toggle("is-visible", !hasContact);
    if (!hasContact) {
      email?.focus();
      return false;
    }
    if (email?.value && !email.checkValidity()) {
      email.reportValidity();
      return false;
    }
    return true;
  };

  const successWhatsAppMessage = (formData) => {
    const name = formData.get("name") || "";
    const products = formData.getAll("products").join(", ") || "my project";
    return `Hello UMAX, I just submitted a website inquiry. Name: ${name}. Products: ${products}. I would like to share files or continue the discussion.`;
  };

  document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".nav-hamburger");
    const navLinks = document.querySelector(".nav-links");
    if (hamburger && navLinks) {
      hamburger.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        hamburger.setAttribute("aria-expanded", String(isOpen));
      });
      navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          navLinks.classList.remove("open");
          hamburger.setAttribute("aria-expanded", "false");
        });
      });
    }

    const nav = document.querySelector("nav.nav");
    if (nav) {
      window.addEventListener("scroll", () => {
        nav.style.borderBottomColor = window.scrollY > 60
          ? "rgba(255,255,255,0.08)"
          : "var(--gray-80)";
      }, { passive: true });
    }

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.1 });
      document.querySelectorAll("[data-aos]").forEach((element) => {
        element.style.opacity = "0";
        element.style.transform = "translateY(24px)";
        element.style.transition = "opacity .6s ease, transform .6s ease";
        observer.observe(element);
      });
    }

    document.querySelectorAll('a[href*="get-a-quote"]').forEach((link) => {
      link.addEventListener("click", () => {
        trackEvent("quote_cta_click", {
          link_text: link.textContent.trim(),
          source_path: window.location.pathname,
        });
      });
    });

    document.querySelectorAll('a[href*="wa.me/"]').forEach((link) => {
      if (!link.href.includes("text=")) link.href = buildWhatsAppUrl(genericWhatsAppMessage());
      link.addEventListener("click", () => {
        trackEvent("whatsapp_click", { source_path: window.location.pathname });
      });
    });

    const rfqForm = document.getElementById("rfq-form");
    if (rfqForm) {
      rfqForm.dataset.currentStep = "1";
      prefillInquiry(rfqForm);

      let formStarted = false;
      const markFormStarted = () => {
        if (formStarted) return;
        formStarted = true;
        trackEvent("form_start", { form_id: "rfq-form" });
      };
      rfqForm.addEventListener("input", markFormStarted, { once: true });
      rfqForm.addEventListener("change", markFormStarted, { once: true });

      rfqForm.querySelector("[data-form-next]")?.addEventListener("click", () => {
        if (validateFirstStep(rfqForm)) showFormStep(rfqForm, 2);
      });
      rfqForm.querySelector("[data-form-back]")?.addEventListener("click", () => showFormStep(rfqForm, 1));

      rfqForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (!validateFirstStep(rfqForm)) {
          showFormStep(rfqForm, 1);
          return;
        }

        const button = rfqForm.querySelector('[type="submit"]');
        const originalText = button.textContent;
        button.textContent = "Sending...";
        button.disabled = true;
        const formData = new FormData(rfqForm);

        try {
          const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData,
          });
          const result = await response.json();
          if (!result.success) throw new Error(result.message || "Submission failed");

          trackEvent("generate_lead", {
            form_id: "rfq-form",
            products: formData.getAll("products").join(","),
            buyer_type: formData.get("buyer_type") || "",
          });
          const whatsappUrl = buildWhatsAppUrl(successWhatsAppMessage(formData));
          rfqForm.innerHTML = `
            <div style="text-align:center;padding:56px 12px">
              <div style="font-size:3rem;margin-bottom:14px;color:#2DB228" aria-hidden="true">✓</div>
              <h2 style="margin-bottom:12px">Request Received</h2>
              <p style="margin-bottom:10px">We usually send the first reply within 5 minutes during working hours.</p>
              <p style="color:var(--gray-50);margin-bottom:26px">Have a logo, floor plan or reference file? Send it now through WhatsApp or email.</p>
              <div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center">
                <a class="btn btn-primary" href="${whatsappUrl}" target="_blank" rel="noopener">Send Files on WhatsApp</a>
                <a class="btn btn-outline" href="mailto:zoey@umaxsporting.com">Send Files by Email</a>
              </div>
            </div>`;
        } catch (error) {
          button.textContent = originalText;
          button.disabled = false;
          window.alert("We could not send the form. Please try again or contact us on WhatsApp.");
          console.error("Web3Forms error:", error);
        }
      });
    }

    document.querySelectorAll(".umax-reviews").forEach((module) => {
      const track = module.querySelector("[data-umax-review-track]");
      const previous = module.querySelector("[data-umax-review-prev]");
      const next = module.querySelector("[data-umax-review-next]");
      if (!track || !previous || !next) return;
      const scrollOneCard = (direction) => {
        const card = track.querySelector(".umax-review-card");
        const styles = window.getComputedStyle(track);
        const gap = Number.parseFloat(styles.columnGap || styles.gap || "0");
        const distance = card ? card.getBoundingClientRect().width + gap : 360;
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        track.scrollBy({ left: distance * direction, behavior: reduceMotion ? "auto" : "smooth" });
      };
      previous.addEventListener("click", () => scrollOneCard(-1));
      next.addEventListener("click", () => scrollOneCard(1));
    });
  });
})();
