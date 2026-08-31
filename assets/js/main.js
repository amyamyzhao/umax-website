/* UMAX Sports — global interactions, inquiry context and GA4 measurement. */

(() => {
  "use strict";

  const GA4_MEASUREMENT_ID = "G-CJ1CP50Q81";
  const ANALYTICS_CONSENT_STORAGE_KEY = "umax_analytics_consent_v1";
  const ANALYTICS_CONSENT_MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000;
  const WHATSAPP_NUMBER = "8618358338643";
  const PRODUCTION_HOST = "www.umaxsporting.com";
  const PRODUCTION_ORIGIN = `https://${PRODUCTION_HOST}`;
  const TRUSTED_EXTERNAL_REFERRERS = Object.freeze([
    {
      canonicalOrigin: "https://www.google.com/",
      domains: [
        "google.com", "google.co.uk", "google.de", "google.fr", "google.nl",
        "google.es", "google.it", "google.ca", "google.com.au", "google.co.nz",
        "google.co.in", "google.co.jp", "google.com.sg", "google.com.hk",
      ],
    },
    { canonicalOrigin: "https://www.bing.com/", domains: ["bing.com"] },
    { canonicalOrigin: "https://search.yahoo.com/", domains: ["yahoo.com"] },
    { canonicalOrigin: "https://duckduckgo.com/", domains: ["duckduckgo.com"] },
    { canonicalOrigin: "https://www.baidu.com/", domains: ["baidu.com"] },
    { canonicalOrigin: "https://www.linkedin.com/", domains: ["linkedin.com"] },
    { canonicalOrigin: "https://www.facebook.com/", domains: ["facebook.com"] },
    { canonicalOrigin: "https://www.instagram.com/", domains: ["instagram.com"] },
    { canonicalOrigin: "https://www.youtube.com/", domains: ["youtube.com", "youtu.be"] },
    { canonicalOrigin: "https://www.alibaba.com/", domains: ["alibaba.com"] },
    { canonicalOrigin: "https://chatgpt.com/", domains: ["chatgpt.com"] },
    { canonicalOrigin: "https://www.perplexity.ai/", domains: ["perplexity.ai"] },
  ]);
  const SAFE_CAMPAIGN_STORAGE_KEY = "umax_safe_campaign_v1";
  const CLICK_ID_QUERY_NAMES = new Set([
    "gclid", "dclid", "gbraid", "wbraid", "fbclid", "msclkid",
    "ttclid", "twclid", "li_fat_id", "sccid", "gclsrc", "srsltid",
    "_ga", "_gl",
  ]);
  const CAMPAIGN_SOURCE_VALUES = Object.freeze({
    google: "google",
    google_ads: "google",
    googleads: "google",
    bing: "bing",
    microsoft_ads: "bing",
    microsoftads: "bing",
    linkedin: "linkedin",
    linkedin_ads: "linkedin",
    facebook: "facebook",
    fb: "facebook",
    meta: "facebook",
    instagram: "instagram",
    ig: "instagram",
    youtube: "youtube",
    alibaba: "alibaba",
    email: "email",
    newsletter: "newsletter",
    whatsapp: "whatsapp",
    chatgpt: "chatgpt",
    perplexity: "perplexity",
  });
  const CAMPAIGN_MEDIUM_VALUES = Object.freeze({
    cpc: "cpc",
    ppc: "cpc",
    paid_search: "paid_search",
    paidsearch: "paid_search",
    paid_social: "paid_social",
    paidsocial: "paid_social",
    social: "social",
    organic_social: "organic_social",
    email: "email",
    referral: "referral",
    display: "display",
    video: "video",
    affiliate: "affiliate",
  });
  const CAMPAIGN_NAME_VALUES = Object.freeze({
    umax_launch: "umax_launch",
    custom_gym_turf: "custom_gym_turf",
    commercial_gym_turf: "commercial_gym_turf",
    branded_sled_track: "branded_sled_track",
    rubber_flooring: "rubber_flooring",
    rubber_flooring_rolls: "rubber_flooring_rolls",
    rubber_gym_tiles: "rubber_gym_tiles",
    functional_equipment: "functional_equipment",
    gym_solutions: "gym_solutions",
    free_sample: "free_sample",
    logo_mockup: "logo_mockup",
  });
  const CAMPAIGN_TERM_VALUES = Object.freeze({
    commercial_gym_turf: "commercial_gym_turf",
    custom_gym_turf: "custom_gym_turf",
    gym_turf: "gym_turf",
    sled_track: "sled_track",
    branded_sled_track: "branded_sled_track",
    rubber_gym_flooring: "rubber_gym_flooring",
    rubber_flooring_rolls: "rubber_flooring_rolls",
    rubber_gym_tiles: "rubber_gym_tiles",
    functional_fitness_equipment: "functional_fitness_equipment",
  });
  const CAMPAIGN_CONTENT_VALUES = Object.freeze({
    hero: "hero",
    hero_cta: "hero_cta",
    nav: "nav",
    nav_cta: "nav_cta",
    product_card: "product_card",
    blog_card: "blog_card",
    blog_cta: "blog_cta",
    quote_cta: "quote_cta",
    sample_cta: "sample_cta",
    mockup_cta: "mockup_cta",
    whatsapp_cta: "whatsapp_cta",
  });
  const CAMPAIGN_QUERY_FIELDS = Object.freeze([
    {
      queryName: "utm_source",
      analyticsName: "campaign_source",
      values: CAMPAIGN_SOURCE_VALUES,
    },
    {
      queryName: "utm_medium",
      analyticsName: "campaign_medium",
      values: CAMPAIGN_MEDIUM_VALUES,
    },
    {
      queryName: "utm_campaign",
      analyticsName: "campaign_name",
      values: CAMPAIGN_NAME_VALUES,
    },
    {
      queryName: "utm_term",
      analyticsName: "campaign_term",
      values: CAMPAIGN_TERM_VALUES,
    },
    {
      queryName: "utm_content",
      analyticsName: "campaign_content",
      values: CAMPAIGN_CONTENT_VALUES,
    },
  ]);
  const CAMPAIGN_QUERY_BY_NAME = new Map(
    CAMPAIGN_QUERY_FIELDS.map((field) => [field.queryName, field]),
  );
  const NOT_FOUND_ROUTE = Object.freeze({
    id: "not_found",
    canonicalPath: "/404",
    analyticsTitle: "Page Not Found | UMAX Sports",
    whatsappLabel: "the UMAX website",
  });
  const ROUTE_DEFINITIONS = Object.freeze([
    {
      id: "home",
      aliases: ["/", "/index.html"],
      canonicalPath: "/",
      analyticsTitle: "Hybrid Training Equipment & Custom Turf | UMAX Sports",
      whatsappLabel: "the UMAX Sports home page",
    },
    {
      id: "quote",
      aliases: ["/get-a-quote", "/get-a-quote.html"],
      canonicalPath: "/get-a-quote",
      analyticsTitle: "Get a Gym Equipment & Shipping Quote | UMAX Sports",
      whatsappLabel: "the UMAX project quote page",
    },
    {
      id: "products_index",
      aliases: ["/products", "/products/", "/products/index.html"],
      canonicalPath: "/products/",
      analyticsTitle: "Commercial Gym Products | Turf, Flooring & Equipment | UMAX",
      whatsappLabel: "the UMAX product catalog",
    },
    {
      id: "solutions_index",
      aliases: ["/solutions", "/solutions/", "/solutions/index.html"],
      canonicalPath: "/solutions/",
      analyticsTitle: "Commercial Gym & Fitness Studio Solutions | UMAX Sports",
      whatsappLabel: "the UMAX project solutions page",
    },
    {
      id: "project_uk_14x3m",
      aliases: [
        "/projects/uk-custom-gym-turf-14x3m",
        "/projects/uk-custom-gym-turf-14x3m.html",
      ],
      canonicalPath: "/projects/uk-custom-gym-turf-14x3m",
      analyticsTitle: "14m × 3m Custom Gym Turf UK Project | UMAX",
      whatsappLabel: "the UK 14m × 3m custom gym turf project",
    },
    {
      id: "project_nl_30x2m",
      aliases: [
        "/projects/netherlands-custom-gym-turf-30x2m",
        "/projects/netherlands-custom-gym-turf-30x2m.html",
      ],
      canonicalPath: "/projects/netherlands-custom-gym-turf-30x2m",
      analyticsTitle: "30m × 2m Custom Gym Turf Netherlands Project | UMAX",
      whatsappLabel: "the Netherlands 30m × 2m custom gym turf project",
    },
    {
      id: "blog_index",
      aliases: ["/blog", "/blog/", "/blog/index.html"],
      canonicalPath: "/blog/",
      analyticsTitle: "Commercial Gym Planning & Equipment Guides | UMAX Blog",
      whatsappLabel: "the UMAX planning guides",
    },
    {
      id: "product_custom_gym_turf",
      aliases: ["/products/custom-gym-turf", "/products/custom-gym-turf.html"],
      canonicalPath: "/products/custom-gym-turf",
      analyticsTitle: "Custom Gym Turf & Branded Sled Tracks | UMAX Sports",
      whatsappLabel: "the Custom Gym Turf product page",
    },
    {
      id: "product_functional_equipment",
      aliases: [
        "/products/functional-equipment",
        "/products/functional-equipment.html",
      ],
      canonicalPath: "/products/functional-equipment",
      analyticsTitle: "Functional Fitness Equipment Supplier | UMAX Sports",
      whatsappLabel: "the Functional Fitness Equipment product page",
    },
    {
      id: "product_rubber_flooring",
      aliases: ["/products/rubber-flooring", "/products/rubber-flooring.html"],
      canonicalPath: "/products/rubber-flooring",
      analyticsTitle: "Commercial Rubber Gym Flooring Manufacturer | Rolls & Tiles",
      whatsappLabel: "the Rubber Gym Flooring product page",
    },
    {
      id: "product_rubber_flooring_rolls",
      aliases: [
        "/products/rubber-flooring-rolls",
        "/products/rubber-flooring-rolls.html",
      ],
      canonicalPath: "/products/rubber-flooring-rolls",
      analyticsTitle: "Commercial Rubber Flooring Rolls Manufacturer | UMAX",
      whatsappLabel: "the Rubber Flooring Rolls product page",
    },
    {
      id: "product_rubber_gym_tiles",
      aliases: ["/products/rubber-gym-tiles", "/products/rubber-gym-tiles.html"],
      canonicalPath: "/products/rubber-gym-tiles",
      analyticsTitle: "Commercial Rubber Gym Tiles Manufacturer | UMAX Sports",
      whatsappLabel: "the Rubber Gym Tiles product page",
    },
    {
      id: "blog_hybrid_training_zone",
      aliases: [
        "/blog/custom-gym-turf-hybrid-training-zone",
        "/blog/custom-gym-turf-hybrid-training-zone.html",
      ],
      canonicalPath: "/blog/custom-gym-turf-hybrid-training-zone",
      analyticsTitle: "Custom Gym Turf for Hybrid Training Zones | UMAX Sports",
      whatsappLabel: "the Hybrid Training Zone planning guide",
    },
    {
      id: "blog_sled_track_guide",
      aliases: [
        "/blog/commercial-gym-sled-track-guide",
        "/blog/commercial-gym-sled-track-guide.html",
      ],
      canonicalPath: "/blog/commercial-gym-sled-track-guide",
      analyticsTitle: "How to Build a Commercial Gym Sled Track | Turf & Layout Guide",
      whatsappLabel: "the Commercial Gym Sled Track guide",
    },
    {
      id: "blog_turf_vs_rubber",
      aliases: [
        "/blog/gym-turf-vs-rubber-flooring",
        "/blog/gym-turf-vs-rubber-flooring.html",
      ],
      canonicalPath: "/blog/gym-turf-vs-rubber-flooring",
      analyticsTitle: "Gym Turf vs Rubber Flooring: Commercial Gym Surface Guide | UMAX Sports",
      whatsappLabel: "the Gym Turf vs Rubber Flooring guide",
    },
    {
      id: "blog_pile_height",
      aliases: [
        "/blog/gym-turf-pile-height-guide",
        "/blog/gym-turf-pile-height-guide.html",
      ],
      canonicalPath: "/blog/gym-turf-pile-height-guide",
      analyticsTitle: "15mm vs 20mm vs 25mm Gym Turf for Sled Training | UMAX Sports",
      whatsappLabel: "the Gym Turf Pile Height guide",
    },
    {
      id: "blog_logo_design_process",
      aliases: [
        "/blog/custom-gym-turf-with-logo-design-process",
        "/blog/custom-gym-turf-with-logo-design-process.html",
      ],
      canonicalPath: "/blog/custom-gym-turf-with-logo-design-process",
      analyticsTitle: "Custom Gym Turf With Logo: Design-to-Delivery Guide | UMAX",
      whatsappLabel: "the Custom Gym Turf Logo guide",
    },
    {
      id: "blog_rolls_vs_tiles",
      aliases: [
        "/blog/rubber-gym-flooring-rolls-vs-tiles",
        "/blog/rubber-gym-flooring-rolls-vs-tiles.html",
      ],
      canonicalPath: "/blog/rubber-gym-flooring-rolls-vs-tiles",
      analyticsTitle: "Rubber Gym Flooring Rolls vs Tiles: Commercial Buyer Guide",
      whatsappLabel: "the Rubber Gym Flooring Rolls vs Tiles guide",
    },
    {
      ...NOT_FOUND_ROUTE,
      aliases: ["/404", "/404.html"],
    },
  ]);
  const ROUTE_BY_EXACT_PATH = new Map();
  ROUTE_DEFINITIONS.forEach((route) => {
    route.aliases.forEach((alias) => ROUTE_BY_EXACT_PATH.set(alias, route));
  });

  const routeForPathname = (pathname) => {
    if (typeof pathname !== "string" || pathname.length > 256) return NOT_FOUND_ROUTE;
    return ROUTE_BY_EXACT_PATH.get(pathname) || NOT_FOUND_ROUTE;
  };
  const currentRoute = () => routeForPathname(window.location.pathname);
  const hostnameMatchesDomain = (hostname, domain) =>
    hostname === domain || hostname.endsWith(`.${domain}`);
  const trustedExternalReferrerOrigin = (referrer) => {
    if (referrer.protocol !== "https:" || referrer.port) return "";
    const hostname = referrer.hostname.toLowerCase();
    const match = TRUSTED_EXTERNAL_REFERRERS.find(({ domains }) =>
      domains.some((domain) => hostnameMatchesDomain(hostname, domain)));
    return match?.canonicalOrigin || "";
  };
  const referrerContext = () => {
    const currentCanonicalUrl = `${PRODUCTION_ORIGIN}${currentRoute().canonicalPath}`;
    if (!document.referrer) {
      return { analyticsValue: "", inquiryValue: currentCanonicalUrl };
    }
    try {
      const referrer = new URL(document.referrer);
      if (referrer.protocol !== "http:" && referrer.protocol !== "https:") {
        return { analyticsValue: "", inquiryValue: "external referral" };
      }
      if (referrer.origin === PRODUCTION_ORIGIN) {
        const safeRoute = routeForPathname(referrer.pathname);
        const canonicalUrl = `${PRODUCTION_ORIGIN}${safeRoute.canonicalPath}`;
        return { analyticsValue: canonicalUrl, inquiryValue: canonicalUrl };
      }
      const trustedOrigin = trustedExternalReferrerOrigin(referrer);
      return {
        analyticsValue: trustedOrigin,
        inquiryValue: trustedOrigin || "external referral",
      };
    } catch {
      return { analyticsValue: "", inquiryValue: "external referral" };
    }
  };
  const analyticsPageLocation = () =>
    `${PRODUCTION_ORIGIN}${currentRoute().canonicalPath}`;
  const analyticsPageReferrer = () => referrerContext().analyticsValue;
  const inquirySourcePage = () => referrerContext().inquiryValue;
  const isProductionMeasurementContext = () =>
    window.location.origin === PRODUCTION_ORIGIN;
  const hasUntrustedClickIdQuery = () => {
    const search = new URLSearchParams(window.location.search);
    return [...search.keys()].some((name) => {
      const normalized = name.toLowerCase();
      return CLICK_ID_QUERY_NAMES.has(normalized)
        || normalized.endsWith("clid")
        || normalized.startsWith("gad_");
    });
  };
  const normalizeCampaignToken = (value) => String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_");
  const safeCampaignFromSearch = () => {
    const search = new URLSearchParams(window.location.search);
    return Object.fromEntries(CAMPAIGN_QUERY_FIELDS.map((field) => {
      const normalized = normalizeCampaignToken(search.get(field.queryName));
      return [field.queryName, field.values[normalized] || ""];
    }));
  };
  const hasUntrustedCampaignQuery = () => {
    const search = new URLSearchParams(window.location.search);
    const utmNames = [...search.keys()].filter((name) =>
      name.toLowerCase().startsWith("utm_"));
    if (utmNames.length === 0) return false;
    if (utmNames.some((name) => name !== name.toLowerCase())) return true;
    if (utmNames.some((name) => !CAMPAIGN_QUERY_BY_NAME.has(name))) return true;

    for (const field of CAMPAIGN_QUERY_FIELDS) {
      const values = search.getAll(field.queryName);
      if (values.length > 1) return true;
      if (values.length === 1) {
        const normalized = normalizeCampaignToken(values[0]);
        if (!field.values[normalized]) return true;
      }
    }
    const campaign = safeCampaignFromSearch();
    return !hasCompleteCampaign(campaign);
  };
  const validateStoredCampaign = (candidate) => Object.fromEntries(
    CAMPAIGN_QUERY_FIELDS.map((field) => {
      const value = candidate && typeof candidate === "object"
        ? candidate[field.queryName]
        : "";
      return [
        field.queryName,
        Object.values(field.values).includes(value) ? value : "",
      ];
    }),
  );
  const hasCompleteCampaign = (campaign) => Boolean(
    campaign.utm_source && campaign.utm_medium && campaign.utm_campaign,
  );
  const storedCampaignContext = () => {
    try {
      const stored = JSON.parse(
        window.sessionStorage.getItem(SAFE_CAMPAIGN_STORAGE_KEY) || "null",
      );
      const validated = validateStoredCampaign(stored);
      return hasCompleteCampaign(validated)
        ? validated
        : validateStoredCampaign(null);
    } catch {
      return validateStoredCampaign(null);
    }
  };
  const safeCampaignContext = () => {
    const currentQueryIsTrusted = !hasUntrustedClickIdQuery()
      && !hasUntrustedCampaignQuery()
      && !hasUntrustedGeneralQuery();
    const current = currentQueryIsTrusted
      ? safeCampaignFromSearch()
      : validateStoredCampaign(null);
    if (currentQueryIsTrusted && hasCompleteCampaign(current)) {
      try {
        window.sessionStorage.setItem(
          SAFE_CAMPAIGN_STORAGE_KEY,
          JSON.stringify(current),
        );
      } catch {
        // Storage may be unavailable in privacy-restricted browsers.
      }
      return current;
    }
    return storedCampaignContext();
  };
  const analyticsCampaignFields = () => {
    const campaign = safeCampaignContext();
    return Object.fromEntries(CAMPAIGN_QUERY_FIELDS.flatMap((field) => {
      const value = campaign[field.queryName];
      return value ? [[field.analyticsName, value]] : [];
    }));
  };
  const initializeGa4 = () => {
    if (window.__UMAX_GA4_INITIALIZED__) return;
    window.__UMAX_GA4_READY__ = false;
    if (!isProductionMeasurementContext()) {
      window.__UMAX_GA4_BLOCKED__ = "NON_PRODUCTION_ORIGIN";
      return;
    }
    if (hasUntrustedClickIdQuery()) {
      window.__UMAX_GA4_BLOCKED__ = "UNTRUSTED_CLICK_ID_QUERY";
      return;
    }
    if (hasUntrustedCampaignQuery()) {
      window.__UMAX_GA4_BLOCKED__ = "UNTRUSTED_CAMPAIGN_QUERY";
      return;
    }
    if (hasUntrustedGeneralQuery()) {
      window.__UMAX_GA4_BLOCKED__ = "UNTRUSTED_QUERY";
      return;
    }

    const existingDataLayer = window.dataLayer;
    const existingLoader = document.querySelector(
      'script[src*="googletagmanager.com/gtag/js"], script[src*="googletagmanager.com/gtm.js"]',
    );
    const hasPreexistingTagRuntime = typeof window.gtag === "function"
      || (existingDataLayer != null && !Array.isArray(existingDataLayer))
      || (Array.isArray(existingDataLayer) && existingDataLayer.length > 0)
      || Boolean(existingLoader);
    if (hasPreexistingTagRuntime) {
      window.__UMAX_GA4_BLOCKED__ = "PREEXISTING_TAG_RUNTIME";
      return;
    }

    window.dataLayer = existingDataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };

    window.gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    window.gtag("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    window.gtag("js", new Date());
    window.gtag("config", GA4_MEASUREMENT_ID, {
      allow_ad_personalization_signals: false,
      allow_google_signals: false,
      page_location: analyticsPageLocation(),
      page_referrer: analyticsPageReferrer(),
      page_title: currentRoute().analyticsTitle,
      ...analyticsCampaignFields(),
    });

    const loader = document.createElement("script");
    loader.async = true;
    loader.referrerPolicy = "origin";
    loader.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
    document.head.appendChild(loader);

    window.__UMAX_GA4_INITIALIZED__ = true;
    window.__UMAX_GA4_READY__ = true;
    window.__UMAX_GA4_BLOCKED__ = "";
  };

  const PRODUCT_ITEMS = Object.freeze({
    "/products/custom-gym-turf": {
      item_id: "custom-gym-turf",
      item_name: "Custom Gym Turf",
      item_category: "Gym Turf",
    },
    "/products/functional-equipment": {
      item_id: "functional-equipment",
      item_name: "Functional Equipment",
      item_category: "Training Equipment",
    },
    "/products/rubber-flooring": {
      item_id: "rubber-flooring",
      item_name: "Rubber Flooring",
      item_category: "Gym Flooring",
    },
    "/products/rubber-flooring-rolls": {
      item_id: "rubber-flooring-rolls",
      item_name: "Rubber Flooring Rolls",
      item_category: "Gym Flooring",
    },
    "/products/rubber-gym-tiles": {
      item_id: "rubber-gym-tiles",
      item_name: "Rubber Gym Tiles",
      item_category: "Gym Flooring",
    },
  });

  const PRODUCT_QUERY_ALIASES = Object.freeze({
    "custom-gym-turf": "turf",
    "rubber-flooring": "flooring",
    "rubber-flooring-rolls": "flooring",
    "rubber-gym-tiles": "flooring",
    "functional-equipment": "equipment",
    "golf-sports-mats": "golf_mats",
    "golf-baseball-mats": "golf_mats",
  });
  const PRODUCT_LABELS = Object.freeze({
    turf: "custom gym turf",
    flooring: "rubber flooring",
    equipment: "functional equipment",
    large_equipment: "larger equipment",
    golf_mats: "golf or sports mats",
    not_sure: "products to be confirmed",
  });
  const PROJECT_CONTEXT = Object.freeze({
    "commercial-gym": { buyer: "commercial_gym", type: "new_facility" },
    "fitness-studio": { buyer: "boutique_studio", type: "new_facility" },
    distribution: { buyer: "distributor_importer", type: "resale_private_label" },
    "sports-facility": { buyer: "sports_facility", type: "new_facility" },
    "custom-branding": { buyer: "private_label", type: "resale_private_label" },
    "mixed-order": { buyer: "distributor_importer", type: "resale_private_label" },
  });
  const PRODUCT_QUERY_VALUES = new Set([
    ...Object.keys(PRODUCT_QUERY_ALIASES),
    ...Object.keys(PRODUCT_LABELS),
  ]);
  const PROJECT_CONTEXT_VALUES = new Set([
    ...Object.keys(PROJECT_CONTEXT),
    "uk-14x3m",
    "nl-30x2m",
  ]);
  const PRODUCT_ANALYTICS_VALUES = new Set(Object.keys(PRODUCT_LABELS));
  const BUYER_ANALYTICS_VALUES = new Set([
    "commercial_gym",
    "boutique_studio",
    "distributor_importer",
    "private_label",
    "sports_facility",
    "home_other",
  ]);
  const INTENT_CONTEXT_VALUES = new Set(["project", "mockup", "free-sample", "sample"]);
  const PROJECT_TYPE_VALUES = new Set([
    "new_facility", "upgrade", "trial_order", "resale_private_label",
  ]);
  const BUDGET_VALUES = new Set([
    "under5k", "5k_20k", "20k_50k", "50k_plus", "prefer_not",
  ]);
  const CUSTOMIZATION_VALUES = new Set([
    "logo", "color_pattern", "packaging", "full_oem", "none",
  ]);
  const SHIPPING_VALUES = new Set(["express", "air", "sea", "ddp", "not_sure"]);
  const WEB3FORMS_TEXT_FIELDS = Object.freeze([
    "country", "name", "company", "email", "whatsapp", "facility_size",
    "quantity", "target_date", "file_link", "message",
  ]);
  const WEB3FORMS_ENUM_FIELDS = Object.freeze({
    buyer_type: BUYER_ANALYTICS_VALUES,
    project_type: PROJECT_TYPE_VALUES,
    budget: BUDGET_VALUES,
    customization: CUSTOMIZATION_VALUES,
    shipping: SHIPPING_VALUES,
  });
  const WEB3FORMS_FIXED_FIELDS = Object.freeze({
    access_key: "6f75b4b4-fd1e-48f3-85a3-635b2703c5d3",
    subject: "New RFQ from UMAX Sports Website",
    from_name: "UMAX Sports Website",
  });

  const allowlistedValue = (value, allowedValues, fallback = "") =>
    allowedValues.has(value) ? value : fallback;

  const CONTEXT_QUERY_FIELDS = new Map([
    ["product", PRODUCT_QUERY_VALUES],
    ["project", PROJECT_CONTEXT_VALUES],
    ["intent", INTENT_CONTEXT_VALUES],
    ["inquiry", INTENT_CONTEXT_VALUES],
  ]);
  const hasUntrustedGeneralQuery = () => {
    const search = new URLSearchParams(window.location.search);
    const names = [...search.keys()];
    if (names.some((name) => name !== name.toLowerCase())) return true;
    if (search.has("intent") && search.has("inquiry")) return true;

    return names.some((name) => {
      if (CAMPAIGN_QUERY_BY_NAME.has(name)) return false;
      const allowedValues = CONTEXT_QUERY_FIELDS.get(name);
      if (!allowedValues) return true;
      const values = search.getAll(name);
      return values.length !== 1 || !allowedValues.has(values[0]);
    });
  };

  const trackEvent = (name, parameters = {}) => {
    if (!isProductionMeasurementContext()) return false;
    if (window.__UMAX_GA4_READY__ !== true) return false;
    if (typeof window.gtag !== "function") return false;
    try {
      window.gtag("event", name, parameters);
      return true;
    } catch (error) {
      console.warn("UMAX analytics event skipped:", error);
      return false;
    }
  };

  let productViewTracked = false;
  const trackProductView = () => {
    const item = PRODUCT_ITEMS[currentRoute().canonicalPath];
    if (!item || productViewTracked) return;
    productViewTracked = trackEvent("view_item", { items: [item] });
  };

  let inMemoryAnalyticsConsent = null;
  const consentSignal = (analyticsStorage) => ({
    analytics_storage: analyticsStorage,
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  const readAnalyticsConsent = () => {
    if (inMemoryAnalyticsConsent) return inMemoryAnalyticsConsent;
    try {
      const stored = JSON.parse(window.localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY));
      const isCurrent = stored?.version === 1
        && ["granted", "denied"].includes(stored?.value)
        && Number.isFinite(stored?.savedAt)
        && Date.now() - stored.savedAt <= ANALYTICS_CONSENT_MAX_AGE_MS;
      if (!isCurrent) {
        window.localStorage.removeItem(ANALYTICS_CONSENT_STORAGE_KEY);
        return null;
      }
      inMemoryAnalyticsConsent = stored.value;
      return stored.value;
    } catch {
      return null;
    }
  };
  const writeAnalyticsConsent = (value) => {
    inMemoryAnalyticsConsent = value;
    try {
      window.localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, JSON.stringify({
        version: 1,
        value,
        savedAt: Date.now(),
      }));
    } catch {
      // The current-page choice still works when local storage is unavailable.
    }
  };
  const removeGaCookies = () => {
    const analyticsCookieNames = document.cookie
      .split(";")
      .map((entry) => entry.trim().split("=")[0])
      .filter((name) => name === "_ga" || name.startsWith("_ga_"));
    analyticsCookieNames.forEach((name) => {
      document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`;
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.umaxsporting.com; SameSite=Lax`;
    });
  };
  const grantAnalyticsMeasurement = () => {
    if (window.__UMAX_GA4_INITIALIZED__ && typeof window.gtag === "function") {
      window.gtag("consent", "update", consentSignal("granted"));
      window.__UMAX_GA4_READY__ = true;
      window.__UMAX_GA4_BLOCKED__ = "";
    } else {
      initializeGa4();
    }
    trackProductView();
  };
  const denyAnalyticsMeasurement = () => {
    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", consentSignal("denied"));
    }
    window.__UMAX_GA4_READY__ = false;
    window.__UMAX_GA4_BLOCKED__ = "CONSENT_DENIED";
    removeGaCookies();
  };
  const injectConsentStyles = () => {
    if (document.getElementById("umax-consent-styles")) return;
    const style = document.createElement("style");
    style.id = "umax-consent-styles";
    style.textContent = `
      .umax-consent{position:fixed;z-index:1200;left:18px;right:18px;bottom:18px;margin:auto;max-width:1180px;background:#171717;color:#fff;border:1px solid #404040;border-top:4px solid #2db228;box-shadow:0 18px 48px rgba(0,0,0,.38);padding:20px 22px;font-family:inherit}
      .umax-consent[hidden]{display:none!important}
      .umax-consent__layout{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:24px}
      .umax-consent__title{display:block;margin-bottom:5px;font-size:1rem;line-height:1.25;color:#fff}
      .umax-consent__copy{margin:0;color:#d0d0d0;font-size:.88rem;line-height:1.55;max-width:760px}
      .umax-consent details{margin-top:8px;color:#bdbdbd;font-size:.78rem;line-height:1.5}
      .umax-consent summary{cursor:pointer;color:#8ed58b;text-decoration:underline;text-underline-offset:3px}
      .umax-consent__actions{display:flex;gap:10px;flex-wrap:wrap;justify-content:flex-end}
      .umax-consent__button{min-height:44px;border:2px solid #2db228;padding:10px 16px;background:transparent;color:#fff;font:inherit;font-size:.8rem;font-weight:800;letter-spacing:.04em;text-transform:uppercase;cursor:pointer}
      .umax-consent__button--allow{background:#2db228;color:#071107}
      .umax-consent__button:focus-visible,.umax-cookie-settings:focus-visible{outline:3px solid #fff;outline-offset:3px}
      .umax-cookie-settings{border:0;border-bottom:1px solid currentColor;padding:2px 0;background:transparent;color:var(--gray-30,#bdbdbd);font:inherit;font-size:.72rem;cursor:pointer}
      @media(max-width:760px){.umax-consent{left:10px;right:10px;bottom:10px;padding:18px}.umax-consent__layout{grid-template-columns:1fr;gap:16px}.umax-consent__actions{justify-content:stretch}.umax-consent__button{flex:1 1 145px}}
      @media(prefers-reduced-motion:reduce){.umax-consent *{scroll-behavior:auto!important;transition:none!important}}
    `;
    document.head.appendChild(style);
  };
  const initializeAnalyticsConsent = () => {
    injectConsentStyles();
    const banner = document.createElement("aside");
    banner.className = "umax-consent";
    banner.hidden = true;
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-modal", "false");
    banner.setAttribute("aria-label", "Analytics preferences");
    banner.innerHTML = `
      <div class="umax-consent__layout">
        <div>
          <strong class="umax-consent__title">Optional analytics</strong>
          <p class="umax-consent__copy">We use Google Analytics only to understand website visits, product interest and successful inquiries. Advertising tracking is off. Your choice does not affect website access.</p>
          <details><summary>What is and is not measured</summary>GA4 may measure pages viewed, approximate location, device type and privacy-safe events. Names, email addresses, phone numbers and message content are not sent to GA4.</details>
        </div>
        <div class="umax-consent__actions">
          <button type="button" class="umax-consent__button" data-analytics-deny>Reject analytics</button>
          <button type="button" class="umax-consent__button umax-consent__button--allow" data-analytics-grant>Allow analytics</button>
        </div>
      </div>`;
    document.body.appendChild(banner);

    const openBanner = () => {
      banner.hidden = false;
    };
    const closeBanner = () => {
      banner.hidden = true;
    };
    banner.querySelector("[data-analytics-grant]")?.addEventListener("click", () => {
      writeAnalyticsConsent("granted");
      grantAnalyticsMeasurement();
      closeBanner();
    });
    banner.querySelector("[data-analytics-deny]")?.addEventListener("click", () => {
      writeAnalyticsConsent("denied");
      denyAnalyticsMeasurement();
      closeBanner();
    });

    const settingsButton = document.createElement("button");
    settingsButton.type = "button";
    settingsButton.className = "umax-cookie-settings";
    settingsButton.textContent = "Analytics settings";
    settingsButton.addEventListener("click", openBanner);
    document.querySelector(".footer-bottom")?.appendChild(settingsButton);

    const storedConsent = readAnalyticsConsent();
    if (storedConsent === "granted") {
      grantAnalyticsMeasurement();
    } else if (storedConsent === "denied") {
      denyAnalyticsMeasurement();
    } else {
      window.__UMAX_GA4_READY__ = false;
      window.__UMAX_GA4_BLOCKED__ = "CONSENT_REQUIRED";
      openBanner();
    }
    window.__UMAX_ANALYTICS_CONSENT__ = () => readAnalyticsConsent();
  };

  const pageContext = () => {
    const params = new URLSearchParams(window.location.search);
    const intent = params.get("intent") || params.get("inquiry") || "";
    const route = currentRoute();
    return {
      product: allowlistedValue(params.get("product") || "", PRODUCT_QUERY_VALUES),
      project: allowlistedValue(params.get("project") || "", PROJECT_CONTEXT_VALUES),
      intent: allowlistedValue(intent, INTENT_CONTEXT_VALUES),
      routeId: route.id,
      pathname: route.canonicalPath,
      whatsappLabel: route.whatsappLabel,
    };
  };

  const quoteCtaContext = (link) => {
    try {
      const params = new URL(link.href, window.location.href).searchParams;
      const intent = params.get("intent") || params.get("inquiry") || "";
      const values = [
        allowlistedValue(params.get("product") || "", PRODUCT_QUERY_VALUES),
        allowlistedValue(params.get("project") || "", PROJECT_CONTEXT_VALUES),
        allowlistedValue(intent, INTENT_CONTEXT_VALUES),
      ].filter(Boolean);
      return values.join("|") || "general";
    } catch {
      return "general";
    }
  };

  const buildWhatsAppUrl = (message) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  const genericWhatsAppMessage = () => {
    const context = pageContext();
    const details = [context.product, context.project, context.intent]
      .filter(Boolean)
      .join(" / ");
    return `Hello UMAX, I am viewing ${context.whatsappLabel}${details ? ` (${details})` : ""} and would like to discuss a project.`;
  };

  const setSelectValue = (form, name, value) => {
    if (!value) return;
    const field = form.elements.namedItem(name);
    if (field && [...field.options].some((option) => option.value === value)) {
      field.value = value;
    }
  };

  const inquiryContextValue = () => {
    const context = pageContext();
    return [
      context.product && `product=${context.product}`,
      context.project && `project=${context.project}`,
      context.intent && `intent=${context.intent}`,
    ].filter(Boolean).join("; ") || "general website inquiry";
  };

  const buildWeb3FormsData = (form) => {
    const incoming = new FormData(form);
    const outgoing = new FormData();

    Object.entries(WEB3FORMS_FIXED_FIELDS).forEach(([name, value]) => {
      outgoing.set(name, value);
    });
    if (incoming.has("botcheck")) outgoing.set("botcheck", "on");

    WEB3FORMS_TEXT_FIELDS.forEach((name) => {
      const value = incoming.get(name);
      outgoing.set(name, typeof value === "string" ? value : "");
    });
    Object.entries(WEB3FORMS_ENUM_FIELDS).forEach(([name, allowedValues]) => {
      const value = incoming.get(name);
      outgoing.set(
        name,
        typeof value === "string" && allowedValues.has(value) ? value : "",
      );
    });
    [...new Set(incoming.getAll("products"))]
      .filter((value) => typeof value === "string" && PRODUCT_ANALYTICS_VALUES.has(value))
      .forEach((value) => outgoing.append("products", value));

    outgoing.set("source_page", inquirySourcePage());
    outgoing.set("inquiry_context", inquiryContextValue());
    const campaign = safeCampaignContext();
    CAMPAIGN_QUERY_FIELDS.forEach(({ queryName }) => {
      outgoing.set(queryName, campaign[queryName] || "");
    });
    return outgoing;
  };

  const prefillInquiry = (form) => {
    const context = pageContext();
    const product = context.product;
    const project = context.project;
    const intent = context.intent;
    const productValue = PRODUCT_QUERY_ALIASES[product]
      || allowlistedValue(product, PRODUCT_ANALYTICS_VALUES);

    if (productValue) {
      const productInput = form.querySelector(
        `input[name="products"][value="${CSS.escape(productValue)}"]`,
      );
      if (productInput) productInput.checked = true;
    }

    if (PROJECT_CONTEXT[project]) {
      setSelectValue(form, "buyer_type", PROJECT_CONTEXT[project].buyer);
      setSelectValue(form, "project_type", PROJECT_CONTEXT[project].type);
    }
    if (intent === "free-sample" || intent === "sample") {
      setSelectValue(form, "project_type", "trial_order");
    }

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
      trackEvent("sample_request", {
        product: allowlistedValue(productValue, PRODUCT_ANALYTICS_VALUES, "not_selected"),
      });
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

  const initializePage = () => {
    if (window.__UMAX_PAGE_INITIALIZED__) return;
    window.__UMAX_PAGE_INITIALIZED__ = true;

    initializeAnalyticsConsent();

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
        const route = currentRoute();
        trackEvent("quote_cta_click", {
          cta_context: quoteCtaContext(link),
          source_route: route.id,
          source_path: route.canonicalPath,
        });
      });
    });

    const protectWhatsAppLink = (link) => {
      const rel = new Set(link.rel.split(/\s+/).filter(Boolean));
      rel.add("noopener");
      rel.add("noreferrer");
      link.rel = [...rel].join(" ");
      link.referrerPolicy = "no-referrer";
    };
    document.querySelectorAll('a[href*="wa.me/"]').forEach((link) => {
      link.href = buildWhatsAppUrl(genericWhatsAppMessage());
      protectWhatsAppLink(link);
    });
    document.addEventListener("click", (event) => {
      const origin = event.target instanceof Element ? event.target : event.target?.parentElement;
      const link = origin?.closest('a[href*="wa.me/"]');
      if (!link) return;
      link.href = buildWhatsAppUrl(genericWhatsAppMessage());
      protectWhatsAppLink(link);
      const route = currentRoute();
      trackEvent("whatsapp_click", {
        source_route: route.id,
        source_path: route.canonicalPath,
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

      let formSubmitting = false;
      rfqForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (formSubmitting) return;
        if (!validateFirstStep(rfqForm)) {
          showFormStep(rfqForm, 1);
          return;
        }
        formSubmitting = true;

        const button = rfqForm.querySelector('[type="submit"]');
        const originalText = button.textContent;
        button.textContent = "Sending...";
        button.disabled = true;
        const formData = buildWeb3FormsData(rfqForm);
        const controller = "AbortController" in window ? new AbortController() : null;
        const timeoutId = controller
          ? window.setTimeout(() => controller.abort(), 15000)
          : null;

        try {
          const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData,
            referrerPolicy: "origin",
            signal: controller?.signal,
          });
          const result = await response.json();
          if (!response.ok || result?.success !== true) {
            throw new Error(result?.message || "Submission failed");
          }

          trackEvent("generate_lead", {
            form_id: "rfq-form",
            products: formData.getAll("products")
              .filter((product) => PRODUCT_ANALYTICS_VALUES.has(product))
              .join(","),
            buyer_type: allowlistedValue(
              formData.get("buyer_type") || "",
              BUYER_ANALYTICS_VALUES,
              "not_selected",
            ),
          });
          const whatsappUrl = buildWhatsAppUrl(genericWhatsAppMessage());
          rfqForm.innerHTML = `
            <div style="text-align:center;padding:56px 12px">
              <div style="font-size:3rem;margin-bottom:14px;color:#2DB228" aria-hidden="true">✓</div>
              <h2 style="margin-bottom:12px">Request Received</h2>
              <p style="margin-bottom:10px">We usually send the first reply within 5 minutes during working hours.</p>
              <p style="color:var(--gray-50);margin-bottom:26px">Have a logo, floor plan or reference file? Send it now through WhatsApp or email.</p>
              <div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center">
                <a class="btn btn-primary" href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" referrerpolicy="no-referrer">Send Files on WhatsApp</a>
                <a class="btn btn-outline" href="mailto:zoey@umaxsporting.com">Send Files by Email</a>
              </div>
            </div>`;
        } catch (error) {
          formSubmitting = false;
          button.textContent = originalText;
          button.disabled = false;
          window.alert("We could not send the form. Please try again or contact us on WhatsApp.");
          console.error("Web3Forms error:", error);
        } finally {
          if (timeoutId !== null) window.clearTimeout(timeoutId);
        }
      });
      const jsSubmitButton = rfqForm.querySelector("[data-js-submit]");
      if (jsSubmitButton) jsSubmitButton.disabled = false;
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
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializePage, { once: true });
  } else {
    initializePage();
  }
})();
