import React from "react";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <main className="sign-in">
      <aside className="testimonial">
        <Link href="/">
          <Image
            src="/assets/icons/logo.svg"
            alt="logo"
            height={32}
            width={32}
          />
          <h1>ShareBetter</h1>
        </Link>
        <div className="description">
          <section>
            <figure>
              {Array.from({ length: 5 }).map((_, index) => (
                <Image
                  src="/assets/icons/star.svg"
                  alt="rating"
                  width={16}
                  height={16}
                />
              ))}
            </figure>
            <p>
              ShareBetter makes screen recording easy. From quick walkthroughs
              to full presentations , it's fast, smooth and shareble in seconds.
            </p>
            <article>
              <Image
                src="/assets/images/jason.png"
                alt="jason"
                width={64}
                height={64}
                className="rounded-full"
              />

              <div>
                <h2>Jason Rivera</h2>
                <p>Product Manager,GeoTech</p>
              </div>
            </article>
          </section>
        </div>
        <p>©ShareBetter {new Date().getFullYear()}</p>
      </aside>
      <aside className="google-sign-in">
        <section>
          <Link href="/">
            <Image
              src="/assets/icons/logo.svg"
              alt="logo"
              height={32}
              width={32}
            />
            <h1>ShareBetter</h1>
          </Link>
          <p>
            Create your very first video recording with ShareBetter in no time!
          </p>
          <button>
            <Image
              src="/assets/icons/google.svg"
              alt="google"
              height={22}
              width={22}
            />
            <span>SignIn with Google</span>
          </button>
        </section>
      </aside>
      <div className="overlay" />
    </main>
  );
};

export default page;
