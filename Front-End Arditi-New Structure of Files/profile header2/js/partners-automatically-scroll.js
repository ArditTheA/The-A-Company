// const parent = document.querySelector(".seventh-form-partners-under-div");

// setInterval(() => {
//   parent.scrollLeft = parent.scrollWidth;
// }, 2500);

// const parent = document.querySelector(".seventh-form-partners-under-div");
// const children = document.querySelectorAll(".child-scroll");
// let index = 0;

// setInterval(() => {
//   parent.scrollLeft = children[index].offsetLeft;
//   index = (index + 1) % children.length;
// }, 1000);




    
        window.addEventListener('load', () => {
            const parent = document.querySelector(".seventh-form-partners-under-div");
        
            const scrollDuration = 18000; // in milliseconds
            const scrollDuration2 = 3000;
            const scrollInterval = 10; // in milliseconds
                    const maxScrollDistance = parent.scrollWidth - parent.clientWidth;
        
            let elapsed = 0;
            let isScrolledLeftToRight = false;
            let timerId;        
            parent.addEventListener('scroll', () => {
              if (parent.scrollLeft === 0 && isScrolledLeftToRight) {
                clearInterval(timerId);
              }
            });
        
            timerId = setInterval(() => {
              elapsed += scrollInterval;
              if (elapsed >= scrollDuration2 && !isScrolledLeftToRight) {
                isScrolledLeftToRight = true;
                elapsed = 0;
                setTimeout(() => {
                  isScrolledLeftToRight = false;
                  elapsed = 0;
                }, 5000); // 2 seconds in milliseconds
              }
              if (isScrolledLeftToRight) {
                const scrollRight = maxScrollDistance - (maxScrollDistance / (scrollDuration / scrollInterval)) * elapsed;
                parent.scrollLeft = Math.max(scrollRight, 0);
              } else {
                const scrollLeft = (maxScrollDistance / (scrollDuration / scrollInterval)) * elapsed;
                parent.scrollLeft = Math.min(scrollLeft, maxScrollDistance);
              }
            }, scrollInterval);
          });
            