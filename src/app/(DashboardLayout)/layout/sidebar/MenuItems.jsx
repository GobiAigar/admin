import {
  Icon360View,
  IconBuilding,
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
    title: "Компани",
    icon: IconBuilding,
    href: "/company",
  },
  {
    id: uniqueId(),
    title: "Толгой хэсэг",
    icon: IconLayoutNavbar,
    href: "/headers",
  },
  {
    id: uniqueId(),
    title: "Нүүр хуудас",
    icon: IconHome,
    href: "/homepage",
  },
  {
    id: uniqueId(),
    title: "Бүтээгдэхүүн",
    icon: IconWorldDollar,
    href: "/product",
  },
  {
    id: uniqueId(),
    title: "Баталгаажуулалт",
    icon: IconCertificate,
    href: "/sustainability",
  },
  {
    id: uniqueId(),
    title: "Aсуулт",
    icon: IconFlagQuestion,
    href: "/faq",
  },
  {
    id: uniqueId(),
    title: "Статистик",
    icon: Icon360View,
    href: "/statistics",
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
