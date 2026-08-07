import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { Bouquet } from './Bouquets';


interface BouquetModalProps {
  bouquet: Bouquet | null;
  onClose: () => void;
}


export default function BouquetModal({
  bouquet,
  onClose,
}: BouquetModalProps) {

  const [activeImage, setActiveImage] = useState(0);


  useEffect(() => {

    if (!bouquet) return;

    setActiveImage(0);

    const previous = document.body.style.overflow;

    document.body.style.overflow = 'hidden';


    const handleKey = (event: KeyboardEvent) => {

      if (event.key === 'Escape') {
        onClose();
      }


      if (event.key === 'ArrowRight') {
        nextImage();
      }


      if (event.key === 'ArrowLeft') {
        prevImage();
      }

    };


    window.addEventListener(
      'keydown',
      handleKey
    );


    return () => {

      document.body.style.overflow = previous;

      window.removeEventListener(
        'keydown',
        handleKey
      );

    };


  }, [bouquet]);


  if (!bouquet) return null;


  function nextImage() {

    if (!bouquet) return;

    setActiveImage((current) =>
      current === bouquet.images.length - 1
        ? 0
        : current + 1
    );

  }


  function prevImage() {

    if (!bouquet) return;

    setActiveImage((current) =>
      current === 0
        ? bouquet.images.length - 1
        : current - 1
    );

  }



  return (

    <AnimatePresence>

      <motion.div

        initial={{
          opacity: 0,
        }}

        animate={{
          opacity: 1,
        }}

        exit={{
          opacity: 0,
        }}

        onClick={onClose}

        className="
          fixed
          inset-0
          z-50
          flex
          items-center
          justify-center
          bg-black/40
          backdrop-blur-md
          p-4
        "

      >


        <motion.div

          initial={{
            opacity:0,
            y:40,
            scale:0.96,
          }}

          animate={{
            opacity:1,
            y:0,
            scale:1,
          }}

          exit={{
            opacity:0,
            y:40,
            scale:0.96,
          }}

          transition={{
            duration:0.45,
            ease:[0.22,1,0.36,1],
          }}

          onClick={(event)=>event.stopPropagation()}

          className="
            relative
            grid
            max-h-[90vh]
            w-full
            max-w-6xl
            overflow-hidden
            rounded-[2rem]
            bg-[#FDF8F5]
            shadow-2xl
            lg:grid-cols-2
          "

        >


          {/* CLOSE */}

          <button

            onClick={onClose}

            className="
              absolute
              right-6
              top-6
              z-20
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-white/70
              text-xl
              backdrop-blur
              transition
              hover:bg-white
            "

          >
            ×
          </button>




          {/* IMAGE AREA */}

          <div
            className="
              relative
              flex
              flex-col
              bg-[#F4ECE7]
              p-5
            "
          >


            <div
              className="
                relative
                flex
                h-[55vh]
                items-center
                justify-center
                overflow-hidden
                rounded-3xl
              "
            >


              <AnimatePresence mode="wait">


                <motion.img

                  key={activeImage}

                  src={bouquet.images[activeImage]}

                  alt={bouquet.name}

                  initial={{
                    opacity:0,
                    scale:1.04,
                  }}

                  animate={{
                    opacity:1,
                    scale:1,
                  }}

                  exit={{
                    opacity:0,
                    scale:0.98,
                  }}

                  transition={{
                    duration:0.35,
                  }}

                  className="
                    h-full
                    w-full
                    object-cover
                  "

                />


              </AnimatePresence>



              {bouquet.images.length > 1 && (

                <>

                  <button

                    onClick={prevImage}

                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-full
                      bg-white/80
                      text-xl
                      backdrop-blur
                    "

                  >
                    ‹
                  </button>



                  <button

                    onClick={nextImage}

                    className="
                      absolute
                      right-4
                      top-1/2
                      -translate-y-1/2
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-full
                      bg-white/80
                      text-xl
                      backdrop-blur
                    "

                  >
                    ›
                  </button>

                </>

              )}


            </div>




            {/* THUMBNAILS */}

            <div
              className="
                mt-4
                flex
                gap-3
                overflow-x-auto
              "
            >

              {bouquet.images.map(
                (image,index)=>(

                <button

                  key={image}

                  onClick={() =>
                    setActiveImage(index)
                  }

                  className={`
                    h-20
                    w-20
                    flex-shrink-0
                    overflow-hidden
                    rounded-xl
                    ${
                      activeImage === index
                      ? 'ring-2 ring-rose-deep'
                      : ''
                    }
                  `}

                >

                  <img
                    src={image}
                    alt=""
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                  />

                </button>

              ))}

            </div>


          </div>






          {/* CONTENT */}


          <div
            className="
              overflow-y-auto
              p-8
              lg:p-12
            "
          >


            <p
              className="
                text-xs
                uppercase
                tracking-[0.3em]
                text-rose-deep
              "
            >
              Букет
            </p>



            <h2
              className="
                mt-4
                font-serif
                text-5xl
                text-ink
              "
            >
              {bouquet.name}
            </h2>



            <p
              className="
                mt-4
                text-lg
                font-light
                text-ink-soft
              "
            >
              {bouquet.mood}
            </p>




            <div
              className="
                my-8
                h-px
                bg-black/10
              "
            />




            <div>

              <h3
                className="
                  font-serif
                  text-xl
                "
              >
                Состав
              </h3>


              <p
                className="
                  mt-3
                  text-ink-soft
                "
              >
                {bouquet.composition}
              </p>


            </div>





            <div
              className="
                mt-8
              "
            >

              <h3
                className="
                  font-serif
                  text-xl
                "
              >
                Уход
              </h3>


              <p
                className="
                  mt-3
                  leading-relaxed
                  text-ink-soft
                "
              >
                {bouquet.care}
              </p>


            </div>





            <div
              className="
                mt-10
                flex
                items-center
                justify-between
              "
            >

              <span
                className="
                  font-serif
                  text-3xl
                  text-ink
                "
              >
                {bouquet.price}
              </span>


              <button

                className="
                  rounded-full
                  bg-rose-deep
                  px-8
                  py-4
                  text-sm
                  text-white
                  transition
                  hover:opacity-90
                "

              >
                Заказать букет

              </button>


            </div>


          </div>


        </motion.div>


      </motion.div>


    </AnimatePresence>

  );
}