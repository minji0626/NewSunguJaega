document.addEventListener("DOMContentLoaded", function () {

    /* ===========================
       1. 메인 슬라이더
    ============================ */
    let slideIndex = 0;
    const slides = document.getElementsByClassName("slide");

    function showSlide() {
        if (!slides || slides.length === 0) return;

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        slideIndex++;
        if (slideIndex > slides.length) slideIndex = 1;

        slides[slideIndex - 1].style.display = "block";

        setTimeout(showSlide, 4000);
    }
    showSlide();



    /* ===========================
       2. 모바일 메뉴 (오른쪽)
    ============================ */
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const closeMenu = document.getElementById("closeMenu");

    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.add("open");
    });

    closeMenu.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
    });



    /* ===========================
       3. 모바일 아코디언 메뉴
    ============================ */
    const dropdownHeaders = document.querySelectorAll(".m-dropdown > a");

    dropdownHeaders.forEach(el => {
        el.addEventListener("click", e => {
            e.preventDefault();
            el.parentElement.classList.toggle("open");
        });
    });



    /* ===========================
       4. 맨 위로 이동 버튼
    ============================ */
    const toTopBtn = document.getElementById("toTop");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            toTopBtn.classList.add("show");
        } else {
            toTopBtn.classList.remove("show");
        }
    });

    toTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
