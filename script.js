(function () {
  const config = window.SITE_CONFIG || { videos: [], gallery: [] };
  const videoGrid = document.getElementById("video-grid");
  const galleryGrid = document.getElementById("gallery-grid");
  const count = document.getElementById("gallery-count");
  const channel = config.youtubeChannel || "https://www.youtube.com/@mind_maya";

  function el(tag, cls, text) {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function videoCard(video, index) {
    const card = el("article", "video-card");
    const frame = el("div", "video-frame" + (video.format === "short" ? " video-frame-short" : ""));
    if (video.id && !video.id.startsWith("YOUR_")) {
      const iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(video.id) + (video.format === "short" ? "?rel=0" : "?rel=0");
      iframe.title = video.title || "Mind Maya Games video";
      iframe.loading = "lazy";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      iframe.referrerPolicy = "strict-origin-when-cross-origin";
      frame.appendChild(iframe);
    } else {
      const placeholder = el("div", "video-placeholder");
      placeholder.appendChild(el("span", "play-icon", "▶"));
      placeholder.appendChild(el("span", "placeholder-label", video.type === "SHORT" ? "YOUTUBE SHORT" : "VIDEO PREVIEW"));
      frame.appendChild(placeholder);
      frame.style.cursor = "pointer";
      frame.setAttribute("role", "link");
      frame.setAttribute("tabindex", "0");
      frame.setAttribute("aria-label", "Visit Mind Maya Games on YouTube");
      frame.addEventListener("click", () => window.open(channel, "_blank", "noopener,noreferrer"));
      frame.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") window.open(channel, "_blank", "noopener,noreferrer"); });
    }
    card.appendChild(frame);
    card.appendChild(el("span", "video-tag", video.type || (index === 0 ? "LATEST WORK" : "FROM THE DEV DESK")));
    card.appendChild(el("h3", "", video.title || "A moment from development"));
    card.appendChild(el("p", "", video.description || "Follow the process on the Mind Maya Games YouTube channel."));
    return card;
  }

  const videos = Array.isArray(config.videos) ? config.videos : [];
  const videoItems = videos.length ? videos.slice(0, 6) : [
    { title: "Development diary", description: "Add a YouTube video ID in site-config.js to embed your devlog.", type: "DEVLOG" },
    { title: "A quick look at Guliga", description: "Add a YouTube Shorts ID in site-config.js to feature a Short.", type: "SHORT" },
    { title: "Behind the build", description: "Tutorials, experiments, and progress from the studio.", type: "PROCESS" }
  ];
  videoItems.forEach((v, i) => videoGrid.appendChild(videoCard(v, i)));

  const galleryItems = Array.isArray(config.gallery) ? config.gallery : [];
  const samples = [
    { title: "A world taking shape", category: "ENVIRONMENT" },
    { title: "Prototype details", category: "IN DEVELOPMENT" },
    { title: "Mood & atmosphere", category: "VISUAL RESEARCH" },
    { title: "Gameplay experiments", category: "GAMEPLAY" },
    { title: "Behind the scenes", category: "DEV NOTES" }
  ];
  const items = galleryItems.length ? galleryItems : samples;
  count.textContent = String(galleryItems.length).padStart(2, "0");
  items.slice(0, 8).forEach((item, i) => {
    const card = el("div", "gallery-item");
    if (item.src) {
      const img = document.createElement("img");
      img.className = "gallery-image";
      img.src = item.src;
      img.alt = item.title || "Guliga screenshot";
      img.loading = "lazy";
      img.onerror = () => { img.remove(); card.appendChild(el("div", "gallery-sample")); };
      card.appendChild(img);
    } else {
      card.appendChild(el("div", "gallery-sample"));
    }
    const label = el("div", "gallery-label");
    label.appendChild(el("span", "", item.category || "GULIGA / WIP"));
    label.appendChild(document.createTextNode(item.title || "Untitled frame"));
    card.appendChild(label);
    galleryGrid.appendChild(card);
  });

  document.getElementById("year").textContent = new Date().getFullYear();

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(node => observer.observe(node));
  } else {
    document.querySelectorAll(".reveal").forEach(node => node.classList.add("is-visible"));
  }
})();
