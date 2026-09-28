/**
 * ZHS TRADERS — Product Catalog Data
 * ─────────────────────────────────────────────
 * HOW TO ADD A PRODUCT:
 *
 * 1. Place the product image in:  public/images/products/
 * 2. Copy one of the objects below and paste it at the end of the array.
 * 3. Fill in the fields:
 *    - name:        Product name
 *    - category:    Category (e.g. "Nutraceuticals", "Packing", "Seals")
 *    - description: One or two sentences describing the product.
 *    - image:       "/images/products/your-image-filename.jpg"
 * 4. Save the file. The product will appear automatically.
 *
 * To REMOVE a product, delete its object (including the curly braces and comma).
 *
 * ─────────────────────────────────────────────
 */

const products = [
  {
    id: 1,
    name: "Nutraceutical Raw Materials",
    category: "Nutraceuticals",
    description:
      "High-quality raw materials for nutraceutical formulation, supplied to manufacturers and processors. Available in various grades to meet industry standards.",
    image: "/images/products/nutraceutical-materials.jpg",
  },
  {
    id: 2,
    name: "Vitamin Compounds",
    category: "Vitamins",
    description:
      "A range of vitamin compounds and micronutrient blends sourced from reliable manufacturers, suitable for supplement formulation and industrial use.",
    image: "/images/products/vitamin-compounds.jpg",
  },
  {
    id: 3,
    name: "Industrial Seals",
    category: "Seals",
    description:
      "Mechanical and packaging seals for a variety of industrial applications. Available in different materials and dimensions to match your specifications.",
    image: "/images/products/industrial-seals.jpg",
  },
  {
    id: 4,
    name: "Packaging Materials",
    category: "Packing",
    description:
      "Flexible and rigid packaging solutions for business and industrial use. Includes bags, pouches, and protective wrapping materials.",
    image: "/images/products/packaging-materials.jpg",
  },
  {
    id: 5,
    name: "General Supply Materials",
    category: "General",
    description:
      "A broad range of general-purpose supply materials to meet varied business requirements. Contact us to discuss specific needs.",
    image: "/images/products/general-materials.jpg",
  },
];

export default products;
