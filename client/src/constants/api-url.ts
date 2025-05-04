const path = (base: string, ...values: (string | number)[]) => {
  return `${base}/${values.join("/")}`;
};

const API_URL = {
  product: {
    list: "/products",
    create: "/products",
    edit: (id: string) => path("/products", id),
    details: (id: string) => path("/products", id),
    delete: (id: string) => path("/products", id),
  },
  invoice: {
    list: "/invoices",
    create: "/invoices",
    edit: (id: string) => path("/invoices", id),
    details: (id: string) => path("/invoices", id,"details"),
    delete: (id: string) => path("/invoices", id),
  },
};

export default API_URL;
