document.addEventListener("DOMContentLoaded", () => {
  let cursor = document.querySelector("#custom-cursor");
  let images = document.querySelectorAll(".hero-images img");
  let heroText = document.querySelector(".hero-text");

  // Cursor follows mouse
  document.addEventListener("mousemove", (e) => {
      gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.2,
          ease: "power2.out",
      });
  });

  // Default Floating Animation (Subtle Movement)
  images.forEach((image) => {
      gsap.to(image, {
          y: "random(-10, 10)",
          x: "random(-10, 10)",
          repeat: -1,
          yoyo: true,
          duration: 2,
          ease: "power1.inOut",
      });
  });

  images.forEach((image) => {
      image.addEventListener("mouseenter", () => {
          gsap.to(cursor, { scale: 2, backgroundColor: "rgba(255, 255, 255, 0.8)" });
          gsap.to(image, { scale: 1.2, duration: 0.3, ease: "power3.out" });
          gsap.to(heroText, { opacity: 0.2, duration: 0.3 });

          // Fade out other images
          images.forEach((other) => {
              if (other !== image) {
                  gsap.to(other, { opacity: 0.2, duration: 0.3 });
              }
          });
      });

      image.addEventListener("mousemove", (event) => {
          const { offsetX, offsetY } = event;
          const xMove = (offsetX / image.clientWidth - 0.5) * 20;
          const yMove = (offsetY / image.clientHeight - 0.5) * 20;
          
          // Move the image dynamically when hovered
          gsap.to(image, { x: xMove, y: yMove, duration: 0.3, ease: "power1.out" });
      });

      image.addEventListener("mouseleave", () => {
          gsap.to(cursor, { scale: 1, backgroundColor: "rgba(255, 255, 255, 0.2)" });
          gsap.to(image, { scale: 1, x: 0, y: 0, duration: 0.3, ease: "power3.out" }); // Reset movement
          gsap.to(heroText, { opacity: 1, duration: 0.3 });

          // Restore opacity of other images
          images.forEach((other) => gsap.to(other, { opacity: 1, duration: 0.3 }));
      });
  });
});
