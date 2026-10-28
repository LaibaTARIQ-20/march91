import type { HeroSlide } from "@/types";
import { homepage } from "@/content/homepage";

export const heroSlides: HeroSlide[] = [
  {
    id: "fall26-1",
    image: "/images/hero/fall26-1.jpg",
    alt: "March '91 cover, NUST Fall '26: Terry cloth collage with four students and library books.",
    label: homepage.copy.coverKicker,
    title: "We're all wearing terry this fall.",
    href: "/lifestyle/how-to-wear-yourself",
  },
  {
    id: "fall26-2",
    image: "/images/hero/fall26-2.jpg",
    alt: "March '91 cover: Next gen casual wear — pastels, charm & literacy.",
    label: homepage.copy.coverKicker,
    title: "Next gen casual wear",
    text: "Pastels, charm & literacy.",
  },
  {
    id: "fall26-3",
    image: "/images/hero/fall26-3.jpg",
    alt: "Fall '26 cover: Semester is in session.",
    label: homepage.copy.coverKicker,
    title: "Semester is in session.",
    text: "It's pen and paper again. Get ready for sleepless nights and group projects.",
  },
  {
    id: "fall26-4",
    image: "/images/hero/fall26-4.jpg",
    alt: "March '91 cover: A student photographed against library shelves.",
    label: homepage.copy.coverKicker,
    title: "March '91 x terry",
  },
];
