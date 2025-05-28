import {
  Icon360View,
  IconAperture,
  IconCertificate,
  IconCopy,
  IconFlagQuestion,
  IconLayoutDashboard,
  IconLogin,
  IconMessage,
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
    subheader: "Хяналт",
  },

  {
    id: uniqueId(),
    title: "Хяналтын самбар",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    navlabel: true,
    subheader: "Хуудас",
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
    title: "Aсуулт",
    icon: IconFlagQuestion,
    href: "/website/faq",
  },
  {
    id: uniqueId(),
    title: "Статистик",
    icon: Icon360View,
    href: "/website/statistics",
  },
  {
    id: uniqueId(),
    title: "Мэдээлэл",
    icon: IconNews,
    href: "/news",
  },

  {
    id: uniqueId(),
    title: "Зурвас",
    icon: IconMessage,
    href: "/messages",
  },
];

export default Menuitems;
