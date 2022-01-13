const prisma = require('./index');

const getCategories = async () => {
  const category = await prisma.$queryRaw`
    SELECT
      id,
      name 
    FROM
      categories;
  `;
  return category;
};

const getSubCategories = async () => {
  const category = await prisma.$queryRaw`
    SELECT
      categories.id As category_id,
      categories.name As category,
      sub_categories.id As sub_category_id,
      sub_categories.name AS sub_category
    FROM
      categories
    JOIN
      sub_categories
    ON
      categories.id = sub_categories.category_id
    `;
  return category;
};

const findCategories = async (category_id, sub_category_id) => {
  const category = await prisma.$queryRaw`
  SELECT
    categories.id As category_id,
    categories.name As category,
    sub_categories.id As sub_category_id,
    sub_categories.name AS sub_category
  FROM
    categories
  JOIN
    sub_categories
  ON
    categories.id = sub_categories.category_id
  WHERE
    categories.id = ${category_id} 
  AND 
    sub_categories.id = ${sub_category_id}
  `;
  return category;
};

module.exports = { getCategories, getSubCategories, findCategories };
