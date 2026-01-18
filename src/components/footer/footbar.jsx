import logo from "../../assets/logowebp_250.webp";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footbar = () => {
  return (
    <footer
      className="
        w-full relative flex flex-wrap justify-between select-none
        px-2 py-4 border-t-2 border-[var(--primarycolor)]
        bg-[url('https://res.cloudinary.com/dusxlxlvm/image/upload/v1717660918/battlefiesta/assets/icon/honeywhite_qim3oy.webp')]
        bg-cover
        max-[600px]:bg-[url('https://res.cloudinary.com/dusxlxlvm/image/upload/v1717660663/battlefiesta/assets/icon/honeywhite1_yduwma.webp')]
      "
    >
      {/* SECTION 1 */}
      <section className="w-[24%] px-1 max-[600px]:w-full max-[600px]:mt-3
                          flex flex-col max-[600px]:items-center max-[600px]:text-center">
        <div className="w-10 h-10 mb-1 overflow-hidden max-[600px]:w-12 max-[600px]:h-12">
          <img
            src={logo}
            alt="BattleFiesta logo"
            className="w-full h-full object-cover"
          />
        </div>

        <h3 className="font-bold my-2 border-b-2 border-[#212529] w-fit">
          BattleFiesta
        </h3>
        <p className="font-medium">
          Esports Tournament Management Service
        </p>

        <section className="w-fit lg:w-full mt-2">
          <h3 className="font-bold my-2 border-b-2 border-[#212529] w-fit">
            Follow Us
          </h3>

          <div className="flex gap-3 mt-1">
            <a
              href="https://www.instagram.com/battlefiesta"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="BattleFiesta Instagram"
              className="text-[#212529] text-xl hover:text-[var(--primarycolor)]"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.youtube.com/@Battle_Fiesta"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="BattleFiesta Youtube"
              className="text-[#212529] text-xl hover:text-[var(--primarycolor)]"
            >
              <FaYoutube />
            </a>
          </div>
        </section>
      </section>

      {/* SECTION 2 */}
      <section className="w-[24%] px-1 max-[600px]:w-full max-[600px]:mt-3
                          flex flex-col max-[600px]:items-center max-[600px]:text-center">
        <h3 className="font-bold my-2 border-b-2 border-[#212529] w-fit">
          Information
        </h3>

        <ul>
          {[
            ["Watch Tutorial", "https://www.youtube.com/watch?v=z5JE3HUX0qk", true],
            ["About Us", "/about"],
            ["Privacy Policy", "/privacy"],
            ["Terms and Conditions", "/terms"],
            ["Refund and Cancellations", "/refund"],
            ["Plan and Pricing", "/subscription"],
          ].map(([label, link, external], i) => (
            <li key={i} className="my-1 list-none">
              {external ? (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block font-medium text-[#212529]
                             hover:text-[var(--primarycolor)]
                             before:absolute before:left-[-5px] before:top-0 before:h-full before:w-[2px]
                             before:bg-[var(--primarycolor)] before:invisible hover:before:visible
                             max-[600px]:before:left-[-95px]"
                >
                  {label}
                </a>
              ) : (
                <NavLink
                  to={link}
                  className="relative block font-medium text-[#212529]
                             hover:text-[var(--primarycolor)]
                             before:absolute before:left-[-5px] before:top-0 before:h-full before:w-[2px]
                             before:bg-[var(--primarycolor)] before:invisible hover:before:visible
                             max-[600px]:before:left-[-95px]"
                >
                  {label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* SECTION 3 */}
      <section className="w-[24%] px-1 max-[600px]:w-full max-[600px]:mt-3
                          flex flex-col max-[600px]:items-center max-[600px]:text-center">
        <h3 className="font-bold my-2 border-b-2 border-[#212529] w-fit">
          Quick Links
        </h3>

        <ul>
          {[
            ["Dashboard", "/dashboard"],
            ["Find Tournament", "/tournaments"],
            ["Contact Us", "/contact"],
            ["FAQ", "/faq"],
          ].map(([label, link], i) => (
            <li key={i} className="my-1 list-none">
              <NavLink
                to={link}
                className="relative block font-medium text-[#212529]
                           hover:text-[var(--primarycolor)]
                           before:absolute before:left-[-5px] before:top-0 before:h-full before:w-[2px]
                           before:bg-[var(--primarycolor)] before:invisible hover:before:visible
                           max-[600px]:before:left-[-95px]"
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </section>

      {/* SECTION 4 */}
      <address className="w-[24%] px-1 not-italic max-[600px]:w-full max-[600px]:mt-3
                          flex flex-col max-[600px]:items-center max-[600px]:text-center">
        <h3 className="font-bold my-2 border-b-2 border-[#212529] w-fit">
          Reach Us
        </h3>

        <a
          href="mailto:contact@battlefiesta.in"
          className="font-medium text-[#212529]
                     hover:text-[var(--primarycolor)]"
        >
          contact@battlefiesta.in
        </a>
      </address>
    </footer>
  );
};

export default Footbar;
