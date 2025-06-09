import {
  Icon360View,
  IconCertificate,
  IconFlagQuestion,
  IconHome,
  IconLayoutDashboard,
  IconLayoutNavbar,
  IconMessage,
  IconNews,
  IconUsers,
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
    title: "Толгой хэсэг",
    icon: IconLayoutNavbar,
    href: "/website/headers",
  },
  {
    id: uniqueId(),
    title: "Нүүр хуудас",
    icon: IconHome,
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
  {
    id: uniqueId(),
    title: "Админууд",
    icon: IconUsers,
    href: "/accounts",
  },
];

export default Menuitems;
