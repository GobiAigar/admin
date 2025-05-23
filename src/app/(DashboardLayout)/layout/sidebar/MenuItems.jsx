import {
  IconAperture,
  IconCertificate,
  IconCopy,
  IconFlagQuestion,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconNews,
  IconPlus,
  IconTypography,
  IconUserPlus,
  IconWorldDollar,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "HOME",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    navlabel: true,
    subheader: "WEBSITE",
  },
  {
    id: uniqueId(),
    title: "Нүүр хуудас",
    icon: IconTypography,
    href: "/website/homepage",
  },
  {
    id: uniqueId(),
    title: "Бүтээгдэхүүн",
    icon: IconWorldDollar,
    href: "/website/product",
  },
  {
    id: uniqueId(),
    title: "Баталгаажуулалт",
    icon: IconCertificate,
    href: "/website/sustainability",
  },
  {
    id: uniqueId(),
    title: "Aсуулт, Статистик",
    icon: IconFlagQuestion,
    href: "/website/faq",
  },

  {
    navlabel: true,
    subheader: "Мэдээ",
  },
  {
    id: uniqueId(),
    title: "Мэдээнүүд",
    icon: IconNews,
    href: "/news",
  },
  {
    id: uniqueId(),
    title: "Мэдээ нэмэх",
    icon: IconPlus,
    href: "/news/add",
  },
  {
    navlabel: true,
    subheader: "Шуудан",
  },
  {
    id: uniqueId(),
    title: "Шуудангууд",
    icon: IconMoodHappy,
    href: "/messages",
  },
];

export default Menuitems;
