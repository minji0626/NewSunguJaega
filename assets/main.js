document.addEventListener("DOMContentLoaded", () => {
    /* 슬라이더 */
    const slides = Array.from(document.querySelectorAll(".slide"));
    let slideIndex = 0;

    function rotateSlides() {
        if (!slides.length) return;
        slides.forEach((slide, idx) => {
            slide.classList.toggle("active", idx === slideIndex);
        });
        slideIndex = (slideIndex + 1) % slides.length;
    }
    rotateSlides();
    setInterval(rotateSlides, 5000);

    /* 모바일 메뉴 */
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const closeMenu = document.getElementById("closeMenu");

    menuBtn?.addEventListener("click", () => mobileMenu?.classList.add("open"));
    closeMenu?.addEventListener("click", () => mobileMenu?.classList.remove("open"));

    /* 모바일 드롭다운 */
    document.querySelectorAll(".m-dropdown > a").forEach(trigger => {
        trigger.addEventListener("click", e => {
            e.preventDefault();
            trigger.parentElement?.classList.toggle("open");
        });
    });

    /* 맨 위로 이동 버튼 */
    const toTopBtn = document.getElementById("toTop");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            toTopBtn?.classList.add("show");
        } else {
            toTopBtn?.classList.remove("show");
        }
    });
    toTopBtn?.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    /* 내비게이션 활성화 표시 */
    const current = (location.pathname.split("/").pop() || "index.html").split("#")[0];
    const setActive = selector => {
        document.querySelectorAll(selector).forEach(link => {
            const href = (link.getAttribute("href") || "").split("#")[0];
            if (!href) return;
            const normalized = href === "./" ? "index.html" : href;
            if (normalized === current || (normalized === "index.html" && current === "")) {
                link.classList.add("active");
            }
        });
    };
    setActive(".nav-menu a, .mobile-menu a");

    /* 스크롤 애니메이션 */
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll(".card, .role-item, .metric-card, .callout-card").forEach(el => {
        el.classList.add("reveal");
        observer.observe(el);
    });

    /* 카카오 지도 초기화 (API 키가 입력된 경우) */
    const mapContainer = document.getElementById("kakaoMap");
    if (mapContainer) {
        const fallback = document.getElementById("mapFallback");
        const appKey = mapContainer.dataset.kakaoAppKey;
        const address = mapContainer.dataset.address;

        const showFallback = () => {
            if (mapContainer) mapContainer.style.display = "none";
            fallback?.classList.add("show");
        };

        const initMap = () => {
            const { kakao } = window;
            if (!kakao?.maps || !kakao?.maps?.services) return showFallback();

            const geocoder = new kakao.maps.services.Geocoder();
            geocoder.addressSearch(address, (result, status) => {
                if (status !== kakao.maps.services.Status.OK || !result?.length) {
                    showFallback();
                    return;
                }

                const { x, y } = result[0];
                const coords = new kakao.maps.LatLng(y, x);
                const map = new kakao.maps.Map(mapContainer, { center: coords, level: 3 });
                const marker = new kakao.maps.Marker({ position: coords });
                marker.setMap(map);

                const title = mapContainer.dataset.title || "위치";
                const info = new kakao.maps.InfoWindow({
                    content: `<div class="map-info-window">${title}</div>`
                });
                info.open(map, marker);
            });
        };

        if (appKey && appKey !== "YOUR_APP_KEY") {
            const script = document.createElement("script");
            script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&libraries=services`;
            script.async = true;
            script.defer = true;
            script.onload = initMap;
            script.onerror = showFallback;
            document.head.appendChild(script);
        } else {
            showFallback();
        }
    }
});
